import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { cvService } from '../../services/cvService';
import { generatePDF } from '../../utils/pdfGenerator';
import ModernTemplate from '../Templates/ModernTemplate';
import CorporateTemplate from '../Templates/CorporateTemplate';
import MinimalTemplate from '../Templates/MinimalTemplate';
import ATSTemplate from '../Templates/ATSTemplate';
import { FiDownload, FiEdit, FiArrowLeft } from 'react-icons/fi';
import toast from 'react-hot-toast';

const templateMap = { modern: ModernTemplate, corporate: CorporateTemplate, minimal: MinimalTemplate, ats: ATSTemplate };

export default function PreviewCV() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [cv, setCv] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;
    cvService.getCVById(id)
      .then((data) => { if (!cancelled) setCv(data); })
      .catch((err) => { if (!cancelled) setError(err.message); })
      .finally(() => { if (!cancelled) setLoading(false); });
    return () => { cancelled = true; };
  }, [id]);

  const handleDownloadPDF = async () => {
    try {
      const fileName = `${cv.personalInfo?.fullName || cv.title || 'cv'}.pdf`;
      await generatePDF('cv-content', fileName);
      toast.success('PDF downloaded!');
    } catch (err) {
      toast.error('Failed to generate PDF: ' + err.message);
    }
  };

  if (loading) return <div className="text-center py-12"><div className="spinner mx-auto" /><p className="text-gray-500 mt-4">Loading preview...</p></div>;

  if (error || !cv) {
    return (
      <div className="text-center py-16">
        <h3 className="text-lg font-semibold text-gray-700 mb-2">CV not found</h3>
        <p className="text-sm text-gray-500 mb-5">{error || 'The CV you are looking for does not exist.'}</p>
        <button className="px-5 py-2.5 bg-primary text-white text-sm font-semibold rounded-lg hover:bg-primary-dark transition cursor-pointer" onClick={() => navigate('/my-cvs')}>Back to My CVs</button>
      </div>
    );
  }

  const TemplateComponent = templateMap[cv.template] || ModernTemplate;

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">{cv.title}</h2>
          <p className="text-gray-500 mt-1">Preview your CV before downloading</p>
        </div>
        <div className="flex gap-2">
          <button className="inline-flex items-center gap-2 px-4 py-2 bg-gray-50 border border-gray-200 text-sm font-semibold rounded-lg hover:bg-gray-100 transition cursor-pointer" onClick={() => navigate(-1)}><FiArrowLeft /> Back</button>
          <Link to={`/edit-cv/${cv._id}`} className="inline-flex items-center gap-2 px-4 py-2 border border-primary text-primary text-sm font-semibold rounded-lg hover:bg-primary hover:text-white transition"><FiEdit /> Edit</Link>
          <button className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-white text-sm font-semibold rounded-lg hover:bg-primary-dark transition cursor-pointer" onClick={handleDownloadPDF}><FiDownload /> Download PDF</button>
        </div>
      </div>
      <div className="overflow-x-auto pb-10">
        <TemplateComponent data={cv} />
      </div>
    </div>
  );
}

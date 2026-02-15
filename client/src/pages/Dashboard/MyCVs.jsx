import { Link } from 'react-router-dom';
import { useCVList, useCVActions } from '../../hooks/useCV';
import { FiPlusCircle, FiEdit, FiEye, FiTrash2, FiFileText } from 'react-icons/fi';
import toast from 'react-hot-toast';

export default function MyCVs() {
  const { data: cvs = [], isLoading, invalidate } = useCVList();
  const { deleteCV } = useCVActions();

  const handleDelete = async (id, title) => {
    if (!window.confirm(`Delete "${title}"? This cannot be undone.`)) return;
    try {
      await deleteCV(id);
      invalidate();
      toast.success('CV deleted');
    } catch (err) {
      toast.error(err.message);
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">My CVs</h2>
          <p className="text-gray-500 mt-1">All your created CVs</p>
        </div>
        <Link to="/create-cv" className="inline-flex items-center gap-2 px-5 py-2.5 bg-primary text-white text-sm font-semibold rounded-lg hover:bg-primary-dark transition">
          <FiPlusCircle /> Create New CV
        </Link>
      </div>

      {isLoading ? (
        <div className="text-center py-12"><div className="spinner mx-auto" /></div>
      ) : cvs.length === 0 ? (
        <div className="text-center py-16 text-gray-400">
          <FiFileText className="text-5xl mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-700 mb-2">No CVs yet</h3>
          <p className="text-sm mb-5">Create your first professional CV</p>
          <Link to="/create-cv" className="inline-flex items-center gap-2 px-5 py-2.5 bg-primary text-white text-sm font-semibold rounded-lg hover:bg-primary-dark transition">
            <FiPlusCircle /> Create CV
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {cvs.map((cv) => (
            <div key={cv._id} className="bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition">
              <div className="p-5 border-b border-gray-200">
                <h3 className="font-semibold mb-1">{cv.title}</h3>
                <span className="inline-block px-2.5 py-0.5 rounded-full text-[11px] font-semibold uppercase bg-blue-50 text-blue-600">{cv.template}</span>
              </div>
              <div className="px-5 py-3 text-sm text-gray-500">
                {cv.personalInfo?.fullName && <p>{cv.personalInfo.fullName}</p>}
                {cv.experience?.length > 0 && <p className="text-xs">{cv.experience.length} experience{cv.experience.length > 1 ? 's' : ''}</p>}
                <p className="text-xs text-gray-400 mt-2">Updated {new Date(cv.updatedAt).toLocaleDateString()}</p>
              </div>
              <div className="px-5 py-3 border-t border-gray-200 flex gap-2 justify-end">
                <Link to={`/edit-cv/${cv._id}`} className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-gray-50 border border-gray-200 text-sm font-semibold rounded-lg hover:bg-gray-100 transition"><FiEdit /> Edit</Link>
                <Link to={`/preview-cv/${cv._id}`} className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-primary text-white text-sm font-semibold rounded-lg hover:bg-primary-dark transition"><FiEye /> Preview</Link>
                <button className="inline-flex items-center px-2.5 py-1.5 bg-red-600 text-white text-sm rounded-lg hover:bg-red-700 transition cursor-pointer" onClick={() => handleDelete(cv._id, cv.title)}><FiTrash2 /></button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

import { Link } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { useCVList } from '../../hooks/useCV';
import { useApplications } from '../../hooks/useApplications';
import { FiFileText, FiPlusCircle, FiBriefcase, FiCheckCircle } from 'react-icons/fi';

export default function Dashboard() {
  const { user } = useAuth();
  const { data: cvs = [], isLoading: cvsLoading } = useCVList();
  const { applications, loading: appsLoading } = useApplications();

  const stats = {
    totalCVs: cvs.length,
    totalApplications: applications.length,
    interviews: applications.filter((a) => a.status === 'interview').length,
    offers: applications.filter((a) => a.status === 'offer').length,
  };

  return (
    <div>
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Welcome, {user?.displayName || 'User'}</h2>
        <p className="text-gray-500 mt-1">Manage your CVs and track your job applications</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <div className="bg-white border border-gray-200 rounded-lg p-5 shadow-sm">
          <div className="w-10 h-10 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center text-lg mb-3"><FiFileText /></div>
          <div className="text-3xl font-bold">{stats.totalCVs}</div>
          <div className="text-xs text-gray-500 mt-0.5">Total CVs</div>
        </div>
        <div className="bg-white border border-gray-200 rounded-lg p-5 shadow-sm">
          <div className="w-10 h-10 rounded-lg bg-green-50 text-green-600 flex items-center justify-center text-lg mb-3"><FiBriefcase /></div>
          <div className="text-3xl font-bold">{stats.totalApplications}</div>
          <div className="text-xs text-gray-500 mt-0.5">Applications</div>
        </div>
        <div className="bg-white border border-gray-200 rounded-lg p-5 shadow-sm">
          <div className="w-10 h-10 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center text-lg mb-3"><FiCheckCircle /></div>
          <div className="text-3xl font-bold">{stats.interviews}</div>
          <div className="text-xs text-gray-500 mt-0.5">Interviews</div>
        </div>
        <div className="bg-white border border-gray-200 rounded-lg p-5 shadow-sm">
          <div className="w-10 h-10 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center text-lg mb-3"><FiCheckCircle /></div>
          <div className="text-3xl font-bold">{stats.offers}</div>
          <div className="text-xs text-gray-500 mt-0.5">Offers</div>
        </div>
      </div>

      {/* Recent CVs */}
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold">Recent CVs</h3>
        <Link to="/create-cv" className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-white text-sm font-semibold rounded-lg hover:bg-primary-dark transition">
          <FiPlusCircle /> Create New CV
        </Link>
      </div>

      {cvsLoading || appsLoading ? (
        <div className="text-center py-12"><div className="spinner mx-auto" /></div>
      ) : cvs.length === 0 ? (
        <div className="text-center py-16 text-gray-400">
          <FiFileText className="text-5xl mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-700 mb-2">No CVs yet</h3>
          <p className="text-sm mb-5">Create your first professional CV tailored for the UAE job market</p>
          <Link to="/create-cv" className="inline-flex items-center gap-2 px-5 py-2.5 bg-primary text-white text-sm font-semibold rounded-lg hover:bg-primary-dark transition">
            <FiPlusCircle /> Create Your First CV
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {cvs.slice(0, 6).map((cv) => (
            <div key={cv._id} className="bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition">
              <div className="p-5 border-b border-gray-200">
                <h3 className="font-semibold mb-1">{cv.title}</h3>
                <span className="inline-block px-2.5 py-0.5 rounded-full text-[11px] font-semibold uppercase bg-blue-50 text-blue-600">{cv.template}</span>
              </div>
              <div className="px-5 py-3 text-sm text-gray-500">
                {cv.personalInfo?.fullName && <p>{cv.personalInfo.fullName}</p>}
                <p className="text-xs text-gray-400 mt-2">Updated {new Date(cv.updatedAt).toLocaleDateString()}</p>
              </div>
              <div className="px-5 py-3 border-t border-gray-200 flex gap-2 justify-end">
                <Link to={`/edit-cv/${cv._id}`} className="px-3.5 py-1.5 bg-gray-50 border border-gray-200 text-sm font-semibold rounded-lg hover:bg-gray-100 transition">Edit</Link>
                <Link to={`/preview-cv/${cv._id}`} className="px-3.5 py-1.5 bg-primary text-white text-sm font-semibold rounded-lg hover:bg-primary-dark transition">Preview</Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

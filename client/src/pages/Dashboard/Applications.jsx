import { useState } from 'react';
import { useApplications } from '../../hooks/useApplications';
import { useCVList } from '../../hooks/useCV';
import { FiPlus, FiTrash2, FiEdit, FiBriefcase } from 'react-icons/fi';
import toast from 'react-hot-toast';

const initialForm = { companyName: '', jobTitle: '', location: '', status: 'applied', notes: '', jobUrl: '', salary: '', cvId: '' };
const inputCls = 'w-full px-3.5 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/10';
const statusColors = {
  applied: 'bg-blue-50 text-blue-600',
  interview: 'bg-amber-50 text-amber-600',
  offer: 'bg-green-50 text-green-600',
  rejected: 'bg-red-50 text-red-600',
  saved: 'bg-gray-100 text-gray-500',
};

export default function Applications() {
  const { applications, loading, createApplication, updateApplication, deleteApplication } = useApplications();
  const { data: cvs = [] } = useCVList();
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState(initialForm);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const openCreate = () => { setForm(initialForm); setEditingId(null); setShowModal(true); };
  const openEdit = (app) => {
    setForm({
      companyName: app.companyName, jobTitle: app.jobTitle, location: app.location || '',
      status: app.status, notes: app.notes || '', jobUrl: app.jobUrl || '',
      salary: app.salary || '', cvId: app.cvId?._id || app.cvId || '',
    });
    setEditingId(app._id);
    setShowModal(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = { ...form };
    if (!payload.cvId) delete payload.cvId;
    try {
      if (editingId) {
        await updateApplication({ id: editingId, ...payload });
        toast.success('Application updated');
      } else {
        await createApplication(payload);
        toast.success('Application added');
      }
      setShowModal(false);
    } catch (err) {
      toast.error(err.message);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this application?')) return;
    try {
      await deleteApplication(id);
      toast.success('Deleted');
    } catch (err) {
      toast.error(err.message);
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Job Applications</h2>
          <p className="text-gray-500 mt-1">Track your job applications</p>
        </div>
        <button className="inline-flex items-center gap-2 px-5 py-2.5 bg-primary text-white text-sm font-semibold rounded-lg hover:bg-primary-dark transition cursor-pointer" onClick={openCreate}>
          <FiPlus /> Add Application
        </button>
      </div>

      {loading ? (
        <div className="text-center py-12"><div className="spinner mx-auto" /></div>
      ) : applications.length === 0 ? (
        <div className="text-center py-16 text-gray-400">
          <FiBriefcase className="text-5xl mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-700 mb-2">No applications tracked</h3>
          <p className="text-sm mb-5">Start tracking your UAE job applications</p>
          <button className="inline-flex items-center gap-2 px-5 py-2.5 bg-primary text-white text-sm font-semibold rounded-lg hover:bg-primary-dark transition cursor-pointer" onClick={openCreate}><FiPlus /> Add Application</button>
        </div>
      ) : (
        <div className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-50">
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Company</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Position</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Location</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Applied</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">CV</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody>
              {applications.map((app) => (
                <tr key={app._id} className="border-t border-gray-100 hover:bg-gray-50 transition">
                  <td className="px-4 py-3 text-sm font-semibold">{app.companyName}</td>
                  <td className="px-4 py-3 text-sm">{app.jobTitle}</td>
                  <td className="px-4 py-3 text-sm text-gray-500">{app.location || '-'}</td>
                  <td className="px-4 py-3"><span className={`inline-block px-2.5 py-0.5 rounded-full text-xs font-semibold ${statusColors[app.status]}`}>{app.status}</span></td>
                  <td className="px-4 py-3 text-sm text-gray-500">{new Date(app.appliedDate).toLocaleDateString()}</td>
                  <td className="px-4 py-3 text-sm text-gray-500">{app.cvId?.title || '-'}</td>
                  <td className="px-4 py-3">
                    <div className="flex gap-1">
                      <button className="p-2 border border-gray-200 rounded-lg text-gray-500 hover:bg-gray-100 transition cursor-pointer" onClick={() => openEdit(app)} title="Edit"><FiEdit /></button>
                      <button className="p-2 border border-gray-200 rounded-lg text-red-500 hover:bg-red-50 transition cursor-pointer" onClick={() => handleDelete(app._id)} title="Delete"><FiTrash2 /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[1000] p-5" onClick={() => setShowModal(false)}>
          <div className="bg-white rounded-xl p-8 w-full max-w-lg max-h-[90vh] overflow-y-auto shadow-lg" onClick={(e) => e.stopPropagation()}>
            <h3 className="text-xl font-semibold mb-5">{editingId ? 'Edit Application' : 'Add Application'}</h3>
            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-2 gap-4 max-sm:grid-cols-1">
                <div className="mb-4"><label className="block text-sm font-semibold text-gray-700 mb-1.5">Company Name *</label><input className={inputCls} name="companyName" value={form.companyName} onChange={handleChange} required placeholder="e.g. Emirates NBD" /></div>
                <div className="mb-4"><label className="block text-sm font-semibold text-gray-700 mb-1.5">Job Title *</label><input className={inputCls} name="jobTitle" value={form.jobTitle} onChange={handleChange} required placeholder="e.g. Frontend Developer" /></div>
              </div>
              <div className="grid grid-cols-2 gap-4 max-sm:grid-cols-1">
                <div className="mb-4"><label className="block text-sm font-semibold text-gray-700 mb-1.5">Location</label><input className={inputCls} name="location" value={form.location} onChange={handleChange} placeholder="e.g. Dubai, UAE" /></div>
                <div className="mb-4"><label className="block text-sm font-semibold text-gray-700 mb-1.5">Status</label><select className={`${inputCls} cursor-pointer`} name="status" value={form.status} onChange={handleChange}><option value="saved">Saved</option><option value="applied">Applied</option><option value="interview">Interview</option><option value="offer">Offer</option><option value="rejected">Rejected</option></select></div>
              </div>
              <div className="grid grid-cols-2 gap-4 max-sm:grid-cols-1">
                <div className="mb-4"><label className="block text-sm font-semibold text-gray-700 mb-1.5">Salary</label><input className={inputCls} name="salary" value={form.salary} onChange={handleChange} placeholder="e.g. 15,000 AED" /></div>
                <div className="mb-4"><label className="block text-sm font-semibold text-gray-700 mb-1.5">CV Used</label><select className={`${inputCls} cursor-pointer`} name="cvId" value={form.cvId} onChange={handleChange}><option value="">None</option>{cvs.map((cv) => <option key={cv._id} value={cv._id}>{cv.title}</option>)}</select></div>
              </div>
              <div className="mb-4"><label className="block text-sm font-semibold text-gray-700 mb-1.5">Job URL</label><input className={inputCls} name="jobUrl" value={form.jobUrl} onChange={handleChange} placeholder="Link to job posting" /></div>
              <div className="mb-4"><label className="block text-sm font-semibold text-gray-700 mb-1.5">Notes</label><textarea className={`${inputCls} min-h-[70px] resize-y`} name="notes" value={form.notes} onChange={handleChange} placeholder="Any notes about this application..." /></div>
              <div className="flex gap-3 justify-end mt-6">
                <button type="button" className="px-5 py-2.5 bg-gray-50 border border-gray-200 text-sm font-semibold rounded-lg hover:bg-gray-100 transition cursor-pointer" onClick={() => setShowModal(false)}>Cancel</button>
                <button type="submit" className="px-5 py-2.5 bg-primary text-white text-sm font-semibold rounded-lg hover:bg-primary-dark transition cursor-pointer">{editingId ? 'Update' : 'Add Application'}</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

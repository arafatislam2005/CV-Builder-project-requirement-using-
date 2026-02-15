import { FiPlus, FiX } from 'react-icons/fi';

const emptyExperience = { jobTitle: '', company: '', location: '', startDate: '', endDate: '', current: false, description: '' };
const inputCls = 'w-full px-3.5 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/10';

export default function ExperienceSection({ data, onChange }) {
  const handleItemChange = (index, field, value) => {
    const updated = [...data];
    updated[index] = { ...updated[index], [field]: value };
    onChange(updated);
  };
  const addItem = () => onChange([...data, { ...emptyExperience }]);
  const removeItem = (index) => onChange(data.filter((_, i) => i !== index));

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
      <h3 className="text-lg font-semibold mb-4 pb-3 border-b border-gray-200">Work Experience</h3>
      <div className="flex flex-col gap-4">
        {data.map((item, index) => (
          <div key={index} className="p-4 border border-gray-200 rounded-lg bg-gray-50 relative">
            <button type="button" className="absolute top-2 right-2 text-red-500 hover:text-red-700 cursor-pointer" onClick={() => removeItem(index)}><FiX /></button>
            <div className="grid grid-cols-2 gap-4 max-sm:grid-cols-1">
              <div className="mb-3">
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">Job Title *</label>
                <input className={inputCls} value={item.jobTitle} onChange={(e) => handleItemChange(index, 'jobTitle', e.target.value)} placeholder="e.g. Senior Frontend Developer" />
              </div>
              <div className="mb-3">
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">Company *</label>
                <input className={inputCls} value={item.company} onChange={(e) => handleItemChange(index, 'company', e.target.value)} placeholder="e.g. Emirates Group" />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4 max-sm:grid-cols-1">
              <div className="mb-3">
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">Location</label>
                <input className={inputCls} value={item.location} onChange={(e) => handleItemChange(index, 'location', e.target.value)} placeholder="e.g. Dubai, UAE" />
              </div>
              <div className="mb-3 flex items-end">
                <label className="flex items-center gap-2 text-sm font-medium text-gray-700 cursor-pointer">
                  <input type="checkbox" checked={item.current} onChange={(e) => handleItemChange(index, 'current', e.target.checked)} className="rounded" />
                  Currently working here
                </label>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4 max-sm:grid-cols-1">
              <div className="mb-3">
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">Start Date</label>
                <input type="month" className={inputCls} value={item.startDate} onChange={(e) => handleItemChange(index, 'startDate', e.target.value)} />
              </div>
              <div className="mb-3">
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">End Date</label>
                <input type="month" className={inputCls} value={item.endDate} onChange={(e) => handleItemChange(index, 'endDate', e.target.value)} disabled={item.current} />
              </div>
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">Description</label>
              <textarea className={`${inputCls} min-h-[70px] resize-y`} value={item.description} onChange={(e) => handleItemChange(index, 'description', e.target.value)} placeholder="Key responsibilities and achievements..." rows={3} />
            </div>
          </div>
        ))}
      </div>
      <button type="button" className="flex items-center justify-center gap-1.5 w-full mt-4 py-2.5 border-2 border-dashed border-gray-200 rounded-lg text-primary text-sm font-semibold hover:border-primary hover:bg-blue-50 transition cursor-pointer" onClick={addItem}>
        <FiPlus /> Add Experience
      </button>
    </div>
  );
}

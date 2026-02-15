import { FiPlus, FiX } from 'react-icons/fi';

const emptyEducation = { degree: '', institution: '', location: '', startDate: '', endDate: '', gpa: '', description: '' };
const inputCls = 'w-full px-3.5 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/10';

export default function EducationSection({ data, onChange }) {
  const handleItemChange = (index, field, value) => {
    const updated = [...data];
    updated[index] = { ...updated[index], [field]: value };
    onChange(updated);
  };
  const addItem = () => onChange([...data, { ...emptyEducation }]);
  const removeItem = (index) => onChange(data.filter((_, i) => i !== index));

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
      <h3 className="text-lg font-semibold mb-4 pb-3 border-b border-gray-200">Education</h3>
      <div className="flex flex-col gap-4">
        {data.map((item, index) => (
          <div key={index} className="p-4 border border-gray-200 rounded-lg bg-gray-50 relative">
            <button type="button" className="absolute top-2 right-2 text-red-500 hover:text-red-700 cursor-pointer" onClick={() => removeItem(index)}><FiX /></button>
            <div className="grid grid-cols-2 gap-4 max-sm:grid-cols-1">
              <div className="mb-3">
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">Degree / Qualification *</label>
                <input className={inputCls} value={item.degree} onChange={(e) => handleItemChange(index, 'degree', e.target.value)} placeholder="e.g. Bachelor of Computer Science" />
              </div>
              <div className="mb-3">
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">Institution *</label>
                <input className={inputCls} value={item.institution} onChange={(e) => handleItemChange(index, 'institution', e.target.value)} placeholder="e.g. University of Sharjah" />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4 max-sm:grid-cols-1">
              <div className="mb-3">
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">Location</label>
                <input className={inputCls} value={item.location} onChange={(e) => handleItemChange(index, 'location', e.target.value)} placeholder="e.g. Sharjah, UAE" />
              </div>
              <div className="mb-3">
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">GPA</label>
                <input className={inputCls} value={item.gpa} onChange={(e) => handleItemChange(index, 'gpa', e.target.value)} placeholder="e.g. 3.8/4.0" />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4 max-sm:grid-cols-1">
              <div className="mb-3">
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">Start Date</label>
                <input type="month" className={inputCls} value={item.startDate} onChange={(e) => handleItemChange(index, 'startDate', e.target.value)} />
              </div>
              <div className="mb-3">
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">End Date</label>
                <input type="month" className={inputCls} value={item.endDate} onChange={(e) => handleItemChange(index, 'endDate', e.target.value)} />
              </div>
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">Description</label>
              <textarea className={`${inputCls} min-h-[60px] resize-y`} value={item.description} onChange={(e) => handleItemChange(index, 'description', e.target.value)} placeholder="Relevant coursework, honors, activities..." rows={2} />
            </div>
          </div>
        ))}
      </div>
      <button type="button" className="flex items-center justify-center gap-1.5 w-full mt-4 py-2.5 border-2 border-dashed border-gray-200 rounded-lg text-primary text-sm font-semibold hover:border-primary hover:bg-blue-50 transition cursor-pointer" onClick={addItem}>
        <FiPlus /> Add Education
      </button>
    </div>
  );
}

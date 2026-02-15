import { FiPlus, FiX } from 'react-icons/fi';

const emptyProject = { title: '', description: '', technologies: '', link: '' };
const inputCls = 'w-full px-3.5 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/10';

export default function ProjectsSection({ data, onChange }) {
  const handleItemChange = (index, field, value) => {
    const updated = [...data];
    updated[index] = { ...updated[index], [field]: value };
    onChange(updated);
  };
  const addItem = () => onChange([...data, { ...emptyProject }]);
  const removeItem = (index) => onChange(data.filter((_, i) => i !== index));

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
      <h3 className="text-lg font-semibold mb-4 pb-3 border-b border-gray-200">Projects</h3>
      <div className="flex flex-col gap-4">
        {data.map((item, index) => (
          <div key={index} className="p-4 border border-gray-200 rounded-lg bg-gray-50 relative">
            <button type="button" className="absolute top-2 right-2 text-red-500 hover:text-red-700 cursor-pointer" onClick={() => removeItem(index)}><FiX /></button>
            <div className="grid grid-cols-2 gap-4 max-sm:grid-cols-1">
              <div className="mb-3">
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">Project Title</label>
                <input className={inputCls} value={item.title} onChange={(e) => handleItemChange(index, 'title', e.target.value)} placeholder="e.g. E-Commerce Platform" />
              </div>
              <div className="mb-3">
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">Technologies</label>
                <input className={inputCls} value={item.technologies} onChange={(e) => handleItemChange(index, 'technologies', e.target.value)} placeholder="e.g. React, Node.js, MongoDB" />
              </div>
            </div>
            <div className="mb-3">
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">Description</label>
              <textarea className={`${inputCls} min-h-[60px] resize-y`} value={item.description} onChange={(e) => handleItemChange(index, 'description', e.target.value)} placeholder="Brief project description..." rows={2} />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">Link</label>
              <input className={inputCls} value={item.link} onChange={(e) => handleItemChange(index, 'link', e.target.value)} placeholder="Project URL or GitHub link" />
            </div>
          </div>
        ))}
      </div>
      <button type="button" className="flex items-center justify-center gap-1.5 w-full mt-4 py-2.5 border-2 border-dashed border-gray-200 rounded-lg text-primary text-sm font-semibold hover:border-primary hover:bg-blue-50 transition cursor-pointer" onClick={addItem}>
        <FiPlus /> Add Project
      </button>
    </div>
  );
}

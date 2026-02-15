import { FiPlus, FiX } from 'react-icons/fi';

const emptyLang = { name: '', proficiency: '' };
const inputCls = 'w-full px-3.5 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/10';

export default function LanguagesSection({ data, onChange }) {
  const handleItemChange = (index, field, value) => {
    const updated = [...data];
    updated[index] = { ...updated[index], [field]: value };
    onChange(updated);
  };
  const addItem = () => onChange([...data, { ...emptyLang }]);
  const removeItem = (index) => onChange(data.filter((_, i) => i !== index));

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
      <h3 className="text-lg font-semibold mb-4 pb-3 border-b border-gray-200">Languages</h3>
      <div className="flex flex-col gap-3">
        {data.map((item, index) => (
          <div key={index} className="p-3 border border-gray-200 rounded-lg bg-gray-50 relative">
            <button type="button" className="absolute top-2 right-2 text-red-500 hover:text-red-700 cursor-pointer" onClick={() => removeItem(index)}><FiX /></button>
            <div className="grid grid-cols-2 gap-4 max-sm:grid-cols-1">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">Language</label>
                <input className={inputCls} value={item.name} onChange={(e) => handleItemChange(index, 'name', e.target.value)} placeholder="e.g. Arabic, English, Hindi" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">Proficiency</label>
                <select className={`${inputCls} cursor-pointer`} value={item.proficiency} onChange={(e) => handleItemChange(index, 'proficiency', e.target.value)}>
                  <option value="">Select level</option>
                  <option value="basic">Basic</option>
                  <option value="conversational">Conversational</option>
                  <option value="proficient">Proficient</option>
                  <option value="fluent">Fluent</option>
                  <option value="native">Native</option>
                </select>
              </div>
            </div>
          </div>
        ))}
      </div>
      <button type="button" className="flex items-center justify-center gap-1.5 w-full mt-4 py-2.5 border-2 border-dashed border-gray-200 rounded-lg text-primary text-sm font-semibold hover:border-primary hover:bg-blue-50 transition cursor-pointer" onClick={addItem}>
        <FiPlus /> Add Language
      </button>
    </div>
  );
}

import { FiPlus, FiX } from 'react-icons/fi';

const emptyCert = { name: '', issuer: '', date: '', expiryDate: '', credentialId: '' };
const inputCls = 'w-full px-3.5 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/10';

export default function CertificationsSection({ data, onChange }) {
  const handleItemChange = (index, field, value) => {
    const updated = [...data];
    updated[index] = { ...updated[index], [field]: value };
    onChange(updated);
  };
  const addItem = () => onChange([...data, { ...emptyCert }]);
  const removeItem = (index) => onChange(data.filter((_, i) => i !== index));

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
      <h3 className="text-lg font-semibold mb-4 pb-3 border-b border-gray-200">Certifications</h3>
      <div className="flex flex-col gap-4">
        {data.map((item, index) => (
          <div key={index} className="p-4 border border-gray-200 rounded-lg bg-gray-50 relative">
            <button type="button" className="absolute top-2 right-2 text-red-500 hover:text-red-700 cursor-pointer" onClick={() => removeItem(index)}><FiX /></button>
            <div className="grid grid-cols-2 gap-4 max-sm:grid-cols-1">
              <div className="mb-3">
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">Certification Name</label>
                <input className={inputCls} value={item.name} onChange={(e) => handleItemChange(index, 'name', e.target.value)} placeholder="e.g. AWS Solutions Architect" />
              </div>
              <div className="mb-3">
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">Issuer</label>
                <input className={inputCls} value={item.issuer} onChange={(e) => handleItemChange(index, 'issuer', e.target.value)} placeholder="e.g. Amazon Web Services" />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4 max-sm:grid-cols-1">
              <div className="mb-3">
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">Issue Date</label>
                <input type="month" className={inputCls} value={item.date} onChange={(e) => handleItemChange(index, 'date', e.target.value)} />
              </div>
              <div className="mb-3">
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">Expiry Date</label>
                <input type="month" className={inputCls} value={item.expiryDate} onChange={(e) => handleItemChange(index, 'expiryDate', e.target.value)} />
              </div>
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">Credential ID</label>
              <input className={inputCls} value={item.credentialId} onChange={(e) => handleItemChange(index, 'credentialId', e.target.value)} placeholder="Optional credential ID" />
            </div>
          </div>
        ))}
      </div>
      <button type="button" className="flex items-center justify-center gap-1.5 w-full mt-4 py-2.5 border-2 border-dashed border-gray-200 rounded-lg text-primary text-sm font-semibold hover:border-primary hover:bg-blue-50 transition cursor-pointer" onClick={addItem}>
        <FiPlus /> Add Certification
      </button>
    </div>
  );
}

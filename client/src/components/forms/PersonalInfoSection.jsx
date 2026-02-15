export default function PersonalInfoSection({ data, onChange }) {
  const handleChange = (field, value) => {
    onChange({ ...data, [field]: value });
  };

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
      <h3 className="text-lg font-semibold mb-4 pb-3 border-b border-gray-200">Personal Information</h3>

      <div className="grid grid-cols-2 gap-4 max-sm:grid-cols-1">
        <div className="mb-4">
          <label className="block text-sm font-semibold text-gray-700 mb-1.5">Full Name *</label>
          <input className="w-full px-3.5 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/10" value={data.fullName || ''} onChange={(e) => handleChange('fullName', e.target.value)} placeholder="e.g. Ahmed Al Rashid" />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-semibold text-gray-700 mb-1.5">Email *</label>
          <input type="email" className="w-full px-3.5 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/10" value={data.email || ''} onChange={(e) => handleChange('email', e.target.value)} placeholder="your@email.com" />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 max-sm:grid-cols-1">
        <div className="mb-4">
          <label className="block text-sm font-semibold text-gray-700 mb-1.5">Phone</label>
          <input className="w-full px-3.5 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/10" value={data.phone || ''} onChange={(e) => handleChange('phone', e.target.value)} placeholder="+971 50 XXX XXXX" />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-semibold text-gray-700 mb-1.5">City</label>
          <input className="w-full px-3.5 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/10" value={data.city || ''} onChange={(e) => handleChange('city', e.target.value)} placeholder="e.g. Dubai" />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 max-sm:grid-cols-1">
        <div className="mb-4">
          <label className="block text-sm font-semibold text-gray-700 mb-1.5">Nationality</label>
          <input className="w-full px-3.5 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/10" value={data.nationality || ''} onChange={(e) => handleChange('nationality', e.target.value)} placeholder="e.g. Pakistani, Indian, Emirati" />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-semibold text-gray-700 mb-1.5">Visa Status</label>
          <select className="w-full px-3.5 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 cursor-pointer" value={data.visaStatus || ''} onChange={(e) => handleChange('visaStatus', e.target.value)}>
            <option value="">Select visa status</option>
            <option value="UAE National">UAE National</option>
            <option value="Employment Visa">Employment Visa</option>
            <option value="Visit Visa">Visit Visa</option>
            <option value="Freelance Visa">Freelance Visa</option>
            <option value="Golden Visa">Golden Visa</option>
            <option value="Green Visa">Green Visa</option>
            <option value="Student Visa">Student Visa</option>
            <option value="Dependent Visa">Dependent Visa</option>
            <option value="Cancelled - Available">Cancelled - Available</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 max-sm:grid-cols-1">
        <div className="mb-4">
          <label className="block text-sm font-semibold text-gray-700 mb-1.5">Date of Birth</label>
          <input type="date" className="w-full px-3.5 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/10" value={data.dateOfBirth || ''} onChange={(e) => handleChange('dateOfBirth', e.target.value)} />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-semibold text-gray-700 mb-1.5">Address</label>
          <input className="w-full px-3.5 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/10" value={data.address || ''} onChange={(e) => handleChange('address', e.target.value)} placeholder="Full address" />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 max-sm:grid-cols-1">
        <div className="mb-4">
          <label className="block text-sm font-semibold text-gray-700 mb-1.5">LinkedIn Profile</label>
          <input className="w-full px-3.5 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/10" value={data.linkedin || ''} onChange={(e) => handleChange('linkedin', e.target.value)} placeholder="linkedin.com/in/yourname" />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-semibold text-gray-700 mb-1.5">Website/Portfolio</label>
          <input className="w-full px-3.5 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/10" value={data.website || ''} onChange={(e) => handleChange('website', e.target.value)} placeholder="yourwebsite.com" />
        </div>
      </div>
    </div>
  );
}

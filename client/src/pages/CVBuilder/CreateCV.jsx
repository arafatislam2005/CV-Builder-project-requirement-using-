import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCVActions, useCVList } from '../../hooks/useCV';
import PersonalInfoSection from '../../components/forms/PersonalInfoSection';
import ExperienceSection from '../../components/forms/ExperienceSection';
import EducationSection from '../../components/forms/EducationSection';
import SkillsSection from '../../components/forms/SkillsSection';
import CertificationsSection from '../../components/forms/CertificationsSection';
import LanguagesSection from '../../components/forms/LanguagesSection';
import ProjectsSection from '../../components/forms/ProjectsSection';
import ReferencesSection from '../../components/forms/ReferencesSection';
import toast from 'react-hot-toast';

const initialCV = {
  title: '', template: 'modern',
  personalInfo: { fullName: '', email: '', phone: '', address: '', city: '', nationality: '', visaStatus: '', dateOfBirth: '', linkedin: '', website: '', photoURL: '' },
  careerObjective: '', experience: [], education: [], skills: [], certifications: [], languages: [], projects: [], references: [],
};

const templates = [
  { id: 'modern', name: 'Modern UAE', desc: 'Clean, modern design with color accents' },
  { id: 'corporate', name: 'Corporate', desc: 'Professional serif-based design' },
  { id: 'minimal', name: 'Minimal', desc: 'Simple, elegant, and distraction-free' },
  { id: 'ats', name: 'ATS Friendly', desc: 'Optimized for applicant tracking systems' },
];

const inputCls = 'w-full px-3.5 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/10';

export default function CreateCV() {
  const [cvData, setCvData] = useState(initialCV);
  const { createCV, saving } = useCVActions();
  const { invalidate } = useCVList();
  const navigate = useNavigate();

  const updateField = (field, value) => setCvData((prev) => ({ ...prev, [field]: value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!cvData.title.trim()) { toast.error('Please enter a CV title'); return; }
    try {
      const data = await createCV(cvData);
      invalidate();
      toast.success('CV created successfully!');
      navigate(`/preview-cv/${data._id}`);
    } catch (err) {
      toast.error(err.message);
    }
  };

  return (
    <div>
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Create New CV</h2>
        <p className="text-gray-500 mt-1">Build your professional CV for the UAE job market</p>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="flex flex-col gap-6">

          <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
            <h3 className="text-lg font-semibold mb-4 pb-3 border-b border-gray-200">CV Details</h3>
            <div className="mb-4">
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">CV Title *</label>
              <input className={inputCls} value={cvData.title} onChange={(e) => updateField('title', e.target.value)} placeholder="e.g. Software Engineer CV - 2024" required />
            </div>
            <label className="block text-sm font-semibold text-gray-700 mb-3">Choose Template</label>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {templates.map((t) => (
                <div key={t.id} className={`border-2 rounded-lg p-5 cursor-pointer text-center transition ${cvData.template === t.id ? 'border-primary bg-blue-50' : 'border-gray-200 hover:border-blue-300'}`} onClick={() => updateField('template', t.id)}>
                  <h4 className="text-sm font-semibold mt-1">{t.name}</h4>
                  <p className="text-xs text-gray-400 mt-1">{t.desc}</p>
                </div>
              ))}
            </div>
          </div>

          <PersonalInfoSection data={cvData.personalInfo} onChange={(val) => updateField('personalInfo', val)} />

          {/* Career Objective */}
          <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
            <h3 className="text-lg font-semibold mb-4 pb-3 border-b border-gray-200">Career Objective</h3>
            <div className="mb-0">
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">Write a UAE-style career objective</label>
              <textarea className={`${inputCls} min-h-[100px] resize-y`} value={cvData.careerObjective} onChange={(e) => updateField('careerObjective', e.target.value)} placeholder="Dynamic and results-driven professional with X+ years of experience in... Seeking a challenging role in... to leverage expertise in... and contribute to organizational growth in the UAE market." rows={4} />
            </div>
          </div>

          <ExperienceSection data={cvData.experience} onChange={(val) => updateField('experience', val)} />
          <EducationSection data={cvData.education} onChange={(val) => updateField('education', val)} />
          <SkillsSection data={cvData.skills} onChange={(val) => updateField('skills', val)} />
          <CertificationsSection data={cvData.certifications} onChange={(val) => updateField('certifications', val)} />
          <LanguagesSection data={cvData.languages} onChange={(val) => updateField('languages', val)} />
          <ProjectsSection data={cvData.projects} onChange={(val) => updateField('projects', val)} />
          <ReferencesSection data={cvData.references} onChange={(val) => updateField('references', val)} />

          <div className="flex gap-4 justify-end">
            <button type="button" className="px-7 py-3.5 bg-gray-50 border border-gray-200 font-semibold rounded-lg hover:bg-gray-100 transition cursor-pointer" onClick={() => navigate('/my-cvs')}>Cancel</button>
            <button type="submit" className="px-7 py-3.5 bg-primary text-white font-semibold rounded-lg hover:bg-primary-dark transition disabled:opacity-60 cursor-pointer" disabled={saving}>{saving ? 'Saving...' : 'Save CV'}</button>
          </div>
        </div>
      </form>
    </div>
  );
}

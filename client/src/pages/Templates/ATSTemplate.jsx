export default function ATSTemplate({ data }) {
  const { personalInfo = {}, careerObjective, experience = [], education = [], skills = [], certifications = [], languages = [], projects = [], references = [] } = data;

  return (
    <div className="cv-preview cv-ats" id="cv-content">
      <h1>{personalInfo.fullName || 'YOUR NAME'}</h1>

      <div className="contact-info" style={{ marginBottom: '16px' }}>
        {personalInfo.email && <span>Email: {personalInfo.email}</span>}
        {personalInfo.phone && <span>Phone: {personalInfo.phone}</span>}
        {personalInfo.city && <span>Location: {personalInfo.city}</span>}
        {personalInfo.nationality && <span>Nationality: {personalInfo.nationality}</span>}
        {personalInfo.visaStatus && <span>Visa: {personalInfo.visaStatus}</span>}
        {personalInfo.linkedin && <span>LinkedIn: {personalInfo.linkedin}</span>}
        {personalInfo.website && <span>Website: {personalInfo.website}</span>}
      </div>

      {careerObjective && (
        <>
          <h2>PROFESSIONAL SUMMARY</h2>
          <p>{careerObjective}</p>
        </>
      )}

      {experience.length > 0 && (
        <>
          <h2>WORK EXPERIENCE</h2>
          {experience.map((exp, i) => (
            <div key={i} className="experience-item">
              <div className="item-header">
                <h3>{exp.jobTitle}</h3>
                <span className="item-date">{exp.startDate} - {exp.current ? 'Present' : exp.endDate}</span>
              </div>
              <div className="item-subtitle">{exp.company}{exp.location ? `, ${exp.location}` : ''}</div>
              {exp.description && <p style={{ whiteSpace: 'pre-line', fontSize: '9.5pt', marginTop: '4px' }}>{exp.description}</p>}
            </div>
          ))}
        </>
      )}

      {education.length > 0 && (
        <>
          <h2>EDUCATION</h2>
          {education.map((edu, i) => (
            <div key={i} className="education-item">
              <div className="item-header">
                <h3>{edu.degree}</h3>
                <span className="item-date">{edu.startDate} - {edu.endDate}</span>
              </div>
              <div className="item-subtitle">
                {edu.institution}{edu.location ? `, ${edu.location}` : ''}{edu.gpa ? ` | GPA: ${edu.gpa}` : ''}
              </div>
            </div>
          ))}
        </>
      )}

      {skills.length > 0 && (
        <>
          <h2>SKILLS</h2>
          <p style={{ fontSize: '9.5pt' }}>
            {skills.map((s) => s.name).join(' | ')}
          </p>
        </>
      )}

      {certifications.length > 0 && (
        <>
          <h2>CERTIFICATIONS</h2>
          {certifications.map((cert, i) => (
            <p key={i} style={{ marginBottom: '4px', fontSize: '9.5pt' }}>
              {cert.name} - {cert.issuer} ({cert.date})
              {cert.credentialId ? ` | ID: ${cert.credentialId}` : ''}
            </p>
          ))}
        </>
      )}

      {languages.length > 0 && (
        <>
          <h2>LANGUAGES</h2>
          <p style={{ fontSize: '9.5pt' }}>
            {languages.map((l) => `${l.name}${l.proficiency ? ` (${l.proficiency})` : ''}`).join(' | ')}
          </p>
        </>
      )}

      {projects.length > 0 && (
        <>
          <h2>PROJECTS</h2>
          {projects.map((proj, i) => (
            <div key={i} className="experience-item">
              <h3>{proj.title}</h3>
              {proj.technologies && <div className="item-subtitle">Technologies: {proj.technologies}</div>}
              {proj.description && <p style={{ fontSize: '9.5pt' }}>{proj.description}</p>}
              {proj.link && <p style={{ fontSize: '8.5pt' }}>Link: {proj.link}</p>}
            </div>
          ))}
        </>
      )}

      {references.length > 0 && (
        <>
          <h2>REFERENCES</h2>
          {references.map((ref, i) => (
            <div key={i} style={{ marginBottom: '8px' }}>
              <p style={{ fontSize: '9.5pt', fontWeight: 'bold' }}>{ref.name}</p>
              <p style={{ fontSize: '9pt' }}>{ref.position}, {ref.company}</p>
              <p style={{ fontSize: '9pt' }}>
                {ref.email}{ref.phone ? ` | ${ref.phone}` : ''}
              </p>
            </div>
          ))}
        </>
      )}
    </div>
  );
}

export default function CorporateTemplate({ data }) {
  const { personalInfo = {}, careerObjective, experience = [], education = [], skills = [], certifications = [], languages = [], projects = [], references = [] } = data;

  return (
    <div className="cv-preview cv-corporate" id="cv-content">
      <h1 style={{ color: '#1a1a1a', borderBottom: '2px solid #1a1a1a', paddingBottom: '8px' }}>
        {personalInfo.fullName || 'Your Name'}
      </h1>

      <div className="contact-info" style={{ borderBottom: '1px solid #ddd', paddingBottom: '10px' }}>
        {personalInfo.email && <span>{personalInfo.email}</span>}
        {personalInfo.phone && <span>{personalInfo.phone}</span>}
        {personalInfo.city && <span>{personalInfo.city}</span>}
        {personalInfo.nationality && <span>{personalInfo.nationality}</span>}
        {personalInfo.visaStatus && <span>Visa: {personalInfo.visaStatus}</span>}
        {personalInfo.linkedin && <span>{personalInfo.linkedin}</span>}
      </div>

      {careerObjective && (
        <>
          <h2>Professional Summary</h2>
          <p style={{ fontStyle: 'italic' }}>{careerObjective}</p>
        </>
      )}

      {experience.length > 0 && (
        <>
          <h2>Professional Experience</h2>
          {experience.map((exp, i) => (
            <div key={i} className="experience-item">
              <div className="item-header">
                <h3>{exp.jobTitle}</h3>
                <span className="item-date">{exp.startDate} - {exp.current ? 'Present' : exp.endDate}</span>
              </div>
              <div className="item-subtitle"><strong>{exp.company}</strong>{exp.location ? ` | ${exp.location}` : ''}</div>
              {exp.description && <p style={{ whiteSpace: 'pre-line', fontSize: '9.5pt' }}>{exp.description}</p>}
            </div>
          ))}
        </>
      )}

      {education.length > 0 && (
        <>
          <h2>Education</h2>
          {education.map((edu, i) => (
            <div key={i} className="education-item">
              <div className="item-header">
                <h3>{edu.degree}</h3>
                <span className="item-date">{edu.startDate} - {edu.endDate}</span>
              </div>
              <div className="item-subtitle">{edu.institution}{edu.gpa ? ` | GPA: ${edu.gpa}` : ''}</div>
            </div>
          ))}
        </>
      )}

      {skills.length > 0 && (
        <>
          <h2>Core Competencies</h2>
          <div className="skills-list">
            {skills.map((skill, i) => (
              <span key={i} className="skill-tag">{skill.name}</span>
            ))}
          </div>
        </>
      )}

      {certifications.length > 0 && (
        <>
          <h2>Certifications</h2>
          {certifications.map((cert, i) => (
            <div key={i} className="experience-item">
              <div className="item-header"><h3>{cert.name}</h3><span className="item-date">{cert.date}</span></div>
              <div className="item-subtitle">{cert.issuer}</div>
            </div>
          ))}
        </>
      )}

      {languages.length > 0 && (
        <>
          <h2>Languages</h2>
          <div className="skills-list">
            {languages.map((lang, i) => (
              <span key={i} className="skill-tag">{lang.name} ({lang.proficiency})</span>
            ))}
          </div>
        </>
      )}

      {projects.length > 0 && (
        <>
          <h2>Key Projects</h2>
          {projects.map((proj, i) => (
            <div key={i} className="experience-item">
              <h3>{proj.title}</h3>
              {proj.technologies && <div className="item-subtitle">Technologies: {proj.technologies}</div>}
              {proj.description && <p style={{ fontSize: '9.5pt' }}>{proj.description}</p>}
            </div>
          ))}
        </>
      )}

      {references.length > 0 && (
        <>
          <h2>References</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
            {references.map((ref, i) => (
              <div key={i}>
                <h3>{ref.name}</h3>
                <div className="item-subtitle">{ref.position}, {ref.company}</div>
                {ref.email && <p style={{ fontSize: '9pt' }}>{ref.email}</p>}
                {ref.phone && <p style={{ fontSize: '9pt' }}>{ref.phone}</p>}
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

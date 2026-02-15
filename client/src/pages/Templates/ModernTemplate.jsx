export default function ModernTemplate({ data }) {
  const { personalInfo = {}, careerObjective, experience = [], education = [], skills = [], certifications = [], languages = [], projects = [], references = [] } = data;

  return (
    <div className="cv-preview" id="cv-content">
      {/* Header */}
      <h1 style={{ color: '#1a56db' }}>{personalInfo.fullName || 'Your Name'}</h1>

      <div className="contact-info">
        {personalInfo.email && <span>{personalInfo.email}</span>}
        {personalInfo.phone && <span>{personalInfo.phone}</span>}
        {personalInfo.city && <span>{personalInfo.city}</span>}
        {personalInfo.nationality && <span>{personalInfo.nationality}</span>}
        {personalInfo.visaStatus && <span>{personalInfo.visaStatus}</span>}
        {personalInfo.linkedin && <span>{personalInfo.linkedin}</span>}
        {personalInfo.website && <span>{personalInfo.website}</span>}
      </div>

      {/* Career Objective */}
      {careerObjective && (
        <>
          <h2>Career Objective</h2>
          <p>{careerObjective}</p>
        </>
      )}

      {/* Experience */}
      {experience.length > 0 && (
        <>
          <h2>Work Experience</h2>
          {experience.map((exp, i) => (
            <div key={i} className="experience-item">
              <div className="item-header">
                <h3>{exp.jobTitle}</h3>
                <span className="item-date">
                  {exp.startDate} - {exp.current ? 'Present' : exp.endDate}
                </span>
              </div>
              <div className="item-subtitle">
                {exp.company}{exp.location ? `, ${exp.location}` : ''}
              </div>
              {exp.description && (
                <p style={{ whiteSpace: 'pre-line', fontSize: '9.5pt' }}>{exp.description}</p>
              )}
            </div>
          ))}
        </>
      )}

      {/* Education */}
      {education.length > 0 && (
        <>
          <h2>Education</h2>
          {education.map((edu, i) => (
            <div key={i} className="education-item">
              <div className="item-header">
                <h3>{edu.degree}</h3>
                <span className="item-date">
                  {edu.startDate} - {edu.endDate}
                </span>
              </div>
              <div className="item-subtitle">
                {edu.institution}{edu.location ? `, ${edu.location}` : ''}
                {edu.gpa ? ` | GPA: ${edu.gpa}` : ''}
              </div>
              {edu.description && <p style={{ fontSize: '9.5pt' }}>{edu.description}</p>}
            </div>
          ))}
        </>
      )}

      {/* Skills */}
      {skills.length > 0 && (
        <>
          <h2>Skills</h2>
          <div className="skills-list">
            {skills.map((skill, i) => (
              <span key={i} className="skill-tag">
                {skill.name}{skill.level ? ` (${skill.level})` : ''}
              </span>
            ))}
          </div>
        </>
      )}

      {/* Certifications */}
      {certifications.length > 0 && (
        <>
          <h2>Certifications</h2>
          {certifications.map((cert, i) => (
            <div key={i} className="experience-item">
              <div className="item-header">
                <h3>{cert.name}</h3>
                <span className="item-date">{cert.date}</span>
              </div>
              <div className="item-subtitle">{cert.issuer}</div>
              {cert.credentialId && (
                <p style={{ fontSize: '8.5pt', color: '#888' }}>ID: {cert.credentialId}</p>
              )}
            </div>
          ))}
        </>
      )}

      {/* Languages */}
      {languages.length > 0 && (
        <>
          <h2>Languages</h2>
          <div className="skills-list">
            {languages.map((lang, i) => (
              <span key={i} className="skill-tag">
                {lang.name}{lang.proficiency ? ` - ${lang.proficiency}` : ''}
              </span>
            ))}
          </div>
        </>
      )}

      {/* Projects */}
      {projects.length > 0 && (
        <>
          <h2>Projects</h2>
          {projects.map((proj, i) => (
            <div key={i} className="experience-item">
              <h3>{proj.title}</h3>
              {proj.technologies && (
                <div className="item-subtitle">Technologies: {proj.technologies}</div>
              )}
              {proj.description && <p style={{ fontSize: '9.5pt' }}>{proj.description}</p>}
              {proj.link && <p style={{ fontSize: '8.5pt', color: '#1a56db' }}>{proj.link}</p>}
            </div>
          ))}
        </>
      )}

      {/* References */}
      {references.length > 0 && (
        <>
          <h2>References</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
            {references.map((ref, i) => (
              <div key={i}>
                <h3>{ref.name}</h3>
                <div className="item-subtitle">
                  {ref.position}{ref.company ? `, ${ref.company}` : ''}
                </div>
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

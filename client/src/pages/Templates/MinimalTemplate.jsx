export default function MinimalTemplate({ data }) {
  const { personalInfo = {}, careerObjective, experience = [], education = [], skills = [], certifications = [], languages = [], projects = [], references = [] } = data;

  return (
    <div className="cv-preview cv-minimal" id="cv-content">
      <h1>{personalInfo.fullName || 'Your Name'}</h1>

      <div className="contact-info">
        {personalInfo.email && <span>{personalInfo.email}</span>}
        {personalInfo.phone && <span>{personalInfo.phone}</span>}
        {personalInfo.city && <span>{personalInfo.city}</span>}
        {personalInfo.linkedin && <span>{personalInfo.linkedin}</span>}
      </div>

      {careerObjective && (
        <>
          <h2>About</h2>
          <p>{careerObjective}</p>
        </>
      )}

      {experience.length > 0 && (
        <>
          <h2>Experience</h2>
          {experience.map((exp, i) => (
            <div key={i} className="experience-item">
              <div className="item-header">
                <h3>{exp.jobTitle} at {exp.company}</h3>
                <span className="item-date">{exp.startDate} - {exp.current ? 'Present' : exp.endDate}</span>
              </div>
              {exp.location && <div className="item-subtitle">{exp.location}</div>}
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
              <div className="item-subtitle">{edu.institution}{edu.gpa ? ` (${edu.gpa})` : ''}</div>
            </div>
          ))}
        </>
      )}

      {skills.length > 0 && (
        <>
          <h2>Skills</h2>
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
            <p key={i} style={{ marginBottom: '4px', fontSize: '9.5pt' }}>
              {cert.name} - {cert.issuer} ({cert.date})
            </p>
          ))}
        </>
      )}

      {languages.length > 0 && (
        <>
          <h2>Languages</h2>
          <div className="skills-list">
            {languages.map((lang, i) => (
              <span key={i} className="skill-tag">{lang.name}</span>
            ))}
          </div>
        </>
      )}

      {projects.length > 0 && (
        <>
          <h2>Projects</h2>
          {projects.map((proj, i) => (
            <div key={i} className="experience-item">
              <h3>{proj.title}</h3>
              {proj.description && <p style={{ fontSize: '9.5pt' }}>{proj.description}</p>}
            </div>
          ))}
        </>
      )}

      {references.length > 0 && (
        <>
          <h2>References</h2>
          {references.map((ref, i) => (
            <p key={i} style={{ marginBottom: '4px', fontSize: '9.5pt' }}>
              {ref.name} - {ref.position}, {ref.company} | {ref.email}
            </p>
          ))}
        </>
      )}
    </div>
  );
}

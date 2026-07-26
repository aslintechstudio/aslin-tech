function ProjectMeta({ project, language }) {
  const isEnglish = language === 'en'

  return (
    <div className="contact-information">
      <p className="contact-facts">
        <span>
          {isEnglish ? project.locationEn : project.location},{' '}
          {isEnglish ? project.countryEn : project.country}
        </span>
        <span aria-hidden="true">/</span>
        <span>{isEnglish ? project.typeEn : project.type}</span>
        <span aria-hidden="true">/</span>
        <span>{project.year}</span>
      </p>
      <p className="contact-description">
        {isEnglish ? project.descriptionEn : project.description}
      </p>
    </div>
  )
}

export default ProjectMeta

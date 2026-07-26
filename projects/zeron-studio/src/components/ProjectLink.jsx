function ProjectLink({ project, label }) {
  return (
    <a className="contact-link" href={`#${project.id}`}>
      {label} <span aria-hidden="true">↗</span>
    </a>
  )
}

export default ProjectLink

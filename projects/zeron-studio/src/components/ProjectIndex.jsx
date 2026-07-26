function ProjectIndex({ projects, activeIndex, onSelect, label }) {
  return (
    <nav className="project-switcher" aria-label={label}>
      <ol>
        {projects.map((project, index) => {
          const isActive = index === activeIndex

          return (
            <li className={isActive ? 'is-active' : ''} key={project.id}>
              <button
                type="button"
                onClick={() => onSelect(index)}
                aria-current={isActive ? 'true' : undefined}
              >
                <span>{project.number}</span>
                <span>{project.title}</span>
              </button>
            </li>
          )
        })}
      </ol>
    </nav>
  )
}

export default ProjectIndex

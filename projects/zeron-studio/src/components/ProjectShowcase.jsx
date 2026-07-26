import { useEffect, useRef, useState } from 'react'
import projects from '../data/projects'
import ProjectIndex from './ProjectIndex'
import ProjectImages from './ProjectImages'
import ProjectLink from './ProjectLink'
import ProjectMeta from './ProjectMeta'
import { useLanguage } from '../context/LanguageContext'

function ProjectShowcase() {
  const { language, copy } = useLanguage()
  const [activeIndex, setActiveIndex] = useState(0)
  const [phase, setPhase] = useState('idle')
  const timers = useRef([])

  const project = projects[activeIndex]
  const nextIndex = (activeIndex + 1) % projects.length
  const nextProject = projects[nextIndex]

  useEffect(() => {
    const preload = new Image()
    preload.src = nextProject.images[0].url
  }, [nextProject])

  useEffect(() => () => timers.current.forEach(clearTimeout), [])

  const showProject = (targetIndex) => {
    if (phase !== 'idle' || targetIndex === activeIndex) return

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setActiveIndex(targetIndex)
      return
    }

    setPhase('leaving')
    timers.current.push(
      setTimeout(() => {
        setActiveIndex(targetIndex)
        setPhase('entering')
      }, 220),
      setTimeout(() => setPhase('idle'), 560),
    )
  }

  return (
    <section
      className={`contact-opening contact-opening--${phase}`}
      id="top"
      data-section="hero"
      aria-labelledby="project-title"
    >
      <p className="visually-hidden" aria-live="polite">
        {copy.activeProject}: {project.number}, {project.title}
      </p>

      <div className="contact-sheet">
        <header className="contact-title">
          <button className="contact-title__number" type="button" onClick={() => showProject(nextIndex)} aria-label={copy.nextProject}>
            {project.number}
          </button>
          <h1 id="project-title">
            <button type="button" onClick={() => showProject(nextIndex)} aria-label={`${project.title}: ${copy.nextProject}`}>
              {project.title}
            </button>
          </h1>
        </header>

        <ProjectImages
          images={project.images}
          projectTitle={project.title}
          archiveLabel={copy.archive}
          language={language}
          key={project.id}
        />
        <ProjectMeta project={project} language={language} />
        <ProjectIndex projects={projects} activeIndex={activeIndex} onSelect={showProject} label={copy.projectSelection} />
        <ProjectLink project={project} label={copy.viewProject} />

        <p className="contact-sheet__vertical">
          <span>{copy.selectedWorks}</span>
          <span>2021—2026</span>
        </p>
      </div>
    </section>
  )
}

export default ProjectShowcase

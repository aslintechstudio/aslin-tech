import { useEffect, useMemo, useRef, useState } from 'react'
import {
  ArrowRight,
  CheckSquare,
  Files,
  MessageSquare,
  Plus,
  Search,
  Users,
  X,
} from 'lucide-react'
import IconButton from '../components/common/IconButton'

const statuses = ['Tümü', 'Aktif', 'Planlanıyor', 'Tamamlandı']

const emptyForm = {
  name: '',
  category: '',
  description: '',
  startDate: '',
  targetDate: '',
  status: 'Planlanıyor',
}

function ProjectOverlay({ type, project, onClose, children }) {
  const panelRef = useRef(null)

  useEffect(() => {
    const previousFocus = document.activeElement
    const panel = panelRef.current
    const focusableSelector =
      'button, input, textarea, select, [href], [tabindex]:not([tabindex="-1"])'

    document.body.classList.add('menu-open')
    panel?.querySelector(focusableSelector)?.focus()

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') onClose()
      if (event.key !== 'Tab' || !panel) return

      const focusable = [...panel.querySelectorAll(focusableSelector)].filter(
        (element) => !element.disabled,
      )
      if (!focusable.length) return
      const first = focusable[0]
      const last = focusable[focusable.length - 1]

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault()
        last.focus()
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault()
        first.focus()
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => {
      document.body.classList.remove('menu-open')
      window.removeEventListener('keydown', handleKeyDown)
      previousFocus?.focus()
    }
  }, [onClose])

  return (
    <div
      className={`project-overlay project-overlay--${type}`}
      role="dialog"
      aria-modal="true"
      aria-labelledby={`${type}-title`}
    >
      <button
        className="project-overlay__backdrop"
        type="button"
        aria-label={
          project ? 'Proje detayını kapat' : 'Yeni proje penceresini kapat'
        }
        onClick={onClose}
      />
      <div className="project-overlay__panel" ref={panelRef}>
        {children}
      </div>
    </div>
  )
}

export default function Projects() {
  const [projects, setProjects] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('Tümü')
  const [sortBy, setSortBy] = useState('Son güncellenen')
  const [selectedProject, setSelectedProject] = useState(null)
  const [isNewProjectOpen, setIsNewProjectOpen] = useState(false)
  const [form, setForm] = useState(emptyForm)
  const [formError, setFormError] = useState('')
  const [toast, setToast] = useState('')
  const toastTimer = useRef(null)

  useEffect(
    () => () => {
      window.clearTimeout(toastTimer.current)
    },
    [],
  )

  const visibleProjects = useMemo(() => {
    const normalizedSearch = searchTerm.trim().toLocaleLowerCase('tr-TR')
    const filtered = projects.filter((project) => {
      const matchesStatus =
        statusFilter === 'Tümü' || project.status === statusFilter
      const searchableText =
        `${project.name} ${project.category} ${project.description}`.toLocaleLowerCase(
          'tr-TR',
        )
      return matchesStatus && searchableText.includes(normalizedSearch)
    })

    return [...filtered].sort((a, b) => {
      if (sortBy === 'Ada göre') {
        return a.name.localeCompare(b.name, 'tr-TR')
      }
      if (sortBy === 'İlerlemeye göre') {
        return b.progress - a.progress
      }
      return a.updatedOrder - b.updatedOrder
    })
  }, [projects, searchTerm, sortBy, statusFilter])

  const resetFilters = () => {
    setSearchTerm('')
    setStatusFilter('Tümü')
    setSortBy('Son güncellenen')
  }

  const closeNewProject = () => {
    setIsNewProjectOpen(false)
    setForm(emptyForm)
    setFormError('')
  }

  const updateForm = (field, value) => {
    setForm((current) => ({ ...current, [field]: value }))
    if (field === 'name' && value.trim()) setFormError('')
  }

  const handleCreateProject = (event) => {
    event.preventDefault()
    if (!form.name.trim()) {
      setFormError('Proje adı zorunludur.')
      return
    }

    const newProject = {
      id: Date.now(),
      name: form.name.trim(),
      category: form.category.trim() || 'Genel proje',
      description: form.description.trim() || 'Yeni çalışma alanı projesi.',
      status: form.status,
      progress: form.status === 'Tamamlandı' ? 100 : 0,
      updated: 'Az önce',
      updatedOrder: 0,
      files: 0,
      tasks: 0,
      conversations: 0,
      recentFiles: [],
      openTasks: [],
      recentChats: [],
      team: ['Irmak'],
    }

    setProjects((current) => [newProject, ...current])
    closeNewProject()
    setToast('Proje başarıyla oluşturuldu.')
    window.clearTimeout(toastTimer.current)
    toastTimer.current = window.setTimeout(() => setToast(''), 2500)
  }

  return (
    <div className="projects-page">
      <header className="projects-header">
        <div>
          <h1>Projeler</h1>
          <p>
            Çalışmalarını, dosyalarını, görevlerini ve yapay zekâ konuşmalarını
            tek yerde yönet.
          </p>
        </div>
        <button
          className="projects-primary-action"
          type="button"
          onClick={() => setIsNewProjectOpen(true)}
        >
          <Plus size={18} aria-hidden="true" />
          Yeni Proje
        </button>
      </header>

      <section className="project-controls" aria-label="Proje kontrolleri">
        <label className="project-search">
          <span className="sr-only">Projelerde ara</span>
          <Search size={18} aria-hidden="true" />
          <input
            type="search"
            value={searchTerm}
            placeholder="Projelerde ara..."
            onChange={(event) => setSearchTerm(event.target.value)}
          />
        </label>

        <div className="project-status-filter" aria-label="Duruma göre filtrele">
          {statuses.map((status) => (
            <button
              key={status}
              type="button"
              className={
                statusFilter === status
                  ? 'project-filter project-filter--active'
                  : 'project-filter'
              }
              aria-pressed={statusFilter === status}
              onClick={() => setStatusFilter(status)}
            >
              {status}
            </button>
          ))}
        </div>

        <label className="project-sort">
          <span className="sr-only">Projeleri sırala</span>
          <select value={sortBy} onChange={(event) => setSortBy(event.target.value)}>
            <option>Son güncellenen</option>
            <option>Ada göre</option>
            <option>İlerlemeye göre</option>
          </select>
        </label>
      </section>

      {visibleProjects.length ? (
        <section className="project-list" aria-label="Proje listesi">
          <div className="project-list__labels" aria-hidden="true">
            <span>Proje</span>
            <span>Durum</span>
            <span>İlerleme</span>
            <span>Güncelleme</span>
            <span>İçerik</span>
          </div>
          {visibleProjects.map((project) => (
            <button
              className="project-row"
              type="button"
              key={project.id}
              onClick={() => setSelectedProject(project)}
            >
              <span className="project-row__identity">
                <strong>{project.name}</strong>
                <span>{project.category}</span>
                <small>{project.description}</small>
              </span>
              <span
                className={`project-status project-status--${project.status
                  .toLocaleLowerCase('tr-TR')
                  .replace('ı', 'i')}`}
              >
                {project.status}
              </span>
              <span className="project-progress">
                <span className="project-progress__value">{project.progress}%</span>
                <span className="project-progress__track" aria-hidden="true">
                  <span style={{ width: `${project.progress}%` }} />
                </span>
              </span>
              <span className="project-row__updated">{project.updated}</span>
              <span className="project-row__counts">
                <span title={`${project.files} dosya`}>
                  <Files size={16} aria-hidden="true" />
                  {project.files}
                </span>
                <span title={`${project.tasks} görev`}>
                  <CheckSquare size={16} aria-hidden="true" />
                  {project.tasks}
                </span>
                <span title={`${project.conversations} konuşma`}>
                  <MessageSquare size={16} aria-hidden="true" />
                  {project.conversations}
                </span>
              </span>
              <ArrowRight
                className="project-row__arrow"
                size={18}
                aria-hidden="true"
              />
            </button>
          ))}
        </section>
      ) : projects.length === 0 ? (
        <section className="project-empty" aria-labelledby="project-empty-title">
          <h2 id="project-empty-title">Henüz proje yok</h2>
          <p>
            Yeni bir proje oluşturarak çalışmalarını, dosyalarını, görevlerini ve
            yapay zekâ konuşmalarını tek yerde yönetmeye başlayabilirsin.
          </p>
          <button type="button" onClick={() => setIsNewProjectOpen(true)}>
            İlk Projeni Oluştur
          </button>
        </section>
      ) : (
        <section className="project-empty" aria-labelledby="project-empty-title">
          <h2 id="project-empty-title">Proje bulunamadı</h2>
          <p>Arama veya filtrelerini değiştirerek tekrar deneyebilirsin.</p>
          <button type="button" onClick={resetFilters}>
            Filtreleri Temizle
          </button>
        </section>
      )}

      {selectedProject && (
        <ProjectOverlay
          type="drawer"
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
        >
          <header className="project-detail__header">
            <IconButton
              label="Proje detayını kapat"
              onClick={() => setSelectedProject(null)}
            >
              <X size={20} />
            </IconButton>
            <div>
              <span>{selectedProject.category}</span>
              <h2 id="drawer-title">{selectedProject.name}</h2>
            </div>
          </header>
          <div className="project-detail__body">
            <div className="project-detail__summary">
              <span className="project-status">{selectedProject.status}</span>
              <strong>{selectedProject.progress}% tamamlandı</strong>
              <div className="project-progress__track" aria-hidden="true">
                <span style={{ width: `${selectedProject.progress}%` }} />
              </div>
              <p>{selectedProject.description}</p>
            </div>
            <DetailSection
              icon={Files}
              title="Son dosyalar"
              items={selectedProject.recentFiles}
              empty="Henüz dosya yok."
            />
            <DetailSection
              icon={CheckSquare}
              title="Açık görevler"
              items={selectedProject.openTasks}
              empty="Açık görev yok."
            />
            <DetailSection
              icon={MessageSquare}
              title="Son yapay zekâ konuşmaları"
              items={selectedProject.recentChats}
              empty="Henüz konuşma yok."
            />
            <DetailSection
              icon={Users}
              title="Ekip üyeleri"
              items={selectedProject.team}
              empty="Ekip üyesi yok."
            />
          </div>
          <footer className="project-detail__actions">
            <button type="button" className="project-secondary-action">
              Düzenle
            </button>
            <button type="button" className="projects-primary-action">
              Projeyi Aç
              <ArrowRight size={17} aria-hidden="true" />
            </button>
          </footer>
        </ProjectOverlay>
      )}

      {isNewProjectOpen && (
        <ProjectOverlay type="modal" onClose={closeNewProject}>
          <header className="project-modal__header">
            <div>
              <span>Yeni çalışma alanı</span>
              <h2 id="modal-title">Yeni Proje</h2>
            </div>
            <IconButton label="Yeni proje penceresini kapat" onClick={closeNewProject}>
              <X size={20} />
            </IconButton>
          </header>
          <form className="project-form" onSubmit={handleCreateProject} noValidate>
            <label>
              <span>Proje adı</span>
              <input
                autoFocus
                value={form.name}
                aria-invalid={Boolean(formError)}
                aria-describedby={formError ? 'project-name-error' : undefined}
                onChange={(event) => updateForm('name', event.target.value)}
              />
              {formError && (
                <small id="project-name-error" className="project-form__error">
                  {formError}
                </small>
              )}
            </label>
            <label>
              <span>Kategori</span>
              <input
                value={form.category}
                onChange={(event) => updateForm('category', event.target.value)}
              />
            </label>
            <label className="project-form__wide">
              <span>Açıklama</span>
              <textarea
                rows="3"
                value={form.description}
                onChange={(event) => updateForm('description', event.target.value)}
              />
            </label>
            <label>
              <span>Başlangıç tarihi</span>
              <input
                type="date"
                value={form.startDate}
                onChange={(event) => updateForm('startDate', event.target.value)}
              />
            </label>
            <label>
              <span>Hedef tarih</span>
              <input
                type="date"
                value={form.targetDate}
                onChange={(event) => updateForm('targetDate', event.target.value)}
              />
            </label>
            <label className="project-form__wide">
              <span>Durum</span>
              <select
                value={form.status}
                onChange={(event) => updateForm('status', event.target.value)}
              >
                <option>Planlanıyor</option>
                <option>Aktif</option>
                <option>Tamamlandı</option>
              </select>
            </label>
            <div className="project-form__actions">
              <button
                type="button"
                className="project-secondary-action"
                onClick={closeNewProject}
              >
                İptal
              </button>
              <button type="submit" className="projects-primary-action">
                Proje Oluştur
              </button>
            </div>
          </form>
        </ProjectOverlay>
      )}

      {toast && (
        <div className="dashboard-toast" role="status" aria-live="polite">
          {toast}
        </div>
      )}
    </div>
  )
}

function DetailSection({ icon: Icon, title, items, empty }) {
  return (
    <section className="project-detail-section">
      <h3>
        <Icon size={17} aria-hidden="true" />
        {title}
      </h3>
      {items.length ? (
        <ul>
          {items.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      ) : (
        <p>{empty}</p>
      )}
    </section>
  )
}

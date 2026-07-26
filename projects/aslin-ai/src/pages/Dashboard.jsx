import { useEffect, useRef, useState } from 'react'
import {
  ArrowUp,
  BriefcaseBusiness,
  Check,
  FileSearch,
  ImagePlus,
  Lightbulb,
  Mic,
  Paperclip,
} from 'lucide-react'
import IconButton from '../components/common/IconButton'
import { dashboardData } from '../data/mockData'

const quickActionIcons = {
  file: FileSearch,
  image: ImagePlus,
  project: BriefcaseBusiness,
  idea: Lightbulb,
}

export default function Dashboard() {
  const [message, setMessage] = useState('')
  const [placeholder, setPlaceholder] = useState(
    'Ne üzerinde çalışmak istiyorsun?',
  )
  const [selectedAction, setSelectedAction] = useState(null)
  const [notice, setNotice] = useState('')
  const [toast, setToast] = useState('')
  const [isResponding, setIsResponding] = useState(false)
  const inputRef = useRef(null)
  const timerRef = useRef(null)
  const toastTimerRef = useRef(null)

  useEffect(
    () => () => {
      window.clearTimeout(timerRef.current)
      window.clearTimeout(toastTimerRef.current)
    },
    [],
  )

  const showTemporaryStatus = (text, duration = 2400) => {
    window.clearTimeout(timerRef.current)
    setNotice(text)
    timerRef.current = window.setTimeout(() => setNotice(''), duration)
  }

  const handleQuickAction = (action) => {
    setSelectedAction(action.label)
    setPlaceholder(action.prompt)
    inputRef.current?.focus()
  }

  const showToast = (text) => {
    window.clearTimeout(toastTimerRef.current)
    setToast('')
    window.requestAnimationFrame(() => setToast(text))
    toastTimerRef.current = window.setTimeout(() => setToast(''), 2500)
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    if (!message.trim()) {
      showTemporaryStatus('Başlamak için çalışma isteğini yazabilirsin.')
      inputRef.current?.focus()
      return
    }

    setMessage('')
    setIsResponding(true)
    window.clearTimeout(timerRef.current)
    timerRef.current = window.setTimeout(() => {
      setIsResponding(false)
      showTemporaryStatus('İsteğin alındı. Bu, örnek bir yanıt durumudur.')
    }, 900)
  }

  return (
    <div className="welcome-dashboard">
      <section className="welcome-hero" aria-labelledby="welcome-title">
        <p className="welcome-hero__greeting">Merhaba Irmak</p>
        <h1 id="welcome-title">Bugün senin için ne yapabilirim?</h1>

        <div className="quick-actions" aria-label="Hızlı işlemler">
          {dashboardData.quickActions.map((action) => {
            const Icon = quickActionIcons[action.icon]
            const isSelected = selectedAction === action.label
            const ChipIcon = isSelected ? Check : Icon
            return (
              <button
                key={action.label}
                className={`quick-action${
                  isSelected ? ' quick-action--active' : ''
                }`}
                type="button"
                aria-pressed={isSelected}
                onClick={() => handleQuickAction(action)}
              >
                <ChipIcon size={17} aria-hidden="true" />
                <span>{action.label}</span>
              </button>
            )
          })}
        </div>

        <form
          className={`ai-composer${
            message ? ' ai-composer--has-value' : ''
          }`}
          onSubmit={handleSubmit}
        >
          <label className="sr-only" htmlFor="dashboard-prompt">
            ASLIN AI çalışma isteği
          </label>
          <textarea
            ref={inputRef}
            id="dashboard-prompt"
            rows="3"
            value={message}
            placeholder={placeholder}
            onChange={(event) => setMessage(event.target.value)}
            onKeyDown={(event) => {
              if (event.key === 'Escape') {
                setMessage('')
                setNotice('')
                return
              }
              if ((event.metaKey || event.ctrlKey) && event.key === 'Enter') {
                handleSubmit(event)
              }
            }}
          />
          <div className="ai-composer__toolbar">
            <div className="ai-composer__tools">
              <IconButton
                label="Dosya ekle"
                onClick={() => showToast('Dosya yükleme yakında eklenecek.')}
              >
                <Paperclip size={19} />
              </IconButton>
              <IconButton
                label="Sesli giriş başlat"
                onClick={() => showToast('Sesli giriş yakında eklenecek.')}
              >
                <Mic size={19} />
              </IconButton>
            </div>
            <span className="ai-composer__shortcut" aria-hidden="true">
              Ctrl + Enter
            </span>
            <button
              className="ai-composer__send"
              type="submit"
              aria-label="İsteği gönder"
              disabled={!message.trim() || isResponding}
            >
              <ArrowUp size={20} />
            </button>
          </div>
        </form>

        <div className="composer-status" aria-live="polite" aria-atomic="true">
          {isResponding ? (
            <span className="composer-status__responding">
              ASLIN AI isteğini hazırlıyor…
            </span>
          ) : (
            notice
          )}
        </div>
      </section>

      <div className="dashboard-recents">
        <section aria-labelledby="recent-work-title">
          <div className="section-heading">
            <h2 id="recent-work-title">Son çalışmalar</h2>
          </div>
          <ul className="recent-work-list">
            {dashboardData.recentProjects.map((project) => (
              <li key={project.name}>
                <button
                  type="button"
                  onClick={() =>
                    showTemporaryStatus(`${project.name} projesi açılıyor.`)
                  }
                >
                  <span className="recent-work-list__name">{project.name}</span>
                  <span className="recent-work-list__type">{project.type}</span>
                  <ArrowUp
                    className="recent-item-arrow"
                    size={17}
                    aria-hidden="true"
                  />
                </button>
              </li>
            ))}
          </ul>
        </section>

        <section aria-labelledby="recent-chats-title">
          <div className="section-heading">
            <h2 id="recent-chats-title">Son konuşmalar</h2>
          </div>
          <ul className="recent-conversation-list">
            {dashboardData.recentConversations.map((conversation) => (
              <li key={conversation}>
                <button
                  type="button"
                  onClick={() =>
                    showTemporaryStatus(`“${conversation}” konuşması açılıyor.`)
                  }
                >
                  {conversation}
                </button>
              </li>
            ))}
          </ul>
        </section>
      </div>

      {toast && (
        <div className="dashboard-toast" role="status" aria-live="polite">
          {toast}
        </div>
      )}
    </div>
  )
}

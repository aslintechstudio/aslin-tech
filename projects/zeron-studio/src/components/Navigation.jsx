import { useLanguage } from '../context/LanguageContext'
import { useEffect, useState } from 'react'

const navigationTargets = ['#projeler', '#studio', '#yaklasim', '#arsiv', '#iletisim']

function Navigation() {
  const { language, setLanguage, copy } = useLanguage()
  const [open, setOpen] = useState(false)
  useEffect(() => {
    const close = (event) => { if (event.key === 'Escape') setOpen(false) }
    window.addEventListener('keydown', close)
    return () => window.removeEventListener('keydown', close)
  }, [])

  return (
    <header className="archive-header">
      <nav className="archive-navigation" aria-label={copy.mainNavigation}>
        <a className="archive-wordmark" href="#top" aria-label={copy.home}>
          Zeron Studio
        </a>

        <ul id="studio-navigation" className={`archive-navigation__links ${open ? 'is-open' : ''}`}>
          {copy.navigation.map((label, index) => (
            <li key={label}>
              <a href={navigationTargets[index]} onClick={() => setOpen(false)}>{label}</a>
            </li>
          ))}
        </ul>

        <div className="archive-navigation__meta">
          <div className="language-switcher" aria-label={copy.languageSelection}>
            {['tr', 'en'].map((option, index) => (
              <span key={option}>
                {index > 0 && <span aria-hidden="true"> / </span>}
                <button
                  className={language === option ? 'is-active' : ''}
                  type="button"
                  onClick={() => setLanguage(option)}
                  aria-pressed={language === option}
                >
                  {option.toUpperCase()}
                </button>
              </span>
            ))}
          </div>
          <button className="archive-menu" type="button" aria-label={copy.menu} aria-expanded={open} aria-controls="studio-navigation" onClick={() => setOpen(!open)}>
            <span>{copy.menu}</span>
            <span aria-hidden="true">{open ? '−' : '+'}</span>
          </button>
        </div>
      </nav>
    </header>
  )
}

export default Navigation

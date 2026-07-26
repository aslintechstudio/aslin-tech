import { useLanguage } from '../context/LanguageContext'

const navigationTargets = ['#projeler', '#studio', '#yaklasim', '#arsiv', '#iletisim']

function Navigation() {
  const { language, setLanguage, copy } = useLanguage()

  return (
    <header className="archive-header">
      <nav className="archive-navigation" aria-label={copy.mainNavigation}>
        <a className="archive-wordmark" href="#top" aria-label={copy.home}>
          Zeron Studio
        </a>

        <ul className="archive-navigation__links">
          {copy.navigation.map((label, index) => (
            <li key={label}>
              <a href={navigationTargets[index]}>{label}</a>
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
          <button className="archive-menu" type="button" aria-label={copy.menu}>
            <span>{copy.menu}</span>
            <span aria-hidden="true">01</span>
          </button>
        </div>
      </nav>
    </header>
  )
}

export default Navigation

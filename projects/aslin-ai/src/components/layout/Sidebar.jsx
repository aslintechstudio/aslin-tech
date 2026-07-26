import { NavLink } from 'react-router-dom'
import Logo from '../common/Logo'
import { navigationItems } from '../../data/navigation'

function Sidebar({ mobile = false, onNavigate }) {
  return (
    <aside className={mobile ? 'sidebar sidebar--mobile' : 'sidebar'}>
      <Logo />
      <nav className="sidebar__nav" aria-label="Ana navigasyon">
        {navigationItems.map(({ label, path, icon: Icon }) => (
          <NavLink
            key={path}
            to={path}
            end={path === '/'}
            onClick={onNavigate}
            className={({ isActive }) =>
              `nav-item${isActive ? ' nav-item--active' : ''}`
            }
          >
            <Icon size={19} aria-hidden="true" />
            <span>{label}</span>
          </NavLink>
        ))}
      </nav>
      <p className="sidebar__description">
        Yapay zekâ destekli akıllı çalışma alanı
      </p>
    </aside>
  )
}

export default Sidebar

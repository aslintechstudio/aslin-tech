import { useCallback, useState } from 'react'
import { Outlet } from 'react-router-dom'
import MobileMenu from './MobileMenu'
import Sidebar from './Sidebar'
import Topbar from './Topbar'

function AppShell() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const closeMobileMenu = useCallback(() => setIsMobileMenuOpen(false), [])

  return (
    <div className="app-shell">
      <Sidebar />
      <div className="app-shell__body">
        <Topbar onMenuOpen={() => setIsMobileMenuOpen(true)} />
        <main className="main-content">
          <Outlet />
        </main>
      </div>
      <MobileMenu isOpen={isMobileMenuOpen} onClose={closeMobileMenu} />
    </div>
  )
}

export default AppShell

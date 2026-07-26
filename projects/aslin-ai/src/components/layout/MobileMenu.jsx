import { useEffect } from 'react'
import { X } from 'lucide-react'
import IconButton from '../common/IconButton'
import Sidebar from './Sidebar'

function MobileMenu({ isOpen, onClose }) {
  useEffect(() => {
    if (!isOpen) return undefined

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') onClose()
    }

    document.body.classList.add('menu-open')
    window.addEventListener('keydown', handleKeyDown)

    return () => {
      document.body.classList.remove('menu-open')
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [isOpen, onClose])

  if (!isOpen) return null

  return (
    <div className="mobile-menu" role="dialog" aria-modal="true" aria-label="Mobil menü">
      <button
        className="mobile-menu__backdrop"
        type="button"
        aria-label="Menüyü kapat"
        onClick={onClose}
      />
      <div className="mobile-menu__panel">
        <IconButton
          label="Menüyü kapat"
          className="mobile-menu__close"
          onClick={onClose}
          autoFocus
        >
          <X size={21} />
        </IconButton>
        <Sidebar mobile onNavigate={onClose} />
      </div>
    </div>
  )
}

export default MobileMenu

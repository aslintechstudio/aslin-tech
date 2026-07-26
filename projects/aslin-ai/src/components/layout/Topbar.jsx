import { Bell, Menu, UserRound } from 'lucide-react'
import Avatar from '../common/Avatar'
import IconButton from '../common/IconButton'
import SearchBar from '../common/SearchBar'
import { currentUser } from '../../data/mockData'

function Topbar({ onMenuOpen }) {
  return (
    <header className="topbar">
      <IconButton
        label="Menüyü aç"
        className="topbar__menu-button"
        onClick={onMenuOpen}
      >
        <Menu size={21} />
      </IconButton>
      <SearchBar />
      <div className="topbar__actions">
        <IconButton label="Bildirimler">
          <Bell size={20} />
        </IconButton>
        <IconButton label="Profil" className="profile-button">
          <UserRound className="profile-button__fallback" size={20} />
          <Avatar initials={currentUser.initials} name={currentUser.name} />
        </IconButton>
      </div>
    </header>
  )
}

export default Topbar

import { Search } from 'lucide-react'

function SearchBar() {
  return (
    <label className="search-bar">
      <Search size={18} aria-hidden="true" />
      <span className="sr-only">Çalışma alanında ara</span>
      <input type="search" placeholder="Çalışma alanında ara..." />
    </label>
  )
}

export default SearchBar

import { createContext, useContext, useEffect, useState } from 'react'

const LanguageContext = createContext(null)

export const interfaceCopy = {
  tr: {
    navigation: ['Projeler', 'Stüdyo', 'Yaklaşım', 'Arşiv', 'İletişim'],
    menu: 'Menü',
    selectedWorks: 'Seçili Çalışmalar',
    viewProject: 'Projeyi İncele',
    archive: 'Arşivi',
    activeProject: 'Aktif proje',
    nextProject: 'Sonraki projeye geç',
    projectSelection: 'Proje seçimi',
    home: 'Zeron Studio ana sayfa',
    mainNavigation: 'Ana navigasyon',
    languageSelection: 'Dil seçimi',
  },
  en: {
    navigation: ['Projects', 'Studio', 'Approach', 'Archive', 'Contact'],
    menu: 'Menu',
    selectedWorks: 'Selected Works',
    viewProject: 'View Project',
    archive: 'Archive',
    activeProject: 'Active project',
    nextProject: 'Go to next project',
    projectSelection: 'Project selection',
    home: 'Zeron Studio home',
    mainNavigation: 'Main navigation',
    languageSelection: 'Language selection',
  },
}

export function LanguageProvider({ children }) {
  const [language, setLanguage] = useState('tr')

  useEffect(() => {
    document.documentElement.lang = language
  }, [language])

  return (
    <LanguageContext.Provider value={{ language, setLanguage, copy: interfaceCopy[language] }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (!context) throw new Error('useLanguage must be used within LanguageProvider')
  return context
}

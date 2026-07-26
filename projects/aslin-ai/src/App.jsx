import { Navigate, Route, Routes } from 'react-router-dom'
import AppShell from './components/layout/AppShell'
import Dashboard from './pages/Dashboard'
import Chat from './pages/Chat'
import Projects from './pages/Projects'
import Files from './pages/Files'
import Notes from './pages/Notes'
import Tasks from './pages/Tasks'
import ImageStudio from './pages/ImageStudio'
import Research from './pages/Research'
import Team from './pages/Team'
import History from './pages/History'
import Usage from './pages/Usage'
import Settings from './pages/Settings'

function App() {
  return (
    <Routes>
      <Route element={<AppShell />}>
        <Route path="/" element={<Dashboard />} />
        <Route path="/sohbet" element={<Chat />} />
        <Route path="/projeler" element={<Projects />} />
        <Route path="/dosyalar" element={<Files />} />
        <Route path="/notlar" element={<Notes />} />
        <Route path="/gorevler" element={<Tasks />} />
        <Route path="/gorsel-studyo" element={<ImageStudio />} />
        <Route path="/arastirma" element={<Research />} />
        <Route path="/ekip" element={<Team />} />
        <Route path="/gecmis" element={<History />} />
        <Route path="/kullanim" element={<Usage />} />
        <Route path="/ayarlar" element={<Settings />} />
      </Route>
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}

export default App

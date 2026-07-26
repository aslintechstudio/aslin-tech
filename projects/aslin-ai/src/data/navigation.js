import {
  BarChart3,
  CheckSquare,
  Clock3,
  FileText,
  Files,
  FolderKanban,
  Home,
  Image,
  MessageSquare,
  Search,
  Settings,
  Users,
} from 'lucide-react'

export const navigationItems = [
  { label: 'Ana Sayfa', path: '/', icon: Home },
  { label: 'Sohbet', path: '/sohbet', icon: MessageSquare },
  { label: 'Projeler', path: '/projeler', icon: FolderKanban },
  { label: 'Dosyalar', path: '/dosyalar', icon: Files },
  { label: 'Notlar', path: '/notlar', icon: FileText },
  { label: 'Görevler', path: '/gorevler', icon: CheckSquare },
  { label: 'Görsel Stüdyo', path: '/gorsel-studyo', icon: Image },
  { label: 'Araştırma', path: '/arastirma', icon: Search },
  { label: 'Ekip', path: '/ekip', icon: Users },
  { label: 'Geçmiş', path: '/gecmis', icon: Clock3 },
  { label: 'Kullanım', path: '/kullanim', icon: BarChart3 },
  { label: 'Ayarlar', path: '/ayarlar', icon: Settings },
]

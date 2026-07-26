export const currentUser = {
  name: 'Aslı Demir',
  initials: 'AD',
}

export const dashboardData = {
  quickActions: [
    {
      label: 'Dosya Analiz Et',
      icon: 'file',
      prompt: 'Analiz etmemi istediğin dosyayı yükle veya sorununu yaz.',
    },
    {
      label: 'Görsel Oluştur',
      icon: 'image',
      prompt: 'Nasıl bir görsel oluşturmak istiyorsun?',
    },
    {
      label: 'Yeni Proje Başlat',
      icon: 'project',
      prompt: 'Projen hakkında kısaca bilgi ver, başlayalım.',
    },
    {
      label: 'Fikir Geliştir',
      icon: 'idea',
      prompt: 'Bir fikrini paylaş, birlikte geliştirelim.',
    },
  ],
  recentProjects: [
    { name: 'ASLIN TECH', type: 'Kurumsal web sitesi' },
    { name: 'Marisento', type: 'Otel deneyimi' },
    { name: 'ZERON Studio', type: 'Mimarlık portfolyosu' },
  ],
  recentConversations: [
    'ASLIN AI ana ekran fikirleri',
    'ZERON mobil düzenlemeleri',
    'Marisento proje sunumu',
  ],
}

export const pageContent = {
  dashboard: {
    title: 'Ana Sayfa',
    description: 'Çalışma alanındaki güncel içeriklere buradan ulaşabilirsiniz.',
  },
  chat: {
    title: 'Sohbet',
    description: 'Yapay zekâ ile yeni bir çalışma oturumu başlatın.',
  },
  projects: {
    title: 'Projeler',
    description: 'Projelerinizi düzenleyin ve çalışmalarınızı bir arada yönetin.',
  },
  files: {
    title: 'Dosyalar',
    description: 'Çalışma alanınızdaki dosyalara göz atın.',
  },
  notes: {
    title: 'Notlar',
    description: 'Fikirlerinizi ve önemli bilgileri kaydedin.',
  },
  tasks: {
    title: 'Görevler',
    description: 'Yapılacak işleri planlayın ve takip edin.',
  },
  imageStudio: {
    title: 'Görsel Stüdyo',
    description: 'Yapay zekâ destekli görsel çalışmalarınızı hazırlayın.',
  },
  research: {
    title: 'Araştırma',
    description: 'Konuları derinlemesine incelemek için yeni bir araştırma başlatın.',
  },
  team: {
    title: 'Ekip',
    description: 'Ekip üyelerini ve çalışma alanı erişimlerini yönetin.',
  },
  history: {
    title: 'Geçmiş',
    description: 'Önceki çalışmalarınızı ve etkinliklerinizi görüntüleyin.',
  },
  usage: {
    title: 'Kullanım',
    description: 'Çalışma alanı kullanım bilgilerini inceleyin.',
  },
  settings: {
    title: 'Ayarlar',
    description: 'Hesap ve çalışma alanı tercihlerinizi düzenleyin.',
  },
}

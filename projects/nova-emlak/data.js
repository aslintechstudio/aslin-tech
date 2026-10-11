/* Tüm ilanlar kurgusaldır. Görseller, aynı taşınmazın gerçek fotoğrafları değildir. */
'use strict';

const NOVA_IMAGES = {
  garden: { src: 'assets/villa-bahce.webp', alt: 'Bahçe içinde modern bir villanın temsili görünümü' },
  pool: { src: 'assets/villa-havuz.webp', alt: 'Havuzlu bir villanın temsili dış görünümü' },
  terrace: { src: 'assets/villa-teras.webp', alt: 'Teras ve açık yaşam alanı bulunan temsili bir villa' },
  building: { src: 'assets/apartman.webp', alt: 'Çok katlı bir konut binasının temsili dış görünümü' },
  bright: { src: 'assets/salon-aydinlik.webp', alt: 'Doğal ışık alan temsili bir oturma odası' },
  modern: { src: 'assets/salon-modern.webp', alt: 'Modern mobilyalarla düzenlenmiş temsili bir salon' },
  kitchen: { src: 'assets/mutfak.webp', alt: 'Açık renklerde tasarlanmış temsili bir mutfak' },
  office: { src: 'assets/ofis-acik.webp', alt: 'Çalışma masaları bulunan temsili bir ofis alanı' },
  meeting: { src: 'assets/ofis-toplanti.webp', alt: 'Ortak çalışma ve toplantı için temsili bir iş mekânı' },
  field: { src: 'assets/arsa-ova.webp', alt: 'Yeşil alanlarla çevrili temsili bir açık arazi' },
  nature: { src: 'assets/arsa-doga.webp', alt: 'Doğal peyzaj içinde temsili bir arazi manzarası' },
  living: { src: 'assets/daire-salon.webp', alt: 'Sade ve aydınlık temsili bir daire iç mekânı' }
};

const NOVA_PROPERTIES = [
  {
    id: 'nova-001', title: 'Şehrin içinde, sakin bir yaşam', status: 'Satılık', type: 'Daire',
    price: 8750000, city: 'İstanbul', district: 'Kadıköy', area: 125, rooms: '3+1', featured: true,
    description: 'Kurgusal Kadıköy portföyümüzde, geniş pencereleri ve dengeli planıyla öne çıkan bir daire. Ayrı mutfak, ferah bir oturma alanı ve balkon, günlük yaşamın farklı ihtiyaçlarına alan açıyor. Konum ve tüm özellikler örnek senaryo olarak hazırlanmıştır.',
    features: ['Balkon', 'Ayrı mutfak', 'Asansör', 'Aydınlık salon'],
    images: [NOVA_IMAGES.bright, NOVA_IMAGES.kitchen, NOVA_IMAGES.building]
  },
  {
    id: 'nova-002', title: 'Urla’da bahçeli bir başlangıç', status: 'Satılık', type: 'Villa',
    price: 24800000, city: 'İzmir', district: 'Urla', area: 320, rooms: '5+1', featured: true,
    description: 'İç ve dış yaşamı bir araya getiren kurgusal villa seçeneği. Bahçe, teras ve geniş ortak yaşam alanları; sakin anlar ve birlikte geçirilen zamanlar için düşünülmüştür. İlan gerçek bir taşınmazı veya satış teklifini temsil etmez.',
    features: ['Özel bahçe', 'Teras', 'Havuz', 'Açık otopark', 'Çalışma odası'],
    images: [NOVA_IMAGES.garden, NOVA_IMAGES.pool, NOVA_IMAGES.modern]
  },
  {
    id: 'nova-003', title: 'Çankaya’da aydınlık bir daire', status: 'Kiralık', type: 'Daire',
    price: 28500, city: 'Ankara', district: 'Çankaya', area: 95, rooms: '2+1', featured: true,
    description: 'Günlük yaşamın ritmine uyum sağlayan, iki odalı ve ayrı mutfaklı örnek bir daire. Açık renkler ve kullanışlı yerleşim, kurgusal bu yaşam alanının temel yaklaşımını oluşturuyor. Fiyat aylık örnek kira bedelidir.',
    features: ['Ayrı mutfak', 'Asansör', 'Balkon', 'Geniş pencereler'],
    images: [NOVA_IMAGES.living, NOVA_IMAGES.kitchen, NOVA_IMAGES.building]
  },
  {
    id: 'nova-004', title: 'Karşıyaka’da ferah bir şehir evi', status: 'Satılık', type: 'Daire',
    price: 6450000, city: 'İzmir', district: 'Karşıyaka', area: 110, rooms: '2+1', featured: false,
    description: 'Şehir yaşamını sade bir iç mekânla buluşturan kurgusal daire. Geniş salonu, balkonuyla ve pratik oda dağılımıyla farklı yaşam düzenlerini düşünmek için bir örnek sunuyor.',
    features: ['Balkon', 'Açık mutfak', 'Asansör', 'Ebeveyn banyosu'],
    images: [NOVA_IMAGES.modern, NOVA_IMAGES.kitchen, NOVA_IMAGES.building]
  },
  {
    id: 'nova-005', title: 'Konyaaltı’nda bahçeye açılan villa', status: 'Kiralık', type: 'Villa',
    price: 95000, city: 'Antalya', district: 'Konyaaltı', area: 225, rooms: '4+1', featured: false,
    description: 'Biraz daha açık alan arayanlar için hazırlanmış kurgusal bir kiralık villa. Bahçe, teras ve geniş salon; evde geçen zamanlara farklı olanaklar sunuyor. Belirtilen tutar aylık örnek kira bedelidir.',
    features: ['Bahçe', 'Teras', 'Açık otopark', 'Ayrı mutfak'],
    images: [NOVA_IMAGES.terrace, NOVA_IMAGES.garden, NOVA_IMAGES.bright]
  },
  {
    id: 'nova-006', title: 'Ula’da doğayla çevrili arazi', status: 'Satılık', type: 'Arsa',
    price: 7200000, city: 'Muğla', district: 'Ula', area: 950, rooms: 'Belirtilmemiş', featured: false,
    description: 'Açık peyzaj içinde bir araziyi keşfetmek için hazırlanmış kurgusal ilan. Tapu, imar, altyapı veya yapılaşma durumu hakkında gerçek bir belge ya da beyan içermez. Görseller yalnızca temsili doğal manzaralardır.',
    features: ['Açık peyzaj', 'Doğa manzarası', 'Örnek arazi seçeneği'],
    images: [NOVA_IMAGES.field, NOVA_IMAGES.nature]
  },
  {
    id: 'nova-007', title: 'Şişli’de işinize yeni bir alan', status: 'Kiralık', type: 'İş yeri',
    price: 48000, city: 'İstanbul', district: 'Şişli', area: 140, rooms: '3+1', featured: false,
    description: 'Ortak çalışma, toplantı ve odaklanma alanlarını birlikte düşünmek için örnek bir ofis. Kurgusal yerleşimi farklı çalışma biçimlerine alan açar. Fiyat aylık örnek kira bedelidir; gerçek kiralama yapılmaz.',
    features: ['Toplantı alanı', 'Mutfak bölümü', 'Asansör', 'Gün ışığı'],
    images: [NOVA_IMAGES.office, NOVA_IMAGES.meeting]
  },
  {
    id: 'nova-008', title: 'Ataşehir’de esnek ticari alan', status: 'Satılık', type: 'Ticari gayrimenkul',
    price: 12600000, city: 'İstanbul', district: 'Ataşehir', area: 220, rooms: 'Belirtilmemiş', featured: false,
    description: 'Yeni bir iş fikri için farklı yerleşim olanaklarını değerlendiren kurgusal ticari gayrimenkul. Açık çalışma alanı ve toplantı bölümüyle hazırlanmış örnek bir senaryodur. Ruhsat veya kullanım izni hakkında gerçek bir beyan içermez.',
    features: ['Esnek yerleşim', 'Toplantı bölümü', 'Mutfak bölümü', 'Geniş çalışma alanı'],
    images: [NOVA_IMAGES.meeting, NOVA_IMAGES.office]
  },
  {
    id: 'nova-009', title: 'Kadıköy’de sade bir yaşam alanı', status: 'Kiralık', type: 'Daire',
    price: 36000, city: 'İstanbul', district: 'Kadıköy', area: 68, rooms: '1+1', featured: false,
    description: 'Kompakt bir yaşam alanında iyi düşünülmüş detayları keşfedin. Açık mutfak ve aydınlık salon, kurgusal bu dairenin gündelik hayata uyum sağlayan taraflarını oluşturuyor. Fiyat aylık örnek kira bedelidir.',
    features: ['Açık mutfak', 'Asansör', 'Aydınlık salon'],
    images: [NOVA_IMAGES.living, NOVA_IMAGES.kitchen, NOVA_IMAGES.bright]
  },
  {
    id: 'nova-010', title: 'Bodrum’da açık havayla iç içe', status: 'Satılık', type: 'Villa',
    price: 21500000, city: 'Muğla', district: 'Bodrum', area: 260, rooms: '4+1', featured: false,
    description: 'Bahçe ve teras arasında kurulan rahat bir yaşamı temsil eden kurgusal villa. Dört oda, ortak yaşam alanı ve dış mekân, farklı zamanları birlikte düşünmek için bir örnektir. Gerçek işletme veya mülk satış teklifi değildir.',
    features: ['Havuz', 'Teras', 'Bahçe', 'Açık otopark'],
    images: [NOVA_IMAGES.pool, NOVA_IMAGES.terrace, NOVA_IMAGES.modern]
  },
  {
    id: 'nova-011', title: 'Urla’da yeni olasılıklara alan', status: 'Satılık', type: 'Arsa',
    price: 5400000, city: 'İzmir', district: 'Urla', area: 620, rooms: 'Belirtilmemiş', featured: false,
    description: 'Doğal çevrede bir arazi seçeneğini göstermek için hazırlanmış kurgusal portföy ilanı. Metrekare ve fiyat örnektir. Herhangi bir tapu, imar, yapılaşma veya değer artışı güvencesi verilmez.',
    features: ['Doğal çevre', 'Açık peyzaj', 'Örnek arazi seçeneği'],
    images: [NOVA_IMAGES.nature, NOVA_IMAGES.field]
  },
  {
    id: 'nova-012', title: 'Çankaya’da odaklanmaya yer açın', status: 'Kiralık', type: 'İş yeri',
    price: 22000, city: 'Ankara', district: 'Çankaya', area: 85, rooms: '2+1', featured: false,
    description: 'Küçük bir ekip veya bağımsız çalışma için oluşturulmuş kurgusal iş yeri. İki ayrı çalışma bölümü ve toplantı alanı ile farklı kullanım biçimlerini hayal etmenizi sağlar. Fiyat aylık örnek kira bedelidir.',
    features: ['Ayrı çalışma odaları', 'Toplantı alanı', 'Mutfak bölümü'],
    images: [NOVA_IMAGES.meeting, NOVA_IMAGES.office]
  }
];

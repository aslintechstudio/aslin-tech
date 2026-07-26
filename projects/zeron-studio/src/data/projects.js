const image = (id, width = 1800) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${width}&q=86`

export const projects = [
  {
    id: 'casa-nera',
    number: '01',
    title: 'Casa Nera',
    location: 'Paros',
    country: 'Yunanistan',
    type: 'Konut',
    locationEn: 'Paros',
    countryEn: 'Greece',
    typeEn: 'Residence',
    year: '2025',
    description:
      'Kayalık kıyı boyunca yerleşen yapı, ışık ve gölge arasındaki geçişleri araştırır.',
    descriptionEn:
      'Set along the rocky coastline, the structure explores transitions between light and shadow.',
    accent: true,
    source: 'https://unsplash.com/photos/modern-concrete-architecture-with-dramatic-shadows-and-blue-sky-HwD4w7y9qdU',
    images: [
      { url: image('photo-1754660000137-e083fc364565'), caption: 'Görsel 01 / Dış Mekân', alt: 'Sert gölgeler altındaki anıtsal beton yapı', position: '48% center' },
      { url: image('photo-1752751974737-0d9a0f81d30a'), caption: 'Görsel 02 / Cephe Detayı', alt: 'Beton cephe ve merdivenlerin geometrik ritmi', position: 'center 42%' },
      { url: image('photo-1757826775048-2e670c5c20ab'), caption: 'Görsel 03 / İç Mekân', alt: 'Beton merdiven üzerinde keskin ışık ve gölge', position: '24% 70%' },
      { url: image('photo-1600566752355-35792bedcfea', 1200), caption: 'Görsel 04 / Malzeme', alt: 'Ham beton yüzey ve derin açıklık detayı', position: '82% center' },
    ],
  },
  {
    id: 'monolith-house',
    number: '02',
    title: 'Monolith House',
    location: 'Reykjavik',
    country: 'İzlanda',
    type: 'Konut',
    locationEn: 'Reykjavik',
    countryEn: 'Iceland',
    typeEn: 'Residence',
    year: '2024',
    description:
      'Volkanik araziye yerleşen tekil kütle, sert iklim ve iç mekân sakinliği arasında bir denge kurar.',
    descriptionEn:
      'A singular volume set into volcanic terrain balances the harsh climate with interior calm.',
    source: 'https://unsplash.com/photos/a-couple-of-black-buildings-sitting-on-top-of-a-dry-grass-field-641Y17bIMgk',
    images: [
      { url: image('photo-1684514570577-35f958b52870'), caption: 'Görsel 01 / Dış Mekân', alt: 'Sisli İzlanda arazisinde siyah monolitik yapılar', position: 'center 48%' },
      { url: image('photo-1511818966892-d7d671e672a2'), caption: 'Görsel 02 / Cephe Detayı', alt: 'Koyu yapı kabuğu ve kayalık zemin', position: 'center' },
      { url: image('photo-1600607687920-4e2a09cf159d'), caption: 'Görsel 03 / İç Mekân', alt: 'Kontrollü ışık alan sakin koyu iç mekân', position: '55% center' },
      { url: image('photo-1600566753086-00f18fb6b3ea', 1200), caption: 'Görsel 04 / Malzeme', alt: 'Siyah taş ve beton birleşim detayı', position: '70% center' },
    ],
  },
  {
    id: 'north-court',
    number: '03',
    title: 'North Court',
    location: 'Kopenhag',
    country: 'Danimarka',
    type: 'Kültür Yapısı',
    locationEn: 'Copenhagen',
    countryEn: 'Denmark',
    typeEn: 'Cultural Building',
    year: '2023',
    description:
      'Merkezi avlu çevresinde örgütlenen yapı, gün ışığını ve kamusal dolaşımı içeri taşır.',
    descriptionEn:
      'Organised around a central courtyard, the building draws daylight and public movement inward.',
    source: 'https://unsplash.com/photos/brick-building-and-architectural-details-in-a-courtyard-9B8MIPVOOSw',
    images: [
      { url: image('photo-1497366811353-6870744d04b2'), caption: 'Görsel 01 / Avlu', alt: 'Kuzey ışığı alan kamusal yapı avlusu', position: 'center' },
      { url: image('photo-1487958449943-2429e8be8625'), caption: 'Görsel 02 / Cephe Ritmi', alt: 'Tekrarlayan tuğla ve açık beton cephe düzeni', position: 'center 40%' },
      { url: image('photo-1524758631624-e2822e304c36'), caption: 'Görsel 03 / Dolaşım', alt: 'Kültür yapısında aydınlık iç dolaşım alanı', position: 'center' },
      { url: image('photo-1494526585095-c41746248156', 1200), caption: 'Görsel 04 / Birleşim', alt: 'Ahşap ve açık beton yapı detayı', position: '60% center' },
    ],
  },
  {
    id: 'void-pavilion',
    number: '04',
    title: 'Void Pavilion',
    location: 'Seul',
    country: 'Güney Kore',
    type: 'Pavyon',
    locationEn: 'Seoul',
    countryEn: 'South Korea',
    typeEn: 'Pavilion',
    year: '2022',
    description:
      'Boşluk, gölge ve hafiflik üzerinden kurgulanan geçici yapı, çevresiyle değişken bir ilişki kurar.',
    descriptionEn:
      'Defined through void, shadow and lightness, the temporary structure forms a changing relationship with its surroundings.',
    source: 'https://unsplash.com/s/photos/architecture-pavilion',
    images: [
      { url: image('photo-1493397212122-2b85dda8106b'), caption: 'Görsel 01 / Pavyon', alt: 'Açık boşluklarla kurulan deneysel pavyon', position: 'center' },
      { url: image('photo-1549490349-8643362247b5'), caption: 'Görsel 02 / Taşıyıcı', alt: 'İnce strüktür ve geometrik gölgeler', position: 'center 44%' },
      { url: image('photo-1518005020951-eccb494ad742'), caption: 'Görsel 03 / Geçiş', alt: 'Yarı geçirgen yüzeyler arasındaki geçiş alanı', position: '56% center' },
      { url: image('photo-1531835551805-16d864c8d311', 1200), caption: 'Görsel 04 / Yüzey', alt: 'Hafif yapı yüzeyi ve bağlantı detayı', position: '72% center' },
    ],
  },
  {
    id: 'stone-archive',
    number: '05',
    title: 'Stone Archive',
    location: 'Braga',
    country: 'Portekiz',
    type: 'Arşiv ve Araştırma',
    locationEn: 'Braga',
    countryEn: 'Portugal',
    typeEn: 'Archive and Research',
    year: '2021',
    description:
      'Yerel taş katmanlarıyla biçimlenen yapı, hafıza ve malzeme sürekliliğini mekânsal bir arşive dönüştürür.',
    descriptionEn:
      'Formed by layers of local stone, the building transforms memory and material continuity into a spatial archive.',
    source: 'https://unsplash.com/photos/brown-concrete-library-interior-0rzUepBXHN0',
    images: [
      { url: image('photo-1500530855697-b586d89ba3ee'), caption: 'Görsel 01 / Dış Mekân', alt: 'Ağır taş duvarlarla biçimlenen arşiv yapısı', position: 'center' },
      { url: image('photo-1533285860212-c85e7140a408'), caption: 'Görsel 02 / Okuma Salonu', alt: 'Taş yapı içinde katmanlı arşiv ve okuma alanı', position: 'center 38%' },
      { url: image('photo-1521587760476-6c12a4b040da'), caption: 'Görsel 03 / Arşiv', alt: 'Derin açıklıklarla aydınlanan araştırma mekânı', position: 'center' },
      { url: image('photo-1524995997946-a1c2e315a42f', 1200), caption: 'Görsel 04 / Taş Detayı', alt: 'Yerel taş katmanlarının yakın görünümü', position: '68% center' },
    ],
  },
]

export default projects

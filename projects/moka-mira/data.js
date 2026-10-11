'use strict';

// Fiyatlar kuruş cinsinden saklanır. Ürünler ve açıklamalar kurgusaldır.
const categories = [
  'Sıcak kahveler', 'Soğuk kahveler', 'Çay ve diğer içecekler',
  'Kruvasanlar ve hamur işleri', 'Pastalar', 'Tatlılar'
];

const optionGroups = {
  size: { label: 'Boy', values: [
    { id: 'small', label: 'Küçük', extra: 0 },
    { id: 'medium', label: 'Orta', extra: 1500 },
    { id: 'large', label: 'Büyük', extra: 3000 }
  ] },
  milk: { label: 'Süt tercihi', values: [
    { id: 'regular', label: 'Normal süt', extra: 0 },
    { id: 'lactose-free', label: 'Laktozsuz süt', extra: 1000 },
    { id: 'oat', label: 'Yulaf sütü', extra: 2000 }
  ] },
  espresso: { label: 'Espresso', values: [
    { id: 'standard', label: 'Standart', extra: 0 },
    { id: 'extra', label: 'Ekstra espresso', extra: 2500 }
  ] },
  heat: { label: 'Servis tercihi', values: [
    { id: 'room', label: 'Oda sıcaklığında', extra: 0 },
    { id: 'warm', label: 'Ilık', extra: 0 }
  ] },
  ice: { label: 'Buz tercihi', values: [
    { id: 'normal', label: 'Normal buz', extra: 0 },
    { id: 'light', label: 'Az buz', extra: 0 }
  ] }
};

const products = [
  {
    id: 'espresso',
    name: 'Espresso',
    description: 'Kısa bir mola için yoğun, dengeli bir kahve. Küçük fincanda, sade olarak.',
    price: 8500,
    category: categories[0],
    image: 'espresso',
    groups: ['espresso'],
    note: 'Sade kahve · Süt içermez'
  },
  {
    id: 'americano',
    name: 'Americano',
    description: 'Espressonun karakteri, sıcak suyun yumuşaklığıyla buluşuyor.',
    price: 10500,
    category: categories[0],
    image: 'americano',
    groups: ['size', 'espresso'],
    note: 'Sade kahve · Süt içermez'
  },
  {
    id: 'latte',
    name: 'Kadife Latte',
    description: 'Espresso ve ipeksi süt köpüğü. Uzun bir sohbetin yumuşak eşlikçisi.',
    price: 13000,
    category: categories[0],
    image: 'latte',
    groups: ['size', 'milk', 'espresso'],
    note: 'Süt içerir · Süt tercihinizi değiştirebilirsiniz',
    popular: true,
    badge: 'Molanın favorisi'
  },
  {
    id: 'cappuccino',
    name: 'Cappuccino',
    description: 'Espresso, sıcak süt ve dolgun köpük; klasik bir kahve molası.',
    price: 12500,
    category: categories[0],
    image: 'cappuccino',
    groups: ['size', 'milk', 'espresso'],
    note: 'Süt içerir'
  },
  {
    id: 'iced-latte',
    name: 'Buzlu Latte',
    description: 'Süt ve espresso, buzla ferah bir buluşmada. Yavaş yudumlamak için.',
    price: 14500,
    category: categories[1],
    image: 'buzlu-kahve',
    groups: ['size', 'milk', 'espresso', 'ice'],
    note: 'Süt içerir',
    popular: true,
    badge: 'Serin bir mola'
  },
  {
    id: 'iced-americano',
    name: 'Buzlu Americano',
    description: 'Buz, su ve espresso. Sade kahveyi serin sevenlere.',
    price: 12000,
    category: categories[1],
    image: 'buzlu-americano',
    groups: ['size', 'espresso', 'ice'],
    note: 'Sade kahve · Temsili soğuk kahve fotoğrafı'
  },
  {
    id: 'iced-caramel',
    name: 'Karamelli Buzlu Latte',
    description: 'Espressoya eşlik eden süt ve karamelin tatlı dokunuşu.',
    price: 15500,
    category: categories[1],
    image: 'karamelli-buzlu-latte',
    groups: ['size', 'milk', 'espresso', 'ice'],
    note: 'Süt içerir'
  },
  {
    id: 'tea',
    name: 'Demleme Çay',
    description: 'Sakin bir molaya eşlik eden klasik siyah çay. Fincanda servis edilir.',
    price: 6500,
    category: categories[2],
    image: 'cay',
    groups: [],
    note: 'Fincan servis · Temsili sıcak içecek fotoğrafı'
  },
  {
    id: 'herbal',
    name: 'Bitki Çayı',
    description: 'Papatya ve ıhlamurun hafif bir buluşması. Kafeinsiz bir alternatif.',
    price: 8500,
    category: categories[2],
    image: 'bitki-cayi',
    groups: [],
    note: 'Fincan servis'
  },
  {
    id: 'lemonade',
    name: 'Naneli Limonata',
    description: 'Limonun ferahlığı ve taze nane. Tatlı-ekşi bir denge.',
    price: 9500,
    category: categories[2],
    image: 'limonata',
    groups: ['ice'],
    note: 'Soğuk içecek'
  },
  {
    id: 'kruvasan',
    name: 'Tereyağlı Kruvasan',
    description: 'İncecik katmanlar, altın renkli bir kabuk. Kahvenin klasik yol arkadaşı.',
    price: 11000,
    category: categories[3],
    image: 'kruvasan',
    groups: ['heat'],
    note: 'Gluten, süt ve yumurta içerir',
    popular: true,
    badge: 'Kat kat mutluluk'
  },
  {
    id: 'chocolate-croissant',
    name: 'Çikolatalı Kruvasan',
    description: 'Tereyağlı hamurun içinde bitter çikolata. Biraz daha tatlı bir mola.',
    price: 13500,
    category: categories[3],
    image: 'cikolatali-kruvasan',
    groups: ['heat'],
    note: 'Gluten, süt ve yumurta içerir · Temsili kruvasan fotoğrafı'
  },
  {
    id: 'almond-croissant',
    name: 'Bademli Kruvasan',
    description: 'Badem kremasıyla zenginleşen, kat kat bir pastane klasiği.',
    price: 15000,
    category: categories[3],
    image: 'bademli-kruvasan',
    groups: ['heat'],
    note: 'Gluten, süt, yumurta ve badem içerir · Temsili kruvasan fotoğrafı'
  },
  {
    id: 'bread',
    name: 'Ekşi Mayalı Ekmek',
    description: 'Gevrek kabuk, yumuşak iç doku. Küçük bir somunla sade bir lezzet.',
    price: 10000,
    category: categories[3],
    image: 'ekmek',
    groups: [],
    note: 'Gluten içerir · Küçük somun'
  },
  {
    id: 'chocolate-cake',
    name: 'Yoğun Çikolatalı Pasta',
    description: 'Kakaolu katlar ve çikolata kreması. Çikolata sevenlere bir dilim.',
    price: 18000,
    category: categories[4],
    image: 'cikolata',
    groups: [],
    note: 'Gluten, süt ve yumurta içerir · Bir dilim',
    popular: true,
    badge: 'Tatlı kaçamak'
  },
  {
    id: 'berry-cake',
    name: 'Orman Meyveli Pasta',
    description: 'Hafif krema ve meyve katmanlarıyla canlı, dengeli bir tat.',
    price: 17500,
    category: categories[4],
    image: 'pasta',
    groups: [],
    note: 'Gluten, süt ve yumurta içerir · Bir dilim',
    sweet: true
  },
  {
    id: 'vanilla-cake',
    name: 'Vanilyalı Meyve Pastası',
    description: 'Vanilyalı krema ve kırmızı meyveler. Yumuşak bir pastane klasiği.',
    price: 16500,
    category: categories[4],
    image: 'vanilyali-meyve-pastasi',
    groups: [],
    note: 'Gluten, süt ve yumurta içerir · Bir dilim'
  },
  {
    id: 'chocolate-cookie',
    name: 'Çikolata Parçalı Kurabiye',
    description: 'Dışı hafif kıtır, içi yumuşak. İri çikolata parçalarıyla.',
    price: 7500,
    category: categories[5],
    image: 'kurabiye',
    groups: ['heat'],
    note: 'Gluten, süt ve yumurta içerir · Bir adet',
    sweet: true
  },
  {
    id: 'berry-cup',
    name: 'Çilekli Krema Kup',
    description: 'Krema, çilek ve ufalanmış bisküvi. Küçük bir kavanozda tatlı bir ara.',
    price: 14000,
    category: categories[5],
    image: 'tart',
    groups: [],
    note: 'Gluten ve süt içerir · Bir porsiyon',
    sweet: true
  },
  {
    id: 'cocoa-cookie',
    name: 'Kakaolu Kurabiye',
    description: 'Kakao ve çikolata parçalarının yoğun birlikteliği. Kahvenizin yanına.',
    price: 8000,
    category: categories[5],
    image: 'kakaolu-kurabiye',
    groups: ['heat'],
    note: 'Gluten, süt ve yumurta içerir'
  }
];

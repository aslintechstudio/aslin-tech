# NOVA Emlak — Kurgusal portföy demosu

Aslin Tech için hazırlanmış, tamamen Türkçe bir emlak danışmanlığı arayüzü.
Gerçek bir emlak ofisini temsil etmez. İlanlar, konumlar, fiyatlar ve özellikler
kurgusaldır. Görseller aynı taşınmazı belgeleyen bir galeri değil, temsili stok fotoğraflardır.
Gerçek rezervasyon, ödeme, satış, kiralama veya kişisel bilgi gönderimi yapılmaz.

## Yerel önizleme

Depo kökünde:

```powershell
python -m http.server 8765 --bind 127.0.0.1
```

Ardından `http://127.0.0.1:8765/projects/nova-emlak/` adresini açın.
Bir örnek detaya doğrudan gitmek için:
`http://127.0.0.1:8765/projects/nova-emlak/?ilan=nova-002`.
Sunucuyu durdurmak için terminalde `Ctrl+C` kullanın.

`index.html` doğrudan da açılabilir; tutarlı tarayıcı depolaması ve URL kontrolleri
için yerel HTTP sunucusu önerilir.

## Dosya yapısı

- `index.html`: sayfa bölümleri, erişilebilir ilan ve randevu pencereleri.
- `styles.css`: orman yeşili/fildişi görsel kimlik ve duyarlı yerleşim.
- `data.js`: 12 kurgusal ilan ve galerilerin düzenli veri yapısı.
- `app.js`: birleşik filtreler, sıralama, detay URL'leri, galeriler, favoriler ve takvim.
- `assets/`: 12 yerel WebP fotoğrafı, SVG site simgesi ve `sources.json` kaynak kaydı.

Framework, derleme adımı, API anahtarı, harici yazı tipi veya ücretli servis gerekmez.
Tüm çalışma zamanı varlıkları yereldir. GitHub Pages üzerinde alt klasörde çalışacak
göreli yollar kullanılır. Detay URL'leri aynı HTML dosyasındaki `?ilan=` sorgusuyla
açılır; sunucu tarafında yönlendirme kuralı gerekmez.

## İşlevler

- Hero araması: ilan durumu, tür ve şehir seçimini ana filtrelere aktarır.
- Birlikte çalışan 9 filtre: durum, tür, şehir, ilçe, alt/üst fiyat, alt/üst alan ve oda sayısı.
- Şehre bağlı ilçe seçenekleri, aralık doğrulaması, boş sonuç açıklaması ve filtre sıfırlama.
- Fiyat ve metrekare için artan/azalan sıralama.
- 12 ilan, tümünde açıklama, özellikler, yerel fotoğraf galerisi ve benzer ilanlar.
- Doğrudan açılabilen ilan URL'leri, geçersiz ilan kimliğinde Türkçe bilgilendirme.
- Favorilere ekleme/çıkarma ve `nova-emlak-favoriler-v1` localStorage anahtarıyla kalıcılık.
- Tarayıcı depolaması kapalıysa favoriler oturum içinde çalışır; kullanıcıya bilgi verilir.
- Tamamen Türkçe özel takvim, gelecek tarih seçimi, saat, gayrimenkul ve ziyaret özeti.
- Geçmiş gün ve bugün engeli; form gönderiminde tekrar tarih doğrulaması.
- Kişisel bilgi istemeyen, sunucuya istek yapmayan örnek randevu onayı.
- Mobil menü, klavye odağı, yerel `dialog` ile odak sınırlandırma ve Escape ile kapatma.
- Türkçe tarih ve sayı biçimleri; kira bedellerinde açıkça `/ ay` gösterimi.

## Görsel kaynakları ve lisans

Fotoğraflar Unsplash'ın standart ücretsiz fotoğraf kaynaklarından indirilmiştir.
[Unsplash lisansı](https://unsplash.com/license), fotoğrafların ticari ve ticari olmayan
çalışmalarda ücretsiz kullanımına izin verir; değiştirmeden fotoğraf satışı ve rakip
fotoğraf hizmeti oluşturulması bu lisansın kapsamı dışındadır. Bu proje bir fotoğraf
dağıtım hizmeti değildir. Fotoğraflar yalnızca temsili portföy görselleri olarak kullanılır.

Kaynak URL'leri aşağıdadır; `assets/sources.json` aynı bilgileri makine tarafından
okunabilir biçimde içerir. Yerel dosyalar 1200 × 800 px WebP biçimindedir ve toplam
yaklaşık 2 MB yer kaplar. İlk hero görseli öncelikli, diğer sayfa fotoğrafları tembel yüklenir.

## Yerel testler

Gerçek Chrome tarayıcısında 1440, 768, 390 ve 320 px genişliklerinde test edilmiştir.
100 işlev/yerleşim kontrolü ve 37 ek fare/klavye, tekil filtre ve hata senaryosu kontrolü geçmiştir: menü ve bölüm bağlantıları,
12 ilan, dokuzlu filtre birleşimi, şehre bağlı ilçeler, geçersiz aralıklar, boş sonuç,
dört sıralama, hero araması, favorilerin yenileme sonrası kalıcılığı, tüm ilanların
galerileri, doğrudan detay URL'si, benzer ilanlar ve demo randevu doğrulaması.
Yatay taşma, yakalanmamış JavaScript hatası veya HTTP dosya yükleme hatası bulunmamıştır.

Ekran görüntüleri depo kökündeki `backups/nova-emlak-review/` içindedir ve yayın
dosyalarından ayrıdır. Bu klasör mevcut `.gitignore` tarafından dışlanır.

- `ana-sayfa-1440.png`, `ana-sayfa-768.png`, `ana-sayfa-390.png`, `ana-sayfa-320.png`
- `ilanlar-1440.png`, `ilanlar-390.png`
- `ilan-detayi-1440.png`, `ilan-detayi-390.png`
- `randevu-1440.png`, `randevu-390.png`
- `browser-results.json`: ayrıntılı kontrol kaydı.
- `interaction-results.json`: gerçek fare/Tab/Escape olayları, filtrelerin bağımsız sonuçları, kapalı/bozuk depolama ve takvim yıl/artık yıl kontrolleri.
- `tam-sayfa-1440.png`: sayfanın tamamının masaüstü ekran görüntüsü.

Aslin Tech ana sayfasında beşinci demo proje kartı olarak yer alır. GitHub Pages
üzerinde `projects/nova-emlak/` adresinden sunulur. Diğer demo projeleri değiştirilmemiştir.
Yayın öncesi Chrome'da 1440, 768, 390 ve 320 px genişliklerinde 100 işlev/yerleşim
kontrolü tekrar geçmiştir. Testler Chrome ile sınırlıdır; Safari ve Firefox testi yapılmamıştır.

### Fotoğraf kaynak tablosu

| Yerel dosya | Kaynak | Lisans |
|---|---|---|
| `assets/villa-bahce.webp` | [Unsplash fotoğrafı](https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&h=800&q=80&fm=webp) | [Unsplash](https://unsplash.com/license) |
| `assets/villa-havuz.webp` | [Unsplash fotoğrafı](https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&w=1200&h=800&q=80&fm=webp) | [Unsplash](https://unsplash.com/license) |
| `assets/villa-teras.webp` | [Unsplash fotoğrafı](https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?auto=format&fit=crop&w=1200&h=800&q=80&fm=webp) | [Unsplash](https://unsplash.com/license) |
| `assets/apartman.webp` | [Unsplash fotoğrafı](https://images.unsplash.com/photo-1460317442991-0ec209397118?auto=format&fit=crop&w=1200&h=800&q=80&fm=webp) | [Unsplash](https://unsplash.com/license) |
| `assets/salon-aydinlik.webp` | [Unsplash fotoğrafı](https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1200&h=800&q=80&fm=webp) | [Unsplash](https://unsplash.com/license) |
| `assets/salon-modern.webp` | [Unsplash fotoğrafı](https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&h=800&q=80&fm=webp) | [Unsplash](https://unsplash.com/license) |
| `assets/mutfak.webp` | [Unsplash fotoğrafı](https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&w=1200&h=800&q=80&fm=webp) | [Unsplash](https://unsplash.com/license) |
| `assets/ofis-acik.webp` | [Unsplash fotoğrafı](https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1200&h=800&q=80&fm=webp) | [Unsplash](https://unsplash.com/license) |
| `assets/ofis-toplanti.webp` | [Unsplash fotoğrafı](https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=1200&h=800&q=80&fm=webp) | [Unsplash](https://unsplash.com/license) |
| `assets/arsa-ova.webp` | [Unsplash fotoğrafı](https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1200&h=800&q=80&fm=webp) | [Unsplash](https://unsplash.com/license) |
| `assets/arsa-doga.webp` | [Unsplash fotoğrafı](https://images.unsplash.com/photo-1470252649378-9c29740c9fa8?auto=format&fit=crop&w=1200&h=800&q=80&fm=webp) | [Unsplash](https://unsplash.com/license) |
| `assets/daire-salon.webp` | [Unsplash fotoğrafı](https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1200&h=800&q=80&fm=webp) | [Unsplash](https://unsplash.com/license) |

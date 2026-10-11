# MOKA & MİRA

Aslin Tech için hazırlanmış, tamamen Türkçe butik kahve ve pastane demosu.
“Bir fincan mutluluk, bir dilim huzur.”

Marka, ürünler, fiyatlar ve hikâye kurgusaldır. Gerçek sipariş gönderilmez,
ödeme alınmaz ve kişisel bilgi istenmez. Fotoğraflar temsili stok görsellerdir;
kurgusal ürünlerin birebir fotoğrafı veya gerçek işletme mekânı değildir.

## Yerel önizleme

Aslin Tech depo kökünde çalıştırın:

```powershell
python -m http.server 8765 --bind 127.0.0.1
```

Adres: http://127.0.0.1:8765/projects/moka-mira/

Sunucuyu durdurmak için `Ctrl+C` kullanın. Dosya doğrudan açılabilse de kalıcı
depolama ve göreli yolların tutarlı çalışması için HTTP önizlemesi önerilir.

## Dosyalar ve yayın yapısı

- `index.html`: Türkçe sayfa bölümleri, SEO etiketleri ve erişilebilir diyaloglar.
- `styles.css`: dört marka rengi, responsive düzen ve görünür odak stilleri.
- `data.js`: 20 ürün, altı kategori ve ürünlere uygun seçenek tanımları.
- `app.js`: filtreler, arama, kişiselleştirme, sepet ve demo sipariş akışı.
- `assets/`: 22 optimize WebP fotoğraf, SVG favicon ve `sources.json` kaynak kaydı.

HTML/CSS/JavaScript dışında framework, derleme veya bağımlılık kurulumu gerekmez.
Tüm çalışma zamanı varlıkları yereldir. Göreli yollarla GitHub Pages üzerinde
`projects/moka-mira/` alt klasöründen çalışır. API, servis anahtarı, harici font,
ödeme hizmeti veya ücretli kaynak kullanılmaz.

## Tamamlanan özellikler

- Ana Sayfa, Menümüz, Hakkımızda, Öne Çıkanlar ve İletişim bölüm bağlantıları;
  Sepetim düğmesi ve kapanabilen mobil menü.
- Altı kategori: sıcak kahveler, soğuk kahveler, çay ve diğer içecekler,
  kruvasanlar ve hamur işleri, pastalar, tatlılar.
- Birlikte çalışan kategori ve metin araması. Türkçe büyük/küçük harf ve
  aksansız arama desteği; boş sonuç mesajı ve filtre sıfırlama.
- Ürün kartından detay açma; isim, açıklama, temsili fotoğraf ve içerik notu.
- Uygun içeceklerde küçük/orta/büyük boy, süt seçimi ve ekstra espresso.
  Sade espressoya süt veya boy seçimi, pastaya kahve seçenekleri sunulmaz.
  Kruvasan ve kurabiyelerde ılık/oda sıcaklığı, soğuk içeceklerde buz seçimi.
- Seçenek ve miktara göre anında fiyat hesaplama. Tüm hesaplar tamsayı kuruş
  üzerinden; gösterim `Intl.NumberFormat('tr-TR')` ve Türk lirasıyla yapılır.
- Farklı seçenekli aynı ürünler ayrı sepet kalemleridir; aynı seçimler birleşir.
  Miktar artırma/azaltma, silme, tüm sepeti boşaltma ve boş durum ekranı.
- Her seçimde 1–99 miktar sınırı; negatif veya kesirli miktarlar reddedilir.
- Ara toplam, sıfır ek ücret ve genel toplam; ödeme veya teslimat ücreti yoktur.
- `moka-mira-sepet-v1` localStorage anahtarıyla yenileme sonrası kalıcılık.
  Bozuk kayıtlar güvenli biçimde ayıklanır; kayıtlı fiyatlara güvenilmez, menü
  verisinden yeniden hesaplanır. Depolama kapalıysa oturum sepeti ve açıklama.
- Sekmeler arası sepet değişikliği algılama; sipariş özeti değişmişse yeniden
  kontrol ettirme. Kişisel bilgi istemeyen demo sipariş onayı, tamamlanan
  özetin korunması ve sepetin temizlendiğinin açıkça bildirilmesi.
- Tamamen Türkçe arayüz, kurgusal marka hikâyesi, gerçek işletme bilgisi
  içermeyen iletişim alanı ve Aslin Tech portföy açıklaması.
- `lang="tr"`, klavyeyle radyo seçimi, görünür odak, diyalog içi odak sınırı,
  Escape ile kapatma ve durum bildirimleri.
- Hero dışında lazy loading; yerel WebP görseller toplam yaklaşık 1,16 MiB.

## Tarayıcı doğrulaması

Gerçek Chrome ile 1440, 768, 390 ve 320 px genişliklerinde **169 kontrol geçti**.
Kategori ve arama sonuçları, tüm ürün detayları, seçenek fiyatları, farklı ve
aynı seçenekli sepet kalemleri, miktar sınırları, silme/boşaltma, yenilemede
kalıcılık, özet/onay toplamları, kişisel bilgi alanlarının bulunmaması,
Türkçe arayüz, bölüm hedefleri, mobil menü, görüntülerin yüklenmesi, diyalog
taşması, sayfa taşması, gerçek Tab/Escape klavye olayları ve depolama hata
senaryoları doğrulandı. JavaScript istisnası veya başarısız HTTP isteği görülmedi.

1440 ve 390 px genişliklerinde ayrıca **27 gerçek fare/klavye kontrolü** geçti:
kartların tıklanabilir alanları, seçenek etiketleri, sepete ekleme, miktar artırma,
özet/onay düğmeleri, menüye dönüş, mobil menü ve bağlantısı, ok tuşuyla radyo
seçimi, Shift+Tab ile geriye odak döngüsü, tüm latte seçenek kombinasyonlarının
fiyatları ve başka sekmede boşalan sepetten güvenli dönüş.

Depo kökündeki `backups/moka-mira-review/` klasöründe yerel inceleme çıktıları:

- `browser-results.json`: 169 kontrolün ayrıntılı sonuçları.
- `interaction-results.json`: 27 ek fare/klavye kontrolünün sonuçları.
- `browser-test.cjs`, `interaction-test.cjs`: yerel Chrome DevTools test betikleri.
- `ana-sayfa-{1440,768,390,320}.png`: ana ekranlar.
- `menu-{1440,768,390,320}.png`: dijital menü.
- `urun-detayi-{1440,768,390,320}.png`: kişiselleştirme.
- `sepet-{1440,768,390,320}.png`: farklı seçenekli ürünler.
- `siparis-ozeti-{1440,768,390,320}.png`: onay öncesi özet.
- `demo-siparis-{1440,768,390,320}.png`: onay ve temizlenen sepet.
- `tam-sayfa-{1440,390}.png`: tüm sayfanın masaüstü ve mobil görüntüleri.

Bu çıktılar Git tarafından yok sayılan inceleme klasöründedir; yayın dosyalarına
dahil edilmez. Safari/Firefox ve gerçek mobil cihaz testi yapılmadı. Bu çalışma
yereldir: ana sayfaya altıncı kart eklenmedi, mevcut demo projelerine dokunulmadı,
commit/push veya yayın yapılmadı.

## Görsel kaynakları ve lisans

Fotoğraflar [Unsplash lisansı](https://unsplash.com/license) kapsamında ücretsiz
ticari ve ticari olmayan kullanıma uygun kaynaklardan indirilmiştir. İzin
istemek ve atıf zorunlu değildir; aşağıda kaynaklar korunmuştur. Fotoğrafları
değiştirmeden satmak veya rakip bir görsel arşivi oluşturmak bu lisansın kapsamı
dışındadır. Bu proje fotoğraf dağıtım hizmeti değildir.

Fotoğraflar Pillow ile yeniden boyutlandırılıp WebP biçiminde optimize edilmiştir.
`assets/sources.json` her dosyanın kaynak URL'sini, lisansını, son boyutlarını
ve byte uzunluğunu içerir. Menüdeki 20 farklı ürünün her biri farklı bir fotoğraf
kullanır. Aynı ürünün popülerler, menü, detay ve sepette aynı fotoğrafla görünmesi
bilinçlidir; tüm ürün fotoğrafları kurgusal ürünler için temsili olarak kullanılır.

| Yerel dosya | Kaynak | Lisans |
|---|---|---|
| `assets/kahve.webp` | [Fotoğraf](https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=1200&q=82&fm=webp) | [Unsplash](https://unsplash.com/license) |
| `assets/latte.webp` | [Fotoğraf](https://images.unsplash.com/photo-1570968915860-54d5c301fa9f?auto=format&fit=crop&w=1200&q=82&fm=webp) | [Unsplash](https://unsplash.com/license) |
| `assets/buzlu-kahve.webp` | [Fotoğraf](https://images.unsplash.com/photo-1517701604599-bb29b565090c?auto=format&fit=crop&w=1200&q=82&fm=webp) | [Unsplash](https://unsplash.com/license) |
| `assets/kruvasan.webp` | [Fotoğraf](https://images.unsplash.com/photo-1555507036-ab1f4038808a?auto=format&fit=crop&w=1200&q=82&fm=webp) | [Unsplash](https://unsplash.com/license) |
| `assets/cikolata.webp` | [Fotoğraf](https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=1200&q=82&fm=webp) | [Unsplash](https://unsplash.com/license) |
| `assets/pasta.webp` | [Fotoğraf](https://images.unsplash.com/photo-1565958011703-44f9829ba187?auto=format&fit=crop&w=1200&q=82&fm=webp) | [Unsplash](https://unsplash.com/license) |
| `assets/kurabiye.webp` | [Fotoğraf](https://images.unsplash.com/photo-1499636136210-6f4ee915583e?auto=format&fit=crop&w=1200&q=82&fm=webp) | [Unsplash](https://unsplash.com/license) |
| `assets/tart.webp` | [Fotoğraf](https://images.unsplash.com/photo-1488477181946-6428a0291777?auto=format&fit=crop&w=1200&q=82&fm=webp) | [Unsplash](https://unsplash.com/license) |
| `assets/kafe.webp` | [Fotoğraf](https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&w=1200&q=82&fm=webp) | [Unsplash](https://unsplash.com/license) |
| `assets/ekmek.webp` | [Fotoğraf](https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=1200&q=82&fm=webp) | [Unsplash](https://unsplash.com/license) |
| `assets/limonata.webp` | [Fotoğraf](https://images.unsplash.com/photo-1621263764928-df1444c5e859?auto=format&fit=crop&w=1200&q=82&fm=webp) | [Unsplash](https://unsplash.com/license) |
| `assets/espresso.webp` | [Fotoğraf](https://unsplash.com/photos/a-small-cup-of-black-coffee-on-a-saucer-7jhmhJUedQw) · David Magalhães | [Unsplash](https://unsplash.com/license) |
| `assets/cay.webp` | [Fotoğraf](https://unsplash.com/photos/white-and-brown-ceramic-mug-qEcWgrTG578) · Drew Jemmett | [Unsplash](https://unsplash.com/license) |
| `assets/americano.webp` | [Fotoğraf](https://unsplash.com/photos/white-ceramic-mug-on-white-ceramic-saucer-YQsAhzo3Vqk) · Henny Kasa | [Unsplash](https://unsplash.com/license) |
| `assets/cappuccino.webp` | [Fotoğraf](https://unsplash.com/photos/cappuccino-coffee-in-mug-tA90pRfL2gM) · Nathan Dumlao | [Unsplash](https://unsplash.com/license) |
| `assets/buzlu-americano.webp` | [Fotoğraf](https://unsplash.com/photos/a-glass-of-iced-coffee-with-foam-and-ice-cubes-nkh4R-7Rrq8) · Mona Jain | [Unsplash](https://unsplash.com/license) |
| `assets/karamelli-buzlu-latte.webp` | [Fotoğraf](https://unsplash.com/photos/shallow-focus-photo-of-brown-liquid-in-clear-drinking-glass-ZuHjaQcYhDY) · Eiliv Aceron | [Unsplash](https://unsplash.com/license) |
| `assets/cikolatali-kruvasan.webp` | [Fotoğraf](https://unsplash.com/photos/chocolate-croissant-dusted-with-cocoa-powder-on-a-white-plate--NOgzXhGJpc) · Madeline Liu | [Unsplash](https://unsplash.com/license) |
| `assets/bademli-kruvasan.webp` | [Fotoğraf](https://unsplash.com/photos/almond-croissants-dusted-with-powdered-sugar-on-a-wooden-board-vJO9OMWkIcU) · Lily Bui Thi | [Unsplash](https://unsplash.com/license) |
| `assets/bitki-cayi.webp` | [Fotoğraf](https://unsplash.com/photos/chamomile-tea-in-a-black-teacup-and-saucer-1X7SJhapVLM) · Gaia&Co | [Unsplash](https://unsplash.com/license) |
| `assets/kakaolu-kurabiye.webp` | [Fotoğraf](https://unsplash.com/photos/chocolate-cookies-on-clear-glass-plate-VLI9EkFQi8k) · May Lawrence | [Unsplash](https://unsplash.com/license) |
| `assets/vanilyali-meyve-pastasi.webp` | [Fotoğraf](https://unsplash.com/photos/vanilla-cake-with-raspberry-filling-and-fresh-berries-GQICjRRSEJ0) · Foodie Flavours | [Unsplash](https://unsplash.com/license) |

## Son görsel kalite kontrolü

Gereksiz tekrarlar yalnızca fotoğraf eşleştirmelerinde giderildi:

- Americano: espresso yerine ayrı, sıcak ve sade Americano fotoğrafı.
- Cappuccino: latte yerine fincanda süt köpüklü cappuccino.
- Buzlu Americano: sütlü latte yerine buzlu, sade kahve.
- Karamelli Buzlu Latte: ayrı karamel latte fotoğrafı.
- Bitki çayı, çikolatalı/bademli kruvasan, vanilyalı meyve pastası ve kakaolu
  kurabiye: ürün türüne uygun ayrı fotoğraflar.

Mevcut hero, espresso, latte, buzlu latte ve diğer doğru fotoğraflar korunmuştur.
Dokuz yeni görselin toplamı yaklaşık 344 KiB'dır. Pastada odağın ürün olması için
kadraj sağ tarafa, kakaolu kurabiyede soldaki koyu kurabiyelere alınmıştır; kırpma
bilgileri kaynak kaydındadır. Yeni SVG kahve çekirdeği, tasarım, ürün metinleri,
fiyatlar, seçenekler ve JavaScript işlevleri değiştirilmemiştir.

Bu güncelleme Chrome'da 1440, 768, 390 ve 320 px genişliklerinde 36 görsel kontrolü
geçmiştir. Menüdeki 20 ürün ve yedi kahvenin farklı fotoğrafları, tüm sayfa
görsellerinin yüklenmesi, 20 ürünün detay ve sepet fotoğrafları, başlangıç
fiyatlarının korunması, yeni kahve çekirdeği SVG'si ve yatay taşma doğrulandı.
JavaScript hatası veya başarısız HTTP isteği görülmedi. Önceki tüm WebP dosyaları,
`app.js`, `index.html`, `styles.css` ve kahve çekirdeği SVG'si SHA-256 karşılaştırmasıyla
değişmeden korunmuştur. `data.js` içinde yalnızca dokuz `image` alanı değişmiştir.

Güncel test kaydı `.review/photo-results.json` dosyasındadır. Masaüstü ve mobil
görüntüler `.review/photos-menu-{1440,390}.png`,
`.review/photos-cold-coffee-{1440,390}.png` ve
`.review/photos-iced-americano-{1440,390}.png` dosyalarındadır. `.review/` yerel
inceleme çıktısıdır; gelecekteki commit/yayın kapsamına alınmamalıdır.

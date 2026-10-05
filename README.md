# Taşıtça — ürün vitrini

Siyah-beyaz, mobil uyumlu, WhatsApp üzerinden sipariş alan statik site.
Derleme adımı yok: dosyaları olduğu gibi yayınlamak yeterli.

## Dosya yapısı

```
index.html            Sayfa iskeleti (başlık, ürün grid'i, güven bölümü, footer, detay ve sepet panelleri)
css/style.css         Tüm stiller
js/data.js            ÜRÜNLER, FİYATLAR ve METİNLER — düzenlenecek tek yer
js/locations.js       Türkiye 81 il / 973 ilçe listesi ("Kargom ne zaman ulaşır?")
js/app.js             Uygulama mantığı (kartlar, detay, sepet, ödeme adımı, intro)
assets/intro.mp4      Açılış videosu (1.3 sn)
assets/images/        Ürün görselleri (kare, beyaz zeminli JPG)
favicon.svg / .png    Sekme simgesi, apple-touch-icon.png iPhone ana ekran simgesi
vercel.json           Vercel ayarları (temiz adresler, görsel/video önbelleği)
```

## İçeriği düzenleme (js/data.js)

- **WhatsApp numarası:** `CONFIG.whatsappNumber` — uluslararası format, boşluksuz (`905019568245`).
- **Ürünler:** `PRODUCTS` dizisi. Her ürün için `name`, `color`, `oldPrice`, `price`, `image`,
  `description`, `features`. Fiyatlar sadece sayı (`549`); "549 TL" biçimi otomatik oluşur.
  İndirimi kaldırmak için `oldPrice` satırını silin. Yeni ürün eklemek için bir bloğu kopyalayıp
  `id` değerini benzersiz yapın.
- **Görsel değiştirme:** Yeni JPG/PNG dosyasını `assets/images/` içine koyun, üründe
  `image: "assets/images/dosya-adi.jpg"` yazın. Kare ve beyaz zeminli görseller en iyi görünür.
- **Metinler:** teslimat (`deliveryLine`, `badgeText`, `etaText`), kargo (`shippingLine`),
  garanti (`warrantyLine`, `warranty.covered / excluded / note`), ödeme (`paymentLine`),
  ödeme adımı açıklaması (`checkoutText`), WhatsApp sepet mesajı (`cartMessage`).
- **Güven bölümü:** `TRUST` dizisi (başlık, metin, ikon adı).
- **Intro süresi:** `introDuration` (ms). Videoyu değiştirmek için `assets/intro.mp4` dosyasını
  aynı adla değiştirin (dikey 9:16 önerilir).

## Yayınlama: GitHub + Vercel

1. GitHub'da yeni bir depo açın (ör. `tasitca`), bu klasördeki **tüm dosyaları** depoya yükleyin
   (web arayüzünde "Add file → Upload files" ile sürükleyip bırakabilirsiniz; `index.html` kök
   dizinde olmalı).
2. [vercel.com](https://vercel.com) → **Add New → Project** → GitHub deponuzu seçin.
3. Framework Preset: **Other**. Build Command ve Output Directory boş kalsın. **Deploy**.
4. Birkaç saniye içinde `https://tasitca.vercel.app` benzeri bir adres alırsınız. Kendi alan adınızı
   Vercel → Settings → Domains'ten bağlayabilirsiniz.
5. `index.html` içindeki `og:image` satırındaki `https://ALAN-ADINIZ.vercel.app/` kısmını gerçek
   adresinizle değiştirin; böylece link WhatsApp/Instagram'da paylaşılınca ürün görseli çıkar.

Depoya yaptığınız her değişiklik (ör. fiyat güncellemesi) Vercel tarafından otomatik yayınlanır.

## Yerelde deneme

`index.html` dosyasına çift tıklayarak açabilirsiniz. Tarayıcı güvenliği nedeniyle bazı
tarayıcılarda intro videosu `file://` altında oynamayabilir; bu durumda sayfa doğrudan açılır.
Tam deneme için klasörde `npx serve` ya da `python3 -m http.server` çalıştırıp
`http://localhost:8000` adresini açın.

## Tarayıcı desteği

iOS Safari 15+, Android Chrome, Chrome, Edge, Firefox, Safari (masaüstü) — telefon, tablet ve
masaüstünde test edildi. Sepet tarayıcıda saklanır (localStorage); intro videosu oynatılamazsa
sayfa beklemeden açılır.

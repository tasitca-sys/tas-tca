/* ============================================================
   Taşıtça — SİTE VERİLERİ (BURADAN DÜZENLEYİN)
   Ürünler, fiyatlar, metinler ve güven bölümü bu dosyadan beslenir.
   ============================================================ */

const CONFIG = {
  // 0501 956 8245 → uluslararası format (başında 90, boşluksuz)
  whatsappNumber: "905019568245",

  // Ödeme adımındaki WhatsApp mesajı. Sepet satırları ve toplam otomatik yerleştirilir.
  cartMessage: (lines, total) =>
    `Merhaba, sepetimdeki ürünleri satın almak istiyorum:\n${lines}\nToplam: ${total}\nÖdemeyi nasıl yapabilirim?`,

  // Ödeme adımında görünen açıklama
  checkoutText: "Siparişinizi tamamlamak için WhatsApp'dan satış birimimizle iletişime geçin. Sepetiniz mesaja hazır olarak eklenir; ödeme (Kredi Kartı & IBAN) ve teslimat adresi görüşmede netleşir.",

  // Üst bar ve footer'daki genel WhatsApp linki için mesaj
  generalMessage: "Merhaba, ürünleriniz hakkında bilgi almak istiyorum.",

  // Her kartın altındaki açıklama (ürüne özel istenirse ürün içinde "subtitle" verilebilir)
  subtitle: "Premium Araç içi telefon tutucu",

  // Kartlarda ve detay penceresinde görünen teslimat / kargo / garanti / ödeme satırları
  deliveryLine: "Bugün sipariş ver, yarın sabah kargoda.",
  badgeText:    "Bugün sipariş ver, yarın sabah kargoda",   // detay penceresindeki yeşil etiket
  shippingLine: "PTT Kargo güvencesiyle gönderilir.",
  etaText:      "2-3 iş günü içerisinde kapında",          // il / ilçe seçilince görünen süre
  warrantyLine: "1 yıl Taşıtça garantisi.",

  // Ürün detayındaki açılır "Garanti kapsamları" alanı
  warranty: {
    covered: [
      "Mıknatıs gücünün zayıflaması veya tamamen kaybolması",
      "Vantuz tabanın tutuş özelliğini yitirmesi",
      "Katlanır kol, halka ve mafsalların gevşemesi ya da kırılması",
      "Kilit / açma-kapama mekanizmasının arızalanması",
      "Üretim veya malzeme hatasından kaynaklanan çatlak, boya ve kaplama kusurları",
      "Kutu içeriğinde eksik veya hasarlı parça çıkması",
    ],
    excluded: [
      "Düşürme, darbe, ezilme veya sıvı temasından kaynaklanan hasarlar",
      "Normal kullanım izleri (çizik, aşınma, renk solması)",
      "Ürünün sökülmesi, değiştirilmesi veya amacı dışında kullanılması",
    ],
    note: "Garanti süresi teslim tarihinden itibaren 1 yıldır. Arıza durumunda WhatsApp hattımıza ürün fotoğrafıyla birlikte yazmanız yeterli; ürün ücretsiz onarılır ya da yenisiyle değiştirilir.",
  },
  paymentLine:  "Kredi Kartı & IBAN.",

  // Para birimi eki
  currency: "TL",

  // Intro videosunun ekranda kaldığı süre (ms)
  introDuration: 1300,
};

/*
  ÜRÜNLER
  - image: assets/images klasöründeki dosyanın yolu ("assets/images/nero-ring.jpg")
    ya da tam bir adres. Boş bırakılırsa gri placeholder görünür.
  - price: güncel fiyat, oldPrice: üstü çizili görünen eski fiyat. Sadece sayı yazın;
    "1.000 TL" biçimi otomatik oluşur. İndirim istemiyorsanız oldPrice satırını silin.
  - color: kartta küçük renk noktası ve WhatsApp mesajında parantez içinde görünür.
    colorHex ile noktanın rengi elle verilebilir (ör. "#5c3d2e").
  - description / features: detay penceresinde görünür.
*/
const PRODUCTS = [
  {
    id: "nero-ring",
    name: "Nero Ring",
    color: "Siyah",
    oldPrice: 1000,
    price: 549,
    image: "assets/images/nero-ring.jpg",
    description: "Güçlü mıknatısları telefonu sarsıntıda bile bırakmaz; katlanır metal kol ve vantuz taban torpidoya ya da cama sıkıca oturur. Mat siyah halka tasarımı her aracın içine şık bir şekilde uyum sağlar. 1 yıl Taşıtça garantisi kapsamındadır.",
    features: ["Güçlü manyetik tutuş, MagSafe uyumlu", "Katlanır kol, kilitlenen vantuz taban", "1 yıl Taşıtça garantisi"],
  },
  {
    id: "nero-disc",
    name: "Nero Disc",
    color: "Kahverengi",
    colorHex: "#5c3d2e",   // renk noktası; yazılmazsa siyah/beyaz otomatik seçilir
    oldPrice: 1000,
    price: 549,
    image: "assets/images/nero-disc.jpg",
    description: "Tam yüzey manyetik disk telefonu daha geniş bir alandan güçlü şekilde kavrar; katlanır halka kol ile açı ayarı tek elle yapılır. Ayna parlaklığındaki siyah yüzeyi araç içine şık bir vurgu katar. 1 yıl Taşıtça garantisi kapsamındadır.",
    features: ["Tam yüzey güçlü mıknatıs", "Katlanır halka kol, tek elle açı ayarı", "1 yıl Taşıtça garantisi"],
  },
  {
    id: "ivory-ring",
    name: "Ivory Ring",
    color: "Beyaz",
    oldPrice: 1200,
    price: 749,
    image: "assets/images/ivory-ring.jpg",
    description: "Güçlü mıknatısı ve sağlam vantuz tabanıyla telefon her yolda yerinde kalır. Beyaz gövdesi ve metal detaylarıyla açık renkli iç mekânlarda özellikle şık durur. 1 yıl Taşıtça garantisi kapsamındadır.",
    features: ["Güçlü manyetik tutuş, MagSafe uyumlu", "Beyaz gövde, metal detaylar", "1 yıl Taşıtça garantisi"],
  },
];

/* GÜVEN BÖLÜMÜ — icon: shield | card | bolt | gem | list | chat | truck | badge */
const TRUST = [
  { icon: "truck",  title: "Yarın Kargoda",        text: "Bugün sipariş verin, yarın kargoda. Gönderiler PTT Kargo güvencesiyle yapılır." },
  { icon: "badge",  title: "1 Yıl Taşıtça Garantisi", text: "Her ürün 1 yıl boyunca Taşıtça garantisi kapsamındadır." },
  { icon: "shield", title: "Güvenli Ödeme",        text: "Ödemenizi sipariş onaylandıktan sonra, sizin seçtiğiniz yöntemle alırız." },
  { icon: "card",   title: "Kredi Kartı & IBAN",   text: "Kredi kartıyla ya da havale / EFT ile ödeyin; ikisi de aynı hızda işler." },
  { icon: "bolt",   title: "Hızlı İletişim",       text: "Mesajlarınız çalışma saatleri içinde dakikalar içinde yanıtlanır." },
  { icon: "gem",    title: "Premium Ürün Seçkisi", text: "Kataloğa yalnızca kendi aracımızda kullanıp memnun kaldığımız ürünler girer." },
  { icon: "list",   title: "Kolay Sipariş Süreci", text: "Üyelik yok. Sepete ekleyin, ödemeye gidin, siparişi WhatsApp'ta tamamlayın." },
  { icon: "chat",   title: "WhatsApp Destek",      text: "Sipariş öncesi ve sonrası tüm sorularınız için aynı hat: 0501 956 8245." },
];

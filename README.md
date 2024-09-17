# NextJsEgitimleri
```
my-advanced-nextjs-app/
│
├── components/               # Tekrar kullanılabilir UI bileşenleri
│   ├── common/               # Ortak kullanılan genel bileşenler (Button, Modal vb.)
│   ├── layout/               # Sayfa düzeni bileşenleri (Header, Footer, Sidebar)
│   └── widgets/              # Sayfa içinde kullanılacak özel bileşenler (Carousels, Cards)
│
├── hooks/                    # React custom hooks (useAuth, useFetch)
│   └── useAuth.js
│
├── pages/                    # Next.js tarafından otomatik olarak route edilen sayfalar
│   ├── _app.js               # Uygulamanın ana giriş dosyası
│   ├── _document.js          # HTML ve Body gibi üst düzey bileşenler
│   ├── api/                  # API rotaları (backend logic)
│   │   └── auth.js           # Örnek bir API rotası (auth işlemleri)
│   ├── blog/                 # Dinamik sayfa örneği
│   │   ├── index.js          # Blog ana sayfası
│   │   └── [slug].js         # Dinamik rota için blog postları
│   ├── admin/                # Yönetici paneli sayfaları
│   │   └── dashboard.js
│   └── index.js              # Ana sayfa
│
├── public/                   # Statik dosyalar (görüntüler, favicon, fontlar)
│   ├── images/               # Resim dosyaları
│   └── fonts/                # Yazı tipleri
│
├── styles/                   # CSS ve Sass dosyaları
│   ├── globals.css           # Uygulama genelinde geçerli CSS
│   ├── variables.module.scss # Sass değişkenleri (renkler, font boyutları)
│   └── components/           # Bileşen bazlı stiller
│       └── Header.module.css
│
├── lib/                      # Yardımcı fonksiyonlar ve harici kütüphaneler
│   ├── api.js                # API ile ilgili genel fonksiyonlar (fetch helper)
│   └── auth.js               # Kimlik doğrulama yardımcı fonksiyonları
│
├── middleware/               # Middleware fonksiyonlar (auth check)
│   └── auth.js
│
├── prisma/                   # Prisma ORM yapılandırma dosyaları (veritabanı yönetimi)
│   ├── schema.prisma         # Prisma şema dosyası
│   └── migrations/           # Veritabanı migration dosyaları
│
├── services/                 # İş mantığı ve API entegrasyonları
│   └── authService.js        # Kimlik doğrulama servisi
│
├── store/                    # Global state yönetimi (Redux, Context API)
│   └── store.js
│
├── tests/                    # Test dosyaları (Jest, Cypress)
│   ├── components/           # Bileşen testleri
│   └── pages/                # Sayfa bazlı testler
│
├── .env.local                # Çevresel değişkenler (API anahtarları, veritabanı bilgileri)
├── .gitignore                # Git ile takip edilmemesi gereken dosyalar
├── next.config.js            # Next.js yapılandırma dosyası
├── package.json              # Proje bağımlılıkları ve script'ler
└── tsconfig.json             # TypeScript konfigürasyon dosyası (TypeScript kullanılıyorsa)

```
Next.js Mimarisi ve Render Yöntemleri
Server-Side Rendering (SSR) ve Static Site Generation (SSG)
Dinamik Rotalama ve Gelişmiş Yönlendirme
API Routes ve Backend Entegrasyonu
Performans Optimizasyonu
SEO ve Metadata Yönetimi
Çevresel Değişkenler ve Güvenlik
Veritabanı Entegrasyonu (Prisma ORM)
Authentication ve Authorization
Global State Yönetimi (Redux, Context API)
TypeScript ile Next.js Kullanımı
Middleware ve Route Yönetimi
Serverless API Geliştirme
CI/CD Pipeline Kurulumu
Test Driven Development (TDD) ve Test Stratejileri
PWA ve Offline Desteği
Çoklu Dil Desteği (i18n)
Mikroservis Mimarisi ile Next.js
WebSockets ile Gerçek Zamanlı Uygulamalar
Monorepo ve Çoklu Proje Yönetimi

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
Advanced Next.js Eğitim Dökümanı: Ders Başlıkları
Giriş ve Next.js Mimarisi

Next.js’in derinlemesine incelenmesi ve bileşenlerinin yapısı.
Next.js’in React’tan farkları ve ek avantajları.
CSR (Client-Side Rendering), SSR (Server-Side Rendering) ve SSG (Static Site Generation) arasındaki farklar.
Server-Side Rendering (SSR) ve Static Site Generation (SSG)

SSR ve SSG’nin kullanımı, avantajları ve dezavantajları.
getServerSideProps ve getStaticProps fonksiyonlarının detaylı kullanımı.
ISR (Incremental Static Regeneration) ile SSG’yi optimize etme.
Dinamik Rotalama ve Gelişmiş Yönlendirme

Dinamik sayfalar ve parametreli routing kullanımı.
getStaticPaths ile dinamik rotaların önceden oluşturulması.
Nested routes ve custom route handlers.
API Routes ile Backend İşlemleri

Next.js API rotalarının ileri düzey kullanımı.
Middleware ile API route’larını genişletme (örneğin, kimlik doğrulama).
Dosya yükleme işlemleri ve API performans optimizasyonları.
Gelişmiş Performans Optimizasyonu

Lazy loading ve code splitting ile performansı artırma.
next/image bileşeni ile resim optimizasyonu.
Preact ve React opt-in gibi performans optimizasyonları.
Lighthouse ile performans testi ve iyileştirmeleri.
SEO ve Metadata Yönetimi

Next.js ile SEO optimizasyonu.
Head yönetimi, next/head bileşeni ile dinamik meta etiketler.
Open Graph ve Twitter Cards kullanarak sosyal medya optimizasyonu.
Schema.org mikrodata entegrasyonu.
Çevresel Değişkenler ve Güvenlik

Çevresel değişkenlerin yönetimi ve güvenli kullanımı (.env.local).
Server-side ve client-side değişkenler arasında ayrım.
Güvenli API çağrıları ve Next.js güvenlik en iyi uygulamaları.
Veritabanı ve ORM Entegrasyonları

Prisma ORM ile Next.js projelerine veritabanı eklemek.
Server-side işlemler için veritabanı bağlantısı yönetimi.
Migration’lar ve veritabanı performans optimizasyonları.
Authentication ve Authorization (Kimlik Doğrulama ve Yetkilendirme)

JWT, OAuth ve Session-based kimlik doğrulama yöntemleri.
next-auth kullanarak tam yetkilendirme ve oturum yönetimi.
Role-based access control (RBAC) ve özel yetkilendirme yapıları.
Global State Yönetimi: Redux ve Context API

Redux ve Redux Toolkit ile state yönetimi.
Context API kullanımı ve optimizasyonu.
Server-side ve client-side state senkronizasyonu.
Next.js ile TypeScript Kullanımı
TypeScript ile Next.js projelerinin yapılandırılması.
tsconfig.json ve TypeScript en iyi uygulamaları.
TypeScript ile API rotaları ve bileşenlerde statik tip denetimi.
Middleware ve Yetkilendirme ile Gelişmiş Route Yönetimi
Next.js'de middleware yazımı.
Oturum ve yetki denetimi için middleware yapıları.
Route bazlı yetkilendirme ve güvenlik önlemleri.
Serverless Mimari ile API Geliştirme
Vercel veya AWS Lambda gibi platformlarda serverless fonksiyonlar.
Serverless fonksiyonların ölçeklenmesi ve optimizasyonu.
Serverless kullanım senaryoları ve best practices.
CI/CD Pipeline Kurulumu
GitHub Actions veya GitLab CI ile CI/CD entegrasyonu.
Test ve deployment süreçlerinin otomatikleştirilmesi.
Next.js projelerinin otomatik deploy süreçleri.
Test Driven Development (TDD) ve Uygulama Testleri
Jest ve React Testing Library kullanarak test yazma.
API route ve SSR testleri.
Cypress kullanarak e2e (end-to-end) testleri oluşturma.
PWA (Progressive Web App) ve Offline Desteği
Next.js ile Progressive Web App oluşturma.
Service Worker yapılandırması ve offline desteği.
PWA performans ve SEO optimizasyonları.
Next.js’de Çoklu Dil Desteği (i18n)
Next.js'in i18n (uluslararasılaştırma) özelliği.
Dil dosyalarının yönetimi ve sayfa bazlı dil ayarları.
Dinamik dil değişimi ve SEO dostu çoklu dil desteği.
Next.js ile Mikroservisler
Next.js’i mikroservis mimarilerinde kullanma.
Diğer servislerle iletişim ve mikroservis performans yönetimi.
API Gateway kullanımı ve serverless entegrasyonu.
Web Sockets ve Gerçek Zamanlı Uygulamalar
Next.js ve WebSockets ile gerçek zamanlı veri iletimi.
Next.js projelerinde Socket.io entegrasyonu.
Gerçek zamanlı bildirim ve chat uygulamaları geliştirme.
Monorepo ve Çoklu Proje Yönetimi
Next.js ile monorepo stratejileri (Yarn Workspaces, Lerna).
Çoklu Next.js projelerinin aynı repo içinde yönetimi.
Monorepo yapılandırması ve proje organizasyonu.

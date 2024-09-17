# NextJsEgitimleri
```
my-nextjs-app/
│
├── components/
│   ├── Layout.js        // Sayfa düzeni
│   ├── Header.js
│   ├── Footer.js
│   └── SEO.js           // SEO optimizasyonu bileşeni
│
├── pages/
│   ├── _app.js
│   ├── _document.js
│   ├── blog/
│   │   ├── [slug].js    // Dinamik sayfalar
│   │   └── index.js     // Blog ana sayfası
│   └── admin/
│       └── dashboard.js // Admin paneli
│
├── lib/
│   ├── api.js           // API çağrıları
│   ├── auth.js          // Kimlik doğrulama
│   └── db.js            // Veritabanı bağlantısı
│
├── prisma/              // Prisma ORM (Veritabanı yönetimi)
│   ├── schema.prisma    // Veritabanı şeması
├── styles/
├── middleware/
│   └── auth.js          // Authentication middleware
├── .env.local
├── next.config.js
└── package.json
```
Konular:
Next.js Nedir?: Next.js’in temel özellikleri ve avantajları.
Sayfalar ve Yönlendirme: pages dizinini kullanarak sayfa oluşturma, otomatik yönlendirme.
Statik Dosyalar: public klasörü ve burada statik dosyaları nasıl yönetileceği.
CSS Modülleri: Yerel ve global CSS kullanımı.
API Routes: Next.js’in backend işlemleri için API route oluşturma.
Component Yapısı: Komponent tabanlı yaklaşım, tekrar kullanılabilir component'ler oluşturma.
Dinamik Sayfalar: [slug].js dosyasıyla dinamik rotalar oluşturma.
API Entegrasyonu: Harici bir API'ye nasıl bağlanılır ve getServerSideProps, getStaticProps fonksiyonları.
Çevresel Değişkenler: .env.local dosyasını kullanarak güvenli API anahtarları ekleme.
Global Stil Yönetimi: _app.js ve _document.js ile tüm sayfalarda geçerli stil ve yapılandırmalar.
SEO ve Performans Optimizasyonu: Sayfa başlıkları, meta etiketleri ve performans iyileştirmeleri.
Server-Side Rendering (SSR) ve Static Generation: İçerikleri önceden oluşturma ve sunucu taraflı render.
Veritabanı Bağlantısı (Prisma ORM): Prisma kullanarak Next.js ile veritabanı işlemleri.
Authentication ve Authorization: Kullanıcı kimlik doğrulaması ve yetkilendirme (JWT, OAuth).
Middleware Kullanımı: Kimlik doğrulama için middleware yapıları.
Admin Paneli: Yönetici paneli ve role-based yetkilendirme.

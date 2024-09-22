import React from 'react';
import Link from 'next/link';
import styles from '../styles/Home.module.css'; // CSS modülü kullanıyorsanız

const Home = () => {
  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <h1 className={styles.title}>
          Hoş Geldiniz!
        </h1>

        <p className={styles.description}>
          Bu, Next.js ile oluşturulmuş bir uygulamadır.
        </p>

        <div className={styles.grid}>
          <Link href="/customers" className={styles.card}>
            <h2>Müşteriler &rarr;</h2>
            <p>Müşteri listesini görüntüleyin ve yönetin.</p>
          </Link>

          <Link href="/products" className={styles.card}>
            <h2>Ürünler &rarr;</h2>
            <p>Ürün kataloğumuzu keşfedin.</p>
          </Link>

          <Link href="/about" className={styles.card}>
            <h2>Hakkımızda &rarr;</h2>
            <p>Şirketimiz hakkında daha fazla bilgi edinin.</p>
          </Link>

          <Link href="/contact" className={styles.card}>
            <h2>İletişim &rarr;</h2>
            <p>Bizimle iletişime geçin.</p>
          </Link>
        </div>
      </main>

      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' '}
          <img src="/vercel.svg" alt="Vercel Logo" className={styles.logo} />
        </a>
      </footer>
    </div>
  );
};

export default Home;

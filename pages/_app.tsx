import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useEffect } from 'react';
import type { AppProps } from 'next/app';
import Layout from '../pages/components/layout/Layout';
import { AuthProvider } from '../pages/customers/services/context/AuthContext';
import AuthGuard from '../pages/customers/services/context/AuthGuard'; // AuthGuard bileşenini içe aktar
import { useRouter } from 'next/router';

function MyApp({ Component, pageProps }: AppProps) {
  useEffect(() => {
    require('bootstrap/dist/js/bootstrap.bundle.min.js');
  }, []);
  // MyApp bileşeni içerisinde
  const router = useRouter();
  // Login sayfası için özel kontrol
  const isLoginPage = router.pathname === '/auth/Login';
  //Component.name
  return (
    <AuthProvider>
      <Layout>
        {isLoginPage ? (
          <Component {...pageProps} />
        ) : (
          <AuthGuard>
            <Component {...pageProps} />
          </AuthGuard>
        )}
      </Layout>
    </AuthProvider>
  );
}

export default MyApp;

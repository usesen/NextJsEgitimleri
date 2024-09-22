import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import { useEffect } from 'react';
import type { AppProps } from 'next/app';
import Layout from '../pages/components/layout/Layout';

function MyApp({ Component, pageProps }: AppProps) {
  useEffect(() => {
    require('bootstrap/dist/js/bootstrap.bundle.min.js');
  }, []);

  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}

export default MyApp;

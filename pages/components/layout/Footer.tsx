import React from 'react';

const Footer = () => {
  return (
    <footer className='bg-light py-4 mt-auto'>
      <div className='container'>
        <div className='row'>
          <div className='col-md-6'>
            <p>&copy; 2024 Şirket Adı. Tüm hakları saklıdır.</p>
          </div>
          <div className='col-md-6 text-md-end'>
            <a href='#' className='text-muted me-2'>
              Gizlilik Politikası
            </a>
            <a href='#' className='text-muted'>
              Kullanım Şartları
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

import React from 'react';
import Link from 'next/link';

const Navbar = () => {
  return (
    <nav className='navbar navbar-expand-lg navbar-light bg-light'>
      <div className='container'>
        <Link href='/' className='navbar-brand'>
          Şirket Adı
        </Link>
        <button
          className='navbar-toggler'
          type='button'
          data-bs-toggle='collapse'
          data-bs-target='#navbarNav'
          aria-controls='navbarNav'
          aria-expanded='false'
          aria-label='Toggle navigation'
        >
          <span className='navbar-toggler-icon'></span>
        </button>
        <div className='collapse navbar-collapse' id='navbarNav'>
          <ul className='navbar-nav'>
            <li className='nav-item'>
              <Link href='/' className='nav-link'>
                Ana Sayfa
              </Link>
            </li>
            <li className='nav-item'>
              <Link href='/customers' className='nav-link'>
                Müşteriler
              </Link>
            </li>
            <li className='nav-item'>
              <Link href='/products' className='nav-link'>
                Ürünler
              </Link>
            </li>
            <li className='nav-item'>
              <Link href='/about' className='nav-link'>
                Hakkımızda
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

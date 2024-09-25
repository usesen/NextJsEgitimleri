import React, { useContext } from 'react';
import Link from 'next/link';
import { FaUser } from 'react-icons/fa'; // Import the user icon from react-icons
import styles from './Navbar.module.css'; // CSS module import
import { AuthContext } from '../../customers/services/context/AuthContext'; 
import { useRouter } from 'next/router'; // useRouter'i import et

const Navbar = () => {
  const authContext = useContext(AuthContext);
  const userName = authContext?.user?.name || 'Kullanıcı Adı'; // Kullanıcı adı burada alınır
  const router = useRouter(); // Router'ı kullan
  console.log('Current User:', userName); // Kontrol için eklenen log
  const handleLogout = () => {
    authContext?.logout(); // Logout fonksiyonunu çağır
    router.push('/auth/Login'); // Kullanıcıyı login sayfasına yönlendir
  };

  return (
    <nav className='navbar navbar-expand-lg navbar-light bg-light'>
      <div className='container'>
        <Link href='/' className='navbar-brand'>
          Ana Sayfa
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
          <ul className='navbar-nav me-auto'>
            <li className='nav-item'>
              <Link href='/customers' className='nav-link'>
                Müşteriler
              </Link>
            </li>
            <li className='nav-item'>
              <Link href='/orders' className='nav-link'>
                Siparişler
              </Link>
            </li>
            <li className='nav-item'>
              <Link href='/products' className='nav-link'>
                Ürünler
              </Link>
            </li>
            <li className='nav-item'>
              <Link href='/reports' className='nav-link'>
                Raporlar
              </Link>
            </li>
          </ul>
          <ul className='navbar-nav ms-auto'>
            <li className='nav-item'>
              <Link href='/profile' className='nav-link'>
                <FaUser className={styles.userIcon} />{' '}
                {/* Use the FaUser icon */}
                {userName}{' '}
              </Link>
            </li>
            <li className='nav-item'>
              <button onClick={handleLogout} className='nav-link btn btn-link'>
                Çıkış Yap
              </button>{' '}
              {/* Logout butonu */}
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

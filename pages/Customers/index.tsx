import React from 'react';
import Link from 'next/link';
import { FaList, FaUserPlus, FaSearch, FaChartBar, FaArrowRight } from 'react-icons/fa';

const cards = [
  { title: 'Müşteri Listesi', desc: 'Tüm müşterilerinizi görüntüleyin ve yönetin.', href: '/customers/list', btnText: 'Müşteri Listesine Git', icon: <FaList />, color: 'primary' },
  { title: 'Yeni Müşteri Ekle', desc: 'Sisteme yeni bir müşteri ekleyin.', href: '/customers/yeni-cari-kart', btnText: 'Yeni Müşteri Ekle', icon: <FaUserPlus />, color: 'success' },
  { title: 'Müşteri Arama', desc: 'Mevcut müşteriler arasında arama yapın.', href: '/customers/search', btnText: 'Müşteri Ara', icon: <FaSearch />, color: 'info' },
  { title: 'Müşteri Raporları', desc: 'Müşteri verilerine dayalı raporları görüntüleyin.', href: '/customers/reports', btnText: 'Raporları Görüntüle', icon: <FaChartBar />, color: 'secondary' },
];

const CustomersHome = () => {
  return (
    <div className='container mt-4'>
      <h1 className='mb-4 text-center'>Müşteri Yönetimi</h1>

      <div className='row g-4'>
        {cards.map((card, index) => (
          <div key={index} className='col-md-6 col-lg-3'>
            <div className={`card h-100 shadow-sm border-0 bg-light`}>
              <div className={`card-header bg-${card.color} text-white py-2 d-flex align-items-center`}>
                <div className='icon-wrapper me-2'>
                  {card.icon}
                </div>
                <h5 className='card-title mb-0'>{card.title}</h5>
              </div>
              <div className='card-body d-flex flex-column'>
                <p className='card-text flex-grow-1'>{card.desc}</p>
                <Link href={card.href} className={`btn btn-outline-${card.color} mt-auto custom-btn d-flex align-items-center justify-content-between`}>
                  <span>{card.btnText}</span>
                  <FaArrowRight className="ms-2" />
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CustomersHome;

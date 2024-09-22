import React from 'react';
import Link from 'next/link';

const CustomersHome = () => {
  return (
    <div className='container mt-4'>
      <h1 className='mb-4'>Müşteri Yönetimi</h1>

      <div className='row'>
        <div className='col-md-6 mb-3'>
          <div className='card'>
            <div className='card-body'>
              <h5 className='card-title'>Müşteri Listesi</h5>
              <p className='card-text'>
                Tüm müşterilerinizi görüntüleyin ve yönetin.
              </p>
              <Link href='/customers/list' className='btn btn-primary'>
                Müşteri Listesine Git
              </Link>
            </div>
          </div>
        </div>

        <div className='col-md-6 mb-3'>
          <div className='card'>
            <div className='card-body'>
              <h5 className='card-title'>Yeni Müşteri Ekle</h5>
              <p className='card-text'>Sisteme yeni bir müşteri ekleyin.</p>
              <Link href='/customers/add' className='btn btn-success'>
                Yeni Müşteri Ekle
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className='row mt-4'>
        <div className='col-md-6 mb-3'>
          <div className='card'>
            <div className='card-body'>
              <h5 className='card-title'>Müşteri Arama</h5>
              <p className='card-text'>
                Mevcut müşteriler arasında arama yapın.
              </p>
              <Link href='/customers/search' className='btn btn-info'>
                Müşteri Ara
              </Link>
            </div>
          </div>
        </div>

        <div className='col-md-6 mb-3'>
          <div className='card'>
            <div className='card-body'>
              <h5 className='card-title'>Müşteri Raporları</h5>
              <p className='card-text'>
                Müşteri verilerine dayalı raporları görüntüleyin.
              </p>
              <Link href='/customers/reports' className='btn btn-secondary'>
                Raporları Görüntüle
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomersHome;

import React, { useState, useEffect } from 'react';
import ReactPaginate from 'react-paginate';
import styles from '../../styles/YeniCariKart.module.css';
import { FaSearch, FaPlus, FaEye, FaEdit, FaTrash, FaBuilding, FaCity, FaUser } from 'react-icons/fa';

interface Customer {
  id: number;
  unvan: string;
  sehir: string;
  yetkili: string;
  borc: number;
  alacak: number;
  bakiyeBorc: number;
  bakiyeAlacak: number;
}

const YeniCariKart: React.FC = () => {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [customersPerPage, setCustomersPerPage] = useState(10);
  const [searchUnvan, setSearchUnvan] = useState('');
  const [searchSehir, setSearchSehir] = useState('');
  const [searchYetkili, setSearchYetkili] = useState('');

  // Daha fazla veri oluşturmak için bir fonksiyon
  const createFakeData = (count: number): Customer[] => {
    return Array.from({ length: count }, (_, index) => ({
      id: index + 1,
      unvan: `Şirket ${index + 1}`,
      sehir: ['İstanbul', 'Ankara', 'İzmir', 'Bursa', 'Antalya'][Math.floor(Math.random() * 5)],
      yetkili: `Yetkili ${index + 1}`,
      borc: Math.floor(Math.random() * 10000),
      alacak: Math.floor(Math.random() * 10000),
      bakiyeBorc: Math.floor(Math.random() * 5000),
      bakiyeAlacak: Math.floor(Math.random() * 5000),
    }));
  };

  useEffect(() => {
    // Komponentin yüklendiğinde 100 adet sahte veri oluştur
    setCustomers(createFakeData(100));
  }, []);

  const pageCount = Math.ceil(customers.length / customersPerPage);

  const handlePageClick = (event: { selected: number }) => {
    setCurrentPage(event.selected);
  };

  const handleCustomersPerPageChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setCustomersPerPage(Number(event.target.value));
    setCurrentPage(0); // Sayfa sayısı değiştiğinde ilk sayfaya dön
  };

  const handleSearch = () => {
    // Arama işlemi burada gerçekleştirilecek
    console.log('Arama yapılıyor:', { searchUnvan, searchSehir, searchYetkili });
  };

  const handleNewRecord = () => {
    // Yeni kayıt ekleme işlemi burada gerçekleştirilecek
    console.log('Yeni kayıt ekleniyor');
  };

  const offset = currentPage * customersPerPage;
  const currentCustomers = customers.slice(offset, offset + customersPerPage);

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Yeni Cari Kart</h1>
      <div className={styles.searchContainer}>
        <div className={styles.inputWrapper}>
          <FaBuilding className={styles.inputIcon} />
          <input
            type='text'
            placeholder='Ünvan'
            className={styles.searchInput}
            value={searchUnvan}
            onChange={(e) => setSearchUnvan(e.target.value)}
          />
        </div>
        <div className={styles.inputWrapper}>
          <FaCity className={styles.inputIcon} />
          <input
            type='text'
            placeholder='Şehir'
            className={styles.searchInput}
            value={searchSehir}
            onChange={(e) => setSearchSehir(e.target.value)}
          />
        </div>
        <div className={styles.inputWrapper}>
          <FaUser className={styles.inputIcon} />
          <input
            type='text'
            placeholder='Yetkili'
            className={styles.searchInput}
            value={searchYetkili}
            onChange={(e) => setSearchYetkili(e.target.value)}
          />
        </div>
        <button className={styles.searchButton} onClick={handleSearch}>
          <FaSearch /> Ara
        </button>
        <button className={styles.newRecordButton} onClick={handleNewRecord}>
          <FaPlus /> Yeni Kayıt
        </button>
      </div>
      <div className={styles.tableContainer}>
        <table className={styles.table}>
          <thead>
            <tr className={styles.tableHeader}>
              <th className={styles.tableCell}>ID</th>
              <th className={styles.tableCell}>Ünvan</th>
              <th className={styles.tableCell}>Şehir</th>
              <th className={styles.tableCell}>Yetkili</th>
              <th className={styles.tableCell}>Borç</th>
              <th className={styles.tableCell}>Alacak</th>
              <th className={styles.tableCell}>Bakiye Borç</th>
              <th className={styles.tableCell}>Bakiye Alacak</th>
              <th className={`${styles.tableCell} ${styles.actionsCell}`}>
                İşlemler
              </th>
            </tr>
          </thead>
          <tbody>
            {currentCustomers.map((customer) => (
              <tr key={customer.id}>
                <td className={styles.tableCell}>{customer.id}</td>
                <td className={styles.tableCell}>{customer.unvan}</td>
                <td className={styles.tableCell}>{customer.sehir}</td>
                <td className={styles.tableCell}>{customer.yetkili}</td>
                <td className={styles.tableCell}>{customer.borc}</td>
                <td className={styles.tableCell}>{customer.alacak}</td>
                <td className={styles.tableCell}>{customer.bakiyeBorc}</td>
                <td className={styles.tableCell}>{customer.bakiyeAlacak}</td>
                <td className={`${styles.tableCell} ${styles.actionsCell}`}>
                  <button className={`${styles.button} ${styles.buttonBlue}`}>
                    <FaEye /> Göster
                  </button>
                  <button className={`${styles.button} ${styles.buttonGreen}`}>
                    <FaEdit /> Düzelt
                  </button>
                  <button className={`${styles.button} ${styles.buttonRed}`}>
                    <FaTrash /> İptal
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className={styles.tableFooter}>
        <div className={styles.tableOptions}>
          <label htmlFor="customersPerPage" className={styles.selectLabel}>Gösterilecek müşteri sayısı:</label>
          <select
            id="customersPerPage"
            value={customersPerPage}
            onChange={handleCustomersPerPageChange}
          >
            <option value='5'>5</option>
            <option value='10'>10</option>
            <option value='20'>20</option>
          </select>
        </div>
        <ReactPaginate
          previousLabel={'Önceki'}
          nextLabel={'Sonraki'}
          breakLabel={'...'}
          pageCount={pageCount}
          marginPagesDisplayed={2}
          pageRangeDisplayed={5}
          onPageChange={handlePageClick}
          containerClassName={styles.pagination}
          activeClassName={styles.active}
          previousClassName={styles.paginationButton}
          nextClassName={styles.paginationButton}
          pageClassName={styles.paginationButton}
          breakClassName={styles.paginationButton}
          disabledClassName={styles.disabled}
        />
      </div>
    </div>
  );
};

export default YeniCariKart;

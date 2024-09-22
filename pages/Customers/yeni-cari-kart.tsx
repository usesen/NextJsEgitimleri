import React, { useState, useEffect, useMemo } from 'react';
import ReactPaginate from 'react-paginate';
import styles from '../../styles/YeniCariKart.module.css';
import {
  FaSearch,
  FaPlus,
  FaEye,
  FaEdit,
  FaTrash,
  FaBuilding,
  FaCity,
  FaUser,
  FaSort,
  FaSortUp,
  FaSortDown
} from 'react-icons/fa';

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

type SortField = 'id' | 'unvan' | 'sehir' | 'yetkili' | 'borc' | 'alacak' | 'bakiyeBorc' | 'bakiyeAlacak';
type SortOrder = 'asc' | 'desc';

const YeniCariKart: React.FC = () => {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [customersPerPage, setCustomersPerPage] = useState(10);
  const [searchUnvan, setSearchUnvan] = useState('');
  const [searchSehir, setSearchSehir] = useState('');
  const [searchYetkili, setSearchYetkili] = useState('');
  const [sortField, setSortField] = useState<SortField>('id');
  const [sortOrder, setSortOrder] = useState<SortOrder>('asc');

  // Filtrelenmiş müşterileri hesapla
  const filteredCustomers = useMemo(() => {
    return customers.filter(customer =>
      customer.unvan.toLowerCase().includes(searchUnvan.toLowerCase()) &&
      customer.sehir.toLowerCase().includes(searchSehir.toLowerCase()) &&
      customer.yetkili.toLowerCase().includes(searchYetkili.toLowerCase())
    );
  }, [customers, searchUnvan, searchSehir, searchYetkili]);

  // Filtrelenmiş ve sıralanmış müşterileri hesapla
  const sortedAndFilteredCustomers = useMemo(() => {
    return filteredCustomers.sort((a, b) => {
      if (a[sortField] < b[sortField]) return sortOrder === 'asc' ? -1 : 1;
      if (a[sortField] > b[sortField]) return sortOrder === 'asc' ? 1 : -1;
      return 0;
    });
  }, [filteredCustomers, sortField, sortOrder]);

  const sirketUnvanlari = [
    "Anadolu Ticaret A.Ş.", "Yıldız Lojistik Ltd. Şti.", "Mavi Deniz Turizm ve Otelcilik",
    "Yeşil Vadi Tarım Ürünleri", "Güneş Enerji Sistemleri A.Ş.", "Akıllı Teknoloji Çözümleri",
    "Doğa Dostu Tekstil San. Tic. Ltd.", "Mega Yapı Malzemeleri A.Ş.", "Sağlıklı Yaşam Gıda Ltd. Şti.",
    "Hızlı Kargo Dağıtım Hizmetleri", "Parlak Gelecek Eğitim Kurumları", "Güvenli Adım Sigorta A.Ş.",
    "Yeşil Çevre Geri Dönüşüm Ltd.", "Mutlu Patiler Veteriner Kliniği", "Tatlı Rüyalar Mobilya San.",
    "Dijital Dünya Bilişim Hizmetleri", "Lezzet Durağı Restoran İşletmeleri", "Renkli Düşler Oyuncak Ltd.",
    "Temiz Enerji Çözümleri A.Ş.", "Güçlü Makine Sanayi ve Ticaret"
  ];

  const yetkililer = [
    "Ahmet Yılmaz", "Ayşe Kaya", "Mehmet Demir", "Fatma Çelik", "Ali Öztürk",
    "Zeynep Aydın", "Mustafa Şahin", "Emine Yıldız", "Hasan Kara", "Hatice Aksoy",
    "İbrahim Arslan", "Elif Güneş", "Osman Koç", "Merve Özdemir", "Hüseyin Çetin",
    "Esra Yalçın", "Murat Erdoğan", "Selin Doğan", "Emre Avcı", "Gizem Korkmaz"
  ];

  const sehirler = [
    "İstanbul", "Ankara", "İzmir", "Bursa", "Antalya", "Adana", "Konya", "Gaziantep",
    "Şanlıurfa", "Kocaeli", "Mersin", "Diyarbakır", "Hatay", "Manisa", "Kayseri"
  ];

  const createFakeData = (count: number): Customer[] => {
    return Array.from({ length: count }, (_, index) => ({
      id: index + 1,
      unvan: sirketUnvanlari[Math.floor(Math.random() * sirketUnvanlari.length)],
      sehir: sehirler[Math.floor(Math.random() * sehirler.length)],
      yetkili: yetkililer[Math.floor(Math.random() * yetkililer.length)],
      borc: Math.floor(Math.random() * 1000000) / 100,
      alacak: Math.floor(Math.random() * 1000000) / 100,
      bakiyeBorc: Math.floor(Math.random() * 500000) / 100,
      bakiyeAlacak: Math.floor(Math.random() * 500000) / 100,
    }));
  };

  useEffect(() => {
    // Komponentin yüklendiğinde 100 adet sahte veri oluştur
    setCustomers(createFakeData(100));
  }, []);

  const pageCount = Math.ceil(filteredCustomers.length / customersPerPage);

  const handlePageClick = (event: { selected: number }) => {
    setCurrentPage(event.selected);
  };

  const handleCustomersPerPageChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setCustomersPerPage(Number(event.target.value));
    setCurrentPage(0); // Sayfa sayısı değiştiğinde ilk sayfaya dön
  };

  const handleSearch = () => {
    const filteredCustomers = customers.filter(customer => 
      customer.unvan.toLowerCase().includes(searchUnvan.toLowerCase()) &&
      customer.sehir.toLowerCase().includes(searchSehir.toLowerCase()) &&
      customer.yetkili.toLowerCase().includes(searchYetkili.toLowerCase())
    );
    setCustomers(filteredCustomers);
    setCurrentPage(0); // Arama sonrası ilk sayfaya dön
  };

  const handleNewRecord = () => {
    // Yeni kayıt ekleme işlemi burada gerçekleştirilecek
    console.log('Yeni kayıt ekleniyor');
  };

  const offset = currentPage * customersPerPage;
  const currentCustomers = sortedAndFilteredCustomers.slice(offset, offset + customersPerPage);

  const formatNumber = (amount: number) => {
    return new Intl.NumberFormat('tr-TR', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(amount);
  };

  // Arama input'ları için onChange handler'ları
  const handleUnvanSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchUnvan(e.target.value);
    setCurrentPage(0);
  };

  const handleSehirSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchSehir(e.target.value);
    setCurrentPage(0);
  };

  const handleYetkiliSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchYetkili(e.target.value);
    setCurrentPage(0);
  };

  const handleSort = (field: SortField) => {
    if (field === sortField) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortOrder('asc');
    }
  };

  const SortIcon = ({ field }: { field: SortField }) => {
    if (field !== sortField) return <FaSort />;
    return sortOrder === 'asc' ? <FaSortUp /> : <FaSortDown />;
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Yeni Cari Kart</h1>
      <div className={styles.searchContainer}>
        <div className={styles.inputWrapper}>
          <FaBuilding className={styles.inputIcon} />
          <input
            type="text"
            placeholder="Ünvan Ara..."
            value={searchUnvan}
            onChange={handleUnvanSearch}
            className={styles.searchInput}
          />
        </div>
        <div className={styles.inputWrapper}>
          <FaCity className={styles.inputIcon} />
          <input
            type="text"
            placeholder="Şehir Ara..."
            value={searchSehir}
            onChange={handleSehirSearch}
            className={styles.searchInput}
          />
        </div>
        <div className={styles.inputWrapper}>
          <FaUser className={styles.inputIcon} />
          <input
            type="text"
            placeholder="Yetkili Ara..."
            value={searchYetkili}
            onChange={handleYetkiliSearch}
            className={styles.searchInput}
          />
        </div>
        <button className={styles.searchButton} onClick={handleSearch}>
          <FaSearch /> Ara
        </button>
        <button className={styles.newRecordButton} onClick={handleNewRecord}>
          <FaPlus /> Yeni Kayıt
        </button>
        <select
          id='customersPerPage'
          value={customersPerPage}
          onChange={handleCustomersPerPageChange}
          className={styles.customersPerPageSelect}
        >
          <option value='5'>5</option>
          <option value='10'>10</option>
          <option value='20'>20</option>
        </select>
      </div>
      <div className={styles.tableContainer}>
        <table className={styles.table}>
          <thead>
            <tr className={styles.tableHeader}>
              <th className={styles.tableCell} onClick={() => handleSort('id')}>
                ID <SortIcon field="id" />
              </th>
              <th className={styles.tableCell} onClick={() => handleSort('unvan')}>
                Ünvan <SortIcon field="unvan" />
              </th>
              <th className={styles.tableCell} onClick={() => handleSort('sehir')}>
                Şehir <SortIcon field="sehir" />
              </th>
              <th className={styles.tableCell} onClick={() => handleSort('yetkili')}>
                Yetkili <SortIcon field="yetkili" />
              </th>
              <th className={styles.tableCell} onClick={() => handleSort('borc')}>
                Borç <SortIcon field="borc" />
              </th>
              <th className={styles.tableCell} onClick={() => handleSort('alacak')}>
                Alacak <SortIcon field="alacak" />
              </th>
              <th className={styles.tableCell} onClick={() => handleSort('bakiyeBorc')}>
                Bakiye Borç <SortIcon field="bakiyeBorc" />
              </th>
              <th className={styles.tableCell} onClick={() => handleSort('bakiyeAlacak')}>
                Bakiye Alacak <SortIcon field="bakiyeAlacak" />
              </th>
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
                <td className={styles.tableCell}>{formatNumber(customer.borc)}</td>
                <td className={styles.tableCell}>{formatNumber(customer.alacak)}</td>
                <td className={styles.tableCell}>{formatNumber(customer.bakiyeBorc)}</td>
                <td className={styles.tableCell}>{formatNumber(customer.bakiyeAlacak)}</td>
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

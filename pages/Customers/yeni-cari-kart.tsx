import React, { useState, useEffect, useMemo } from 'react';
import ReactPaginate from 'react-paginate';
import styles from '../../styles/YeniCariKart.module.css';
import { toast } from 'react-toastify';
import ModalForm from './FormData';
import CariRecord from '../models/CariRecordModel';
import { getData, handleDeleteData} from './services/customerservice'; // Servis dosyanızdan getData fonksiyonunu içe aktarıyoruz.
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // Toastify stillerini dahil etmeyi unutma
import ConfirmDeleteModal from './services/ConfirmDeleteModal';
import { Button } from 'react-bootstrap';

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
  FaSortDown,
} from 'react-icons/fa';

type SortField = 'id' | 'company' | 'city' | 'firstName' | 'debt' | 'credit' | 'balanceDebt' | 'balanceCredit';
type SortOrder = 'asc' | 'desc';

const YeniCariKart: React.FC = () => {
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [recordToDelete, setRecordToDelete] = useState<CariRecord | null>(null);
  const [customers, setCustomers] = useState<CariRecord[]>([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [customersPerPage, setCustomersPerPage] = useState(10);
  const [searchUnvan, setSearchUnvan] = useState('');
  const [searchSehir, setSearchSehir] = useState('');
  const [searchYetkili, setSearchYetkili] = useState('');
  const [sortField, setSortField] = useState<SortField>('id');
  const [sortOrder, setSortOrder] = useState<SortOrder>('asc');
  const [showModal, setShowModal] = useState(false);
  const [currentRecord, setCurrentRecord] = useState<CariRecord>({
    id: '',
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    country: '',
    postalCode: '',
    company: '',
    position: '',
    notes: '',
    debt: 0,
    credit: 0,
    balanceDebt: 0,
    balanceCredit: 0,
  });
 
  const [modalMode, setModalMode] = useState<'new' | 'edit' | 'view'>('new');
  // Filtrelenmiş müşterileri hesapla
  const filteredCustomers = useMemo(() => {
    return customers.filter(
      (customer: CariRecord) =>
        customer.company.toLowerCase().includes(searchUnvan.toLowerCase()) &&
        customer.city.toLowerCase().includes(searchSehir.toLowerCase()) &&
        customer.firstName.toLowerCase().includes(searchYetkili.toLowerCase())
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

  const handleClose = () => setShowModal(false); // Modalı kapatma fonksiyonu

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
    setCurrentPage(0); // Arama sonrası ilk sayfaya dön
  };

const handleNewRecord = () => {
  // Yeni kayıt için currentRecord'u sıfırla
  setCurrentRecord({
    id: '',
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    country: '',
    postalCode: '',
    company: '',
    position: '',
    notes: '',
    debt: 0,
    credit: 0,
    balanceDebt: 0,
    balanceCredit: 0,
  });
  setModalMode('new'); 
  setShowModal(true); // Yeni kayıt için modalı aç
};

  const offset = currentPage * customersPerPage;
  const currentCustomers = sortedAndFilteredCustomers.slice(
    offset,
    offset + customersPerPage
  );

  const formatNumber = (amount: number) => {
    return new Intl.NumberFormat('tr-TR', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getData(); // API isteğini başlatıyoruz
        setCustomers(data); // Gelen verileri state'e atıyoruz
      } catch (error) {
        console.error('Veri çekme hatası:', error);
      }
    };

    fetchData(); // Component mount edildiğinde veri çekiyoruz
  }, []); // Boş bağımlılık dizisi, bu useEffect'in sadece component mount edildiğinde çalışmasını sağlar.
  const handleShow = (record: CariRecord, mode: 'view' | 'edit' | 'new' ) => {
    setCurrentRecord(record); // Burada tıklanan kaydı ayarlıyoruz
    setModalMode(mode); // Modu ayarla (view veya edit)
    setShowModal(true);
  };
  const openDeleteModal = (record :CariRecord) => {
    console.log("modal açıldı id nin gelmesi lazım :" , record.id);
    setRecordToDelete(record);
    setShowDeleteModal(true);
  };

  const closeDeleteModal = () => {
    setShowDeleteModal(false);
    setRecordToDelete(null);
  };

const handleDeleteConfirm = () => {
  if (recordToDelete) {
    console.log(
      'handleDeleteConfirm Deleting record',
      recordToDelete.id.toString
    );
    handleDelete(recordToDelete.id.toString());
  }
  closeDeleteModal(); // Modal'ı kapatmayı unutmayın
};

const handleDelete = async (id: string) => {
  try {
    console.log('handleDelete Deleting record', id);
    const response = await handleDeleteData(id);

    console.log('Delete response:', response); // Yanıtı konsola yazdırıyoruz

    // HTTP 204 No Content yanıtı için response boş olacak
    if (response === null || response === undefined) {
      toast.success('Kayıt başarıyla silindi.');
      // Silme işlemi başarılı olursa tabloyu güncelliyoruz
      setCustomers((prevCustomers) =>
        prevCustomers.filter((customer) => customer.id !== id)
      );
    } else {
      // Beklenmeyen bir yanıt alındıysa
      toast.error('Kayıt silinirken beklenmeyen bir yanıt alındı.');
      console.error('Unexpected delete response:', response);
    }
  } catch (error) {
    console.error('Silme hatası:', error);
    toast.error('Kayıt silinirken bir hata oluştu.');
  }
};

 const handleFormChange = (updatedData: CariRecord) => {
   setCurrentRecord(updatedData);
 };

 const handleFormSubmit = async () => {
   try {
     // API'ye veri gönderme işlemi
     // await updateCustomer(currentRecord);
     handleClose();
     // Başarılı güncelleme mesajı göster
   } catch (error) {
     console.error('Güncelleme hatası:', error);
     // Hata mesajı göster
   }
 };
 
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Yeni Cari Kart</h1>
      <div className={styles.searchContainer}>
        <div className={styles.inputWrapper}>
          <FaBuilding className={styles.inputIcon} />
          <input
            type='text'
            placeholder='Ünvan Ara...'
            value={searchUnvan}
            onChange={handleUnvanSearch}
            className={styles.searchInput}
          />
        </div>
        <div className={styles.inputWrapper}>
          <FaCity className={styles.inputIcon} />
          <input
            type='text'
            placeholder='Şehir Ara...'
            value={searchSehir}
            onChange={handleSehirSearch}
            className={styles.searchInput}
          />
        </div>
        <div className={styles.inputWrapper}>
          <FaUser className={styles.inputIcon} />
          <input
            type='text'
            placeholder='Yetkili Ara...'
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
                ID <SortIcon field='id' />
              </th>
              <th
                className={styles.tableCell}
                onClick={() => handleSort('company')}
              >
                Ünvan <SortIcon field='company' />
              </th>
              <th
                className={styles.tableCell}
                onClick={() => handleSort('city')}
              >
                Şehir <SortIcon field='city' />
              </th>
              <th
                className={styles.tableCell}
                onClick={() => handleSort('firstName')}
              >
                Yetkili <SortIcon field='firstName' />
              </th>
              <th
                className={styles.tableCell}
                onClick={() => handleSort('debt')}
              >
                Borç <SortIcon field='debt' />
              </th>
              <th
                className={styles.tableCell}
                onClick={() => handleSort('credit')}
              >
                Alacak <SortIcon field='credit' />
              </th>
              <th
                className={styles.tableCell}
                onClick={() => handleSort('balanceDebt')}
              >
                Bakiye Borç <SortIcon field='balanceDebt' />
              </th>
              <th
                className={styles.tableCell}
                onClick={() => handleSort('balanceCredit')}
              >
                Bakiye Alacak <SortIcon field='balanceCredit' />
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
                <td className={styles.tableCell}>{customer.company}</td>
                <td className={styles.tableCell}>{customer.city}</td>
                <td className={styles.tableCell}>{customer.firstName}</td>
                <td className={styles.tableCell}>
                  {formatNumber(customer.debt)}
                </td>
                <td className={styles.tableCell}>
                  {formatNumber(customer.credit)}
                </td>
                <td className={styles.tableCell}>
                  {formatNumber(customer.balanceDebt)}
                </td>
                <td className={styles.tableCell}>
                  {formatNumber(customer.balanceCredit)}
                </td>
                <td className='text-center'>
                  <Button
                    variant='info'
                    size='sm'
                    className='me-2'
                    onClick={() => handleShow(customer, 'view')}
                  >
                    <FaEye />
                  </Button>
                  <Button
                    variant='warning'
                    size='sm'
                    className='me-2'
                    onClick={() => handleShow(customer, 'edit')}
                  >
                    <FaEdit />
                  </Button>
                  <Button
                    variant='danger'
                    onClick={() => openDeleteModal(customer)}
                  >
                    <FaTrash />
                  </Button>
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
        <ConfirmDeleteModal
        show={showDeleteModal} // Modalın açılıp açılmadığını kontrol eden props
        handleClose={() => setShowDeleteModal(false)} // Modalı kapatma fonksiyonu
        handleConfirm={handleDeleteConfirm} // Silme işlemi onaylandığında tetiklenecek fonksiyon
      />
      <ModalForm
        show={showModal}
        handleClose={handleClose}
        formData={currentRecord}
        mode={modalMode}
        onFormChange={handleFormChange}
        onFormSubmit={handleFormSubmit}
      />
 
      <ToastContainer />
    </div>
  );
};

export default YeniCariKart;
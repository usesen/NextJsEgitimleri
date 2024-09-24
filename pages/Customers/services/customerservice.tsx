import axiosInstance from './axiosInstance'; // API yapılandırmasını burada kullanacağız
import {
  customerApiInstance,
  authApiInstance,
} from '../services/axiosInstance';

// Admin verisini çek
const fetchAdminData = async () => {
  try {
    const token = localStorage.getItem('token');
    console.log('Current Token:', token);
    const response = await authApiInstance.get('/admin-only');
    return response.data;
  } catch (error) {
    handleError(error, 'Error fetching admin data');
  }
};

// GET (Tüm verileri al)
export const getData = async () => {
  try {
    const response = await customerApiInstance.get('/customer/getall');
    //fetchAdminData(); // Gerekliyse admin verisini de çağırıyoruz
    return response.data;
  } catch (error) {
    handleError(error, 'Error fetching data');
  }
};

// GET by ID (Veriyi ID ile al)
export const fetchCustomerById = async (id: string) => {
  try {
    const response = await customerApiInstance.get(`/customer/${id}`);
    return response.data;
  } catch (error) {
    handleError(error, 'Error fetching customer by ID');
  }
};

// POST (Yeni müşteri ekle)
export const handlePostData = async (data: any) => {
  try {
    const response = await customerApiInstance.post('/customer', data);
    return response.data;
  } catch (error) {
    console.log(error);
    handleError(error, 'Error posting data');
  }
};

// PUT (Mevcut müşteriyi güncelle)
export const handleUpdateData = async (id: string, data: any) => {
  try {
    const response = await customerApiInstance.put(`/customer/${id}`, data);
    return response.data;
  } catch (error) {
    handleError(error, 'Error updating data');
  }
};

// DELETE (Müşteriyi sil)
// DELETE (Müşteriyi sil)
export const handleDeleteData = async (id: string): Promise<void> => {
  try {
    await customerApiInstance.delete(`/customer/${id}`);
    // Başarılı silme işlemi için bir şey döndürmüyoruz
  } catch (error) {
    handleError(error, 'Error deleting customer');
  }
};


// Merkezi hata yönetimi fonksiyonu
const handleError = (error: any, message: string) => {
  if (error.response) {
    console.error(`${message}:`, error.response.data);
    console.error('Status:', error.response.status);
    console.error('Headers:', error.response.headers);
  } else if (error.request) {
    console.error('İstek Yapıldı, Yanıt Yok:', error.request);
  } else {
    console.error('İstek sırasında bir hata oluştu:', error.message);
  }
  throw error; // Hata dışarıya fırlatılabilir
};

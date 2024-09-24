import axios from 'axios';

// .env dosyasından baseURL'i alıyoruz, burda bir sorun var sonra halledilecek
const baseURL = process.env.REACT_APP_API_BASE_URL;

// Axios instance oluşturuyoruz
export const customerApiInstance = axios.create({
  baseURL: 'https://localhost:7254/api/v1',
  headers: {
    'Content-Type': 'application/json',
  },
});

export const authApiInstance = axios.create({
  baseURL: 'https://localhost:7254/api/auth',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Token'ı her isteğe eklemek için interceptor kullanıyoruz
authApiInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token'); // Token'ı localStorage'dan al
    console.log('Interceptor Token:', token); // Token'ı kontrol et
    if (token) {
      config.headers.Authorization = `Bearer ${token}`; // Token'ı Authorization başlığına ekle
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

console.log(process.env.REACT_APP_API_BASE_URL);
console.log('baseURL axiosInstance', baseURL);
const axiosInstance = axios.create({
  baseURL: 'https://localhost:7254/api/auth/admin-only', // baseURL .env dosyasından alınıyor
  timeout: 10000, // İsteğin zaman aşımı
  headers: {
    'Content-Type': 'application/json',
  },
});

export default axiosInstance;


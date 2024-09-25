import React, { useContext, useState } from 'react';
import { useRouter } from 'next/router';
import { AuthContext } from '../customers/services/context/AuthContext';
import axios from 'axios';
import { authApiInstance } from '../customers/services/axiosInstance';
import { jwtDecode } from 'jwt-decode';


const Login = () => {
  const authContext = useContext(AuthContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter(); // Router'ı buraya ekleyin
  const [loading, setLoading] = useState(false);

  // Null kontrolü
  if (!authContext) {
    return <div>Yükleniyor...</div>; // AuthContext yüklenene kadar gösterilecek içerik
  }

  const { login } = authContext;

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      console.log(email, password);
      const response = await authApiInstance.post('/login', {
        username: email,
        password,
      });
      console.log(response.data);
      const token = response.data.token;

      const decodedToken: any = jwtDecode(token);

      console.log('Decoded Token:', decodedToken); // Token içeriğini kontrol et

      const userData = {
        name: decodedToken.unique_name || '', // Eğer unique_name yoksa boş string
        email: decodedToken.unique_name, // Girişteki email'i kullan
        token,
      };
      console.log('User Data güncellendi : ', userData);
      localStorage.setItem('token', token);
      console.log('Saved Token:', localStorage.getItem('token'));
      login(userData);
      router.push('/');
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        // Axios hatasıysa, yanıt ve mesaj bilgilerini kullanabilirsin
        console.error(err.response ? err.response.data : err.message);
        setError('Giriş başarısız. Lütfen bilgilerinizi kontrol edin.');
      } else {
        // Diğer hata türleri için genel bir hata mesajı
        console.error(err);
        setError('Bir hata oluştu. Lütfen tekrar deneyin.');
      }
    }

    // TODO: Implement login logic
    console.log('Login attempt with:', email, password);
  };

  return (
    <>
      <style jsx>{styles}</style>

      <div className='login-container'>
        <div className='login-form'>
          <h1>Giriş Yap</h1>
          {error && <p className='error-message'>{error}</p>}
          <form onSubmit={handleLogin}>
            <input
              type='email'
              placeholder='Email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <input
              type='password'
              placeholder='Şifre'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button type='submit'>Giriş Yap</button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login; // Bileşen adı ile eşleşen şekilde güncelleyerek dışa aktar

// Stil tanımlamaları
const styles = `
  .login-container {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    background-color: #f0f2f5;
  }

  .login-form {
    background-color: white;
    padding: 2rem;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    width: 100%;
    max-width: 400px;
  }

  .login-form h1 {
    text-align: center;
    margin-bottom: 1.5rem;
    color: #333;
  }

  .login-form input {
    width: 100%;
    padding: 0.75rem;
    margin-bottom: 1rem;
    border: 1px solid #ddd;
    border-radius: 4px;
    font-size: 1rem;
  }

  .login-form button {
    width: 100%;
    padding: 0.75rem;
    background-color: #1877f2;
    color: white;
    border: none;
    border-radius: 4px;
    font-size: 1rem;
    cursor: pointer;
    transition: background-color 0.3s;
  }

  .login-form button:hover {
    background-color: #166fe5;
  }

  .error-message {
    color: red;
    text-align: center;
    margin-bottom: 1rem;
  }
`;

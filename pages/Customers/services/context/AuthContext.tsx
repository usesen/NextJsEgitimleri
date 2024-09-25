import React, { createContext, useState, ReactNode,useContext } from 'react';

// Kullanıcı verisi için bir arayüz tanımlıyoruz
interface User {
  name: string;
  email: string; // email alanını ekliyoruz
  token: string;
}

// AuthContext için değer tipi tanımlıyoruz
interface AuthContextType {
  user: User | null;
  login: (userData: User) => void;
  logout: () => void;
}

// 1. Context oluşturuyoruz
export const AuthContext = createContext<AuthContextType | null>(null); // Başlangıç değeri null

// 2. AuthProvider bileşenini tanımlıyoruz
interface AuthProviderProps {
  children: ReactNode; // children prop'unun tipi
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null); // Kullanıcı durumu

const login = (userData: User) => {
  setUser(userData);
  localStorage.setItem('token', userData.token); // Token'ı localStorage'a kaydet
};

  const logout = () => {
    setUser(null);
    localStorage.removeItem('token');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// useAuth hook'unu tanımlıyoruz
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

 
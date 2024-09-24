import React, { createContext, useState, ReactNode } from 'react';

// Kullanıcı verisi için bir arayüz tanımlıyoruz
interface User {
  name: string;
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
    // userData'nın tipi User olarak tanımlandı
    setUser(userData);
    localStorage.setItem('token', userData.token);
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

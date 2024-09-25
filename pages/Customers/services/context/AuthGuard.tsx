import { useContext, useEffect, ReactNode } from 'react';
import { AuthContext } from '../context/AuthContext'; // AuthContext'inizi buradan içe aktarın// AuthGuard'iniz
import { useRouter } from 'next/router';


interface AuthGuardProps {
  children: ReactNode; // children prop'unun tipi
}

const AuthGuard: React.FC<AuthGuardProps> = ({ children }) => {
  const authContext = useContext(AuthContext); // AuthContext'i al
  const router = useRouter();

  // Null kontrolü
  const user = authContext ? authContext.user : null;

  useEffect(() => {
    if (!user && router.pathname !== '/auth/login') {
      router.push('/auth/Login');
    }
    // Add this line to explicitly return void
  }, [user, router]);

  return user ? <>{children}</> : null; // Kullanıcı doğrulandıysa çocuk bileşenleri göster
};

export default AuthGuard;

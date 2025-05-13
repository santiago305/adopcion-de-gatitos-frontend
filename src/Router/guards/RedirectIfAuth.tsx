import { Navigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { PropsUrl } from './typeGuards';

const RedirectIfAuth = ({ children }: PropsUrl) => {
  const { isAuthenticated } = useAuth();

  if (isAuthenticated) {
    return <Navigate to="/" replace />; 
  }

  return children; 
};

export default RedirectIfAuth;

import { Navigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { PropsUrl } from './typeGuards';

const PrivateRoute = ({ children }: PropsUrl) => {
  const { isAuthenticated, loading } = useAuth(); 

  if (loading) {
    return <div>Cargando...</div>;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return children; 
};

export default PrivateRoute;

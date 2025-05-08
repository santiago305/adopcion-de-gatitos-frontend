import { Navigate } from 'react-router-dom';
import { PropsUrl } from './typeGuards';
import { useAuth } from '@/hooks/useAuth';


const PrivateRoute = ({ children }: PropsUrl) => {
  const { isAuthenticated } = useAuth(); 

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />; 
  }

  return children;
};

export default PrivateRoute;

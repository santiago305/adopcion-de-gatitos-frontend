import { Navigate } from 'react-router-dom';
import { isAuthenticated } from '@/utils/authJsCookie';
import { PropsUrl } from './typeGuards';

const PrivateRoute = ({ children }: PropsUrl) => {
  const auth = isAuthenticated();
  console.log("PrivateRoute → isAuthenticated:", auth);

  if (!auth) {
    return <Navigate to="/login" replace />;
  }

  return children;
};


export default PrivateRoute;
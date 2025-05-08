import { Navigate } from 'react-router-dom';
import { isAuthenticated } from '@/common/utils/authJsCookie';
import { PropsUrl } from './typeGuards';

const RedirectIfAuth = ({ children }: PropsUrl) => {
  const auth = isAuthenticated();
  console.log("RedirectIfAuth → isAuthenticated:", auth);

  if (auth) {
    return <Navigate to="/dashboard" replace />;
  }

  return children;
};

export default RedirectIfAuth;

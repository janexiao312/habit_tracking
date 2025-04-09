import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../store';

const PrivateRoute = ({ children }: { children: React.ReactElement }) => {
  const { user } = useSelector((state: RootState) => state.auth);

  return user ? children : <Navigate to="/login" />;
};

export default PrivateRoute;

import {Outlet, Navigate, useLocation} from 'react-router-dom';
import {useSelector} from 'react-redux';

function AuthLayout() {
  const location = useLocation();
  const {token} = useSelector(state => state.auth);
  if (!token) {
    return <Outlet />;
  }

  return <Navigate to="/" state={{from: location}} replace={true} />;
}

export default AuthLayout;

import {createBrowserRouter, createRoutesFromElements, Route} from 'react-router-dom';
import Home from './pages';
import Root from './layouts/Root';
import ProtectedRoute from './layouts/protected-route';
import AmazonHome from './pages/amazon';
import AmazonListings from './pages/amazon/listings';
import Login from './pages/auth/login';
import AuthLayout from './layouts/auth-layout';
import packageJson from '../../package.json';

function redirectIfUser() {
  const store = JSON.parse(localStorage.getItem('persist:' + packageJson.appName));
  if (store && store.auth && store.auth.token) {
    return '/amazon';
  }
}

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Root />}>
      <Route element={<ProtectedRoute />} loader={redirectIfUser}>
        <Route index element={<Home />} />
        <Route path="amazon" element={<AmazonHome />}>
          <Route path="listings" element={<AmazonListings />} />
        </Route>
      </Route>

      <Route element={<AuthLayout />}>
        <Route path="login" element={<Login />} loader={redirectIfUser} />
      </Route>
      {/* <Route element={<div>404</div>} /> */}
    </Route>,
  ),
);

export default router;

import { createBrowserRouter, createRoutesFromElements, Route } from 'react-router-dom';
import RootLayout from './components/layouts/root-layout';
import AuthLayout from './components/layouts/auth-layout';
import NotFound from './pages/not-found';
import Login from './auth/login';
import Home from './pages';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<RootLayout />}>
      <Route path="/" element={<Home />} />
      <Route element={<AuthLayout />}>
        <Route path="login" element={<Login />} />
      </Route>

      {/* Error 404 */}
      <Route path="*" element={<NotFound />} />
    </Route>
  )
);

export default router;

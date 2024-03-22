import { createBrowserRouter, createRoutesFromElements, Route } from 'react-router-dom';
import RootLayout from './layouts/RootLayout';
import AuthLayout from './layouts/AuthLayout';
import Login from './auth/Login';
import Home from './pages/Home';
import NotFound from './pages/NotFound';

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

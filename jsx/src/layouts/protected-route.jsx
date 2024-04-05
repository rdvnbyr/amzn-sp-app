import {Outlet} from 'react-router-dom';

function ProtectedRoute() {
  return (
    <div>
      <h1>Protected Root</h1>
      <p>This is a protected root.</p>

      <Outlet />
    </div>
  );
}

export default ProtectedRoute;

import {Outlet} from 'react-router-dom';

function RootLayout() {
  return (
    <div>
      <header>
        <h1>App</h1>
      </header>

      <main>
        <Outlet />
      </main>

    </div>
  );
}

export default RootLayout;

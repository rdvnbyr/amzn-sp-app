import {Outlet} from 'react-router-dom';

function RootLayout() {
  return (
    <div>
      <header></header>

      <main className="container my-4">
        <Outlet />
      </main>

      <footer></footer>
    </div>
  );
}

export default RootLayout;

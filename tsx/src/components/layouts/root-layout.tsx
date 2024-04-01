import { Outlet } from 'react-router-dom';

function RootLayout() {
  return (
    <div>
      <header className="flex items-center justify-between p-4 bg-cyan-950 text-white">
        <h1>Root Layout</h1>
      </header>

      <main className="container mx-auto p-4">
        <Outlet />
      </main>
    </div>
  );
}

export default RootLayout;

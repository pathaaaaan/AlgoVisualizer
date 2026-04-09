import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import Sidebar from './Sidebar';

export default function Layout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-light-bg dark:bg-dark-bg">
      <Navbar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      <div className="flex">
        <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />

        {/* Main content */}
        <main className="flex-1 min-h-[calc(100vh-4rem)] overflow-x-hidden">
          <div className="max-w-6xl mx-auto px-4 md:px-8 py-8">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}

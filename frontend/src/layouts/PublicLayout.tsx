import React from 'react';
import { Link, Outlet } from 'react-router-dom';

const PublicLayout: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen">

      {/* Header */}
      <header className="bg-white shadow-md">
        <div className="container mx-auto flex justify-between items-center px-6 py-4">
          <Link to="/" className="text-2xl font-bold text-indigo-700">
            GLA University
          </Link>
          <nav className="space-x-6">
            <Link to="/" className="text-gray-700 hover:text-indigo-700">Home</Link>
            <Link to="/about" className="text-gray-700 hover:text-indigo-700">About Us</Link>
            <Link to="/privacy-policy" className="text-gray-700 hover:text-indigo-700">Privacy Policy</Link>
            <Link to="/help" className="text-gray-700 hover:text-indigo-700">Help</Link>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 container mx-auto px-6 py-10">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="bg-gray-100 text-center py-6 text-gray-600 text-sm">
        © {new Date().getFullYear()} GLA University. All rights reserved.
      </footer>

    </div>
  );
};

export default PublicLayout;

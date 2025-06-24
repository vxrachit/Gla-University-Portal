import React from 'react';
import { Link } from 'react-router-dom';
import { AlertTriangle } from 'lucide-react';

const NotFoundPage: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6 text-center animate-fade-in">
      <AlertTriangle className="h-16 w-16 text-red-500 mb-4" />
      <h1 className="text-4xl font-bold text-gray-800">404 - Page Not Found</h1>
      <p className="text-gray-600 mt-2">
        Oops! The page you’re looking for doesn’t exist or has been moved.
      </p>
      <p className="text-sm text-gray-500 mt-1">This is part of the GLA Portal.</p>
      <Link
        to=""
        className="mt-6 px-4 py-2 bg-primary-600 text-white rounded hover:bg-primary-700 transition"
      >
        Return to Home
      </Link>
    </div>
  );
};

export default NotFoundPage;

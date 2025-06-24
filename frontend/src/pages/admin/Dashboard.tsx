import React from 'react';
import {UserPlus, PlusCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';


const AdminDashboard: React.FC = () => {
  const { user } = useAuth();

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
          <p className="mt-1 text-sm text-gray-500">
            Welcome back, {user?.name}
          </p>
        </div>
        <div className="mt-4 sm:mt-0 flex flex-col sm:flex-row gap-3">
          <Link to="/admin/create-faculty" className="btn btn-primary">
            <UserPlus className="mr-2 h-4 w-4" />
            Create Account
          </Link>
          <Link to="/admin/courses" className="btn btn-secondary">
            <PlusCircle className="mr-2 h-4 w-4" />
            Add Course
          </Link>
        </div>
      </div>

      {/* Rest of Dashboard grid and sections */}
    </div>
  );
};

export default AdminDashboard;

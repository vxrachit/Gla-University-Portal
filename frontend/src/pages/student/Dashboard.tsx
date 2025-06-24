import React from 'react';
import { Book, FileText, MessageSquare, FileBadge } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const StudentDashboard: React.FC = () => {
  const { user } = useAuth();

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Student Dashboard</h1>
          <p className="mt-1 text-sm text-gray-500">
            Welcome back, {user?.name}
          </p>
          {user?.department && (
            <p className="text-sm text-gray-500">
              Department: <span className="font-medium">{user.department}</span>
            </p>
          )}
        </div>
        <div className="mt-4 sm:mt-0">
          <span className="inline-flex rounded-md shadow-sm">
            <Link to="/student/courses" className="btn btn-primary">
              <Book className="mr-2 h-4 w-4" />
              Browse Courses
            </Link>
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <Link to="/student/courses" className="dashboard-card">
          <div className="flex items-center">
            <Book className="h-8 w-8 text-primary-600" />
            <div className="ml-4">
              <h3 className="text-lg font-medium text-gray-900">Courses</h3>
              <p className="text-sm text-gray-500">Browse your courses</p>
            </div>
          </div>
        </Link>

        <Link to="/student/complaints" className="dashboard-card">
          <div className="flex items-center">
            <MessageSquare className="h-8 w-8 text-accent-500" />
            <div className="ml-4">
              <h3 className="text-lg font-medium text-gray-900">Complaints</h3>
              <p className="text-sm text-gray-500">File or view complaints</p>
            </div>
          </div>
        </Link>

        <Link to="/student/idcard" className="dashboard-card">
          <div className="flex items-center">
            <FileBadge className="h-8 w-8 text-secondary-600" />
            <div className="ml-4">
              <h3 className="text-lg font-medium text-gray-900">ID Card</h3>
              <p className="text-sm text-gray-500">View and request</p>
            </div>
          </div>
        </Link>

        <Link to="/student/requests" className="dashboard-card">
          <div className="flex items-center">
            <FileText className="h-8 w-8 text-warning-500" />
            <div className="ml-4">
              <h3 className="text-lg font-medium text-gray-900">Requests</h3>
              <p className="text-sm text-gray-500">Track your requests</p>
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default StudentDashboard;

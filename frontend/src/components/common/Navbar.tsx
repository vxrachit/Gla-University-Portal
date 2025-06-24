import React, { useEffect, useState } from 'react';
import { Bell, LogOut, Menu, User, X, Check, RefreshCw } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import axios from 'axios';

interface LeaveNotification {
  id: number;
  faculty_id: number;
  faculty_name?: string;
  reason: string;
  start_date: string;
  end_date: string;
  status: 'pending' | 'approved' | 'rejected';
  created_at?: string;
}

interface NavbarProps {
  toggleSidebar: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ toggleSidebar }) => {
  const { user, logout } = useAuth();
  const [notifications, setNotifications] = useState<LeaveNotification[]>([]);
  const [showNotifications, setShowNotifications] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [markingRead, setMarkingRead] = useState<number | null>(null);

  const BASE_URL = import.meta.env.VITE_API_BASE_URL;



  const fetchNotifications = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await axios.get(`${BASE_URL}/admin/admin/unread-leaves`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
          'Accept': 'application/json'
        },
        validateStatus: (status) => status < 500
      });

      if (!response.data || typeof response.data !== 'object') {
        throw new Error('Invalid response format');
      }

      if (Array.isArray(response.data)) {
        setNotifications(response.data);
      } else {
        setNotifications([]);
      }
    } catch (error) {
      console.error('Notification fetch error:', error);
      if (axios.isAxiosError(error)) {
        if (error.response?.status === 401) {
          setError('Session expired. Please login again.');
          logout();
        } else {
          setError(error.response?.data?.message || error.message || 'Failed to fetch notifications');
        }
      } else {
        setError('An unexpected error occurred');
      }
    } finally {
      setLoading(false);
    }
  };

  const markAsRead = async (leaveId: number) => {
    try {
      setMarkingRead(leaveId);
      await axios.put(
        `${BASE_URL}/leave/admin/mark-leave-read/${leaveId}`,
        {},
        { headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
      });
      setNotifications(prev => prev.filter(n => n.id !== leaveId));
    } catch (error) {
      console.error('Mark as read error:', error);
      setError('Failed to mark notification as read');
    } finally {
      setMarkingRead(null);
    }
  };

  const markAllAsRead = async () => {
    try {
      setLoading(true);
      await Promise.all(
        notifications.map(notification =>
          axios.put(
            `${BASE_URL}/leave/admin/mark-leave-read/${notification.id}`,
            {},
            { headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` } }
          )
        )
      );
      setNotifications([]);
    } catch (error) {
      console.error('Mark all as read error:', error);
      setError('Failed to mark all notifications as read');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (showNotifications && user?.role === 'admin') {
      fetchNotifications();
    }
  }, [showNotifications, user?.role]);

  useEffect(() => {
    const interval = setInterval(fetchNotifications, 30000);
    return () => clearInterval(interval);
  }, []);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'approved':
        return <Check className="w-4 h-4 text-green-500" />;
      case 'rejected':
        return <X className="w-4 h-4 text-red-500" />;
      default:
        return <RefreshCw className="w-4 h-4 text-yellow-500 animate-spin" />;
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const NotificationDropdown = () => (
    <div 
      className="absolute right-0 top-12 w-80 bg-white rounded-md shadow-lg z-50 border border-gray-200 max-h-[calc(100vh-4rem)] overflow-hidden"
      onClick={(e) => e.stopPropagation()}
    >
      <div className="flex flex-col h-full">
        <div className="px-4 py-3 border-b border-gray-200 flex justify-between items-center bg-gray-50">
          <h3 className="font-medium text-gray-900">Leave Requests</h3>
          <div className="flex items-center gap-2">
            {notifications.length > 0 && (
              <button
                onClick={markAllAsRead}
                className="text-xs text-blue-600 hover:text-blue-800"
                disabled={loading}
              >
                Mark All Read
              </button>
            )}
            <button 
              onClick={fetchNotifications}
              className="text-gray-500 hover:text-gray-700"
              disabled={loading}
            >
              <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
            </button>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto">
          {loading && notifications.length === 0 ? (
            <div className="px-4 py-6 text-center text-sm text-gray-500">
              Loading notifications...
            </div>
          ) : error ? (
            <div className="px-4 py-6 text-center">
              <p className="text-sm text-red-500">{error}</p>
              <button
                onClick={fetchNotifications}
                className="mt-2 px-3 py-1 text-xs bg-blue-50 text-blue-600 rounded hover:bg-blue-100"
              >
                Retry
              </button>
            </div>
          ) : notifications.length === 0 ? (
            <div className="px-4 py-6 text-center text-sm text-gray-500">
              No new leave requests
            </div>
          ) : (
            <ul className="divide-y divide-gray-200">
              {notifications.map(notification => (
                <li key={notification.id} className="hover:bg-gray-50">
                  <div className="px-4 py-3">
                    <div className="flex justify-between gap-2">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          {getStatusIcon(notification.status)}
                          <p className="text-sm font-medium truncate">
                            {notification.faculty_name || `Faculty ${notification.faculty_id}`}
                          </p>
                        </div>
                        <p className="text-sm text-gray-600 truncate">
                          {notification.reason}
                        </p>
                        <div className="flex items-center gap-2 mt-1 text-xs text-gray-500">
                          <span>{formatDate(notification.start_date)}</span>
                          <span>to</span>
                          <span>{formatDate(notification.end_date)}</span>
                        </div>
                      </div>
                      <button
                        onClick={() => markAsRead(notification.id)}
                        disabled={markingRead === notification.id}
                        className="text-xs text-blue-600 hover:text-blue-800 whitespace-nowrap ml-2"
                      >
                        {markingRead === notification.id ? '...' : 'Mark Read'}
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );

  return (
    <header className="bg-white border-b border-gray-200 fixed w-full z-10">
      <div className="flex items-center justify-between h-16 px-4">
        <div className="flex items-center">
          <button
            onClick={toggleSidebar}
            className="p-2 rounded-md text-gray-500 hover:text-gray-900 hover:bg-gray-100 lg:hidden"
            aria-label="Toggle sidebar"
          >
            <Menu size={20} />
          </button>
          <div className="flex items-center ml-2 lg:ml-0">
            <span className="text-primary-600 font-bold text-xl">GLA</span>
            <span className="text-gray-600 font-medium ml-2">Portal</span>
          </div>
        </div>

        <div className="flex items-center gap-4">
          {user?.role === 'admin' && (
            <div className="relative">
              <button
                className="p-2 rounded-full text-gray-500 hover:text-gray-900 hover:bg-gray-100 relative"
                onClick={() => setShowNotifications(!showNotifications)}
                aria-label="Notifications"
              >
                <Bell size={18} />
                {notifications.length > 0 && (
                  <span className="absolute top-0 right-0 transform translate-x-1/2 -translate-y-1/2 bg-red-500 rounded-full w-4 h-4 flex items-center justify-center text-white text-xs">
                    {notifications.length}
                  </span>
                )}
              </button>
              {showNotifications && <NotificationDropdown />}
            </div>
          )}

          <div className="relative group">
            <button 
              className="flex items-center p-1 rounded-full text-gray-700 hover:text-gray-900 hover:bg-gray-100"
              aria-label="User menu"
            >
              <div className="w-8 h-8 rounded-full bg-primary-100 text-primary-700 flex items-center justify-center font-medium">
                {user?.name?.charAt(0).toUpperCase() || 'U'}
              </div>
              <span className="hidden md:block ml-2 font-medium text-sm">
                {user?.name || 'User'}
              </span>
            </button>

            <div className="absolute right-0 w-48 mt-2 origin-top-right bg-white rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
              <div className="py-1">
                <div className="px-4 py-2 text-xs text-gray-500">
                  Logged in as <span className="font-medium capitalize">{user?.role}</span>
                </div>
                <a 
                  href="#profile" 
                  className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  <User size={16} className="mr-2" />
                  Your Profile
                </a>
                <button
                  onClick={logout}
                  className="flex w-full items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  <LogOut size={16} className="mr-2" />
                  Sign out
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;

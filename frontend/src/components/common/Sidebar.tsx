import React, { useEffect } from 'react';
import {
  Book,
  BookOpen,
  CalendarClock,
  FileText,
  HelpCircle,
  Home,
  UserCog,
  Users,
  FileBadge,
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { Link, useLocation } from 'react-router-dom';
import { UserRole } from '../../types';

interface SidebarProps {
  isOpen: boolean;
}

interface NavItem {
  name: string;
  path: string;
  icon: React.ReactNode;
  roles: UserRole[];
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen }) => {
  const { user, isLoading } = useAuth();
  const location = useLocation();

  const role = user?.role ?? null;

  useEffect(() => {
    console.log('USER:', user);
    console.log('ROLE:', role);
  }, [user]);

  const navItems: NavItem[] = [
    {
      name: 'Dashboard',
      path: '/student',
      icon: <Home size={20} className="sidebar-icon" />,
      roles: ['student'],
    },
    {
      name: 'Dashboard',
      path: '/faculty',
      icon: <Home size={20} className="sidebar-icon" />,
      roles: ['faculty'],
    },
    {
      name: 'Dashboard',
      path: '/admin',
      icon: <Home size={20} className="sidebar-icon" />,
      roles: ['admin'],
    },
    {
      name: 'Courses',
      path: '/student/courses',
      icon: <Book size={20} className="sidebar-icon" />,
      roles: ['student'],
    },
    {
      name: 'ID Card',
      path: '/student/idcard',
      icon: <FileBadge size={20} className="sidebar-icon" />,
      roles: ['student'],
    },
    {
      name: 'My Requests',
      path: '/student/requests',
      icon: <FileText size={20} className="sidebar-icon" />,
      roles: ['student'],
    },
    {
      name: 'My Students',
      path: '/faculty/studentsdetails',
      icon: <Users size={20} className="sidebar-icon" />,
      roles: ['faculty'],
    },
    {
      name: 'Leave Requests',
      path: '/faculty/leave',
      icon: <CalendarClock size={20} className="sidebar-icon" />,
      roles: ['faculty'],
    },
    {
      name: 'Attendance',
      path: '/faculty/attendance',
      icon: <FileText size={20} className="sidebar-icon" />,
      roles: ['faculty'],
    },
    {
      name: 'Faculties Management',
      path: '/admin/faculties',
      icon: <UserCog size={20} className="sidebar-icon" />,
      roles: ['admin'],
    },
    {
      name: 'ID Card Approvals',
      path: '/admin/idcards',
      icon: <FileBadge size={20} className="sidebar-icon" />,
      roles: ['admin'],
    },
    {
      name: 'Course Management',
      path: '/admin/courses',
      icon: <BookOpen size={20} className="sidebar-icon" />,
      roles: ['admin'],
    },
    {
      name: 'Leave Requests',
      path: '/admin/leaves',
      icon: <BookOpen size={20} className="sidebar-icon" />,
      roles: ['admin'],
    },
    {
      name: 'Help & Support',
      path: '/help',
      icon: <HelpCircle size={20} className="sidebar-icon" />,
      roles: ['student', 'faculty', 'admin'],
    },
  ];

  const filteredNavItems =
    role !== null
      ? navItems.filter((item) => item.roles.includes(role as UserRole))
      : [];

  return (
    <aside
      className={`fixed top-16 left-0 z-20 h-[calc(100vh-4rem)] bg-white border-r border-gray-200 transition-all duration-300 ${
        isOpen ? 'w-64' : 'w-0 lg:w-64'
      } overflow-hidden`}
    >
      <div className="h-full flex flex-col justify-between py-4">
        <nav className="space-y-1 px-2">
          {filteredNavItems.length === 0 && (
            <p className="text-center text-gray-500 text-sm">No navigation available</p>
          )}
          {filteredNavItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`sidebar-link ${
                location.pathname.startsWith(item.path) ? 'active' : ''
              }`}
            >
              {item.icon}
              <span>{item.name}</span>
            </Link>
          ))}
        </nav>

        <div className="px-4 py-2 mt-6">
          <div className="rounded-lg bg-primary-50 p-4">
            <h4 className="text-primary-700 font-medium text-sm mb-2">
              Need help?
            </h4>
            <p className="text-primary-600 text-xs">
              Contact our support team for assistance with any issues.
            </p>
            <button className="mt-3 w-full btn btn-primary text-xs py-1.5">
              Contact Support
            </button>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;

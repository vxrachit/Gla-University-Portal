import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import MainLayout from './layouts/MainLayout';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import LoginSelectorPage from './pages/LoginSelector';
import NotFoundPage from './pages/NotFoundPage';
import UnderDevelopmentPage from './pages/UnderDevelopmentPage';
import HelpSupportPage from './pages/HelpSupportPage';
import AboutUsPage from './pages/AboutUsPage';
import PrivacyPolicyPage from './pages/PrivacyPolicyPage';
import StudentDashboard from './pages/student/Dashboard';
import StudentIDCard from './pages/student/StudentIDCard';
import FacultyDashboard from './pages/faculty/Dashboard';
import StudentsDetails from './pages/faculty/StudentsDetails';
import FacultyLeaveRequest from './pages/faculty/FacultyLeaveRequest';
import AdminDashboard from './pages/admin/Dashboard';
import FacultiesPage from './pages/admin/FacultiesPage';
import AdminLeaves from './pages/admin/AdminLeave';
import CreateFaculty from './pages/admin/CreateFaculty';
import GLADocumentation from './pages/GlaDocumentation';


const ProtectedRoute: React.FC<{
  element: React.ReactNode;
  allowedRoles?: string[];
}> = ({ element, allowedRoles }) => {
  const { isAuthenticated, user, isLoading } = useAuth();

  if (isLoading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  if (allowedRoles && user && !allowedRoles.includes(user.role)) {
    return <Navigate to={`/${user.role}`} replace />;
  }

  return <>{element}</>;
};

const ProtectedFallbackRoute: React.FC = () => {
  const { isAuthenticated } = useAuth();

  return isAuthenticated ? <UnderDevelopmentPage /> : <NotFoundPage />;
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
       
          <Route path="/" element={<MainLayout />}>
            {/* Public Routes */}
            <Route index element={<Home />} />
            <Route path="register" element={<Register />} />
            <Route path="login" element={<LoginSelectorPage />} />
            <Route path="login/admin" element={<Login role="admin" />} />
            <Route path="login/faculty" element={<Login role="faculty" />} />
            <Route path="login/student" element={<Login role="student" />} />
            <Route path="help" element={<HelpSupportPage />} />
            <Route path="privacy-policy" element={<PrivacyPolicyPage />} />
            <Route path="about-us" element={<AboutUsPage />} />
            <Route path='docs' element={<GLADocumentation />}/>

            {/* Student Routes */}
            <Route
              path="student"
              element={<ProtectedRoute element={<StudentDashboard />} allowedRoles={['student']} />}
            />
            <Route
              path="student/idcard"
              element={<ProtectedRoute element={<StudentIDCard />} allowedRoles={['student']} />}
            />
            <Route
              path="student/*"
              element={<ProtectedRoute element={<UnderDevelopmentPage />} allowedRoles={['student']} />}
            />

            {/* Faculty Routes */}
            <Route
              path="faculty"
              element={<ProtectedRoute element={<FacultyDashboard />} allowedRoles={['faculty']} />}
            />
            <Route
              path="faculty/studentsdetails"
              element={<ProtectedRoute element={<StudentsDetails />} allowedRoles={['faculty']} />}
            />
            <Route
              path="faculty/leave"
              element={<ProtectedRoute element={<FacultyLeaveRequest />} allowedRoles={['faculty']} />}
            />
            <Route
              path="faculty/*"
              element={<ProtectedRoute element={<UnderDevelopmentPage />} allowedRoles={['faculty']} />}
            />

            {/* Admin Routes */}
            <Route
              path="admin"
              element={<ProtectedRoute element={<AdminDashboard />} allowedRoles={['admin']} />}
            />
            <Route
              path="admin/faculties"
              element={<ProtectedRoute element={<FacultiesPage />} allowedRoles={['admin']} />}
            />
            <Route
              path="admin/leaves"
              element={<ProtectedRoute element={<AdminLeaves />} allowedRoles={['admin']} />}
            />
            <Route
              path="admin/create-faculty"
              element={<ProtectedRoute element={<CreateFaculty />} allowedRoles={['admin']} />}
            />
            <Route
              path="admin/*"
              element={<ProtectedRoute element={<UnderDevelopmentPage />} allowedRoles={['admin']} />}
            />

            {/* Fallback for nested wrong paths */}
            <Route path="*" element={<ProtectedFallbackRoute />} />
          </Route>

          {/* Global Fallback for top-level wrong paths */}
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;

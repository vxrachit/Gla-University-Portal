import React from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, FileBadge, MessageSquare, User } from 'lucide-react';

const Home: React.FC = () => {
  return (
    <div className="bg-white min-h-screen">
      {/* Header */}
      <header className="bg-primary-600 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div className="flex items-center">
            <span className="text-white font-bold text-2xl">GLA</span>
            <span className="text-primary-100 font-medium ml-2">University Portal</span>
          </div>
          <div className="flex gap-4">
            <Link
              to="/login"
              className="text-primary-100 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
            >
              Login
            </Link>
            <Link
              to="/register"
              className="bg-white text-primary-600 hover:bg-primary-50 px-3 py-2 rounded-md text-sm font-medium"
            >
              Register
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-12 bg-primary-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:grid lg:grid-cols-2 lg:gap-8 items-center">
            <div className="mb-8 lg:mb-0">
              <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl">
                GLA University Portal
              </h1>
              <p className="mt-6 text-xl text-primary-100 max-w-3xl">
                A centralized platform for students, faculty, and administrators to manage university services and resources.
              </p>
              <div className="mt-8 flex space-x-4">
                <Link
                  to="/login"
                  className="btn btn-accent px-6"
                >
                  Get Started
                </Link>
                <Link
                  to="/register"
                  className="btn btn-outline border-white text-white hover:bg-white hover:text-primary-600 px-6"
                >
                  Learn More
                </Link>
              </div>
            </div>
            <div className="relative">
              <div className="aspect-w-16 aspect-h-9 rounded-lg shadow-xl overflow-hidden bg-primary-700">
                <img
                  src="https://images.pexels.com/photos/267885/pexels-photo-267885.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                  alt="University campus"
                  className="object-cover h-full w-full opacity-70"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-gray-900">
              Everything you need in one place
            </h2>
            <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
              Access all university services and manage your academic journey through a single, intuitive platform.
            </p>
          </div>

          <div className="mt-16">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-100 hover:shadow-md transition-shadow">
                <div className="w-12 h-12 rounded-md bg-primary-100 text-primary-600 flex items-center justify-center mb-4">
                  <BookOpen className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-medium text-gray-900">Course Management</h3>
                <p className="mt-2 text-gray-600">
                  Browse, enroll, and manage your courses with ease. Access course materials and track your progress.
                </p>
              </div>

              <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-100 hover:shadow-md transition-shadow">
                <div className="w-12 h-12 rounded-md bg-secondary-100 text-secondary-600 flex items-center justify-center mb-4">
                  <FileBadge className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-medium text-gray-900">ID Card Services</h3>
                <p className="mt-2 text-gray-600">
                  Request new ID cards, report lost or damaged ones, and track your application status.
                </p>
              </div>

              <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-100 hover:shadow-md transition-shadow">
                <div className="w-12 h-12 rounded-md bg-accent-100 text-accent-600 flex items-center justify-center mb-4">
                  <MessageSquare className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-medium text-gray-900">Complaint System</h3>
                <p className="mt-2 text-gray-600">
                  Submit service or IT complaints, monitor their status, and receive updates on resolution.
                </p>
              </div>

              <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-100 hover:shadow-md transition-shadow">
                <div className="w-12 h-12 rounded-md bg-warning-100 text-warning-600 flex items-center justify-center mb-4">
                  <User className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-medium text-gray-900">Role-Based Access</h3>
                <p className="mt-2 text-gray-600">
                  Different dashboards for students, faculty, and administrators with role-specific features.
                </p>
              </div>

              <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-100 hover:shadow-md transition-shadow">
                <div className="w-12 h-12 rounded-md bg-error-100 text-error-600 flex items-center justify-center mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                  </svg>
                </div>
                <h3 className="text-xl font-medium text-gray-900">Request Tracking</h3>
                <p className="mt-2 text-gray-600">
                  Track all your requests and applications in one place with real-time status updates.
                </p>
              </div>

              <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-100 hover:shadow-md transition-shadow">
                <div className="w-12 h-12 rounded-md bg-success-100 text-success-600 flex items-center justify-center mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                  </svg>
                </div>
                <h3 className="text-xl font-medium text-gray-900">Administrative Tools</h3>
                <p className="mt-2 text-gray-600">
                  Powerful tools for administrators to manage users, approve requests, and oversee university operations.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-primary-700 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-white">
              Ready to get started?
            </h2>
            <p className="mt-4 text-xl text-primary-100">
              Join thousands of students and faculty members already using the GLA University Portal.
            </p>
            <div className="mt-8 flex justify-center">
              <Link
                to="/register"
                className="btn btn-accent px-8 py-3"
              >
                Create an Account
              </Link>
              <Link
                to="/login"
                className="ml-4 btn btn-outline border-white text-white hover:bg-white hover:text-primary-700 px-8 py-3"
              >
                Sign In
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-gray-300">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-white text-lg font-medium mb-4">GLA University Portal</h3>
              <p className="text-gray-400 text-sm">
                A centralized platform for managing university services and resources.
              </p>
            </div>
            <div>
              <h3 className="text-white text-lg font-medium mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li><a href="about-us" className="text-gray-400 hover:text-white text-sm">About Us</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white text-sm">Contact</a></li>
                <li><a href="help" className="text-gray-400 hover:text-white text-sm">Help & Support</a></li>
                <li><a href="/privacy-policy" className="text-gray-400 hover:text-white text-sm">Privacy Policy</a></li>
                <li><a href="/docs" className="text-gray-400 hover:text-white text-sm">Documentation</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-white text-lg font-medium mb-4">Contact Us</h3>
              <address className="text-gray-400 text-sm not-italic">
                GLA University<br />
                17km Stone, NH-2, Mathura-Delhi Highway<br />
                P.O. Chaumuhan, Mathura-281406<br />
                (U.P.) INDIA
              </address>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-gray-700">
            <p className="text-gray-400 text-sm text-center">
              &copy; {new Date().getFullYear()} Rachit Verma. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;
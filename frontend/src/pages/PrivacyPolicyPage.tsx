import React from 'react';
import { Link } from 'react-router-dom';

const PrivacyPolicyPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 px-6 py-12 flex flex-col items-center">
      <div className="max-w-4xl w-full">
        <h1 className="text-4xl font-bold mb-6 text-center text-gray-800">Privacy Policy</h1>
        
        <p className="text-gray-700 mb-4">
          This Privacy Policy describes how we collect, use, and protect your information when you visit our website.
          By using our services, you agree to the terms outlined in this policy.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-4 text-gray-800">1. Information We Collect</h2>
        <p className="text-gray-700 mb-4">
          We may collect personal information including your name, email address, and other contact details 
          when you register, log in, or contact us through our platform.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-4 text-gray-800">2. How We Use Your Information</h2>
        <p className="text-gray-700 mb-4">
          We use your information to provide, operate, and improve our services, communicate with you, 
          and ensure security across our platform.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-4 text-gray-800">3. Information Sharing</h2>
        <p className="text-gray-700 mb-4">
          We do not sell, trade, or rent your personal information to others. 
          We may share information with trusted partners who assist in operating our website, 
          conducting our business, or serving our users, so long as those parties agree to keep this information confidential.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-4 text-gray-800">4. Data Security</h2>
        <p className="text-gray-700 mb-4">
          We implement a variety of security measures to maintain the safety of your personal information. 
          However, no method of transmission over the internet or electronic storage is 100% secure.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-4 text-gray-800">5. Changes to This Policy</h2>
        <p className="text-gray-700 mb-4">
          We reserve the right to modify this Privacy Policy at any time. 
          Changes will be effective immediately upon posting on the website. 
          We encourage you to review this page periodically.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-4 text-gray-800">6. Contact Us</h2>
        <p className="text-gray-700 mb-8">
          If you have any questions about this Privacy Policy, you can contact us at:<br />
          <span className="font-medium">Owner:</span> Rachit Verma<br />
          <span className="font-medium">Email:</span> mail@rachit.linkpc.net
        </p>

        <div className="flex justify-center">
          <Link 
            to="/"
            className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-full transition"
          >
            Back to Home
          </Link>
        </div>
      </div>
      <footer className="bg-gray-100 text-center py-6 text-gray-600 text-sm">
        © {new Date().getFullYear()} GLA University. All rights reserved.
      </footer>
    </div>
  );
};

export default PrivacyPolicyPage;

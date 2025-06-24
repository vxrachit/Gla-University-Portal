import React from 'react';
import { Mail, MessageCircle, Info } from 'lucide-react';
import { Link} from 'react-router-dom';

const HelpSupportPage: React.FC = () => {
  return (
    <div className="p-6 max-w-4xl mx-auto space-y-10 animate-fade-in">
      <header className="bg-white shadow-md">
            <div className="container mx-auto flex justify-between items-center px-6 py-4">
              <Link to="/" className="text-2xl font-bold text-indigo-700">
                GLA University
              </Link> </div></header>
             
      
      <h1 className="text-3xl font-bold text-gray-800">Help & Support</h1>

      {/* Contact Info */}
      <section className="bg-gray-100 p-6 rounded-lg shadow-sm">
        <div className="flex items-center gap-3 mb-2">
          <Mail className="text-primary-600" />
          <h2 className="text-xl font-semibold text-gray-800">Need Assistance?</h2>
        </div>
        <p className="text-gray-700">
          For any help, queries, or issues, feel free to reach out to our support team at:
        </p>
        <p className="text-primary-700 font-medium mt-2">
          📧 <a href="mailto:main@rachit.linkpc.net" className="underline">main@rachit.linkpc.net</a>
        </p>
        <p className="text-sm text-gray-500 mt-1">Our team usually responds within 24–48 hours.</p>
      </section>

      {/* FAQ */}
      <section>
        <div className="flex items-center gap-3 mb-3">
          <Info className="text-secondary-600" />
          <h2 className="text-xl font-semibold text-gray-800">Frequently Asked Questions</h2>
        </div>
        <div className="space-y-4">
          <div className="bg-white border p-4 rounded-md shadow-sm">
            <h3 className="font-medium text-gray-900">How do I access my account?</h3>
            <p className="text-sm text-gray-700 mt-1">Use your registered email and password on the login page specific to your role (Admin, Faculty, or Student).</p>
          </div>
          <div className="bg-white border p-4 rounded-md shadow-sm">
            <h3 className="font-medium text-gray-900">What if I forgot my password?</h3>
            <p className="text-sm text-gray-700 mt-1">Contact us via email at <a href="mailto:main@rachit.linkpc.net" className="text-primary-700 underline">main@rachit.linkpc.net</a> to request a password reset.</p>
          </div>
          <div className="bg-white border p-4 rounded-md shadow-sm">
            <h3 className="font-medium text-gray-900">I found a bug. What should I do?</h3>
            <p className="text-sm text-gray-700 mt-1">Please send a detailed description of the issue, including steps to reproduce it, to our support email.</p>
          </div>
          <div className="bg-white border p-4 rounded-md shadow-sm">
            <h3 className="font-medium text-gray-900">Who can I contact for technical support?</h3>
            <p className="text-sm text-gray-700 mt-1">Our technical team can be reached at <a href="mailto:main@rachit.linkpc.net" className="text-primary-700 underline">main@rachit.linkpc.net</a> for all tech-related assistance.</p>
          </div>
        </div>
      </section>
      <footer className="bg-gray-100 text-center py-6 text-gray-600 text-sm">
        © {new Date().getFullYear()} GLA University. All rights reserved.
      </footer>
    </div>
  );
};

export default HelpSupportPage;

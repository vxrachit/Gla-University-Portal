import React from 'react';
import { Link } from 'react-router-dom';

const AboutUsPage: React.FC = () => {
  return (
    <div>
    <div className="min-h-screen bg-gradient-to-b from-white to-blue-50 flex flex-col items-center px-6 py-12">
        

      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-800">
          About <span className="text-indigo-600">Us</span>
        </h1>
        <p className="text-gray-600 mt-4 max-w-2xl mx-auto text-lg">
          Empowering education through innovation and technology.
        </p>
      </div>

      {/* Main Content */}
      <div className="bg-white shadow-xl rounded-2xl p-10 w-full max-w-4xl space-y-10">

        {/* About Company */}
        <section className="space-y-3">
          <h2 className="text-2xl font-semibold text-gray-800">Who We Are</h2>
          <p className="text-gray-600 leading-relaxed">
            Founded by <span className="font-semibold text-indigo-600">Rachit Verma</span>, we are a technology-driven organization committed
            to modernizing education systems. We believe in simple, scalable solutions that make learning management smarter and smoother.
          </p>
        </section>

        {/* Vision and Mission */}
        <section className="space-y-3">
          <h2 className="text-2xl font-semibold text-gray-800">Our Vision & Mission</h2>
          <p className="text-gray-600 leading-relaxed">
            Our vision is to create educational platforms that are accessible, intuitive, and future-ready. 
            Through continuous innovation, we aim to empower students, faculties, and administrators alike.
          </p>
        </section>

        {/* Founder Quote */}
        <section className="space-y-3">
          <h2 className="text-2xl font-semibold text-gray-800">A Message from Our Founder</h2>
          <p className="text-gray-600 italic">
            "At the heart of every innovation is a desire to solve real problems. 
            Our mission is to equip educational institutions with the tools they need to succeed in a digital world."
          </p>
          <p className="text-indigo-700 font-semibold">— Rachit Verma</p>
        </section>

      </div>

      {/* Back Button */}
      <div className="mt-10">
        <Link 
          to="/" 
          className="inline-block bg-indigo-600 hover:bg-indigo-700 text-white py-3 px-8 rounded-full text-lg shadow-lg transition"
        >
          Back to Home
        </Link>
      </div>
      <footer className="bg-gray-100 text-center py-6 text-gray-600 text-sm">
        © {new Date().getFullYear()} GLA University. All rights reserved.
      </footer>
    </div>
    </div>
  );
};

export default AboutUsPage;

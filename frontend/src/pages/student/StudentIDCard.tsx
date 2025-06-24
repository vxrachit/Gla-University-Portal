import React from 'react';
import { useAuth } from '../../context/AuthContext';

const StudentIDCard: React.FC = () => {
  const { user } = useAuth();

  return (
    <div className="max-w-sm mx-auto mt-12 rounded-3xl overflow-hidden shadow-2xl border border-gray-200 bg-white">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-900 to-blue-700 text-white px-6 py-4 flex justify-between items-center">
        <div>
          <h1 className="text-xl font-bold leading-tight">GLA University</h1>
          <p className="text-[11px] tracking-widest">Mathura,</p>
          <p className="text-[11px] tracking-widest">Uttar Pradesh</p>
        </div>
        <img
          src="https://upload.wikimedia.org/wikipedia/en/4/42/GLA_University_logo.png"
          alt="GLA Logo"
          className="w-12 h-12 object-contain drop-shadow-md"
        />
      </div>

      {/* Body */}
      <div className="px-6 py-6 text-center relative">
        <div className="absolute left-1/2 transform -translate-x-1/2 -top-12 w-24 h-24 rounded-full border-[5px] border-white shadow-md overflow-hidden bg-gray-100">
          <img
            src={user?.photo || '/avatar-placeholder.png'}
            alt="Student"
            className="w-full h-full object-cover"
          />
        </div>

        <div className="mt-16">
          <h2 className="text-lg font-semibold text-gray-800">{user?.name}</h2>
          <p className="text-sm text-gray-500">{user?.email}</p>
        </div>

        <div className="mt-4 text-left text-sm text-gray-700 space-y-1 px-2">
          <div className="flex justify-between">
            <span className="font-medium text-gray-600">ID:</span>
            <span>{user?.id}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-medium text-gray-600">Department:</span>
            <span>{user?.department}</span>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="bg-gray-50 border-t border-gray-200 px-4 py-3 text-[11px] text-gray-500 text-center italic">
        This card is property of GLA University.<br />
        If found, kindly return it to the admin office. <br/>
        mail@rachit.linkpc.net
      </div>
    </div>
  );
};

export default StudentIDCard;

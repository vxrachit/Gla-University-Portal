import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { User, Mail, Lock, AlertCircle, Image } from 'lucide-react';

const Register: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [department, setDepartment] = useState('Computer Science');
  const [photo, setPhoto] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();
  const { register } = useAuth();

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setPhoto(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    setIsLoading(true);
    try {
      await register(name, email, password, department, photo);
      navigate('/student');
    } catch {
      setError('Registration failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 px-4 py-12">
      <div className="w-full max-w-md bg-gray-800/70 backdrop-blur-md text-white rounded-xl shadow-lg p-8 space-y-6">
        <div className="text-center">
          <h1 className="text-4xl font-extrabold text-indigo-400">GLA</h1>
          <p className="text-sm text-gray-400">University Portal</p>
          <h2 className="mt-4 text-2xl font-bold">Create a new account</h2>
          <p className="text-sm text-gray-400">
            Or{' '}
            <Link to="/login" className="text-indigo-400 hover:underline">
              sign in to your existing account
            </Link>
          </p>
        </div>

        {error && (
          <div className="bg-red-600/20 border border-red-500 rounded p-3 text-sm text-red-300 flex items-center gap-2">
            <AlertCircle className="h-5 w-5" />
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm mb-1">Full Name</label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input type="text" required value={name} onChange={(e) => setName(e.target.value)}
                className="w-full bg-gray-700 text-white border border-gray-600 rounded-md pl-10 py-2 focus:ring-2 focus:ring-indigo-500" placeholder="John Doe" />
            </div>
          </div>

          <div>
            <label className="block text-sm mb-1">Email address</label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-gray-700 text-white border border-gray-600 rounded-md pl-10 py-2 focus:ring-2 focus:ring-indigo-500" placeholder="you@example.com" />
            </div>
          </div>

          <div>
            <label className="block text-sm mb-1">Department</label>
            <select value={department} onChange={(e) => setDepartment(e.target.value)}
              className="w-full bg-gray-700 text-white border border-gray-600 rounded-md py-2 px-3 focus:ring-2 focus:ring-indigo-500">
              <option>Computer Science</option>
              <option>ECE</option>
              <option>Mechanical</option>
              <option>Others</option>
            </select>
          </div>

          <div>
            <label className="block text-sm mb-1">Upload Photo</label>
            <div className="relative">
              <Image className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input type="file" accept="image/*" onChange={handlePhotoChange}
                className="w-full bg-gray-700 text-white border border-gray-600 rounded-md pl-10 py-2 file:text-sm" />
            </div>
          </div>

          <div>
            <label className="block text-sm mb-1">Password</label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input type="password" required value={password} onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-gray-700 text-white border border-gray-600 rounded-md pl-10 py-2 focus:ring-2 focus:ring-indigo-500" />
            </div>
          </div>

          <div>
            <label className="block text-sm mb-1">Confirm Password</label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input type="password" required value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full bg-gray-700 text-white border border-gray-600 rounded-md pl-10 py-2 focus:ring-2 focus:ring-indigo-500" />
            </div>
          </div>

          <button type="submit" disabled={isLoading}
            className="w-full py-2 bg-indigo-600 hover:bg-indigo-500 text-white font-medium rounded-md transition">
            {isLoading ? 'Creating account...' : 'Register'}
          </button>
        </form>
      </div>

      <style>{`
        .file::-webkit-file-upload-button {
          visibility: hidden;
        }
        .file::before {
          content: 'Upload';
          display: inline-block;
          background: #4f46e5;
          color: white;
          padding: 4px 12px;
          border-radius: 4px;
          cursor: pointer;
        }
      `}</style>
    </div>
  );
};

export default Register;

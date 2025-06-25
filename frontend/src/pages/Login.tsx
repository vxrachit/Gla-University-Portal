import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  AlertCircle,
  School2,
} from 'lucide-react';
import { motion } from 'framer-motion';

interface LoginProps {
  role: 'admin' | 'faculty' | 'student';
}

const fade = { hidden: { opacity: 0, y: 40 }, visible: { opacity: 1, y: 0 } };

const Login: React.FC<LoginProps> = ({ role }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPw, setShowPw] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const { login } = useAuth();
  const roleDisplay = role[0].toUpperCase() + role.slice(1);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setLoading(true);
      await login(email.trim(), password.trim(), role);
      navigate(`/${role}`);
    } catch {
      setError('Invalid credentials for this role.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen grid lg:grid-cols-2 text-gray-900 overflow-x-hidden">

      {/* ───── Left  Banner / Brand  ───── */}
      <motion.section
        initial={{ x: -90, opacity: 0 }}
        animate={{ x: 0, opacity: 1, transition: { duration: .7 } }}
        className="relative hidden lg:flex flex-col justify-center px-14 overflow-hidden"
      >
        {/* background image */}
        <img
          src="https://images.pexels.com/photos/267885/pexels-photo-267885.jpeg?auto=compress&cs=tinysrgb&w=1600"
          alt="GLA campus"
          className="absolute inset-0 h-full w-full object-cover"
        />
        {/* indigo overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-700/90 via-indigo-600/90 to-violet-700/90" />

        {/* animated decorative circles */}
        <span className="orb bg-fuchsia-400/20 top-20 -left-10 w-72 h-72" />
        <span className="orb bg-sky-400/10 bottom-14 -right-20 w-96 h-96" />

        {/* content */}
        <div className="relative text-white">
          {/* logo */}
          <div className="flex items-center gap-2 mb-8">
            <School2 className="h-8 w-8 text-white" />
            <span className="text-2xl font-semibold tracking-wide">GLA Portal</span>
          </div>

          <h1 className="text-4xl font-extrabold leading-tight drop-shadow-lg">
            Elevate your <br /> university journey
          </h1>
          <p className="mt-4 text-lg text-indigo-100 max-w-md">
            Access courses, resources and collaborate professionally – all in one smart portal.
          </p>

          {/* KPI cards */}
          <div className="mt-10 grid grid-cols-2 gap-6 max-w-sm">
            {[
              ['200+', 'Active Courses'],
              ['12k+', 'Engaged Students'],
              ['350+', 'Expert Faculty'],
              ['97%', 'Success Rate'],
            ].map(([kpi, label]) => (
              <motion.div
                key={label}
                whileHover={{ rotateX: 8, rotateY: -8 }}
                className="rounded-2xl bg-white/15 p-6 backdrop-blur-sm text-center shadow-md"
              >
                <p className="text-2xl font-bold">{kpi}</p>
                <p className="mt-1 text-sm text-indigo-50">{label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* ───── Right  Login Panel ───── */}
      <motion.section
        variants={fade}
        initial="hidden"
        animate="visible"
        transition={{ duration: .7, delay: .15 }}
        className="flex flex-col justify-center bg-gray-950 text-gray-200 px-6 py-16 sm:px-12 lg:px-16"
      >
        <div className="w-full max-w-md mx-auto">
          <h2 className="text-2xl font-bold text-white">Welcome back</h2>
          <p className="mt-1 text-sm text-gray-400">
            Sign in to your <span className="font-medium">{roleDisplay}</span> account
          </p>

          {error && (
            <div className="mt-6 bg-red-600/10 border border-red-600/30 rounded-lg p-4">
              <div className="flex items-start gap-2 text-sm text-red-300">
                <AlertCircle className="h-5 w-5" />
                <span>{error}</span>
              </div>
            </div>
          )}

          {/* form */}
          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            {/* email */}
            <div>
              <label htmlFor="email" className="text-xs font-medium uppercase text-gray-400">
                Email address
              </label>
              <div className="relative mt-1">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-500" />
                <input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full rounded-lg bg-gray-900 border-gray-700 text-sm py-2.5 pl-10 pr-3
                             focus:ring-primary-500 focus:border-primary-500 placeholder-gray-500"
                />
              </div>
            </div>

            {/* password */}
            <div>
              <label htmlFor="password" className="text-xs font-medium uppercase text-gray-400">
                Password
              </label>
              <div className="relative mt-1">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-500" />
                <input
                  id="password"
                  type={showPw ? 'text' : 'password'}
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full rounded-lg bg-gray-900 border-gray-700 text-sm py-2.5 pl-10 pr-10
                             focus:ring-primary-500 focus:border-primary-500 placeholder-gray-500"
                />
                <button
                  type="button"
                  onClick={() => setShowPw(!showPw)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300"
                >
                  {showPw ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
            </div>

            {/* submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full flex justify-center items-center gap-2 rounded-lg py-2.5 text-sm font-medium
                         bg-blue-600 hover:bg-blue-500 focus:outline-none disabled:opacity-60"
            >
              {loading ? 'Signing in…' : `Sign in as ${roleDisplay}`}
            </button>
          </form>

          {/* sign-up link only for students */}
          {role === 'student' && (
            <p className="mt-8 text-center text-xs text-gray-500">
              New here?{' '}
              <Link to="/register" className="text-blue-400 hover:underline">
                Create an account
              </Link>
            </p>
          )}

         {/* Demo credentials – cleaner layout */}
<div className="mt-10 text-xs text-gray-300">
  <p className="font-semibold mb-3">Demo&nbsp;Logins</p>

  {/* row */}
  {[
    ['Student',  'student@vxrachit.dpdns.org'],
    ['Faculty',  'faculty@vxrachit.dpdns.org'],
    ['Admin',    'admin@vxrachit.dpdns.org'],
  ].map(([label, email]) => (
    <div key={label} className="flex items-center gap-2 mb-1">
      <span className="w-16 text-gray-400">{label}</span>
      <span className="flex-1 truncate text-blue-300">{email}</span>
      <code className="px-1.5 py-0.5 bg-gray-800 rounded text-rose-300">vxrachit</code>
    </div>
  ))}
</div>

        </div>
      </motion.section>

      {/* orb keyframes */}
      <style>{`
        @keyframes orb { 0%,100%{transform:translateY(0) scale(1);}
          50%{transform:translateY(-40px) scale(1.05);} }
        .orb{position:absolute;border-radius:9999px;filter:blur(100px);
          animation:orb 20s ease-in-out infinite;}
      `}</style>
    </div>
  );
};

export default Login;

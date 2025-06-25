import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  User,
  GraduationCap,
  ShieldCheck,
} from 'lucide-react';
import { motion } from 'framer-motion';

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.15 },
  }),
};

const LoginSelectorPage: React.FC = () => {
  const navigate = useNavigate();

  const options = [
    {
      title: 'Student Login',
      icon: <GraduationCap className="h-8 w-8" />,
      iconWrap: 'bg-indigo-600/20 text-indigo-300',
      ring: 'ring-indigo-600/20 hover:ring-indigo-400/50',
      btn: 'bg-indigo-600 hover:bg-indigo-500',
      action: () => navigate('/login/student'),
    },
    {
      title: 'Register as Student',
      icon: <User className="h-8 w-8" />,
      iconWrap: 'bg-emerald-600/20 text-emerald-300',
      ring: 'ring-emerald-600/20 hover:ring-emerald-400/50',
      btn: 'bg-emerald-600 hover:bg-emerald-500',
      action: () => navigate('/register'),
    },
    {
      title: 'Faculty Login',
      icon: <ShieldCheck className="h-8 w-8" />,
      iconWrap: 'bg-violet-600/20 text-violet-300',
      ring: 'ring-violet-600/20 hover:ring-violet-400/50',
      btn: 'bg-violet-600 hover:bg-violet-500',
      action: () => navigate('/login/faculty'),
    },
    {
      title: 'Admin Login',
      icon: <ShieldCheck className="h-8 w-8" />,
      iconWrap: 'bg-rose-600/20 text-rose-300',
      ring: 'ring-rose-600/20 hover:ring-rose-400/50',
      btn: 'bg-rose-600 hover:bg-rose-500',
      action: () => navigate('/login/admin'),
    },
  ];

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 px-4 overflow-x-hidden">

      {/* ——— floating blurred blobs ——— */}
      <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
        <span className="blob w-72 h-72 bg-indigo-500/25 top-16 -left-20" />
        <span className="blob w-96 h-96 bg-fuchsia-500/20 -bottom-40 -right-24 delay-2000" />
        <span className="blob w-80 h-80 bg-cyan-500/20 bottom-0 left-1/2 -translate-x-1/2 delay-4000" />
      </div>

      {/* ——— cards ——— */}
      <motion.div
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="max-w-4xl w-full grid grid-cols-1 md:grid-cols-2 gap-8"
      >
        {options.map((opt, i) => (
          <motion.div
            key={opt.title}
            custom={i}
            variants={fadeUp}
            whileHover={{ y: -6 }}
            onClick={opt.action}
            className={`
              relative cursor-pointer rounded-3xl p-8
              bg-gray-800/60 backdrop-blur-lg shadow-lg
              flex flex-col items-center text-center gap-4
              ring-1 ${opt.ring} transition
            `}
          >
            <div className={`w-16 h-16 flex items-center justify-center rounded-full shadow ${opt.iconWrap}`}>
              {opt.icon}
            </div>
            <h3 className="text-lg font-semibold text-gray-100">{opt.title}</h3>
            <button
              onClick={opt.action}
              className={`mt-2 px-5 py-2 rounded-full text-sm font-medium text-white ${opt.btn} transition`}
            >
              Go
            </button>
          </motion.div>
        ))}
      </motion.div>

      {/* ——— blob animation keyframes ——— */}
      <style>{`
        @keyframes blob {
          0%,100% { transform: translateY(0) scale(1); }
          50% { transform: translateY(-40px) scale(1.05); }
        }
        .blob {
          position: absolute;
          border-radius: 9999px;
          filter: blur(100px);
          animation: blob 20s ease-in-out infinite;
        }
        .delay-2000 { animation-delay: 2s; }
        .delay-4000 { animation-delay: 4s; }
      `}</style>
    </div>
  );
};

export default LoginSelectorPage;

import { useNavigate } from 'react-router-dom';
import { User, GraduationCap, ShieldCheck } from 'lucide-react';
import { motion } from 'framer-motion';

const LoginSelectorPage = () => {
  const navigate = useNavigate();

  const options = [
    {
      title: 'Student Login',
      icon: <GraduationCap className="h-8 w-8 text-blue-600" />,
      action: () => navigate('/login/student'),
    },
    {
      title: 'Register as Student',
      icon: <User className="h-8 w-8 text-green-600" />,
      action: () => navigate('/register'),
    },
    {
      title: 'Faculty Login',
      icon: <ShieldCheck className="h-8 w-8 text-purple-600" />,
      action: () => navigate('/login/faculty'),
    },
    {
      title: 'Admin Login',
      icon: <ShieldCheck className="h-8 w-8 text-red-600" />,
      action: () => navigate('/login/admin'),
    },
  ];

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 to-white p-6">
      <div className="max-w-4xl w-full grid grid-cols-1 md:grid-cols-2 gap-6">
        {options.map((opt, idx) => (
          <motion.div
            key={idx}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            className="bg-white p-6 rounded-2xl shadow-xl cursor-pointer flex flex-col items-center text-center gap-4"
            onClick={opt.action}
          >
            {opt.icon}
            <h3 className="text-xl font-semibold">{opt.title}</h3>
            <button
              onClick={opt.action}
              className="mt-2 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
            >
              Go
            </button>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default LoginSelectorPage;

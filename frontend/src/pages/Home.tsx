/* src/pages/Home.tsx */
import React from 'react';
import { Link } from 'react-router-dom';
import {
  BookOpen,
  FileBadge,
  MessageSquare,
  User,
  ChevronDown,
  Sparkles,
  ShieldCheck,
  Users as UsersIcon,
} from 'lucide-react';
import { motion } from 'framer-motion';

/* ——— animation helper ——— */
const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.1 },
  }),
};

/* ——— feature card data ——— */
const features = [
  {
    title: 'Course Management',
    desc: 'Browse, enrol, and manage courses with ease.',
    icon: <BookOpen className="h-6 w-6" />,
    wrap: 'bg-indigo-600/20 text-indigo-300',
    ring: 'ring-indigo-600/20 hover:ring-indigo-400/50',
  },
  {
    title: 'ID Card Services',
    desc: 'Request new ID cards & track application status.',
    icon: <FileBadge className="h-6 w-6" />,
    wrap: 'bg-emerald-600/20 text-emerald-300',
    ring: 'ring-emerald-600/20 hover:ring-emerald-400/50',
  },
  {
    title: 'Complaint System',
    desc: 'Submit and monitor IT / service complaints.',
    icon: <MessageSquare className="h-6 w-6" />,
    wrap: 'bg-cyan-600/20 text-cyan-300',
    ring: 'ring-cyan-600/20 hover:ring-cyan-400/50',
  },
  {
    title: 'Role-Based Access',
    desc: 'Dashboards for students, faculty & admins.',
    icon: <User className="h-6 w-6" />,
    wrap: 'bg-violet-600/20 text-violet-300',
    ring: 'ring-violet-600/20 hover:ring-violet-400/50',
  },
  {
    title: 'Request Tracking',
    desc: 'Real-time status updates for every request.',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
          d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2" />
      </svg>
    ),
    wrap: 'bg-rose-600/20 text-rose-300',
    ring: 'ring-rose-600/20 hover:ring-rose-400/50',
  },
  {
    title: 'Administrative Tools',
    desc: 'Powerful controls for approvals & oversight.',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
          d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4" />
      </svg>
    ),
    wrap: 'bg-amber-600/20 text-amber-300',
    ring: 'ring-amber-600/20 hover:ring-amber-400/50',
  },
];

const Home: React.FC = () => (
  <div className="relative min-h-screen scroll-smooth bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-gray-100">
    {/* —— floating blobs —— */}
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <span className="blob w-96 h-96 bg-indigo-500/25 top-20 -left-24" />
      <span className="blob w-[28rem] h-[28rem] bg-fuchsia-500/20 -bottom-40 -right-40 delay-2000" />
      <span className="blob w-80 h-80 bg-cyan-500/20 bottom-8 left-1/2 -translate-x-1/2 delay-4000" />
    </div>

    {/* —— Header —— */}
    <header className="fixed inset-x-0 top-0 z-50 bg-gray-900/70 backdrop-blur-md shadow-lg">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center gap-2">
          <span className="text-xl font-bold text-indigo-400">GLA</span>
          <span className="text-sm font-medium text-gray-300">University Portal</span>
        </div>
        <nav className="flex gap-4 text-sm font-medium">
          <Link to="/login"    className="text-gray-300 hover:text-indigo-400">Login</Link>
          <Link to="/register" className="bg-indigo-600 hover:bg-indigo-500 text-white px-3 py-1.5 rounded">
            Register
          </Link>
        </nav>
      </div>
    </header>

    {/* —— Hero —— */}
    <section id="hero" className="min-h-[90vh] flex items-center pt-40 pb-28">
      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-14 items-center px-4 sm:px-6 lg:px-8">
        {/* copy */}
        <motion.div variants={fadeUp} initial="hidden" animate="visible" className="space-y-8">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight">
            GLA University Portal
          </h1>
          <p className="text-lg text-gray-300 max-w-2xl">
            A single gateway for students, faculty and administrators to manage services, courses
            and resources—anytime, anywhere.
          </p>

          {/* why choose us */}
          <div className="mt-8 grid md:grid-cols-3 gap-6">
            {[
              ['All-in-one Access',       <Sparkles className="h-5 w-5" />],
              ['Enterprise Security',     <ShieldCheck className="h-5 w-5" />],
              ['15k+ Active Users',       <UsersIcon  className="h-5 w-5" />],
            ].map(([label, icon]) => (
              <div key={label} className="flex items-center gap-3">
                <div className="p-2 rounded-md bg-gray-800/60 ring-1 ring-gray-700/60">
                  {icon}
                </div>
                <span className="text-sm text-gray-300">{label}</span>
              </div>
            ))}
          </div>

          <div className="flex gap-4 mt-10">
            <Link to="/login" className="bg-indigo-600 hover:bg-indigo-500 text-white px-6 py-2 rounded-lg">
              Get Started
            </Link>
            <Link to="/register" className="border border-indigo-400 text-indigo-300 px-6 py-2 rounded-lg hover:bg-indigo-500/20">
              Learn More
            </Link>
          </div>
        </motion.div>

        {/* hero image */}
        <motion.div variants={fadeUp} initial="hidden" animate="visible" transition={{ delay: 0.2 }}
          className="rounded-3xl overflow-hidden shadow-xl ring-1 ring-white/10 mt-10 lg:mt-0">
          <img
            src="https://images.pexels.com/photos/267885/pexels-photo-267885.jpeg?auto=compress&cs=tinysrgb&w=1600"
            alt="Campus"
            className="object-cover w-full h-full opacity-90"
          />
        </motion.div>
      </div>

      {/* scroll cue */}
      <motion.div initial={{ y: 0 }} animate={{ y: 10 }} transition={{ repeat: Infinity, repeatType: 'mirror', duration: 1.2 }}
        className="absolute bottom-6 inset-x-0 flex justify-center">
        <a href="#features" aria-label="Scroll to features">
          <ChevronDown className="h-8 w-8 text-gray-400" />
        </a>
      </motion.div>
    </section>

    {/* —— Features —— */}
    <section id="features" className="py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.h2 variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}
          className="text-3xl font-extrabold text-center text-gray-100">
          Everything you need in one place
        </motion.h2>
        <motion.p variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}
          className="mt-4 text-lg text-center text-gray-400 max-w-2xl mx-auto">
          Manage your academic journey through an intuitive, all-in-one dashboard.
        </motion.p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 mt-20">
          {features.map((f, i) => (
            <motion.div key={f.title} custom={i} variants={fadeUp} initial="hidden" whileInView="visible"
              viewport={{ once: true, margin: '-100px' }}
              className={`relative rounded-2xl p-6 bg-gray-800/60 backdrop-blur-lg shadow hover:shadow-xl hover:-translate-y-1 transition ring-1 ${f.ring}`}>
              <div className={`w-12 h-12 flex items-center justify-center rounded-lg shadow ${f.wrap}`}>
                {f.icon}
              </div>
              <h3 className="text-xl font-semibold mt-4">{f.title}</h3>
              <p className="mt-2 text-gray-400 text-sm">{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>

    {/* —— CTA —— */}
    <section className="py-24 bg-indigo-700 text-white">
      <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}
        className="max-w-4xl mx-auto text-center space-y-6 px-4">
        <h2 className="text-3xl font-extrabold">Ready to get started?</h2>
        <p className="text-lg text-indigo-200">
          Join thousands already improving their campus experience.
        </p>
        <div className="flex justify-center gap-4">
          <Link to="/register" className="bg-white/10 hover:bg-white/20 px-8 py-3 rounded-lg">
            Create an Account
          </Link>
          <Link to="/login" className="border border-white px-8 py-3 rounded-lg hover:bg-white/10">
            Sign In
          </Link>
        </div>
      </motion.div>
    </section>

    {/* —— Footer —— */}
    <footer className="bg-gray-900 text-gray-400">
      <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8 grid gap-10 md:grid-cols-3">
        <div>
          <h3 className="text-lg font-medium text-gray-100 mb-4">GLA University Portal</h3>
          <p className="text-sm">
            One portal for every resource and service you need on campus.
          </p>
        </div>
        <div>
          <h3 className="text-lg font-medium text-gray-100 mb-4">Quick Links</h3>
          <ul className="space-y-2 text-sm">
            <li><Link to="/about-us"      className="hover:text-gray-100">About Us</Link></li>
            <li><a   href="#"              className="hover:text-gray-100">Contact</a></li>
            <li><Link to="/help"           className="hover:text-gray-100">Help &amp; Support</Link></li>
            <li><Link to="/privacy-policy" className="hover:text-gray-100">Privacy Policy</Link></li>
            <li><Link to="/docs"           className="hover:text-gray-100">Documentation</Link></li>
          </ul>
        </div>
        <div>
          <h3 className="text-lg font-medium text-gray-100 mb-4">Contact Us</h3>
          <address className="not-italic text-sm leading-relaxed">
            GLA University<br />
            17 km Stone, NH-2, Mathura-Delhi Highway<br />
            P.O. Chaumuhan, Mathura-281406 (U.P.) India
          </address>
        </div>
      </div>
      <div className="border-t border-gray-800 py-6 text-center text-xs text-gray-500">
        &copy; {new Date().getFullYear()} Rachit Verma. All rights reserved.
      </div>
    </footer>

    {/* blob keyframes */}
    <style>{`
      @keyframes blob {
        0%,100% { transform: translateY(0) scale(1); }
        50% { transform: translateY(-40px) scale(1.05); }
      }
      .blob {
        position: absolute;
        border-radius: 9999px;
        filter: blur(120px);
        animation: blob 20s ease-in-out infinite;
      }
      .delay-2000 { animation-delay: 2s; }
      .delay-4000 { animation-delay: 4s; }
    `}</style>
  </div>
);

export default Home;

import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Home, ArrowLeft, Search, Building2 } from 'lucide-react';

const NotFound = () => {
  return (
    <div className="bg-white min-h-screen flex items-center justify-center font-sans relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-accent-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-emerald-500/5 rounded-full blur-3xl" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#e2e8f0_1px,transparent_1px),linear-gradient(to_bottom,#e2e8f0_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-30" />
      </div>

      <div className="relative z-10 max-w-2xl mx-auto px-6 py-24 text-center">
        {/* Animated 404 Number */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="mb-8"
        >
          <div className="relative inline-block">
            <span className="text-[120px] sm:text-[160px] lg:text-[200px] font-extrabold leading-none tracking-tighter bg-gradient-to-b from-slate-200 to-slate-100 bg-clip-text text-transparent select-none">
              404
            </span>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="absolute inset-0 flex items-center justify-center"
            >
              <div className="p-5 bg-white rounded-2xl shadow-xl border border-slate-200/80">
                <Building2 className="h-10 w-10 sm:h-12 sm:w-12 text-accent-600" />
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* Text Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="space-y-4 mb-10"
        >
          <h1 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-900 tracking-tight">
            Page Not Found
          </h1>
          <p className="text-sm sm:text-base text-slate-500 max-w-md mx-auto leading-relaxed font-light">
            The page you're looking for doesn't exist or has been moved. 
            Let us help you find what you're looking for.
          </p>
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Link
            to="/"
            className="wp-btn-primary py-3 px-8"
          >
            <Home className="h-4 w-4 mr-2" />
            Back to Home
          </Link>
          <Link
            to="/contact"
            className="wp-btn-accent py-3 px-8"
          >
            Contact Us
          </Link>
        </motion.div>

        {/* Quick Navigation Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="mt-14 grid grid-cols-1 sm:grid-cols-3 gap-4"
        >
          {[
            { title: 'Our Projects', desc: 'Explore developments', path: '/projects', icon: Building2 },
            { title: 'Services', desc: 'What we offer', path: '/services', icon: Search },
            { title: 'About Us', desc: 'Our story', path: '/about', icon: ArrowLeft },
          ].map((item, idx) => (
            <Link
              key={idx}
              to={item.path}
              className="group bg-white border border-slate-200/80 rounded-2xl p-5 shadow-sm hover:shadow-md hover:border-accent-500/30 transition-all duration-300 text-left"
            >
              <item.icon className="h-5 w-5 text-accent-600 mb-2.5 group-hover:scale-110 transition-transform" />
              <h3 className="text-sm font-bold text-slate-900 group-hover:text-accent-600 transition-colors">
                {item.title}
              </h3>
              <p className="text-[11px] text-slate-500 mt-0.5 font-light">{item.desc}</p>
            </Link>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default NotFound;

import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Building2, Menu, X, PhoneCall, ChevronRight } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on page change
  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About Us', path: '/about' },
    { name: 'Projects', path: '/projects' },
    { name: 'News & Blog', path: '/blog' },
    { name: 'Contact Us', path: '/contact' },
  ];

  const isActive = (path) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled 
          ? 'bg-white/95 backdrop-blur-md shadow-md border-b border-slate-200/60 py-3' 
          : 'bg-[#F8F9FB]/90 backdrop-blur-[2px] py-4 border-b border-slate-200/30'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 group">
            <div className="bg-gradient-to-tr from-accent-500 to-accent-600 p-2 rounded-lg text-white shadow-md group-hover:scale-105 transition-transform duration-200">
              <Building2 className="h-6 w-6" />
            </div>
            <div>
              <span className="font-serif text-lg md:text-xl font-bold text-slate-900 tracking-wide block leading-tight">
                SRINIDHI
              </span>
              <span className="text-[10px] uppercase tracking-[0.2em] text-accent-600 font-semibold block leading-none">
                Infra Developers
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <div className="flex space-x-6">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  className={`text-sm font-medium tracking-wide transition-colors duration-200 relative py-1 ${
                    isActive(link.path)
                      ? 'text-accent-500 font-semibold'
                      : 'text-slate-600 hover:text-accent-650'
                  }`}
                >
                  {link.name}
                  {isActive(link.path) && (
                    <motion.div
                      layoutId="activeNavIndicator"
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-accent-500"
                      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                    />
                  )}
                </Link>
              ))}
            </div>

            {/* Nav CTA */}
            <Link
              to="/contact"
              className="inline-flex items-center justify-center px-5 py-2.5 text-sm font-semibold rounded-lg bg-accent-500 text-white hover:bg-accent-600 transition-colors duration-200 shadow-md hover:shadow-accent-500/20"
            >
              <PhoneCall className="h-4 w-4 mr-2" />
              Enquire Now
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-md text-slate-500 hover:text-slate-800 hover:bg-slate-100 focus:outline-none"
              aria-label="Toggle menu"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-b border-slate-200 overflow-hidden"
          >
            <div className="px-2 pt-2 pb-4 space-y-1 sm:px-3">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  className={`block px-3 py-2 rounded-md text-base font-medium transition-colors ${
                    isActive(link.path)
                      ? 'bg-slate-50 text-accent-500 font-semibold'
                      : 'text-slate-600 hover:bg-slate-50 hover:text-slate-905'
                  }`}
                >
                  {link.name}
                </Link>
              ))}
              <div className="pt-4 pb-2 px-3">
                <Link
                  to="/contact"
                  className="w-full inline-flex items-center justify-center px-4 py-3 rounded-md bg-accent-500 text-white font-semibold hover:bg-accent-600 transition-colors shadow-md"
                >
                  <PhoneCall className="h-4 w-4 mr-2" />
                  Enquire Now
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;

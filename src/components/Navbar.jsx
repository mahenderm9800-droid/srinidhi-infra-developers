import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Building2, Menu, X } from 'lucide-react';
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

  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About Us', path: '/about' },
    { name: 'Services', path: '/services' },
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
          ? 'bg-white shadow-sm border-b border-slate-200/50 py-2' 
          : 'bg-white py-2.5 border-b border-slate-200/30'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center flex-wrap md:flex-nowrap">
          
          {/* Logo & Navigation links grouped together on the left (Notion style) */}
          <div className="flex items-center space-x-10">
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-2.5 group">
              <div className="bg-gradient-to-tr from-accent-500 to-accent-600 p-2 rounded-lg text-white shadow-sm group-hover:scale-105 transition-transform duration-200">
                <Building2 className="h-5.5 w-5.5" />
              </div>
              <div>
                <span className="font-serif text-base md:text-lg font-bold text-slate-900 tracking-wide block leading-tight">
                  SRINIDHI
                </span>
                <span className="text-[9px] uppercase tracking-[0.2em] text-accent-600 font-semibold block leading-none">
                  Infra Developers
                </span>
              </div>
            </Link>

            {/* Desktop Navigation Links aligned left immediately next to logo */}
            <div className="hidden md:flex space-x-6 items-center pt-0.5">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  className={`text-[13px] transition-colors duration-200 py-1 ${
                    isActive(link.path)
                      ? 'text-slate-900 font-medium'
                      : 'text-slate-500 hover:text-slate-900 font-normal'
                  }`}
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </div>

          {/* Desktop Right CTA ("Get Notion free" style rounded dark button) */}
          <div className="hidden md:block">
            <Link
              to="/contact"
              className="inline-flex items-center justify-center px-5 py-2 text-[13px] font-medium rounded-md bg-slate-900 text-white hover:bg-slate-800 transition-colors duration-200 shadow-sm"
            >
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
                  className={`block px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    isActive(link.path)
                      ? 'bg-slate-50 text-slate-900 font-medium'
                      : 'text-slate-550 hover:bg-slate-50 hover:text-slate-900 font-normal'
                  }`}
                >
                  {link.name}
                </Link>
              ))}
              <div className="pt-4 pb-2 px-3">
                <Link
                  to="/contact"
                  className="w-full inline-flex items-center justify-center px-4 py-2.5 rounded-lg bg-slate-900 text-white hover:bg-slate-800 font-semibold text-sm transition-colors"
                >
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

import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
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
    { name: 'Our Projects', path: '/projects' },
    { name: 'News & Blog', path: '/blog' },
    { name: 'Contact Us', path: '/contact' },
  ];

  const isActive = (path) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  const isTransparent = location.pathname === '/' && !scrolled;

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isTransparent
          ? 'bg-transparent border-b border-white/15'
          : 'bg-white shadow-sm border-b border-slate-200/50'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative flex h-14 items-center justify-between md:h-20">

          {/* Logo — Left */}
          <Link to="/" className="flex items-center group shrink-0 z-10">
            <img
              src={isTransparent ? '/logo.png' : '/logo-header.webp'}
              alt="Srinidhi Infra Developers"
              width={400}
              height={400}
              decoding="async"
              className={`h-10 w-auto object-contain transition-opacity duration-200 group-hover:opacity-90 md:h-16 lg:h-[70px] ${
                isTransparent ? 'brightness-0 invert' : ''
              }`}
            />
          </Link>

          <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className={`text-base lg:text-[17px] tracking-wide whitespace-nowrap transition-all duration-200 pb-0.5 ${
                  isActive(link.path)
                    ? `${isTransparent ? 'text-white' : 'text-slate-900'} font-semibold border-b-2 border-accent-500`
                    : `${isTransparent ? 'text-white/80 hover:text-white' : 'text-slate-500 hover:text-slate-900'} font-medium hover:border-b-2 hover:border-accent-400`
                }`}
                style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* CTA Button — Right */}
          <div className="hidden md:block z-10">
            <Link
              to="/contact"
              className="wp-btn-primary shadow-sm hover:shadow-md py-2 px-5 text-xs font-extrabold"
            >
              Enquire Now
            </Link>
          </div>

          {/* Mobile Hamburger — Right */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className={`p-2 rounded-md focus:outline-none ${
                isTransparent
                  ? 'text-white hover:bg-white/10'
                  : 'text-slate-500 hover:text-slate-800 hover:bg-slate-100'
              }`}
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

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin, Clock, ArrowRight, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { getSettings } from '../services/db';

const CollapsibleFooterSection = ({ title, children }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      {/* Mobile Header (clickable) */}
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex md:hidden items-center justify-between text-white font-serif text-sm font-bold mb-2 tracking-wide pb-2 border-b border-white/20"
      >
        <span>{title}</span>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <ChevronDown className="h-4 w-4 text-slate-400" />
        </motion.div>
      </button>

      {/* Desktop Header (static) */}
      <h3 className="hidden md:block text-white font-serif text-sm font-bold mb-4 tracking-wide">
        {title}
      </h3>

      {/* Mobile Collapsible / Desktop Content */}
      <div className="hidden md:block">
        {children}
      </div>

      <div className="block md:hidden">
        <AnimatePresence initial={false}>
          {isOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
              className="overflow-hidden pb-4"
            >
              {children}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const [settings, setSettings] = useState(null);

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const data = await getSettings();
        setSettings(data);
      } catch (err) {
        console.error("Error loading footer settings", err);
      }
    };
    fetchSettings();
  }, []);

  return (
    <footer className="relative text-white pt-8 md:pt-16 pb-8 font-sans overflow-hidden" style={{ background: 'linear-gradient(135deg, #0f2460 0%, #1a3a8f 30%, #1e4fc2 60%, #1565c0 80%, #0d47a1 100%)' }}>
      {/* Blue Gradient Backdrop with grid and glow blobs */}
      <div className="absolute inset-0 z-0 pointer-events-none select-none">
        {/* Subtle white grid lines */}
        <svg className="w-full h-full opacity-10" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="footer-blue-grid" width="60" height="60" patternUnits="userSpaceOnUse">
              <path d="M 60 0 L 0 0 0 60" fill="none" stroke="#ffffff" strokeWidth="0.6" />
              <circle cx="0" cy="0" r="1.5" fill="#ffffff" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#footer-blue-grid)" />
          {/* Decorative circle arcs */}
          <g transform="translate(1100, 60)" stroke="#ffffff" strokeWidth="0.8" fill="none" opacity="0.15">
            <circle cx="100" cy="100" r="80" />
            <circle cx="100" cy="100" r="90" strokeDasharray="4 4" />
            <circle cx="100" cy="100" r="35" />
            <line x1="100" y1="5" x2="100" y2="195" />
            <line x1="5" y1="100" x2="195" y2="100" />
          </g>
        </svg>
        {/* Glow blobs */}
        <div className="absolute top-0 right-0 w-96 h-96 rounded-full blur-3xl" style={{ background: 'rgba(255,255,255,0.06)' }} />
        <div className="absolute bottom-0 left-0 w-80 h-80 rounded-full blur-3xl" style={{ background: 'rgba(96,165,250,0.12)' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full blur-3xl" style={{ background: 'rgba(255,255,255,0.03)' }} />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-12 mb-4 md:mb-12">

          {/* About Column */}
          <div className="space-y-4">
            <Link to="/" className="flex items-center group">
              <img
                src="/logo.png"
                alt="Srinidhi Infra Developers"
                className="h-20 w-auto object-contain brightness-0 invert opacity-90 group-hover:opacity-100 transition-opacity duration-200"
              />
            </Link>
            <p className="text-xs leading-relaxed text-blue-100">
              Srinidhi Infra Developers is committed to crafting high-quality residential, commercial, and turnkey developments that redefine design, utility and inspire trust.
            </p>
          </div>

          {/* Quick Links Column */}
          <CollapsibleFooterSection title="Quick Links">
            <ul className="space-y-2.5 text-xs font-medium text-blue-100">
              <li>
                <Link to="/about" className="hover:text-white transition-colors flex items-center">
                  <ArrowRight className="h-3 w-3 mr-2 text-accent-400" /> Company Profile
                </Link>
              </li>
              <li>
                <Link to="/services" className="hover:text-white transition-colors flex items-center">
                  <ArrowRight className="h-3 w-3 mr-2 text-accent-400" /> Our Services
                </Link>
              </li>
              <li>
                <Link to="/blog" className="hover:text-white transition-colors flex items-center">
                  <ArrowRight className="h-3 w-3 mr-2 text-accent-400" /> News & Insights
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-white transition-colors flex items-center">
                  <ArrowRight className="h-3 w-3 mr-2 text-accent-400" /> Get in Touch
                </Link>
              </li>
            </ul>
          </CollapsibleFooterSection>

          {/* Contact Details Column */}
          <CollapsibleFooterSection title="Contact Us">
            <ul className="space-y-3.5 text-xs font-medium text-blue-100">
              <li className="flex items-start">
                <MapPin className="h-4.5 w-4.5 mr-3 text-accent-400 shrink-0 mt-0.5" />
                <span className="whitespace-pre-line leading-relaxed font-light">
                  {settings?.contact?.address || "H.no..1-159/1  Gandhi nagar kapra.secunderbad pin code 500062"}
                </span>
              </li>
              <li className="flex flex-col space-y-1.5">
                <div className="flex items-center">
                  <Phone className="h-4 w-4 mr-3 text-accent-400 shrink-0" />
                  <a href={`tel:${settings?.contact?.phone || '9866615535'}`} className="hover:text-white transition-colors">
                    {settings?.contact?.phone || "9866615535"}
                  </a>
                </div>
                {(settings?.contact?.phone2 || "9866615525") && (
                  <div className="flex items-center pl-7 text-[11px] text-blue-200">
                    <a href={`tel:${settings?.contact?.phone2 || '9866615525'}`} className="hover:text-white transition-colors">
                      {settings?.contact?.phone2 || "9866615525"}
                    </a>
                  </div>
                )}
              </li>
              <li className="flex items-center">
                <Mail className="h-4 w-4 mr-3 text-accent-400 shrink-0" />
                <a href={`mailto:${settings?.contact?.email || 'info@srinidhiinfra.com'}`} className="hover:text-white transition-colors">
                  {settings?.contact?.email || "info@srinidhiinfra.com"}
                </a>
              </li>
            </ul>
          </CollapsibleFooterSection>

          {/* Office Hours Column */}
          <CollapsibleFooterSection title="Office Hours">
            <ul className="space-y-3.5 text-xs font-medium text-blue-100">
              <li className="flex items-center">
                <Clock className="h-4 w-4 mr-3 text-accent-400" />
                <div>
                  <p className="font-bold text-white">Business Hours</p>
                  <p className="text-[10px] text-blue-200">{settings?.contact?.hours || "Mon - Sat: 09:30 AM - 06:30 PM"}</p>
                </div>
              </li>
              <li className="flex items-center">
                <Clock className="h-4 w-4 mr-3 text-slate-600" />
                <div>
                  <p className="font-bold text-blue-200">Sunday</p>
                  <p className="text-[10px] text-blue-200">Closed</p>
                </div>
              </li>
            </ul>
          </CollapsibleFooterSection>

        </div>

        {/* Footer Bottom / Disclaimers */}
        <div className="border-t border-white/10 pt-6 mt-4 md:mt-8 flex flex-col md:flex-row justify-between items-center text-[10px] text-blue-200 space-y-4 md:space-y-0 font-semibold uppercase tracking-wider">
          <div className="space-y-2 text-center md:text-left">
            <p>© {currentYear} Srinidhi Infra Developers. All rights reserved.</p>
            <p className="normal-case tracking-normal text-blue-200 font-medium text-[11px]">
              Developed By{' '}
              <a 
                href="https://www.octaleads.com" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-accent-500 hover:text-accent-400 font-semibold transition-colors"
              >
                Octaleads Pvt Ltd.
              </a>
            </p>
          </div>
          <div className="flex space-x-6">
            <span className="hover:underline hover:text-white cursor-pointer">Privacy Policy</span>
            <span className="hover:underline hover:text-white cursor-pointer">Terms of Service</span>
            <span className="hover:underline hover:text-white cursor-pointer">Disclaimer</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

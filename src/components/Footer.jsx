import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Building2, Phone, Mail, MapPin, Clock, ArrowRight, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { getSettings } from '../services/db';

const CollapsibleFooterSection = ({ title, children }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      {/* Mobile Header (clickable) */}
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex md:hidden items-center justify-between text-white font-serif text-sm font-bold mb-2 tracking-wide pb-2 border-b border-slate-900"
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
    <footer className="relative bg-slate-950 text-slate-300 pt-16 pb-8 font-sans border-t border-slate-900 overflow-hidden">
      {/* Modern Technical Blueprint/Grid SVG Backdrop */}
      <div className="absolute inset-0 z-0 pointer-events-none select-none opacity-40">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          {/* Tech Grid */}
          <defs>
            <pattern id="footer-tech-grid" width="60" height="60" patternUnits="userSpaceOnUse">
              <path d="M 60 0 L 0 0 0 60" fill="none" stroke="#334155" strokeWidth="0.5" className="opacity-30" />
              <circle cx="0" cy="0" r="1.5" fill="#475569" className="opacity-40" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#footer-tech-grid)" />

          {/* Compass / Engineering circle graphics on the bottom-right */}
          <g transform="translate(1100, 80)" stroke="#475569" strokeWidth="0.75" fill="none" className="opacity-25">
            <circle cx="100" cy="100" r="70" />
            <circle cx="100" cy="100" r="75" strokeDasharray="3 3" />
            <circle cx="100" cy="100" r="30" />
            <line x1="100" y1="10" x2="100" y2="190" />
            <line x1="10" y1="100" x2="190" y2="100" />
          </g>

          {/* Schematic Blueprint Isometric lines on the bottom-left */}
          <g transform="translate(50, 40)" stroke="#475569" strokeWidth="0.5" fill="none" className="opacity-20">
            {/* Draw abstract isometric building cubes */}
            <path d="M 0 50 L 50 25 L 100 50 L 50 75 Z" />
            <path d="M 0 50 L 0 100 L 50 125 L 50 75 Z" />
            <path d="M 100 50 L 100 100 L 50 125 Z" />

            <path d="M 120 70 L 150 55 L 180 70 L 150 85 Z" strokeDasharray="2 2" />
            <path d="M 120 70 L 120 110 L 150 125 L 150 85 Z" strokeDasharray="2 2" />
            <path d="M 180 70 L 180 110 L 150 125 Z" strokeDasharray="2 2" />
          </g>
        </svg>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-12 mb-12">

          {/* About Column */}
          <div className="space-y-4">
            <Link to="/" className="flex items-center space-x-2 group">
              <div className="bg-accent-500 p-2 rounded-lg text-white shadow-md">
                <Building2 className="h-6 w-6" />
              </div>
              <div>
                <span className="font-serif text-lg font-bold text-white tracking-wide block leading-tight">
                  SRINIDHI
                </span>
                <span className="text-[10px] uppercase tracking-[0.2em] text-accent-400 font-semibold block leading-none">
                  Infra Developers
                </span>
              </div>
            </Link>
            <p className="text-xs leading-relaxed text-slate-300">
              Srinidhi Infra Developers is committed to crafting high-quality residential, commercial, and turnkey developments that redefine design, utility and inspire trust.
            </p>
          </div>

          {/* Quick Links Column */}
          <CollapsibleFooterSection title="Quick Links">
            <ul className="space-y-2.5 text-xs font-medium text-slate-300">
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
            <ul className="space-y-3.5 text-xs font-medium text-slate-200">
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
                  <div className="flex items-center pl-7 text-[11px] text-slate-400">
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
            <ul className="space-y-3.5 text-xs font-medium text-slate-300">
              <li className="flex items-center">
                <Clock className="h-4 w-4 mr-3 text-accent-400" />
                <div>
                  <p className="font-bold text-slate-100">Business Hours</p>
                  <p className="text-[10px] text-slate-305">{settings?.contact?.hours || "Mon - Sat: 09:30 AM - 06:30 PM"}</p>
                </div>
              </li>
              <li className="flex items-center">
                <Clock className="h-4 w-4 mr-3 text-slate-600" />
                <div>
                  <p className="font-bold text-slate-400">Sunday</p>
                  <p className="text-[10px] text-slate-400">Closed</p>
                </div>
              </li>
            </ul>
          </CollapsibleFooterSection>

        </div>

        {/* Footer Bottom / Disclaimers */}
        <div className="border-t border-slate-900 pt-8 mt-8 flex flex-col md:flex-row justify-between items-center text-[10px] text-slate-400 space-y-4 md:space-y-0 font-semibold uppercase tracking-wider">
          <div className="space-y-2 text-center md:text-left">
            <p>© {currentYear} Srinidhi Infra Developers. All rights reserved.</p>
            <p className="normal-case tracking-normal text-slate-500 font-medium text-[11px]">
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

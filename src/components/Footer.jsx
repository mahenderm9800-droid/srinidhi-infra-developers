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
    <footer className="relative text-white pt-8 md:pt-16 pb-8 font-sans overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img
          src="/footer-bg.jpg"
          alt=""
          className="w-full h-full object-cover object-center"
        />
        {/* Dark overlay for text readability */}
        <div className="absolute inset-0 bg-black/65" />
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
            <p className="text-xs leading-relaxed text-white/80">
              Srinidhi Infra Developers is committed to crafting high-quality residential, commercial, and turnkey developments that redefine design, utility and inspire trust.
            </p>
          </div>

          {/* Quick Links Column */}
          <CollapsibleFooterSection title="Quick Links">
            <ul className="space-y-2.5 text-xs font-medium text-white/80">
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
            <ul className="space-y-3.5 text-xs font-medium text-white/80">
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
                  <div className="flex items-center pl-7 text-[11px] text-white/60">
                    <a href={`tel:${settings?.contact?.phone2 || '9866615525'}`} className="hover:text-white transition-colors">
                      {settings?.contact?.phone2 || "9866615525"}
                    </a>
                  </div>
                )}
              </li>
              <li className="flex items-center">
                <Mail className="h-4 w-4 mr-3 text-accent-400 shrink-0" />
                <a href={`mailto:${settings?.contact?.email || 'info@srinidhiinfradevelopers.com'}`} className="hover:text-white transition-colors">
                  {settings?.contact?.email || "info@srinidhiinfradevelopers.com"}
                </a>
              </li>
            </ul>
          </CollapsibleFooterSection>

          {/* Office Hours Column */}
          <CollapsibleFooterSection title="Office Hours">
            <ul className="space-y-3.5 text-xs font-medium text-white/80">
              <li className="flex items-center">
                <Clock className="h-4 w-4 mr-3 text-accent-400" />
                <div>
                  <p className="font-bold text-white">Business Hours</p>
                  <p className="text-[10px] text-white/70">{settings?.contact?.hours || "Mon - Sat: 09:30 AM - 06:30 PM"}</p>
                </div>
              </li>
              <li className="flex items-center">
                <Clock className="h-4 w-4 mr-3 text-slate-600" />
                <div>
                  <p className="font-bold text-white/70">Sunday</p>
                  <p className="text-[10px] text-white/60">Closed</p>
                </div>
              </li>
            </ul>
          </CollapsibleFooterSection>

        </div>

        {/* Footer Bottom / Disclaimers */}
        <div className="border-t border-white/10 pt-6 mt-4 md:mt-8 flex flex-col md:flex-row justify-between items-center text-[10px] text-white/60 space-y-4 md:space-y-0 font-semibold uppercase tracking-wider">
          <div className="space-y-2 text-center md:text-left">
            <p>© {currentYear} Srinidhi Infra Developers. All rights reserved.</p>
            <p className="normal-case tracking-normal text-white/70 font-medium text-[11px]">
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
            <Link to="/contact" className="hover:underline hover:text-white cursor-pointer">Privacy Policy</Link>
            <Link to="/contact" className="hover:underline hover:text-white cursor-pointer">Terms of Service</Link>
            <Link to="/contact" className="hover:underline hover:text-white cursor-pointer">Disclaimer</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

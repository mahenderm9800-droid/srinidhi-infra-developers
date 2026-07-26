import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Building2, Phone, Mail, MapPin, Clock, ArrowRight } from 'lucide-react';
import { getSettings } from '../services/db';

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
    <footer className="bg-slate-50 text-slate-650 border-t border-slate-200/60 pt-16 pb-8 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          
          {/* About Column */}
          <div className="space-y-4">
            <Link to="/" className="flex items-center space-x-2 group">
              <div className="bg-accent-500 p-2 rounded-lg text-white shadow-md">
                <Building2 className="h-6 w-6" />
              </div>
              <div>
                <span className="font-serif text-lg font-bold text-slate-900 tracking-wide block leading-tight">
                  SRINIDHI
                </span>
                <span className="text-[10px] uppercase tracking-[0.2em] text-accent-600 font-semibold block leading-none">
                  Infra Developers
                </span>
              </div>
            </Link>
            <p className="text-xs leading-relaxed text-slate-500">
              Srinidhi Infra Developers is committed to crafting high-quality residential, commercial, and turnkey developments that redefine design, utility and inspire trust.
            </p>
          </div>

          {/* Quick Links Column */}
          <div>
            <h3 className="text-slate-900 font-serif text-sm font-bold mb-4 tracking-wide">Quick Links</h3>
            <ul className="space-y-2.5 text-xs font-medium">
              <li>
                <Link to="/about" className="hover:text-accent-500 transition-colors flex items-center">
                  <ArrowRight className="h-3 w-3 mr-2 text-accent-500" /> Company Profile
                </Link>
              </li>
              <li>
                <Link to="/services" className="hover:text-accent-500 transition-colors flex items-center">
                  <ArrowRight className="h-3 w-3 mr-2 text-accent-500" /> Our Services
                </Link>
              </li>
              <li>
                <Link to="/blog" className="hover:text-accent-500 transition-colors flex items-center">
                  <ArrowRight className="h-3 w-3 mr-2 text-accent-500" /> News & Insights
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-accent-500 transition-colors flex items-center">
                  <ArrowRight className="h-3 w-3 mr-2 text-accent-500" /> Get in Touch
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Details Column */}
          <div>
            <h3 className="text-slate-900 font-serif text-sm font-bold mb-4 tracking-wide">Contact Us</h3>
            <ul className="space-y-3.5 text-xs font-medium text-slate-605">
              <li className="flex items-start">
                <MapPin className="h-4.5 w-4.5 mr-3 text-accent-500 shrink-0 mt-0.5" />
                <span className="whitespace-pre-line leading-relaxed">
                  {settings?.contact?.address || "Plot No. 42, Silicon Valley Layout, Image Gardens Road, Madhapur, Hyderabad, Telangana - 500081"}
                </span>
              </li>
              <li className="flex items-center">
                <Phone className="h-4 w-4 mr-3 text-accent-500" />
                <a href={`tel:${settings?.contact?.phone || '+91 98765 43210'}`} className="hover:text-accent-500 transition-colors">
                  {settings?.contact?.phone || "+91 98765 43210"}
                </a>
              </li>
              <li className="flex items-center">
                <Mail className="h-4 w-4 mr-3 text-accent-500" />
                <a href={`mailto:${settings?.contact?.email || 'info@srinidhiinfra.com'}`} className="hover:text-accent-500 transition-colors">
                  {settings?.contact?.email || "info@srinidhiinfra.com"}
                </a>
              </li>
            </ul>
          </div>

          {/* Office Hours Column */}
          <div>
            <h3 className="text-slate-900 font-serif text-sm font-bold mb-4 tracking-wide">Office Hours</h3>
            <ul className="space-y-3.5 text-xs font-medium text-slate-600">
              <li className="flex items-center">
                <Clock className="h-4 w-4 mr-3 text-accent-500" />
                <div>
                  <p className="font-bold text-slate-800">Business Hours</p>
                  <p className="text-[10px] text-slate-500">{settings?.contact?.hours || "Mon - Sat: 09:30 AM - 06:30 PM"}</p>
                </div>
              </li>
              <li className="flex items-center">
                <Clock className="h-4 w-4 mr-3 text-slate-300" />
                <div>
                  <p className="font-bold text-slate-400">Sunday</p>
                  <p className="text-[10px] text-slate-405">Closed</p>
                </div>
              </li>
            </ul>
          </div>

        </div>

        {/* Footer Bottom / Disclaimers */}
        <div className="border-t border-slate-200/60 pt-8 mt-8 flex flex-col md:flex-row justify-between items-center text-[10px] text-slate-450 space-y-4 md:space-y-0 font-semibold uppercase tracking-wider">
          <p>© {currentYear} Srinidhi Infra Developers. All rights reserved.</p>
          <div className="flex space-x-6">
            <span className="hover:underline cursor-pointer">Privacy Policy</span>
            <span className="hover:underline cursor-pointer">Terms of Service</span>
            <span className="hover:underline cursor-pointer">Disclaimer</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

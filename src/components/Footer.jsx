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
    <footer className="bg-slate-950 text-slate-400 border-t border-emerald-900/50 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          
          {/* About Column */}
          <div className="space-y-4">
            <Link to="/" className="flex items-center space-x-2 group">
              <div className="bg-accent-500 p-2 rounded-lg text-slate-950 shadow-md">
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
            <p className="text-sm leading-relaxed text-slate-400">
              Srinidhi Infra Developers is committed to crafting high-quality residential, commercial, and plotted developments that redefine luxury and inspire trust.
            </p>
            <div className="flex items-center space-x-4 pt-2">
              {/* RERA badge placeholder */}
              <div className="border border-accent-500/30 bg-accent-500/5 text-accent-400 text-[10px] font-bold px-3 py-1.5 rounded uppercase tracking-wider">
                RERA Compliant Projects
              </div>
            </div>
          </div>

          {/* Quick Links Column */}
          <div>
            <h3 className="text-white font-serif text-base font-semibold mb-4 tracking-wide">Quick Links</h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link to="/about" className="hover:text-accent-400 transition-colors flex items-center">
                  <ArrowRight className="h-3 w-3 mr-2 text-accent-500" /> Company Profile
                </Link>
              </li>
              <li>
                <Link to="/projects" className="hover:text-accent-400 transition-colors flex items-center">
                  <ArrowRight className="h-3 w-3 mr-2 text-accent-500" /> Our Projects
                </Link>
              </li>
              <li>
                <Link to="/blog" className="hover:text-accent-400 transition-colors flex items-center">
                  <ArrowRight className="h-3 w-3 mr-2 text-accent-500" /> News & Insights
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-accent-400 transition-colors flex items-center">
                  <ArrowRight className="h-3 w-3 mr-2 text-accent-500" /> Get in Touch
                </Link>
              </li>
              <li>
                <Link to="/admin" className="hover:text-accent-400 transition-colors flex items-center">
                  <ArrowRight className="h-3 w-3 mr-2 text-accent-500" /> Admin Access
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Details Column */}
          <div>
            <h3 className="text-white font-serif text-base font-semibold mb-4 tracking-wide">Contact Us</h3>
            <ul className="space-y-3.5 text-sm">
              <li className="flex items-start">
                <MapPin className="h-5 w-5 mr-3 text-accent-500 shrink-0 mt-0.5" />
                <span className="whitespace-pre-line">
                  {settings?.contact?.address || "Loading address..."}
                </span>
              </li>
              <li className="flex items-center">
                <Phone className="h-4 w-4 mr-3 text-accent-500" />
                <a href={`tel:${settings?.contact?.phone}`} className="hover:text-white transition-colors">
                  {settings?.contact?.phone || "Loading phone..."}
                </a>
              </li>
              <li className="flex items-center">
                <Mail className="h-4 w-4 mr-3 text-accent-500" />
                <a href={`mailto:${settings?.contact?.email}`} className="hover:text-white transition-colors">
                  {settings?.contact?.email || "Loading email..."}
                </a>
              </li>
            </ul>
          </div>

          {/* Office Hours Column */}
          <div>
            <h3 className="text-white font-serif text-base font-semibold mb-4 tracking-wide">Office Hours</h3>
            <ul className="space-y-3.5 text-sm">
              <li className="flex items-center">
                <Clock className="h-4 w-4 mr-3 text-accent-500" />
                <div>
                  <p className="font-semibold text-slate-350">Business Hours</p>
                  <p className="text-xs text-slate-500">{settings?.contact?.hours || "Loading hours..."}</p>
                </div>
              </li>
              <li className="flex items-center">
                <Clock className="h-4 w-4 mr-3 text-slate-600" />
                <div>
                  <p className="font-semibold text-slate-500">Sunday</p>
                  <p className="text-xs text-slate-650">Closed</p>
                </div>
              </li>
            </ul>
          </div>

        </div>

        {/* Footer Bottom / Disclaimers */}
        <div className="border-t border-emerald-900/50 pt-8 mt-8 flex flex-col md:flex-row justify-between items-center text-xs text-slate-500 space-y-4 md:space-y-0">
          <p>© {currentYear} Srinidhi Infra Developers. All rights reserved.</p>
          <div className="flex space-x-6">
            <span className="hover:underline cursor-pointer">Privacy Policy</span>
            <span className="hover:underline cursor-pointer">Terms of Service</span>
            <span className="hover:underline cursor-pointer">Disclaimer</span>
          </div>
        </div>
        
        {/* RERA Disclaimer */}
        <div className="text-[10px] text-slate-600 mt-6 leading-relaxed text-justify">
          Disclaimer: The images, project plans, dimensions, elevations, details, specs and other content showcased on this website are conceptual and subject to modifications/change by the builder or respective authorities. All prospective buyers are advised to check registered RERA numbers and actual brochures before entering into any transaction.
        </div>
      </div>
    </footer>
  );
};

export default Footer;

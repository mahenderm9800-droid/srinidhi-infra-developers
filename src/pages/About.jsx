import React, { useState, useEffect } from 'react';
import { Target, Eye, ShieldCheck, Compass, Heart, Award } from 'lucide-react';
import { getSettings, getLeadership, getMilestones } from '../services/db';

const About = () => {
  const [settings, setSettings] = useState(null);
  const [leadership, setLeadership] = useState([]);
  const [milestones, setMilestones] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [sets, leads, miles] = await Promise.all([
          getSettings(),
          getLeadership(),
          getMilestones()
        ]);
        setSettings(sets);
        setLeadership(leads);
        setMilestones(miles);
      } catch (err) {
        console.error("Error loading about page data", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const values = [
    { title: "Transparency", desc: "Every agreement, calculation, and document is open for verification.", icon: Compass },
    { title: "Quality Standards", desc: "No compromise on raw material grading, steel benchmarks, or concrete tests.", icon: ShieldCheck },
    { title: "Customer Centricity", desc: "Post-purchase customer care, maintenance assistance, and reliable handovers.", icon: Heart }
  ];

  return (
    <div className="bg-white min-h-screen text-slate-800 font-sans">
      {/* 1. Header Section */}
      <section className="relative pt-32 pb-16 text-white text-center overflow-hidden border-b border-slate-800 bg-slate-900">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80" 
            alt="Office Building Background" 
            className="w-full h-full object-cover opacity-35"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-slate-900/40 to-transparent" />
        </div>
        <div className="relative z-10 max-w-4xl mx-auto px-4">
          <span className="text-accent-400 text-xs font-bold uppercase tracking-widest block mb-2">Our Story</span>
          <h1 className="text-4xl sm:text-5xl font-serif font-bold text-white mb-4">About Us</h1>
          <p className="text-slate-300 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
            Crafting inspiring spaces built on quality, clarity, and trust.
          </p>
        </div>
      </section>

      {/* 2. Brand Story, Mission & Vision */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h2 className="text-2xl md:text-3xl font-serif font-bold text-slate-900 border-b-2 border-accent-500 pb-3 inline-block">
              Our Journey
            </h2>
            <div className="text-slate-650 text-sm sm:text-base leading-relaxed space-y-4 whitespace-pre-line">
              {settings?.about?.story || "At Srinidhi Infra Developers, we believe that constructing homes and business hubs is a sacred duty. We started our journey in Hyderabad with a simple goal: to provide high-quality, legally sound real estate that stands the test of time.\n\nOver the last decade, we have successfully developed premium residential townships, commercial workspaces, and highly profitable open layouts. By prioritizing strategic locations, utilizing premium building materials, and strictly complying with state mandates like RERA, we have earned the trust of thousands of clients."}
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4 sm:gap-6">
            <div className="bg-slate-50 p-4 sm:p-6 rounded-xl border border-slate-200/80 shadow-sm">
              <div className="p-2 sm:p-3 bg-accent-500/10 rounded-lg text-accent-500 inline-block mb-3 sm:mb-4 border border-accent-500/20">
                <Target className="h-5 sm:h-6 w-5 sm:w-6" />
              </div>
              <h3 className="font-serif text-sm sm:text-lg font-bold text-slate-900 mb-1 sm:mb-2">Our Mission</h3>
              <p className="text-[10px] sm:text-xs text-slate-500 leading-relaxed">
                {settings?.about?.mission || "To build high-value residential and commercial properties with absolute compliance, premium materials, and timely project delivery."}
              </p>
            </div>
            <div className="bg-slate-50 p-4 sm:p-6 rounded-xl border border-slate-200/80 shadow-sm">
              <div className="p-2 sm:p-3 bg-accent-500/10 rounded-lg text-accent-500 inline-block mb-3 sm:mb-4 border border-accent-500/20">
                <Eye className="h-5 sm:h-6 w-5 sm:w-6" />
              </div>
              <h3 className="font-serif text-sm sm:text-lg font-bold text-slate-900 mb-1 sm:mb-2">Our Vision</h3>
              <p className="text-[10px] sm:text-xs text-slate-500 leading-relaxed">
                {settings?.about?.vision || "To be the most trusted infrastructure development brand, known for transparent dealings, quality engineering, and customer satisfaction."}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Core Values */}
      <section className="bg-slate-55 border-t border-b border-slate-200/60 text-slate-800 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-accent-500 text-xs font-semibold tracking-widest uppercase block mb-2">How We Operate</span>
            <h2 className="text-2xl md:text-3xl font-serif font-bold text-slate-900">Our Core Values</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-8">
            {values.map((v, i) => (
              <div key={i} className="bg-white p-4 sm:p-6 rounded-xl border border-slate-200/80 flex flex-col sm:flex-row items-center sm:items-start text-center sm:text-left space-y-4 sm:space-y-0 sm:space-x-4 shadow-sm">
                <div className="p-2.5 bg-accent-500/10 rounded-lg text-accent-500 shrink-0 border border-accent-500/20">
                  <v.icon className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-serif text-sm sm:text-base font-bold text-slate-900 mb-1 sm:mb-2">{v.title}</h3>
                  <p className="text-[10px] sm:text-xs text-slate-555 leading-relaxed">{v.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Leadership Section */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-accent-500 text-xs font-semibold tracking-widest uppercase block mb-2">Management</span>
          <h2 className="text-2xl md:text-3xl font-serif font-bold text-slate-900">Our Leadership Team</h2>
        </div>
        <div className="grid grid-cols-2 gap-4 md:gap-12">
          {leadership.map((leader, index) => (
            <div key={index} className="bg-white p-4 sm:p-6 rounded-xl border border-slate-200/80 shadow-sm flex flex-col items-center text-center space-y-4 hover:shadow-md transition-shadow">
              <img 
                src={leader.photo} 
                alt={leader.name} 
                className="h-20 sm:h-28 w-20 sm:w-28 rounded-xl object-cover shrink-0 border border-slate-200"
              />
              <div>
                <h3 className="font-serif text-sm sm:text-lg font-bold text-slate-900 leading-tight">{leader.name}</h3>
                <span className="text-[10px] sm:text-xs text-accent-500 font-bold uppercase tracking-wider block mb-2 sm:mb-3">
                  {leader.role}
                </span>
                <p className="text-[10px] sm:text-xs text-slate-500 leading-relaxed line-clamp-4">
                  {leader.bio}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 5. Timeline / Milestones Card Grid */}
      <section className="bg-slate-50 py-20 border-t border-b border-slate-200/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="text-accent-500 text-xs font-semibold tracking-widest uppercase block mb-2">Milestones</span>
            <h2 className="text-3xl font-serif font-bold text-slate-900">Our Journey of Excellence</h2>
            <p className="text-slate-500 text-xs mt-3 leading-relaxed">
              Key milestones demonstrating our commitment to quality, planning accuracy, and sustainable growth.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
            {milestones.map((m, idx) => (
              <div 
                key={idx} 
                className="bg-white rounded-xl border border-slate-200/80 shadow-sm overflow-hidden flex flex-col justify-between hover:border-accent-500/30 transition-all duration-300 transform hover:-translate-y-1 group"
              >
                {/* Accent Top Bar */}
                <div className="h-1.5 bg-gradient-to-r from-accent-400 to-accent-500 w-full" />
                
                <div className="p-4 sm:p-6 flex-grow flex flex-col justify-between">
                  <div>
                    <span className="text-2xl sm:text-3xl font-extrabold text-accent-555 block mb-1 sm:mb-2 tracking-wide font-sans group-hover:scale-105 origin-left transition-transform duration-300">
                      {m.year}
                    </span>
                    <h3 className="font-serif text-xs sm:text-base font-bold text-slate-900 mb-2 sm:mb-3">{m.title}</h3>
                    <p className="text-[10px] sm:text-xs text-slate-555 leading-relaxed font-sans font-light line-clamp-4">
                      {m.desc}
                    </p>
                  </div>
                  
                  {/* Subtle step count in footer */}
                  <div className="border-t border-slate-100 pt-3 sm:pt-4 mt-4 sm:mt-6 flex justify-between items-center text-[8px] sm:text-[10px] text-slate-400 font-bold uppercase tracking-wider">
                    <span>Phase</span>
                    <span>0{idx + 1}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. Certifications & Badges */}
      <section className="py-16 text-center max-w-7xl mx-auto px-4">
        <div className="bg-white rounded-xl border border-slate-200/80 p-8 shadow-sm">
          <Award className="h-10 w-10 text-accent-500 mx-auto mb-4" />
          <h3 className="font-serif text-lg font-bold text-slate-900 mb-2">Registered Turnkey Developer</h3>
          <p className="text-xs text-slate-500 max-w-lg mx-auto leading-relaxed mb-4">
            We adhere strictly to engineering guidelines, municipal approvals standards, and construction safety mandates.
          </p>
        </div>
      </section>
    </div>
  );
};

export default About;

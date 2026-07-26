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
      <section className="bg-slate-900 pt-32 pb-16 text-white text-center relative overflow-hidden border-b border-slate-850">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-slate-850 via-slate-900 to-black opacity-50" />
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
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="bg-slate-50 p-6 rounded-xl border border-slate-200/80 shadow-sm">
              <div className="p-3 bg-accent-500/10 rounded-lg text-accent-500 inline-block mb-4 border border-accent-500/20">
                <Target className="h-6 w-6" />
              </div>
              <h3 className="font-serif text-lg font-bold text-slate-900 mb-2">Our Mission</h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                {settings?.about?.mission || "To build high-value residential and commercial properties with absolute compliance, premium materials, and timely project delivery."}
              </p>
            </div>
            <div className="bg-slate-50 p-6 rounded-xl border border-slate-200/80 shadow-sm">
              <div className="p-3 bg-accent-500/10 rounded-lg text-accent-500 inline-block mb-4 border border-accent-500/20">
                <Eye className="h-6 w-6" />
              </div>
              <h3 className="font-serif text-lg font-bold text-slate-900 mb-2">Our Vision</h3>
              <p className="text-xs text-slate-500 leading-relaxed">
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
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {values.map((v, i) => (
              <div key={i} className="bg-white p-6 rounded-xl border border-slate-200/80 flex items-start space-x-4 shadow-sm">
                <div className="p-2.5 bg-accent-500/10 rounded-lg text-accent-500 shrink-0 border border-accent-500/20">
                  <v.icon className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-serif text-base font-bold text-slate-900 mb-2">{v.title}</h3>
                  <p className="text-xs text-slate-550 leading-relaxed">{v.desc}</p>
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
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {leadership.map((leader, index) => (
            <div key={index} className="bg-white p-6 rounded-xl border border-slate-200/80 shadow-sm flex flex-col sm:flex-row items-center sm:items-start space-y-6 sm:space-y-0 sm:space-x-6 hover:shadow-md transition-shadow">
              <img 
                src={leader.photo} 
                alt={leader.name} 
                className="h-28 w-28 rounded-xl object-cover shrink-0 border border-slate-200"
              />
              <div className="text-center sm:text-left">
                <h3 className="font-serif text-lg font-bold text-slate-900">{leader.name}</h3>
                <span className="text-xs text-accent-500 font-bold uppercase tracking-wider block mb-3">
                  {leader.role}
                </span>
                <p className="text-xs text-slate-500 leading-relaxed">
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

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {milestones.map((m, idx) => (
              <div 
                key={idx} 
                className="bg-white rounded-xl border border-slate-200/80 shadow-sm overflow-hidden flex flex-col justify-between hover:border-accent-500/30 transition-all duration-300 transform hover:-translate-y-1 group"
              >
                {/* Accent Top Bar */}
                <div className="h-1.5 bg-gradient-to-r from-accent-400 to-accent-500 w-full" />
                
                <div className="p-6 flex-grow flex flex-col justify-between">
                  <div>
                    <span className="text-3xl font-extrabold text-accent-500 block mb-2 tracking-wide font-sans group-hover:scale-105 origin-left transition-transform duration-300">
                      {m.year}
                    </span>
                    <h3 className="font-serif text-base font-bold text-slate-900 mb-3">{m.title}</h3>
                    <p className="text-xs text-slate-550 leading-relaxed font-sans font-light">
                      {m.desc}
                    </p>
                  </div>
                  
                  {/* Subtle step count in footer */}
                  <div className="border-t border-slate-100 pt-4 mt-6 flex justify-between items-center text-[10px] text-slate-400 font-bold uppercase tracking-wider">
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

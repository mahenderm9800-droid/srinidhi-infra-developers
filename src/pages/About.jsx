import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Target, Eye, ShieldCheck, Compass, Heart, Award, CheckCircle } from 'lucide-react';
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
    <div className="bg-slate-50 min-h-screen">
      {/* 1. Header Section */}
      <section className="bg-gradient-to-r from-emerald-800 to-emerald-950 pt-32 pb-16 text-white text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-slate-800 via-slate-900 to-slate-950 opacity-50" />
        <div className="relative z-10 max-w-4xl mx-auto px-4">
          <span className="text-accent-400 text-xs font-bold uppercase tracking-widest block mb-2">Our Story</span>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-white mb-4">About Srinidhi Infra Developers</h1>
          <p className="text-slate-350 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
            Building trust and premium structures across Hyderabad since 2014.
          </p>
        </div>
      </section>

      {/* 2. Brand Story, Mission & Vision */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h2 className="text-2xl md:text-3xl font-serif font-bold text-slate-950 border-b-2 border-accent-500 pb-3 inline-block">
              Our Journey
            </h2>
            <div className="text-slate-700 text-sm sm:text-base leading-relaxed space-y-4 whitespace-pre-line">
              {settings?.about?.story || "Loading our journey..."}
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
              <div className="p-3 bg-accent-500/10 rounded-lg text-accent-600 inline-block mb-4">
                <Target className="h-6 w-6" />
              </div>
              <h3 className="font-serif text-lg font-bold text-slate-900 mb-2">Our Mission</h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                {settings?.about?.mission || "Loading mission details..."}
              </p>
            </div>
            <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
              <div className="p-3 bg-accent-500/10 rounded-lg text-accent-600 inline-block mb-4">
                <Eye className="h-6 w-6" />
              </div>
              <h3 className="font-serif text-lg font-bold text-slate-900 mb-2">Our Vision</h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                {settings?.about?.vision || "Loading vision details..."}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Core Values */}
      <section className="bg-gradient-to-r from-emerald-900 to-emerald-950 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-emerald-300 text-xs font-semibold tracking-widest uppercase block mb-2">How We Operate</span>
            <h2 className="text-2xl md:text-3xl font-serif font-bold text-white">Our Core Values</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {values.map((v, i) => (
              <div key={i} className="bg-emerald-800/30 p-6 rounded-xl border border-emerald-700/30 flex items-start space-x-4">
                <div className="p-2.5 bg-emerald-500/10 rounded-lg text-emerald-300 shrink-0">
                  <v.icon className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-serif text-base font-bold text-white mb-2">{v.title}</h3>
                  <p className="text-xs text-emerald-100/80 leading-relaxed">{v.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Leadership Section */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-accent-500 text-xs font-semibold tracking-widest uppercase block mb-2">The Brains</span>
          <h2 className="text-2xl md:text-3xl font-serif font-bold text-slate-950">Our Leadership Team</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {leadership.map((leader, index) => (
            <div key={index} className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex flex-col sm:flex-row items-center sm:items-start space-y-6 sm:space-y-0 sm:space-x-6 hover:shadow-md transition-shadow">
              <img 
                src={leader.photo} 
                alt={leader.name} 
                className="h-28 w-28 rounded-xl object-cover shrink-0 border border-slate-200"
              />
              <div className="text-center sm:text-left">
                <h3 className="font-serif text-lg font-bold text-slate-900">{leader.name}</h3>
                <span className="text-xs text-accent-600 font-bold uppercase tracking-wider block mb-3">
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
      <section className="bg-slate-100 py-20 border-t border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="text-accent-500 text-xs font-semibold tracking-widest uppercase block mb-2">Milestones</span>
            <h2 className="text-3xl font-serif font-bold text-slate-950">Our Journey of Excellence</h2>
            <p className="text-slate-500 text-xs mt-3 leading-relaxed">
              Key milestones demonstrating our commitment to quality, planning accuracy, and sustainable growth.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {milestones.map((m, idx) => (
              <div 
                key={idx} 
                className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden flex flex-col justify-between hover:shadow-md hover:border-accent-500/35 transition-all duration-300 transform hover:-translate-y-1 group"
              >
                {/* Accent Top Bar */}
                <div className="h-1.5 bg-gradient-to-r from-accent-400 to-accent-500 w-full" />
                
                <div className="p-6 flex-grow flex flex-col justify-between">
                  <div>
                    <span className="text-3xl font-extrabold text-accent-600 block mb-2 tracking-wide font-sans group-hover:scale-105 origin-left transition-transform duration-300">
                      {m.year}
                    </span>
                    <h3 className="font-serif text-base font-bold text-slate-900 mb-3">{m.title}</h3>
                    <p className="text-xs text-slate-550 leading-relaxed font-sans">
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
        <div className="bg-white rounded-xl border border-slate-200 p-8 shadow-sm">
          <Award className="h-10 w-10 text-accent-500 mx-auto mb-4" />
          <h3 className="font-serif text-lg font-bold text-slate-900 mb-2">Registered RERA Developer</h3>
          <p className="text-xs text-slate-500 max-w-lg mx-auto leading-relaxed mb-4">
            All our ongoing and upcoming projects are strictly registered with the state authority (TS RERA), ensuring legal titles, safe investment structures, and timely construction.
          </p>
          <div className="flex items-center justify-center space-x-2 text-xs font-bold text-slate-700">
            <span>RERA Reg: PR0210001876</span>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;

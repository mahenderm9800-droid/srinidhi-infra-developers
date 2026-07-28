import React, { useState, useEffect } from 'react';
import { Target, Eye, ShieldCheck, Compass, Heart, Award } from 'lucide-react';
import { motion } from 'framer-motion';
import { getSettings, getLeadership, getMilestones } from '../services/db';
import PageHero from '../components/PageHero';

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
      <PageHero
        eyebrow="Our Story"
        title="About Us"
        image="/consulting.jpg"
        description="Crafting inspiring spaces built on quality, clarity, and trust."
      />


      {/* 2. Brand Story, Mission & Vision */}
      <section className="py-24 relative overflow-hidden bg-white border-b border-slate-200/60 premium-grid">
        {/* Subtle Background Image */}
        <div className="absolute inset-0 z-0 pointer-events-none">
          <img
            src="https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=1920&q=80"
            alt="Our Journey Background"
            className="w-full h-full object-cover object-center opacity-[0.03] scale-105"
          />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Glow Blob */}
          <div className="glow-blob w-80 h-80 bg-accent-400/10 top-0 left-0" />
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            <div className="lg:col-span-6 space-y-6">
              <span className="section-eyebrow mb-2">Our Journey</span>
              <h2 className="text-3xl md:text-5xl font-bold font-serif text-gradient leading-tight">
                Our Story
              </h2>
              <div className="h-1 w-20 bg-accent-500 rounded-full" />
              <div className="text-slate-600 text-sm sm:text-base leading-relaxed space-y-4 whitespace-pre-line font-normal">
                {settings?.about?.story || "At Srinidhi Infra Developers, we believe that constructing homes and business hubs is a sacred duty. We started our journey in Hyderabad with a simple goal: to provide high-quality, legally sound real estate that stands the test of time.\n\nOver the last decade, we have successfully developed premium residential townships, commercial workspaces, and highly profitable open layouts. By prioritizing strategic locations, utilizing premium building materials, and strictly complying with state mandates like RERA, we have earned the trust of thousands of clients."}
              </div>
            </div>
            
            <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="premium-card premium-card-hover card-sheen p-6 sm:p-8 flex flex-col items-start relative overflow-hidden group shadow-md shadow-slate-100/50">
                <div className="glow-blob w-32 h-32 bg-accent-500/10 -top-10 -right-10 group-hover:scale-125 transition-transform" />
                <div className="p-3 bg-accent-500/10 rounded-xl text-accent-600 mb-6 border border-accent-500/20 group-hover:bg-accent-500 group-hover:text-white transition-colors">
                  <Target className="h-6 w-6" />
                </div>
                <h3 className="font-serif text-lg font-bold text-slate-900 mb-3 group-hover:text-accent-600 transition-colors">Our Mission</h3>
                <p className="text-xs text-slate-600 leading-relaxed font-normal">
                  {settings?.about?.mission || "To build high-value residential and commercial properties with absolute compliance, premium materials, and timely project delivery."}
                </p>
              </div>
              
              <div className="premium-card premium-card-hover card-sheen p-6 sm:p-8 flex flex-col items-start relative overflow-hidden group shadow-md shadow-slate-100/50">
                <div className="glow-blob w-32 h-32 bg-primary-500/10 -top-10 -right-10 group-hover:scale-125 transition-transform" />
                <div className="p-3 bg-accent-500/10 rounded-xl text-accent-600 mb-6 border border-accent-500/20 group-hover:bg-accent-500 group-hover:text-white transition-colors">
                  <Eye className="h-6 w-6" />
                </div>
                <h3 className="font-serif text-lg font-bold text-slate-900 mb-3 group-hover:text-accent-600 transition-colors">Our Vision</h3>
                <p className="text-xs text-slate-600 leading-relaxed font-normal">
                  {settings?.about?.vision || "To be the most trusted infrastructure development brand, known for transparent dealings, quality engineering, and customer satisfaction."}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Core Values */}
      <section className="bg-slate-50/50 border-t border-b border-slate-200/60 text-slate-800 py-24 relative overflow-hidden premium-grid">
        {/* Glow Blob */}
        <div className="glow-blob w-96 h-96 bg-accent-400/10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="section-eyebrow mb-4">How We Operate</span>
            <h2 className="text-3xl md:text-5xl font-bold font-serif text-gradient">Our Core Values</h2>
            <div className="h-1 w-20 bg-accent-500 mx-auto mt-4 rounded-full" />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            {values.map((v, i) => (
              <div key={i} className="premium-card premium-card-hover card-sheen p-6 sm:p-8 flex flex-col sm:flex-row items-center sm:items-start text-center sm:text-left space-y-4 sm:space-y-0 sm:space-x-5 group">
                <div className="p-3 bg-accent-500/10 rounded-xl text-accent-600 shrink-0 border border-accent-500/20 group-hover:bg-accent-500 group-hover:text-white transition-colors">
                  <v.icon className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-serif text-base sm:text-lg font-bold text-slate-900 mb-2 group-hover:text-accent-600 transition-colors">{v.title}</h3>
                  <p className="text-xs text-slate-500 leading-relaxed font-light">{v.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Leadership Section */}
      <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative overflow-hidden bg-white">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="section-eyebrow mb-4">Management</span>
          <h2 className="text-3xl md:text-5xl font-bold font-serif text-gradient">Our Leadership Team</h2>
          <div className="h-1 w-20 bg-accent-500 mx-auto mt-4 rounded-full" />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-12">
          {leadership.map((leader, index) => (
            <div key={index} className="premium-card premium-card-hover card-sheen p-6 sm:p-8 flex flex-col sm:flex-row items-center sm:items-start text-center sm:text-left gap-6 group relative overflow-hidden">
              <div className="glow-blob w-32 h-32 bg-accent-500/5 -bottom-10 -right-10 group-hover:scale-125 transition-transform" />
              <img 
                src={leader.photo} 
                alt={leader.name} 
                className="h-28 sm:h-36 w-28 sm:w-36 rounded-2xl object-cover shrink-0 border border-slate-200 shadow-sm group-hover:scale-[1.02] transition-all duration-300"
              />
              <div className="flex-grow">
                <h3 className="font-serif text-lg font-bold text-slate-900 group-hover:text-accent-600 transition-colors leading-snug">{leader.name}</h3>
                <span className="text-[10px] sm:text-xs text-accent-600 font-bold uppercase tracking-wider block mt-1 mb-3">
                  {leader.role}
                </span>
                <p className="text-xs text-slate-500 leading-relaxed font-light line-clamp-4">
                  {leader.bio}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 5. Timeline / Milestones */}
      <section className="bg-slate-950 py-24 border-y border-slate-900 relative overflow-hidden text-white">
        {/* Attractive Background Image with Dark Overlay */}
        <div className="absolute inset-0 z-0 pointer-events-none">
          <img
            src="https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&w=1920&q=80"
            alt="Milestones Background"
            className="w-full h-full object-cover object-center opacity-5 scale-105"
          />
          <div className="absolute inset-0 bg-slate-950/98" />
        </div>

        {/* Glow Blobs */}
        <div className="glow-blob w-[500px] h-[500px] bg-accent-500/10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-0" />
        <div className="glow-blob w-80 h-80 bg-primary-500/10 top-0 right-0 z-0" />
        
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10"
        >
          <div className="text-center max-w-2xl mx-auto mb-20">
            <span className="text-accent-400 text-xs font-bold tracking-widest uppercase block mb-3">Milestones</span>
            <h2 className="text-3xl md:text-5xl font-bold font-serif text-white tracking-tight">Our Journey of Excellence</h2>
            <div className="h-1 w-20 bg-accent-500 mx-auto mt-4 rounded-full" />
            <p className="text-slate-300 text-sm mt-5 leading-relaxed font-normal">
              Key milestones demonstrating our commitment to quality, planning accuracy, and sustainable growth.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 relative z-10">
            {milestones.map((m, idx) => (
              <div 
                key={idx} 
                className="bg-slate-900/40 border border-white/5 p-6 rounded-none flex flex-col justify-between hover:bg-slate-900/70 hover:border-accent-500/20 transition-all duration-300 relative shadow-2xl shadow-black/20 group h-full"
              >
                <div>
                  {/* Year Badge (Sharp corners) */}
                  <div className="bg-slate-950 border border-white/10 rounded-none px-3.5 py-1.5 text-xl font-black text-accent-400 font-sans tracking-tight shrink-0 shadow-sm w-fit mb-4">
                    {m.year}
                  </div>
                  
                  <h3 className="font-serif text-sm sm:text-base font-bold text-white mb-2 transition-colors">
                    {m.title}
                  </h3>
                  <p className="text-xs text-slate-300 leading-relaxed font-normal">
                    {m.desc}
                  </p>
                </div>
                
                {/* Step count in footer */}
                <div className="border-t border-white/5 pt-4 mt-6 flex justify-between items-center text-[10px] text-slate-500 font-bold uppercase tracking-wider">
                  <span>Phase</span>
                  <span>0{idx + 1}</span>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
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

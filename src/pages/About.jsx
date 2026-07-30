import React, { useState, useEffect } from 'react';
import { Target, Eye, ShieldCheck, Compass, Heart, Award, User } from 'lucide-react';
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
    { title: "Transparency", desc: "Every agreement, calculation, and document is open for verification.", icon: Compass, image: "/value-transparency.png" },
    { title: "Quality Standards", desc: "No compromise on raw material grading, steel benchmarks, or concrete tests.", icon: ShieldCheck, image: "/value-quality.png" },
    { title: "Customer Centricity", desc: "Post-purchase customer care, maintenance assistance, and reliable handovers.", icon: Heart, image: "/value-customer.png" }
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
      <section className="relative overflow-hidden border-b border-amber-200/60 bg-[#fbf7ee]">
        <div className="grid min-h-[690px] lg:grid-cols-[49%_51%]">
          <div className="relative min-h-[340px] overflow-hidden lg:min-h-[690px] lg:rounded-br-[9rem]">
            <img
              src="/quality-construction.jpg"
              alt="Construction engineer overseeing a high-rise project"
              className="absolute inset-0 h-full w-full object-cover object-center"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[#061a32]/75 via-[#061a32]/35 to-[#061a32]/10" />
            <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[#061a32]/55 to-transparent" />
          </div>

          <div className="relative flex items-center bg-[#fbf7ee] px-5 py-12 sm:px-10 md:py-16 lg:-ml-20 lg:rounded-tl-[10rem] lg:rounded-bl-[3rem] lg:border-l-2 lg:border-amber-400 lg:px-20 xl:px-28">
            <div className="pointer-events-none absolute right-[-4rem] top-[-4rem] h-52 w-52 rounded-full border border-amber-300/30" />
            <div className="pointer-events-none absolute right-[-1rem] top-[-1rem] h-36 w-36 rounded-full border border-amber-300/25" />
            <div className="relative z-10 max-w-2xl">
              <span className="mb-5 inline-block text-xs font-bold uppercase tracking-[0.24em] text-amber-600">
                OUR STORY
              </span>
              <h2 className="font-serif text-4xl font-bold leading-[1.08] text-[#071a35] sm:text-5xl xl:text-6xl">
                Our Journey & Legacy
              </h2>
              <div className="my-7 h-1 w-16 rounded-full bg-amber-500" />
              <div className="whitespace-pre-line text-sm font-light leading-7 text-slate-600 sm:text-base sm:leading-8">
                {settings?.about?.story || "At Srinidhi Infra Developers, we believe that constructing homes and business hubs is a sacred duty. We started our journey in Hyderabad with a simple goal: to provide high-quality, legally sound real estate that stands the test of time.\n\nOver the last decade, we have successfully developed premium residential townships, commercial workspaces, and highly profitable open layouts. By prioritizing strategic locations, utilizing premium building materials, and strictly complying with state mandates like RERA, we have earned the trust of thousands of clients."}
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-amber-300/70 bg-[#fffaf1]">
          <div className="mx-auto grid max-w-7xl divide-y divide-amber-200/70 px-5 sm:px-8 md:grid-cols-2 md:divide-x md:divide-y-0 lg:px-10">
            <div className="flex gap-5 py-9 md:pr-10 lg:gap-7 lg:py-12">
              <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-amber-500/10 text-amber-600 ring-1 ring-amber-500/30">
                <Target className="h-8 w-8" strokeWidth={1.6} />
              </div>
              <div className="border-l-2 border-emerald-700 pl-5">
                <h3 className="font-serif text-2xl font-bold text-[#071a35]">Our Mission</h3>
                <p className="mt-3 text-sm font-light leading-6 text-slate-600">
                  {settings?.about?.mission || "To build high-value residential and commercial properties with absolute compliance, premium materials, and timely project delivery."}
                </p>
              </div>
            </div>

            <div className="flex gap-5 py-9 md:pl-10 lg:gap-7 lg:py-12">
              <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-amber-500/10 text-amber-600 ring-1 ring-amber-500/30">
                <Eye className="h-8 w-8" strokeWidth={1.6} />
              </div>
              <div className="border-l-2 border-emerald-700 pl-5">
                <h3 className="font-serif text-2xl font-bold text-[#071a35]">Our Vision</h3>
                <p className="mt-3 text-sm font-light leading-6 text-slate-600">
                  {settings?.about?.vision || "To be the most trusted infrastructure development brand, known for transparent dealings, quality engineering, and customer satisfaction."}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Core Values */}
      <section className="overflow-hidden bg-[#fbf7ee]">
        <div className="px-5 py-12 text-center sm:px-8 md:py-16">
          <span className="mb-3 inline-block text-xs font-bold uppercase tracking-[0.24em] text-amber-600">
            HOW WE OPERATE
          </span>
          <div className="mx-auto mb-4 h-0.5 w-14 bg-emerald-600" />
          <h2 className="font-serif text-4xl font-bold leading-tight text-[#071a35] sm:text-5xl lg:text-6xl">
            Our Core Values
          </h2>
        </div>

        <div className="grid md:grid-cols-3">
          {values.map((v, i) => (
            <article
              key={v.title}
              className="group relative min-h-[470px] overflow-hidden border-t border-white/70 md:min-h-[610px] md:border-l md:first:border-l-0"
            >
              <img
                src={v.image}
                alt=""
                className="absolute inset-0 h-full w-full object-cover object-center transition-transform duration-700 group-hover:scale-[1.035]"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#061a32]/20 to-[#061a32] transition-colors duration-500 group-hover:via-[#061a32]/30" />

              <div className="absolute inset-x-0 bottom-0 flex min-h-[58%] flex-col justify-end px-7 pb-10 pt-28 sm:px-10 md:px-8 lg:px-10 lg:pb-12">
                <div className="mb-5 flex items-center gap-4">
                  <span className="h-14 w-0.5 bg-emerald-500" />
                  <v.icon className="h-11 w-11 text-white" strokeWidth={1.5} />
                </div>
                <span className="text-4xl font-bold leading-none text-amber-500">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-3 font-serif text-2xl font-bold text-white lg:text-3xl">
                  {v.title}
                </h3>
                <p className="mt-3 max-w-sm text-sm font-light leading-6 text-white/80 sm:text-base sm:leading-7">
                  {v.desc}
                </p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="hidden py-10 md:py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Bordered card with image background — not full width */}
          <div className="relative rounded-3xl overflow-hidden border border-slate-200/60 shadow-xl">
            {/* Background Image inside the card */}
            <div className="absolute inset-0 z-0">
              <img
                src="/how-we-operate-bg.jpg"
                alt=""
                className="w-full h-full object-cover object-center"
              />
              <div className="absolute inset-0 bg-black/60" />
            </div>

            <div className="relative z-10 px-6 md:px-12 py-12 md:py-20">
              <div className="text-center max-w-2xl mx-auto mb-16">
                <span className="section-eyebrow text-blue-300 mb-4 inline-block tracking-widest text-xs font-bold uppercase">HOW WE OPERATE</span>
                <h2 className="text-3xl md:text-5xl font-bold font-serif text-white">Our Core Values</h2>
                <div className="h-1 w-20 bg-accent-500 mx-auto mt-4 rounded-full" />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {values.map((v, i) => (
                  <div key={i} className="relative rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 p-8 shadow-lg hover:bg-white/15 transition-all duration-300 flex flex-col items-center sm:items-start text-center sm:text-left group">
                    <div className="p-3.5 bg-white/10 rounded-xl text-white shrink-0 border border-white/20 group-hover:bg-accent-500 group-hover:border-accent-500 transition-colors duration-300 w-fit mb-6">
                      <v.icon className="h-6 w-6" />
                    </div>
                    <div>
                      <h3 className="font-serif text-lg font-bold text-white mb-2 group-hover:text-accent-300 transition-colors duration-300">{v.title}</h3>
                      <p className="text-xs sm:text-sm text-white/70 leading-relaxed font-light">{v.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>



      {/* 4. Leadership Section */}
      <section className="py-12 md:py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative overflow-hidden bg-white">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="section-eyebrow text-accent-500 mb-4 inline-block">MANAGEMENT</span>
          <h2 className="text-3xl md:text-5xl font-bold font-serif text-slate-900">Our Leadership Team</h2>
          <div className="h-1 w-20 bg-accent-500 mx-auto mt-4 rounded-full" />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
          {leadership.map((leader, index) => (
            <div key={index} className="relative rounded-3xl bg-slate-50 border border-slate-200/80 p-8 flex flex-col items-start text-left gap-4 group hover:shadow-md transition-all duration-300 overflow-hidden">
              <div className="absolute -bottom-12 -right-12 w-32 h-32 bg-accent-500/5 rounded-full group-hover:scale-125 transition-transform" />
              <div className="p-3 bg-amber-500/10 text-amber-700 rounded-xl border border-amber-500/20 font-bold text-xs">
                <User className="h-5 w-5 text-amber-600" />
              </div>
              <div className="flex-grow">
                <h3 className="font-serif text-xl font-bold text-slate-900 group-hover:text-amber-600 transition-colors duration-300 leading-snug">{leader.name}</h3>
                <span className="text-[10px] sm:text-xs text-amber-700 font-bold uppercase tracking-wider block mt-1 mb-3">
                  {leader.role}
                </span>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-light">
                  {leader.bio}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 5. Timeline / Milestones */}
      <section className="py-10 md:py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative rounded-3xl border border-slate-800 shadow-2xl overflow-hidden bg-slate-950 text-white p-6 sm:p-10 md:p-16">
            {/* Tech Grid Pattern inside the section */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-20 pointer-events-none" />
            
            {/* Glow Blobs */}
            <div className="absolute -top-24 -right-24 w-80 h-80 bg-accent-500/10 rounded-full blur-3xl" />
            <div className="absolute -bottom-24 -left-24 w-80 h-80 bg-primary-500/10 rounded-full blur-3xl" />
            
            <motion.div 
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8 }}
              className="relative z-10"
            >
              <div className="text-center max-w-2xl mx-auto mb-20">
                <span className="text-accent-400 text-xs font-bold tracking-widest uppercase block mb-3">MILESTONES</span>
                <h2 className="text-3xl md:text-5xl font-bold font-serif text-white tracking-tight">Our Journey of Excellence</h2>
                <div className="h-1 w-20 bg-accent-500 mx-auto mt-4 rounded-full" />
                <p className="text-slate-300 text-sm sm:text-base mt-5 leading-relaxed font-light">
                  Key milestones demonstrating our commitment to quality, planning accuracy, and sustainable growth.
                </p>
              </div>

              <div className="relative">
                {/* Connecting line */}
                <div className="absolute top-1/2 left-0 right-0 h-[2px] bg-slate-800/80 -translate-y-1/2 hidden md:block z-0" />
                
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 relative z-10">
                  {milestones.map((m, idx) => (
                    <div 
                      key={idx} 
                      className="bg-slate-900/40 backdrop-blur-md border border-white/5 p-6 rounded-2xl flex flex-col justify-between hover:bg-slate-900/75 hover:border-accent-500/30 transition-all duration-300 relative shadow-2xl hover:-translate-y-2 group h-full"
                    >
                      {/* Floating glow bubble on hover */}
                      <div className="absolute -top-10 -right-10 w-24 h-24 bg-accent-500/5 rounded-full blur-2xl group-hover:bg-accent-500/10 transition-all duration-300 pointer-events-none" />

                      <div>
                        {/* Node connector dot on top of connecting line */}
                        <div className="hidden md:flex absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 items-center justify-center">
                          <div className="w-8 h-8 rounded-full bg-slate-950 border-2 border-slate-800 flex items-center justify-center group-hover:border-accent-500 transition-colors duration-300">
                            <div className="w-2.5 h-2.5 rounded-full bg-slate-700 group-hover:bg-accent-500 transition-colors duration-300" />
                          </div>
                        </div>

                        {/* Year Badge */}
                        <div className="bg-gradient-to-r from-accent-600 to-accent-500 rounded-lg px-3.5 py-1 text-sm font-black text-white font-sans tracking-tight shrink-0 shadow-md w-fit mb-4 mt-2">
                          {m.year}
                        </div>
                        
                        <h3 className="font-serif text-base font-bold text-white mb-2 transition-colors group-hover:text-accent-400">
                          {m.title}
                        </h3>
                        <p className="text-xs text-slate-400 leading-relaxed font-light">
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
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 6. Certifications & Badges */}
      <section className="py-12 md:py-20 text-center max-w-7xl mx-auto px-4">
        <div className="relative rounded-3xl bg-slate-50 border border-slate-200/80 p-8 md:p-12 overflow-hidden shadow-sm max-w-4xl mx-auto">
          <div className="absolute -top-12 -left-12 w-32 h-32 bg-accent-500/5 rounded-full" />
          <div className="p-4 bg-accent-500/10 rounded-2xl text-accent-600 border border-accent-500/20 w-fit mx-auto mb-6">
            <Award className="h-10 w-10" />
          </div>
          <h3 className="font-serif text-2xl font-bold text-slate-900 mb-3">Registered Turnkey Developer</h3>
          <p className="text-xs sm:text-sm text-slate-505 max-w-xl mx-auto leading-relaxed">
            We adhere strictly to engineering guidelines, municipal approvals standards, and construction safety mandates to deliver state-of-the-art living environments.
          </p>
        </div>
      </section>
    </div>
  );
};

export default About;

import React from 'react';
import { motion } from 'framer-motion';
import { 
  Building2, PenTool, Layout, ClipboardList, HardHat, RefreshCw, 
  MapPin, CheckCircle, ShieldCheck, Cpu, Droplets, Volume2 
} from 'lucide-react';

const Services = () => {
  const competencies = [
    {
      title: "Building Constructions",
      desc: "From residential villas to commercial workspaces, we construct high-performance environments with structured civil protocols and quality check audits.",
      icon: Building2
    },
    {
      title: "Architectural Design",
      desc: "Vastu-compliant layouts, spatial flow mapping, and detailed construction documentation delivered by our core design pods.",
      icon: PenTool
    },
    {
      title: "Interiors & Styling",
      desc: "Premium residential styling, modular kitchens, custom cabinetry, corporate flooring layouts, and lighting automation.",
      icon: Layout
    },
    {
      title: "PMC (Project Management Consultancy)",
      desc: "Complete project governance from cost estimation and BOQ preparation to scheduling, timeline management, and snag resolution.",
      icon: ClipboardList
    },
    {
      title: "Engineering & Contracting",
      desc: "Structured steel drafting, high-grade concrete casting, MEP coordination, and site safety management under strict supervision.",
      icon: HardHat
    },
    {
      title: "Renovation & Remodeling",
      desc: "Modernizing vintage spaces, structural restoration, damp treatment, space resizing, and cosmetic renewals.",
      icon: RefreshCw
    }
  ];

  const workflow = [
    { step: "01", name: "Discovery & Brief", desc: "Initial consultations, vastu checklist planning, site validation audits, and investment allocations mapping." },
    { step: "02", name: "Design Development", desc: "Reviewing 2D sketches, 3D renders, mood boards, MEP scheduling, and final structural analysis approval." },
    { step: "03", name: "Project Mobilisation", desc: "Preparing detailed BOQs, procurement workflows, trade scheduling, safety audits setup, and vendor check-ins." },
    { step: "04", name: "Execution & QA", desc: "On-site supervision, daily reports, civil quality audits, and structural checks during key phases." },
    { step: "05", name: "Handover & Support", desc: "Final checklist audits, snag clearance, manual handovers, and structured post-project maintenance packages." }
  ];

  const addons = [
    { name: "MEP Design & Coordination", icon: ShieldCheck },
    { name: "Smart Home Automation", icon: Cpu },
    { name: "Landscape & Exterior design", icon: Droplets },
    { name: "Acoustic & Audio-Visual integration", icon: Volume2 }
  ];

  const cities = [
    "Hyderabad", "Secunderabad", "Kapra", "Gachibowli", "Madhapur", "Miyapur", "Kondapur"
  ];

  return (
    <div className="bg-white min-h-screen text-slate-800 font-sans">
      {/* Hero Banner */}
      <PageHero
        eyebrow="Capabilities"
        title="Srinidhi Services"
        image="https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&w=1600&q=80"
        description="Complete design-build solutions covering architecture, interiors, civil contracting, and smart amenities."
      />


      {/* Competencies Grid */}
      <section className="py-24 bg-slate-950 border-y border-slate-900 relative overflow-hidden text-white">
        {/* Dark Grid Overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#0f172a_1px,transparent_1px),linear-gradient(to_bottom,#0f172a_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-30 z-0" />

        {/* Glow Blobs */}
        <div className="glow-blob w-[500px] h-[500px] bg-accent-500/10 top-0 left-0" />
        <div className="glow-blob w-[500px] h-[500px] bg-emerald-500/5 bottom-0 right-0" />

        {/* Geometric Compass SVG Background Illustration */}
        <div className="absolute right-0 top-1/2 -translate-y-1/2 opacity-[0.015] pointer-events-none translate-x-12 z-0">
          <svg width="400" height="400" viewBox="0 0 100 100" fill="none" stroke="currentColor" className="text-accent-400">
            <circle cx="50" cy="50" r="40" strokeWidth="0.5" />
            <circle cx="50" cy="50" r="30" strokeWidth="0.25" />
            <line x1="50" y1="5" x2="50" y2="95" strokeWidth="0.5" strokeDasharray="1 1" />
            <line x1="5" y1="50" x2="95" y2="50" strokeWidth="0.5" strokeDasharray="1 1" />
            <polygon points="50,20 54,46 80,50 54,54 50,80 46,54 20,50 46,46" strokeWidth="0.5" />
          </svg>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {competencies.map((comp, idx) => (
              <div key={idx} className="bg-slate-900/50 border border-white/5 backdrop-blur-md rounded-2xl p-8 hover:bg-slate-900/80 hover:border-accent-500/30 hover:shadow-2xl hover:shadow-accent-500/5 hover:-translate-y-1.5 transition-all duration-300 flex flex-col items-start group">
                <div className="p-3.5 bg-accent-500/10 rounded-xl text-accent-400 mb-6 border border-accent-500/20 group-hover:bg-accent-500 group-hover:text-white group-hover:scale-110 transition-all duration-300 shadow-sm">
                  <comp.icon className="h-6 w-6" />
                </div>
                <h3 className="font-serif text-lg font-bold mb-3 text-white group-hover:text-accent-400 transition-colors">{comp.title}</h3>
                <p className="text-xs sm:text-sm text-slate-200 leading-relaxed font-light">{comp.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Workflow Section */}
      <section 
        className="bg-slate-50/50 border-t border-b border-slate-200/60 py-24 relative overflow-hidden premium-grid"
      >
        {/* Subtle trace grid in background */}
        <div className="absolute left-0 bottom-0 opacity-[0.02] pointer-events-none translate-x-4 translate-y-4 z-0">
          <svg width="250" height="250" viewBox="0 0 100 100" fill="none" stroke="currentColor" className="text-slate-900">
            <rect x="10" y="10" width="80" height="80" strokeWidth="0.5" />
            <line x1="10" y1="10" x2="90" y2="90" strokeWidth="0.5" />
            <line x1="90" y1="10" x2="10" y2="90" strokeWidth="0.5" />
          </svg>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-accent-600 text-xs font-bold tracking-widest uppercase block mb-3">The Process</span>
            <h2 className="text-3xl md:text-5xl font-bold font-serif text-gradient">Our Execution Workflow</h2>
            <div className="h-1 w-20 bg-accent-500 mx-auto mt-4 rounded-full" />
            <p className="text-slate-500 text-sm mt-5 leading-relaxed font-light">
              Structured workflows ensure precision, predictability, and complete peace of mind.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
            {workflow.map((w, idx) => (
              <div key={idx} className="premium-card premium-card-hover p-6 flex flex-col justify-between group relative overflow-hidden">
                <div className="glow-blob w-24 h-24 bg-accent-500/5 -bottom-10 -right-10 group-hover:scale-125 transition-transform" />
                <div>
                  <span className="text-3xl font-black text-accent-500/20 block mb-4 group-hover:text-accent-500/30 transition-colors font-sans">{w.step}</span>
                  <h3 className="text-sm sm:text-base font-bold text-slate-900 mb-2 group-hover:text-accent-600 transition-colors">{w.name}</h3>
                  <p className="text-xs text-slate-500 leading-relaxed font-light">{w.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Addons & Complementary Services */}
      <section 
        className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 bg-white relative overflow-hidden premium-grid"
      >
        {/* Drafting protractor vector illustration */}
        <div className="absolute left-0 top-1/2 -translate-y-1/2 opacity-[0.02] pointer-events-none -translate-x-12 z-0">
          <svg width="350" height="350" viewBox="0 0 100 100" fill="none" stroke="currentColor" className="text-accent-500">
            <path d="M 10 50 A 40 40 0 0 1 90 50 Z" strokeWidth="0.5" />
            <line x1="10" y1="50" x2="90" y2="50" strokeWidth="0.5" />
            <line x1="50" y1="10" x2="50" y2="50" strokeWidth="0.5" />
            <circle cx="50" cy="50" r="5" strokeWidth="0.5" />
          </svg>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
          <div className="lg:col-span-5 space-y-4">
            <span className="text-accent-600 text-xs font-bold tracking-widest uppercase block">Extended Capabilities</span>
            <h2 className="text-3xl md:text-4xl font-bold font-serif text-gradient mb-4">Complementary Expertise</h2>
            <div className="h-1 w-20 bg-accent-500 mt-4 mb-6 rounded-full" />
            <p className="text-slate-500 text-sm leading-relaxed font-light">
              We coordinate technical parameters such as MEP structures, interior acoustics, and landscape irrigation to deliver comprehensive design-build envelopes under one consolidated management team.
            </p>
          </div>
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
            {addons.map((a, i) => (
              <div key={i} className="premium-card premium-card-hover p-5 flex flex-col sm:flex-row items-center sm:items-start text-center sm:text-left space-y-3 sm:space-y-0 sm:space-x-4 group">
                <div className="p-3 bg-accent-500/10 rounded-xl text-accent-600 shrink-0 border border-accent-500/20 group-hover:bg-accent-500 group-hover:text-white transition-colors">
                  <a.icon className="h-5 w-5" />
                </div>
                <span className="text-xs font-semibold text-slate-800 mt-2.5 sm:mt-1.5">{a.name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footprint Section */}
      <section className="bg-slate-900 text-white border-t border-slate-800 py-16 text-center">
        <div className="max-w-4xl mx-auto px-4">
          <MapPin className="h-10 w-10 text-accent-500 mx-auto mb-4" />
          <h3 className="font-serif text-xl font-bold text-white mb-2">Our Operational Footprint</h3>
          <p className="text-xs text-slate-350 max-w-lg mx-auto leading-relaxed mb-6">
            Providing premium design, engineering, and interior executions across major locations in Telangana.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            {cities.map((city, idx) => (
              <span key={idx} className="bg-white/5 border border-white/5 text-slate-300 text-xs px-4 py-2 rounded-full">
                {city}
              </span>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Services;

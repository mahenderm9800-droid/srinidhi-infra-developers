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
      <section className="relative pt-32 pb-16 text-white text-center overflow-hidden border-b border-slate-800 bg-slate-900">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&w=1200&q=80" 
            alt="Construction Site Background" 
            className="w-full h-full object-cover opacity-35"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-slate-900/40 to-transparent" />
        </div>
        <div className="relative z-10 max-w-4xl mx-auto px-4">
          <span className="text-accent-500 text-xs font-bold uppercase tracking-widest block mb-2">Capabilities</span>
          <h1 className="text-4xl sm:text-5xl font-serif font-bold text-white mb-4">Srinidhi Services</h1>
          <p className="text-slate-355 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
            Complete design-build solutions covering architecture, interiors, civil contracting, and smart amenities.
          </p>
        </div>
      </section>

      {/* Competencies Grid */}
      <section 
        className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative overflow-hidden bg-white"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='30' height='30' viewBox='0 0 30 30' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 30h30M30 0v30' fill='none' stroke='rgba(4,120,87,0.015)' stroke-width='1'/%3E%3C/svg%3E")`
        }}
      >
        {/* Geometric Compass SVG Background Illustration */}
        <div className="absolute right-0 top-1/2 -translate-y-1/2 opacity-[0.025] pointer-events-none translate-x-12 z-0">
          <svg width="400" height="400" viewBox="0 0 100 100" fill="none" stroke="currentColor" className="text-accent-500">
            <circle cx="50" cy="50" r="40" strokeWidth="0.5" />
            <circle cx="50" cy="50" r="30" strokeWidth="0.25" />
            <line x1="50" y1="5" x2="50" y2="95" strokeWidth="0.5" strokeDasharray="1 1" />
            <line x1="5" y1="50" x2="95" y2="50" strokeWidth="0.5" strokeDasharray="1 1" />
            <polygon points="50,20 54,46 80,50 54,54 50,80 46,54 20,50 46,46" strokeWidth="0.5" />
          </svg>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-6 gap-4 sm:gap-8 relative z-10">
          {competencies.map((comp, idx) => (
            <div key={idx} className="bg-white p-4 sm:p-8 rounded-xl border border-slate-200/80 flex flex-col items-start hover:border-accent-500/30 hover:shadow-lg transition-all duration-300 shadow-sm">
              <div className="p-3 bg-accent-500/10 rounded-lg text-accent-500 mb-4 sm:mb-6 border border-accent-500/20">
                <comp.icon className="h-6 w-6" />
              </div>
              <h3 className="font-serif text-base sm:text-lg font-bold mb-2 sm:mb-3 text-slate-900">{comp.title}</h3>
              <p className="text-[11px] sm:text-xs text-slate-505 leading-relaxed">{comp.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Workflow Section */}
      <section 
        className="bg-slate-50 border-t border-b border-slate-200/60 py-20 relative overflow-hidden"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='20' height='20' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'%3E%3Ccircle cx='2' cy='2' r='1' fill='rgba(4,120,87,0.015)'/%3E%3C/svg%3E")`
        }}
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
            <span className="text-accent-500 text-xs font-semibold tracking-widest uppercase block mb-2">The Process</span>
            <h2 className="text-3xl font-serif font-bold text-slate-900">Our Execution Workflow</h2>
            <p className="text-slate-500 text-xs mt-3 leading-relaxed">
              Structured workflows ensure precision, predictability, and complete peace of mind.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 md:gap-6">
            {workflow.map((w, idx) => (
              <div key={idx} className="bg-white p-4 sm:p-6 rounded-xl border border-slate-200/80 flex flex-col justify-between hover:border-accent-500/20 hover:shadow-md transition-all duration-205">
                <div>
                  <span className="text-2xl sm:text-3xl font-extrabold text-accent-500/20 block mb-3 sm:mb-4">{w.step}</span>
                  <h3 className="text-sm sm:text-base font-bold text-slate-900 mb-1 sm:mb-2">{w.name}</h3>
                  <p className="text-[10px] sm:text-xs text-slate-505 leading-relaxed font-light">{w.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Addons & Complementary Services */}
      <section 
        className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 bg-white relative overflow-hidden"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 40h40M40 0v40' fill='none' stroke='rgba(4,120,87,0.015)' stroke-width='1'/%3E%3C/svg%3E")`
        }}
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

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative z-10">
          <div>
            <span className="text-accent-500 text-xs font-semibold tracking-widest uppercase block mb-2">Extended Capabilities</span>
            <h2 className="text-3xl font-serif font-bold text-slate-900 mb-4">Complementary Expertise</h2>
            <p className="text-sm text-slate-550 leading-relaxed">
              We coordinate technical parameters such as MEP structures, interior acoustics, and landscape irrigation to deliver comprehensive design-build envelopes under one consolidated management team.
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
            {addons.map((a, i) => (
              <div key={i} className="bg-slate-50 p-4 sm:p-6 rounded-xl border border-slate-200/80 flex flex-col sm:flex-row items-center sm:items-start text-center sm:text-left space-y-3 sm:space-y-0 sm:space-x-4">
                <div className="p-2 sm:p-2.5 bg-accent-500/10 rounded-lg text-accent-500 shrink-0 border border-accent-500/20">
                  <a.icon className="h-5 w-5" />
                </div>
                <span className="text-[10px] sm:text-xs font-medium text-slate-800">{a.name}</span>
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

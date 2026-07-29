import React from 'react';
import { motion } from 'framer-motion';
import { 
  Building2, PenTool, Layout, ClipboardList, HardHat, RefreshCw, 
  MapPin, CheckCircle, ShieldCheck, Cpu, Droplets, Volume2 
} from 'lucide-react';
import PageHero from '../components/PageHero';

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
      <section className="relative overflow-hidden py-16 md:py-24 bg-gradient-to-br from-white via-slate-50 to-accent-50/40">
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent-400/60 to-transparent" />
        <div className="absolute inset-0 opacity-[0.06] bg-[linear-gradient(to_right,#0f172a_1px,transparent_1px),linear-gradient(to_bottom,#0f172a_1px,transparent_1px)] bg-[size:3.5rem_3.5rem] [mask-image:radial-gradient(ellipse_70%_60%_at_50%_0%,#000_60%,transparent_100%)]" />
        <div className="absolute -top-24 -left-24 w-[420px] h-[420px] rounded-full bg-accent-400/10 blur-3xl" />
        <div className="absolute -bottom-32 -right-24 w-[420px] h-[420px] rounded-full bg-emerald-400/10 blur-3xl" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12 md:mb-16">
            <span className="block text-accent-600 text-[11px] sm:text-xs font-semibold uppercase tracking-[0.35em] mb-4">What We Do</span>
            <h2 className="text-3xl md:text-5xl font-extrabold font-serif uppercase text-slate-900 leading-tight">
              Core <span className="bg-gradient-to-r from-accent-600 to-emerald-500 bg-clip-text text-transparent">Competencies</span>
            </h2>
            <p className="text-slate-600 text-sm mt-5 leading-relaxed">
              Design-build capabilities delivered end to end, with structured civil protocols and quality audits at every stage.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-7">
            {competencies.map((comp, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.5, delay: idx * 0.06 }}
                className="group relative bg-white/80 backdrop-blur-sm border border-slate-200/80 rounded-2xl p-7 shadow-sm hover:shadow-xl hover:shadow-accent-500/10 hover:border-accent-400/50 hover:-translate-y-1.5 transition-all duration-300"
              >
                <div className="absolute inset-x-7 top-0 h-px bg-gradient-to-r from-transparent via-accent-400/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="p-3.5 w-fit bg-accent-500/10 rounded-xl text-accent-600 mb-6 border border-accent-500/20 group-hover:bg-gradient-to-br group-hover:from-accent-500 group-hover:to-emerald-500 group-hover:text-white group-hover:border-transparent transition-all duration-300">
                  <comp.icon className="h-6 w-6" />
                </div>
                <h3 className="font-serif text-lg font-bold mb-3 text-slate-900 group-hover:text-accent-700 transition-colors">{comp.title}</h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">{comp.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Workflow Section */}
      <section className="relative overflow-hidden py-16 md:py-24 bg-gradient-to-bl from-white via-slate-50 to-accent-50/40">
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent-400/60 to-transparent" />
        <div className="absolute inset-0 opacity-[0.05] bg-[repeating-linear-gradient(45deg,#0f172a_0px,#0f172a_1px,transparent_1px,transparent_14px)]" />
        <div className="absolute top-1/3 -right-32 w-[460px] h-[460px] rounded-full bg-accent-400/10 blur-3xl" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12 md:mb-16">
            <span className="block text-accent-600 text-[11px] sm:text-xs font-semibold uppercase tracking-[0.35em] mb-4">The Process</span>
            <h2 className="text-3xl md:text-5xl font-extrabold font-serif uppercase text-slate-900 leading-tight">
              Our Execution <span className="bg-gradient-to-r from-accent-600 to-emerald-500 bg-clip-text text-transparent">Workflow</span>
            </h2>
            <p className="text-slate-600 text-sm mt-5 leading-relaxed">
              Structured workflows ensure precision, predictability, and complete peace of mind.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5 sm:gap-6">
            {workflow.map((w, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.5, delay: idx * 0.07 }}
                className="group relative bg-white/85 backdrop-blur-sm border border-slate-200/80 rounded-2xl p-6 shadow-sm hover:shadow-xl hover:shadow-accent-500/10 hover:border-accent-400/50 hover:-translate-y-1.5 transition-all duration-300 overflow-hidden"
              >
                <span className="text-4xl font-black bg-gradient-to-br from-accent-500/30 to-emerald-500/20 bg-clip-text text-transparent block mb-4 font-sans">{w.step}</span>
                <h3 className="text-sm sm:text-base font-bold text-slate-900 mb-2 group-hover:text-accent-700 transition-colors">{w.name}</h3>
                <p className="text-xs text-slate-600 leading-relaxed">{w.desc}</p>
              </motion.div>
            ))}
          </div>

          {/* Construction Site Execution Banner */}
          <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="relative rounded-2xl overflow-hidden shadow-md border border-slate-200/80 group h-56">
              <img
                src="https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&w=800&q=80"
                alt="Structural RCC Casting & Steel Framework"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent p-5 flex flex-col justify-end">
                <span className="text-accent-400 text-[10px] font-bold uppercase tracking-wider">Civil Engineering</span>
                <h4 className="text-white text-sm font-bold font-serif">Structural RCC Casting & TMT Steel Framing</h4>
              </div>
            </div>

            <div className="relative rounded-2xl overflow-hidden shadow-md border border-slate-200/80 group h-56">
              <img
                src="https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=800&q=80"
                alt="Architectural Blueprint & On-Site Audits"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent p-5 flex flex-col justify-end">
                <span className="text-accent-400 text-[10px] font-bold uppercase tracking-wider">Site Governance</span>
                <h4 className="text-white text-sm font-bold font-serif">Detailed Blueprinting & Quality Audits</h4>
              </div>
            </div>

            <div className="relative rounded-2xl overflow-hidden shadow-md border border-slate-200/80 group h-56">
              <img
                src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80"
                alt="Turnkey Luxury Finishing & Handover"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent p-5 flex flex-col justify-end">
                <span className="text-accent-400 text-[10px] font-bold uppercase tracking-wider">Turnkey Delivery</span>
                <h4 className="text-white text-sm font-bold font-serif">Residential Gated Township Handover</h4>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Addons & Complementary Services */}
      <section className="relative overflow-hidden py-16 md:py-24 bg-gradient-to-br from-white via-slate-50 to-emerald-50/40">
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent-400/60 to-transparent" />
        <div className="absolute inset-0 opacity-[0.06] bg-[linear-gradient(to_right,#0f172a_1px,transparent_1px),linear-gradient(to_bottom,#0f172a_1px,transparent_1px)] bg-[size:3.5rem_3.5rem] [mask-image:radial-gradient(ellipse_70%_60%_at_50%_100%,#000_60%,transparent_100%)]" />
        <div className="absolute -bottom-24 -left-24 w-[420px] h-[420px] rounded-full bg-emerald-400/10 blur-3xl" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
            <div className="lg:col-span-5">
              <span className="block text-accent-600 text-[11px] sm:text-xs font-semibold uppercase tracking-[0.35em] mb-4">Extended Capabilities</span>
              <h2 className="text-3xl md:text-4xl font-extrabold font-serif uppercase text-slate-900 leading-tight mb-5">
                Complementary <span className="bg-gradient-to-r from-accent-600 to-emerald-500 bg-clip-text text-transparent">Expertise</span>
              </h2>
              <p className="text-slate-600 text-sm leading-relaxed">
                We coordinate technical parameters such as MEP structures, interior acoustics, and landscape irrigation to deliver comprehensive design-build envelopes under one consolidated management team.
              </p>
            </div>
            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
              {addons.map((a, i) => (
                <div key={i} className="group bg-white/85 backdrop-blur-sm border border-slate-200/80 rounded-2xl p-5 flex items-center gap-4 shadow-sm hover:shadow-lg hover:shadow-accent-500/10 hover:border-accent-400/50 hover:-translate-y-1 transition-all duration-300">
                  <div className="p-3 bg-accent-500/10 rounded-xl text-accent-600 shrink-0 border border-accent-500/20 group-hover:bg-gradient-to-br group-hover:from-accent-500 group-hover:to-emerald-500 group-hover:text-white group-hover:border-transparent transition-all">
                    <a.icon className="h-5 w-5" />
                  </div>
                  <span className="text-xs sm:text-sm font-semibold text-slate-800">{a.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Footprint Section */}
      <section className="relative overflow-hidden py-16 md:py-24 bg-gradient-to-b from-white to-slate-50">
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent-400/60 to-transparent" />
        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="p-3.5 w-fit mx-auto bg-accent-500/10 rounded-xl text-accent-600 border border-accent-500/20 mb-5">
            <MapPin className="h-6 w-6" />
          </div>
          <h3 className="text-2xl md:text-4xl font-extrabold font-serif uppercase text-slate-900 mb-4">
            Our Operational <span className="bg-gradient-to-r from-accent-600 to-emerald-500 bg-clip-text text-transparent">Footprint</span>
          </h3>
          <p className="text-sm text-slate-600 max-w-lg mx-auto leading-relaxed mb-8">
            Providing premium design, engineering, and interior executions across major locations in Telangana.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            {cities.map((city, idx) => (
              <span key={idx} className="bg-white border border-slate-200 text-slate-700 text-xs font-medium px-5 py-2.5 rounded-full shadow-sm hover:border-accent-400/60 hover:text-accent-700 transition-colors">
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

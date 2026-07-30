import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { 
  Building2, ShieldCheck, Calendar, FileText, 
  ArrowRight, Award, MapPin, Users, Key, Star, Sparkles,
  PenTool, Layout, Calculator, Check, X, Maximize2
} from 'lucide-react';
import { getTestimonials, getPosts, getSettings } from '../services/db';

const Home = () => {
  const [testimonials, setTestimonials] = useState([]);
  const [posts, setPosts] = useState([]);
  const [settings, setSettings] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedWork, setSelectedWork] = useState(null);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [tests, pts, sets] = await Promise.all([
          getTestimonials(),
          getPosts(),
          getSettings()
        ]);
        setTestimonials(tests);
        setPosts(pts.slice(0, 2)); // show first 2
        setSettings(sets);
      } catch (err) {
        console.error("Error loading home page data", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const [activeTab, setActiveTab] = useState(0);
  
  // Tab 0: Civil Construction Calculator States
  const [constArea, setConstArea] = useState(2500);
  const [constPkg, setConstPkg] = useState('premium');
  
  // Tab 1: Architectural Design Calculator States
  const [archPlot, setArchPlot] = useState(250);
  const [archPkg, setArchPkg] = useState('standard');
  
  // Tab 2: Interiors & Styling Calculator States
  const [intRooms, setIntRooms] = useState('3bhk');
  const [intPkg, setIntPkg] = useState('luxury');

  const constRates = {
    premium: 1999,
    standard: 1699
  };

  const constSpecs = {
    premium: ["TATA / JSW Steel Grade", "Ultratech Cement", "1st Class Red Bricks", "Flooring Rs.110/sft", "Kohler/Jaguar Fittings"],
    standard: ["TATA / JSW / Shree Steel", "Ultratech / Birla Cement", "Karimnagar Red Bricks", "Flooring Rs.75/sft", "Cera/Parryware Fittings"]
  };

  const archRates = {
    basic: 45,
    standard: 95,
    premium: 180
  };

  const archSpecs = {
    basic: ["2D Spatial Floorplans", "3D Front Elevation Render", "Structural Column Drawings", "Plumbing & Electrical Drafts"],
    standard: ["All Basic Package details", "3D Exterior walkthrough", "Bespoke ceiling layouts", "Liaisoning documentation support"],
    premium: ["All Standard Package details", "Detailed VR Walkthrough", "Bespoke Landscaping details", "Soil test & foundation review"]
  };

  const intRates = {
    premium: { '2bhk': 4.5, '3bhk': 6.2, 'villa': 10.5 },
    luxury: { '2bhk': 6.8, '3bhk': 8.5, 'villa': 15.0 },
    ultra: { '2bhk': 9.5, '3bhk': 12.8, 'villa': 22.0 }
  };

  const intSpecs = {
    premium: ["Modular Laminate Kitchen", "Standard MDF Wardrobes", "Gypsum Board False Ceiling", "LED Profile Spotlights"],
    luxury: ["Acrylic finish modular kitchen", "Hettich soft-close hardware", "Veneer finish wardrobes", "Designer false ceiling accents"],
    ultra: ["PU-lacquer modular kitchen", "Blum motion sensor hardware", "Premium walk-in glass wardrobes", "Automation integrated lighting"]
  };

  useEffect(() => {
    if (testimonials.length === 0) return;
    const timer = setInterval(() => {
      setActiveTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [testimonials.length]);

  const stats = [
    { value: settings?.stats?.experience || '12+', label: 'Years Experience', icon: Award },
    { value: settings?.stats?.projects || '120+', label: 'Projects Completed', icon: Building2 },
    { value: settings?.stats?.developed || '160+', label: 'Turnkey Projects', icon: Key },
    { value: settings?.stats?.families || '100+', label: 'Happy Clients', icon: Users },
  ];

  const features = [
    {
      title: "Building Constructions",
      desc: "From residential villas to commercial workspaces, we construct high-performance environments with structured civil protocols and quality audits.",
      icon: Building2,
      points: [
        "Residential Villas & Communities",
        "Commercial Blocks & Workspaces",
        "High-Grade Material Procurement",
        "Civil & Structural Quality Audits"
      ]
    },
    {
      title: "Architectural Design",
      desc: "Vastu-compliant layouts, spatial flow blueprints, and detailed construction documentation delivered by our core design team.",
      icon: PenTool,
      points: [
        "2D & 3D Spatial Flow Blueprints",
        "Vastu-Compliant Elevation Designs",
        "Authority Approvals & Liaisons",
        "Structural Detailing & Engineering"
      ]
    },
    {
      title: "Interiors & Styling",
      desc: "Transform your home and office interiors with premium modular setups, customized cabinetry, flooring layout designs, and curated lighting.",
      icon: Layout,
      points: [
        "Custom Modular Kitchens & Storage",
        "Premium False Ceiling & Lighting",
        "Material Selection & Consulting",
        "Turnkey Execution & Snag Resolution"
      ]
    },
  ];

  const packages = [
    {
      name: "Semi Deluxe",
      price: "₹1,540/- per sft",
      badge: "Essential",
      isFeatured: false,
      details: [
        "Steel: TATA / JSW / SHREE",
        "Cement: Ultratech / Birla",
        "Bricks: Karimnagar Red Bricks",
        "Flooring: Rs.75/- per sft",
        "Sanitary fittings: Rs.30,000/- per bathroom"
      ]
    },
    {
      name: "Deluxe",
      price: "₹1,650/- per sft",
      badge: "Best Value",
      isFeatured: false,
      details: [
        "Steel: TATA / JSW / SHREE",
        "Cement: Ultratech / Birla",
        "Bricks: Karimnagar 1st class Red Bricks",
        "Flooring: Package allowance included",
        "Sanitary fittings: Package allowance included"
      ]
    },
    {
      name: "Premium",
      price: "₹1,950/- per sft",
      badge: "Most Popular",
      isFeatured: true,
      details: [
        "Steel: TATA / JSW",
        "Cement: Ultratech",
        "Bricks: Karimnagar 1st class Red Bricks",
        "Flooring: Rs.110/- per sft",
        "Sanitary fittings: Rs.45,000/- per bathroom"
      ]
    },
    {
      name: "Premium Plus",
      price: "₹2,100/- per sft",
      badge: "Borewell Included",
      isFeatured: false,
      details: [
        "Steel: TATA / JSW",
        "Cement: Ultratech",
        "Bricks: Karimnagar 1st class Red Bricks",
        "Flooring: Rs.110/- per sft",
        "Sanitary fittings: Rs.45,000/- per bathroom",
        "Borewell included"
      ]
    }
  ];

  const recentWork = [
    { src: "/recent-work-modern-home.jpeg", alt: "Completed modern residential home" },
    { src: "/recent-work-bedroom.jpeg", alt: "Custom bedroom interiors and woodwork" },
    { src: "/recent-work-tv-wall.jpeg", alt: "Completed television wall and cabinetry" },
    { src: "/recent-work-kitchen.jpeg", alt: "Completed kitchen and living space" },
    { src: "/recent-work-ganesha-detail.jpeg", alt: "Ganesha architectural detail" },
    { src: "/recent-work-water-system.jpeg", alt: "Installed residential water system" },
    { src: "/recent-work-carved-door.jpeg", alt: "Traditional carved entrance door" },
    { src: "/recent-work-interior-hall.jpeg", alt: "Completed interior hall" },
    { src: "/recent-work-apartment-exterior.jpeg", alt: "Completed apartment exterior" },
    { src: "/recent-work-traditional-home.jpeg", alt: "Completed traditional residence" },
    { src: "/recent-work-lawn-villa.jpeg", alt: "Completed villa and landscaped lawn" }
  ];

  return (
    <div className="bg-white min-h-screen text-slate-800 font-sans">
      {/* 1. HERO SECTION */}
      <section className="relative flex h-[100dvh] min-h-[680px] items-center justify-start overflow-hidden bg-[#17120d] md:h-[calc(100vh-112px)] md:min-h-[680px]">
        <div className="absolute inset-0 z-0 bg-[#17120d]">
          <img
            src="/hero-golden-hour.png"
            alt=""
            className="absolute inset-0 h-full w-full object-cover object-center"
            aria-hidden="true"
          />
        </div>

        <div className="absolute inset-0 z-10 bg-gradient-to-r from-black/80 via-black/30 to-transparent" />
        <div className="absolute inset-x-0 top-0 z-10 h-40 bg-gradient-to-b from-black/45 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 z-10 h-40 bg-gradient-to-t from-black/30 to-transparent" />

        <div className="relative z-20 mx-auto mt-14 w-full max-w-7xl px-5 text-left text-white sm:px-8 lg:px-10">
          <motion.div
            initial={{ opacity: 0, x: -28 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.75, ease: 'easeOut' }}
            className="max-w-3xl"
          >
            <div className="mb-6 flex items-center gap-4 text-xs font-extrabold uppercase tracking-[0.24em] text-amber-400 sm:text-sm">
              <span className="h-px w-10 bg-amber-400" />
              Turnkey Construction Specialists
            </div>

            <h1 className="max-w-3xl text-4xl font-extrabold leading-[1.02] tracking-[-0.035em] text-white sm:text-6xl lg:text-7xl">
              Crafting Premium
              <span className="block">Living Spaces</span>
              <span className="block">with <span className="text-amber-400">Trust</span></span>
            </h1>

            <p className="mt-7 max-w-xl text-sm font-medium leading-7 text-white/85 sm:text-base">
              Srinidhi Infra Developers is a leading design-build firm turning residential and commercial visions into structurally superior environments.
            </p>

            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Link
                to="/projects"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-amber-500 px-7 py-3.5 text-xs font-extrabold uppercase tracking-[0.1em] text-slate-950 shadow-[0_12px_28px_rgba(245,158,11,0.25)] transition-all hover:-translate-y-0.5 hover:bg-amber-400 focus:outline-none focus:ring-2 focus:ring-amber-300 focus:ring-offset-2 focus:ring-offset-black"
              >
                Explore Projects
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                to="/contact"
                className="inline-flex items-center justify-center rounded-xl border border-white/70 bg-black/15 px-7 py-3.5 text-xs font-extrabold uppercase tracking-[0.1em] text-white backdrop-blur-sm transition-all hover:-translate-y-0.5 hover:bg-white hover:text-slate-950 focus:outline-none focus:ring-2 focus:ring-white"
              >
                Get Free Quote
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 2. QUICK STATS BAR */}
      <motion.section 
        initial={{ opacity: 1, y: 0 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6 }}
        className="relative z-20 mx-auto max-w-none px-0"
      >
        <div className="relative overflow-hidden border-y border-blue-300/40 bg-gradient-to-r from-slate-950 via-blue-900 to-blue-600 p-4 text-white shadow-[0_16px_38px_rgba(30,64,175,0.20)] sm:p-6 md:p-7">
          <div className="absolute inset-x-0 top-0 h-px bg-white/50" />
          <div className="absolute -right-16 -top-24 h-56 w-56 rounded-full bg-amber-300/25 blur-3xl" />
          <div className="relative grid grid-cols-4 gap-2 divide-x divide-white/25 sm:gap-6 md:gap-12">
            {stats.map((stat, idx) => (
              <div key={idx} className="flex flex-col sm:flex-row items-center sm:items-center text-center sm:text-left space-y-1 sm:space-y-0 sm:space-x-4 pl-1 first:pl-0 sm:pl-4 md:pl-8">
                <div className="hidden rounded-xl border border-amber-300/40 bg-amber-300/15 p-3.5 text-amber-300 shadow-inner sm:block">
                  <stat.icon className="h-6 w-6" />
                </div>
                <div>
                  <div className="text-sm font-extrabold tracking-tight text-white sm:text-2xl lg:text-3xl">{stat.value}</div>
                  <div className="text-[8px] font-semibold leading-tight tracking-wide text-blue-100 sm:text-xs lg:text-sm">{stat.label}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* 2.5. ABOUT US SECTION */}
      <section className="relative overflow-hidden bg-[#f7f5f0] py-12 md:py-20">
        <div className="pointer-events-none absolute inset-0 opacity-[0.035] premium-grid" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-16">
              {/* Editorial image composition */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="relative lg:col-span-5"
              >
                <div className="absolute -left-5 -top-5 h-28 w-28 border-l border-t border-amber-500/40 sm:-left-8 sm:-top-8" />
                <div className="relative overflow-hidden rounded-[1.5rem] shadow-[0_24px_70px_-28px_rgba(15,23,42,0.45)] sm:rounded-[2rem]">
                  <img
                    src="/quality-construction.jpg"
                    alt="Engineer reviewing a Srinidhi Infra construction project"
                    className="h-[360px] w-full object-cover object-center transition-transform duration-700 hover:scale-[1.025] sm:h-[500px] lg:h-[610px]"
                    loading="lazy"
                  />
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-slate-950/35 via-transparent to-amber-100/10" />
                </div>

                <div className="absolute -bottom-7 -right-2 hidden w-[44%] overflow-hidden rounded-2xl border-[6px] border-[#f7f5f0] bg-white shadow-2xl sm:block lg:-right-10">
                  <img
                    src="/about-rebar-detail.png"
                    alt="Construction quality and structural detailing"
                    className="h-40 w-full object-cover object-center lg:h-48"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-slate-950/10" />
                </div>

                <div className="absolute -bottom-4 left-5 rounded-full bg-amber-500 px-4 py-2 text-[10px] font-extrabold uppercase tracking-[0.2em] text-slate-950 shadow-lg sm:bottom-6 sm:left-6">
                  Built with precision
                </div>
              </motion.div>

              {/* Editorial narrative */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.15 }}
                className="lg:col-span-7 lg:pl-4"
              >
                <div className="flex items-center gap-4">
                  <span className="h-px w-12 bg-amber-500" />
                  <span className="text-xs font-extrabold uppercase tracking-[0.34em] text-amber-700">
                    About Us
                  </span>
                </div>

                <h2 className="mt-6 max-w-3xl text-3xl font-extrabold uppercase leading-[1.08] tracking-[-0.035em] text-slate-950 sm:text-4xl lg:text-[3.15rem]">
                  Turning visions into reality with a{' '}
                  <span className="text-amber-600">
                    legacy of quality
                  </span>{' '}
                  and trust.
                </h2>

                <p className="mt-6 max-w-2xl text-sm leading-7 text-slate-600 sm:text-base sm:leading-8">
                  Srinidhi Infra Developers brings architects, engineers, supervisors, and skilled professionals together as one integrated team. From design to delivery, we build with care, clarity, and a commitment to quality that lasts.
                </p>

                <div className="mt-8 grid grid-cols-3 divide-x divide-slate-200 border-y border-slate-200 py-5 sm:py-6">
                  {[
                    { icon: Users, title: 'Integrated Team', detail: 'One expert team' },
                    { icon: ShieldCheck, title: 'Quality Assured', detail: 'At every stage' },
                    { icon: FileText, title: 'Clear Delivery', detail: 'From plan to handover' }
                  ].map((item) => (
                    <div key={item.title} className="px-2 first:pl-0 sm:px-5 sm:first:pl-0">
                      <item.icon className="mb-3 h-5 w-5 text-amber-600 sm:h-6 sm:w-6" strokeWidth={1.8} />
                      <div className="text-[10px] font-extrabold uppercase leading-tight tracking-[0.06em] text-slate-900 sm:text-sm">
                        {item.title}
                      </div>
                      <div className="mt-1 hidden text-xs text-slate-500 sm:block">{item.detail}</div>
                    </div>
                  ))}
                </div>

                <div className="mt-8 flex flex-wrap items-center gap-5">
                  <Link
                    to="/about"
                    className="inline-flex items-center justify-center gap-2 rounded-xl bg-amber-500 px-7 py-3.5 text-xs font-extrabold uppercase tracking-[0.14em] text-slate-950 shadow-[0_12px_28px_-12px_rgba(245,158,11,0.9)] transition-all duration-200 hover:-translate-y-0.5 hover:bg-amber-400 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2"
                  >
                    <span>Read More</span>
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                  <Link
                    to="/contact"
                    className="group inline-flex items-center gap-2 py-3 text-xs font-extrabold uppercase tracking-[0.14em] text-slate-700 transition-colors hover:text-amber-700 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-4"
                  >
                    <span>Contact Us</span>
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                </div>
              </motion.div>
          </div>
        </div>
      </section>



      {/* 4. HOME CONSTRUCTION PACKAGES */}
      <section className="relative overflow-hidden bg-[#f7f5f0] py-12 md:py-20">
        <div className="pointer-events-none absolute inset-0 premium-grid opacity-[0.035]" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 35 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7 }}
            className="relative"
          >
            <div className="relative mb-10 overflow-hidden rounded-[2rem] border border-amber-900/10 bg-[#fbfaf7] px-6 py-9 shadow-[0_20px_60px_-36px_rgba(15,23,42,0.35)] sm:px-10 lg:mb-0 lg:min-h-[250px] lg:px-12 lg:py-11">
              <img
                src="/quality-construction.jpg"
                alt=""
                aria-hidden="true"
                className="pointer-events-none absolute inset-y-0 right-0 hidden w-[55%] object-cover object-center opacity-30 lg:block"
                loading="lazy"
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-[#fbfaf7] via-[#fbfaf7] to-[#fbfaf7]/10" />
              <div className="pointer-events-none absolute inset-0 premium-grid opacity-40" />

              <div className="relative max-w-xl">
                <div className="flex items-center gap-4">
                  <span className="h-px w-12 bg-amber-500" />
                  <span className="text-xs font-extrabold uppercase tracking-[0.3em] text-amber-700">Pricing Plans</span>
                </div>
                <h2 className="mt-5 text-3xl font-extrabold leading-[1.05] tracking-[-0.035em] text-slate-950 sm:text-4xl lg:text-[3.25rem]">
                  Home Construction<br className="hidden sm:block" /> Packages
                </h2>
                <p className="mt-5 max-w-lg text-sm leading-7 text-slate-600 sm:text-base">
                  Transparent, milestone-based packages utilizing premium materials and vetted trade partner specifications.
                </p>
              </div>
            </div>

            <div className="relative z-10 -mt-1 grid grid-cols-2 items-end gap-3 sm:gap-5 lg:-mt-20 lg:grid-cols-4 lg:gap-0 lg:px-5">
              {packages.map((pkg, idx) => {
                const isFeatured = pkg.isFeatured;
                const tierHeight = idx === 0 ? 'lg:min-h-[500px]' : idx === 1 ? 'lg:min-h-[540px]' : idx === 2 ? 'lg:min-h-[600px]' : 'lg:min-h-[640px]';
                return (
                  <article
                    key={pkg.name}
                    className={`relative flex min-h-[430px] flex-col justify-between overflow-hidden border p-4 transition-all duration-300 sm:min-h-[490px] sm:p-7 lg:rounded-none lg:p-7 ${tierHeight} ${
                      isFeatured
                        ? 'z-20 border-amber-500 bg-[#071d35] text-white shadow-[0_30px_70px_-30px_rgba(7,29,53,0.75)] rounded-2xl lg:rounded-t-2xl'
                        : 'z-10 border-slate-200 bg-[#fffefa] text-slate-900 shadow-[0_18px_45px_-34px_rgba(15,23,42,0.45)] rounded-2xl lg:first:rounded-tl-2xl lg:[&:not(:first-child)]:border-l-0'
                    }`}
                  >
                    <div>
                      <div className={`mb-6 h-1 w-full ${isFeatured ? 'bg-amber-500' : idx === 1 ? 'bg-emerald-600' : 'bg-amber-500/70'}`} />
                      <div className="flex items-center gap-3">
                        <span className={`text-2xl font-extrabold sm:text-3xl ${isFeatured ? 'text-amber-400' : 'text-amber-600'}`}>
                          0{idx + 1}
                        </span>
                        <span className={`h-8 w-px ${isFeatured ? 'bg-white/20' : 'bg-slate-200'}`} />
                        <h3 className={`text-sm font-extrabold sm:text-xl ${isFeatured ? 'text-white' : 'text-slate-950'}`}>{pkg.name}</h3>
                      </div>

                      <div className={`mt-5 text-lg font-extrabold tracking-[-0.025em] sm:text-2xl lg:text-3xl ${
                        isFeatured ? 'text-amber-400' : 'text-emerald-700'
                      }`}>
                        {pkg.price}
                      </div>

                      <div className={`my-6 h-px w-full ${isFeatured ? 'bg-white/15' : 'bg-slate-200'}`} />

                      <ul className="space-y-3 text-[10px] leading-4 sm:text-xs sm:leading-5">
                        {pkg.details.map((detail) => {
                          const isBorewell = detail === "Borewell included";
                          return (
                          <li
                            key={detail}
                            className={`flex items-start gap-2.5 ${
                              isBorewell
                                ? 'rounded-lg border border-amber-400/60 bg-amber-400/15 px-2.5 py-2 font-extrabold'
                                : ''
                            }`}
                          >
                            <Check className={`mt-0.5 h-3.5 w-3.5 shrink-0 sm:h-4 sm:w-4 ${
                              isBorewell ? 'text-amber-600' : isFeatured ? 'text-amber-400' : 'text-emerald-700'
                            }`} strokeWidth={2.5} />
                            <span className={
                              isBorewell
                                ? 'text-amber-800'
                                : isFeatured
                                  ? 'text-slate-200'
                                  : 'text-slate-600'
                            }>
                              {detail}
                            </span>
                          </li>
                          );
                        })}
                      </ul>
                    </div>

                    <Link
                      to="/contact"
                      className={`mt-8 inline-flex w-full items-center justify-center rounded-xl px-3 py-3 text-[10px] font-extrabold uppercase tracking-[0.12em] transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2 sm:py-3.5 sm:text-xs ${
                        isFeatured
                          ? 'bg-amber-500 text-slate-950 shadow-lg hover:bg-amber-400'
                          : 'bg-emerald-700 text-white hover:bg-emerald-600'
                      }`}
                    >
                      Select Plan
                    </Link>
                  </article>
                );
              })}
            </div>
          </motion.div>
        </div>
      </section>

      {/* 5. WHY CHOOSE US / OUR QUALITY */}
      <section className="relative overflow-hidden bg-white py-12 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative overflow-hidden rounded-[2rem] border border-slate-200/70 bg-[#f8f6f1] shadow-[0_24px_70px_-38px_rgba(15,23,42,0.45)]">
            <div className="grid lg:grid-cols-12">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="relative px-6 py-10 sm:px-10 sm:py-12 lg:col-span-5 lg:px-12 lg:py-16"
              >
                <div className="pointer-events-none absolute inset-0 premium-grid opacity-60" />
                <div className="relative">
                  <div className="flex items-center gap-4">
                    <span className="h-px w-12 bg-amber-500" />
                    <span className="text-xs font-extrabold uppercase tracking-[0.34em] text-amber-700">
                      Our Quality
                    </span>
                  </div>

                  <h2 className="mt-6 text-3xl font-extrabold uppercase leading-[1.06] tracking-[-0.035em] text-slate-950 sm:text-4xl lg:text-[3rem]">
                    Building excellence with{' '}
                    <span className="text-amber-600">dedication</span>{' '}
                    in every detail.
                  </h2>

                  <p className="mt-6 max-w-lg text-sm leading-7 text-slate-600 sm:text-base sm:leading-8">
                    We stand apart from other builders by maintaining absolute adherence to legal parameters, utilizing the highest grade materials, and upholding transparency at every milestone.
                  </p>

                  <div className="mt-8 flex flex-wrap items-center gap-4">
                    <Link
                      to="/about"
                      className="inline-flex items-center gap-2 rounded-xl bg-amber-500 px-7 py-3.5 text-xs font-extrabold uppercase tracking-[0.14em] text-slate-950 shadow-lg transition-all hover:-translate-y-0.5 hover:bg-amber-400 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2"
                    >
                      <span>Read More</span>
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                    <Link
                      to="/contact"
                      className="inline-flex items-center gap-2 rounded-xl border border-slate-300 px-7 py-3.5 text-xs font-extrabold uppercase tracking-[0.14em] text-slate-800 transition-all hover:border-slate-900 hover:bg-slate-900 hover:text-white focus:outline-none focus:ring-2 focus:ring-slate-900 focus:ring-offset-2"
                    >
                      <span>Contact Us</span>
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.15 }}
                className="relative min-h-[340px] overflow-hidden lg:col-span-7 lg:min-h-[560px]"
              >
                <img
                  src="/quality-construction.jpg"
                  alt="Construction engineer reviewing blueprints at a premium high-rise site"
                  className="absolute inset-0 h-full w-full object-cover object-center transition-transform duration-700 hover:scale-[1.025]"
                  loading="lazy"
                />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-slate-950/10 via-transparent to-amber-100/10" />
              </motion.div>
            </div>

            <div className="relative z-10 bg-[#071d35] px-4 py-7 sm:px-8 lg:-mt-1 lg:px-10 lg:py-8">
              <div className="grid grid-cols-5 gap-y-7 divide-x-0 divide-white/15 sm:gap-y-8 lg:divide-x">
                {[
                  { icon: ShieldCheck, title: 'Uncompromising Quality' },
                  { icon: Users, title: 'Experienced Professionals' },
                  { icon: PenTool, title: 'Tailored Solutions' },
                  { icon: Calendar, title: 'Timely Completion' },
                  { icon: FileText, title: 'Transparent Communication' }
                ].map((item, i) => (
                  <div
                    key={item.title}
                    className="group px-0.5 text-center sm:px-3 lg:px-5"
                  >
                    <div className="mx-auto flex h-9 w-9 items-center justify-center rounded-full border border-amber-400/40 text-amber-400 transition-colors group-hover:bg-amber-400 group-hover:text-slate-950 sm:h-11 sm:w-11">
                      <item.icon className="h-4 w-4 sm:h-5 sm:w-5" strokeWidth={1.8} />
                    </div>
                    <div className="mt-2 text-[9px] font-extrabold tracking-[0.12em] text-emerald-400 sm:mt-3 sm:text-[10px] sm:tracking-[0.16em]">
                      0{i + 1}
                    </div>
                    <div className="mx-auto mt-1.5 max-w-[150px] text-[8px] font-bold leading-3 text-white sm:mt-2 sm:text-xs sm:leading-5 lg:text-sm">
                      {item.title}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. RECENT WORK */}
      <section className="relative overflow-hidden bg-[#fbf7ee] py-12 md:py-20">
        <div className="pointer-events-none absolute inset-0 premium-grid opacity-[0.04]" />
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-12 lg:grid-rows-[325px_180px_145px]">
            <motion.div
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="col-span-2 flex flex-col justify-center py-5 pr-4 lg:col-span-5 lg:py-0 lg:pr-16"
            >
              <div className="flex items-center gap-4">
                <span className="h-px w-12 bg-amber-500" />
                <span className="text-xs font-extrabold uppercase tracking-[0.3em] text-amber-700">
                  Recent Work
                </span>
              </div>
              <h2 className="mt-5 font-serif text-4xl font-bold leading-[1.02] tracking-[-0.035em] text-[#071a35] sm:text-5xl lg:text-[3.25rem]">
                <span className="block lg:whitespace-nowrap">Built With Purpose.</span>
                <span className="block lg:whitespace-nowrap">Finished With <span className="text-amber-600">Pride.</span></span>
              </h2>
              <div className="mt-6 h-0.5 w-14 bg-emerald-600" />
              <p className="mt-5 max-w-md text-sm leading-7 text-slate-600 sm:text-base">
                A closer look at recently completed spaces, finishes, and on-site details.
              </p>
              <Link
                to="/projects"
                className="mt-7 inline-flex w-fit items-center gap-3 rounded-xl bg-amber-500 px-6 py-3.5 text-xs font-extrabold uppercase tracking-[0.14em] text-slate-950 shadow-lg shadow-amber-900/10 transition-colors hover:bg-amber-400"
              >
                View All Projects
                <ArrowRight className="h-4 w-4" />
              </Link>
            </motion.div>

            <button
              type="button"
              onClick={() => setSelectedWork(recentWork[0])}
              className="group relative col-span-2 h-64 overflow-hidden rounded-2xl text-left focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2 lg:col-span-7 lg:h-auto"
              aria-label="Open completed modern residential home"
            >
              <img
                src={recentWork[0].src}
                alt={recentWork[0].alt}
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.035]"
                loading="lazy"
              />
              <span className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-white/90 text-[#071a35] opacity-0 shadow-md transition-opacity group-hover:opacity-100">
                <Maximize2 className="h-4 w-4" />
              </span>
            </button>

            <button
              type="button"
              onClick={() => setSelectedWork(recentWork[1])}
              className="group relative col-span-2 h-80 overflow-hidden rounded-2xl text-left focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2 lg:col-span-5 lg:row-span-2 lg:h-auto"
              aria-label="Open custom bedroom interiors and woodwork"
            >
              <img
                src={recentWork[1].src}
                alt={recentWork[1].alt}
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.035]"
                loading="lazy"
              />
              <span className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-white/90 text-[#071a35] opacity-0 shadow-md transition-opacity group-hover:opacity-100">
                <Maximize2 className="h-4 w-4" />
              </span>
            </button>

            <div className="col-span-2 grid grid-cols-3 gap-3 sm:gap-4 lg:col-span-7 lg:row-span-2 lg:grid-rows-3">
              {recentWork.slice(2).map((work) => (
                <button
                  key={work.src}
                  type="button"
                  onClick={() => setSelectedWork(work)}
                  className="group relative aspect-square overflow-hidden rounded-xl text-left focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2 lg:aspect-auto"
                  aria-label={`Open ${work.alt}`}
                >
                  <img
                    src={work.src}
                    alt={work.alt}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                  <span className="absolute inset-0 bg-[#071a35]/0 transition-colors group-hover:bg-[#071a35]/15" />
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      <AnimatePresence>
        {selectedWork && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-[#031326]/90 p-4 backdrop-blur-sm sm:p-8"
            role="dialog"
            aria-modal="true"
            aria-label="Recent work image viewer"
            onClick={() => setSelectedWork(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.2 }}
              className="relative max-h-full max-w-6xl"
              onClick={(event) => event.stopPropagation()}
            >
              <img
                src={selectedWork.src}
                alt={selectedWork.alt}
                className="max-h-[86vh] max-w-full rounded-2xl object-contain shadow-2xl"
              />
              <button
                type="button"
                onClick={() => setSelectedWork(null)}
                className="absolute right-3 top-3 flex h-11 w-11 items-center justify-center rounded-full bg-white text-[#071a35] shadow-lg transition-colors hover:bg-amber-400 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2"
                aria-label="Close image viewer"
              >
                <X className="h-5 w-5" />
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>


      {/* 7. TESTIMONIALS SECTION */}
      <section className="relative overflow-hidden bg-[#f7f5f0] py-12 md:py-20">
        <div className="pointer-events-none absolute inset-0 premium-grid opacity-[0.035]" />
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7 }}
          className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8"
        >
          <div className="overflow-hidden rounded-[2rem] border border-amber-900/10 bg-[#fbfaf7] shadow-[0_28px_80px_-42px_rgba(15,23,42,0.5)]">
            {loading ? (
              <div className="grid min-h-[640px] animate-pulse bg-slate-100 lg:grid-cols-12">
                <div className="bg-slate-200 lg:col-span-5" />
                <div className="lg:col-span-7" />
              </div>
            ) : testimonials.length > 0 ? (
              <div className="grid lg:grid-cols-12">
                <div className="relative min-h-[330px] overflow-hidden lg:col-span-5 lg:min-h-[680px]">
                  <img
                    src="/testimonials-residential.png"
                    alt="Completed premium residential community at golden hour"
                    className="absolute inset-0 h-full w-full object-cover object-center transition-transform duration-700 hover:scale-[1.025]"
                    loading="lazy"
                  />
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-slate-950/25 via-transparent to-amber-100/10" />
                </div>

                <div className="relative px-6 py-10 sm:px-10 sm:py-12 lg:col-span-7 lg:px-14 lg:py-14">
                  <div className="pointer-events-none absolute inset-0 premium-grid opacity-50" />
                  <div className="relative">
                    <div className="flex items-center gap-4">
                      <span className="h-px w-12 bg-amber-500" />
                      <span className="text-[10px] font-extrabold uppercase tracking-[0.28em] text-amber-700 sm:text-xs">
                        Client Testimonials
                      </span>
                    </div>
                    <h2 className="mt-4 text-3xl font-extrabold tracking-[-0.035em] text-slate-950 sm:text-4xl lg:text-[2.8rem]">
                      Words from Our Clients
                    </h2>

                    <AnimatePresence mode="wait">
                      <motion.div
                        key={activeTestimonial}
                        initial={{ opacity: 0, x: 24 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -24 }}
                        transition={{ duration: 0.35 }}
                        className="mt-8"
                      >
                        <div className="flex items-center gap-4">
                          <span className="text-6xl font-serif leading-none text-amber-500 sm:text-7xl">“</span>
                          <div className="flex items-center gap-1 text-amber-500">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`h-4 w-4 sm:h-5 sm:w-5 ${
                                  i < Math.floor(testimonials[activeTestimonial]?.rating || 5) ? 'fill-current' : ''
                                }`}
                              />
                            ))}
                          </div>
                        </div>

                        <p className="mt-2 max-w-3xl text-base font-medium leading-8 text-slate-700 sm:text-lg sm:leading-9 lg:text-xl">
                          “{testimonials[activeTestimonial]?.quote}”
                        </p>

                        <div className="mt-6 border-l-2 border-amber-500 pl-4">
                          <h3 className="text-base font-extrabold text-slate-950 sm:text-lg">
                            {testimonials[activeTestimonial]?.clientName}
                          </h3>
                          <p className="mt-1 text-[10px] font-extrabold uppercase tracking-[0.16em] text-emerald-700 sm:text-xs">
                            {testimonials[activeTestimonial]?.projectRef}
                          </p>
                        </div>
                      </motion.div>
                    </AnimatePresence>

                    <div className="mt-8 grid grid-cols-2 divide-x divide-slate-200 border-y border-slate-200 py-5">
                      {testimonials
                        .slice(0, 3)
                        .filter((_, idx) => idx !== activeTestimonial)
                        .slice(0, 2)
                        .map((test) => {
                          const targetIndex = testimonials.findIndex((item) => item.id === test.id);
                          return (
                            <button
                              key={test.id}
                              type="button"
                              onClick={() => setActiveTestimonial(targetIndex)}
                              className="group px-3 text-left first:pl-0 last:pr-0 sm:px-6 sm:first:pl-0"
                            >
                              <div className="flex items-center gap-0.5 text-amber-500">
                                {[...Array(5)].map((_, i) => (
                                  <Star
                                    key={i}
                                    className={`h-3 w-3 ${i < Math.floor(test.rating) ? 'fill-current' : ''}`}
                                  />
                                ))}
                              </div>
                              <div className="mt-2 text-xs font-extrabold text-slate-800 transition-colors group-hover:text-amber-700 sm:text-sm">
                                {test.clientName}
                              </div>
                              <div className="mt-1 truncate text-[8px] font-bold uppercase tracking-[0.08em] text-emerald-700 sm:text-[10px]">
                                {test.projectRef}
                              </div>
                            </button>
                          );
                        })}
                    </div>

                    <div className="mt-7 flex items-center justify-between">
                      <button
                        type="button"
                        onClick={() => setActiveTestimonial((activeTestimonial - 1 + testimonials.length) % testimonials.length)}
                        className="flex h-11 w-11 items-center justify-center rounded-full border border-amber-500 text-amber-700 transition-colors hover:bg-amber-500 hover:text-slate-950"
                        aria-label="Previous testimonial"
                      >
                        <ArrowRight className="h-4 w-4 rotate-180" />
                      </button>

                      <div className="flex items-center gap-2">
                        {testimonials.slice(0, 5).map((_, idx) => (
                          <button
                            key={idx}
                            type="button"
                            onClick={() => setActiveTestimonial(idx)}
                            className={`h-1.5 rounded-full transition-all duration-300 ${
                              idx === activeTestimonial ? 'w-7 bg-amber-500' : 'w-1.5 bg-slate-300'
                            }`}
                            aria-label={`Go to slide ${idx + 1}`}
                          />
                        ))}
                      </div>

                      <button
                        type="button"
                        onClick={() => setActiveTestimonial((activeTestimonial + 1) % testimonials.length)}
                        className="flex h-11 w-11 items-center justify-center rounded-full border border-amber-500 text-amber-700 transition-colors hover:bg-amber-500 hover:text-slate-950"
                        aria-label="Next testimonial"
                      >
                        <ArrowRight className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="px-8 py-16 text-center text-sm text-slate-500">
                Client stories will appear here soon.
              </div>
            )}
          </div>
        </motion.div>
      </section>

      {false && (<>
      {/* Legacy testimonial layout retained temporarily for rollback */}
      <section className="bg-slate-50/50 border-t border-b border-slate-200/60 py-8 md:py-14 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 rounded-3xl my-4 md:my-6 relative overflow-hidden premium-grid">
        {/* Glow Blobs */}
        <div className="glow-blob w-96 h-96 bg-accent-400/10 -top-20 -right-20" />
        <div className="glow-blob w-80 h-80 bg-primary-500/10 -bottom-20 -left-20" />

        {/* Subtle structural trace lines in background */}
        <div className="absolute left-0 top-0 opacity-[0.02] pointer-events-none translate-x-5 translate-y-5 z-0">
          <svg width="250" height="250" viewBox="0 0 100 100" fill="none" stroke="currentColor" className="text-slate-900">
            <rect x="10" y="10" width="80" height="80" strokeWidth="0.5" />
            <line x1="10" y1="10" x2="90" y2="90" strokeWidth="0.5" />
            <line x1="90" y1="10" x2="10" y2="90" strokeWidth="0.5" />
          </svg>
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="relative z-10"
        >
          <div className="text-center max-w-3xl mx-auto mb-8">
            <span className="section-eyebrow mb-4">Client Testimonials</span>
            <h2 className="text-3xl md:text-4xl font-bold font-serif text-gradient">Words from Our Clients</h2>
            <div className="h-1 w-20 bg-accent-500 mx-auto mt-3 rounded-full" />
          </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative z-10">
            {[1, 2, 3].map((n) => (
              <div key={n} className="bg-white rounded-2xl border border-slate-200 p-6 h-48 animate-pulse" />
            ))}
          </div>
        ) : (
          <>
            {/* Desktop Static Grid Layout (shows first 3 reviews) */}
            <div className="hidden md:grid md:grid-cols-3 gap-6 relative z-10">
              {testimonials.slice(0, 3).map((test) => (
                <div key={test.id} className="relative bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between group">
                  <span className="absolute top-2 right-4 text-5xl text-slate-100 font-serif pointer-events-none select-none group-hover:text-accent-500/10 transition-colors">“</span>
                  <div className="relative z-10">
                    <div className="flex items-center text-accent-500 space-x-0.5 mb-3">
                      {[...Array(5)].map((_, i) => (
                        <Star 
                          key={i} 
                          className={`h-4 w-4 ${i < Math.floor(test.rating) ? 'fill-current' : ''}`} 
                        />
                      ))}
                    </div>
                    <p className="text-xs sm:text-sm italic text-slate-650 leading-relaxed mb-4 font-light">
                      "{test.quote}"
                    </p>
                  </div>
                  <div className="flex items-center border-t border-slate-100 pt-3 mt-auto">
                    <div>
                      <h4 className="font-serif text-sm font-bold text-slate-900">{test.clientName}</h4>
                      <span className="text-[10px] text-accent-605 font-bold tracking-wider block uppercase mt-0.5">
                        {test.projectRef}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Mobile Autoscrolling Carousel Layout */}
            <div className="md:hidden relative z-10 px-2 min-h-[190px] flex flex-col justify-between">
              <AnimatePresence mode="wait">
                {testimonials.length > 0 && (
                  <motion.div
                    key={activeTestimonial}
                    initial={{ opacity: 0, x: 30 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -30 }}
                    transition={{ duration: 0.4 }}
                    className="relative bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm flex flex-col justify-between flex-grow group"
                  >
                    <span className="absolute top-2 right-4 text-5xl text-slate-100 font-serif pointer-events-none select-none">“</span>
                    <div className="relative z-10">
                      <div className="flex items-center text-accent-500 space-x-0.5 mb-3">
                        {[...Array(5)].map((_, i) => (
                          <Star 
                            key={i} 
                            className={`h-4 w-4 ${i < Math.floor(testimonials[activeTestimonial]?.rating || 5) ? 'fill-current' : ''}`} 
                          />
                        ))}
                      </div>
                      <p className="text-xs sm:text-sm italic text-slate-655 leading-relaxed mb-4 font-light">
                        "{testimonials[activeTestimonial]?.quote}"
                      </p>
                    </div>
                    <div className="flex items-center border-t border-slate-100 pt-3 mt-auto">
                      <div>
                        <h4 className="font-serif text-sm font-bold text-slate-900">{testimonials[activeTestimonial]?.clientName}</h4>
                        <span className="text-[9px] text-accent-605 font-bold tracking-wider block uppercase mt-0.5">
                          {testimonials[activeTestimonial]?.projectRef}
                        </span>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Autoscroller Dot Indicators */}
              <div className="flex justify-center space-x-2 mt-4">
                {testimonials.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveTestimonial(idx)}
                    className={`h-1.5 rounded-full transition-all duration-300 ${
                      idx === activeTestimonial ? 'bg-accent-500 w-6' : 'bg-slate-300 w-1.5'
                    }`}
                    aria-label={`Go to slide ${idx + 1}`}
                  />
                ))}
              </div>
            </div>
          </>
        )}
        </motion.div>
      </section>
      </>)}

      {/* 7. CONTACT / ENQUIRY BANNER */}
      <section className="bg-white py-12 md:py-20 border-y border-slate-200/60 relative overflow-hidden">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative rounded-3xl bg-slate-950 text-white p-8 md:p-12 overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.12)] border border-slate-900">
            {/* Tech Grid Pattern inside the card */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:3rem_3rem] opacity-20 pointer-events-none" />
            {/* Glow Blobs inside the card */}
            <div className="absolute -top-24 -right-24 w-60 h-60 bg-accent-500/10 rounded-full blur-3xl" />
            <div className="absolute -bottom-24 -left-24 w-60 h-60 bg-primary-500/10 rounded-full blur-3xl" />

            <div className="relative z-10 max-w-3xl mx-auto text-center">
              <span className="section-eyebrow text-accent-400 mb-4 inline-block">GET STARTED</span>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-bold text-white mb-4">
                Looking for a Trusted Design & Construction Partner?
              </h2>
              <p className="text-slate-400 text-sm sm:text-base max-w-2xl mx-auto mb-8 leading-relaxed font-light">
                Outline requirements, scopes, and budget goals. Our engineering and architecture specialists will respond with a tailored project roadmap.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link 
                  to="/contact" 
                  className="w-full sm:w-auto wp-btn-primary py-3.5 px-8"
                >
                  Submit Enquiry <ArrowRight className="h-4 w-4" />
                </Link>
                <a 
                  href={`tel:${settings?.contact?.phone || '9866615535'}`}
                  className="w-full sm:w-auto wp-btn-blue py-3.5 px-8"
                >
                  Call Specialist: {settings?.contact?.phone || '9866615535'}
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;

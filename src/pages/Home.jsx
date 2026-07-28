import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { 
  Building2, ShieldCheck, Calendar, FileText, 
  ArrowRight, Award, MapPin, Users, Key, Star, Sparkles,
  PenTool, Layout, Calculator
} from 'lucide-react';
import { getTestimonials, getPosts, getSettings } from '../services/db';

const Home = () => {
  const [testimonials, setTestimonials] = useState([]);
  const [posts, setPosts] = useState([]);
  const [settings, setSettings] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      subtitle: "Turnkey Construction Specialists",
      title: "Crafting Premium Living Spaces with Trust"
    },
    {
      subtitle: "Architectural Excellence",
      title: "Designing Bespoke Homes That Inspire Life"
    },
    {
      subtitle: "Premium Interiors & PMC",
      title: "Executing Perfection from Blueprint to Handover"
    }
  ];

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
  const [constPkg, setConstPkg] = useState('signature');
  
  // Tab 1: Architectural Design Calculator States
  const [archPlot, setArchPlot] = useState(250);
  const [archPkg, setArchPkg] = useState('standard');
  
  // Tab 2: Interiors & Styling Calculator States
  const [intRooms, setIntRooms] = useState('3bhk');
  const [intPkg, setIntPkg] = useState('luxury');

  const constRates = {
    signature: 2200,
    elite: 1985,
    smart: 1785,
    starter: 1685
  };

  const constSpecs = {
    signature: ["Fe 550D Steel Grade", "Ultratech Cement", "Premium Kajaria Tiles", "Kohler/Jaguar Fittings"],
    elite: ["TATA / JSW Steel", "Ultratech/Birla Cement", "Kajaria Tiles", "Parryware Fittings"],
    smart: ["Shree/Radha Steel", "Birla Cement", "Standard Tiles", "Cera Fittings"],
    starter: ["Standard Steel Grade", "Coromandel Cement", "Ceramic Tiles", "Basic Class Fittings"]
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
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (testimonials.length === 0) return;
    const timer = setInterval(() => {
      setActiveTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [testimonials.length]);

  const stats = [
    { value: settings?.stats?.experience || '12+', label: 'Years Experience', icon: Award },
    { value: settings?.stats?.projects || '150+', label: 'Projects Completed', icon: Building2 },
    { value: settings?.stats?.developed || '650+', label: 'Turnkey Projects', icon: Key },
    { value: settings?.stats?.families || '300+', label: 'Happy Clients', icon: Users },
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
      name: "Premium Signature",
      price: "₹2,200/- per sft",
      details: [
        "Steel: TATA / JSW",
        "Cement: Ultratech",
        "Bricks: Karimnagar 1st class",
        "Flooring: Rs.120/- per sft",
        "Sanitary fittings: 45,000/- per bathroom"
      ]
    },
    {
      name: "Elite Comfort",
      price: "₹1,985/- per sft",
      details: [
        "Steel: TATA / JSW",
        "Cement: Ultratech",
        "Bricks: Karimnagar Red bricks",
        "Flooring: Rs.85/- per sft",
        "Sanitary fittings: 35,000/- per bathroom"
      ]
    },
    {
      name: "Smart Value",
      price: "₹1,785/- per sft",
      details: [
        "Steel: SHREE / RADHA",
        "Cement: Ultratech",
        "Bricks: Karimnagar Red bricks",
        "Flooring: Rs.65/- per sft",
        "Sanitary fittings: 30,000/- per bathroom"
      ]
    },
    {
      name: "Essential Starter",
      price: "₹1,685/- per sft",
      details: [
        "Steel: SHREE / RADHA",
        "Cement: Ultratech",
        "Bricks: Red bricks",
        "Flooring: Rs.50/- per sft",
        "Sanitary fittings: 20,000/- per bathroom"
      ]
    }
  ];

  return (
    <div className="bg-white min-h-screen text-slate-800 font-sans">
      {/* 1. HERO SECTION */}
      <section className="relative h-[85vh] min-h-[500px] flex items-center justify-start bg-slate-900 overflow-hidden">
        {/* Looping HTML5 Background Video with fallback image layout */}
        <div className="absolute inset-0 z-0 bg-slate-900">
          {/* Static fallback background displayed immediately while video buffers */}
          <div 
            className="absolute inset-0 bg-cover bg-center opacity-30"
            style={{ backgroundImage: `url('https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&w=1920&q=80')` }}
          />
          <video
            src="/smiridhi6.mp4"
            className="absolute inset-0 w-full h-full object-cover object-center opacity-65"
            autoPlay
            loop
            muted
            playsInline
            poster="https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&w=1200&q=80"
          />
        </div>
        
        {/* Softer overlay to make the background video more clear and visible */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/45 via-black/15 to-transparent z-10" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent z-10" />

        <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-left text-white mt-16 w-full">
          <div className="max-w-3xl">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentSlide}
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 30 }}
                transition={{ duration: 0.6 }}
                className="space-y-4"
              >
                <div className="text-accent-400 text-xs font-bold uppercase tracking-[0.25em] block leading-none">
                  {slides[currentSlide].subtitle}
                </div>
                
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-serif leading-tight text-white">
                  {slides[currentSlide].title}
                </h1>
                
                <p className="text-sm sm:text-base text-slate-300 max-w-2xl mx-auto leading-relaxed font-light">
                  Srinidhi Infra Developers is a leading design-build firm specializing in turning residential and commercial visions into structurally superior environments.
                </p>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Navigation Dots (Centered bottom relative to section to avoid description overlay) */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex space-x-3 z-30">
          {slides.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentSlide(idx)}
              className={`h-2 rounded-full transition-all duration-300 ${
                idx === currentSlide ? 'bg-accent-500 w-8' : 'bg-white/45 w-2 hover:bg-white/70'
              }`}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>
      </section>

      {/* 2. QUICK STATS BAR */}
      <motion.section 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6 }}
        className="relative z-20 -mt-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
      >
        <div className="bg-white rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.08)] border border-slate-200/80 p-6 md:p-8 text-slate-800">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12 divide-y divide-slate-100 lg:divide-y-0 lg:divide-x lg:divide-slate-100">
            {stats.map((stat, idx) => (
              <div key={idx} className="flex items-center space-x-4 pt-6 first:pt-0 lg:pt-0 lg:pl-8 first:pl-0">
                <div className="p-3.5 bg-accent-500/10 rounded-xl text-accent-600 border border-accent-500/20">
                  <stat.icon className="h-6 w-6" />
                </div>
                <div>
                  <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">{stat.value}</div>
                  <div className="text-xs sm:text-sm text-slate-505 tracking-wide font-medium">{stat.label}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* 2.5. ABOUT US SECTION */}
      <section className="py-24 relative overflow-hidden bg-gradient-to-br from-slate-950 via-primary-900 to-slate-900">
        {/* Blueprint grid + construction gradient wash */}
        <div className="absolute inset-0 premium-grid opacity-[0.18] pointer-events-none" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(16,185,129,0.18),transparent_55%),radial-gradient(circle_at_85%_80%,rgba(251,191,36,0.12),transparent_50%)] pointer-events-none" />
        <div className="absolute top-0 right-0 w-96 h-96 bg-accent-500/20 rounded-full blur-3xl pointer-events-none -mr-32 -mt-32" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-emerald-400/10 rounded-full blur-3xl pointer-events-none -ml-32 -mb-32" />
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent-400/50 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-accent-400/30 to-transparent" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center">
            
            {/* Left Column: Media / Illustration */}
            <div className="lg:col-span-6 relative">
              {/* Decorative Frame */}
              <div className="absolute -inset-4 bg-white/5 border border-white/10 rounded-3xl -rotate-1 pointer-events-none backdrop-blur-sm" />
              
              {/* Main Image */}
              <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-white/15">
                <img 
                  src="https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&w=800&q=80" 
                  alt="Srinidhi Construction Site Engineering" 
                  className="w-full h-[450px] object-cover hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/40 via-transparent to-transparent pointer-events-none" />
              </div>

              {/* Floating Quality Badge */}
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3, duration: 0.5 }}
                className="absolute -bottom-6 -right-6 bg-accent-600 text-white p-6 rounded-2xl shadow-xl max-w-[220px] border border-accent-500 hidden sm:block"
              >
                <div className="text-3xl font-extrabold tracking-tight">100%</div>
                <div className="text-xs font-bold uppercase tracking-wider mt-1">Quality Audited</div>
                <div className="text-[10px] text-accent-100 font-light mt-1.5 leading-relaxed">
                  Every structure complies with high-grade Indian concrete & steel specifications.
                </div>
              </motion.div>

              {/* Small blueprint overlay badge */}
              <div className="absolute -top-6 -left-6 bg-white/10 backdrop-blur-md border border-white/20 p-4 rounded-xl shadow-lg hidden md:flex items-center space-x-3">
                <div className="w-10 h-10 rounded-lg bg-accent-500/20 flex items-center justify-center text-accent-300">
                  <Building2 className="h-5 w-5" />
                </div>
                <div>
                  <div className="text-[9px] text-slate-300 uppercase tracking-wider font-bold">Standard</div>
                  <div className="text-xs font-extrabold text-white">ISO 9001:2015</div>
                </div>
              </div>
            </div>

            {/* Right Column: Narrative & Values */}
            <div className="lg:col-span-6 space-y-8">
              <div className="space-y-4">
                <span className="text-accent-600 text-xs font-extrabold tracking-widest uppercase block">Who We Are</span>
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-serif text-slate-900 tracking-tight leading-tight">
                  Crafting Structures, Cultivating Trust
                </h2>
                <div className="h-1.5 w-20 bg-accent-500 rounded-full" />
              </div>

              <p className="text-slate-600 text-sm sm:text-base leading-relaxed font-light">
                Founded with a core philosophy of delivering precision, transparency, and superior engineering strength, Srinidhi Infra Developers is a trusted name in Hyderabad's civil landscape. We bridge the gap between architectural elegance and structural longevity.
              </p>

              {/* Value Propositions */}
              <div className="space-y-4 pt-2">
                <div className="flex items-start space-x-4">
                  <div className="w-5 h-5 rounded-full bg-accent-50 flex items-center justify-center text-accent-600 mt-1 shrink-0">
                    <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-slate-800">Milestone-Based Auditing</h3>
                    <p className="text-xs text-slate-500 font-light mt-0.5 leading-relaxed">
                      We offer full visibility into raw material receipts, soil testing reports, and structural certifications at every concrete pour stage.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-5 h-5 rounded-full bg-accent-50 flex items-center justify-center text-accent-600 mt-1 shrink-0">
                    <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-slate-800">Architectural & Vastu Harmony</h3>
                    <p className="text-xs text-slate-500 font-light mt-0.5 leading-relaxed">
                      Every project is designed by professional structural engineers and Vastu experts to ensure safety, ventilation, and peace of mind.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-5 h-5 rounded-full bg-accent-50 flex items-center justify-center text-accent-600 mt-1 shrink-0">
                    <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-slate-800">Fixed Cost Guarantee</h3>
                    <p className="text-xs text-slate-500 font-light mt-0.5 leading-relaxed">
                      Zero surprise escalations. The rates signed in our detailed work spec contract remain lock-in protected throughout construction.
                    </p>
                  </div>
                </div>
              </div>

              {/* Call to Action Button */}
              <div className="pt-4">
                <Link 
                  to="/about"
                  className="inline-flex items-center space-x-2 px-6 py-3.5 bg-slate-900 text-white rounded-xl text-xs sm:text-sm font-bold hover:bg-accent-600 transition-colors duration-200 shadow-md hover:shadow-lg"
                >
                  <span>Learn More About Our Journey</span>
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>

          </div>
        </div>
      </section>



      {/* 4. HOME CONSTRUCTION PACKAGES */}
      <section 
        className="border-t border-b border-slate-200/50 py-24 relative overflow-hidden bg-slate-50/50 premium-grid"
      >
        {/* Glow Blobs */}
        <div className="glow-blob w-[500px] h-[500px] bg-accent-400/10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />

        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10"
        >
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="section-eyebrow mb-4">Pricing Plans</span>
            <h2 className="text-3xl md:text-5xl font-bold font-serif text-gradient">Home Construction Packages</h2>
            <div className="h-1 w-20 bg-accent-500 mx-auto mt-4 rounded-full" />
            <p className="text-slate-500 text-sm sm:text-base mt-5 leading-relaxed font-light">
              Transparent, milestone-based packages utilizing premium materials and vetted trade partner specifications.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {packages.map((pkg, idx) => {
              const isFeatured = pkg.name === "Premium Signature";
              return (
                <div 
                  key={idx} 
                  className={`relative flex flex-col justify-between rounded-2xl transition-all duration-300 p-6 ${
                    isFeatured 
                      ? 'bg-slate-900 text-white border-2 border-accent-500 shadow-2xl scale-[1.03] md:translate-y-[-4px] z-20' 
                      : 'bg-white text-slate-800 border border-slate-200/80 shadow-sm hover:border-accent-500/30 hover:shadow-lg hover:scale-[1.01] z-10'
                  }`}
                >
                  {isFeatured && (
                    <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-accent-500 text-white text-[10px] font-bold tracking-wider uppercase px-3 py-1 rounded-full shadow-md">
                      Most Popular
                    </span>
                  )}
                  <div>
                    <h3 className={`font-serif text-base font-bold mb-2 ${isFeatured ? 'text-white' : 'text-slate-900'}`}>{pkg.name}</h3>
                    <div className={`text-2xl font-extrabold mb-6 tracking-tight ${isFeatured ? 'text-accent-400' : 'text-accent-600'}`}>{pkg.price}</div>
                    
                    <div className={`h-px w-full my-4 ${isFeatured ? 'bg-white/10' : 'bg-slate-100'}`} />

                    <ul className="space-y-3.5 text-xs font-light">
                      {pkg.details.map((detail, dIdx) => (
                        <li key={dIdx} className="flex items-start">
                          <span className="h-1.5 w-1.5 bg-accent-500 rounded-full mr-2.5 mt-2 flex-shrink-0" />
                          <span className={isFeatured ? 'text-slate-300' : 'text-slate-600'}>{detail}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div className="mt-8 pt-4">
                    <Link 
                      to="/contact" 
                      className={`w-full inline-flex items-center justify-center py-2.5 font-semibold text-xs rounded-xl transition-all duration-200 ${
                        isFeatured 
                          ? 'bg-accent-500 hover:bg-accent-600 text-white shadow-lg hover:shadow-accent-500/20' 
                          : 'bg-slate-900 hover:bg-slate-800 text-white shadow-sm'
                      }`}
                    >
                      Select Plan
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </motion.div>
      </section>

      {/* 5. WHY CHOOSE US / OUR QUALITY */}
      <section className="py-24 relative overflow-hidden bg-slate-950 text-white border-t border-b border-slate-900">
        {/* Background Image with Dark Overlay */}
        <div className="absolute inset-0 z-0 pointer-events-none">
          <img
            src="/AdobeStock_464201407.jpg"
            alt="Construction Quality Background"
            className="w-full h-full object-cover object-center opacity-85 scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950/85 via-slate-950/50 to-slate-950/20" />
        </div>

        {/* Glow Blob */}
        <div className="glow-blob w-[500px] h-[500px] bg-accent-500/10 top-0 left-0" />

        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10"
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            
            {/* Left Column: Headline and description */}
            <div className="lg:col-span-5 space-y-6">
              <span className="text-accent-400 text-xs font-bold tracking-widest uppercase block">
                Our Quality
              </span>
              <h2 className="text-3xl sm:text-5xl font-bold font-serif text-white tracking-tight leading-tight">
                Building Excellence With Dedication
              </h2>
              <div className="h-1 w-20 bg-accent-500 rounded-full" />
              <p className="text-slate-200 text-sm sm:text-base leading-relaxed font-normal">
                We stand apart from other builders by maintaining absolute adherence to legal parameters, utilizing the highest grade materials, and upholding transparency.
              </p>
              <div className="pt-4">
                <Link
                  to="/about"
                  className="inline-flex items-center text-sm font-bold text-accent-400 hover:text-accent-305 transition-colors group"
                >
                  Learn More About Our Standards
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>

            {/* Right Column: Premium vertical indicators */}
            <div className="lg:col-span-7 space-y-4">
              {[
                "Uncompromising Quality",
                "Experienced Professionals",
                "Tailored Solutions",
                "Timely Completion",
                "Transparent Communication"
              ].map((pt, i) => (
                <div 
                  key={i} 
                  className="bg-slate-900/40 border border-white/5 backdrop-blur-md p-5 rounded-2xl flex items-center justify-between hover:bg-slate-900/70 hover:border-accent-500/30 transition-all duration-300 group/item shadow-xl shadow-black/5"
                >
                  <div className="flex items-center space-x-4">
                    <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-accent-500/20 flex items-center justify-center text-accent-400 font-serif font-bold text-base transition-colors group-hover/item:bg-accent-500 group-hover/item:text-white">
                      0{i+1}
                    </div>
                    <span className="text-white font-serif font-bold text-base sm:text-lg">{pt}</span>
                  </div>
                  <div className="text-accent-400 group-hover/item:translate-x-1 transition-transform">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              ))}
            </div>

          </div>
        </motion.div>
      </section>

      {/* 6. TESTIMONIALS SECTION */}
      <section className="bg-slate-50/50 border-t border-b border-slate-200/60 py-14 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 rounded-3xl my-6 relative overflow-hidden premium-grid">
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

      {/* 7. CONTACT / ENQUIRY BANNER */}
      <section className="bg-slate-900 py-16 text-center text-white border-t border-slate-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-white mb-4">
            Looking for a Trusted Design & Construction Partner?
          </h2>
          <p className="text-slate-200 text-sm sm:text-base max-w-2xl mx-auto mb-8 leading-relaxed font-sans">
            Outline requirements, scopes, and budget goals. Our engineering and architecture specialists will respond with a tailored project roadmap.
          </p>
          <Link
            to="/contact"
            className="inline-flex items-center px-8 py-3.5 text-base font-semibold rounded-lg bg-accent-500 text-white hover:bg-accent-600 transition-colors shadow-lg hover:shadow-accent-500/20"
          >
            Submit Enquiry
            <ArrowRight className="h-5 w-5 ml-2" />
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;

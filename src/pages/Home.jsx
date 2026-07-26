import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { 
  Building2, ShieldCheck, Calendar, FileText, 
  ArrowRight, Award, MapPin, Users, Key, Star, Sparkles
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
      subtitle: "Rules Of Construction",
      title: "Industrial Construction Responsibility"
    },
    {
      subtitle: "Grow Your Building",
      title: "Industrial Solution To Build Factory"
    },
    {
      subtitle: "Get Construction Help",
      title: "Delivering The Results You Think That"
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
      desc: "From residential villas to commercial workspaces, we construct with high precision, durability, and modern engineering layout controls.",
      icon: ShieldCheck,
    },
    {
      title: "Architectural Design",
      desc: "Our architects blend functional spatial flow mapping with vastu-compliant blueprints to create spaces that impress.",
      icon: Calendar,
    },
    {
      title: "Interiors & Styling",
      desc: "Transform your home and office interiors with custom modular setups, premium flooring, and curated lighting packages.",
      icon: FileText,
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
            src="https://assets.mixkit.co/videos/preview/mixkit-building-under-construction-in-a-city-41721-large.mp4"
            className="absolute inset-0 w-full h-full object-cover object-center opacity-65"
            autoPlay
            loop
            muted
            playsInline
            poster="https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&w=1200&q=80"
          />
        </div>
        
        {/* Softer overlay to make the background video more clear and visible */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/55 via-black/25 to-transparent z-10" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent z-10" />

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
      <section className="relative z-20 -mt-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white text-slate-850 rounded-xl shadow-xl border border-slate-200/80 p-6 md:p-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12 divide-y-2 divide-slate-100 lg:divide-y-0 lg:divide-x-2 lg:divide-slate-100">
            {stats.map((stat, idx) => (
              <div key={idx} className="flex items-center space-x-4 pt-6 first:pt-0 lg:pt-0 lg:pl-8 first:pl-0">
                <div className="p-3 bg-accent-500/5 rounded-lg text-accent-650 border border-accent-500/10">
                  <stat.icon className="h-6 w-6" />
                </div>
                <div>
                  <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-serif">{stat.value}</div>
                  <div className="text-xs sm:text-sm text-slate-505 tracking-wide font-medium">{stat.label}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. PROVIDED FEATURES (SERVICES SUM) */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative overflow-hidden bg-white">
        {/* Geometric Compass SVG Background Illustration */}
        <div className="absolute right-0 bottom-0 opacity-[0.03] pointer-events-none translate-x-20 translate-y-20 z-0">
          <svg width="450" height="450" viewBox="0 0 100 100" fill="none" stroke="currentColor" className="text-accent-500">
            <circle cx="50" cy="50" r="40" strokeWidth="0.5" />
            <circle cx="50" cy="50" r="30" strokeWidth="0.25" />
            <line x1="50" y1="10" x2="50" y2="90" strokeWidth="0.5" strokeDasharray="1 1" />
            <line x1="10" y1="50" x2="90" y2="50" strokeWidth="0.5" strokeDasharray="1 1" />
            <polygon points="50,20 54,46 80,50 54,54 50,80 46,54 20,50 46,46" strokeWidth="0.5" />
          </svg>
        </div>

        <div className="text-center max-w-3xl mx-auto mb-16 relative z-10">
          <span className="text-accent-500 text-sm font-semibold tracking-wider uppercase block mb-2">Capabilities</span>
          <h2 className="text-3xl md:text-4xl font-bold font-serif text-slate-900">Provided Features</h2>
          <p className="text-slate-500 text-sm mt-4 leading-relaxed">
            Construction, design, interiors, and PMC come together under one roof so that your project feels seamless from the first draft to handover.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative z-10">
          {features.map((feat, idx) => (
            <div key={idx} className="bg-white p-8 rounded-xl border border-slate-200 flex flex-col items-start hover:border-accent-500/30 transition-all duration-300 shadow-sm hover:shadow-md">
              <div className="p-3.5 bg-accent-500/10 rounded-lg text-accent-500 mb-6 border border-accent-500/20">
                <feat.icon className="h-6 w-6" />
              </div>
              <h3 className="font-serif text-lg font-bold mb-3 text-slate-900">{feat.title}</h3>
              <p className="text-sm text-slate-550 leading-relaxed">{feat.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 4. HOME CONSTRUCTION PACKAGES */}
      <section 
        className="border-t border-b border-slate-200/50 py-20 relative overflow-hidden bg-slate-50"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 40h40M40 0v40' fill='none' stroke='rgba(4,120,87,0.025)' stroke-width='1'/%3E%3C/svg%3E")`
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-accent-500 text-sm font-semibold tracking-wider uppercase block mb-2">Pricing</span>
            <h2 className="text-3xl md:text-4xl font-bold font-serif text-slate-900">Home Construction Packages</h2>
            <p className="text-slate-500 text-sm mt-4 leading-relaxed">
              Transparent, milestone-based packages utilizing premium materials and vetted trade partner specifications.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {packages.map((pkg, idx) => (
              <div key={idx} className="bg-white p-6 rounded-xl border border-slate-200/80 flex flex-col justify-between hover:border-accent-500/30 hover:shadow-lg transition-all duration-300">
                <div>
                  <h3 className="font-serif text-base font-bold text-slate-900 mb-2">{pkg.name}</h3>
                  <div className="text-2xl font-extrabold text-accent-600 mb-6">{pkg.price}</div>
                  <ul className="space-y-3.5 text-xs text-slate-555 font-medium">
                    {pkg.details.map((detail, dIdx) => (
                      <li key={dIdx} className="flex items-center">
                        <span className="h-1.5 w-1.5 bg-accent-500 rounded-full mr-2" />
                        {detail}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="mt-8 border-t border-slate-100 pt-4">
                  <Link 
                    to="/contact" 
                    className="w-full inline-flex items-center justify-center py-2 bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs rounded-lg transition-colors"
                  >
                    Select Plan
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. WHY CHOOSE US / OUR QUALITY */}
      <section 
        className="py-24 relative overflow-hidden bg-white border-t border-slate-100"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='20' height='20' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'%3E%3Ccircle cx='2' cy='2' r='1' fill='rgba(4,120,87,0.02)'/%3E%3C/svg%3E")`
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            
            {/* Left Column: Headline and description */}
            <div className="lg:col-span-5 space-y-6">
              <span className="text-accent-500 text-sm font-semibold tracking-wider uppercase block">
                Our Quality
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold font-serif text-slate-900 leading-tight">
                Building Excellence With Dedication
              </h2>
              <p className="text-slate-550 text-sm sm:text-base leading-relaxed">
                We stand apart from other builders by maintaining absolute adherence to legal parameters, utilizing the highest grade materials, and upholding transparency.
              </p>
              <div className="pt-4">
                <Link
                  to="/about"
                  className="inline-flex items-center text-sm font-bold text-accent-600 hover:text-accent-700 transition-colors"
                >
                  Learn More About Our Standards
                  <ArrowRight className="ml-2 h-4 w-4" />
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
                  className="bg-slate-50/50 p-5 rounded-xl border border-slate-200/60 flex items-center justify-between hover:border-accent-500/20 hover:bg-slate-50 transition-all duration-300 shadow-sm"
                >
                  <div className="flex items-center space-x-4">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-accent-500/10 flex items-center justify-center text-accent-600 font-serif font-bold text-sm">
                      0{i+1}
                    </div>
                    <span className="text-slate-800 font-serif font-bold text-base sm:text-lg">{pt}</span>
                  </div>
                  <div className="text-accent-500">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              ))}
            </div>

          </div>
        </div>
      </section>

      {/* 6. TESTIMONIALS SECTION */}
      <section className="bg-slate-50 border-t border-slate-200/60 py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 rounded-xl my-10 relative overflow-hidden">
        {/* Subtle structural trace lines in background */}
        <div className="absolute left-0 top-0 opacity-[0.02] pointer-events-none translate-x-5 translate-y-5 z-0">
          <svg width="250" height="250" viewBox="0 0 100 100" fill="none" stroke="currentColor" className="text-slate-900">
            <rect x="10" y="10" width="80" height="80" strokeWidth="0.5" />
            <line x1="10" y1="10" x2="90" y2="90" strokeWidth="0.5" />
            <line x1="90" y1="10" x2="10" y2="90" strokeWidth="0.5" />
          </svg>
        </div>

        <div className="text-center max-w-3xl mx-auto mb-16 relative z-10">
          <span className="text-accent-500 text-sm font-semibold tracking-wider uppercase block mb-2">Client Testimonials</span>
          <h2 className="text-3xl md:text-4xl font-bold font-serif text-slate-900">Words from Our Clients</h2>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative z-10">
            {[1, 2, 3].map((n) => (
              <div key={n} className="bg-white rounded-xl border border-slate-200 p-6 h-64 animate-pulse" />
            ))}
          </div>
        ) : (
          <>
            {/* Desktop Static Grid Layout (shows first 3 reviews) */}
            <div className="hidden md:grid md:grid-cols-3 gap-8 relative z-10">
              {testimonials.slice(0, 3).map((test) => (
                <div key={test.id} className="bg-white p-8 rounded-xl border border-slate-200 shadow-sm flex flex-col justify-between hover:shadow-md transition-all duration-300">
                  <div>
                    <div className="flex items-center text-accent-500 space-x-0.5 mb-4">
                      {[...Array(5)].map((_, i) => (
                        <Star 
                          key={i} 
                          className={`h-4 w-4 ${i < Math.floor(test.rating) ? 'fill-current' : ''}`} 
                        />
                      ))}
                    </div>
                    <p className="text-sm italic text-slate-600 leading-relaxed mb-6">
                      "{test.quote}"
                    </p>
                  </div>
                  <div className="flex items-center">
                    <img 
                      src={test.photoUrl} 
                      alt={test.clientName} 
                      className="h-10 w-10 rounded-full object-cover mr-3 border-2 border-slate-200"
                    />
                    <div>
                      <h4 className="font-serif text-sm font-bold text-slate-900">{test.clientName}</h4>
                      <span className="text-[11px] text-accent-555 font-medium tracking-wide block uppercase">
                        {test.projectRef}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Mobile Autoscrolling Carousel Layout */}
            <div className="md:hidden relative z-10 px-2 min-h-[280px] flex flex-col justify-between">
              <AnimatePresence mode="wait">
                {testimonials.length > 0 && (
                  <motion.div
                    key={activeTestimonial}
                    initial={{ opacity: 0, x: 30 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -30 }}
                    transition={{ duration: 0.4 }}
                    className="bg-white p-8 rounded-xl border border-slate-200 shadow-sm flex flex-col justify-between flex-grow"
                  >
                    <div>
                      <div className="flex items-center text-accent-500 space-x-0.5 mb-4">
                        {[...Array(5)].map((_, i) => (
                          <Star 
                            key={i} 
                            className={`h-4 w-4 ${i < Math.floor(testimonials[activeTestimonial]?.rating || 5) ? 'fill-current' : ''}`} 
                          />
                        ))}
                      </div>
                      <p className="text-sm italic text-slate-655 leading-relaxed mb-6">
                        "{testimonials[activeTestimonial]?.quote}"
                      </p>
                    </div>
                    <div className="flex items-center mt-auto">
                      <img 
                        src={testimonials[activeTestimonial]?.photoUrl} 
                        alt={testimonials[activeTestimonial]?.clientName} 
                        className="h-10 w-10 rounded-full object-cover mr-3 border-2 border-slate-200"
                      />
                      <div>
                        <h4 className="font-serif text-sm font-bold text-slate-900">{testimonials[activeTestimonial]?.clientName}</h4>
                        <span className="text-[10px] text-accent-555 font-medium tracking-wide block uppercase">
                          {testimonials[activeTestimonial]?.projectRef}
                        </span>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Autoscroller Dot Indicators */}
              <div className="flex justify-center space-x-2 mt-6">
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
      </section>

      {/* 7. CONTACT / ENQUIRY BANNER */}
      <section className="bg-slate-900 py-16 text-center text-white border-t border-slate-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-white mb-4">
            Looking for a Trusted Design & Construction Partner?
          </h2>
          <p className="text-slate-300 text-sm sm:text-base max-w-2xl mx-auto mb-8 leading-relaxed font-sans">
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

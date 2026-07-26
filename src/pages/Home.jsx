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
      title: "Industrial Construction Responsibility",
      bgImage: "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&w=1920&q=80"
    },
    {
      subtitle: "Grow Your Building",
      title: "Industrial Solution To Build Factory",
      bgImage: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=1920&q=80"
    },
    {
      subtitle: "Get Construction Help",
      title: "Delivering The Results You Think That",
      bgImage: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1920&q=80"
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

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

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
        {/* Background Images with transitions */}
        {slides.map((slide, idx) => (
          <div
            key={idx}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out z-0 ${
              idx === currentSlide ? 'opacity-35' : 'opacity-0'
            }`}
          >
            <img 
              src={slide.bgImage} 
              alt={slide.title} 
              className="w-full h-full object-cover object-center scale-105"
            />
          </div>
        ))}
        {/* Soft Left-to-Right and Top-to-Bottom overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950/80 via-slate-900/40 to-transparent z-10" />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/40 via-transparent to-transparent z-10" />

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
                
                <p className="text-sm sm:text-base text-slate-300 max-w-2xl font-sans leading-relaxed font-light">
                  Srinidhi Infra Developers is a leading design-build firm specializing in turning residential and commercial visions into structurally superior environments.
                </p>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Navigation Dots */}
          <div className="absolute bottom-8 left-4 sm:left-8 flex space-x-3 z-30">
            {slides.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentSlide(idx)}
                className={`h-2 rounded-full transition-all duration-300 ${
                  idx === currentSlide ? 'bg-accent-500 w-8' : 'bg-white/40 w-2 hover:bg-white/70'
                }`}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>
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
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-accent-500 text-sm font-semibold tracking-wider uppercase block mb-2">Capabilities</span>
          <h2 className="text-3xl md:text-4xl font-bold font-serif text-slate-900">Provided Features</h2>
          <p className="text-slate-500 text-sm mt-4 leading-relaxed">
            Construction, design, interiors, and PMC come together under one roof so that your project feels seamless from the first draft to handover.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
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
      <section className="bg-slate-50 border-t border-b border-slate-200/50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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
                  <ul className="space-y-3.5 text-xs text-slate-550 font-medium">
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

      {/* 5. WHY CHOOSE US */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-accent-500 text-sm font-semibold tracking-wider uppercase block mb-2">Our Quality</span>
            <h2 className="text-3xl md:text-4xl font-bold font-serif text-slate-900">Building Excellence With Dedication</h2>
            <p className="text-slate-550 text-sm md:text-base mt-4 leading-relaxed">
              We stand apart from other builders by maintaining absolute adherence to legal parameters, utilizing the highest grade materials, and upholding transparency.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-6 text-center">
            {[
              "Uncompromising Quality",
              "Experienced Professionals",
              "Tailored Solutions",
              "Timely Completion",
              "Transparent Communication"
            ].map((pt, i) => (
              <div key={i} className="bg-slate-50 p-6 rounded-xl border border-slate-200/80 flex flex-col items-center justify-center hover:border-accent-500/20 transition-all duration-200">
                <span className="text-3xl font-extrabold text-accent-555 block mb-2 font-sans">0{i+1}</span>
                <h4 className="text-xs font-bold text-slate-800 tracking-wide uppercase leading-tight">{pt}</h4>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. TESTIMONIALS SECTION */}
      <section className="bg-slate-50 border-t border-slate-200/60 py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 rounded-xl my-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-accent-500 text-sm font-semibold tracking-wider uppercase block mb-2">Client Testimonials</span>
          <h2 className="text-3xl md:text-4xl font-bold font-serif text-slate-900">Words from Our Clients</h2>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[1, 2, 3].map((n) => (
              <div key={n} className="bg-white rounded-xl border border-slate-200 p-6 h-64 animate-pulse" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((test) => (
              <div key={test.id} className="bg-white p-8 rounded-xl border border-slate-200 shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow">
                <div>
                  <div className="flex items-center text-accent-500 space-x-0.5 mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-current" />
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
                      Client
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
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

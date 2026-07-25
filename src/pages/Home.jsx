import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Building2, ShieldCheck, Calendar, FileText, 
  ArrowRight, Award, MapPin, Users, Key, Star, Sparkles
} from 'lucide-react';
import { getProjects, getTestimonials, getPosts, getSettings } from '../services/db';

const Home = () => {
  const [projects, setProjects] = useState([]);
  const [testimonials, setTestimonials] = useState([]);
  const [posts, setPosts] = useState([]);
  const [settings, setSettings] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [projs, tests, pts, sets] = await Promise.all([
          getProjects(),
          getTestimonials(),
          getPosts(),
          getSettings()
        ]);
        setProjects(projs.slice(0, 3)); // show first 3
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

  const stats = [
    { value: settings?.stats?.experience || '12+', label: 'Years Experience', icon: Award },
    { value: settings?.stats?.projects || '25+', label: 'Projects Delivered', icon: Building2 },
    { value: settings?.stats?.developed || '5M+', label: 'Sq. Ft. Developed', icon: Key },
    { value: settings?.stats?.families || '2,000+', label: 'Happy Families', icon: Users },
  ];

  const features = [
    {
      title: "Quality Construction",
      desc: "Uncompromising standards of safety, durability, and aesthetics in every square inch built.",
      icon: ShieldCheck,
    },
    {
      title: "On-time Delivery",
      desc: "Rigorous planning and execution timelines ensure we handover your properties exactly when promised.",
      icon: Calendar,
    },
    {
      title: "100% Legal Transparency",
      desc: "Complete clear titles, clear documentation, and all state approvals including registered RERA licenses.",
      icon: FileText,
    },
  ];

  return (
    <div className="bg-slate-50 min-h-screen">
      {/* 1. HERO SECTION */}
      <section className="relative h-[90vh] min-h-[600px] flex items-center justify-center bg-gradient-to-br from-emerald-900 via-emerald-950 to-slate-950 overflow-hidden">
        {/* Background Image with Dark Overlay */}
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1920&q=80" 
            alt="Flagship Project Background" 
            className="w-full h-full object-cover object-center opacity-65 scale-105 animate-pulse-slow"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-emerald-950/60 via-emerald-900/30 to-slate-950/15" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white mt-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-6"
          >
            <div className="inline-flex items-center space-x-2 bg-accent-500/10 border border-accent-500/30 px-3.5 py-1.5 rounded-full text-accent-400 text-xs font-semibold uppercase tracking-widest">
              <Sparkles className="h-4 w-4 mr-1" />
              Redefining Infrastructure Excellence
            </div>
            
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-serif leading-tight max-w-4xl mx-auto">
              Crafting Spaces Built on <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-300 to-white">Trust & Quality</span>
            </h1>
            
            <p className="text-lg sm:text-xl text-slate-300 max-w-2xl mx-auto font-sans leading-relaxed">
              We design and construct premium residential communities, business avenues, and open plot layouts tailored for sustainable progress.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
              <Link
                to="/projects"
                className="w-full sm:w-auto px-8 py-4 text-base font-semibold rounded-lg bg-accent-500 text-white hover:bg-accent-400 transition-colors shadow-lg hover:shadow-accent-500/20 text-center"
              >
                Explore Projects
              </Link>
              <Link
                to="/contact"
                className="w-full sm:w-auto px-8 py-4 text-base font-semibold rounded-lg bg-slate-900 border border-slate-800 text-white hover:bg-slate-800 transition-colors text-center"
              >
                Enquire Now
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 2. QUICK STATS BAR */}
      <section className="relative z-20 -mt-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-emerald-800 to-emerald-900 text-white rounded-xl shadow-xl border border-emerald-700/50 p-6 md:p-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12 divide-y-2 divide-emerald-700/30 lg:divide-y-0 lg:divide-x-2 lg:divide-emerald-700/30">
            {stats.map((stat, idx) => (
              <div key={idx} className="flex items-center space-x-4 pt-6 first:pt-0 lg:pt-0 lg:pl-8 first:pl-0">
                <div className="p-3 bg-white/10 rounded-lg text-emerald-300">
                  <stat.icon className="h-6 w-6" />
                </div>
                <div>
                  <div className="text-2xl sm:text-3xl font-extrabold text-white font-sans">{stat.value}</div>
                  <div className="text-xs sm:text-sm text-emerald-100 tracking-wide font-medium">{stat.label}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. FEATURED PROJECTS SECTION */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12">
          <div>
            <span className="text-accent-500 text-sm font-semibold tracking-wider uppercase block mb-2">Our Landmarks</span>
            <h2 className="text-3xl md:text-4xl font-bold font-serif text-slate-950">Featured Developments</h2>
          </div>
          <Link to="/projects" className="group mt-4 md:mt-0 text-sm font-bold text-accent-600 hover:text-accent-500 flex items-center transition-colors">
            View All Projects <ArrowRight className="h-4 w-4 ml-1.5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[1, 2, 3].map((n) => (
              <div key={n} className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm h-96 animate-pulse" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {projects.map((proj) => (
              <Link 
                key={proj.id} 
                to={`/projects/${proj.id}`} 
                className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 flex flex-col group"
              >
                <div className="relative h-56 overflow-hidden">
                  <img 
                    src={proj.images?.[0] || 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&w=800&q=80'} 
                    alt={proj.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-4 left-4 bg-emerald-700/90 text-white text-xs font-semibold px-2.5 py-1 rounded capitalize tracking-wide">
                    {proj.type}
                  </div>
                  <div className={`absolute top-4 right-4 text-xs font-bold px-2.5 py-1 rounded capitalize tracking-wide shadow ${
                    proj.status === 'ongoing' ? 'bg-amber-500 text-slate-950' : 
                    proj.status === 'completed' ? 'bg-green-600 text-white' : 'bg-blue-600 text-white'
                  }`}>
                    {proj.status}
                  </div>
                </div>

                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center text-slate-500 text-xs font-medium mb-2">
                      <MapPin className="h-3.5 w-3.5 mr-1 text-slate-400" />
                      {proj.location}
                    </div>
                    <h3 className="font-serif text-lg font-bold text-slate-900 group-hover:text-accent-600 transition-colors mb-2">
                      {proj.name}
                    </h3>
                    <p className="text-sm text-slate-600 line-clamp-3 leading-relaxed mb-4">
                      {proj.description}
                    </p>
                  </div>
                  <div className="border-t border-slate-100 pt-4 flex justify-between items-center text-sm font-semibold">
                    <span className="text-slate-500 text-xs font-normal">Pricing Starts At</span>
                    <span className="text-accent-600">{proj.priceRange.split(' - ')[0]}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>

      {/* 4. WHY CHOOSE US */}
      <section className="bg-gradient-to-br from-emerald-900 to-emerald-950 py-20 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-emerald-400 text-sm font-semibold tracking-wider uppercase block mb-2">Why Srinidhi</span>
            <h2 className="text-3xl md:text-4xl font-bold font-serif text-white">A Foundation Built on Solid Values</h2>
            <p className="text-emerald-100/80 text-sm md:text-base mt-4 leading-relaxed">
              We stand apart from other builders by maintaining absolute adherence to legal parameters, utilizing the highest grade materials, and upholding transparency.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feat, idx) => (
              <div key={idx} className="bg-emerald-900/40 p-8 rounded-xl border border-emerald-700/30 flex flex-col items-start hover:border-emerald-500/20 transition-colors">
                <div className="p-3.5 bg-emerald-500/10 rounded-lg text-emerald-300 mb-6">
                  <feat.icon className="h-6 w-6" />
                </div>
                <h3 className="font-serif text-lg font-bold mb-3 text-white">{feat.title}</h3>
                <p className="text-sm text-emerald-100 leading-relaxed">{feat.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. TESTIMONIALS SECTION */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-accent-500 text-sm font-semibold tracking-wider uppercase block mb-2">Client Testimonials</span>
          <h2 className="text-3xl md:text-4xl font-bold font-serif text-slate-950">Words from Our Homeowners</h2>
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
                  <div className="flex items-center text-amber-500 space-x-0.5 mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-current" />
                    ))}
                  </div>
                  <p className="text-sm italic text-slate-650 leading-relaxed mb-6">
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
                    <h4 className="font-serif text-sm font-bold text-slate-950">{test.clientName}</h4>
                    <span className="text-[11px] text-slate-500 font-medium tracking-wide block uppercase">
                      Client, {test.projectRef}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* 6. LATEST NEWS PREVIEW */}
      <section className="bg-slate-50 py-20 border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-end mb-12">
            <div>
              <span className="text-accent-500 text-sm font-semibold tracking-wider uppercase block mb-2">Blogs & Articles</span>
              <h2 className="text-3xl md:text-4xl font-bold font-serif text-slate-950">Market Updates & Legal Guides</h2>
            </div>
            <Link to="/blog" className="group text-sm font-bold text-accent-600 hover:text-accent-500 flex items-center transition-colors">
              Read Blog <ArrowRight className="h-4 w-4 ml-1.5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {posts.map((post) => (
              <Link 
                key={post.id} 
                to={`/blog/${post.id}`} 
                className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 flex flex-col md:flex-row group"
              >
                <div className="md:w-2/5 h-48 md:h-full relative shrink-0">
                  <img 
                    src={post.coverImageUrl} 
                    alt={post.title} 
                    className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-300"
                  />
                </div>
                <div className="p-6 md:w-3/5 flex flex-col justify-between">
                  <div>
                    <span className="text-[11px] text-slate-400 font-semibold tracking-wider block mb-2 uppercase">
                      {new Date(post.publishedAt).toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' })}
                    </span>
                    <h3 className="font-serif text-base font-bold text-slate-950 group-hover:text-accent-600 transition-colors leading-snug mb-3">
                      {post.title}
                    </h3>
                    <p className="text-xs text-slate-500 line-clamp-3 leading-relaxed mb-4">
                      {post.content}
                    </p>
                  </div>
                  <span className="text-xs text-accent-600 font-bold group-hover:underline flex items-center">
                    Read Article <ArrowRight className="h-3 w-3 ml-1" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 7. CONTACT / ENQUIRY BANNER */}
      <section className="bg-gradient-to-tr from-slate-950 via-slate-900 to-slate-950 py-16 text-center text-white border-t border-slate-900">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-white mb-4">
            Looking for a Trusted Development Partner in Hyderabad?
          </h2>
          <p className="text-slate-300 text-sm sm:text-base max-w-2xl mx-auto mb-8 leading-relaxed font-sans">
            Whether you want to invest in gated plot layouts, premium residential apartments, or corporate retail sites, our specialists are ready to guide you.
          </p>
          <Link
            to="/contact"
            className="inline-flex items-center px-8 py-3.5 text-base font-semibold rounded-lg bg-accent-500 text-white hover:bg-accent-400 transition-colors shadow-lg hover:shadow-accent-500/20"
          >
            Schedule a Site Visit
            <ArrowRight className="h-5 w-5 ml-2" />
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;

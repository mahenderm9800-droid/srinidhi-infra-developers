import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, ArrowRight, Grid, Home as HomeIcon, Layers, Filter } from 'lucide-react';
import { getProjects } from '../services/db';

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [filteredProjects, setFilteredProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  // Filters state
  const [selectedStatus, setSelectedStatus] = useState('all'); // all, ongoing, completed, upcoming
  const [selectedType, setSelectedType] = useState('all'); // all, residential, commercial, plots

  useEffect(() => {
    const loadProjects = async () => {
      try {
        const data = await getProjects();
        setProjects(data);
        setFilteredProjects(data);
      } catch (err) {
        console.error("Error loading projects", err);
      } finally {
        setLoading(false);
      }
    };
    loadProjects();
  }, []);

  // Apply filters
  useEffect(() => {
    let result = [...projects];

    if (selectedStatus !== 'all') {
      result = result.filter(p => p.status.toLowerCase() === selectedStatus.toLowerCase());
    }

    if (selectedType !== 'all') {
      result = result.filter(p => p.type.toLowerCase() === selectedType.toLowerCase());
    }

    setFilteredProjects(result);
  }, [selectedStatus, selectedType, projects]);

  const statuses = [
    { value: 'all', label: 'All Projects' },
    { value: 'ongoing', label: 'Ongoing' },
    { value: 'completed', label: 'Completed' },
    { value: 'upcoming', label: 'Upcoming' }
  ];

  const types = [
    { value: 'all', label: 'All Types' },
    { value: 'residential', label: 'Residential' },
    { value: 'commercial', label: 'Commercial' },
    { value: 'plots', label: 'Open Plots & Layouts' }
  ];

  return (
    <div className="bg-slate-50 min-h-screen">
      {/* Page Header */}
      <section className="bg-gradient-to-r from-emerald-800 to-emerald-950 pt-32 pb-12 text-white relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center md:text-left">
          <span className="text-accent-400 text-xs font-semibold tracking-widest uppercase block mb-2">Our Portfolio</span>
          <h1 className="text-3xl sm:text-4xl font-serif font-bold text-white">Srinidhi Developments</h1>
          <p className="text-xs sm:text-sm text-slate-450 mt-2 max-w-xl">
            Explore our range of quality construction projects, gated plot layouts, and corporate workspaces. Filter to find the right investment.
          </p>
        </div>
      </section>

      {/* Filter and Content Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white rounded-xl border border-slate-205 p-6 shadow-sm mb-10 flex flex-col gap-6">
          {/* Header for filters */}
          <div className="flex items-center text-slate-800 font-bold border-b border-slate-100 pb-3">
            <Filter className="h-4.5 w-4.5 mr-2 text-accent-500" />
            <span className="text-sm font-sans tracking-wide">Filter Projects</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Status Filter */}
            <div>
              <span className="text-xs text-slate-500 font-semibold tracking-wider block mb-3 uppercase">Project Status</span>
              <div className="flex flex-wrap gap-2">
                {statuses.map(st => (
                  <button
                    key={st.value}
                    onClick={() => setSelectedStatus(st.value)}
                    className={`px-4 py-2 rounded-lg text-xs font-semibold transition-all duration-200 ${
                      selectedStatus === st.value
                        ? 'bg-emerald-600 text-white shadow-sm'
                        : 'bg-slate-100 text-slate-650 hover:bg-slate-200'
                    }`}
                  >
                    {st.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Type Filter */}
            <div>
              <span className="text-xs text-slate-500 font-semibold tracking-wider block mb-3 uppercase">Property Type</span>
              <div className="flex flex-wrap gap-2">
                {types.map(tp => (
                  <button
                    key={tp.value}
                    onClick={() => setSelectedType(tp.value)}
                    className={`px-4 py-2 rounded-lg text-xs font-semibold transition-all duration-200 ${
                      selectedType === tp.value
                        ? 'bg-accent-500 text-white shadow-sm'
                        : 'bg-slate-100 text-slate-650 hover:bg-slate-200'
                    }`}
                  >
                    {tp.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Projects Grid */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map(n => (
              <div key={n} className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm h-[400px] animate-pulse" />
            ))}
          </div>
        ) : filteredProjects.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-xl border border-slate-200 shadow-sm">
            <Layers className="h-12 w-12 text-slate-350 mx-auto mb-4" />
            <h3 className="font-serif text-lg font-bold text-slate-800 mb-2">No Projects Match Selected Filters</h3>
            <p className="text-sm text-slate-500 mb-6">Try selecting a different status or type filter.</p>
            <button 
              onClick={() => { setSelectedStatus('all'); setSelectedType('all'); }} 
              className="px-6 py-2 bg-emerald-600 text-white text-xs font-semibold rounded-lg hover:bg-slate-800 transition-colors"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <motion.div 
            layout 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            <AnimatePresence mode="popLayout">
              {filteredProjects.map((proj) => (
                <motion.div
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3 }}
                  key={proj.id}
                  className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-md transition-shadow flex flex-col group"
                >
                  <div className="relative h-56 overflow-hidden">
                    <img 
                      src={proj.images?.[0] || 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&w=800&q=80'} 
                      alt={proj.name}
                      className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-300"
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
                      <h3 className="font-serif text-lg font-bold text-slate-900 mb-2">
                        {proj.name}
                      </h3>
                      <p className="text-xs text-slate-500 line-clamp-3 leading-relaxed mb-4">
                        {proj.description}
                      </p>
                    </div>

                    <div className="border-t border-slate-100 pt-4 mt-auto">
                      <div className="flex justify-between items-center text-xs font-medium text-slate-500 mb-4">
                        <span>Price Range:</span>
                        <span className="font-semibold text-accent-600">{proj.priceRange}</span>
                      </div>
                      
                      <Link 
                        to={`/projects/${proj.id}`} 
                        className="w-full inline-flex items-center justify-center px-4 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold rounded-lg transition-colors group/btn"
                      >
                        View Project Details 
                        <ArrowRight className="h-3.5 w-3.5 ml-1.5 group-hover/btn:translate-x-0.5 transition-transform" />
                      </Link>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        )}
      </section>
    </div>
  );
};

export default Projects;

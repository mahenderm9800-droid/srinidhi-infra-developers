import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, ArrowRight, Grid, Home as HomeIcon, Layers, Filter } from 'lucide-react';
import { getProjects } from '../services/db';
import PageHero from '../components/PageHero';

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
    <div className="bg-slate-50/50 min-h-screen font-sans">
      {/* Page Header */}
      <PageHero
        eyebrow="Our Portfolio"
        title="Srinidhi Developments"
        align="left"
        image="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1600&q=80"
        description="Explore our range of quality construction projects, gated plot layouts, and corporate workspaces. Filter to find the right investment."
      />


      {/* Filter and Content Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-12 relative overflow-hidden">
        {/* Glow Blob */}
        <div className="glow-blob w-96 h-96 bg-accent-400/10 top-20 right-10" />

        <div className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-sm mb-10 flex flex-col gap-6 relative z-10">
          {/* Header for filters */}
          <div className="flex items-center text-slate-800 font-bold border-b border-slate-100 pb-3">
            <Filter className="h-4.5 w-4.5 mr-2 text-accent-600" />
            <span className="text-sm font-sans tracking-wide">Filter Projects</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Status Filter */}
            <div>
              <span className="text-xs text-slate-500 font-bold tracking-wider block mb-3 uppercase">Project Status</span>
              <div className="flex flex-wrap gap-2">
                {statuses.map(st => (
                  <button
                    key={st.value}
                    onClick={() => setSelectedStatus(st.value)}
                    className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all duration-200 border ${selectedStatus === st.value
                        ? 'bg-accent-600 border-accent-650 text-white shadow-md shadow-accent-500/10'
                        : 'bg-slate-50 hover:bg-slate-100 border-slate-200/60 text-slate-600 hover:text-slate-900'
                      }`}
                  >
                    {st.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Type Filter */}
            <div>
              <span className="text-xs text-slate-500 font-bold tracking-wider block mb-3 uppercase">Property Type</span>
              <div className="flex flex-wrap gap-2">
                {types.map(tp => (
                  <button
                    key={tp.value}
                    onClick={() => setSelectedType(tp.value)}
                    className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all duration-200 border ${selectedType === tp.value
                        ? 'bg-accent-600 border-accent-650 text-white shadow-md shadow-accent-500/10'
                        : 'bg-slate-50 hover:bg-slate-100 border-slate-200/60 text-slate-600 hover:text-slate-900'
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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 relative z-10">
            {[1, 2, 3].map(n => (
              <div key={n} className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm h-[400px] animate-pulse" />
            ))}
          </div>
        ) : filteredProjects.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-2xl border border-slate-200 shadow-sm relative z-10">
            <Layers className="h-12 w-12 text-slate-350 mx-auto mb-4" />
            <h3 className="font-serif text-lg font-bold text-slate-800 mb-2">No Projects Match Selected Filters</h3>
            <p className="text-sm text-slate-500 mb-6">Try selecting a different status or type filter.</p>
            <button
              onClick={() => { setSelectedStatus('all'); setSelectedType('all'); }}
              className="px-6 py-2 bg-accent-600 text-white text-xs font-semibold rounded-lg hover:bg-slate-800 transition-colors"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <motion.div
            layout
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 relative z-10"
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
                  className="premium-card premium-card-hover card-sheen overflow-hidden flex flex-col group"
                >
                  <div className="relative h-56 overflow-hidden">
                    <img
                      src={proj.images?.[0] || 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&w=800&q=80'}
                      alt={proj.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-4 left-4 bg-slate-900/80 backdrop-blur-md text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                      {proj.type}
                    </div>
                    <div className={`absolute top-4 right-4 text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow ${proj.status === 'ongoing' ? 'bg-amber-500 text-slate-950' :
                        proj.status === 'completed' ? 'bg-green-600 text-white' : 'bg-blue-600 text-white'
                      }`}>
                      {proj.status}
                    </div>
                  </div>

                  <div className="p-6 flex-grow flex flex-col justify-between">
                    <div>
                      <div className="flex items-center text-slate-500 text-xs font-medium mb-2.5">
                        <MapPin className="h-3.5 w-3.5 mr-1 text-accent-605" />
                        {proj.location}
                      </div>
                      <h3 className="font-serif text-lg font-bold text-slate-900 mb-2 group-hover:text-accent-600 transition-colors">
                        {proj.name}
                      </h3>
                      <p className="text-xs text-slate-500 line-clamp-3 leading-relaxed font-light mb-4">
                        {proj.description}
                      </p>
                    </div>

                    <div className="border-t border-slate-100 pt-4 mt-auto">
                      <div className="flex justify-between items-center text-xs font-medium text-slate-500 mb-4">
                        <span>Price Range:</span>
                        <span className="font-bold text-accent-600 text-sm">{proj.priceRange}</span>
                      </div>

                      <Link
                        to={`/projects/${proj.id}`}
                        className="w-full inline-flex items-center justify-center px-4 py-2.5 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold rounded-xl transition-all duration-200 group/btn"
                      >
                        View Project Details
                        <ArrowRight className="h-3.5 w-3.5 ml-1.5 group-hover/btn:translate-x-1 transition-transform" />
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

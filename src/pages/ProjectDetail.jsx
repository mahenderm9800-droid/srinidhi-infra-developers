import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  MapPin, Tag, CheckCircle2, ChevronRight, FileDown, 
  Send, Phone, HelpCircle, Layers, Calendar, DollarSign
} from 'lucide-react';
import { getProjectById, addEnquiry } from '../services/db';

const ProjectDetail = () => {
  const { id } = useParams();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeImage, setActiveImage] = useState("");
  
  // Enquiry form state
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: ""
  });
  const [submitStatus, setSubmitStatus] = useState({ type: "", text: "" });
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const loadProject = async () => {
      try {
        const data = await getProjectById(id);
        if (data) {
          setProject(data);
          setActiveImage(data.images?.[0] || "");
        }
      } catch (err) {
        console.error("Error fetching project details", err);
      } finally {
        setLoading(false);
      }
    };
    loadProject();
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmitEnquiry = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.phone || !formData.email) {
      setSubmitStatus({ type: "error", text: "Please fill out all required fields (Name, Phone, Email)." });
      return;
    }
    
    setSubmitting(true);
    setSubmitStatus({ type: "", text: "" });

    try {
      await addEnquiry({
        ...formData,
        projectRef: project.name,
      });
      setSubmitStatus({ 
        type: "success", 
        text: `Thank you for your interest in ${project.name}! Our representative will contact you shortly.` 
      });
      setFormData({ name: "", email: "", phone: "", message: "" });
    } catch (error) {
      setSubmitStatus({ type: "error", text: "Something went wrong. Please try again later." });
    } finally {
      setSubmitting(false);
    }
  };

  const handleDownloadBrochure = () => {
    alert(`Brochure for "${project.name}" will start downloading shortly. (Mock file download)`);
  };

  if (loading) {
    return (
      <div className="pt-32 pb-16 text-center max-w-7xl mx-auto px-4">
        <div className="h-12 w-12 border-4 border-accent-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
        <p className="text-slate-500 text-sm">Loading project information...</p>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="pt-32 pb-24 text-center max-w-xl mx-auto px-4">
        <HelpCircle className="h-16 w-16 text-slate-300 mx-auto mb-4" />
        <h2 className="font-serif text-2xl font-bold text-slate-900 mb-2">Project Not Found</h2>
        <p className="text-sm text-slate-500 mb-6">The project you are looking for does not exist or has been removed.</p>
        <Link to="/projects" className="px-6 py-2.5 bg-slate-900 text-white rounded-lg text-xs font-semibold hover:bg-slate-800 transition-colors">
          Back to Projects
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-slate-50/50 min-h-screen">
      {/* Breadcrumbs Banner */}
      <section className="bg-slate-900 pt-28 pb-6 text-white text-xs border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center space-x-2">
          <Link to="/" className="text-slate-400 hover:text-white transition-colors">Home</Link>
          <ChevronRight className="h-3 w-3 text-slate-600" />
          <Link to="/projects" className="text-slate-400 hover:text-white transition-colors">Our Projects</Link>
          <ChevronRight className="h-3 w-3 text-slate-600" />
          <span className="text-accent-400 font-semibold">{project.name}</span>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-12 relative overflow-hidden">
        {/* Glow Blob */}
        <div className="glow-blob w-96 h-96 bg-accent-400/10 top-20 right-10" />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 relative z-10">
          
          {/* Left Column: Details & Images */}
          <div className="lg:col-span-2 space-y-8">
            <div>
              <div className="flex flex-wrap items-center gap-3 mb-3">
                <span className="bg-slate-200 text-slate-800 text-[10px] font-bold px-3 py-1 rounded-full capitalize tracking-wider">
                  {project.type}
                </span>
                <span className={`text-[10px] font-bold px-3 py-1 rounded-full capitalize tracking-wider shadow-sm ${
                  project.status === 'ongoing' ? 'bg-amber-500 text-slate-900' : 
                  project.status === 'completed' ? 'bg-green-600 text-white' : 'bg-blue-600 text-white'
                }`}>
                  {project.status}
                </span>
                {project.reraNumber && (
                  <span className="bg-slate-900 border border-slate-800 text-slate-300 text-[9px] font-bold px-3 py-1 rounded-full tracking-wider uppercase">
                    RERA: {project.reraNumber}
                  </span>
                )}
              </div>
              <h1 className="font-serif text-3xl md:text-5xl font-bold text-gradient leading-tight">{project.name}</h1>
              <div className="flex items-center text-slate-500 text-sm mt-2.5">
                <MapPin className="h-4 w-4 mr-1 text-accent-605" />
                {project.location}
              </div>
            </div>

            {/* Image Gallery */}
            <div className="space-y-4">
              <div className="h-[400px] rounded-2xl overflow-hidden border border-slate-200/80 bg-slate-100 shadow-sm relative group">
                <img 
                  src={activeImage} 
                  alt={project.name} 
                  className="w-full h-full object-cover group-hover:scale-[1.01] transition-transform duration-500"
                />
              </div>
              
              {project.images && project.images.length > 1 && (
                <div className="flex space-x-3 overflow-x-auto pb-2">
                  {project.images.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setActiveImage(img)}
                      className={`h-20 w-28 rounded-xl overflow-hidden shrink-0 border-2 transition-all ${
                        activeImage === img ? 'border-accent-500 scale-95 shadow-md' : 'border-slate-200 hover:border-slate-350'
                      }`}
                    >
                      <img src={img} alt={`Thumbnail ${idx}`} className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Description */}
            <div className="premium-card p-6 md:p-8 space-y-4">
              <h3 className="font-serif text-lg font-bold text-slate-900 border-b border-slate-100 pb-3">
                Project Overview
              </h3>
              <p className="text-slate-500 text-sm sm:text-base leading-relaxed font-light whitespace-pre-line">
                {project.description}
              </p>
            </div>

            {/* Specifications & Unit Configurations */}
            <div className="premium-card p-6 md:p-8 space-y-4">
              <h3 className="font-serif text-lg font-bold text-slate-900 border-b border-slate-100 pb-3">
                Specifications & Price
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-16 gap-y-4 text-xs">
                <div className="space-y-3.5">
                  <div className="flex items-center justify-between border-b border-slate-50 pb-2.5">
                    <span className="text-slate-500 font-bold uppercase tracking-wider text-[10px]">Price Range</span>
                    <span className="font-bold text-accent-600 text-sm font-sans">{project.priceRange}</span>
                  </div>
                  <div className="flex items-center justify-between border-b border-slate-50 pb-2.5">
                    <span className="text-slate-500 font-bold uppercase tracking-wider text-[10px]">Project Type</span>
                    <span className="font-semibold text-slate-800 capitalize">{project.type}</span>
                  </div>
                </div>
                <div className="space-y-3.5">
                  <div className="flex items-center justify-between border-b border-slate-50 pb-2.5">
                    <span className="text-slate-500 font-bold uppercase tracking-wider text-[10px]">Location</span>
                    <span className="font-semibold text-slate-800">{project.location.split(',')[0]}</span>
                  </div>
                  <div className="flex items-center justify-between border-b border-slate-50 pb-2.5">
                    <span className="text-slate-500 font-bold uppercase tracking-wider text-[10px]">Status</span>
                    <span className="font-semibold text-slate-800 capitalize">{project.status}</span>
                  </div>
                </div>
              </div>
              
              {/* Unit Sizes */}
              <div className="pt-4">
                <span className="text-[10px] text-slate-500 font-bold tracking-wider block mb-3 uppercase">Available Configurations</span>
                <div className="flex flex-wrap gap-2.5">
                  {project.unitTypes?.map((ut, index) => (
                    <div key={index} className="bg-slate-50 border border-slate-200/80 px-4 py-2.5 rounded-xl text-xs font-semibold text-slate-850 font-sans shadow-sm">
                      {ut}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Amenities */}
            <div className="premium-card p-6 md:p-8 space-y-4">
              <h3 className="font-serif text-lg font-bold text-slate-900 border-b border-slate-100 pb-3">
                Project Amenities
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {project.amenities?.map((amenity, index) => (
                  <div key={index} className="flex items-center space-x-2.5 text-xs text-slate-705">
                    <CheckCircle2 className="h-4.5 w-4.5 text-accent-600 shrink-0" />
                    <span className="font-semibold text-slate-700">{amenity}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Map Embed Section */}
            <div className="premium-card p-6 md:p-8 space-y-4">
              <h3 className="font-serif text-lg font-bold text-slate-900 border-b border-slate-100 pb-3">
                Location Map
              </h3>
              <div className="h-64 rounded-2xl overflow-hidden border border-slate-200/80 relative bg-slate-100 shadow-inner">
                {/* Embedded Hyderabad Google Maps Search */}
                <iframe
                  title="Google Map location"
                  src={`https://www.google.com/maps/embed/v1/place?key=MOCK_MAP_KEY_FALLBACK&q=${encodeURIComponent(project.name + ', ' + project.location)}`}
                  className="w-full h-full border-0 grayscale"
                  loading="lazy"
                  onError={(e) => {
                    // Fallback to static link/map if api key is mock/not working
                    e.target.style.display = 'none';
                  }}
                />
                <div className="absolute inset-0 bg-slate-900/5 pointer-events-none" />
                {/* Fallback Map Interface */}
                <div className="w-full h-full flex flex-col items-center justify-center p-6 text-center bg-slate-900 text-white absolute inset-0 z-0">
                  <MapPin className="h-8 w-8 text-accent-500 mb-2" />
                  <p className="font-serif text-sm font-bold">{project.name}</p>
                  <p className="text-[11px] text-slate-400 mb-4">{project.location}</p>
                  <a
                    href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(project.name + ', ' + project.location)}`}
                    target="_blank"
                    rel="noreferrer"
                    className="px-4 py-2.5 bg-accent-500 hover:bg-accent-600 text-white font-bold text-xs rounded-xl transition-colors shadow-lg hover:shadow-accent-500/10"
                  >
                    Open in Google Maps
                  </a>
                </div>
              </div>
            </div>

          </div>

          {/* Right Column: Lead Form & Brochure */}
          <div className="space-y-8">
            {/* Brochure Card */}
            <div className="bg-slate-950 text-white p-6 sm:p-8 rounded-2xl border border-white/10 shadow-xl space-y-5 relative overflow-hidden group">
              <div className="glow-blob w-32 h-32 bg-accent-500/10 -top-10 -right-10 group-hover:scale-125 transition-transform" />
              <h3 className="font-serif text-base font-bold text-white relative z-10">Project Brochure</h3>
              <p className="text-xs text-slate-400 leading-relaxed font-light relative z-10">
                Download the complete e-brochure containing detailed layout plans, building elevations, and full unit configurations.
              </p>
              <button
                onClick={handleDownloadBrochure}
                className="w-full inline-flex items-center justify-center px-4 py-3.5 bg-accent-500 hover:bg-accent-600 text-white font-bold text-xs rounded-xl transition-all duration-200 shadow-md relative z-10 hover:shadow-accent-500/10"
              >
                <FileDown className="h-4.5 w-4.5 mr-2" />
                Download Brochure PDF
              </button>
            </div>

            {/* Quick Contact Form */}
            <div className="premium-card p-6 sm:p-8 space-y-6">
              <div>
                <h3 className="font-serif text-lg font-bold text-slate-900">Enquire About This Project</h3>
                <p className="text-xs text-slate-500 mt-1 font-light">
                  Fill in your details below and a Sales Specialist will provide current availability and pricing.
                </p>
              </div>

              {submitStatus.text && (
                <div className={`p-4 rounded-xl text-xs font-semibold ${
                  submitStatus.type === 'success' ? 'bg-green-50 border border-green-200/80 text-green-700' : 'bg-red-50 border border-red-200/80 text-red-700'
                }`}>
                  {submitStatus.text}
                </div>
              )}

              <form onSubmit={handleSubmitEnquiry} className="space-y-4 text-xs font-medium">
                <div>
                  <label htmlFor="name" className="block text-slate-500 mb-2 font-bold uppercase tracking-wider">Your Name *</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    placeholder="Enter your name"
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-accent-500/20 focus:border-accent-500 text-slate-800 text-xs font-light transition-all duration-200"
                  />
                </div>
                <div>
                  <label htmlFor="phone" className="block text-slate-500 mb-2 font-bold uppercase tracking-wider">Phone Number *</label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    required
                    placeholder="Enter 10-digit number"
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-accent-500/20 focus:border-accent-500 text-slate-800 text-xs font-light transition-all duration-200"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-slate-500 mb-2 font-bold uppercase tracking-wider">Email Address *</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    placeholder="name@example.com"
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-accent-500/20 focus:border-accent-500 text-slate-800 text-xs font-light transition-all duration-200"
                  />
                </div>
                <div>
                  <label htmlFor="message" className="block text-slate-500 mb-2 font-bold uppercase tracking-wider">Message</label>
                  <textarea
                    id="message"
                    name="message"
                    rows="4"
                    value={formData.message}
                    onChange={handleInputChange}
                    placeholder={`Interested in ${project.name}. Please contact me.`}
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-accent-500/20 focus:border-accent-500 text-slate-800 text-xs font-light resize-none font-sans transition-all duration-200"
                  />
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full inline-flex items-center justify-center px-4 py-3.5 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-xl transition-all duration-200 disabled:opacity-50 text-xs uppercase tracking-wider shadow"
                >
                  {submitting ? "Sending..." : (
                    <>
                      <Send className="h-4 w-4 mr-2" />
                      Submit Enquiry
                    </>
                  )}
                </button>
              </form>

              <div className="border-t border-slate-100 pt-4 text-center">
                <span className="text-[9px] text-slate-500 uppercase tracking-widest block mb-2 font-bold">Or Call Us Directly</span>
                <a 
                  href="tel:+919876543210" 
                  className="inline-flex items-center text-sm font-bold text-accent-600 hover:underline"
                >
                  <Phone className="h-4 w-4 mr-1.5" />
                  +91 98765 43210
                </a>
              </div>

            </div>
          </div>

        </div>
      </section>
    </div>
  );
};

export default ProjectDetail;

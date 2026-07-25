import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Building2, LogOut, LayoutDashboard, Plus, Trash2, Edit3, 
  Mail, Users, BookOpen, CheckCircle, Clock, Trash, Phone 
} from 'lucide-react';
import { logout, onAuthStateChanged } from '../services/auth';
import { 
  getProjects, addProject, updateProject, deleteProject,
  getEnquiries, updateEnquiryStatus, deleteEnquiry,
  getTestimonials, addTestimonial, deleteTestimonial,
  getPosts, addPost, updatePost, deletePost,
  getSettings, updateSettings,
  getLeadership, addLeadership, deleteLeadership,
  getMilestones, addMilestone, deleteMilestone
} from '../services/db';

const Admin = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("dashboard"); // dashboard, projects, enquiries, testimonials, blog, leadership, milestones, settings
  const navigate = useNavigate();

  // Data states
  const [projects, setProjects] = useState([]);
  const [enquiries, setEnquiries] = useState([]);
  const [testimonials, setTestimonials] = useState([]);
  const [posts, setPosts] = useState([]);
  const [leadership, setLeadership] = useState([]);
  const [milestones, setMilestones] = useState([]);
  const [settings, setSettings] = useState(null);

  // Modal / Form state
  const [showModal, setShowModal] = useState(false);
  const [editId, setEditId] = useState(null); // id of item being edited
  const [formData, setFormData] = useState({});

  useEffect(() => {
    const unsubscribe = onAuthStateChanged((currentUser) => {
      if (!currentUser) {
        navigate('/admin/login');
      } else {
        setUser(currentUser);
        loadAllData();
      }
      setLoading(false);
    });
    return () => unsubscribe();
  }, [navigate]);

  const loadAllData = async () => {
    try {
      const [projs, enqs, tests, pts, leads, miles, sets] = await Promise.all([
        getProjects(),
        getEnquiries(),
        getTestimonials(),
        getPosts(),
        getLeadership(),
        getMilestones(),
        getSettings()
      ]);
      setProjects(projs);
      setEnquiries(enqs);
      setTestimonials(tests);
      setPosts(pts);
      setLeadership(leads);
      setMilestones(miles);
      setSettings(sets);
    } catch (err) {
      console.error("Error loading admin data", err);
    }
  };

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/admin/login');
    } catch (err) {
      console.error("Logout failed", err);
    }
  };

  // Generic input change handler
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // Specific arrays change handler (amenities/unitTypes comma-separated)
  const handleCommaSeparatedChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value.split(',').map(item => item.trim()).filter(Boolean) }));
  };

  // Project Actions
  const handleOpenProjectModal = (project = null) => {
    if (project) {
      setEditId(project.id);
      setFormData({
        name: project.name,
        type: project.type,
        status: project.status,
        location: project.location,
        description: project.description,
        amenities: project.amenities?.join(', ') || "",
        images: project.images?.join(', ') || "",
        priceRange: project.priceRange,
        unitTypes: project.unitTypes?.join(', ') || "",
        reraNumber: project.reraNumber || ""
      });
    } else {
      setEditId(null);
      setFormData({
        name: "", type: "residential", status: "ongoing", location: "",
        description: "", amenities: "", images: "", priceRange: "",
        unitTypes: "", reraNumber: ""
      });
    }
    setShowModal(true);
  };

  const handleSaveProject = async (e) => {
    e.preventDefault();
    const formattedData = {
      ...formData,
      amenities: typeof formData.amenities === 'string' ? formData.amenities.split(',').map(s => s.trim()).filter(Boolean) : [],
      unitTypes: typeof formData.unitTypes === 'string' ? formData.unitTypes.split(',').map(s => s.trim()).filter(Boolean) : [],
      images: typeof formData.images === 'string' ? formData.images.split(',').map(s => s.trim()).filter(Boolean) : [
        "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=800&q=80" // default image
      ]
    };

    try {
      if (editId) {
        await updateProject(editId, formattedData);
      } else {
        await addProject(formattedData);
      }
      setShowModal(false);
      loadAllData();
    } catch (error) {
      alert("Error saving project: " + error.message);
    }
  };

  const handleDeleteProject = async (id) => {
    if (confirm("Are you sure you want to delete this project?")) {
      await deleteProject(id);
      loadAllData();
    }
  };

  // Enquiry Actions
  const handleStatusChange = async (id, status) => {
    await updateEnquiryStatus(id, status);
    loadAllData();
  };

  const handleDeleteEnquiry = async (id) => {
    if (confirm("Delete this enquiry record?")) {
      await deleteEnquiry(id);
      loadAllData();
    }
  };

  // Testimonial Actions
  const handleOpenTestimonialModal = () => {
    setEditId(null);
    setFormData({ clientName: "", projectRef: "", quote: "", rating: 5, photoUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&h=150&q=80" });
    setShowModal(true);
  };

  const handleSaveTestimonial = async (e) => {
    e.preventDefault();
    try {
      await addTestimonial({ ...formData, rating: Number(formData.rating) });
      setShowModal(false);
      loadAllData();
    } catch (error) {
      alert("Error adding testimonial");
    }
  };

  const handleDeleteTestimonial = async (id) => {
    if (confirm("Delete this testimonial?")) {
      await deleteTestimonial(id);
      loadAllData();
    }
  };

  // Blog Actions
  const handleOpenBlogModal = (post = null) => {
    if (post) {
      setEditId(post.id);
      setFormData({
        title: post.title,
        content: post.content,
        coverImageUrl: post.coverImageUrl,
        author: post.author
      });
    } else {
      setEditId(null);
      setFormData({ title: "", content: "", coverImageUrl: "", author: "Srinidhi Editorial Team" });
    }
    setShowModal(true);
  };

  const handleSaveBlog = async (e) => {
    e.preventDefault();
    const slug = formData.title.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
    const data = { ...formData, slug };

    try {
      if (editId) {
        await updatePost(editId, data);
      } else {
        await addPost(data);
      }
      setShowModal(false);
      loadAllData();
    } catch (error) {
      alert("Error saving post");
    }
  };

  const handleDeleteBlog = async (id) => {
    if (confirm("Delete this blog post?")) {
      await deletePost(id);
      loadAllData();
    }
  };

  // Leadership Actions
  const handleOpenLeadershipModal = (leader = null) => {
    if (leader) {
      setEditId(leader.id);
      setFormData({
        name: leader.name,
        role: leader.role,
        bio: leader.bio,
        photo: leader.photo
      });
    } else {
      setEditId(null);
      setFormData({ name: "", role: "", bio: "", photo: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=300&h=300&q=80" });
    }
    setShowModal(true);
  };

  const handleSaveLeadership = async (e) => {
    e.preventDefault();
    try {
      if (editId) {
        const stored = JSON.parse(localStorage.getItem('srinidhi_leadership')) || [];
        const index = stored.findIndex(l => l.id === editId);
        if (index !== -1) {
          stored[index] = { ...stored[index], ...formData };
          localStorage.setItem('srinidhi_leadership', JSON.stringify(stored));
        }
      } else {
        await addLeadership(formData);
      }
      setShowModal(false);
      loadAllData();
    } catch (error) {
      alert("Error saving leader profile");
    }
  };

  const handleDeleteLeader = async (id) => {
    if (confirm("Delete this leader profile?")) {
      await deleteLeadership(id);
      loadAllData();
    }
  };

  // Milestones Actions
  const handleOpenMilestoneModal = (mile = null) => {
    if (mile) {
      setEditId(mile.id);
      setFormData({
        year: mile.year,
        title: mile.title,
        desc: mile.desc
      });
    } else {
      setEditId(null);
      setFormData({ year: "", title: "", desc: "" });
    }
    setShowModal(true);
  };

  const handleSaveMilestone = async (e) => {
    e.preventDefault();
    try {
      if (editId) {
        const stored = JSON.parse(localStorage.getItem('srinidhi_milestones')) || [];
        const index = stored.findIndex(m => m.id === editId);
        if (index !== -1) {
          stored[index] = { ...stored[index], ...formData };
          localStorage.setItem('srinidhi_milestones', JSON.stringify(stored));
        }
      } else {
        await addMilestone(formData);
      }
      setShowModal(false);
      loadAllData();
    } catch (error) {
      alert("Error saving milestone");
    }
  };

  const handleDeleteMile = async (id) => {
    if (confirm("Delete this milestone?")) {
      await deleteMilestone(id);
      loadAllData();
    }
  };

  // Settings Actions
  const handleSaveSettingsTab = async (e) => {
    e.preventDefault();
    try {
      await updateSettings(settings);
      alert("Global settings saved successfully!");
      loadAllData();
    } catch (error) {
      alert("Error saving settings");
    }
  };

  const handleSettingsChange = (section, key, value) => {
    setSettings(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [key]: value
      }
    }));
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white border border-slate-200 shadow-sm flex items-center justify-center text-slate-900">
        <div className="h-8 w-8 border-4 border-accent-500 border-t-transparent rounded-full animate-spin mr-3" />
        <span>Authenticating...</span>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F8F9FB] text-slate-700 flex flex-col md:flex-row">
      
      {/* Sidebar Panel */}
      <aside className="w-full md:w-64 bg-white border-b md:border-b-0 md:border-r border-slate-200 p-6 flex flex-col justify-between shrink-0">
        <div className="space-y-8">
          <div>
            <div className="flex items-center space-x-2.5 mb-6">
              <div className="bg-emerald-600 p-2 rounded-lg text-slate-900 shadow-md">
                <Building2 className="h-5 w-5" />
              </div>
              <div>
                <span className="font-serif text-base font-bold text-slate-900 tracking-wide block leading-tight">Srinidhi</span>
                <span className="text-[9px] text-slate-450 uppercase font-bold tracking-wider block">Real Estate CMS</span>
              </div>
            </div>
            <span className="text-[10px] uppercase tracking-widest text-slate-450 font-bold block mb-1">Authenticated Admin</span>
            <p className="text-xs font-mono text-slate-500 break-all">{user?.email}</p>
          </div>

          {/* Nav list */}
          <nav className="space-y-2 text-xs font-semibold uppercase tracking-wider">
            <button
              onClick={() => { setActiveTab("dashboard"); setShowModal(false); }}
              className={`w-full flex items-center justify-between px-4 py-3 rounded-lg transition-all ${
                activeTab === "dashboard" ? 'bg-emerald-600 text-white shadow-sm font-bold' : 'text-slate-500 hover:bg-slate-100 hover:text-slate-900'
              }`}
            >
              <div className="flex items-center space-x-3">
                <LayoutDashboard className="h-4.5 w-4.5 shrink-0" />
                <span>Dashboard</span>
              </div>
            </button>

            <button
              onClick={() => { setActiveTab("enquiries"); setShowModal(false); }}
              className={`w-full flex items-center justify-between px-4 py-3 rounded-lg transition-all ${
                activeTab === "enquiries" ? 'bg-emerald-600 text-white shadow-sm font-bold' : 'text-slate-500 hover:bg-slate-100 hover:text-slate-900'
              }`}
            >
              <div className="flex items-center space-x-3">
                <Mail className="h-4.5 w-4.5 shrink-0" />
                <span>Enquiries</span>
              </div>
              <span className={`text-[10px] font-mono px-2 py-0.5 rounded-full ${activeTab === 'enquiries' ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-600'}`}>{enquiries.length}</span>
            </button>
            
            <button
              onClick={() => { setActiveTab("projects"); setShowModal(false); }}
              className={`w-full flex items-center justify-between px-4 py-3 rounded-lg transition-all ${
                activeTab === "projects" ? 'bg-emerald-600 text-white shadow-sm font-bold' : 'text-slate-500 hover:bg-slate-100 hover:text-slate-900'
              }`}
            >
              <div className="flex items-center space-x-3">
                <Building2 className="h-4.5 w-4.5 shrink-0" />
                <span>Projects</span>
              </div>
              <span className={`text-[10px] font-mono px-2 py-0.5 rounded-full ${activeTab === 'projects' ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-600'}`}>{projects.length}</span>
            </button>

            <button
              onClick={() => { setActiveTab("testimonials"); setShowModal(false); }}
              className={`w-full flex items-center justify-between px-4 py-3 rounded-lg transition-all ${
                activeTab === "testimonials" ? 'bg-emerald-600 text-white shadow-sm font-bold' : 'text-slate-500 hover:bg-slate-100 hover:text-slate-900'
              }`}
            >
              <div className="flex items-center space-x-3">
                <Users className="h-4.5 w-4.5 shrink-0" />
                <span>Testimonials</span>
              </div>
              <span className={`text-[10px] font-mono px-2 py-0.5 rounded-full ${activeTab === 'testimonials' ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-600'}`}>{testimonials.length}</span>
            </button>

            <button
              onClick={() => { setActiveTab("blog"); setShowModal(false); }}
              className={`w-full flex items-center justify-between px-4 py-3 rounded-lg transition-all ${
                activeTab === "blog" ? 'bg-emerald-600 text-white shadow-sm font-bold' : 'text-slate-500 hover:bg-slate-100 hover:text-slate-900'
              }`}
            >
              <div className="flex items-center space-x-3">
                <BookOpen className="h-4.5 w-4.5 shrink-0" />
                <span>Blogs</span>
              </div>
              <span className={`text-[10px] font-mono px-2 py-0.5 rounded-full ${activeTab === 'blog' ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-600'}`}>{posts.length}</span>
            </button>

            <button
              onClick={() => { setActiveTab("leadership"); setShowModal(false); }}
              className={`w-full flex items-center justify-between px-4 py-3 rounded-lg transition-all ${
                activeTab === "leadership" ? 'bg-emerald-600 text-white shadow-sm font-bold' : 'text-slate-500 hover:bg-slate-100 hover:text-slate-900'
              }`}
            >
              <div className="flex items-center space-x-3">
                <Users className="h-4.5 w-4.5 shrink-0" />
                <span>Leadership</span>
              </div>
              <span className={`text-[10px] font-mono px-2 py-0.5 rounded-full ${activeTab === 'leadership' ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-600'}`}>{leadership.length}</span>
            </button>

            <button
              onClick={() => { setActiveTab("milestones"); setShowModal(false); }}
              className={`w-full flex items-center justify-between px-4 py-3 rounded-lg transition-all ${
                activeTab === "milestones" ? 'bg-emerald-600 text-white shadow-sm font-bold' : 'text-slate-500 hover:bg-slate-100 hover:text-slate-900'
              }`}
            >
              <div className="flex items-center space-x-3">
                <Clock className="h-4.5 w-4.5 shrink-0" />
                <span>Milestones</span>
              </div>
              <span className={`text-[10px] font-mono px-2 py-0.5 rounded-full ${activeTab === 'milestones' ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-600'}`}>{milestones.length}</span>
            </button>

            <button
              onClick={() => { setActiveTab("settings"); setShowModal(false); }}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-all ${
                activeTab === "settings" ? 'bg-emerald-600 text-white shadow-sm font-bold' : 'text-slate-500 hover:bg-slate-100 hover:text-slate-900'
              }`}
            >
              <LayoutDashboard className="h-4.5 w-4.5 shrink-0" />
              <span>Global Settings</span>
            </button>
          </nav>
        </div>

        <button
          onClick={handleLogout}
          className="mt-8 w-full flex items-center justify-center space-x-2 px-4 py-2.5 bg-slate-50 hover:bg-red-50 text-slate-600 hover:text-red-650 rounded-lg text-xs font-semibold tracking-wider uppercase border border-slate-200 hover:border-red-200 transition-all shadow-sm"
        >
          <LogOut className="h-4.5 w-4.5" />
          <span>Sign Out</span>
        </button>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 p-6 md:p-10 overflow-x-hidden">
        
        {/* Top Header Bar */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center bg-white border border-slate-200 p-6 mb-8 rounded-xl shadow-sm gap-4">
          <div>
            <h1 className="font-serif text-2xl font-bold text-slate-900 uppercase tracking-wide">
              {activeTab === 'enquiries' && 'Lead Enquiries'}
              {activeTab === 'projects' && 'Projects Portfolio'}
              {activeTab === 'testimonials' && 'Client Testimonials'}
              {activeTab === 'blog' && 'Blog Articles & News'}
              {activeTab === 'leadership' && 'Corporate Leadership'}
              {activeTab === 'milestones' && 'Timeline Milestones'}
              {activeTab === 'settings' && 'Global Settings'}
            </h1>
            <p className="text-xs text-slate-450 mt-1">Manage, edit, and publish your website content dynamically.</p>
          </div>
          
          <div className="flex items-center space-x-3 shrink-0">
            <div className="text-right hidden sm:block">
              <p className="text-xs font-bold text-slate-900">Sri. K. Srinivas Rao</p>
              <p className="text-[10px] text-emerald-600 font-bold uppercase tracking-wider">Super Admin</p>
            </div>
            <img 
              src="https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=80&h=80&q=80" 
              alt="Admin Avatar" 
              className="h-10 w-10 object-cover rounded-full border-2 border-emerald-500 shadow-sm"
            />
          </div>
        </div>

        {/* Stats Blocks Grid */}
        {activeTab !== 'settings' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            <div className="bg-emerald-700 text-slate-900 p-6 rounded-xl shadow-sm flex items-center justify-between border border-emerald-800">
              <div className="space-y-2">
                <span className="text-[10px] uppercase font-bold tracking-widest text-emerald-200 block">INFORMATION</span>
                <p className="text-xs leading-relaxed text-emerald-100 font-medium">
                  Welcome to Srinidhi Infra Developers CMS. All alterations are live immediately.
                </p>
              </div>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 flex items-center justify-between">
              <div>
                <p className="text-xs text-slate-500 uppercase font-bold tracking-wider">Total Enquiries</p>
                <h3 className="text-2xl font-bold text-slate-900 mt-2">{enquiries.length}</h3>
              </div>
              <div className="p-3 bg-emerald-50 text-emerald-600 rounded-lg">
                <Mail className="h-6 w-6" />
              </div>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 flex items-center justify-between">
              <div>
                <p className="text-xs text-slate-500 uppercase font-bold tracking-wider">Active Projects</p>
                <h3 className="text-2xl font-bold text-slate-900 mt-2">{projects.length}</h3>
              </div>
              <div className="p-3 bg-emerald-50 text-emerald-600 rounded-lg">
                <Building2 className="h-6 w-6" />
              </div>
            </div>
          </div>
        )}

        {/* TAB: DASHBOARD OVERVIEW */}
        {activeTab === "dashboard" && (
          <div className="space-y-6">
            <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm">
              <h2 className="font-serif text-lg font-bold text-slate-900 mb-2">Welcome Back, Sri. Srinivas Rao!</h2>
              <p className="text-xs text-slate-500 max-w-xl leading-relaxed">
                This is your administrative cockpit for Srinidhi Infra Developers. Here you can edit website copy, update ongoing real estate portfolio projects, check lead submissions, publish blogs, and structure milestones dynamically.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Recent Enquiries (Contact Card Style) */}
              <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm space-y-4">
                <div className="flex justify-between items-center border-b border-slate-100 pb-3">
                  <h3 className="font-serif text-sm font-bold text-slate-900">Recent Lead Enquiries</h3>
                  <button onClick={() => setActiveTab("enquiries")} className="text-xs text-emerald-600 hover:text-emerald-700 font-bold uppercase tracking-wider">
                    View All
                  </button>
                </div>

                <div className="space-y-3">
                  {enquiries.slice(0, 3).map(enq => (
                    <div key={enq.id} className="p-3.5 bg-slate-50 border border-slate-100 rounded-lg space-y-2 relative">
                      <div className="flex items-center space-x-2.5">
                        <div className="h-7 w-7 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center text-[10px] font-bold">
                          {enq.name.charAt(0).toUpperCase()}
                        </div>
                        <div>
                          <p className="text-xs font-bold text-slate-900">{enq.name}</p>
                          <p className="text-[10px] text-slate-400 font-medium">{enq.phone} • {enq.email}</p>
                        </div>
                      </div>
                      <p className="text-[11px] text-slate-650 leading-relaxed line-clamp-2 font-medium">"{enq.message}"</p>
                      <div className="flex justify-between items-center pt-1">
                        <span className="text-[9px] bg-emerald-50 text-emerald-750 px-2 py-0.5 rounded font-bold uppercase">{enq.projectRef}</span>
                        <span className="text-[9px] text-slate-400 font-mono">{new Date(enq.createdAt).toLocaleDateString()}</span>
                      </div>
                    </div>
                  ))}
                  {enquiries.length === 0 && (
                    <p className="text-xs text-slate-450 py-4 text-center">No recent enquiries found.</p>
                  )}
                </div>
              </div>

              {/* Quick Actions / Active Projects List */}
              <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm space-y-4">
                <div className="flex justify-between items-center border-b border-slate-100 pb-3">
                  <h3 className="font-serif text-sm font-bold text-slate-900">Recent Portfolio Projects</h3>
                  <button onClick={() => setActiveTab("projects")} className="text-xs text-emerald-600 hover:text-emerald-700 font-bold uppercase tracking-wider">
                    View All
                  </button>
                </div>

                <div className="space-y-3">
                  {projects.slice(0, 3).map(proj => (
                    <div key={proj.id} className="flex items-center justify-between p-2.5 bg-slate-50 border border-slate-100 rounded-lg">
                      <div className="flex items-center space-x-3">
                        {proj.images?.[0] ? (
                          <img src={proj.images[0]} alt="" className="h-9 w-12 object-cover rounded border border-slate-200" />
                        ) : (
                          <div className="h-9 w-12 bg-slate-200 rounded flex items-center justify-center"><Building2 className="h-4 w-4 text-slate-405" /></div>
                        )}
                        <div>
                          <p className="text-xs font-bold text-slate-900">{proj.name}</p>
                          <p className="text-[9px] text-slate-450 uppercase font-semibold">{proj.location} • {proj.type}</p>
                        </div>
                      </div>
                      <span className={`text-[9px] font-bold px-2 py-0.5 rounded uppercase ${
                        proj.status === 'ongoing' ? 'bg-amber-50 text-amber-850 border border-amber-200' :
                        proj.status === 'completed' ? 'bg-emerald-50 text-emerald-850 border border-emerald-250' :
                        'bg-blue-50 text-blue-800 border border-blue-200'
                      }`}>
                        {proj.status}
                      </span>
                    </div>
                  ))}
                  {projects.length === 0 && (
                    <p className="text-xs text-slate-450 py-4 text-center">No portfolio projects found.</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB: ENQUIRIES */}
        {activeTab === "enquiries" && (
          <div className="space-y-6">
            <div className="flex justify-between items-center border-b border-slate-200 pb-4">
              <h2 className="font-serif text-xl font-bold text-slate-900">Lead Enquiries</h2>
              <span className="text-xs bg-white border border-slate-200 shadow-sm px-3 py-1 rounded text-slate-500 font-mono">
                {enquiries.filter(e => e.status === 'new').length} Pending Leads
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {enquiries.map((enq) => (
                <div key={enq.id} className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm flex flex-col justify-between space-y-4 hover:shadow-md transition-shadow">
                  <div className="space-y-3">
                    {/* Header: Avatar, Name & Date */}
                    <div className="flex justify-between items-start">
                      <div className="flex items-center space-x-3">
                        <div className="h-10 w-10 rounded-full bg-emerald-50 border border-emerald-100 text-emerald-755 flex items-center justify-center font-bold text-sm shadow-sm">
                          {enq.name.charAt(0).toUpperCase()}
                        </div>
                        <div>
                          <h3 className="text-sm font-bold text-slate-900 leading-tight">{enq.name}</h3>
                          <span className="text-[10px] text-slate-400 font-mono">{new Date(enq.createdAt).toLocaleDateString()}</span>
                        </div>
                      </div>
                      
                      {/* Status Dropdown */}
                      <select 
                        value={enq.status || 'new'} 
                        onChange={(e) => handleStatusChange(enq.id, e.target.value)}
                        className={`text-[10px] font-bold px-2 py-1 rounded-lg border focus:outline-none cursor-pointer uppercase ${
                          enq.status === 'new' ? 'bg-amber-50 text-amber-800 border-amber-200' :
                          enq.status === 'contacted' ? 'bg-blue-50 text-blue-800 border-blue-200' :
                          'bg-emerald-50 text-emerald-800 border-emerald-250'
                        }`}
                      >
                        <option value="new">New</option>
                        <option value="contacted">Contacted</option>
                        <option value="closed">Closed</option>
                      </select>
                    </div>

                    {/* Contact details */}
                    <div className="space-y-1 bg-slate-50 p-2.5 rounded-lg border border-slate-100 text-[11px] font-medium text-slate-500">
                      <p className="flex items-center"><Phone className="h-3.5 w-3.5 mr-2 text-slate-400 shrink-0" /> {enq.phone}</p>
                      <p className="flex items-center"><Mail className="h-3.5 w-3.5 mr-2 text-slate-400 shrink-0" /> {enq.email}</p>
                      {enq.projectRef && (
                        <p className="flex items-center"><Building2 className="h-3.5 w-3.5 mr-2 text-emerald-600 shrink-0" /> Ref: <strong className="text-slate-700 ml-1">{enq.projectRef}</strong></p>
                      )}
                    </div>

                    {/* Message Body */}
                    <div className="text-[11px] text-slate-650 leading-relaxed bg-white border border-slate-100 rounded-lg p-3 max-h-24 overflow-y-auto italic whitespace-pre-line font-medium">
                      "{enq.message || "No message content supplied."}"
                    </div>
                  </div>

                  {/* Footer Actions */}
                  <div className="border-t border-slate-100 pt-3 flex justify-end">
                    <button
                      onClick={() => handleDeleteEnquiry(enq.id)}
                      className="inline-flex items-center space-x-1.5 px-3 py-1.5 bg-red-50 hover:bg-red-100 text-red-700 font-bold text-[10px] uppercase tracking-wider rounded-lg transition-colors border border-red-100"
                    >
                      <Trash className="h-3.5 w-3.5" />
                      <span>Delete</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB: PROJECTS */}
        {activeTab === "projects" && (
          <div className="space-y-6">
            <div className="flex justify-between items-center border-b border-slate-200 pb-4">
              <h2 className="font-serif text-xl font-bold text-slate-900">Manage Projects</h2>
              <button
                onClick={() => handleOpenProjectModal()}
                className="inline-flex items-center space-x-1.5 px-4 py-2 bg-accent-500 hover:bg-accent-600 text-white font-bold text-xs uppercase tracking-wider rounded-lg transition-colors"
              >
                <Plus className="h-4 w-4" />
                <span>Add Project</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {projects.map((proj) => (
                <div key={proj.id} className="bg-white border border-slate-200 shadow-sm rounded-xl border border-slate-200 overflow-hidden flex flex-col justify-between">
                  <div className="h-40 bg-slate-50 relative">
                    <img src={proj.images?.[0]} alt={proj.name} className="w-full h-full object-cover opacity-70" />
                    <span className="absolute top-3 left-3 bg-slate-50 border border-slate-200 px-2 py-0.5 rounded text-[10px] uppercase font-bold text-accent-400">
                      {proj.type}
                    </span>
                    <span className={`absolute top-3 right-3 text-[10px] font-bold uppercase px-2 py-0.5 rounded shadow ${
                      proj.status === 'ongoing' ? 'bg-amber-500 text-slate-950' : 
                      proj.status === 'completed' ? 'bg-green-600 text-slate-900' : 'bg-blue-600 text-slate-900'
                    }`}>
                      {proj.status}
                    </span>
                  </div>
                  <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                    <div>
                      <h3 className="font-serif text-base font-bold text-slate-900 leading-tight mb-1">{proj.name}</h3>
                      <p className="text-slate-500 text-[11px] font-semibold">{proj.location}</p>
                      <p className="text-[11px] text-slate-500 line-clamp-2 mt-2">{proj.description}</p>
                    </div>
                    <div className="border-t border-slate-200/60 pt-3.5 flex justify-between items-center text-xs">
                      <span className="font-bold text-accent-500">{proj.priceRange}</span>
                      <div className="flex space-x-1">
                        <button
                          onClick={() => handleOpenProjectModal(proj)}
                          className="p-1.5 text-slate-500 hover:text-slate-900 hover:bg-slate-800 rounded transition-colors"
                        >
                          <Edit3 className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => handleDeleteProject(proj.id)}
                          className="p-1.5 text-slate-500 hover:text-red-400 hover:bg-red-500/5 rounded transition-colors"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB: TESTIMONIALS */}
        {activeTab === "testimonials" && (
          <div className="space-y-6">
            <div className="flex justify-between items-center border-b border-slate-200 pb-4">
              <h2 className="font-serif text-xl font-bold text-slate-900">Client Reviews</h2>
              <button
                onClick={handleOpenTestimonialModal}
                className="inline-flex items-center space-x-1.5 px-4 py-2 bg-accent-500 hover:bg-accent-600 text-white font-bold text-xs uppercase tracking-wider rounded-lg transition-colors"
              >
                <Plus className="h-4 w-4" />
                <span>Add Review</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {testimonials.map((test) => (
                <div key={test.id} className="bg-white border border-slate-200 shadow-sm border border-slate-200 p-5 rounded-xl flex flex-col justify-between">
                  <p className="text-slate-650 italic text-xs leading-relaxed mb-4">
                    "{test.quote}"
                  </p>
                  <div className="flex justify-between items-center border-t border-slate-200 pt-3">
                    <div className="flex items-center">
                      <img src={test.photoUrl} alt="" className="h-8 w-8 rounded-full object-cover mr-2" />
                      <div>
                        <h4 className="font-serif text-xs font-bold text-slate-900">{test.clientName}</h4>
                        <span className="text-[10px] text-slate-500 uppercase tracking-wide">{test.projectRef}</span>
                      </div>
                    </div>
                    <button
                      onClick={() => handleDeleteTestimonial(test.id)}
                      className="p-1.5 text-slate-500 hover:text-red-400 hover:bg-red-500/5 rounded transition-colors"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB: BLOG POSTS */}
        {activeTab === "blog" && (
          <div className="space-y-6">
            <div className="flex justify-between items-center border-b border-slate-200 pb-4">
              <h2 className="font-serif text-xl font-bold text-slate-900">Blog Articles</h2>
              <button
                onClick={() => handleOpenBlogModal()}
                className="inline-flex items-center space-x-1.5 px-4 py-2 bg-accent-500 hover:bg-accent-600 text-white font-bold text-xs uppercase tracking-wider rounded-lg transition-colors"
              >
                <Plus className="h-4 w-4" />
                <span>New Article</span>
              </button>
            </div>

            <div className="space-y-4">
              {posts.map((post) => (
                <div key={post.id} className="bg-white border border-slate-200 shadow-sm border border-slate-200 rounded-xl p-5 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                  <div className="flex items-center space-x-4">
                    <img src={post.coverImageUrl} alt="" className="h-14 w-20 object-cover rounded bg-slate-50 border border-slate-200" />
                    <div>
                      <h3 className="font-serif text-sm font-bold text-slate-900 leading-tight">{post.title}</h3>
                      <p className="text-[10px] text-slate-500 uppercase font-semibold mt-1">
                        By {post.author} • {new Date(post.publishedAt).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  <div className="flex space-x-2 shrink-0 w-full sm:w-auto justify-end">
                    <button
                      onClick={() => handleOpenBlogModal(post)}
                      className="p-2 text-slate-500 hover:text-slate-900 hover:bg-slate-800 rounded transition-colors"
                    >
                      <Edit3 className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => handleDeleteBlog(post.id)}
                      className="p-2 text-slate-500 hover:text-red-400 hover:bg-red-500/5 rounded transition-colors"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB: LEADERSHIP */}
        {activeTab === "leadership" && (
          <div className="space-y-6">
            <div className="flex justify-between items-center border-b border-slate-200 pb-4">
              <h2 className="font-serif text-xl font-bold text-slate-900">Leadership Profiles</h2>
              <button
                onClick={() => handleOpenLeadershipModal()}
                className="inline-flex items-center space-x-1.5 px-4 py-2 bg-accent-500 hover:bg-accent-600 text-white font-bold text-xs uppercase tracking-wider rounded-lg transition-colors"
              >
                <Plus className="h-4 w-4" />
                <span>Add Leader</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {leadership.map((leader) => (
                <div key={leader.id} className="bg-white border border-slate-200 shadow-sm border border-slate-200 rounded-xl p-5 flex flex-col justify-between hover:border-slate-750 transition-colors">
                  <div className="flex items-start space-x-4">
                    <img src={leader.photo} alt={leader.name} className="h-16 w-16 object-cover rounded-lg border border-slate-200" />
                    <div>
                      <h3 className="font-serif text-base font-bold text-slate-900 leading-tight">{leader.name}</h3>
                      <span className="text-[10px] text-accent-400 uppercase font-bold tracking-wide block mt-1">{leader.role}</span>
                      <p className="text-[11px] text-slate-500 mt-2 leading-relaxed line-clamp-3">{leader.bio}</p>
                    </div>
                  </div>
                  <div className="border-t border-slate-200 pt-3 mt-4 flex justify-end space-x-2">
                    <button
                      onClick={() => handleOpenLeadershipModal(leader)}
                      className="p-1.5 text-slate-500 hover:text-slate-900 hover:bg-slate-800 rounded transition-colors"
                    >
                      <Edit3 className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => handleDeleteLeader(leader.id)}
                      className="p-1.5 text-slate-500 hover:text-red-400 hover:bg-red-500/5 rounded transition-colors"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB: MILESTONES */}
        {activeTab === "milestones" && (
          <div className="space-y-6">
            <div className="flex justify-between items-center border-b border-slate-200 pb-4">
              <h2 className="font-serif text-xl font-bold text-slate-900">Timeline Milestones</h2>
              <button
                onClick={() => handleOpenMilestoneModal()}
                className="inline-flex items-center space-x-1.5 px-4 py-2 bg-accent-500 hover:bg-accent-600 text-white font-bold text-xs uppercase tracking-wider rounded-lg transition-colors"
              >
                <Plus className="h-4 w-4" />
                <span>Add Milestone</span>
              </button>
            </div>

            <div className="bg-white border border-slate-200 shadow-sm rounded-xl border border-slate-200 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 uppercase tracking-wider font-bold">
                      <th className="p-4">Year</th>
                      <th className="p-4">Title</th>
                      <th className="p-4">Description</th>
                      <th className="p-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800">
                    {milestones.map((mile) => (
                      <tr key={mile.id} className="hover:bg-slate-850 transition-colors">
                        <td className="p-4 font-bold text-accent-400 text-sm font-mono">{mile.year}</td>
                        <td className="p-4 font-bold text-slate-900">{mile.title}</td>
                        <td className="p-4 text-slate-650 max-w-sm leading-relaxed">{mile.desc}</td>
                        <td className="p-4 text-right">
                          <div className="flex justify-end space-x-1">
                            <button
                              onClick={() => handleOpenMilestoneModal(mile)}
                              className="p-1.5 text-slate-500 hover:text-slate-900 hover:bg-slate-800 rounded transition-colors"
                            >
                              <Edit3 className="h-4 w-4" />
                            </button>
                            <button
                              onClick={() => handleDeleteMile(mile.id)}
                              className="p-1.5 text-slate-450 hover:text-red-400 hover:bg-red-500/5 rounded transition-colors"
                            >
                              <Trash2 className="h-4 w-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* TAB: GLOBAL SETTINGS */}
        {activeTab === "settings" && settings && (
          <div className="space-y-6">
            <div className="flex justify-between items-center border-b border-slate-200 pb-4">
              <h2 className="font-serif text-xl font-bold text-slate-900">Global Website Content Settings</h2>
            </div>

            <form onSubmit={handleSaveSettingsTab} className="space-y-8 text-xs font-semibold text-slate-650">
              {/* Stats Section */}
              <div className="bg-white border border-slate-200 shadow-sm border border-slate-200 rounded-xl p-6 space-y-4">
                <h3 className="font-serif text-sm font-bold text-slate-900 border-b border-slate-200 pb-2">Company Statistics (Home Page)</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                  <div>
                    <label className="block text-slate-450 mb-1">Years of Experience</label>
                    <input type="text" value={settings.stats.experience} onChange={(e) => handleSettingsChange('stats', 'experience', e.target.value)} className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded text-slate-900 focus:outline-none" />
                  </div>
                  <div>
                    <label className="block text-slate-450 mb-1">Projects Delivered</label>
                    <input type="text" value={settings.stats.projects} onChange={(e) => handleSettingsChange('stats', 'projects', e.target.value)} className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded text-slate-900 focus:outline-none" />
                  </div>
                  <div>
                    <label className="block text-slate-450 mb-1">Sq. Ft. Developed</label>
                    <input type="text" value={settings.stats.developed} onChange={(e) => handleSettingsChange('stats', 'developed', e.target.value)} className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded text-slate-900 focus:outline-none" />
                  </div>
                  <div>
                    <label className="block text-slate-450 mb-1">Happy Families</label>
                    <input type="text" value={settings.stats.families} onChange={(e) => handleSettingsChange('stats', 'families', e.target.value)} className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded text-slate-900 focus:outline-none" />
                  </div>
                </div>
              </div>

              {/* Contact Info Section */}
              <div className="bg-white border border-slate-200 shadow-sm border border-slate-200 rounded-xl p-6 space-y-4">
                <h3 className="font-serif text-sm font-bold text-slate-900 border-b border-slate-200 pb-2">Office Contact Coordinates</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-slate-450 mb-1">Office Telephone / Phone</label>
                    <input type="text" value={settings.contact.phone} onChange={(e) => handleSettingsChange('contact', 'phone', e.target.value)} className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded text-slate-900 focus:outline-none" />
                  </div>
                  <div>
                    <label className="block text-slate-450 mb-1">Corporate Email Address</label>
                    <input type="email" value={settings.contact.email} onChange={(e) => handleSettingsChange('contact', 'email', e.target.value)} className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded text-slate-900 focus:outline-none" />
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-slate-450 mb-1">Office Operating Hours</label>
                    <input type="text" value={settings.contact.hours} onChange={(e) => handleSettingsChange('contact', 'hours', e.target.value)} className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded text-slate-900 focus:outline-none" />
                  </div>
                  <div>
                    <label className="block text-slate-450 mb-1">WhatsApp Mobile Number</label>
                    <input type="text" value={settings.contact.whatsapp} onChange={(e) => handleSettingsChange('contact', 'whatsapp', e.target.value)} className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded text-slate-900 focus:outline-none" />
                  </div>
                </div>
                <div>
                  <label className="block text-slate-450 mb-1">Full Postal Address (Footer & Contact Page)</label>
                  <textarea rows="3" value={settings.contact.address} onChange={(e) => handleSettingsChange('contact', 'address', e.target.value)} className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded text-slate-900 focus:outline-none resize-none font-sans" />
                </div>
              </div>

              {/* About Text Section */}
              <div className="bg-white border border-slate-200 shadow-sm border border-slate-200 rounded-xl p-6 space-y-4">
                <h3 className="font-serif text-sm font-bold text-slate-900 border-b border-slate-200 pb-2">About Page Core Copywriting</h3>
                <div>
                  <label className="block text-slate-450 mb-1">Our Journey / Story Statement</label>
                  <textarea rows="6" value={settings.about.story} onChange={(e) => handleSettingsChange('about', 'story', e.target.value)} className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded text-slate-900 focus:outline-none resize-none font-sans leading-relaxed" />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-slate-450 mb-1">Corporate Mission</label>
                    <textarea rows="3" value={settings.about.mission} onChange={(e) => handleSettingsChange('about', 'mission', e.target.value)} className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded text-slate-900 focus:outline-none resize-none font-sans" />
                  </div>
                  <div>
                    <label className="block text-slate-450 mb-1">Corporate Vision</label>
                    <textarea rows="3" value={settings.about.vision} onChange={(e) => handleSettingsChange('about', 'vision', e.target.value)} className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded text-slate-900 focus:outline-none resize-none font-sans" />
                  </div>
                </div>
              </div>

              <div className="flex justify-end pt-4">
                <button
                  type="submit"
                  className="px-6 py-3.5 bg-accent-500 hover:bg-accent-600 text-white font-bold text-xs uppercase tracking-wider rounded-lg transition-colors shadow-md"
                >
                  Save All Settings
                </button>
              </div>
            </form>
          </div>
        )}

      </main>

      {/* FORM MODAL (UNIVERSAL FOR CREATION/EDITS) */}
      {showModal && (
        <div className="fixed inset-0 z-50 bg-slate-50/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white border border-slate-200 shadow-sm border border-slate-200 rounded-xl w-full max-w-lg p-6 shadow-2xl space-y-4 text-xs font-semibold text-slate-650 max-h-[90vh] overflow-y-auto">
            <h3 className="font-serif text-lg font-bold text-slate-900 border-b border-slate-200 pb-2">
              {editId ? "Edit Item" : "Create New Item"}
            </h3>

            <form 
              onSubmit={
                activeTab === 'projects' ? handleSaveProject :
                activeTab === 'testimonials' ? handleSaveTestimonial :
                activeTab === 'leadership' ? handleSaveLeadership :
                activeTab === 'milestones' ? handleSaveMilestone :
                handleSaveBlog
              } 
              className="space-y-4"
            >
              {activeTab === 'projects' && (
                <>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-slate-500 mb-1">Project Name *</label>
                      <input type="text" name="name" required value={formData.name} onChange={handleInputChange} className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded text-slate-900 focus:outline-none" />
                    </div>
                    <div>
                      <label className="block text-slate-500 mb-1">RERA Number</label>
                      <input type="text" name="reraNumber" value={formData.reraNumber} onChange={handleInputChange} className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded text-slate-900 focus:outline-none" />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-slate-500 mb-1">Type</label>
                      <select name="type" value={formData.type} onChange={handleInputChange} className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded text-slate-900 focus:outline-none">
                        <option value="residential">Residential</option>
                        <option value="commercial">Commercial</option>
                        <option value="plots">Plots</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-slate-500 mb-1">Status</label>
                      <select name="status" value={formData.status} onChange={handleInputChange} className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded text-slate-900 focus:outline-none">
                        <option value="ongoing">Ongoing</option>
                        <option value="completed">Completed</option>
                        <option value="upcoming">Upcoming</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-slate-500 mb-1">Location *</label>
                    <input type="text" name="location" required value={formData.location} onChange={handleInputChange} placeholder="e.g. Gachibowli, Hyderabad" className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded text-slate-900 focus:outline-none" />
                  </div>

                  <div>
                    <label className="block text-slate-500 mb-1">Price Range *</label>
                    <input type="text" name="priceRange" required value={formData.priceRange} onChange={handleInputChange} placeholder="e.g. ₹85 Lakhs - ₹1.4 Crores" className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded text-slate-900 focus:outline-none" />
                  </div>

                  <div>
                    <label className="block text-slate-500 mb-1">Description *</label>
                    <textarea name="description" required rows="3" value={formData.description} onChange={handleInputChange} className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded text-slate-900 focus:outline-none resize-none font-sans" />
                  </div>

                  <div>
                    <label className="block text-slate-500 mb-1">Unit Types (comma-separated)</label>
                    <input type="text" name="unitTypes" value={formData.unitTypes} onChange={handleInputChange} placeholder="2 BHK (1250 sq.ft.), 3 BHK (1650 sq.ft.)" className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded text-slate-900 focus:outline-none" />
                  </div>

                  <div>
                    <label className="block text-slate-500 mb-1">Amenities (comma-separated)</label>
                    <input type="text" name="amenities" value={formData.amenities} onChange={handleInputChange} placeholder="Clubhouse, Swimming Pool, Security" className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded text-slate-900 focus:outline-none" />
                  </div>

                  <div>
                    <label className="block text-slate-500 mb-1">Image URLs (comma-separated)</label>
                    <input type="text" name="images" value={formData.images} onChange={handleInputChange} placeholder="https://image1.jpg, https://image2.jpg" className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded text-slate-900 focus:outline-none" />
                  </div>
                </>
              )}

              {activeTab === 'testimonials' && (
                <>
                  <div>
                    <label className="block text-slate-500 mb-1">Client Name *</label>
                    <input type="text" name="clientName" required value={formData.clientName} onChange={handleInputChange} className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded text-slate-900 focus:outline-none" />
                  </div>
                  <div>
                    <label className="block text-slate-500 mb-1">Project Referenced *</label>
                    <input type="text" name="projectRef" required value={formData.projectRef} onChange={handleInputChange} placeholder="e.g. Srinidhi Grandeur" className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded text-slate-900 focus:outline-none" />
                  </div>
                  <div>
                    <label className="block text-slate-500 mb-1">Review Quote *</label>
                    <textarea name="quote" required rows="3" value={formData.quote} onChange={handleInputChange} className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded text-slate-900 focus:outline-none resize-none" />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-slate-500 mb-1">Rating (1-5)</label>
                      <input type="number" min="1" max="5" step="0.1" name="rating" value={formData.rating} onChange={handleInputChange} className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded text-slate-900 focus:outline-none" />
                    </div>
                    <div>
                      <label className="block text-slate-500 mb-1">Photo URL</label>
                      <input type="text" name="photoUrl" value={formData.photoUrl} onChange={handleInputChange} className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded text-slate-900 focus:outline-none" />
                    </div>
                  </div>
                </>
              )}

              {activeTab === 'blog' && (
                <>
                  <div>
                    <label className="block text-slate-500 mb-1">Article Title *</label>
                    <input type="text" name="title" required value={formData.title} onChange={handleInputChange} className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded text-slate-900 focus:outline-none" />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-slate-500 mb-1">Author Name *</label>
                      <input type="text" name="author" required value={formData.author} onChange={handleInputChange} className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded text-slate-900 focus:outline-none" />
                    </div>
                    <div>
                      <label className="block text-slate-500 mb-1">Cover Image URL</label>
                      <input type="text" name="coverImageUrl" required value={formData.coverImageUrl} onChange={handleInputChange} className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded text-slate-900 focus:outline-none" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-slate-500 mb-1">Content *</label>
                    <textarea name="content" required rows="8" value={formData.content} onChange={handleInputChange} className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded text-slate-900 focus:outline-none resize-none font-sans" />
                  </div>
                </>
              )}

              {activeTab === 'leadership' && (
                <>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-slate-500 mb-1">Leader Name *</label>
                      <input type="text" name="name" required value={formData.name} onChange={handleInputChange} className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded text-slate-900 focus:outline-none" />
                    </div>
                    <div>
                      <label className="block text-slate-500 mb-1">Designation / Role *</label>
                      <input type="text" name="role" required value={formData.role} onChange={handleInputChange} className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded text-slate-900 focus:outline-none" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-slate-500 mb-1">Biography *</label>
                    <textarea name="bio" required rows="4" value={formData.bio} onChange={handleInputChange} className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded text-slate-900 focus:outline-none resize-none font-sans" />
                  </div>
                  <div>
                    <label className="block text-slate-500 mb-1">Photo URL</label>
                    <input type="text" name="photo" value={formData.photo} onChange={handleInputChange} className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded text-slate-900 focus:outline-none" />
                  </div>
                </>
              )}

              {activeTab === 'milestones' && (
                <>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-slate-500 mb-1">Year *</label>
                      <input type="text" name="year" required value={formData.year} onChange={handleInputChange} placeholder="e.g. 2026" className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded text-slate-900 focus:outline-none" />
                    </div>
                    <div>
                      <label className="block text-slate-500 mb-1">Milestone Title *</label>
                      <input type="text" name="title" required value={formData.title} onChange={handleInputChange} placeholder="e.g. Expanding Horizons" className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded text-slate-900 focus:outline-none" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-slate-500 mb-1">Description *</label>
                    <textarea name="desc" required rows="3" value={formData.desc} onChange={handleInputChange} className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded text-slate-900 focus:outline-none resize-none font-sans" />
                  </div>
                </>
              )}

              <div className="flex justify-end space-x-2 pt-4 border-t border-slate-200">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 bg-slate-800 hover:bg-slate-750 text-slate-500 rounded font-bold uppercase tracking-wider transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-accent-500 hover:bg-accent-600 text-white rounded font-bold uppercase tracking-wider transition-colors"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};

export default Admin;

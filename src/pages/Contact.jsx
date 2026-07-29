import React, { useState, useEffect } from 'react';
import { 
  MapPin, Phone, Mail, Clock, Send, MessageSquare
} from 'lucide-react';
import { addEnquiry, getSettings } from '../services/db';

const Contact = () => {
  const [settings, setSettings] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    projectRef: "",
    message: ""
  });
  const [submitStatus, setSubmitStatus] = useState({ type: "", text: "" });
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const sets = await getSettings();
        setSettings(sets);
      } catch (err) {
        console.error("Error fetching contact page data", err);
      }
    };
    fetchData();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.phone || !formData.email) {
      setSubmitStatus({ type: "error", text: "Please enter your Name, Phone Number, and Email Address." });
      return;
    }
    
    setSubmitting(true);
    setSubmitStatus({ type: "", text: "" });

    try {
      await addEnquiry(formData);
      setSubmitStatus({ 
        type: "success", 
        text: "Your message has been received! Our team will reach out within 24 hours." 
      });
      setFormData({ name: "", email: "", phone: "", projectRef: "", message: "" });
    } catch (error) {
      setSubmitStatus({ type: "error", text: "Enquiry submission failed. Please try again." });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="bg-white min-h-screen text-slate-800 font-sans">
      {/* Header Banner */}
      <section className="relative pt-48 pb-24 text-white overflow-hidden border-b border-slate-800 bg-slate-900">
        <div className="absolute inset-0 z-0">
          <img 
            src="/thankyou.jpg" 
            alt="Thank You Banner Background" 
            className="w-full h-full object-cover opacity-35"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-slate-900/40 to-transparent" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center md:text-left">
          <span className="text-accent-500 text-xs font-semibold tracking-widest uppercase block mb-2">Connect With Us</span>
          <h1 className="text-4xl font-serif font-bold text-white">Contact Us</h1>
          <p className="text-xs sm:text-sm text-slate-350 mt-2 max-w-xl">
            Have questions about our execution workflow, packages, or planning scopes? Send us a message or visit our office.
          </p>
        </div>
      </section>

      {/* Main Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-16 relative overflow-hidden">
        {/* Glow Blob */}
        <div className="glow-blob w-96 h-96 bg-accent-400/10 top-1/4 left-1/4" />
        <div className="glow-blob w-96 h-96 bg-primary-500/10 bottom-1/4 right-1/4" />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 relative z-10">
          
          {/* Left Column: Details */}
          <div className="lg:col-span-1 space-y-8">
            {/* Contact Details Card */}
            <div className="premium-card p-6 sm:p-8 space-y-6">
              <h2 className="font-serif text-lg font-bold text-slate-900 border-b border-slate-100 pb-3">
                Corporate Office
              </h2>
              <ul className="space-y-5 text-xs text-slate-605 font-medium">
                <li className="flex items-start">
                  <MapPin className="h-5 w-5 mr-3.5 text-accent-600 shrink-0 mt-0.5" />
                  <span className="leading-relaxed whitespace-pre-line text-slate-600 font-light">
                    {settings?.contact?.address || "H.no..1-159/1  Gandhi nagar kapra.secunderbad pin code 500062"}
                  </span>
                </li>
                <li className="flex flex-col space-y-2">
                  <div className="flex items-center">
                    <Phone className="h-4.5 w-4.5 mr-3.5 text-accent-600 shrink-0" />
                    <a href={`tel:${settings?.contact?.phone || '9866615535'}`} className="hover:text-accent-605 text-slate-600 hover:text-slate-900 transition-colors font-light">
                      {settings?.contact?.phone || "9866615535"} (Main)
                    </a>
                  </div>
                  {(settings?.contact?.phone2 || "9866615525") && (
                    <div className="flex items-center pl-8 text-slate-500 font-light">
                      <a href={`tel:${settings?.contact?.phone2 || '9866615525'}`} className="hover:text-accent-605 hover:text-slate-900 transition-colors">
                        {settings?.contact?.phone2 || "9866615525"} (Alt)
                      </a>
                    </div>
                  )}
                </li>
                <li className="flex items-center">
                  <Mail className="h-4.5 w-4.5 mr-3.5 text-accent-600 shrink-0" />
                  <a href={`mailto:${settings?.contact?.email || 'info@srinidhiinfradevelopers.com'}`} className="hover:text-accent-605 text-slate-600 hover:text-slate-900 transition-colors font-light">
                    {settings?.contact?.email || "info@srinidhiinfradevelopers.com"}
                  </a>
                </li>
                <li className="flex items-start">
                  <Clock className="h-4.5 w-4.5 mr-3.5 text-accent-600 shrink-0 mt-0.5" />
                  <div>
                    <p className="font-bold text-slate-800">Office Hours:</p>
                    <p className="text-slate-500 font-light mt-0.5">{settings?.contact?.hours || "Mon - Sat: 09:30 AM - 06:30 PM"}</p>
                    <p className="text-[10px] text-slate-400 font-light mt-0.5">Sundays Closed</p>
                  </div>
                </li>
              </ul>

              {/* WhatsApp Call to Action */}
              <div className="border-t border-slate-100 pt-6">
                <a
                  href={`https://wa.me/${settings?.contact?.whatsapp?.replace(/[^0-9]/g, '') || "919876543210"}`}
                  target="_blank"
                  rel="noreferrer"
                  className="w-full inline-flex items-center justify-center px-4 py-3.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl transition-all duration-200 shadow-md hover:shadow-emerald-600/10"
                >
                  <MessageSquare className="h-4.5 w-4.5 mr-2" />
                  Chat on WhatsApp
                </a>
              </div>
            </div>

            {/* Construction Site Consultation Card */}
            <div className="rounded-2xl overflow-hidden shadow-md border border-slate-200/80 group relative">
              <img
                src="https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=800&q=80"
                alt="On-Site Construction Consultation"
                className="w-full h-44 object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/40 to-transparent p-5 flex flex-col justify-end">
                <span className="text-accent-400 text-[10px] font-bold uppercase tracking-wider">Site Visits & Audits</span>
                <h4 className="text-white text-xs font-bold font-serif mt-1">Book an On-Site Engineering Inspection</h4>
              </div>
            </div>

            {/* Quick Notes */}
            <div className="premium-card p-6 relative overflow-hidden group">
              <div className="glow-blob w-20 h-20 bg-accent-500/5 -bottom-5 -right-5" />
              <h3 className="font-serif text-sm font-bold mb-2 text-slate-900">Quality Guarantee</h3>
              <p className="text-xs text-slate-500 leading-relaxed font-light">
                All packages carry structured timelines, vetted procurement checks, and post-project checks to ensure your project stands the test of time.
              </p>
            </div>
          </div>

          {/* Right Column: Lead Form */}
          <div className="lg:col-span-2">
            <div className="premium-card p-6 sm:p-10 space-y-6">
              <div>
                <h2 className="font-serif text-xl font-bold text-slate-900">Online Inquiry</h2>
                <p className="text-xs text-slate-550 mt-1.5 font-light">
                  Have a specific question, or want to schedule a physical site visit? Please submit your query below.
                </p>
              </div>

              {submitStatus.text && (
                <div className={`p-4 rounded-xl text-xs font-semibold ${
                  submitStatus.type === 'success' 
                    ? 'bg-green-50 border border-green-200/80 text-green-700' 
                    : 'bg-red-50 border border-red-200/80 text-red-700'
                }`}>
                  {submitStatus.text}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6 text-xs font-medium">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-slate-500 mb-2 font-bold uppercase tracking-wider">Full Name *</label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      placeholder="Your full name"
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
                      placeholder="10-digit mobile number"
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-accent-500/20 focus:border-accent-500 text-slate-800 text-xs font-light transition-all duration-200"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="email" className="block text-slate-500 mb-2 font-bold uppercase tracking-wider">Email Address *</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      placeholder="name@srinidhiinfradevelopers.com"
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-accent-500/20 focus:border-accent-500 text-slate-800 text-xs font-light transition-all duration-200"
                    />
                  </div>
                  <div>
                    <label htmlFor="projectRef" className="block text-slate-500 mb-2 font-bold uppercase tracking-wider">Plan of Interest</label>
                    <select
                      id="projectRef"
                      name="projectRef"
                      value={formData.projectRef}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-accent-500/20 focus:border-accent-500 text-slate-700 text-xs font-light transition-all duration-200"
                    >
                      <option value="">General Query / Other</option>
                      <option value="Premium Signature">Premium Signature (₹2,200/- per sft)</option>
                      <option value="Elite Comfort">Elite Comfort (₹1,985/- per sft)</option>
                      <option value="Smart Value">Smart Value (₹1,785/- per sft)</option>
                      <option value="Essential Starter">Essential Starter (₹1,685/- per sft)</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label htmlFor="message" className="block text-slate-500 mb-2 font-bold uppercase tracking-wider">Message / Details</label>
                  <textarea
                    id="message"
                    name="message"
                    rows="5"
                    value={formData.message}
                    onChange={handleInputChange}
                    placeholder="Provide details about your query (budget range, preferred floor, unit size etc.)"
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-accent-500/20 focus:border-accent-500 text-slate-800 text-xs font-light resize-none font-sans transition-all duration-200"
                  />
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full sm:w-auto wp-btn-primary py-3.5 px-8"
                >
                  {submitting ? "Sending..." : (
                    <>
                      <Send className="h-4 w-4 mr-2" />
                      Send Message
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>

        </div>
      </section>

      {/* Embedded Map Section */}
      <section className="h-96 w-full border-t border-slate-200 relative bg-slate-100">
        <iframe
          title="Google Map Office Location"
          src="https://maps.google.com/maps?q=Gandhi%20Nagar%20Kapra%20Secunderabad%20500062&t=&z=15&ie=UTF8&iwloc=&output=embed"
          className="w-full h-full border-0 grayscale"
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          sandbox="allow-scripts allow-same-origin"
        />
        <div className="absolute inset-0 bg-slate-900/5 pointer-events-none" />
      </section>
    </div>
  );
};

export default Contact;

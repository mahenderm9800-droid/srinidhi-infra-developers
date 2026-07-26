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
      <section className="relative pt-32 pb-12 text-white overflow-hidden border-b border-slate-800 bg-slate-900">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=80" 
            alt="Office Meeting Room Background" 
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
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          
          {/* Left Column: Details */}
          <div className="lg:col-span-1 space-y-8">
            {/* Contact Details Card */}
            <div className="bg-white p-6 sm:p-8 rounded-xl border border-slate-200/80 shadow-sm space-y-6">
              <h2 className="font-serif text-lg font-bold text-slate-900 border-b border-slate-100 pb-2">
                Corporate Office
              </h2>
              <ul className="space-y-5 text-xs text-slate-650 font-medium">
                <li className="flex items-start">
                  <MapPin className="h-5 w-5 mr-3.5 text-accent-500 shrink-0 mt-0.5" />
                  <span className="leading-relaxed whitespace-pre-line">
                    {settings?.contact?.address || "Plot No. 42, Silicon Valley Layout, Image Gardens Road, Madhapur, Hyderabad, Telangana - 500081"}
                  </span>
                </li>
                <li className="flex items-center">
                  <Phone className="h-4.5 w-4.5 mr-3.5 text-accent-500" />
                  <a href={`tel:${settings?.contact?.phone || '+91 98765 43210'}`} className="hover:text-accent-500 transition-colors">
                    {settings?.contact?.phone || "+91 98765 43210"}
                  </a>
                </li>
                <li className="flex items-center">
                  <Mail className="h-4.5 w-4.5 mr-3.5 text-accent-500" />
                  <a href={`mailto:${settings?.contact?.email || 'info@srinidhiinfra.com'}`} className="hover:text-accent-500 transition-colors">
                    {settings?.contact?.email || "info@srinidhiinfra.com"}
                  </a>
                </li>
                <li className="flex items-start">
                  <Clock className="h-4.5 w-4.5 mr-3.5 text-accent-500 shrink-0 mt-0.5" />
                  <div>
                    <p className="font-bold text-slate-800">Office Hours:</p>
                    <p className="text-slate-500">{settings?.contact?.hours || "Mon - Sat: 09:30 AM - 06:30 PM"}</p>
                    <p className="text-[10px] text-slate-400">Sundays Closed</p>
                  </div>
                </li>
              </ul>

              {/* WhatsApp Call to Action */}
              <div className="border-t border-slate-100 pt-6">
                <a
                  href={`https://wa.me/${settings?.contact?.whatsapp?.replace(/[^0-9]/g, '') || "919876543210"}`}
                  target="_blank"
                  rel="noreferrer"
                  className="w-full inline-flex items-center justify-center px-4 py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-lg transition-colors shadow-md"
                >
                  <MessageSquare className="h-4.5 w-4.5 mr-2" />
                  Chat on WhatsApp
                </a>
              </div>
            </div>

            {/* Quick Notes */}
            <div className="bg-slate-50 text-slate-700 p-6 rounded-xl border border-slate-200/80 shadow-sm">
              <h3 className="font-serif text-sm font-bold mb-2">Quality Guarantee</h3>
              <p className="text-[11px] text-slate-500 leading-relaxed">
                All packages carry structured timelines, vetted procurement checks, and post-project checks to ensure your project stands the test of time.
              </p>
            </div>
          </div>

          {/* Right Column: Lead Form */}
          <div className="lg:col-span-2">
            <div className="bg-white p-6 sm:p-10 rounded-xl border border-slate-200/80 shadow-sm space-y-6">
              <div>
                <h2 className="font-serif text-xl font-bold text-slate-900">Online Inquiry</h2>
                <p className="text-xs text-slate-550 mt-1">
                  Have a specific question, or want to schedule a physical site visit? Please submit your query below.
                </p>
              </div>

              {submitStatus.text && (
                <div className={`p-4 rounded-lg text-xs font-semibold ${
                  submitStatus.type === 'success' 
                    ? 'bg-green-50 border border-green-200 text-green-700' 
                    : 'bg-red-50 border border-red-200 text-red-700'
                }`}>
                  {submitStatus.text}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6 text-xs font-medium">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-slate-600 mb-1.5 font-bold uppercase tracking-wider">FullName *</label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      placeholder="Your full name"
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:border-accent-500 text-slate-800"
                    />
                  </div>
                  <div>
                    <label htmlFor="phone" className="block text-slate-600 mb-1.5 font-bold uppercase tracking-wider">Phone Number *</label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      required
                      placeholder="10-digit mobile number"
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:border-accent-500 text-slate-800"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="email" className="block text-slate-600 mb-1.5 font-bold uppercase tracking-wider">Email Address *</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      placeholder="name@example.com"
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:border-accent-500 text-slate-800"
                    />
                  </div>
                  <div>
                    <label htmlFor="projectRef" className="block text-slate-600 mb-1.5 font-bold uppercase tracking-wider">Plan of Interest</label>
                    <select
                      id="projectRef"
                      name="projectRef"
                      value={formData.projectRef}
                      onChange={handleInputChange}
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:border-accent-500 text-slate-700"
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
                  <label htmlFor="message" className="block text-slate-600 mb-1.5 font-bold uppercase tracking-wider">Message / Details</label>
                  <textarea
                    id="message"
                    name="message"
                    rows="5"
                    value={formData.message}
                    onChange={handleInputChange}
                    placeholder="Provide details about your query (budget range, preferred floor, unit size etc.)"
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:border-accent-500 text-slate-800 resize-none font-sans"
                  />
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className="inline-flex items-center justify-center px-8 py-3.5 bg-accent-500 hover:bg-accent-600 text-white font-bold rounded-lg transition-colors disabled:opacity-50 text-xs uppercase tracking-wider shadow"
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
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3806.4050720448107!2d78.3792376148777!3d17.440316488048256!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bcb93e2f5555555%3A0x6bcf3f99e334e2c!2sSilicon%20Valley%252C%2520Madhapur%252C%2520Hyderabad%252C%2520Telangana%2520500081!5e0!3m2!1sen!2sin!4v1627254564891!5m2!1sen!2sin"
          className="w-full h-full border-0 grayscale"
          allowFullScreen=""
          loading="lazy"
        />
        <div className="absolute inset-0 bg-slate-900/5 pointer-events-none" />
      </section>
    </div>
  );
};

export default Contact;

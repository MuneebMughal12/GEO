import React, { useState, useEffect } from 'react';
import API from '../services/api';
import SEO from '../components/SEO';

const Contact = () => {
  const [settings, setSettings] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    division: 'GLOBAL',
    message: ''
  });
  const [status, setStatus] = useState({ type: '', msg: '' });
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const res = await API.get('/companies/settings');
        if (res.data.success) {
          setSettings(res.data.data);
        }
      } catch (err) {
        console.error('Error fetching global settings:', err);
      }
    };
    fetchSettings();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setStatus({ type: '', msg: '' });

    try {
      const res = await API.post('/messages', formData);
      if (res.data.success) {
        setStatus({ type: 'success', msg: res.data.message });
        setFormData({ name: '', email: '', phone: '', division: 'GLOBAL', message: '' });
      }
    } catch (err) {
      setStatus({ 
        type: 'error', 
        msg: err.response?.data?.message || 'Enquiry submission failed. Please try again.' 
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="relative w-full pt-20">
      <SEO 
        title="Contact Us | GEO Group of Companies" 
        description="Get in touch with our experts across Architectural Design, Geotechnical Soil Testing, and Infrastructure Construction divisions."
      />

      {/* Header */}
      <section className="bg-primary text-white py-24 text-center">
        <div className="max-w-container-max mx-auto px-margin-desktop space-y-4">
          <h1 className="font-display text-4xl md:text-5xl font-extrabold tracking-tight">Connect with Our Teams</h1>
          <p className="font-sans text-white/80 max-w-xl mx-auto text-sm md:text-base">Get dedicated engineering guidance, site surveys, and corporate proposals.</p>
        </div>
      </section>

      {/* Main Grid */}
      <section className="py-24 bg-background">
        <div className="max-w-container-max mx-auto px-margin-desktop grid grid-cols-1 lg:grid-cols-2 gap-16">
          
          {/* Contact Details */}
          <div className="space-y-10">
            <div>
              <h2 className="font-display text-2xl font-bold text-primary mb-4">Corporate Offices</h2>
              <p className="font-sans text-on-surface-variant text-sm">Visit our global headquarters or send us an enquiry directly.</p>
            </div>
            
            <div className="space-y-6">
              <div className="flex gap-4">
                <span className="material-symbols-outlined text-secondary text-2xl">location_on</span>
                <div>
                  <h4 className="font-display font-bold text-sm text-primary">Headquarters</h4>
                  <p className="font-sans text-xs text-on-surface-variant mt-1">{settings?.address || '1200 Elite Tower, Financial District, Abu Dhabi, UAE'}</p>
                </div>
              </div>
              <div className="flex gap-4">
                <span className="material-symbols-outlined text-secondary text-2xl">mail</span>
                <div>
                  <h4 className="font-display font-bold text-sm text-primary">Email Contacts</h4>
                  <p className="font-sans text-xs text-on-surface-variant mt-1">{settings?.contactEmail || 'contact@geogroup.global'}</p>
                </div>
              </div>
              <div className="flex gap-4">
                <span className="material-symbols-outlined text-secondary text-2xl">call</span>
                <div>
                  <h4 className="font-display font-bold text-sm text-primary">Phone Inquiries</h4>
                  <p className="font-sans text-xs text-on-surface-variant mt-1">{settings?.contactPhone || '+971 4 000 0000'}</p>
                </div>
              </div>
            </div>

            {/* Interactive Mock Map */}
            <div className="rounded-2xl overflow-hidden h-[300px] border border-outline-variant/30 relative shadow-sm">
              <iframe 
                title="Office Location Map"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14541.240822606568!2d54.36384462100867!3d24.425313936663243!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e5e43f555555555%3A0x8bb68b31a89c4d9b!2sAbu%20Dhabi%20Financial%20District!5e0!3m2!1sen!2sae!4v1700000000000!5m2!1sen!2sae" 
                className="w-full h-full border-0"
                allowFullScreen="" 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>

          {/* Enquiry Form */}
          <div className="bg-white p-8 md:p-12 rounded-3xl border border-outline-variant/30 shadow-md">
            <h3 className="font-display text-xl font-bold text-primary mb-6">Send an Enquiry</h3>
            
            {status.msg && (
              <div className={`p-4 rounded-xl text-xs font-semibold mb-6 ${
                status.type === 'success' ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'
              }`}>
                {status.msg}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="flex flex-col gap-1.5">
                <label className="font-display font-bold text-xs text-primary">Your Name</label>
                <input 
                  type="text" 
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  placeholder="e.g. Johnathan Smith"
                  className="px-4 py-3 rounded-xl border border-outline-variant/50 focus:border-secondary focus:ring-1 focus:ring-secondary/20 outline-none text-sm transition-all"
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex flex-col gap-1.5">
                  <label className="font-display font-bold text-xs text-primary">Email Address</label>
                  <input 
                    type="email" 
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    placeholder="john@example.com"
                    className="px-4 py-3 rounded-xl border border-outline-variant/50 focus:border-secondary focus:ring-1 focus:ring-secondary/20 outline-none text-sm transition-all"
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="font-display font-bold text-xs text-primary">Phone Number</label>
                  <input 
                    type="tel" 
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="+971 50 000 0000"
                    className="px-4 py-3 rounded-xl border border-outline-variant/50 focus:border-secondary focus:ring-1 focus:ring-secondary/20 outline-none text-sm transition-all"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="font-display font-bold text-xs text-primary">Division Target</label>
                <select 
                  name="division"
                  value={formData.division}
                  onChange={handleChange}
                  className="px-4 py-3 rounded-xl border border-outline-variant/50 focus:border-secondary focus:ring-1 focus:ring-secondary/20 outline-none text-sm transition-all bg-white"
                >
                  <option value="GLOBAL">GEO Group (Global Corporate)</option>
                  <option value="ARC">GEO ARC (Architecture & Design)</option>
                  <option value="SOIL">GEO Soil Testing (Laboratory)</option>
                  <option value="CONSTRUCTION">GEO Construction (Civil Infrastructure)</option>
                </select>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="font-display font-bold text-xs text-primary">Brief Message</label>
                <textarea 
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  placeholder="Outline your project scope or geotechnical requirements..."
                  rows="5"
                  className="px-4 py-3 rounded-xl border border-outline-variant/50 focus:border-secondary focus:ring-1 focus:ring-secondary/20 outline-none text-sm transition-all resize-none"
                />
              </div>

              <button 
                type="submit" 
                disabled={submitting}
                className="w-full py-4 bg-primary text-on-primary rounded-xl font-display font-semibold hover:bg-primary-container transition-colors disabled:opacity-50 flex items-center justify-center gap-2 shadow-md"
              >
                {submitting ? 'Submitting...' : 'Submit Message'}
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;

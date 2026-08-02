import React, { useState, useEffect } from 'react';
import API from '../services/api';
import SEO from '../components/SEO';
import Reveal from '../components/Reveal';

const Contact = () => {
  const [settings, setSettings] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    division: 'ARC',
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
        setFormData({ name: '', email: '', phone: '', division: 'ARC', message: '' });
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
    <div className="relative w-full bg-ivory">
      <SEO
        title="Contact Us | GEO Group of Companies"
        description="Get in touch with our experts across Architectural Design, Geotechnical Soil Testing, and Infrastructure Construction divisions."
      />

      {/* Header */}
      <section className="luxe-dark luxe-grain py-40 pb-24 text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_20%,rgba(201,162,39,0.12),transparent_55%)]" />
        <div className="relative z-10 max-w-container-max mx-auto px-6 md:px-margin-desktop space-y-5">
          <p className="luxe-eyebrow center justify-center animate-fade-in">Get In Touch</p>
          <h1 className="font-display text-4xl md:text-6xl font-bold text-ivory tracking-tight animate-fade-up">Connect With Our <span className="text-gradient-gold italic">Teams</span></h1>
          <p className="font-sans text-luxury-muted max-w-xl mx-auto text-sm md:text-base animate-fade-up" style={{ animationDelay: '120ms' }}>Get dedicated engineering guidance, site surveys, and corporate proposals.</p>
        </div>
      </section>

      {/* Main Grid */}
      <section className="py-24 md:py-32 bg-ivory">
        <div className="max-w-container-max mx-auto px-6 md:px-margin-desktop grid grid-cols-1 lg:grid-cols-2 gap-16">

          {/* Contact Details */}
          <Reveal className="space-y-10">
            <div>
              <p className="luxe-eyebrow mb-4">Corporate Offices</p>
              <h2 className="font-display text-3xl font-bold text-ink mb-3">Visit or Reach Out</h2>
              <p className="font-sans text-on-surface-variant text-sm">Visit our global headquarters or send us an enquiry directly.</p>
            </div>

            <div className="space-y-5">
              {[
                { icon: 'location_on', title: 'Headquarters', val: settings?.address || '1200 Elite Tower, Financial District, Abu Dhabi, UAE' },
                { icon: 'mail', title: 'Email Contacts', val: settings?.contactEmail || 'contact@geogroup.global' },
                { icon: 'call', title: 'Phone Inquiries', val: settings?.contactPhone || '+971 4 000 0000' },
              ].map((d) => (
                <div key={d.title} className="flex gap-4 items-start p-4 rounded-xl border border-gold/15 hover:border-gold/40 transition-colors">
                  <div className="flex-shrink-0 w-11 h-11 rounded-lg bg-ink flex items-center justify-center border border-gold/25">
                    <span className="material-symbols-outlined text-gold text-xl">{d.icon}</span>
                  </div>
                  <div>
                    <h4 className="font-display font-bold text-sm text-ink">{d.title}</h4>
                    <p className="font-sans text-xs text-on-surface-variant mt-1">{d.val}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Map */}
            <div className="rounded-2xl overflow-hidden h-[300px] border border-gold/25 relative shadow-luxe-soft">
              <iframe
                title="Office Location Map"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d830.6880511493213!2d72.97045949997022!3d33.61173331646324!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x38df97f1cd0c2b7d%3A0x35a6ae4a28948090!2sGeo%20Group%20of%20Companies%20(Soil%20Testing%20-%20Designing%20-%20Construction%20-%20Real%20Estate%20Marketing%20-%20Material%20Suppliers)!5e0!3m2!1sen!2s!4v1780914572394!5m2!1sen!2s"
                className="w-full h-full border-0"
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </Reveal>

          {/* Enquiry Form */}
          <Reveal delay={120} className="luxe-card bg-white/80 p-8 md:p-12 rounded-3xl">
            <p className="luxe-eyebrow mb-3">Enquiry</p>
            <h3 className="font-display text-2xl font-bold text-ink mb-6">Send Us a Message</h3>

            {status.msg && (
              <div className={`p-4 rounded-xl text-xs font-semibold mb-6 ${status.type === 'success' ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' : 'bg-red-50 text-red-700 border border-red-200'
                }`}>
                {status.msg}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="flex flex-col gap-1.5">
                <label className="font-sans font-semibold text-[11px] uppercase tracking-wider text-ink/70">Your Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  placeholder="e.g. Johnathan Smith"
                  className="px-4 py-3 rounded-xl border border-gold/25 bg-cream/40 focus:border-gold focus:ring-1 focus:ring-gold/20 outline-none text-sm transition-all"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex flex-col gap-1.5">
                  <label className="font-sans font-semibold text-[11px] uppercase tracking-wider text-ink/70">Email Address</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    placeholder="john@example.com"
                    className="px-4 py-3 rounded-xl border border-gold/25 bg-cream/40 focus:border-gold focus:ring-1 focus:ring-gold/20 outline-none text-sm transition-all"
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="font-sans font-semibold text-[11px] uppercase tracking-wider text-ink/70">Phone Number</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="+971 50 000 0000"
                    className="px-4 py-3 rounded-xl border border-gold/25 bg-cream/40 focus:border-gold focus:ring-1 focus:ring-gold/20 outline-none text-sm transition-all"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="font-sans font-semibold text-[11px] uppercase tracking-wider text-ink/70">Division Target</label>
                <select
                  name="division"
                  value={formData.division}
                  onChange={handleChange}
                  className="px-4 py-3 rounded-xl border border-gold/25 bg-cream/40 focus:border-gold focus:ring-1 focus:ring-gold/20 outline-none text-sm transition-all bg-white"
                >
                  <option value="ARC">GEO ARC (Architecture & Design)</option>
                  <option value="SOIL">GEO Soil Testing (Laboratory)</option>
                  <option value="CONSTRUCTION">GEO Construction (Civil Infrastructure)</option>
                </select>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="font-sans font-semibold text-[11px] uppercase tracking-wider text-ink/70">Brief Message</label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  placeholder="Outline your project scope or geotechnical requirements..."
                  rows="5"
                  className="px-4 py-3 rounded-xl border border-gold/25 bg-cream/40 focus:border-gold focus:ring-1 focus:ring-gold/20 outline-none text-sm transition-all resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="btn-gold w-full py-4 rounded-xl font-semibold uppercase tracking-wider text-sm disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {submitting ? (
                  <><span className="w-4 h-4 border-2 border-ink/40 border-t-ink rounded-full animate-spin" /> Submitting…</>
                ) : (
                  <><span className="material-symbols-outlined text-[18px]">send</span> Submit Message</>
                )}
              </button>
            </form>
          </Reveal>
        </div>
      </section>
    </div>
  );
};

export default Contact;

import React, { useState, useEffect } from 'react';
import API from '../../services/api';

const CompanyManagement = () => {
  const [settings, setSettings] = useState({
    siteName: '',
    tagline: '',
    contactEmail: '',
    contactPhone: '',
    whatsappNumber: '',
    address: '',
    homepage: {
      heroTitle: '',
      heroSubtitle: '',
      heroBgImage: '',
      heroBgVideo: '',
      aboutTitle: '',
      aboutText: '',
      aboutImage: '',
      aboutMission: '',
      aboutVision: ''
    },
    metadata: {
      footerText: '',
      footerCopyright: '',
      ctaTitle: '',
      ctaSubtitle: '',
      ctaContactText: '',
      ctaWhatsappText: '',
      testimonialTitle: '',
      aboutHeroTitle: '',
      aboutHeroSubtitle: '',
      aboutMessageHeading: '',
      aboutMessageText1: '',
      aboutMessageText2: ''
    }
  });
  const [companies, setCompanies] = useState([]);
  const [activeTab, setActiveTab] = useState('global');
  const [editingCompany, setEditingCompany] = useState(null);
  const [status, setStatus] = useState('');

  useEffect(() => {
    fetchSettingsAndCompanies();
  }, []);

  useEffect(() => {
    if (activeTab !== 'global') {
      const comp = companies.find(c => c.slug === activeTab);
      if (comp) {
        setEditingCompany({ ...comp });
      }
    } else {
      setEditingCompany(null);
    }
  }, [activeTab, companies]);

  const fetchSettingsAndCompanies = async () => {
    try {
      const [settingsRes, compRes] = await Promise.all([
        API.get('/companies/settings'),
        API.get('/companies')
      ]);
      if (settingsRes.data.success) setSettings(settingsRes.data.data);
      if (compRes.data.success) setCompanies(compRes.data.data);
    } catch (err) {
      console.error('Error fetching settings:', err);
    }
  };

  const handleGlobalChange = (e) => {
    const { name, value } = e.target;
    if (name.startsWith('meta_')) {
      const metaKey = name.replace('meta_', '');
      setSettings({
        ...settings,
        metadata: {
          ...(settings.metadata || {}),
          [metaKey]: value
        }
      });
    } else if (
      name.startsWith('hero') || 
      name.startsWith('about')
    ) {
      setSettings({
        ...settings,
        homepage: {
          ...settings.homepage,
          [name]: value
        }
      });
    } else {
      setSettings({
        ...settings,
        [name]: value
      });
    }
  };

  const handleCompanyChange = (e) => {
    const { name, value } = e.target;
    if (name.startsWith('meta_')) {
      const metaKey = name.replace('meta_', '');
      setEditingCompany({
        ...editingCompany,
        metadata: {
          ...(editingCompany.metadata || {}),
          [metaKey]: value
        }
      });
    } else {
      setEditingCompany({
        ...editingCompany,
        [name]: value
      });
    }
  };

  const handleSaveGlobal = async (e) => {
    e.preventDefault();
    setStatus('Saving global settings...');
    try {
      const res = await API.put('/companies/settings', settings);
      if (res.data.success) {
        setStatus('Global settings saved successfully.');
        setTimeout(() => setStatus(''), 3000);
      }
    } catch (err) {
      setStatus('Failed to save settings.');
    }
  };

  const handleSaveCompany = async (e) => {
    e.preventDefault();
    if (!editingCompany) return;
    setStatus(`Saving ${editingCompany.name} settings...`);
    try {
      const res = await API.put(`/companies/${editingCompany._id}`, editingCompany);
      if (res.data.success) {
        setStatus(`${editingCompany.name} settings saved successfully.`);
        // Refresh local companies data
        const updatedComps = companies.map(c => c._id === editingCompany._id ? res.data.data : c);
        setCompanies(updatedComps);
        setTimeout(() => setStatus(''), 3000);
      }
    } catch (err) {
      setStatus('Failed to save division settings.');
    }
  };

  return (
    <div className="space-y-10">
      <header>
        <h1 className="font-display text-3xl font-bold text-primary mb-2">Website Settings & Content Management</h1>
        <p className="text-outline-variant font-sans text-sm">Modify global details, homepage sections, media links, and division taglines/assets without code.</p>
      </header>

      {/* Tab select bar */}
      <div className="flex flex-wrap gap-2 md:gap-4 border-b border-outline-variant/20 pb-4">
        <button 
          onClick={() => setActiveTab('global')}
          className={`px-6 py-2.5 rounded-full font-display font-semibold text-xs transition-all ${
            activeTab === 'global' ? 'bg-primary text-on-primary shadow-sm' : 'text-on-surface-variant hover:bg-surface-container-high'
          }`}
        >
          Global & Homepage Settings
        </button>
        <button 
          onClick={() => setActiveTab('geo-arc')}
          className={`px-6 py-2.5 rounded-full font-display font-semibold text-xs transition-all ${
            activeTab === 'geo-arc' ? 'bg-secondary text-white shadow-sm' : 'text-on-surface-variant hover:bg-surface-container-high'
          }`}
        >
          GEO ARC
        </button>
        <button 
          onClick={() => setActiveTab('geo-soil-testing')}
          className={`px-6 py-2.5 rounded-full font-display font-semibold text-xs transition-all ${
            activeTab === 'geo-soil-testing' ? 'bg-secondary text-white shadow-sm' : 'text-on-surface-variant hover:bg-surface-container-high'
          }`}
        >
          GEO Soil Testing
        </button>
        <button 
          onClick={() => setActiveTab('geo-construction')}
          className={`px-6 py-2.5 rounded-full font-display font-semibold text-xs transition-all ${
            activeTab === 'geo-construction' ? 'bg-secondary text-white shadow-sm' : 'text-on-surface-variant hover:bg-surface-container-high'
          }`}
        >
          GEO Construction
        </button>
      </div>

      {status && (
        <div className="p-4 bg-primary-fixed/20 text-primary font-display font-bold text-xs rounded-xl max-w-xl shadow-sm border border-primary-fixed">
          {status}
        </div>
      )}

      {activeTab === 'global' ? (
        <form onSubmit={handleSaveGlobal} className="bg-white p-8 md:p-12 rounded-3xl border border-outline-variant/30 shadow-sm space-y-8 max-w-4xl">
          <div>
            <h2 className="font-display font-bold text-lg text-primary mb-6 border-b border-outline-variant/10 pb-2">Corporate Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex flex-col gap-1.5">
                <label className="font-display font-bold text-xs text-primary">Site Name</label>
                <input 
                  type="text" 
                  name="siteName"
                  value={settings.siteName || ''}
                  onChange={handleGlobalChange}
                  className="px-4 py-3 rounded-xl border border-outline-variant/50 focus:border-secondary outline-none text-sm font-sans"
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="font-display font-bold text-xs text-primary">Global Tagline</label>
                <input 
                  type="text" 
                  name="tagline"
                  value={settings.tagline || ''}
                  onChange={handleGlobalChange}
                  className="px-4 py-3 rounded-xl border border-outline-variant/50 focus:border-secondary outline-none text-sm font-sans"
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex flex-col gap-1.5">
              <label className="font-display font-bold text-xs text-primary">Corporate Email</label>
              <input 
                type="email" 
                name="contactEmail"
                value={settings.contactEmail || ''}
                onChange={handleGlobalChange}
                className="px-4 py-3 rounded-xl border border-outline-variant/50 focus:border-secondary outline-none text-sm font-sans"
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="font-display font-bold text-xs text-primary">Phone Number</label>
              <input 
                type="text" 
                name="contactPhone"
                value={settings.contactPhone || ''}
                onChange={handleGlobalChange}
                className="px-4 py-3 rounded-xl border border-outline-variant/50 focus:border-secondary outline-none text-sm font-sans"
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="font-display font-bold text-xs text-primary">WhatsApp Number</label>
              <input 
                type="text" 
                name="whatsappNumber"
                value={settings.whatsappNumber || ''}
                onChange={handleGlobalChange}
                className="px-4 py-3 rounded-xl border border-outline-variant/50 focus:border-secondary outline-none text-sm font-sans"
              />
            </div>
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="font-display font-bold text-xs text-primary">Headquarters Address</label>
            <input 
              type="text" 
              name="address"
              value={settings.address || ''}
              onChange={handleGlobalChange}
              className="px-4 py-3 rounded-xl border border-outline-variant/50 focus:border-secondary outline-none text-sm font-sans"
            />
          </div>

          <hr className="border-outline-variant/20" />

          <div>
            <h2 className="font-display font-bold text-lg text-primary mb-6 border-b border-outline-variant/10 pb-2">Homepage Hero Section</h2>
            <div className="space-y-6">
              <div className="flex flex-col gap-1.5">
                <label className="font-display font-bold text-xs text-primary">Hero Title</label>
                <input 
                  type="text" 
                  name="heroTitle"
                  value={settings.homepage?.heroTitle || ''}
                  onChange={handleGlobalChange}
                  className="px-4 py-3 rounded-xl border border-outline-variant/50 focus:border-secondary outline-none text-sm font-sans"
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="font-display font-bold text-xs text-primary">Hero Subtitle</label>
                <textarea 
                  name="heroSubtitle"
                  value={settings.homepage?.heroSubtitle || ''}
                  onChange={handleGlobalChange}
                  rows="3"
                  className="px-4 py-3 rounded-xl border border-outline-variant/50 focus:border-secondary outline-none text-sm resize-none font-sans"
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex flex-col gap-1.5">
                  <label className="font-display font-bold text-xs text-primary">Hero Background Image URL (Optional)</label>
                  <input 
                    type="text" 
                    name="heroBgImage"
                    value={settings.homepage?.heroBgImage || ''}
                    placeholder="e.g. https://images.unsplash.com/... (falls back to 3D canvas if blank)"
                    onChange={handleGlobalChange}
                    className="px-4 py-3 rounded-xl border border-outline-variant/50 focus:border-secondary outline-none text-sm font-sans"
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="font-display font-bold text-xs text-primary">Hero Background Video URL (Optional)</label>
                  <input 
                    type="text" 
                    name="heroBgVideo"
                    value={settings.homepage?.heroBgVideo || ''}
                    placeholder="e.g. Link to MP4 file"
                    onChange={handleGlobalChange}
                    className="px-4 py-3 rounded-xl border border-outline-variant/50 focus:border-secondary outline-none text-sm font-sans"
                  />
                </div>
              </div>
            </div>
          </div>

          <hr className="border-outline-variant/20" />

          <div>
            <h2 className="font-display font-bold text-lg text-primary mb-6 border-b border-outline-variant/10 pb-2">Homepage About Section</h2>
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex flex-col gap-1.5">
                  <label className="font-display font-bold text-xs text-primary">About Title</label>
                  <input 
                    type="text" 
                    name="aboutTitle"
                    value={settings.homepage?.aboutTitle || ''}
                    onChange={handleGlobalChange}
                    className="px-4 py-3 rounded-xl border border-outline-variant/50 focus:border-secondary outline-none text-sm font-sans"
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="font-display font-bold text-xs text-primary">About Section Image URL</label>
                  <input 
                    type="text" 
                    name="aboutImage"
                    value={settings.homepage?.aboutImage || ''}
                    onChange={handleGlobalChange}
                    className="px-4 py-3 rounded-xl border border-outline-variant/50 focus:border-secondary outline-none text-sm font-sans"
                  />
                </div>
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="font-display font-bold text-xs text-primary">About Text Description</label>
                <textarea 
                  name="aboutText"
                  value={settings.homepage?.aboutText || ''}
                  onChange={handleGlobalChange}
                  rows="4"
                  className="px-4 py-3 rounded-xl border border-outline-variant/50 focus:border-secondary outline-none text-sm resize-none font-sans"
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex flex-col gap-1.5">
                  <label className="font-display font-bold text-xs text-primary">Our Mission</label>
                  <textarea 
                    name="aboutMission"
                    value={settings.homepage?.aboutMission || ''}
                    onChange={handleGlobalChange}
                    rows="2"
                    className="px-4 py-3 rounded-xl border border-outline-variant/50 focus:border-secondary outline-none text-sm resize-none font-sans"
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="font-display font-bold text-xs text-primary">Our Vision</label>
                  <textarea 
                    name="aboutVision"
                    value={settings.homepage?.aboutVision || ''}
                    onChange={handleGlobalChange}
                    rows="2"
                    className="px-4 py-3 rounded-xl border border-outline-variant/50 focus:border-secondary outline-none text-sm resize-none font-sans"
                  />
                </div>
              </div>
            </div>
          </div>

          <hr className="border-outline-variant/20" />

          <div>
            <h2 className="font-display font-bold text-lg text-primary mb-6 border-b border-outline-variant/10 pb-2">Footer & CTA Configuration</h2>
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex flex-col gap-1.5">
                  <label className="font-display font-bold text-xs text-primary">Footer Description</label>
                  <textarea 
                    name="meta_footerText"
                    value={settings.metadata?.footerText || ''}
                    onChange={handleGlobalChange}
                    rows="2"
                    className="px-4 py-3 rounded-xl border border-outline-variant/50 focus:border-secondary outline-none text-sm resize-none font-sans"
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="font-display font-bold text-xs text-primary">Footer Copyright Notice</label>
                  <input 
                    type="text"
                    name="meta_footerCopyright"
                    value={settings.metadata?.footerCopyright || ''}
                    onChange={handleGlobalChange}
                    className="px-4 py-3 rounded-xl border border-outline-variant/50 focus:border-secondary outline-none text-sm font-sans"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex flex-col gap-1.5">
                  <label className="font-display font-bold text-xs text-primary">CTA Banner Title</label>
                  <input 
                    type="text"
                    name="meta_ctaTitle"
                    value={settings.metadata?.ctaTitle || ''}
                    onChange={handleGlobalChange}
                    className="px-4 py-3 rounded-xl border border-outline-variant/50 focus:border-secondary outline-none text-sm font-sans"
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="font-display font-bold text-xs text-primary">CTA Banner Subtitle</label>
                  <input 
                    type="text"
                    name="meta_ctaSubtitle"
                    value={settings.metadata?.ctaSubtitle || ''}
                    onChange={handleGlobalChange}
                    className="px-4 py-3 rounded-xl border border-outline-variant/50 focus:border-secondary outline-none text-sm font-sans"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex flex-col gap-1.5">
                  <label className="font-display font-bold text-xs text-primary">CTA Button "Contact Us" Text</label>
                  <input 
                    type="text"
                    name="meta_ctaContactText"
                    value={settings.metadata?.ctaContactText || ''}
                    onChange={handleGlobalChange}
                    className="px-4 py-3 rounded-xl border border-outline-variant/50 focus:border-secondary outline-none text-sm font-sans"
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="font-display font-bold text-xs text-primary">CTA Button "WhatsApp Us" Text</label>
                  <input 
                    type="text"
                    name="meta_ctaWhatsappText"
                    value={settings.metadata?.ctaWhatsappText || ''}
                    onChange={handleGlobalChange}
                    className="px-4 py-3 rounded-xl border border-outline-variant/50 focus:border-secondary outline-none text-sm font-sans"
                  />
                </div>
              </div>
            </div>
          </div>

          <hr className="border-outline-variant/20" />

          <div>
            <h2 className="font-display font-bold text-lg text-primary mb-6 border-b border-outline-variant/10 pb-2">About Page & Testimonials Text</h2>
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex flex-col gap-1.5">
                  <label className="font-display font-bold text-xs text-primary">Testimonials Title</label>
                  <input 
                    type="text"
                    name="meta_testimonialTitle"
                    value={settings.metadata?.testimonialTitle || ''}
                    onChange={handleGlobalChange}
                    className="px-4 py-3 rounded-xl border border-outline-variant/50 focus:border-secondary outline-none text-sm font-sans"
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="font-display font-bold text-xs text-primary">About Page Hero Title</label>
                  <input 
                    type="text"
                    name="meta_aboutHeroTitle"
                    value={settings.metadata?.aboutHeroTitle || ''}
                    onChange={handleGlobalChange}
                    className="px-4 py-3 rounded-xl border border-outline-variant/50 focus:border-secondary outline-none text-sm font-sans"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="font-display font-bold text-xs text-primary">About Page Hero Subtitle</label>
                <textarea 
                  name="meta_aboutHeroSubtitle"
                  value={settings.metadata?.aboutHeroSubtitle || ''}
                  onChange={handleGlobalChange}
                  rows="2"
                  className="px-4 py-3 rounded-xl border border-outline-variant/50 focus:border-secondary outline-none text-sm resize-none font-sans"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="font-display font-bold text-xs text-primary">About Page Message Heading</label>
                <input 
                  type="text"
                  name="meta_aboutMessageHeading"
                  value={settings.metadata?.aboutMessageHeading || ''}
                  onChange={handleGlobalChange}
                  className="px-4 py-3 rounded-xl border border-outline-variant/50 focus:border-secondary outline-none text-sm font-sans"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex flex-col gap-1.5">
                  <label className="font-display font-bold text-xs text-primary">About Page Message Paragraph 1</label>
                  <textarea 
                    name="meta_aboutMessageText1"
                    value={settings.metadata?.aboutMessageText1 || ''}
                    onChange={handleGlobalChange}
                    rows="4"
                    className="px-4 py-3 rounded-xl border border-outline-variant/50 focus:border-secondary outline-none text-sm resize-none font-sans"
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="font-display font-bold text-xs text-primary">About Page Message Paragraph 2</label>
                  <textarea 
                    name="meta_aboutMessageText2"
                    value={settings.metadata?.aboutMessageText2 || ''}
                    onChange={handleGlobalChange}
                    rows="4"
                    className="px-4 py-3 rounded-xl border border-outline-variant/50 focus:border-secondary outline-none text-sm resize-none font-sans"
                  />
                </div>
              </div>
            </div>
          </div>

          <button type="submit" className="px-8 py-4 bg-primary text-on-primary rounded-xl font-display font-semibold hover:bg-primary-container transition-colors shadow-md">
            Save Configuration
          </button>
        </form>
      ) : (
        editingCompany && (
          <form onSubmit={handleSaveCompany} className="bg-white p-8 md:p-12 rounded-3xl border border-outline-variant/30 shadow-sm space-y-8 max-w-4xl">
            <div>
              <h2 className="font-display font-bold text-lg text-primary mb-6 border-b border-outline-variant/10 pb-2">
                {editingCompany.name} Division Content
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex flex-col gap-1.5">
                  <label className="font-display font-bold text-xs text-primary">Division Name</label>
                  <input 
                    type="text" 
                    value={editingCompany.name} 
                    disabled 
                    className="px-4 py-3 rounded-xl border border-outline-variant/30 bg-surface-container-lowest text-on-surface-variant text-sm font-sans"
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="font-display font-bold text-xs text-primary">Division Slug</label>
                  <input 
                    type="text" 
                    value={editingCompany.slug} 
                    disabled 
                    className="px-4 py-3 rounded-xl border border-outline-variant/30 bg-surface-container-lowest text-on-surface-variant text-sm font-sans"
                  />
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="font-display font-bold text-xs text-primary">Division Tagline</label>
              <input 
                type="text" 
                name="tagline"
                value={editingCompany.tagline || ''}
                onChange={handleCompanyChange}
                className="px-4 py-3 rounded-xl border border-outline-variant/50 focus:border-secondary outline-none text-sm font-sans"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="font-display font-bold text-xs text-primary">Short Description</label>
              <textarea 
                name="description"
                value={editingCompany.description || ''}
                onChange={handleCompanyChange}
                rows="3"
                className="px-4 py-3 rounded-xl border border-outline-variant/50 focus:border-secondary outline-none text-sm resize-none font-sans"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="font-display font-bold text-xs text-primary">About Text Description</label>
              <textarea 
                name="aboutText"
                value={editingCompany.aboutText || ''}
                onChange={handleCompanyChange}
                rows="4"
                className="px-4 py-3 rounded-xl border border-outline-variant/50 focus:border-secondary outline-none text-sm resize-none font-sans"
              />
            </div>

            <hr className="border-outline-variant/20" />

            <div>
              <h3 className="font-display font-bold text-primary mb-6">Division Media Assets</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex flex-col gap-1.5">
                  <label className="font-display font-bold text-xs text-primary">Hero Image (URL)</label>
                  <input 
                    type="text" 
                    name="featuredImage"
                    value={editingCompany.featuredImage || ''}
                    onChange={handleCompanyChange}
                    className="px-4 py-3 rounded-xl border border-outline-variant/50 focus:border-secondary outline-none text-sm font-sans"
                  />
                  {editingCompany.featuredImage && (
                    <div className="mt-2 w-32 aspect-video rounded-lg overflow-hidden border border-outline-variant/30">
                      <img src={editingCompany.featuredImage} alt="Preview" className="w-full h-full object-cover" />
                    </div>
                  )}
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="font-display font-bold text-xs text-primary">Hero Video (URL - Optional)</label>
                  <input 
                    type="text" 
                    name="heroVideo"
                    value={editingCompany.heroVideo || ''}
                    placeholder="e.g. Link to MP4 file"
                    onChange={handleCompanyChange}
                    className="px-4 py-3 rounded-xl border border-outline-variant/50 focus:border-secondary outline-none text-sm font-sans"
                  />
                </div>
              </div>
            </div>

            <hr className="border-outline-variant/20" />

            {/* Division specific metadata */}
            {editingCompany.division === 'ARC' && (
              <div>
                <h3 className="font-display font-bold text-primary mb-6">GEO ARC Award Banner Details</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="flex flex-col gap-1.5">
                    <label className="font-display font-bold text-xs text-primary">Award Quote Text</label>
                    <input 
                      type="text" 
                      name="meta_awardQuote"
                      value={editingCompany.metadata?.awardQuote || ''}
                      onChange={handleCompanyChange}
                      className="px-4 py-3 rounded-xl border border-outline-variant/50 focus:border-secondary outline-none text-sm font-sans"
                      placeholder='e.g. "Engineering Company of the Decade"'
                    />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="font-display font-bold text-xs text-primary">Award Quote Author</label>
                    <input 
                      type="text" 
                      name="meta_awardAuthor"
                      value={editingCompany.metadata?.awardAuthor || ''}
                      onChange={handleCompanyChange}
                      className="px-4 py-3 rounded-xl border border-outline-variant/50 focus:border-secondary outline-none text-sm font-sans"
                      placeholder="e.g. — Global Construction Review"
                    />
                  </div>
                  <div className="flex flex-col gap-1.5 md:col-span-2">
                    <label className="font-display font-bold text-xs text-primary">Awards Badge / Description Subtext</label>
                    <input 
                      type="text" 
                      name="meta_awardYears"
                      value={editingCompany.metadata?.awardYears || ''}
                      onChange={handleCompanyChange}
                      className="px-4 py-3 rounded-xl border border-outline-variant/50 focus:border-secondary outline-none text-sm font-sans"
                      placeholder="e.g. Over 45+ Global Awards"
                    />
                  </div>
                </div>
              </div>
            )}

            {editingCompany.division === 'SOIL' && (
              <div>
                <h3 className="font-display font-bold text-primary mb-6">World-Class Instrumentation (Bento Grid)</h3>
                <div className="space-y-6">
                  <div className="flex flex-col gap-1.5">
                    <label className="font-display font-bold text-xs text-primary">Instrumentation Section Title</label>
                    <input 
                      type="text" 
                      name="meta_equipmentTitle"
                      value={editingCompany.metadata?.equipmentTitle || ''}
                      onChange={handleCompanyChange}
                      className="px-4 py-3 rounded-xl border border-outline-variant/50 focus:border-secondary outline-none text-sm font-sans"
                      placeholder="e.g. World-Class Instrumentation"
                    />
                  </div>

                  <div className="border border-outline-variant/20 p-6 rounded-2xl bg-surface-container-lowest space-y-4">
                    <h4 className="font-display font-bold text-sm text-primary">Instrument 1 (Large Bento Element)</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="flex flex-col gap-1.5">
                        <label className="font-display font-bold text-[10px] text-outline">Name</label>
                        <input 
                          type="text" 
                          name="meta_equipment1Name"
                          value={editingCompany.metadata?.equipment1Name || ''}
                          onChange={handleCompanyChange}
                          className="px-4 py-2 rounded-lg border border-outline-variant/50 focus:border-secondary outline-none text-xs font-sans"
                        />
                      </div>
                      <div className="flex flex-col gap-1.5">
                        <label className="font-display font-bold text-[10px] text-outline">Image URL</label>
                        <input 
                          type="text" 
                          name="meta_equipment1Image"
                          value={editingCompany.metadata?.equipment1Image || ''}
                          onChange={handleCompanyChange}
                          className="px-4 py-2 rounded-lg border border-outline-variant/50 focus:border-secondary outline-none text-xs font-sans"
                        />
                      </div>
                      <div className="flex flex-col gap-1.5 md:col-span-2">
                        <label className="font-display font-bold text-[10px] text-outline">Description</label>
                        <textarea 
                          name="meta_equipment1Desc"
                          value={editingCompany.metadata?.equipment1Desc || ''}
                          onChange={handleCompanyChange}
                          rows="2"
                          className="px-4 py-2 rounded-lg border border-outline-variant/50 focus:border-secondary outline-none text-xs resize-none font-sans"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="border border-outline-variant/20 p-6 rounded-2xl bg-surface-container-lowest space-y-4">
                    <h4 className="font-display font-bold text-sm text-primary">Instrument 2 (Small Bento Element)</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="flex flex-col gap-1.5">
                        <label className="font-display font-bold text-[10px] text-outline">Name</label>
                        <input 
                          type="text" 
                          name="meta_equipment2Name"
                          value={editingCompany.metadata?.equipment2Name || ''}
                          onChange={handleCompanyChange}
                          className="px-4 py-2 rounded-lg border border-outline-variant/50 focus:border-secondary outline-none text-xs font-sans"
                        />
                      </div>
                      <div className="flex flex-col gap-1.5">
                        <label className="font-display font-bold text-[10px] text-outline">Image URL</label>
                        <input 
                          type="text" 
                          name="meta_equipment2Image"
                          value={editingCompany.metadata?.equipment2Image || ''}
                          onChange={handleCompanyChange}
                          className="px-4 py-2 rounded-lg border border-outline-variant/50 focus:border-secondary outline-none text-xs font-sans"
                        />
                      </div>
                      <div className="flex flex-col gap-1.5 md:col-span-2">
                        <label className="font-display font-bold text-[10px] text-outline">Description (Optional)</label>
                        <textarea 
                          name="meta_equipment2Desc"
                          value={editingCompany.metadata?.equipment2Desc || ''}
                          onChange={handleCompanyChange}
                          rows="2"
                          className="px-4 py-2 rounded-lg border border-outline-variant/50 focus:border-secondary outline-none text-xs resize-none font-sans"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {editingCompany.division === 'CONSTRUCTION' && (
              <div className="space-y-8">
                <div>
                  <h3 className="font-display font-bold text-primary mb-6">Active Operations Progress & Metrics</h3>
                  <div className="space-y-6">
                    <div className="border border-outline-variant/20 p-6 rounded-2xl bg-surface-container-lowest space-y-4">
                      <h4 className="font-display font-bold text-sm text-primary">Operation 1 Progress</h4>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="flex flex-col gap-1.5">
                          <label className="font-display font-bold text-[10px] text-outline">Operation Name</label>
                          <input 
                            type="text" 
                            name="meta_op1Name"
                            value={editingCompany.metadata?.op1Name || ''}
                            onChange={handleCompanyChange}
                            className="px-4 py-2 rounded-lg border border-outline-variant/50 focus:border-secondary outline-none text-xs font-sans"
                          />
                        </div>
                        <div className="flex flex-col gap-1.5">
                          <label className="font-display font-bold text-[10px] text-outline">Subtitle</label>
                          <input 
                            type="text" 
                            name="meta_op1Subtitle"
                            value={editingCompany.metadata?.op1Subtitle || ''}
                            onChange={handleCompanyChange}
                            className="px-4 py-2 rounded-lg border border-outline-variant/50 focus:border-secondary outline-none text-xs font-sans"
                          />
                        </div>
                        <div className="flex flex-col gap-1.5">
                          <label className="font-display font-bold text-[10px] text-outline">Progress Percentage (%)</label>
                          <input 
                            type="number" 
                            name="meta_op1Progress"
                            value={editingCompany.metadata?.op1Progress !== undefined ? editingCompany.metadata.op1Progress : ''}
                            onChange={handleCompanyChange}
                            className="px-4 py-2 rounded-lg border border-outline-variant/50 focus:border-secondary outline-none text-xs font-sans"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2 border-t border-outline-variant/10">
                        <div className="flex flex-col gap-1.5">
                          <label className="font-display font-bold text-[10px] text-outline">Stat 1 Label (e.g. Cranes)</label>
                          <input 
                            type="text" 
                            name="meta_op1Stat1Label"
                            value={editingCompany.metadata?.op1Stat1Label || ''}
                            onChange={handleCompanyChange}
                            className="px-4 py-2 rounded-lg border border-outline-variant/50 focus:border-secondary outline-none text-xs font-sans"
                          />
                        </div>
                        <div className="flex flex-col gap-1.5">
                          <label className="font-display font-bold text-[10px] text-outline">Stat 1 Value (e.g. 12)</label>
                          <input 
                            type="text" 
                            name="meta_op1Stat1Val"
                            value={editingCompany.metadata?.op1Stat1Val || ''}
                            onChange={handleCompanyChange}
                            className="px-4 py-2 rounded-lg border border-outline-variant/50 focus:border-secondary outline-none text-xs font-sans"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="flex flex-col gap-1.5">
                          <label className="font-display font-bold text-[10px] text-outline">Stat 2 Label (e.g. Personnel)</label>
                          <input 
                            type="text" 
                            name="meta_op1Stat2Label"
                            value={editingCompany.metadata?.op1Stat2Label || ''}
                            onChange={handleCompanyChange}
                            className="px-4 py-2 rounded-lg border border-outline-variant/50 focus:border-secondary outline-none text-xs font-sans"
                          />
                        </div>
                        <div className="flex flex-col gap-1.5">
                          <label className="font-display font-bold text-[10px] text-outline">Stat 2 Value (e.g. 1.4k)</label>
                          <input 
                            type="text" 
                            name="meta_op1Stat2Val"
                            value={editingCompany.metadata?.op1Stat2Val || ''}
                            onChange={handleCompanyChange}
                            className="px-4 py-2 rounded-lg border border-outline-variant/50 focus:border-secondary outline-none text-xs font-sans"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="flex flex-col gap-1.5">
                          <label className="font-display font-bold text-[10px] text-outline">Stat 3 Label (e.g. Est. Completion)</label>
                          <input 
                            type="text" 
                            name="meta_op1Stat3Label"
                            value={editingCompany.metadata?.op1Stat3Label || ''}
                            onChange={handleCompanyChange}
                            className="px-4 py-2 rounded-lg border border-outline-variant/50 focus:border-secondary outline-none text-xs font-sans"
                          />
                        </div>
                        <div className="flex flex-col gap-1.5">
                          <label className="font-display font-bold text-[10px] text-outline">Stat 3 Value (e.g. Q3 2025)</label>
                          <input 
                            type="text" 
                            name="meta_op1Stat3Val"
                            value={editingCompany.metadata?.op1Stat3Val || ''}
                            onChange={handleCompanyChange}
                            className="px-4 py-2 rounded-lg border border-outline-variant/50 focus:border-secondary outline-none text-xs font-sans"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="border border-outline-variant/20 p-6 rounded-2xl bg-surface-container-lowest space-y-4">
                      <h4 className="font-display font-bold text-sm text-primary">Operation 2 Progress</h4>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="flex flex-col gap-1.5">
                          <label className="font-display font-bold text-[10px] text-outline">Operation Name</label>
                          <input 
                            type="text" 
                            name="meta_op2Name"
                            value={editingCompany.metadata?.op2Name || ''}
                            onChange={handleCompanyChange}
                            className="px-4 py-2 rounded-lg border border-outline-variant/50 focus:border-secondary outline-none text-xs font-sans"
                          />
                        </div>
                        <div className="flex flex-col gap-1.5">
                          <label className="font-display font-bold text-[10px] text-outline">Subtitle</label>
                          <input 
                            type="text" 
                            name="meta_op2Subtitle"
                            value={editingCompany.metadata?.op2Subtitle || ''}
                            onChange={handleCompanyChange}
                            className="px-4 py-2 rounded-lg border border-outline-variant/50 focus:border-secondary outline-none text-xs font-sans"
                          />
                        </div>
                        <div className="flex flex-col gap-1.5">
                          <label className="font-display font-bold text-[10px] text-outline">Progress Percentage (%)</label>
                          <input 
                            type="number" 
                            name="meta_op2Progress"
                            value={editingCompany.metadata?.op2Progress !== undefined ? editingCompany.metadata.op2Progress : ''}
                            onChange={handleCompanyChange}
                            className="px-4 py-2 rounded-lg border border-outline-variant/50 focus:border-secondary outline-none text-xs font-sans"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2 border-t border-outline-variant/10">
                        <div className="flex flex-col gap-1.5">
                          <label className="font-display font-bold text-[10px] text-outline">Stat 1 Label (e.g. Dredgers)</label>
                          <input 
                            type="text" 
                            name="meta_op2Stat1Label"
                            value={editingCompany.metadata?.op2Stat1Label || ''}
                            onChange={handleCompanyChange}
                            className="px-4 py-2 rounded-lg border border-outline-variant/50 focus:border-secondary outline-none text-xs font-sans"
                          />
                        </div>
                        <div className="flex flex-col gap-1.5">
                          <label className="font-display font-bold text-[10px] text-outline">Stat 1 Value (e.g. 04)</label>
                          <input 
                            type="text" 
                            name="meta_op2Stat1Val"
                            value={editingCompany.metadata?.op2Stat1Val || ''}
                            onChange={handleCompanyChange}
                            className="px-4 py-2 rounded-lg border border-outline-variant/50 focus:border-secondary outline-none text-xs font-sans"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="flex flex-col gap-1.5">
                          <label className="font-display font-bold text-[10px] text-outline">Stat 2 Label (e.g. Concrete)</label>
                          <input 
                            type="text" 
                            name="meta_op2Stat2Label"
                            value={editingCompany.metadata?.op2Stat2Label || ''}
                            onChange={handleCompanyChange}
                            className="px-4 py-2 rounded-lg border border-outline-variant/50 focus:border-secondary outline-none text-xs font-sans"
                          />
                        </div>
                        <div className="flex flex-col gap-1.5">
                          <label className="font-display font-bold text-[10px] text-outline">Stat 2 Value (e.g. 850k)</label>
                          <input 
                            type="text" 
                            name="meta_op2Stat2Val"
                            value={editingCompany.metadata?.op2Stat2Val || ''}
                            onChange={handleCompanyChange}
                            className="px-4 py-2 rounded-lg border border-outline-variant/50 focus:border-secondary outline-none text-xs font-sans"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="flex flex-col gap-1.5">
                          <label className="font-display font-bold text-[10px] text-outline">Stat 3 Label (e.g. Est. Completion)</label>
                          <input 
                            type="text" 
                            name="meta_op2Stat3Label"
                            value={editingCompany.metadata?.op2Stat3Label || ''}
                            onChange={handleCompanyChange}
                            className="px-4 py-2 rounded-lg border border-outline-variant/50 focus:border-secondary outline-none text-xs font-sans"
                          />
                        </div>
                        <div className="flex flex-col gap-1.5">
                          <label className="font-display font-bold text-[10px] text-outline">Stat 3 Value (e.g. Q2 2026)</label>
                          <input 
                            type="text" 
                            name="meta_op2Stat3Val"
                            value={editingCompany.metadata?.op2Stat3Val || ''}
                            onChange={handleCompanyChange}
                            className="px-4 py-2 rounded-lg border border-outline-variant/50 focus:border-secondary outline-none text-xs font-sans"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <hr className="border-outline-variant/20" />

                <div>
                  <h3 className="font-display font-bold text-primary mb-6">Pre-Construction Timeline Phases</h3>
                  <div className="space-y-6">
                    <div className="border border-outline-variant/20 p-6 rounded-2xl bg-surface-container-lowest space-y-4">
                      <h4 className="font-display font-bold text-sm text-primary">Phase 1</h4>
                      <div className="flex flex-col gap-1.5">
                        <label className="font-display font-bold text-[10px] text-outline">Title</label>
                        <input 
                          type="text" 
                          name="meta_phase1Title"
                          value={editingCompany.metadata?.phase1Title || ''}
                          onChange={handleCompanyChange}
                          className="px-4 py-2 rounded-lg border border-outline-variant/50 focus:border-secondary outline-none text-xs font-sans"
                        />
                      </div>
                      <div className="flex flex-col gap-1.5">
                        <label className="font-display font-bold text-[10px] text-outline">Description</label>
                        <textarea 
                          name="meta_phase1Desc"
                          value={editingCompany.metadata?.phase1Desc || ''}
                          onChange={handleCompanyChange}
                          rows="2"
                          className="px-4 py-2 rounded-lg border border-outline-variant/50 focus:border-secondary outline-none text-xs resize-none font-sans"
                        />
                      </div>
                    </div>

                    <div className="border border-outline-variant/20 p-6 rounded-2xl bg-surface-container-lowest space-y-4">
                      <h4 className="font-display font-bold text-sm text-primary">Phase 2</h4>
                      <div className="flex flex-col gap-1.5">
                        <label className="font-display font-bold text-[10px] text-outline">Title</label>
                        <input 
                          type="text" 
                          name="meta_phase2Title"
                          value={editingCompany.metadata?.phase2Title || ''}
                          onChange={handleCompanyChange}
                          className="px-4 py-2 rounded-lg border border-outline-variant/50 focus:border-secondary outline-none text-xs font-sans"
                        />
                      </div>
                      <div className="flex flex-col gap-1.5">
                        <label className="font-display font-bold text-[10px] text-outline">Description</label>
                        <textarea 
                          name="meta_phase2Desc"
                          value={editingCompany.metadata?.phase2Desc || ''}
                          onChange={handleCompanyChange}
                          rows="2"
                          className="px-4 py-2 rounded-lg border border-outline-variant/50 focus:border-secondary outline-none text-xs resize-none font-sans"
                        />
                      </div>
                    </div>

                    <div className="border border-outline-variant/20 p-6 rounded-2xl bg-surface-container-lowest space-y-4">
                      <h4 className="font-display font-bold text-sm text-primary">Phase 3</h4>
                      <div className="flex flex-col gap-1.5">
                        <label className="font-display font-bold text-[10px] text-outline">Title</label>
                        <input 
                          type="text" 
                          name="meta_phase3Title"
                          value={editingCompany.metadata?.phase3Title || ''}
                          onChange={handleCompanyChange}
                          className="px-4 py-2 rounded-lg border border-outline-variant/50 focus:border-secondary outline-none text-xs font-sans"
                        />
                      </div>
                      <div className="flex flex-col gap-1.5">
                        <label className="font-display font-bold text-[10px] text-outline">Description</label>
                        <textarea 
                          name="meta_phase3Desc"
                          value={editingCompany.metadata?.phase3Desc || ''}
                          onChange={handleCompanyChange}
                          rows="2"
                          className="px-4 py-2 rounded-lg border border-outline-variant/50 focus:border-secondary outline-none text-xs resize-none font-sans"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            <button type="submit" className="px-8 py-4 bg-primary text-on-primary rounded-xl font-display font-semibold hover:bg-primary-container transition-colors shadow-md">
              Save Division Details
            </button>
          </form>
        )
      )}
    </div>
  );
};

export default CompanyManagement;

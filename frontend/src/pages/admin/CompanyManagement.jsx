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
    if (
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
    setEditingCompany({
      ...editingCompany,
      [name]: value
    });
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

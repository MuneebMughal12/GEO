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
      aboutTitle: '',
      aboutText: ''
    }
  });
  const [companies, setCompanies] = useState([]);
  const [activeTab, setActiveTab] = useState('global');
  const [status, setStatus] = useState('');

  useEffect(() => {
    fetchSettingsAndCompanies();
  }, []);

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
    if (name.startsWith('hero') || name.startsWith('about')) {
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

  const handleSaveGlobal = async (e) => {
    e.preventDefault();
    setStatus('Saving...');
    try {
      const res = await API.put('/companies/settings', settings);
      if (res.data.success) {
        setStatus('Global settings saved successfully.');
      }
    } catch (err) {
      setStatus('Failed to save settings.');
    }
  };

  return (
    <div className="space-y-10">
      <header>
        <h1 className="font-display text-3xl font-bold text-primary mb-2">Company Management</h1>
        <p className="text-outline-variant font-sans text-sm">Update landing page taglines, vision statements, and global contacts.</p>
      </header>

      {/* Tab select bar */}
      <div className="flex gap-4 border-b border-outline-variant/20 pb-4">
        <button 
          onClick={() => setActiveTab('global')}
          className={`px-6 py-2.5 rounded-full font-display font-semibold text-xs transition-all ${
            activeTab === 'global' ? 'bg-primary text-on-primary shadow-sm' : 'text-on-surface-variant hover:bg-surface-container-high'
          }`}
        >
          Global & Homepage Settings
        </button>
      </div>

      {status && (
        <div className="p-4 bg-blue-50 text-blue-700 text-xs font-semibold rounded-xl max-w-xl">
          {status}
        </div>
      )}

      {activeTab === 'global' && (
        <form onSubmit={handleSaveGlobal} className="bg-white p-8 md:p-12 rounded-3xl border border-outline-variant/30 shadow-sm space-y-8 max-w-4xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex flex-col gap-1.5">
              <label className="font-display font-bold text-xs text-primary">Site Name</label>
              <input 
                type="text" 
                name="siteName"
                value={settings.siteName}
                onChange={handleGlobalChange}
                className="px-4 py-3 rounded-xl border border-outline-variant/50 focus:border-secondary outline-none text-sm"
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="font-display font-bold text-xs text-primary">Tagline</label>
              <input 
                type="text" 
                name="tagline"
                value={settings.tagline}
                onChange={handleGlobalChange}
                className="px-4 py-3 rounded-xl border border-outline-variant/50 focus:border-secondary outline-none text-sm"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex flex-col gap-1.5">
              <label className="font-display font-bold text-xs text-primary">Corporate Email</label>
              <input 
                type="email" 
                name="contactEmail"
                value={settings.contactEmail}
                onChange={handleGlobalChange}
                className="px-4 py-3 rounded-xl border border-outline-variant/50 focus:border-secondary outline-none text-sm"
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="font-display font-bold text-xs text-primary">Phone Number</label>
              <input 
                type="text" 
                name="contactPhone"
                value={settings.contactPhone}
                onChange={handleGlobalChange}
                className="px-4 py-3 rounded-xl border border-outline-variant/50 focus:border-secondary outline-none text-sm"
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="font-display font-bold text-xs text-primary">WhatsApp number</label>
              <input 
                type="text" 
                name="whatsappNumber"
                value={settings.whatsappNumber}
                onChange={handleGlobalChange}
                className="px-4 py-3 rounded-xl border border-outline-variant/50 focus:border-secondary outline-none text-sm"
              />
            </div>
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="font-display font-bold text-xs text-primary">Headquarters Address</label>
            <input 
              type="text" 
              name="address"
              value={settings.address}
              onChange={handleGlobalChange}
              className="px-4 py-3 rounded-xl border border-outline-variant/50 focus:border-secondary outline-none text-sm"
            />
          </div>

          <hr className="border-outline-variant/20" />

          <div>
            <h3 className="font-display font-bold text-primary mb-6">Homepage Hero Section</h3>
            <div className="space-y-6">
              <div className="flex flex-col gap-1.5">
                <label className="font-display font-bold text-xs text-primary">Hero Title</label>
                <input 
                  type="text" 
                  name="heroTitle"
                  value={settings.homepage?.heroTitle || ''}
                  onChange={handleGlobalChange}
                  className="px-4 py-3 rounded-xl border border-outline-variant/50 focus:border-secondary outline-none text-sm"
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="font-display font-bold text-xs text-primary">Hero Subtitle</label>
                <textarea 
                  name="heroSubtitle"
                  value={settings.homepage?.heroSubtitle || ''}
                  onChange={handleGlobalChange}
                  rows="3"
                  className="px-4 py-3 rounded-xl border border-outline-variant/50 focus:border-secondary outline-none text-sm resize-none"
                />
              </div>
            </div>
          </div>

          <button type="submit" className="px-8 py-4 bg-primary text-on-primary rounded-xl font-display font-semibold hover:bg-primary-container transition-colors shadow-md">
            Save Configuration
          </button>
        </form>
      )}
    </div>
  );
};

export default CompanyManagement;

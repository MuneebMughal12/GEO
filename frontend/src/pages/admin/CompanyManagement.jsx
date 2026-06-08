import React, { useState, useEffect } from 'react';
import API from '../../services/api';
import { getMediaUrl } from '../../services/media';

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
      aboutVideo: '',
      aboutMission: '',
      aboutVision: '',
      partners: []
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
      aboutMessageText2: '',
      aboutCommit1Title: '',
      aboutCommit1Desc: '',
      aboutCommit1Icon: '',
      aboutCommit2Title: '',
      aboutCommit2Desc: '',
      aboutCommit2Icon: '',
      aboutCommit3Title: '',
      aboutCommit3Desc: '',
      aboutCommit3Icon: '',
      aboutJourney1Year: '',
      aboutJourney1Desc: '',
      aboutJourney2Year: '',
      aboutJourney2Desc: '',
      aboutJourney3Year: '',
      aboutJourney3Desc: ''
    }
  });
  const [companies, setCompanies] = useState([]);
  const [activeTab, setActiveTab] = useState('global');
  const [editingCompany, setEditingCompany] = useState(null);
  const [status, setStatus] = useState('');
  const [newPartnerName, setNewPartnerName] = useState('');
  const [uploadingOpIndex, setUploadingOpIndex] = useState(null);
  const [uploadingField, setUploadingField] = useState(null);

  const handleUploadFile = async (e, fieldName, isCompanyMetadata = false, isEditingCompany = false) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploadingField(fieldName);
    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('title', `${fieldName}-${Date.now()}`);
      formData.append('division', isEditingCompany ? (editingCompany?.slug === 'geo-construction' ? 'CONSTRUCTION' : editingCompany?.slug === 'geo-soil-testing' ? 'SOIL' : 'ARC') : 'GLOBAL');
      const isVideo = file.type.startsWith('video/') || file.name.toLowerCase().endsWith('.mp4');
      formData.append('type', isVideo ? 'video' : 'image');

      const res = await API.post('/gallery', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });

      if (res.data.success && res.data.data.url) {
        if (isEditingCompany) {
          if (isCompanyMetadata) {
            setEditingCompany({
              ...editingCompany,
              metadata: {
                ...(editingCompany.metadata || {}),
                [fieldName]: res.data.data.url
              }
            });
          } else {
            setEditingCompany({
              ...editingCompany,
              [fieldName]: res.data.data.url
            });
          }
        } else {
          if (isCompanyMetadata) {
            setSettings({
              ...settings,
              metadata: {
                ...(settings.metadata || {}),
                [fieldName]: res.data.data.url
              }
            });
          } else {
            setSettings({
              ...settings,
              homepage: {
                ...(settings.homepage || {}),
                [fieldName]: res.data.data.url
              }
            });
          }
        }
      }
    } catch (err) {
      console.error('File upload failed:', err);
      alert('Failed to upload file. Please try again.');
    } finally {
      setUploadingField(null);
    }
  };

  const renderMediaUploadField = ({
    label,
    value,
    fieldName,
    placeholder,
    accept = "image/*,video/mp4",
    isCompanyMetadata = false,
    isEditingCompany = false,
    onChange
  }) => {
    const isUploading = uploadingField === fieldName;
    const mediaUrl = getMediaUrl(value);
    const isVideo = value && (value.endsWith('.mp4') || value.includes('video') || (value.includes('/uploads/') && !value.match(/\.(jpeg|jpg|png|webp|gif|pdf)$/i)));
    const isPdf = value && (value.endsWith('.pdf') || value.includes('pdf'));

    return (
      <div className="flex flex-col gap-1.5 w-full">
        <label className="font-display font-bold text-xs text-primary">{label}</label>
        <div className="flex gap-4 items-start">
          {value && (
            <div className="w-20 h-20 rounded-xl overflow-hidden border border-outline-variant/30 bg-surface-container shrink-0 flex items-center justify-center">
              {isPdf ? (
                <div className="text-red-600 flex flex-col items-center justify-center h-full w-full bg-red-50/50">
                  <span className="material-symbols-outlined text-3xl">picture_as_pdf</span>
                  <span className="text-[8px] font-bold uppercase mt-1 font-display">PDF File</span>
                </div>
              ) : isVideo ? (
                <video src={mediaUrl} className="w-full h-full object-cover" muted playsInline />
              ) : (
                <img src={mediaUrl} alt="Preview" className="w-full h-full object-cover" />
              )}
            </div>
          )}
          <div className="flex-1 flex flex-col gap-2">
            <div className="flex gap-2">
              <label className="cursor-pointer bg-primary/10 text-primary hover:bg-primary/20 px-4 py-2.5 rounded-xl text-xs font-semibold font-display flex items-center gap-1.5 transition-colors">
                <span className="material-symbols-outlined text-[16px]">
                  {isUploading ? 'sync' : 'upload_file'}
                </span>
                {isUploading ? 'Uploading...' : 'Upload from PC'}
                <input 
                  type="file" 
                  accept={accept}
                  onChange={(e) => handleUploadFile(e, fieldName, isCompanyMetadata, isEditingCompany)} 
                  className="hidden" 
                  disabled={uploadingField !== null}
                />
              </label>
              {value && (
                <button
                  type="button"
                  onClick={() => {
                    if (isEditingCompany) {
                      if (isCompanyMetadata) {
                        setEditingCompany({
                          ...editingCompany,
                          metadata: { ...(editingCompany.metadata || {}), [fieldName]: '' }
                        });
                      } else {
                        setEditingCompany({ ...editingCompany, [fieldName]: '' });
                      }
                    } else {
                      if (isCompanyMetadata) {
                        setSettings({
                          ...settings,
                          metadata: { ...(settings.metadata || {}), [fieldName]: '' }
                        });
                      } else {
                        setSettings({
                          ...settings,
                          homepage: { ...(settings.homepage || {}), [fieldName]: '' }
                        });
                      }
                    }
                  }}
                  className="bg-error/10 text-error hover:bg-error/20 px-3 py-2 rounded-xl text-xs font-semibold font-display flex items-center gap-1 transition-colors"
                >
                  Clear
                </button>
              )}
            </div>
            <input 
              type="text" 
              name={isCompanyMetadata ? `meta_${fieldName}` : fieldName}
              value={value || ''}
              onChange={onChange}
              placeholder={placeholder || "Or paste a link here..."}
              className="px-4 py-3 rounded-xl border border-outline-variant/50 focus:border-secondary focus:ring-1 focus:ring-secondary/20 outline-none text-sm font-sans w-full"
            />
          </div>
        </div>
      </div>
    );
  };

  const handleUploadOpImage = async (e, idx) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploadingOpIndex(idx);
    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('title', `operation-${idx + 1}-${Date.now()}`);
      formData.append('division', 'CONSTRUCTION');
      formData.append('type', 'image');

      const res = await API.post('/gallery', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });

      if (res.data.success && res.data.data.url) {
        const ops = [...(editingCompany.metadata?.activeOperations || [])];
        ops[idx] = { ...ops[idx], image: res.data.data.url };
        setEditingCompany({
          ...editingCompany,
          metadata: {
            ...editingCompany.metadata,
            activeOperations: ops
          }
        });
      }
    } catch (err) {
      console.error('Operation image upload failed:', err);
      alert('Failed to upload image. Please try again.');
    } finally {
      setUploadingOpIndex(null);
    }
  };

  const handleAddPartner = () => {
    if (!newPartnerName.trim()) return;
    const currentPartners = settings.homepage?.partners || [];
    setSettings({
      ...settings,
      homepage: {
        ...settings.homepage,
        partners: [...currentPartners, { name: newPartnerName.trim() }]
      }
    });
    setNewPartnerName('');
  };

  const handleRemovePartner = (indexToRemove) => {
    const currentPartners = settings.homepage?.partners || [];
    setSettings({
      ...settings,
      homepage: {
        ...settings.homepage,
        partners: currentPartners.filter((_, idx) => idx !== indexToRemove)
      }
    });
  };

  useEffect(() => {
    fetchSettingsAndCompanies();
  }, []);

  useEffect(() => {
    if (activeTab !== 'global') {
      const comp = companies.find(c => c.slug === activeTab);
      if (comp) {
        const parsedCompany = { ...comp };
        if (comp.slug === 'geo-construction' && (!parsedCompany.metadata || !parsedCompany.metadata.activeOperations)) {
          parsedCompany.metadata = {
            ...(parsedCompany.metadata || {}),
            activeOperations: [
              {
                name: comp.metadata?.op1Name || 'North Rail Link',
                subtitle: comp.metadata?.op1Subtitle || 'Industrial Hub Connector',
                progress: comp.metadata?.op1Progress !== undefined ? comp.metadata.op1Progress : 72,
                stat1Label: comp.metadata?.op1Stat1Label || 'Cranes',
                stat1Val: comp.metadata?.op1Stat1Val || '12',
                stat2Label: comp.metadata?.op1Stat2Label || 'Personnel',
                stat2Val: comp.metadata?.op1Stat2Val || '1.4k',
                stat3Label: comp.metadata?.op1Stat3Label || 'Est. Completion',
                stat3Val: comp.metadata?.op1Stat3Val || 'Q3 2025',
                image: comp.metadata?.op1Image || '',
                link: comp.metadata?.op1Link || ''
              },
              {
                name: comp.metadata?.op2Name || 'Maritime Port Expansion',
                subtitle: comp.metadata?.op2Subtitle || 'Strategic Deep-water Berth',
                progress: comp.metadata?.op2Progress !== undefined ? comp.metadata.op2Progress : 45,
                stat1Label: comp.metadata?.op2Stat1Label || 'Dredgers',
                stat1Val: comp.metadata?.op2Stat1Val || '04',
                stat2Label: comp.metadata?.op2Stat2Label || 'Concrete (m³)',
                stat2Val: comp.metadata?.op2Stat2Val || '850k',
                stat3Label: comp.metadata?.op2Stat3Label || 'Est. Completion',
                stat3Val: comp.metadata?.op2Stat3Val || 'Q2 2026',
                image: comp.metadata?.op2Image || '',
                link: comp.metadata?.op2Link || ''
              }
            ]
          };
        }
        setEditingCompany(parsedCompany);
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
                placeholder="e.g. +971 50 000 0000"
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
                {renderMediaUploadField({
                  label: "Hero Background Image (Optional)",
                  value: settings.homepage?.heroBgImage,
                  fieldName: "heroBgImage",
                  placeholder: "e.g. Image URL (falls back to 3D canvas if blank)",
                  onChange: handleGlobalChange
                })}
                {renderMediaUploadField({
                  label: "Hero Background Video (Optional)",
                  value: settings.homepage?.heroBgVideo,
                  fieldName: "heroBgVideo",
                  placeholder: "e.g. Link to MP4 file",
                  onChange: handleGlobalChange
                })}
              </div>
            </div>
          </div>

          <hr className="border-outline-variant/20" />

          <div>
            <h2 className="font-display font-bold text-lg text-primary mb-6 border-b border-outline-variant/10 pb-2">Homepage About Section</h2>
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
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
                {renderMediaUploadField({
                  label: "About Section Image",
                  value: settings.homepage?.aboutImage,
                  fieldName: "aboutImage",
                  onChange: handleGlobalChange
                })}
                {renderMediaUploadField({
                  label: "About Section Video (Optional)",
                  value: settings.homepage?.aboutVideo,
                  fieldName: "aboutVideo",
                  placeholder: "e.g. Link to MP4 file (takes priority over image)",
                  onChange: handleGlobalChange
                })}
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
            <h2 className="font-display font-bold text-lg text-primary mb-6 border-b border-outline-variant/10 pb-2">About Page leadership message</h2>
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

          <hr className="border-outline-variant/20" />

          <div>
            <h2 className="font-display font-bold text-lg text-primary mb-6 border-b border-outline-variant/10 pb-2">About Page Commitments Details</h2>
            <div className="space-y-6">
              <div className="border border-outline-variant/20 p-6 rounded-2xl bg-surface-container-lowest space-y-4">
                <h4 className="font-display font-bold text-sm text-primary">Commitment 1</h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="flex flex-col gap-1.5">
                    <label className="font-display font-bold text-xs text-primary">Title</label>
                    <input 
                      type="text" 
                      name="meta_aboutCommit1Title"
                      value={settings.metadata?.aboutCommit1Title || ''}
                      onChange={handleGlobalChange}
                      className="px-4 py-2 rounded-lg border border-outline-variant/50 focus:border-secondary outline-none text-xs font-sans"
                    />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="font-display font-bold text-xs text-primary">Icon (Material Icon Name)</label>
                    <input 
                      type="text" 
                      name="meta_aboutCommit1Icon"
                      value={settings.metadata?.aboutCommit1Icon || ''}
                      onChange={handleGlobalChange}
                      className="px-4 py-2 rounded-lg border border-outline-variant/50 focus:border-secondary outline-none text-xs font-sans"
                      placeholder="e.g. verified_user"
                    />
                  </div>
                  <div className="flex flex-col gap-1.5 md:col-span-3">
                    <label className="font-display font-bold text-xs text-primary">Description</label>
                    <textarea 
                      name="meta_aboutCommit1Desc"
                      value={settings.metadata?.aboutCommit1Desc || ''}
                      onChange={handleGlobalChange}
                      rows="2"
                      className="px-4 py-2 rounded-lg border border-outline-variant/50 focus:border-secondary outline-none text-xs resize-none font-sans"
                    />
                  </div>
                </div>
              </div>

              <div className="border border-outline-variant/20 p-6 rounded-2xl bg-surface-container-lowest space-y-4">
                <h4 className="font-display font-bold text-sm text-primary">Commitment 2</h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="flex flex-col gap-1.5">
                    <label className="font-display font-bold text-xs text-primary">Title</label>
                    <input 
                      type="text" 
                      name="meta_aboutCommit2Title"
                      value={settings.metadata?.aboutCommit2Title || ''}
                      onChange={handleGlobalChange}
                      className="px-4 py-2 rounded-lg border border-outline-variant/50 focus:border-secondary outline-none text-xs font-sans"
                    />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="font-display font-bold text-xs text-primary">Icon (Material Icon Name)</label>
                    <input 
                      type="text" 
                      name="meta_aboutCommit2Icon"
                      value={settings.metadata?.aboutCommit2Icon || ''}
                      onChange={handleGlobalChange}
                      className="px-4 py-2 rounded-lg border border-outline-variant/50 focus:border-secondary outline-none text-xs font-sans"
                      placeholder="e.g. eco"
                    />
                  </div>
                  <div className="flex flex-col gap-1.5 md:col-span-3">
                    <label className="font-display font-bold text-xs text-primary">Description</label>
                    <textarea 
                      name="meta_aboutCommit2Desc"
                      value={settings.metadata?.aboutCommit2Desc || ''}
                      onChange={handleGlobalChange}
                      rows="2"
                      className="px-4 py-2 rounded-lg border border-outline-variant/50 focus:border-secondary outline-none text-xs resize-none font-sans"
                    />
                  </div>
                </div>
              </div>

              <div className="border border-outline-variant/20 p-6 rounded-2xl bg-surface-container-lowest space-y-4">
                <h4 className="font-display font-bold text-sm text-primary">Commitment 3</h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="flex flex-col gap-1.5">
                    <label className="font-display font-bold text-xs text-primary">Title</label>
                    <input 
                      type="text" 
                      name="meta_aboutCommit3Title"
                      value={settings.metadata?.aboutCommit3Title || ''}
                      onChange={handleGlobalChange}
                      className="px-4 py-2 rounded-lg border border-outline-variant/50 focus:border-secondary outline-none text-xs font-sans"
                    />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="font-display font-bold text-xs text-primary">Icon (Material Icon Name)</label>
                    <input 
                      type="text" 
                      name="meta_aboutCommit3Icon"
                      value={settings.metadata?.aboutCommit3Icon || ''}
                      onChange={handleGlobalChange}
                      className="px-4 py-2 rounded-lg border border-outline-variant/50 focus:border-secondary outline-none text-xs font-sans"
                      placeholder="e.g. monitoring"
                    />
                  </div>
                  <div className="flex flex-col gap-1.5 md:col-span-3">
                    <label className="font-display font-bold text-xs text-primary">Description</label>
                    <textarea 
                      name="meta_aboutCommit3Desc"
                      value={settings.metadata?.aboutCommit3Desc || ''}
                      onChange={handleGlobalChange}
                      rows="2"
                      className="px-4 py-2 rounded-lg border border-outline-variant/50 focus:border-secondary outline-none text-xs resize-none font-sans"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <hr className="border-outline-variant/20" />

          <div>
            <h2 className="font-display font-bold text-lg text-primary mb-6 border-b border-outline-variant/10 pb-2">About Page Corporate Journey Timeline</h2>
            <div className="space-y-6">
              <div className="border border-outline-variant/20 p-6 rounded-2xl bg-surface-container-lowest space-y-4">
                <h4 className="font-display font-bold text-sm text-primary">Journey Milestone 1</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1.5">
                    <label className="font-display font-bold text-xs text-primary">Year / Header Label</label>
                    <input 
                      type="text" 
                      name="meta_aboutJourney1Year"
                      value={settings.metadata?.aboutJourney1Year || ''}
                      onChange={handleGlobalChange}
                      className="px-4 py-2 rounded-lg border border-outline-variant/50 focus:border-secondary outline-none text-xs font-sans"
                      placeholder="e.g. 1998 - Corporate Foundation"
                    />
                  </div>
                  <div className="flex flex-col gap-1.5 md:col-span-2">
                    <label className="font-display font-bold text-xs text-primary">Description</label>
                    <textarea 
                      name="meta_aboutJourney1Desc"
                      value={settings.metadata?.aboutJourney1Desc || ''}
                      onChange={handleGlobalChange}
                      rows="2"
                      className="px-4 py-2 rounded-lg border border-outline-variant/50 focus:border-secondary outline-none text-xs resize-none font-sans"
                    />
                  </div>
                </div>
              </div>

              <div className="border border-outline-variant/20 p-6 rounded-2xl bg-surface-container-lowest space-y-4">
                <h4 className="font-display font-bold text-sm text-primary">Journey Milestone 2</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1.5">
                    <label className="font-display font-bold text-xs text-primary">Year / Header Label</label>
                    <input 
                      type="text" 
                      name="meta_aboutJourney2Year"
                      value={settings.metadata?.aboutJourney2Year || ''}
                      onChange={handleGlobalChange}
                      className="px-4 py-2 rounded-lg border border-outline-variant/50 focus:border-secondary outline-none text-xs font-sans"
                      placeholder="e.g. 2005 - Geotechnical Expansion"
                    />
                  </div>
                  <div className="flex flex-col gap-1.5 md:col-span-2">
                    <label className="font-display font-bold text-xs text-primary">Description</label>
                    <textarea 
                      name="meta_aboutJourney2Desc"
                      value={settings.metadata?.aboutJourney2Desc || ''}
                      onChange={handleGlobalChange}
                      rows="2"
                      className="px-4 py-2 rounded-lg border border-outline-variant/50 focus:border-secondary outline-none text-xs resize-none font-sans"
                    />
                  </div>
                </div>
              </div>

              <div className="border border-outline-variant/20 p-6 rounded-2xl bg-surface-container-lowest space-y-4">
                <h4 className="font-display font-bold text-sm text-primary">Journey Milestone 3</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1.5">
                    <label className="font-display font-bold text-xs text-primary">Year / Header Label</label>
                    <input 
                      type="text" 
                      name="meta_aboutJourney3Year"
                      value={settings.metadata?.aboutJourney3Year || ''}
                      onChange={handleGlobalChange}
                      className="px-4 py-2 rounded-lg border border-outline-variant/50 focus:border-secondary outline-none text-xs font-sans"
                      placeholder="e.g. 2014 - Infrastructure Milestone"
                    />
                  </div>
                  <div className="flex flex-col gap-1.5 md:col-span-2">
                    <label className="font-display font-bold text-xs text-primary">Description</label>
                    <textarea 
                      name="meta_aboutJourney3Desc"
                      value={settings.metadata?.aboutJourney3Desc || ''}
                      onChange={handleGlobalChange}
                      rows="2"
                      className="px-4 py-2 rounded-lg border border-outline-variant/50 focus:border-secondary outline-none text-xs resize-none font-sans"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <hr className="border-outline-variant/20" />

          <div>
            <h2 className="font-display font-bold text-lg text-primary mb-6 border-b border-outline-variant/10 pb-2">Homepage Partners</h2>
            <p className="text-outline-variant font-sans text-xs mb-4">Manage the names of corporate partners displayed under the testimonials section on the Homepage.</p>
            
            <div className="space-y-4">
              {/* List of current partners */}
              <div className="flex flex-wrap gap-3 mb-4">
                {(settings.homepage?.partners || []).length > 0 ? (
                  settings.homepage.partners.map((partner, index) => (
                    <div key={index} className="flex items-center gap-2 bg-surface-container-low px-4 py-2 rounded-xl border border-outline-variant/30 font-display font-bold text-xs text-primary shadow-sm">
                      <span>{partner.name}</span>
                      <button 
                        type="button" 
                        onClick={() => handleRemovePartner(index)}
                        className="text-error hover:text-error-container transition-colors flex items-center justify-center"
                        title="Remove Partner"
                      >
                        <span className="material-symbols-outlined text-[16px]">close</span>
                      </button>
                    </div>
                  ))
                ) : (
                  <p className="text-on-surface-variant font-sans text-xs italic">No partners added yet.</p>
                )}
              </div>

              {/* Add partner form controls */}
              <div className="flex gap-4 max-w-md">
                <input 
                  type="text" 
                  value={newPartnerName}
                  onChange={(e) => setNewPartnerName(e.target.value)}
                  placeholder="e.g. PARTNER_G"
                  className="flex-1 px-4 py-3 rounded-xl border border-outline-variant/50 focus:border-secondary outline-none text-sm font-sans"
                />
                <button 
                  type="button"
                  onClick={handleAddPartner}
                  className="px-6 py-3 bg-secondary text-white rounded-xl font-display font-semibold hover:bg-secondary/90 transition-colors text-xs shadow-sm"
                >
                  Add Partner
                </button>
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
                {renderMediaUploadField({
                  label: "Hero Image (Featured Image)",
                  value: editingCompany.featuredImage,
                  fieldName: "featuredImage",
                  isEditingCompany: true,
                  onChange: handleCompanyChange
                })}
                {renderMediaUploadField({
                  label: "Hero Video (Optional)",
                  value: editingCompany.heroVideo,
                  fieldName: "heroVideo",
                  placeholder: "e.g. Link to MP4 file",
                  isEditingCompany: true,
                  onChange: handleCompanyChange
                })}
            </div>
          </div>

          <hr className="border-outline-variant/20" />

          <div>
            <h3 className="font-display font-bold text-primary mb-2">Division Certifications & Compliance</h3>
            <p className="text-outline-variant font-sans text-xs mb-6">
              Manage compliance badges, ISO certifications, and regulatory standards shown in the Data Integrity section of the division page.
            </p>
            
            <div className="space-y-4">
              {((editingCompany.certifications) || []).map((cert, idx) => (
                <div key={idx} className="flex flex-col md:flex-row gap-4 items-end bg-surface-container-lowest p-4 rounded-xl border border-outline-variant/20 relative">
                  <div className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-4 w-full">
                    <div className="flex flex-col gap-1.5">
                      <label className="font-display font-bold text-[10px] text-outline">Certification Title</label>
                      <input 
                        type="text" 
                        value={cert.title || ''} 
                        onChange={(e) => {
                          const certs = [...(editingCompany.certifications || [])];
                          certs[idx] = { ...certs[idx], title: e.target.value };
                          setEditingCompany({ ...editingCompany, certifications: certs });
                        }}
                        placeholder="e.g. ISO/IEC 17025:2017"
                        className="px-3 py-2 rounded-lg border border-outline-variant/50 focus:border-secondary outline-none text-xs font-sans w-full"
                      />
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <label className="font-display font-bold text-[10px] text-outline">Subtitle / Description</label>
                      <input 
                        type="text" 
                        value={cert.subtitle || ''} 
                        onChange={(e) => {
                          const certs = [...(editingCompany.certifications || [])];
                          certs[idx] = { ...certs[idx], subtitle: e.target.value };
                          setEditingCompany({ ...editingCompany, certifications: certs });
                        }}
                        placeholder="e.g. Lab Testing Competency"
                        className="px-3 py-2 rounded-lg border border-outline-variant/50 focus:border-secondary outline-none text-xs font-sans w-full"
                      />
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <label className="font-display font-bold text-[10px] text-outline">Material Icon Name</label>
                      <input 
                        type="text" 
                        value={cert.icon || ''} 
                        onChange={(e) => {
                          const certs = [...(editingCompany.certifications || [])];
                          certs[idx] = { ...certs[idx], icon: e.target.value };
                          setEditingCompany({ ...editingCompany, certifications: certs });
                        }}
                        placeholder="e.g. verified, science, shield, eco"
                        className="px-3 py-2 rounded-lg border border-outline-variant/50 focus:border-secondary outline-none text-xs font-sans w-full"
                      />
                    </div>
                  </div>
                  
                  <button 
                    type="button" 
                    onClick={() => {
                      const certs = [...(editingCompany.certifications || [])];
                      certs.splice(idx, 1);
                      setEditingCompany({ ...editingCompany, certifications: certs });
                    }}
                    className="text-error hover:bg-error/10 p-2.5 rounded-lg border border-error/20 flex items-center justify-center transition-colors mb-0.5"
                    title="Remove Certification"
                  >
                    <span className="material-symbols-outlined text-[18px]">delete</span>
                  </button>
                </div>
              ))}

              <button 
                type="button"
                onClick={() => {
                  const certs = [...(editingCompany.certifications || [])];
                  certs.push({ title: 'New Certification', subtitle: 'Compliance Standard', icon: 'verified' });
                  setEditingCompany({ ...editingCompany, certifications: certs });
                }}
                className="px-4 py-2.5 border-2 border-dashed border-outline-variant/50 text-outline hover:border-secondary hover:text-secondary rounded-xl font-display font-semibold transition-all text-xs flex items-center gap-1.5 justify-center w-full"
              >
                <span className="material-symbols-outlined text-[16px]">add_circle</span> Add Certification
              </button>
            </div>
          </div>

          <hr className="border-outline-variant/20" />

          {/* Division specific metadata */}
            {editingCompany.division === 'ARC' && (
              <div className="space-y-8">
                <div>
                  <h3 className="font-display font-bold text-primary mb-6">GEO ARC Structural Details</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="flex flex-col gap-1.5">
                      <label className="font-display font-bold text-xs text-primary">Discipline Tagline</label>
                      <input 
                        type="text" 
                        name="meta_disciplineTag"
                        value={editingCompany.metadata?.disciplineTag || ''}
                        onChange={handleCompanyChange}
                        className="px-4 py-3 rounded-xl border border-outline-variant/50 focus:border-secondary outline-none text-sm font-sans"
                        placeholder="e.g. Engineering & Architecture"
                      />
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <label className="font-display font-bold text-xs text-primary">Core Disciplines Section Title</label>
                      <input 
                        type="text" 
                        name="meta_coreDisciplinesTitle"
                        value={editingCompany.metadata?.coreDisciplinesTitle || ''}
                        onChange={handleCompanyChange}
                        className="px-4 py-3 rounded-xl border border-outline-variant/50 focus:border-secondary outline-none text-sm font-sans"
                        placeholder="e.g. Core Disciplines"
                      />
                    </div>
                  </div>
                </div>

                <hr className="border-outline-variant/20" />

                <div>
                  <h3 className="font-display font-bold text-primary mb-6">Landmark Projects Titles</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="flex flex-col gap-1.5">
                      <label className="font-display font-bold text-xs text-primary">Landmark Projects Title</label>
                      <input 
                        type="text" 
                        name="meta_landmarkProjectsTitle"
                        value={editingCompany.metadata?.landmarkProjectsTitle || ''}
                        onChange={handleCompanyChange}
                        className="px-4 py-3 rounded-xl border border-outline-variant/50 focus:border-secondary outline-none text-sm font-sans"
                        placeholder="e.g. Landmark Projects"
                      />
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <label className="font-display font-bold text-xs text-primary">Landmark Projects Subtitle</label>
                      <input 
                        type="text" 
                        name="meta_landmarkProjectsSubtitle"
                        value={editingCompany.metadata?.landmarkProjectsSubtitle || ''}
                        onChange={handleCompanyChange}
                        className="px-4 py-3 rounded-xl border border-outline-variant/50 focus:border-secondary outline-none text-sm font-sans"
                        placeholder="e.g. A testament to our global footprint..."
                      />
                    </div>
                  </div>
                </div>

                <hr className="border-outline-variant/20" />

                <div>
                  <h3 className="font-display font-bold text-primary mb-6">Legacy card details</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="flex flex-col gap-1.5">
                      <label className="font-display font-bold text-xs text-primary">Legacy Section Title</label>
                      <input 
                        type="text" 
                        name="meta_legacyTitle"
                        value={editingCompany.metadata?.legacyTitle || ''}
                        onChange={handleCompanyChange}
                        className="px-4 py-3 rounded-xl border border-outline-variant/50 focus:border-secondary outline-none text-sm font-sans"
                        placeholder="e.g. A Legacy of Excellence"
                      />
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <label className="font-display font-bold text-xs text-primary">Legacy Description Text</label>
                      <textarea 
                        name="meta_legacyText"
                        value={editingCompany.metadata?.legacyText || ''}
                        onChange={handleCompanyChange}
                        rows="2"
                        className="px-4 py-3 rounded-xl border border-outline-variant/50 focus:border-secondary outline-none text-sm resize-none font-sans"
                        placeholder="Our commitment to safety, innovation..."
                      />
                    </div>
                  </div>
                </div>

                <hr className="border-outline-variant/20" />

                <div>
                  <h3 className="font-display font-bold text-primary mb-6">GEO ARC Award Details</h3>
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
              </div>
            )}

            {editingCompany.division === 'SOIL' && (
              <div className="space-y-8">
                <div>
                  <h3 className="font-display font-bold text-primary mb-6">GEO Soil Scientific Methodology Details</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="flex flex-col gap-1.5">
                      <label className="font-display font-bold text-xs text-primary">Methodology Section Title</label>
                      <input 
                        type="text" 
                        name="meta_methodologyTitle"
                        value={editingCompany.metadata?.methodologyTitle || ''}
                        onChange={handleCompanyChange}
                        className="px-4 py-3 rounded-xl border border-outline-variant/50 focus:border-secondary outline-none text-sm font-sans"
                        placeholder="e.g. Scientific Methodology"
                      />
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <label className="font-display font-bold text-xs text-primary">Methodology Subtitle Description</label>
                      <textarea 
                        name="meta_methodologySubtitle"
                        value={editingCompany.metadata?.methodologySubtitle || ''}
                        onChange={handleCompanyChange}
                        rows="2"
                        className="px-4 py-3 rounded-xl border border-outline-variant/50 focus:border-secondary outline-none text-sm resize-none font-sans"
                        placeholder="Our end-to-end testing lifecycle ensures..."
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 gap-6 mt-6">
                    <div className="border border-outline-variant/20 p-6 rounded-2xl bg-surface-container-lowest space-y-4">
                      <h4 className="font-display font-bold text-sm text-primary">Methodology Step 1</h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="flex flex-col gap-1.5">
                          <label className="font-display font-bold text-xs text-primary">Title</label>
                          <input 
                            type="text" 
                            name="meta_methodologyStep1Title"
                            value={editingCompany.metadata?.methodologyStep1Title || ''}
                            onChange={handleCompanyChange}
                            className="px-4 py-2 rounded-lg border border-outline-variant/50 focus:border-secondary outline-none text-xs font-sans"
                          />
                        </div>
                        <div className="flex flex-col gap-1.5">
                          <label className="font-display font-bold text-xs text-primary">Bottom Tag Line</label>
                          <input 
                            type="text" 
                            name="meta_methodologyStep1Tag"
                            value={editingCompany.metadata?.methodologyStep1Tag || ''}
                            onChange={handleCompanyChange}
                            className="px-4 py-2 rounded-lg border border-outline-variant/50 focus:border-secondary outline-none text-xs font-sans"
                            placeholder="e.g. Field Verification"
                          />
                        </div>
                        <div className="flex flex-col gap-1.5 md:col-span-2">
                          <label className="font-display font-bold text-xs text-primary">Description</label>
                          <textarea 
                            name="meta_methodologyStep1Desc"
                            value={editingCompany.metadata?.methodologyStep1Desc || ''}
                            onChange={handleCompanyChange}
                            rows="2"
                            className="px-4 py-2 rounded-lg border border-outline-variant/50 focus:border-secondary outline-none text-xs resize-none font-sans"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="border border-outline-variant/20 p-6 rounded-2xl bg-surface-container-lowest space-y-4">
                      <h4 className="font-display font-bold text-sm text-primary">Methodology Step 2</h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="flex flex-col gap-1.5">
                          <label className="font-display font-bold text-xs text-primary">Title</label>
                          <input 
                            type="text" 
                            name="meta_methodologyStep2Title"
                            value={editingCompany.metadata?.methodologyStep2Title || ''}
                            onChange={handleCompanyChange}
                            className="px-4 py-2 rounded-lg border border-outline-variant/50 focus:border-secondary outline-none text-xs font-sans"
                          />
                        </div>
                        <div className="flex flex-col gap-1.5">
                          <label className="font-display font-bold text-xs text-primary">Bottom Tag Line</label>
                          <input 
                            type="text" 
                            name="meta_methodologyStep2Tag"
                            value={editingCompany.metadata?.methodologyStep2Tag || ''}
                            onChange={handleCompanyChange}
                            className="px-4 py-2 rounded-lg border border-outline-variant/50 focus:border-secondary outline-none text-xs font-sans"
                            placeholder="e.g. Advanced Spectroscopy"
                          />
                        </div>
                        <div className="flex flex-col gap-1.5 md:col-span-2">
                          <label className="font-display font-bold text-xs text-primary">Description</label>
                          <textarea 
                            name="meta_methodologyStep2Desc"
                            value={editingCompany.metadata?.methodologyStep2Desc || ''}
                            onChange={handleCompanyChange}
                            rows="2"
                            className="px-4 py-2 rounded-lg border border-outline-variant/50 focus:border-secondary outline-none text-xs resize-none font-sans"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="border border-outline-variant/20 p-6 rounded-2xl bg-surface-container-lowest space-y-4">
                      <h4 className="font-display font-bold text-sm text-primary">Methodology Step 3</h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="flex flex-col gap-1.5">
                          <label className="font-display font-bold text-xs text-primary">Title</label>
                          <input 
                            type="text" 
                            name="meta_methodologyStep3Title"
                            value={editingCompany.metadata?.methodologyStep3Title || ''}
                            onChange={handleCompanyChange}
                            className="px-4 py-2 rounded-lg border border-outline-variant/50 focus:border-secondary outline-none text-xs font-sans"
                          />
                        </div>
                        <div className="flex flex-col gap-1.5">
                          <label className="font-display font-bold text-xs text-primary">Bottom Tag Line</label>
                          <input 
                            type="text" 
                            name="meta_methodologyStep3Tag"
                            value={editingCompany.metadata?.methodologyStep3Tag || ''}
                            onChange={handleCompanyChange}
                            className="px-4 py-2 rounded-lg border border-outline-variant/50 focus:border-secondary outline-none text-xs font-sans"
                            placeholder="e.g. Compliance Verified"
                          />
                        </div>
                        <div className="flex flex-col gap-1.5 md:col-span-2">
                          <label className="font-display font-bold text-xs text-primary">Description</label>
                          <textarea 
                            name="meta_methodologyStep3Desc"
                            value={editingCompany.metadata?.methodologyStep3Desc || ''}
                            onChange={handleCompanyChange}
                            rows="2"
                            className="px-4 py-2 rounded-lg border border-outline-variant/50 focus:border-secondary outline-none text-xs resize-none font-sans"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <hr className="border-outline-variant/20" />

                <div>
                  <h3 className="font-display font-bold text-primary mb-6">GEO Soil Data Integrity Section Details</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="flex flex-col gap-1.5">
                      <label className="font-display font-bold text-xs text-primary">Integrity Title</label>
                      <input 
                        type="text" 
                        name="meta_integrityTitle"
                        value={editingCompany.metadata?.integrityTitle || ''}
                        onChange={handleCompanyChange}
                        className="px-4 py-3 rounded-xl border border-outline-variant/50 focus:border-secondary outline-none text-sm font-sans"
                        placeholder="e.g. Data Integrity"
                      />
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <label className="font-display font-bold text-xs text-primary">Integrity Highlight Span Text</label>
                      <input 
                        type="text" 
                        name="meta_integritySpan"
                        value={editingCompany.metadata?.integritySpan || ''}
                        onChange={handleCompanyChange}
                        className="px-4 py-3 rounded-xl border border-outline-variant/50 focus:border-secondary outline-none text-sm font-sans"
                        placeholder="e.g. You Can Build On"
                      />
                    </div>
                    <div className="flex flex-col gap-1.5 md:col-span-2">
                      <label className="font-display font-bold text-xs text-primary">Integrity Description Copy</label>
                      <textarea 
                        name="meta_integrityText"
                        value={editingCompany.metadata?.integrityText || ''}
                        onChange={handleCompanyChange}
                        rows="3"
                        className="px-4 py-3 rounded-xl border border-outline-variant/50 focus:border-secondary outline-none text-sm resize-none font-sans"
                        placeholder="Our reports are more than just numbers..."
                      />
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:col-span-2 pt-4 border-t border-outline-variant/10">
                      <div className="flex flex-col gap-1.5">
                        <label className="font-display font-bold text-xs text-primary">Report Code</label>
                        <input 
                          type="text" 
                          name="meta_reportCode"
                          value={editingCompany.metadata?.reportCode || ''}
                          onChange={handleCompanyChange}
                          className="px-4 py-3 rounded-xl border border-outline-variant/50 focus:border-secondary outline-none text-sm font-sans"
                          placeholder="e.g. GEO-SOIL-2026"
                        />
                      </div>
                      <div className="flex flex-col gap-1.5">
                        <label className="font-display font-bold text-xs text-primary">Certified By Name</label>
                        <input 
                          type="text" 
                          name="meta_certifiedByName"
                          value={editingCompany.metadata?.certifiedByName || ''}
                          onChange={handleCompanyChange}
                          className="px-4 py-3 rounded-xl border border-outline-variant/50 focus:border-secondary outline-none text-sm font-sans"
                          placeholder="e.g. Dr. Elias Vance"
                        />
                      </div>
                      <div className="flex flex-col gap-1.5">
                        <label className="font-display font-bold text-xs text-primary">Certified By Designation</label>
                        <input 
                          type="text" 
                          name="meta_certifiedByDesig"
                          value={editingCompany.metadata?.certifiedByDesig || ''}
                          onChange={handleCompanyChange}
                          className="px-4 py-3 rounded-xl border border-outline-variant/50 focus:border-secondary outline-none text-sm font-sans"
                          placeholder="e.g. Chief Geotechnical Officer"
                        />
                      </div>
                      <div className="md:col-span-3">
                        {renderMediaUploadField({
                          label: "Certified Report Document (PDF/Image)",
                          value: editingCompany.metadata?.reportFile,
                          fieldName: "reportFile",
                          accept: ".pdf,image/*",
                          isCompanyMetadata: true,
                          isEditingCompany: true,
                          onChange: handleCompanyChange
                        })}
                      </div>
                    </div>
                  </div>
                </div>

                <hr className="border-outline-variant/20" />

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
                        <div className="flex flex-col gap-1.5 md:col-span-2">
                          <label className="font-display font-bold text-[10px] text-outline">Name</label>
                          <input 
                            type="text" 
                            name="meta_equipment1Name"
                            value={editingCompany.metadata?.equipment1Name || ''}
                            onChange={handleCompanyChange}
                            className="px-4 py-2 rounded-lg border border-outline-variant/50 focus:border-secondary outline-none text-xs font-sans"
                          />
                        </div>
                        <div className="md:col-span-2">
                          {renderMediaUploadField({
                            label: "Instrument Image",
                            value: editingCompany.metadata?.equipment1Image,
                            fieldName: "equipment1Image",
                            isCompanyMetadata: true,
                            isEditingCompany: true,
                            onChange: handleCompanyChange
                          })}
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
                        <div className="flex flex-col gap-1.5 md:col-span-2">
                          <label className="font-display font-bold text-[10px] text-outline">Name</label>
                          <input 
                            type="text" 
                            name="meta_equipment2Name"
                            value={editingCompany.metadata?.equipment2Name || ''}
                            onChange={handleCompanyChange}
                            className="px-4 py-2 rounded-lg border border-outline-variant/50 focus:border-secondary outline-none text-xs font-sans"
                          />
                        </div>
                        <div className="md:col-span-2">
                          {renderMediaUploadField({
                            label: "Instrument Image (Optional)",
                            value: editingCompany.metadata?.equipment2Image,
                            fieldName: "equipment2Image",
                            isCompanyMetadata: true,
                            isEditingCompany: true,
                            onChange: handleCompanyChange
                          })}
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
              </div>
            )}

            {editingCompany.division === 'CONSTRUCTION' && (
              <div className="space-y-8">
                <div>
                  <h3 className="font-display font-bold text-primary mb-6">GEO Construction Structural Details</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="flex flex-col gap-1.5">
                      <label className="font-display font-bold text-xs text-primary">Construction Page Hero Title</label>
                      <input 
                        type="text" 
                        name="meta_heroTitle"
                        value={editingCompany.metadata?.heroTitle || ''}
                        onChange={handleCompanyChange}
                        className="px-4 py-3 rounded-xl border border-outline-variant/50 focus:border-secondary outline-none text-sm font-sans"
                        placeholder="e.g. Building Tomorrow's Infrastructure."
                      />
                    </div>
                  </div>
                </div>

                <hr className="border-outline-variant/20" />

                <div>
                  <h3 className="font-display font-bold text-primary mb-6">Capabilities Statistics (4 Cards)</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="border border-outline-variant/20 p-6 rounded-2xl bg-surface-container-lowest space-y-4">
                      <h4 className="font-display font-bold text-sm text-primary">Stat Card 1</h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="flex flex-col gap-1.5">
                          <label className="font-display font-bold text-xs text-primary">Value (e.g. 500+)</label>
                          <input 
                            type="text" 
                            name="meta_stat1Val"
                            value={editingCompany.metadata?.stat1Val || ''}
                            onChange={handleCompanyChange}
                            className="px-4 py-2 rounded-lg border border-outline-variant/50 focus:border-secondary outline-none text-xs font-sans"
                          />
                        </div>
                        <div className="flex flex-col gap-1.5">
                          <label className="font-display font-bold text-xs text-primary">Label</label>
                          <input 
                            type="text" 
                            name="meta_stat1Label"
                            value={editingCompany.metadata?.stat1Label || ''}
                            onChange={handleCompanyChange}
                            className="px-4 py-2 rounded-lg border border-outline-variant/50 focus:border-secondary outline-none text-xs font-sans"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="border border-outline-variant/20 p-6 rounded-2xl bg-surface-container-lowest space-y-4">
                      <h4 className="font-display font-bold text-sm text-primary">Stat Card 2</h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="flex flex-col gap-1.5">
                          <label className="font-display font-bold text-xs text-primary">Value (e.g. 12M)</label>
                          <input 
                            type="text" 
                            name="meta_stat2Val"
                            value={editingCompany.metadata?.stat2Val || ''}
                            onChange={handleCompanyChange}
                            className="px-4 py-2 rounded-lg border border-outline-variant/50 focus:border-secondary outline-none text-xs font-sans"
                          />
                        </div>
                        <div className="flex flex-col gap-1.5">
                          <label className="font-display font-bold text-xs text-primary">Label</label>
                          <input 
                            type="text" 
                            name="meta_stat2Label"
                            value={editingCompany.metadata?.stat2Label || ''}
                            onChange={handleCompanyChange}
                            className="px-4 py-2 rounded-lg border border-outline-variant/50 focus:border-secondary outline-none text-xs font-sans"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="border border-outline-variant/20 p-6 rounded-2xl bg-surface-container-lowest space-y-4">
                      <h4 className="font-display font-bold text-sm text-primary">Stat Card 3</h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="flex flex-col gap-1.5">
                          <label className="font-display font-bold text-xs text-primary">Value (e.g. 15)</label>
                          <input 
                            type="text" 
                            name="meta_stat3Val"
                            value={editingCompany.metadata?.stat3Val || ''}
                            onChange={handleCompanyChange}
                            className="px-4 py-2 rounded-lg border border-outline-variant/50 focus:border-secondary outline-none text-xs font-sans"
                          />
                        </div>
                        <div className="flex flex-col gap-1.5">
                          <label className="font-display font-bold text-xs text-primary">Label</label>
                          <input 
                            type="text" 
                            name="meta_stat3Label"
                            value={editingCompany.metadata?.stat3Label || ''}
                            onChange={handleCompanyChange}
                            className="px-4 py-2 rounded-lg border border-outline-variant/50 focus:border-secondary outline-none text-xs font-sans"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="border border-outline-variant/20 p-6 rounded-2xl bg-surface-container-lowest space-y-4">
                      <h4 className="font-display font-bold text-sm text-primary">Stat Card 4</h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="flex flex-col gap-1.5">
                          <label className="font-display font-bold text-xs text-primary">Value (e.g. $4B)</label>
                          <input 
                            type="text" 
                            name="meta_stat4Val"
                            value={editingCompany.metadata?.stat4Val || ''}
                            onChange={handleCompanyChange}
                            className="px-4 py-2 rounded-lg border border-outline-variant/50 focus:border-secondary outline-none text-xs font-sans"
                          />
                        </div>
                        <div className="flex flex-col gap-1.5">
                          <label className="font-display font-bold text-xs text-primary">Label</label>
                          <input 
                            type="text" 
                            name="meta_stat4Label"
                            value={editingCompany.metadata?.stat4Label || ''}
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
                  <h3 className="font-display font-bold text-primary mb-6">Engineering Landmarks Header</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="flex flex-col gap-1.5">
                      <label className="font-display font-bold text-xs text-primary">Landmarks Section Title</label>
                      <input 
                        type="text" 
                        name="meta_landmarksTitle"
                        value={editingCompany.metadata?.landmarksTitle || ''}
                        onChange={handleCompanyChange}
                        className="px-4 py-3 rounded-xl border border-outline-variant/50 focus:border-secondary outline-none text-sm font-sans"
                        placeholder="e.g. Engineering Landmarks"
                      />
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <label className="font-display font-bold text-xs text-primary">Landmarks Subtitle</label>
                      <textarea 
                        name="meta_landmarksSubtitle"
                        value={editingCompany.metadata?.landmarksSubtitle || ''}
                        onChange={handleCompanyChange}
                        rows="2"
                        className="px-4 py-3 rounded-xl border border-outline-variant/50 focus:border-secondary outline-none text-sm resize-none font-sans"
                        placeholder="A showcase of our multi-billion dollar..."
                      />
                    </div>
                  </div>
                </div>

                <hr className="border-outline-variant/20" />

                <div>
                  <h3 className="font-display font-bold text-primary mb-6">Lifecycle of Excellence Process</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="flex flex-col gap-1.5">
                      <label className="font-display font-bold text-xs text-primary">Lifecycle Section Title</label>
                      <input 
                        type="text" 
                        name="meta_lifecycleTitle"
                        value={editingCompany.metadata?.lifecycleTitle || ''}
                        onChange={handleCompanyChange}
                        className="px-4 py-3 rounded-xl border border-outline-variant/50 focus:border-secondary outline-none text-sm font-sans"
                        placeholder="e.g. The Lifecycle of Excellence"
                      />
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <label className="font-display font-bold text-xs text-primary">Lifecycle Subtitle</label>
                      <textarea 
                        name="meta_lifecycleSubtitle"
                        value={editingCompany.metadata?.lifecycleSubtitle || ''}
                        onChange={handleCompanyChange}
                        rows="2"
                        className="px-4 py-3 rounded-xl border border-outline-variant/50 focus:border-secondary outline-none text-sm resize-none font-sans"
                        placeholder="Our phased approach ensures stability..."
                      />
                    </div>
                  </div>
                </div>

                <hr className="border-outline-variant/20" />

                <div>
                  <h3 className="font-display font-bold text-primary mb-6">Active Operations Progress & Metrics</h3>
                  <div className="space-y-6">
                    {((editingCompany.metadata?.activeOperations) || []).map((op, idx) => (
                      <div key={idx} className="border border-outline-variant/20 p-6 rounded-2xl bg-surface-container-lowest space-y-4 relative">
                        <div className="flex justify-between items-center border-b border-outline-variant/10 pb-2 mb-4">
                          <h4 className="font-display font-bold text-sm text-primary">Operation {idx + 1}</h4>
                          <button 
                            type="button"
                            onClick={() => {
                              const ops = [...(editingCompany.metadata?.activeOperations || [])];
                              ops.splice(idx, 1);
                              setEditingCompany({
                                ...editingCompany,
                                metadata: {
                                  ...editingCompany.metadata,
                                  activeOperations: ops
                                }
                              });
                            }}
                            className="text-error hover:text-error/80 font-display font-bold text-xs flex items-center gap-1"
                          >
                            <span className="material-symbols-outlined text-[16px]">delete</span> Remove
                          </button>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          <div className="flex flex-col gap-1.5">
                            <label className="font-display font-bold text-[10px] text-outline">Operation Name</label>
                            <input 
                              type="text" 
                              value={op.name || ''}
                              onChange={(e) => {
                                const ops = [...(editingCompany.metadata?.activeOperations || [])];
                                ops[idx] = { ...ops[idx], name: e.target.value };
                                setEditingCompany({
                                  ...editingCompany,
                                  metadata: { ...editingCompany.metadata, activeOperations: ops }
                                });
                              }}
                              className="px-4 py-2 rounded-lg border border-outline-variant/50 focus:border-secondary outline-none text-xs font-sans"
                            />
                          </div>
                          <div className="flex flex-col gap-1.5">
                            <label className="font-display font-bold text-[10px] text-outline">Subtitle</label>
                            <input 
                              type="text" 
                              value={op.subtitle || ''}
                              onChange={(e) => {
                                const ops = [...(editingCompany.metadata?.activeOperations || [])];
                                ops[idx] = { ...ops[idx], subtitle: e.target.value };
                                setEditingCompany({
                                  ...editingCompany,
                                  metadata: { ...editingCompany.metadata, activeOperations: ops }
                                });
                              }}
                              className="px-4 py-2 rounded-lg border border-outline-variant/50 focus:border-secondary outline-none text-xs font-sans"
                            />
                          </div>
                          <div className="flex flex-col gap-1.5">
                            <label className="font-display font-bold text-[10px] text-outline">Progress Percentage (%)</label>
                            <input 
                              type="number" 
                              value={op.progress !== undefined ? op.progress : ''}
                              onChange={(e) => {
                                const ops = [...(editingCompany.metadata?.activeOperations || [])];
                                ops[idx] = { ...ops[idx], progress: Number(e.target.value) };
                                setEditingCompany({
                                  ...editingCompany,
                                  metadata: { ...editingCompany.metadata, activeOperations: ops }
                                });
                              }}
                              className="px-4 py-2 rounded-lg border border-outline-variant/50 focus:border-secondary outline-none text-xs font-sans"
                            />
                          </div>
                        </div>

                        {/* Image and Link */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="flex flex-col gap-1.5">
                            <label className="font-display font-bold text-[10px] text-outline">Operation Cover Photo</label>
                            
                            <div className="flex gap-4 items-center">
                              {/* Preview thumbnail if image exists */}
                              {op.image && (
                                <div className="w-16 h-16 rounded-xl overflow-hidden border border-outline-variant/30 bg-surface-container shrink-0">
                                  <img 
                                    src={op.image.startsWith('/uploads') ? `${API.defaults.baseURL ? API.defaults.baseURL.replace(/\/api$/, '') : 'http://localhost:5000'}${op.image}` : op.image} 
                                    alt="Preview" 
                                    className="w-full h-full object-cover" 
                                  />
                                </div>
                              )}
                              
                              <div className="flex-1 flex flex-col gap-2">
                                <div className="flex gap-2">
                                  <label className="cursor-pointer bg-primary/10 text-primary hover:bg-primary/20 px-4 py-2 rounded-xl text-xs font-semibold font-display flex items-center gap-1.5 transition-colors">
                                    <span className="material-symbols-outlined text-[16px]">
                                      {uploadingOpIndex === idx ? 'sync' : 'upload_file'}
                                    </span>
                                    {uploadingOpIndex === idx ? 'Uploading...' : 'Upload from PC'}
                                    <input 
                                      type="file" 
                                      accept="image/*" 
                                      onChange={(e) => handleUploadOpImage(e, idx)} 
                                      className="hidden" 
                                      disabled={uploadingOpIndex !== null}
                                    />
                                  </label>
                                  
                                  {op.image && (
                                    <button
                                      type="button"
                                      onClick={() => {
                                        const ops = [...(editingCompany.metadata?.activeOperations || [])];
                                        ops[idx] = { ...ops[idx], image: '' };
                                        setEditingCompany({
                                          ...editingCompany,
                                          metadata: { ...editingCompany.metadata, activeOperations: ops }
                                        });
                                      }}
                                      className="bg-error/10 text-error hover:bg-error/20 px-3 py-2 rounded-xl text-xs font-semibold font-display flex items-center gap-1 transition-colors"
                                    >
                                      Clear
                                    </button>
                                  )}
                                </div>
                                <input 
                                  type="text" 
                                  value={op.image || ''}
                                  onChange={(e) => {
                                    const ops = [...(editingCompany.metadata?.activeOperations || [])];
                                    ops[idx] = { ...ops[idx], image: e.target.value };
                                    setEditingCompany({
                                      ...editingCompany,
                                      metadata: { ...editingCompany.metadata, activeOperations: ops }
                                    });
                                  }}
                                  placeholder="Or paste an image link here..."
                                  className="px-4 py-2 rounded-lg border border-outline-variant/50 focus:border-secondary outline-none text-xs font-sans w-full"
                                />
                              </div>
                            </div>
                          </div>
                          <div className="flex flex-col gap-1.5 justify-end">
                            <label className="font-display font-bold text-[10px] text-outline">Link / URL (Optional)</label>
                            <input 
                              type="text" 
                              value={op.link || ''}
                              onChange={(e) => {
                                const ops = [...(editingCompany.metadata?.activeOperations || [])];
                                ops[idx] = { ...ops[idx], link: e.target.value };
                                setEditingCompany({
                                  ...editingCompany,
                                  metadata: { ...editingCompany.metadata, activeOperations: ops }
                                });
                              }}
                              placeholder="e.g. https://projectsite.com"
                              className="px-4 py-2 rounded-lg border border-outline-variant/50 focus:border-secondary outline-none text-xs font-sans"
                            />
                          </div>
                        </div>

                        {/* Stats */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2 border-t border-outline-variant/10">
                          <div className="flex flex-col gap-1.5">
                            <label className="font-display font-bold text-[10px] text-outline">Stat 1 Label (e.g. Cranes)</label>
                            <input 
                              type="text" 
                              value={op.stat1Label || ''}
                              onChange={(e) => {
                                const ops = [...(editingCompany.metadata?.activeOperations || [])];
                                ops[idx] = { ...ops[idx], stat1Label: e.target.value };
                                setEditingCompany({
                                  ...editingCompany,
                                  metadata: { ...editingCompany.metadata, activeOperations: ops }
                                });
                              }}
                              className="px-4 py-2 rounded-lg border border-outline-variant/50 focus:border-secondary outline-none text-xs font-sans"
                            />
                          </div>
                          <div className="flex flex-col gap-1.5">
                            <label className="font-display font-bold text-[10px] text-outline">Stat 1 Value (e.g. 12)</label>
                            <input 
                              type="text" 
                              value={op.stat1Val || ''}
                              onChange={(e) => {
                                const ops = [...(editingCompany.metadata?.activeOperations || [])];
                                ops[idx] = { ...ops[idx], stat1Val: e.target.value };
                                setEditingCompany({
                                  ...editingCompany,
                                  metadata: { ...editingCompany.metadata, activeOperations: ops }
                                });
                              }}
                              className="px-4 py-2 rounded-lg border border-outline-variant/50 focus:border-secondary outline-none text-xs font-sans"
                            />
                          </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          <div className="flex flex-col gap-1.5">
                            <label className="font-display font-bold text-[10px] text-outline">Stat 2 Label (e.g. Personnel)</label>
                            <input 
                              type="text" 
                              value={op.stat2Label || ''}
                              onChange={(e) => {
                                const ops = [...(editingCompany.metadata?.activeOperations || [])];
                                ops[idx] = { ...ops[idx], stat2Label: e.target.value };
                                setEditingCompany({
                                  ...editingCompany,
                                  metadata: { ...editingCompany.metadata, activeOperations: ops }
                                });
                              }}
                              className="px-4 py-2 rounded-lg border border-outline-variant/50 focus:border-secondary outline-none text-xs font-sans"
                            />
                          </div>
                          <div className="flex flex-col gap-1.5">
                            <label className="font-display font-bold text-[10px] text-outline">Stat 2 Value (e.g. 1.4k)</label>
                            <input 
                              type="text" 
                              value={op.stat2Val || ''}
                              onChange={(e) => {
                                const ops = [...(editingCompany.metadata?.activeOperations || [])];
                                ops[idx] = { ...ops[idx], stat2Val: e.target.value };
                                setEditingCompany({
                                  ...editingCompany,
                                  metadata: { ...editingCompany.metadata, activeOperations: ops }
                                });
                              }}
                              className="px-4 py-2 rounded-lg border border-outline-variant/50 focus:border-secondary outline-none text-xs font-sans"
                            />
                          </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          <div className="flex flex-col gap-1.5">
                            <label className="font-display font-bold text-[10px] text-outline">Stat 3 Label (e.g. Est. Completion)</label>
                            <input 
                              type="text" 
                              value={op.stat3Label || ''}
                              onChange={(e) => {
                                const ops = [...(editingCompany.metadata?.activeOperations || [])];
                                ops[idx] = { ...ops[idx], stat3Label: e.target.value };
                                setEditingCompany({
                                  ...editingCompany,
                                  metadata: { ...editingCompany.metadata, activeOperations: ops }
                                });
                              }}
                              className="px-4 py-2 rounded-lg border border-outline-variant/50 focus:border-secondary outline-none text-xs font-sans"
                            />
                          </div>
                          <div className="flex flex-col gap-1.5">
                            <label className="font-display font-bold text-[10px] text-outline">Stat 3 Value (e.g. Q3 2025)</label>
                            <input 
                              type="text" 
                              value={op.stat3Val || ''}
                              onChange={(e) => {
                                const ops = [...(editingCompany.metadata?.activeOperations || [])];
                                ops[idx] = { ...ops[idx], stat3Val: e.target.value };
                                setEditingCompany({
                                  ...editingCompany,
                                  metadata: { ...editingCompany.metadata, activeOperations: ops }
                                });
                              }}
                              className="px-4 py-2 rounded-lg border border-outline-variant/50 focus:border-secondary outline-none text-xs font-sans"
                            />
                          </div>
                        </div>
                      </div>
                    ))}

                    <button
                      type="button"
                      onClick={() => {
                        const ops = [...(editingCompany.metadata?.activeOperations || [])];
                        // If no operations exist in metadata, seed the current defaults first
                        if (ops.length === 0) {
                          ops.push(
                            {
                              name: editingCompany.metadata?.op1Name || 'North Rail Link',
                              subtitle: editingCompany.metadata?.op1Subtitle || 'Industrial Hub Connector',
                              progress: editingCompany.metadata?.op1Progress !== undefined ? editingCompany.metadata.op1Progress : 72,
                              stat1Label: editingCompany.metadata?.op1Stat1Label || 'Cranes',
                              stat1Val: editingCompany.metadata?.op1Stat1Val || '12',
                              stat2Label: editingCompany.metadata?.op1Stat2Label || 'Personnel',
                              stat2Val: editingCompany.metadata?.op1Stat2Val || '1.4k',
                              stat3Label: editingCompany.metadata?.op1Stat3Label || 'Est. Completion',
                              stat3Val: editingCompany.metadata?.op1Stat3Val || 'Q3 2025',
                              image: '',
                              link: ''
                            },
                            {
                              name: editingCompany.metadata?.op2Name || 'Maritime Port Expansion',
                              subtitle: editingCompany.metadata?.op2Subtitle || 'Strategic Deep-water Berth',
                              progress: editingCompany.metadata?.op2Progress !== undefined ? editingCompany.metadata.op2Progress : 45,
                              stat1Label: editingCompany.metadata?.op2Stat1Label || 'Dredgers',
                              stat1Val: editingCompany.metadata?.op2Stat1Val || '04',
                              stat2Label: editingCompany.metadata?.op2Stat2Label || 'Concrete (m³)',
                              stat2Val: editingCompany.metadata?.op2Stat2Val || '850k',
                              stat3Label: editingCompany.metadata?.op2Stat3Label || 'Est. Completion',
                              stat3Val: editingCompany.metadata?.op2Stat3Val || 'Q2 2026',
                              image: '',
                              link: ''
                            }
                          );
                        }
                        // Add new empty operation
                        ops.push({
                          name: 'New Operation Name',
                          subtitle: 'New Subtitle',
                          progress: 0,
                          image: '',
                          link: '',
                          stat1Label: 'Stat 1 Label',
                          stat1Val: '0',
                          stat2Label: 'Stat 2 Label',
                          stat2Val: '0',
                          stat3Label: 'Stat 3 Label',
                          stat3Val: '0'
                        });
                        setEditingCompany({
                          ...editingCompany,
                          metadata: {
                            ...editingCompany.metadata,
                            activeOperations: ops
                          }
                        });
                      }}
                      className="px-6 py-3 bg-secondary text-white rounded-xl font-display font-semibold hover:bg-secondary/90 transition-colors text-xs shadow-sm"
                    >
                      + Add New Operation
                    </button>
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

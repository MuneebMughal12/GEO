import React, { useState, useEffect } from 'react';
import API from '../services/api';
import SEO from '../components/SEO';
import SchemaMarkup from '../components/SchemaMarkup';

const DivisionConstruction = () => {
  const [company, setCompany] = useState(null);
  const [projects, setProjects] = useState([]);
  const [allTeam, setAllTeam] = useState([]);
  const [activeTab, setActiveTab] = useState('CONSTRUCTION');
  const [gallery, setGallery] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchConstData = async () => {
      try {
        const [compRes, projRes, teamRes, galRes] = await Promise.all([
          API.get('/companies/geo-construction'),
          API.get('/projects?division=CONSTRUCTION'),
          API.get('/team'),
          API.get('/gallery?division=CONSTRUCTION')
        ]);

        if (compRes.data.success) setCompany(compRes.data.data);
        if (projRes.data.success) setProjects(projRes.data.data);
        if (teamRes.data.success) setAllTeam(teamRes.data.data);
        if (galRes.data.success) setGallery(galRes.data.data);
      } catch (err) {
        console.error('Error fetching GEO Construction data:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchConstData();
  }, []);

  const globalCeo = allTeam.find(m => m.division === 'GLOBAL');
  const activeDivisionCeo = allTeam.find(m => m.division === activeTab && m.designation.includes('CEO'));
  const activeDivisionMembers = allTeam.filter(m => m.division === activeTab && !m.designation.includes('CEO'));

  const metaTitle = company?.seo?.metaTitle || 'GEO Construction | Infrastructure & Civil Engineering';
  const metaDescription = company?.seo?.metaDescription || 'Full-cycle building construction, infrastructure development, and project management by GEO Construction.';

  return (
    <div className="relative w-full pt-20">
      <SEO title={metaTitle} description={metaDescription} />
      <SchemaMarkup type="Service" data={{ name: 'GEO Construction Civil & Structural Engineering', description: metaDescription }} />

      {/* Hero Section */}
      <section className="relative h-screen min-h-[700px] flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            className="w-full h-full object-cover" 
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuBPpuQBj18rx33YYWBnP1aKZrkDoa8ZGQe9sSUXt0DJyR0GxHJVlmAY_NbbHCR0zWOLS4FkNfaDaJu948FKC8OCPd0YlHvx067xCb9XmRcu8-EDR2WT1fOhbMkz75njMlcHUq5ei_4I3dMD_R0OBIF7i67LNv_kbHaM1rrk5dGABZmYUJIpgUYUSKgV61VZZiiiGnaNE9Izg2oidIde-j538_kHx5nfTOcsv-fHTNhdJ1RdGzrHMfhavTJwxVTppU4Jt-UGYcoRegg"
            alt="GEO Heavy Civil Construction Site"
          />
          <div className="absolute inset-0 hero-gradient" />
        </div>
        <div className="relative z-10 max-w-container-max mx-auto px-margin-desktop w-full text-white">
          <div className="max-w-3xl space-y-6">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-secondary/20 border border-secondary/30 text-secondary-fixed backdrop-blur-md">
              <span className="material-symbols-outlined text-[18px]">precision_manufacturing</span>
              <span className="font-display font-semibold text-xs uppercase tracking-widest">GEO Construction Division</span>
            </div>
            <h1 className="font-display text-4xl md:text-6xl font-extrabold leading-tight">
              Building Tomorrow's Infrastructure.
            </h1>
            <p className="font-sans text-base md:text-lg text-white/80 leading-relaxed max-w-2xl">
              {company?.description || 'Setting the gold standard in civil engineering and large-scale infrastructure. From high-speed rail networks to industrial monoliths, GEO Construction delivers engineering excellence with surgical precision.'}
            </p>
            <div className="flex flex-wrap gap-4 pt-4">
              <a href="#landmarks" className="bg-secondary text-white px-8 py-4 rounded-lg font-display font-semibold text-xs hover:bg-secondary/90 transition-all flex items-center gap-2 group">
                Explore Portfolio
                <span className="material-symbols-outlined transition-transform group-hover:translate-x-1">arrow_forward</span>
              </a>
              <a href="#timeline" className="bg-white/10 backdrop-blur-md border border-white/20 text-white px-8 py-4 rounded-lg font-display font-semibold text-xs hover:bg-white/20 transition-all">
                Technical Specs
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Capabilities Stats */}
      <section className="py-120px bg-surface-container-lowest border-b border-outline-variant/10">
        <div className="max-w-container-max mx-auto px-margin-desktop">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-gutter">
            <div className="p-8 border-l-4 border-secondary bg-surface rounded-r-xl shadow-sm hover:scale-[1.02] transition-transform duration-300">
              <h3 className="text-primary font-display text-3xl font-bold mb-2">500+</h3>
              <p className="text-outline font-sans text-sm font-semibold">Completed Projects</p>
            </div>
            <div className="p-8 border-l-4 border-secondary bg-surface rounded-r-xl shadow-sm hover:scale-[1.02] transition-transform duration-300">
              <h3 className="text-primary font-display text-3xl font-bold mb-2">12M</h3>
              <p className="text-outline font-sans text-sm font-semibold">Safe Man Hours</p>
            </div>
            <div className="p-8 border-l-4 border-secondary bg-surface rounded-r-xl shadow-sm hover:scale-[1.02] transition-transform duration-300">
              <h3 className="text-primary font-display text-3xl font-bold mb-2">15</h3>
              <p className="text-outline font-sans text-sm font-semibold">Global Locations</p>
            </div>
            <div className="p-8 border-l-4 border-secondary bg-surface rounded-r-xl shadow-sm hover:scale-[1.02] transition-transform duration-300">
              <h3 className="text-primary font-display text-3xl font-bold mb-2">$4B</h3>
              <p className="text-outline font-sans text-sm font-semibold">Asset Portfolio</p>
            </div>
          </div>
        </div>
      </section>

      {/* Portfolio Bento Grid */}
      <section id="landmarks" className="py-160px bg-surface">
        <div className="max-w-container-max mx-auto px-margin-desktop">
          <div className="text-center mb-16">
            <h2 className="font-display text-3xl font-bold text-primary mb-4">Engineering Landmarks</h2>
            <p className="font-sans text-sm text-on-surface-variant max-w-2xl mx-auto">A showcase of our multi-billion dollar infrastructure initiatives across the globe.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-12 gap-gutter">
            {projects.length > 0 && (
              <>
                <div className="md:col-span-8 relative h-[500px] rounded-xl overflow-hidden group shadow-lg">
                  <img 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
                    src={projects[0].images[0] || ''}
                    alt={projects[0].name}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-primary/95 to-transparent flex flex-col justify-end p-10">
                    <span className="text-secondary font-display font-semibold text-xs tracking-wider mb-2">CIVIL INFRASTRUCTURE</span>
                    <h3 className="text-white font-display text-2xl font-bold mb-4">{projects[0].name}</h3>
                    <p className="text-white/75 text-sm max-w-lg">{projects[0].description}</p>
                  </div>
                </div>
                <div className="md:col-span-4 flex flex-col gap-gutter">
                  {projects.slice(1, 3).map((proj) => (
                    <div key={proj._id} className="relative h-[238px] rounded-xl overflow-hidden group shadow-md">
                      <img 
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" 
                        src={proj.images[0] || ''}
                        alt={proj.name}
                      />
                      <div className="absolute inset-0 bg-primary/40 group-hover:bg-primary/20 transition-all flex items-end p-6">
                        <h4 className="text-white font-display font-bold text-base">{proj.name}</h4>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
      </section>

      {/* Project Timeline Process */}
      <section id="timeline" className="py-160px bg-primary text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 opacity-5 translate-x-1/4 -translate-y-1/4">
          <span className="material-symbols-outlined text-[600px] pointer-events-none">construction</span>
        </div>
        <div className="max-w-container-max mx-auto px-margin-desktop relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-gutter items-start">
            <div className="lg:col-span-1 space-y-6">
              <h2 className="font-display text-3xl font-bold mb-6">The Lifecycle of Excellence</h2>
              <p className="text-white/60 text-sm leading-relaxed">Our phased approach ensures stability and accountability at every milestone of the project delivery.</p>
            </div>
            <div className="lg:col-span-2 space-y-12 relative before:absolute before:left-[19px] before:top-4 before:bottom-4 before:w-[2px] before:bg-white/10">
              <div className="relative pl-16">
                <div className="absolute left-0 top-1 w-10 h-10 rounded-full bg-secondary flex items-center justify-center z-10 text-white">
                  <span className="material-symbols-outlined text-sm">edit</span>
                </div>
                <h4 className="font-display font-bold text-lg mb-2">Phase 01: Pre-Construction & Analysis</h4>
                <p className="text-white/60 text-sm">Feasibility studies, soil analysis, and advanced structural modeling using proprietary GEO datasets.</p>
              </div>
              <div className="relative pl-16">
                <div className="absolute left-0 top-1 w-10 h-10 rounded-full bg-surface-container-highest flex items-center justify-center z-10 text-primary">
                  <span className="material-symbols-outlined text-sm">foundation</span>
                </div>
                <h4 className="font-display font-bold text-lg mb-2">Phase 02: Structural Groundwork</h4>
                <p className="text-white/60 text-sm">Deep foundation engineering, earth retention systems, and site utilities installation.</p>
              </div>
              <div className="relative pl-16">
                <div className="absolute left-0 top-1 w-10 h-10 rounded-full bg-surface-container-highest flex items-center justify-center z-10 text-primary">
                  <span className="material-symbols-outlined text-sm">apartment</span>
                </div>
                <h4 className="font-display font-bold text-lg mb-2">Phase 03: Vertical Mobilization</h4>
                <p className="text-white/60 text-sm">Rapid erection of core structures using pre-fabricated elements and high-capacity cranes.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Active Operations & Real-time Progress */}
      <section className="py-160px bg-surface-container-low border-t border-outline-variant/10">
        <div className="max-w-container-max mx-auto px-margin-desktop">
          <div className="flex flex-col sm:flex-row justify-between items-end mb-16 gap-6">
            <div>
              <h2 className="font-display text-3xl font-bold text-primary mb-2">Active Operations</h2>
              <p className="text-outline font-sans text-sm">Real-time progress of our major current infrastructure sites.</p>
            </div>
            <div className="flex items-center gap-2 text-secondary font-display font-semibold text-xs">
              <span className="w-2.5 h-2.5 rounded-full bg-secondary animate-pulse" />
              LIVE MONITORING ACTIVE
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="bg-white p-8 rounded-xl shadow-sm border border-outline-variant/20 hover:shadow-lg transition-shadow duration-300">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h4 className="font-display font-bold text-lg text-primary">North Rail Link</h4>
                  <p className="text-outline text-xs mt-1">Industrial Hub Connector</p>
                </div>
                <span className="bg-secondary/10 text-secondary px-3 py-1 rounded text-xs font-bold uppercase">72% Complete</span>
              </div>
              <div className="progress-bar mb-6">
                <div className="progress-fill" style={{ width: '72%' }} />
              </div>
              <div className="grid grid-cols-3 gap-4 text-center text-sm font-semibold">
                <div>
                  <p className="text-xs text-outline uppercase mb-1">Cranes</p>
                  <p className="text-primary">12</p>
                </div>
                <div>
                  <p className="text-xs text-outline uppercase mb-1">Personnel</p>
                  <p className="text-primary">1.4k</p>
                </div>
                <div>
                  <p className="text-xs text-outline uppercase mb-1">Est. Completion</p>
                  <p className="text-primary">Q3 2025</p>
                </div>
              </div>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-sm border border-outline-variant/20 hover:shadow-lg transition-shadow duration-300">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h4 className="font-display font-bold text-lg text-primary">Maritime Port Expansion</h4>
                  <p className="text-outline text-xs mt-1">Strategic Deep-water Berth</p>
                </div>
                <span className="bg-secondary/10 text-secondary px-3 py-1 rounded text-xs font-bold uppercase">45% Complete</span>
              </div>
              <div className="progress-bar mb-6">
                <div className="progress-fill" style={{ width: '45%' }} />
              </div>
              <div className="grid grid-cols-3 gap-4 text-center text-sm font-semibold">
                <div>
                  <p className="text-xs text-outline uppercase mb-1">Dredgers</p>
                  <p className="text-primary">04</p>
                </div>
                <div>
                  <p className="text-xs text-outline uppercase mb-1">Concrete (m³)</p>
                  <p className="text-primary">850k</p>
                </div>
                <div>
                  <p className="text-xs text-outline uppercase mb-1">Est. Completion</p>
                  <p className="text-primary">Q2 2026</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-120px bg-surface-container-low border-t border-outline-variant/10">
        <div className="max-w-container-max mx-auto px-margin-desktop">
          <div className="text-center mb-12">
            <span className="font-display text-xs font-bold text-secondary uppercase tracking-widest block mb-2">Our People</span>
            <h2 className="font-display text-3xl md:text-4xl font-extrabold text-primary mb-4">Leadership & Experts</h2>
            <p className="font-sans text-on-surface-variant text-sm max-w-2xl mx-auto mb-8">
              Explore the professional minds driving safety, precision, and building excellence across GEO Group.
            </p>

            {/* Department Navigation Tabs */}
            <div className="flex flex-wrap justify-center gap-2 md:gap-4 p-1 bg-surface-container-high rounded-xl max-w-2xl mx-auto mb-12 border border-outline-variant/20">
              <button 
                onClick={() => setActiveTab('ARC')} 
                className={`px-5 py-2.5 rounded-lg font-display text-xs font-semibold transition-all ${activeTab === 'ARC' ? 'bg-primary text-on-primary shadow-md' : 'text-on-surface hover:bg-surface-container-highest'}`}
              >
                GEO ARC
              </button>
              <button 
                onClick={() => setActiveTab('SOIL')} 
                className={`px-5 py-2.5 rounded-lg font-display text-xs font-semibold transition-all ${activeTab === 'SOIL' ? 'bg-primary text-on-primary shadow-md' : 'text-on-surface hover:bg-surface-container-highest'}`}
              >
                GEO Soil Testing
              </button>
              <button 
                onClick={() => setActiveTab('CONSTRUCTION')} 
                className={`px-5 py-2.5 rounded-lg font-display text-xs font-semibold transition-all ${activeTab === 'CONSTRUCTION' ? 'bg-primary text-on-primary shadow-md' : 'text-on-surface hover:bg-surface-container-highest'}`}
              >
                GEO Construction
              </button>
            </div>
          </div>

          {/* Leaders Area (Main CEO + Department CEO) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-gutter max-w-4xl mx-auto mb-16">
            {/* Main CEO (Corporate) */}
            {globalCeo && (
              <div className="bg-white border border-outline-variant/30 rounded-2xl p-6 md:p-8 flex flex-col sm:flex-row gap-6 shadow-md hover:shadow-lg transition-shadow duration-300">
                <div className="w-full sm:w-1/3 aspect-[3/4] overflow-hidden rounded-xl bg-surface-container">
                  <img src={globalCeo.profileImage} alt={globalCeo.name} className="w-full h-full object-cover" />
                </div>
                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <span className="inline-block px-2.5 py-1 bg-secondary/10 text-secondary text-[9px] font-display font-semibold uppercase tracking-wider rounded-md mb-3">Group Leadership</span>
                    <h3 className="font-display text-xl font-bold text-primary">{globalCeo.name}</h3>
                    <p className="font-sans text-xs text-secondary font-semibold mt-1">{globalCeo.designation}</p>
                    <p className="font-sans text-xs text-on-surface-variant mt-4 leading-relaxed">{globalCeo.bio}</p>
                  </div>
                  {globalCeo.experience && (
                    <div className="pt-4 border-t border-outline-variant/10 text-[10px] text-outline font-semibold uppercase tracking-wider mt-4">
                      Experience: {globalCeo.experience}
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Department CEO/Head */}
            {activeDivisionCeo && (
              <div className="bg-white border border-outline-variant/30 rounded-2xl p-6 md:p-8 flex flex-col sm:flex-row gap-6 shadow-md hover:shadow-lg transition-shadow duration-300">
                <div className="w-full sm:w-1/3 aspect-[3/4] overflow-hidden rounded-xl bg-surface-container">
                  <img src={activeDivisionCeo.profileImage} alt={activeDivisionCeo.name} className="w-full h-full object-cover" />
                </div>
                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <span className="inline-block px-2.5 py-1 bg-primary-fixed/10 text-primary text-[9px] font-display font-semibold uppercase tracking-wider rounded-md mb-3">Department Head</span>
                    <h3 className="font-display text-xl font-bold text-primary">{activeDivisionCeo.name}</h3>
                    <p className="font-sans text-xs text-secondary font-semibold mt-1">{activeDivisionCeo.designation}</p>
                    <p className="font-sans text-xs text-on-surface-variant mt-4 leading-relaxed">{activeDivisionCeo.bio}</p>
                  </div>
                  {activeDivisionCeo.experience && (
                    <div className="pt-4 border-t border-outline-variant/10 text-[10px] text-outline font-semibold uppercase tracking-wider mt-4">
                      Experience: {activeDivisionCeo.experience}
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Division Members Grid */}
          <div>
            <h3 className="font-display text-lg font-bold text-primary mb-8 text-center">Division Experts & Engineers</h3>
            {activeDivisionMembers.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-gutter max-w-5xl mx-auto">
                {activeDivisionMembers.map((member) => (
                  <div key={member._id} className="group bg-white border border-outline-variant/20 rounded-xl p-6 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between">
                    <div>
                      <div className="relative aspect-[3/4] overflow-hidden rounded-lg mb-6 shadow-sm bg-surface-container">
                        <img 
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" 
                          src={member.profileImage}
                          alt={member.name}
                        />
                      </div>
                      <h4 className="font-display text-base font-bold text-primary">{member.name}</h4>
                      <p className="font-sans text-xs text-secondary font-semibold mt-1">{member.designation}</p>
                      <p className="font-sans text-xs text-on-surface-variant mt-3 leading-relaxed">{member.bio}</p>
                    </div>
                    {member.experience && (
                      <div className="pt-4 border-t border-outline-variant/10 text-[10px] text-outline font-semibold mt-4">
                        EXPERIENCE: {member.experience}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-center text-on-surface-variant text-sm font-sans">No additional team members listed for this division.</p>
            )}
          </div>
        </div>
      </section>

      {/* Media Gallery Section */}
      {gallery.length > 0 && (
        <section id="gallery" className="py-24 md:py-40 bg-surface border-t border-outline-variant/10">
          <div className="max-w-container-max mx-auto px-margin-desktop">
            <div className="text-center mb-16">
              <h2 className="font-display text-3xl font-bold text-primary mb-4">Construction & Operations Gallery</h2>
              <p className="font-sans text-sm text-on-surface-variant max-w-2xl mx-auto">Explore snapshots of active sites, heavy civil machinery, and completed architectural landmarks.</p>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {gallery.map((item) => (
                <div key={item._id} className="group relative overflow-hidden rounded-xl h-64 shadow-md bg-surface-container-low transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
                  <img 
                    src={item.url} 
                    alt={item.title} 
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" 
                  />
                  <div className="absolute inset-0 bg-primary/70 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                    <p className="text-white font-display font-semibold text-sm">{item.title}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
};

export default DivisionConstruction;

import React, { useState, useEffect } from 'react';
import API from '../services/api';
import SEO from '../components/SEO';
import SchemaMarkup from '../components/SchemaMarkup';
import Lightbox from '../components/Lightbox';
import { getMediaUrl } from '../services/media';
import ProjectDetailModal from '../components/ProjectDetailModal';

const DivisionConstruction = () => {
  const [company, setCompany] = useState(null);
  const [projects, setProjects] = useState([]);
  const [allTeam, setAllTeam] = useState([]);
  const activeTab = 'CONSTRUCTION';
  const [gallery, setGallery] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedMedia, setSelectedMedia] = useState(null);
  const [selectedProject, setSelectedProject] = useState(null);

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

  const activeOperations = company?.metadata?.activeOperations || [
    {
      name: company?.metadata?.op1Name || 'North Rail Link',
      subtitle: company?.metadata?.op1Subtitle || 'Industrial Hub Connector',
      progress: company?.metadata?.op1Progress !== undefined ? company.metadata.op1Progress : 72,
      stat1Label: company?.metadata?.op1Stat1Label || 'Cranes',
      stat1Val: company?.metadata?.op1Stat1Val || '12',
      stat2Label: company?.metadata?.op1Stat2Label || 'Personnel',
      stat2Val: company?.metadata?.op1Stat2Val || '1.4k',
      stat3Label: company?.metadata?.op1Stat3Label || 'Est. Completion',
      stat3Val: company?.metadata?.op1Stat3Val || 'Q3 2025',
      image: '',
      link: ''
    },
    {
      name: company?.metadata?.op2Name || 'Maritime Port Expansion',
      subtitle: company?.metadata?.op2Subtitle || 'Strategic Deep-water Berth',
      progress: company?.metadata?.op2Progress !== undefined ? company.metadata.op2Progress : 45,
      stat1Label: company?.metadata?.op2Stat1Label || 'Dredgers',
      stat1Val: company?.metadata?.op2Stat1Val || '04',
      stat2Label: company?.metadata?.op2Stat2Label || 'Concrete (m³)',
      stat2Val: company?.metadata?.op2Stat2Val || '850k',
      stat3Label: company?.metadata?.op2Stat3Label || 'Est. Completion',
      stat3Val: company?.metadata?.op2Stat3Val || 'Q2 2026',
      image: '',
      link: ''
    }
  ];

  const getImageUrl = getMediaUrl;

  const metaTitle = company?.seo?.metaTitle || 'GEO Construction | Infrastructure & Civil Engineering';
  const metaDescription = company?.seo?.metaDescription || 'Full-cycle building construction, infrastructure development, and project management by GEO Construction.';

  return (
    <div className="relative w-full pt-20">
      <SEO title={metaTitle} description={metaDescription} />
      <SchemaMarkup type="Service" data={{ name: 'GEO Construction Civil & Structural Engineering', description: metaDescription }} />

      {/* Hero Section */}
      <section className="relative h-screen min-h-[700px] flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          {company?.heroVideo ? (
            <video className="w-full h-full object-cover" autoPlay loop muted playsInline src={getMediaUrl(company.heroVideo)} />
          ) : (
            <img 
              className="w-full h-full object-cover" 
              src={getMediaUrl(company?.featuredImage) || "https://lh3.googleusercontent.com/aida-public/AB6AXuBPpuQBj18rx33YYWBnP1aKZrkDoa8ZGQe9sSUXt0DJyR0GxHJVlmAY_NbbHCR0zWOLS4FkNfaDaJu948FKC8OCPd0YlHvx067xCb9XmRcu8-EDR2WT1fOhbMkz75njMlcHUq5ei_4I3dMD_R0OBIF7i67LNv_kbHaM1rrk5dGABZmYUJIpgUYUSKgV61VZZiiiGnaNE9Izg2oidIde-j538_kHx5nfTOcsv-fHTNhdJ1RdGzrHMfhavTJwxVTppU4Jt-UGYcoRegg"}
              alt="GEO Heavy Civil Construction Site"
            />
          )}
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
      <section className="py-[160px] bg-surface-container-lowest border-b border-outline-variant/10">
        <div className="max-w-container-max mx-auto px-margin-desktop">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
            <div className="p-8 border-l-4 border-secondary bg-surface rounded-r-xl shadow-sm animate-float-slow cursor-pointer">
              <h3 className="text-primary font-display text-3xl font-bold mb-2">
                {company?.metadata?.stat1Val || '500+'}
              </h3>
              <p className="text-outline font-sans text-sm font-semibold">
                {company?.metadata?.stat1Label || 'Completed Projects'}
              </p>
            </div>
            <div className="p-8 border-l-4 border-secondary bg-surface rounded-r-xl shadow-sm animate-float-normal cursor-pointer">
              <h3 className="text-primary font-display text-3xl font-bold mb-2">
                {company?.metadata?.stat2Val || '12M'}
              </h3>
              <p className="text-outline font-sans text-sm font-semibold">
                {company?.metadata?.stat2Label || 'Safe Man Hours'}
              </p>
            </div>
            <div className="p-8 border-l-4 border-secondary bg-surface rounded-r-xl shadow-sm animate-float-fast cursor-pointer">
              <h3 className="text-primary font-display text-3xl font-bold mb-2">
                {company?.metadata?.stat3Val || '15'}
              </h3>
              <p className="text-outline font-sans text-sm font-semibold">
                {company?.metadata?.stat3Label || 'Global Locations'}
              </p>
            </div>
            <div className="p-8 border-l-4 border-secondary bg-surface rounded-r-xl shadow-sm animate-float-slow cursor-pointer">
              <h3 className="text-primary font-display text-3xl font-bold mb-2">
                {company?.metadata?.stat4Val || '$4B'}
              </h3>
              <p className="text-outline font-sans text-sm font-semibold">
                {company?.metadata?.stat4Label || 'Asset Portfolio'}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Portfolio Bento Grid */}
      <section id="landmarks" className="py-[200px] bg-surface">
        <div className="max-w-container-max mx-auto px-margin-desktop">
          <div className="text-center mb-24">
            <h2 className="font-display text-3xl font-bold text-primary mb-4">
              {company?.metadata?.landmarksTitle || 'Engineering Landmarks'}
            </h2>
            <p className="font-sans text-sm text-on-surface-variant max-w-2xl mx-auto">
              {company?.metadata?.landmarksSubtitle || 'A showcase of our multi-billion dollar infrastructure initiatives across the globe.'}
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
            {projects.length > 0 && (
              <>
                <div 
                  onClick={() => setSelectedProject(projects[0])}
                  className="md:col-span-8 relative h-[500px] rounded-xl overflow-hidden group animate-float-slow shadow-lg cursor-pointer"
                >
                  <img 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
                    src={getMediaUrl(projects[0].images[0]) || ''}
                    alt={projects[0].name}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-primary/95 to-transparent flex flex-col justify-end p-10">
                    <span className="text-secondary font-display font-semibold text-xs tracking-wider mb-2">CIVIL INFRASTRUCTURE</span>
                    <h3 className="text-white font-display text-2xl font-bold mb-4">{projects[0].name}</h3>
                    <p className="text-white/75 text-sm max-w-lg">{projects[0].description}</p>
                  </div>
                </div>
                <div className="md:col-span-4 flex flex-col gap-12">
                  {projects.slice(1, 3).map((proj, idx) => (
                    <div 
                      key={proj._id} 
                      onClick={() => setSelectedProject(proj)}
                      className={`relative h-[238px] rounded-xl overflow-hidden group shadow-md cursor-pointer ${idx === 0 ? 'animate-float-normal' : 'animate-float-fast'}`}
                    >
                      <img 
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" 
                        src={getMediaUrl(proj.images[0]) || ''}
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
      <section id="timeline" className="py-[160px] bg-surface-container-low border-y border-outline-variant/10 relative overflow-hidden">
        <div className="max-w-container-max mx-auto px-margin-desktop relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-24">
            <h2 className="font-display text-3xl font-bold text-primary mb-6">
              {company?.metadata?.lifecycleTitle || 'The Lifecycle of Excellence'}
            </h2>
            <p className="font-sans text-sm text-on-surface-variant leading-relaxed">
              {company?.metadata?.lifecycleSubtitle || 'Our phased approach ensures stability and accountability at every milestone of the project delivery.'}
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 pt-8">
            {/* Step 1 */}
            <div className="relative group animate-float-slow cursor-pointer bg-white border border-outline-variant/30 rounded-2xl p-8 shadow-md pt-12 flex flex-col justify-between">
              <div className="absolute -top-6 left-8 w-12 h-12 rounded-full bg-primary text-on-primary flex items-center justify-center font-display font-bold text-lg shadow-md transition-transform group-hover:scale-110">1</div>
              <div>
                <h3 className="font-display text-xl font-bold text-primary mb-4">
                  {company?.metadata?.phase1Title || 'Phase 01: Pre-Construction & Analysis'}
                </h3>
                <p className="font-sans text-sm text-on-surface-variant mb-6 leading-relaxed">
                  {company?.metadata?.phase1Desc || 'Feasibility studies, soil analysis, and advanced structural modeling using proprietary GEO datasets.'}
                </p>
              </div>
              <div className="flex items-center gap-2 text-secondary font-display font-semibold text-xs mt-auto">
                <span className="material-symbols-outlined text-[18px]">edit</span>
                Pre-Construction
              </div>
            </div>
            {/* Step 2 */}
            <div className="relative group animate-float-normal cursor-pointer bg-white border border-outline-variant/30 rounded-2xl p-8 shadow-md pt-12 flex flex-col justify-between">
              <div className="absolute -top-6 left-8 w-12 h-12 rounded-full bg-secondary text-on-primary flex items-center justify-center font-display font-bold text-lg shadow-md transition-transform group-hover:scale-110">2</div>
              <div>
                <h3 className="font-display text-xl font-bold text-primary mb-4">
                  {company?.metadata?.phase2Title || 'Phase 02: Structural Groundwork'}
                </h3>
                <p className="font-sans text-sm text-on-surface-variant mb-6 leading-relaxed">
                  {company?.metadata?.phase2Desc || 'Deep foundation engineering, earth retention systems, and site utilities installation.'}
                </p>
              </div>
              <div className="flex items-center gap-2 text-secondary font-display font-semibold text-xs mt-auto">
                <span className="material-symbols-outlined text-[18px]">foundation</span>
                Groundwork
              </div>
            </div>
            {/* Step 3 */}
            <div className="relative group animate-float-fast cursor-pointer bg-white border border-outline-variant/30 rounded-2xl p-8 shadow-md pt-12 flex flex-col justify-between">
              <div className="absolute -top-6 left-8 w-12 h-12 rounded-full bg-emerald-600 text-white flex items-center justify-center font-display font-bold text-lg shadow-md transition-transform group-hover:scale-110">3</div>
              <div>
                <h3 className="font-display text-xl font-bold text-primary mb-4">
                  {company?.metadata?.phase3Title || 'Phase 03: Vertical Mobilization'}
                </h3>
                <p className="font-sans text-sm text-on-surface-variant mb-6 leading-relaxed">
                  {company?.metadata?.phase3Desc || 'Rapid erection of core structures using pre-fabricated elements and high-capacity cranes.'}
                </p>
              </div>
              <div className="flex items-center gap-2 text-secondary font-display font-semibold text-xs mt-auto">
                <span className="material-symbols-outlined text-[18px]">apartment</span>
                Mobilization
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Active Operations & Real-time Progress */}
      <section className="py-[160px] bg-surface-container-low border-t border-outline-variant/10">
        <div className="max-w-container-max mx-auto px-margin-desktop">
          <div className="flex flex-col sm:flex-row justify-between items-end mb-24 gap-6">
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
            {activeOperations.map((op, idx) => (
              <div key={idx} className={`bg-white p-8 rounded-xl shadow-sm border border-outline-variant/20 cursor-pointer flex flex-col justify-between ${idx === 0 ? 'animate-float-slow' : 'animate-float-normal'}`}>
                <div>
                  {op.image && (
                    <div className="w-full h-52 rounded-xl overflow-hidden mb-6 bg-surface-container shadow-inner">
                      <img src={getImageUrl(op.image)} alt={op.name} className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
                    </div>
                  )}

                  <div className="flex justify-between items-start mb-6">
                    <div>
                      <h4 className="font-display font-bold text-lg text-primary">
                        {op.name}
                      </h4>
                      <p className="text-outline text-xs mt-1 font-sans">
                        {op.subtitle}
                      </p>
                    </div>
                    <span className="bg-secondary/10 text-secondary px-3 py-1 rounded text-xs font-bold uppercase shrink-0">
                      {op.progress}% Complete
                    </span>
                  </div>

                  <div className="progress-bar mb-6">
                    <div className="progress-fill" style={{ width: `${op.progress}%` }} />
                  </div>

                  <div className="grid grid-cols-3 gap-4 text-center text-sm font-semibold mb-4">
                    {op.stat1Label && (
                      <div>
                        <p className="text-xs text-outline uppercase mb-1 font-sans">{op.stat1Label}</p>
                        <p className="text-primary font-display">{op.stat1Val}</p>
                      </div>
                    )}
                    {op.stat2Label && (
                      <div>
                        <p className="text-xs text-outline uppercase mb-1 font-sans">{op.stat2Label}</p>
                        <p className="text-primary font-display">{op.stat2Val}</p>
                      </div>
                    )}
                    {op.stat3Label && (
                      <div>
                        <p className="text-xs text-outline uppercase mb-1 font-sans">{op.stat3Label}</p>
                        <p className="text-primary font-display">{op.stat3Val}</p>
                      </div>
                    )}
                  </div>
                </div>

                {op.link && (
                  <div className="pt-4 border-t border-outline-variant/10 mt-auto">
                    <a 
                      href={op.link} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="text-secondary font-display font-semibold text-xs flex items-center gap-2 hover:gap-3 transition-all"
                    >
                      Explore Operation Page <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
                    </a>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>
      {/* Team Section */}
      <section className="py-[160px] bg-surface-container-low border-t border-outline-variant/10">
        <div className="max-w-container-max mx-auto px-margin-desktop">
          <div className="text-center mb-20">
            <span className="font-display text-xs font-bold text-secondary uppercase tracking-widest block mb-2">Our People</span>
            <h2 className="font-display text-3xl md:text-4xl font-extrabold text-primary mb-4">Leadership & Experts</h2>
            <p className="font-sans text-on-surface-variant text-sm max-w-2xl mx-auto mb-12">
              Explore the professional minds driving safety, precision, and building excellence across GEO Group.
            </p>
          </div>

          {/* Leaders Area (Main CEO + Department CEO) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-4xl mx-auto mb-24">
            {/* Main CEO (Corporate) */}
            {globalCeo && (
              <div className="bg-white border border-outline-variant/30 rounded-2xl p-6 md:p-8 flex flex-col sm:flex-row gap-6 animate-float-slow cursor-pointer">
                <div className="w-full sm:w-1/3 aspect-[3/4] overflow-hidden rounded-xl bg-surface-container">
                  <img src={getMediaUrl(globalCeo.profileImage)} alt={globalCeo.name} className="w-full h-full object-cover" />
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
              <div className="bg-white border border-outline-variant/30 rounded-2xl p-6 md:p-8 flex flex-col sm:flex-row gap-6 animate-float-normal cursor-pointer">
                <div className="w-full sm:w-1/3 aspect-[3/4] overflow-hidden rounded-xl bg-surface-container">
                  <img src={getMediaUrl(activeDivisionCeo.profileImage)} alt={activeDivisionCeo.name} className="w-full h-full object-cover" />
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
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10 max-w-5xl mx-auto">
                {activeDivisionMembers.map((member, idx) => (
                  <div key={member._id} className={`group bg-white border border-outline-variant/20 rounded-xl p-6 shadow-sm cursor-pointer flex flex-col justify-between ${idx % 3 === 0 ? 'animate-float-slow' : idx % 3 === 1 ? 'animate-float-normal' : 'animate-float-fast'}`}>
                    <div>
                      <div className="relative aspect-[3/4] overflow-hidden rounded-lg mb-6 shadow-sm bg-surface-container">
                        <img 
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" 
                          src={getMediaUrl(member.profileImage)}
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
        <section id="gallery" className="py-[160px] bg-surface border-t border-outline-variant/10">
          <div className="max-w-container-max mx-auto px-margin-desktop">
            <div className="text-center mb-24">
              <h2 className="font-display text-3xl font-bold text-primary mb-4">Construction & Operations Gallery</h2>
              <p className="font-sans text-sm text-on-surface-variant max-w-2xl mx-auto">Explore snapshots of active sites, heavy civil machinery, and completed architectural landmarks.</p>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-10">
              {gallery.map((item, idx) => (
                <div 
                  key={item._id} 
                  onClick={() => setSelectedMedia(item)}
                  className={`group relative overflow-hidden rounded-xl h-64 shadow-md bg-surface-container-low cursor-pointer ${idx % 3 === 0 ? 'animate-float-slow' : idx % 3 === 1 ? 'animate-float-normal' : 'animate-float-fast'}`}
                >
                  {item.type === 'video' ? (
                    <div className="w-full h-full relative">
                      <video 
                        src={item.url} 
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" 
                        muted 
                        playsInline
                      />
                      <div className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-black/40 transition-colors">
                        <span className="material-symbols-outlined text-white text-5xl opacity-80 group-hover:scale-110 transition-transform">play_circle</span>
                      </div>
                    </div>
                  ) : (
                    <img 
                      src={item.url} 
                      alt={item.title} 
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" 
                    />
                  )}
                  <div className="absolute inset-0 bg-primary/70 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                    <p className="text-white font-display font-semibold text-sm">{item.title}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      <Lightbox media={selectedMedia} onClose={() => setSelectedMedia(null)} />
      {selectedProject && <ProjectDetailModal project={selectedProject} onClose={() => setSelectedProject(null)} />}
    </div>
  );
};

export default DivisionConstruction;

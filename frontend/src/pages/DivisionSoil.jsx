import React, { useState, useEffect } from 'react';
import API from '../services/api';
import SEO from '../components/SEO';
import SchemaMarkup from '../components/SchemaMarkup';

const DivisionSoil = () => {
  const [company, setCompany] = useState(null);
  const [services, setServices] = useState([]);
  const [projects, setProjects] = useState([]);
  const [allTeam, setAllTeam] = useState([]);
  const activeTab = 'SOIL';
  const [gallery, setGallery] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSoilData = async () => {
      try {
        const [compRes, servRes, projRes, teamRes, galRes] = await Promise.all([
          API.get('/companies/geo-soil-testing'),
          API.get('/services?division=SOIL'),
          API.get('/projects?division=SOIL'),
          API.get('/team'),
          API.get('/gallery?division=SOIL')
        ]);

        if (compRes.data.success) setCompany(compRes.data.data);
        if (servRes.data.success) setServices(servRes.data.data);
        if (projRes.data.success) setProjects(projRes.data.data);
        if (teamRes.data.success) setAllTeam(teamRes.data.data);
        if (galRes.data.success) setGallery(galRes.data.data);
      } catch (err) {
        console.error('Error fetching GEO Soil Testing data:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchSoilData();
  }, []);

  const globalCeo = allTeam.find(m => m.division === 'GLOBAL');
  const activeDivisionCeo = allTeam.find(m => m.division === activeTab && m.designation.includes('CEO'));
  const activeDivisionMembers = allTeam.filter(m => m.division === activeTab && !m.designation.includes('CEO'));

  const metaTitle = company?.seo?.metaTitle || 'GEO Soil Testing | Geotechnical Services';
  const metaDescription = company?.seo?.metaDescription || 'Soil investigation, geotechnical engineering, laboratory testing, and site analysis by GEO Soil Testing.';

  return (
    <div className="relative w-full pt-20">
      <SEO title={metaTitle} description={metaDescription} />
      <SchemaMarkup type="Service" data={{ name: 'GEO Soil Testing & Geotechnical Analysis', description: metaDescription }} />

      {/* Hero Section */}
      <section className="relative pt-24 pb-20 md:pt-36 md:pb-28 bg-background overflow-hidden">
        <div className="max-w-container-max mx-auto px-margin-desktop relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/70 border border-emerald-500/30 text-emerald-700 font-display font-semibold text-xs shadow-sm">
                <span className="material-symbols-outlined text-[18px]">biotech</span>
                Precision Laboratory Services
              </div>
              <h1 className="font-display text-4xl md:text-5xl font-extrabold text-primary leading-tight">
                {company?.name || 'GEO Soil Testing'} <span className="text-secondary">Testing</span>
              </h1>
              <p className="font-sans text-on-surface-variant text-base md:text-lg leading-relaxed">
                {company?.description || 'Advanced geotechnical analysis and material characterization. Our ISO-certified laboratories provide the bedrock data required for global architectural and infrastructure marvels.'}
              </p>
              <div className="flex flex-wrap gap-4 pt-2">
                <a href="#methodology" className="bg-primary text-on-primary px-8 py-4 rounded-lg font-display font-semibold text-xs hover:shadow-lg transition-all">
                  Explore Capabilities
                </a>
                <a href="#equipment" className="border-2 border-primary text-primary px-8 py-4 rounded-lg font-display font-semibold text-xs hover:bg-primary/5 transition-all">
                  Our Instrumentation
                </a>
              </div>
            </div>
            <div className="relative">
              <div className="relative z-10 rounded-2xl overflow-hidden shadow-2xl emerald-glow">
                {company?.heroVideo ? (
                  <video className="w-full aspect-[4/3] object-cover" autoPlay loop muted playsInline src={company.heroVideo} />
                ) : (
                  <img 
                    className="w-full aspect-[4/3] object-cover" 
                    src={company?.featuredImage || "https://lh3.googleusercontent.com/aida-public/AB6AXuBHybj8pwKP8LgTw-lrqzjcaQz9Wc8Rmod1-KL-_J6C1bI0r83Jfwyw2iT5Hea7c1PxEO2iAVk7ccK4Net1fI2UvWI15E-9oy31g4y_cGN2guV56Etibfn5GybcgBBr-0MKkhjDtJkDzxasTYhSnkjwpsNvrhKkxfZqouCCgHQbnV6Sudp1JUXPbClnIhN_Cy9HPiiPGR6o_TDlwIByp6KTycKUowoqvPvfOCxfYTcZbBYPbmx9oymY-CxKYzctwlVpe93w9Eu-O-A"}
                    alt="GEO Triaxial Soil Testing Lab"
                  />
                )}
              </div>
              <div className="absolute -bottom-8 -left-8 glass-card p-6 rounded-xl shadow-xl z-20 max-w-[240px] border-l-4 border-emerald-500">
                <p className="font-display font-bold text-emerald-700 text-xs tracking-wider mb-1">ACCURACY RATE</p>
                <p className="font-display text-4xl font-extrabold text-primary">99.98%</p>
                <p className="text-[10px] font-sans text-on-surface-variant mt-2">Validated against international ASTM/BS standards.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Scientific Methodology Section */}
      <section id="methodology" className="py-24 md:py-40 bg-surface-container-low border-y border-outline-variant/10">
        <div className="max-w-container-max mx-auto px-margin-desktop">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <h2 className="font-display text-3xl font-bold text-primary mb-6">Scientific Methodology</h2>
            <p className="font-sans text-sm text-on-surface-variant leading-relaxed">Our end-to-end testing lifecycle ensures every sample is tracked, analyzed, and reported with surgical precision.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {/* Step 1 */}
            <div className="relative group">
              <div className="mb-8 relative">
                <div className="w-16 h-16 rounded-full bg-primary text-on-primary flex items-center justify-center font-display font-bold text-lg relative z-10 transition-transform group-hover:scale-110">1</div>
                <div className="hidden md:block absolute top-1/2 left-16 right-0 h-[2px] bg-outline-variant/30 -z-0" />
              </div>
              <h3 className="font-display text-xl font-bold text-primary mb-4">Sample Collection</h3>
              <p className="font-sans text-sm text-on-surface-variant">Rigorous on-site extraction using specialized drilling rigs, ensuring sample integrity from the moment it leaves the earth.</p>
              <div className="mt-4 flex items-center gap-2 text-emerald-600 font-display font-semibold text-xs">
                <span className="material-symbols-outlined text-[18px]">verified</span>
                Field Verification
              </div>
            </div>
            {/* Step 2 */}
            <div className="relative group">
              <div className="mb-8 relative">
                <div className="w-16 h-16 rounded-full bg-secondary text-on-primary flex items-center justify-center font-display font-bold text-lg relative z-10 transition-transform group-hover:scale-110">2</div>
                <div className="hidden md:block absolute top-1/2 left-16 right-0 h-[2px] bg-outline-variant/30 -z-0" />
              </div>
              <h3 className="font-display text-xl font-bold text-primary mb-4">Laboratory Analysis</h3>
              <p className="font-sans text-sm text-on-surface-variant">Multi-phasic testing including Triaxial, Direct Shear, and Consolidation tests performed in climate-controlled environments.</p>
              <div className="mt-4 flex items-center gap-2 text-emerald-600 font-display font-semibold text-xs">
                <span className="material-symbols-outlined text-[18px]">science</span>
                Advanced Spectroscopy
              </div>
            </div>
            {/* Step 3 */}
            <div className="relative group">
              <div className="mb-8">
                <div className="w-16 h-16 rounded-full bg-emerald-600 text-white flex items-center justify-center font-display font-bold text-lg relative z-10 transition-transform group-hover:scale-110">3</div>
              </div>
              <h3 className="font-display text-xl font-bold text-primary mb-4">Final Certification</h3>
              <p className="font-sans text-sm text-on-surface-variant">Data synthesis and comprehensive geotechnical reporting by chartered engineers for construction readiness.</p>
              <div className="mt-4 flex items-center gap-2 text-emerald-600 font-display font-semibold text-xs">
                <span className="material-symbols-outlined text-[18px]">assignment_turned_in</span>
                Compliance Verified
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Equipment Showcase (Bento Grid) */}
      <section id="equipment" className="py-24 md:py-40 bg-background">
        <div className="max-w-container-max mx-auto px-margin-desktop">
          <div className="flex flex-col sm:flex-row justify-between items-end mb-16 gap-8">
            <div className="max-w-2xl">
              <span className="font-display text-xs font-bold text-secondary tracking-widest uppercase">The Arsenal</span>
              <h2 className="font-display text-3xl font-bold text-primary mt-2">World-Class Instrumentation</h2>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-12 gap-gutter h-auto md:h-[650px]">
            <div className="md:col-span-8 rounded-2xl overflow-hidden relative group hover:scale-[1.01] transition-transform duration-300 shadow-lg">
              <img 
                className="w-full h-full object-cover" 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuAqWSc527K_R45c7K3sYFopSUmiaWG2mIPaELKOdLRO6hSH9zaVnSvMOrSDKcbaANJwjjiveM8kZLTsQp_2RrKzTnvdj0ylXKwTKhE-IvNRaDG3mjROvxudK1Xz9Na6mWU7C5Wv9ukUoJCgpdPYrFSwkYjNtuf1f9STKJnsat-1IE6twJ7pr6L0LkvefB5h-a5Mc1Gp7750kl1aunnCSigopPk41OdlOplnBPIIpdmlfNY51xIBa-8c6C7DKKICmloCn-7hWoPw8NY"
                alt="Triaxial Load Frames"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/80 to-transparent flex flex-col justify-end p-8">
                <h4 className="font-display text-xl font-bold text-white mb-2">Triaxial Load Frames</h4>
                <p className="text-white/80 font-sans text-sm max-w-md">Precision-engineered for stress-strain behavior analysis of soil specimens.</p>
              </div>
            </div>
            <div className="md:col-span-4 rounded-2xl overflow-hidden relative group hover:scale-[1.01] transition-transform duration-300 shadow-lg">
              <img 
                className="w-full h-full object-cover" 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuCzBGqpi1nBgcaVwEbUfKSl5MubXT2A63gFjPu4d4FVLhhjtl2fy65LyWLA8LsEGw_578KEXdFiidNgJkHaFDVX_c3h-XIVXTOhvj4LBYgtDtds_7emlcAXtLlsW2WAx6kQ1GBHddVal-mVsTYCwCGeM6G16HNNDrTCdz6C3ODA6dhgWcgNLyacG-Tey6YrNkBfhrR-3d4QR384SNgWhivDeGUSCLKtV8i_g_k7DvzX9VcwGotHCSn32rTSeYONpEBsOEHBhdflU2g"
                alt="Chemical Analysis"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/80 to-transparent flex flex-col justify-end p-8">
                <h4 className="font-display text-xl font-bold text-white">Chemical analysis profiling</h4>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Media Gallery Section */}
      {gallery.length > 0 && (
        <section id="gallery" className="py-24 md:py-40 bg-surface-container-lowest border-t border-outline-variant/10">
          <div className="max-w-container-max mx-auto px-margin-desktop">
            <div className="text-center mb-16">
              <h2 className="font-display text-3xl font-bold text-primary mb-4">Laboratory & Investigation Gallery</h2>
              <p className="font-sans text-sm text-on-surface-variant max-w-2xl mx-auto">Explore live captures of site excavations, core sample testing, and state-of-the-art instrumentation.</p>
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

      {/* Team Section */}
      <section className="py-120px bg-surface-container-low border-t border-outline-variant/10">
        <div className="max-w-container-max mx-auto px-margin-desktop">
          <div className="text-center mb-12">
            <span className="font-display text-xs font-bold text-secondary uppercase tracking-widest block mb-2">Our People</span>
            <h2 className="font-display text-3xl md:text-4xl font-extrabold text-primary mb-4">Leadership & Experts</h2>
            <p className="font-sans text-on-surface-variant text-sm max-w-2xl mx-auto mb-12">
              Explore the professional minds driving safety, precision, and geotechnical excellence across GEO Group.
            </p>
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

      {/* Reports Section & Data Integrity */}
      <section className="py-24 md:py-40 bg-primary text-on-primary">
        <div className="max-w-container-max mx-auto px-margin-desktop">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
            <div className="relative">
              <div className="aspect-[3/4] bg-white rounded-xl shadow-2xl p-12 text-primary relative z-10 flex flex-col justify-between">
                <div className="flex justify-between items-start">
                  <div className="w-16 h-16 bg-primary rounded flex items-center justify-center text-white">
                    <span className="material-symbols-outlined text-4xl">description</span>
                  </div>
                  <div className="text-right">
                    <p className="font-display text-[10px] font-bold opacity-50 uppercase tracking-widest">Report Code</p>
                    <p className="font-sans font-bold text-sm">GEO-SOIL-2026</p>
                  </div>
                </div>
                <div className="space-y-6">
                  <div className="h-4 bg-surface-container w-3/4 rounded" />
                  <div className="h-4 bg-surface-container w-full rounded" />
                  <div className="h-4 bg-surface-container w-5/6 rounded" />
                </div>
                <div className="text-right">
                  <p className="font-sans text-xs opacity-50 italic">Certified by</p>
                  <p className="font-display font-bold text-lg">Dr. Elias Vance</p>
                  <p className="text-[10px] text-on-surface-variant font-semibold">Chief Geotechnical Officer</p>
                </div>
              </div>
              <div className="absolute top-8 left-8 w-full h-full bg-white/10 rounded-xl -z-10 transform rotate-3" />
              <div className="absolute top-4 left-4 w-full h-full bg-white/5 rounded-xl -z-20 transform -rotate-2" />
            </div>
            <div className="space-y-10">
              <h2 className="font-display text-3xl md:text-4xl font-bold leading-tight">
                Data Integrity <span className="text-secondary-fixed">You Can Build On</span>
              </h2>
              <p className="font-sans opacity-85 leading-relaxed">
                Our reports are more than just numbers; they are the foundation of engineering confidence. We adhere to stringent global standards to ensure liability protection and structural permanence.
              </p>
              <ul className="space-y-6">
                {company?.certifications?.map((c, idx) => (
                  <li key={idx} className="flex gap-4 items-start">
                    <div className="w-8 h-8 rounded bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
                      <span className="material-symbols-outlined text-[20px]">check_circle</span>
                    </div>
                    <div>
                      <h4 className="font-display font-bold text-base text-white">{c.title}</h4>
                      <p className="text-white/60 text-xs mt-1">{c.subtitle}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default DivisionSoil;

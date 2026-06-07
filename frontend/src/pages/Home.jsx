import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import API from '../services/api';
import SEO from '../components/SEO';
import SchemaMarkup from '../components/SchemaMarkup';
import ThreeHeroBackground from '../components/ThreeHeroBackground';
import Lightbox from '../components/Lightbox';

const Home = () => {
  const [settings, setSettings] = useState(null);
  const [projects, setProjects] = useState([]);
  const [testimonials, setTestimonials] = useState([]);
  const [gallery, setGallery] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedMedia, setSelectedMedia] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [settingsRes, projectsRes, testimonialsRes, galleryRes] = await Promise.all([
          API.get('/companies/settings'),
          API.get('/projects?isPinnedHomepage=true'),
          API.get('/testimonials?division=GLOBAL'),
          API.get('/gallery?isPinnedHomepage=true'),
        ]);

        if (settingsRes.data.success) setSettings(settingsRes.data.data);
        if (projectsRes.data.success) setProjects(projectsRes.data.data);
        if (testimonialsRes.data.success) setTestimonials(testimonialsRes.data.data);
        if (galleryRes.data.success) setGallery(galleryRes.data.data);
      } catch (err) {
        console.error('Error fetching homepage data:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const metaTitle = settings?.seo?.metaTitle || 'GEO Group | Building the Future with Precision & Innovation';
  const metaDescription = settings?.seo?.metaDescription || 'A global conglomerate delivering excellence in architectural design, soil engineering, and large-scale infrastructure construction.';

  // Default Stats fallback
  const stats = settings?.homepage?.stats || [
    { label: 'Projects Completed', value: '500+' },
    { label: 'Global Clients', value: '120+' },
    { label: 'Years Excellence', value: '25+' },
    { label: 'Active Projects', value: '45+' }
  ];

  // Default Partners fallback
  const partners = settings?.homepage?.partners || [
    { name: 'PARTNER_A' },
    { name: 'PARTNER_B' },
    { name: 'PARTNER_C' },
    { name: 'PARTNER_D' },
    { name: 'PARTNER_E' },
    { name: 'PARTNER_F' }
  ];

  return (
    <div className="relative w-full">
      <SEO title={metaTitle} description={metaDescription} />
      <SchemaMarkup type="Organization" data={{ email: settings?.contactEmail, phone: settings?.contactPhone, linkedin: settings?.socialLinks?.linkedin, twitter: settings?.socialLinks?.twitter }} />

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden">
        {settings?.homepage?.heroBgVideo ? (
          <video className="absolute inset-0 w-full h-full object-cover" autoPlay loop muted playsInline src={settings.homepage.heroBgVideo} />
        ) : settings?.homepage?.heroBgImage ? (
          <img className="absolute inset-0 w-full h-full object-cover" src={settings.homepage.heroBgImage} alt="Hero Background" />
        ) : (
          <ThreeHeroBackground />
        )}
        <div className="absolute inset-0 bg-gradient-to-b from-primary/40 to-background/90 z-10" />
        <div className="relative z-20 max-w-container-max mx-auto px-margin-desktop text-center">
          <h1 className="font-display text-4xl md:text-6xl font-extrabold text-primary mb-6 max-w-4xl mx-auto leading-tight">
            {settings?.homepage?.heroTitle || 'Building the Future with Precision & Innovation'}
          </h1>
          <p className="font-sans text-lg md:text-xl text-on-surface-variant mb-10 max-w-2xl mx-auto leading-relaxed">
            {settings?.homepage?.heroSubtitle || 'A global conglomerate delivering excellence in architectural design, soil engineering, and large-scale infrastructure construction.'}
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <a href="#divisions" className="bg-primary text-on-primary text-center px-10 py-5 rounded-lg font-display font-semibold hover:scale-105 transition-all duration-300 shadow-xl w-full sm:w-auto">
              Explore Companies
            </a>
            <Link to="/contact" className="border-2 border-primary text-primary text-center px-10 py-5 rounded-lg font-display font-semibold hover:bg-primary/5 transition-all duration-300 w-full sm:w-auto">
              Contact Us
            </Link>
          </div>
        </div>
      </section>

      {/* Bento Divisions Grid */}
      <section id="divisions" className="py-160px bg-surface-container-lowest">
        <div className="max-w-container-max mx-auto px-margin-desktop">
          <div className="mb-16 text-center">
            <h2 className="font-display text-3xl font-bold text-primary mb-4">Our Core Divisions</h2>
            <div className="h-1 w-20 bg-secondary mx-auto"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-gutter">
            {/* GEO ARC */}
            <div className="glass-card rounded-xl sky-glow hover:-translate-y-2 transition-all duration-500 flex flex-col items-center text-center p-10 group">
              <div className="w-16 h-16 bg-primary-fixed rounded-full flex items-center justify-center mb-8 group-hover:bg-secondary-container transition-colors duration-300">
                <span className="material-symbols-outlined text-4xl text-primary" data-icon="architecture">architecture</span>
              </div>
              <h3 className="font-display text-2xl font-bold text-primary mb-4">GEO ARC</h3>
              <p className="font-sans text-on-surface-variant mb-8 text-sm">Pioneering architectural solutions that blend aesthetic elegance with functional sustainability for modern urban landscapes.</p>
              <Link to="/geo-arc" className="text-secondary font-display font-semibold flex items-center gap-2 group-hover:gap-4 transition-all">
                View Details <span className="material-symbols-outlined">arrow_forward</span>
              </Link>
            </div>
            {/* GEO Soil Testing */}
            <div className="glass-card rounded-xl sky-glow hover:-translate-y-2 transition-all duration-500 flex flex-col items-center text-center p-10 group">
              <div className="w-16 h-16 bg-primary-fixed rounded-full flex items-center justify-center mb-8 group-hover:bg-secondary-container transition-colors duration-300">
                <span className="material-symbols-outlined text-4xl text-primary" data-icon="science">science</span>
              </div>
              <h3 className="font-display text-2xl font-bold text-primary mb-4">GEO Soil Testing</h3>
              <p className="font-sans text-on-surface-variant mb-8 text-sm">Specialized geotechnical analysis ensuring the foundational integrity of complex engineering projects worldwide.</p>
              <Link to="/geo-soil-testing" className="text-secondary font-display font-semibold flex items-center gap-2 group-hover:gap-4 transition-all">
                View Details <span className="material-symbols-outlined">arrow_forward</span>
              </Link>
            </div>
            {/* GEO Construction */}
            <div className="glass-card rounded-xl sky-glow hover:-translate-y-2 transition-all duration-500 flex flex-col items-center text-center p-10 group">
              <div className="w-16 h-16 bg-primary-fixed rounded-full flex items-center justify-center mb-8 group-hover:bg-secondary-container transition-colors duration-300">
                <span className="material-symbols-outlined text-4xl text-primary" data-icon="home_work">home_work</span>
              </div>
              <h3 className="font-display text-2xl font-bold text-primary mb-4">GEO Construction</h3>
              <p className="font-sans text-on-surface-variant mb-8 text-sm">Full-cycle construction management for commercial and industrial infrastructures, delivered with unmatched precision.</p>
              <Link to="/geo-construction" className="text-secondary font-display font-semibold flex items-center gap-2 group-hover:gap-4 transition-all">
                View Details <span className="material-symbols-outlined">arrow_forward</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* About Company Intro */}
      <section className="py-160px relative overflow-hidden bg-background">
        <div className="max-w-container-max mx-auto px-margin-desktop grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <div className="relative">
            <div className="rounded-2xl overflow-hidden shadow-2xl relative z-10">
              {settings?.homepage?.aboutVideo ? (
                <video 
                  className="w-full h-[600px] object-cover" 
                  autoPlay loop muted playsInline 
                  src={settings.homepage.aboutVideo} 
                />
              ) : (
                <img 
                  alt="Modern Office Building" 
                  className="w-full h-[600px] object-cover" 
                  src={settings?.homepage?.aboutImage || "https://lh3.googleusercontent.com/aida-public/AB6AXuADKyVl4iPTgTKT8axz8gBGKuewZn0RCuFzYfdrGN1Gpz_1bVxb39HnR98tXTwBc-IeWTO16klJ7Z--rPiJcLLNtSbO7POXjbMvJ9CwymSdXr9nGamfwfY13SUUTwEpVz_GnPqSM7XfPzgl_dNxH7J4N58PB4EIIZ4hElO94C5kcuhIIHZpnA_RZv7SKXzAaBnoP3024vt2KUn87JCyBbvOJjhtI_HiFb5JmGRm5CcjhftUIgGz7khfY3andNCd2Ar56-DytXvH0B4"}
                />
              )}
            </div>
            <div className="absolute -bottom-8 -right-8 w-64 h-64 bg-secondary/10 rounded-2xl -z-10 animate-pulse" />
          </div>
          <div>
            <span className="font-display text-xs font-bold text-secondary tracking-widest uppercase mb-4 block">About GEO Group</span>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-primary mb-6">{settings?.homepage?.aboutTitle || 'Established Excellence in Global Infrastructure'}</h2>
            <p className="font-sans text-on-surface-variant mb-8 leading-relaxed">
              {settings?.homepage?.aboutText || 'With over two decades of experience, GEO Group of Companies has stood as a pillar of reliability in the construction and engineering sectors. We integrate cutting-edge technology with traditional craftsmanship to deliver projects that shape the skylines of tomorrow.'}
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-surface-container flex items-center justify-center">
                  <span className="material-symbols-outlined text-secondary" data-icon="rocket_launch">rocket_launch</span>
                </div>
                <div>
                  <h4 className="font-display font-bold text-primary mb-2">Our Mission</h4>
                  <p className="font-sans text-xs text-on-surface-variant">{settings?.homepage?.aboutMission || 'To define new standards in sustainable construction and technical precision.'}</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-surface-container flex items-center justify-center">
                  <span className="material-symbols-outlined text-secondary" data-icon="visibility">visibility</span>
                </div>
                <div>
                  <h4 className="font-display font-bold text-primary mb-2">Our Vision</h4>
                  <p className="font-sans text-xs text-on-surface-variant">{settings?.homepage?.aboutVision || 'Becoming the global leader in integrated engineering and architectural services.'}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Live Statistics */}
      <section className="py-24 bg-primary text-on-primary">
        <div className="max-w-container-max mx-auto px-margin-desktop">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-12 text-center">
            {stats.map((stat, idx) => (
              <div key={idx} className="space-y-2">
                <div className="text-4xl md:text-5xl font-extrabold text-secondary-fixed">{stat.value}</div>
                <div className="font-display text-[10px] md:text-xs uppercase tracking-wider text-outline-variant">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Dynamic Pinned Portfolio */}
      <section className="py-160px bg-background">
        <div className="max-w-container-max mx-auto px-margin-desktop">
          <div className="flex flex-col sm:flex-row justify-between items-end mb-16 gap-8">
            <div>
              <h2 className="font-display text-3xl font-bold text-primary mb-4">Signature Projects</h2>
              <p className="font-sans text-on-surface-variant text-sm">Highlighting our recent milestones in luxury architecture and heavy infrastructure.</p>
            </div>
            <Link to="/geo-construction" className="border-b-2 border-primary pb-1 text-primary font-display font-semibold hover:text-secondary hover:border-secondary transition-all">
              View Full Portfolio
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-gutter">
            {projects.length > 0 ? (
              <>
                {/* Large Featured Card */}
                <div className="md:col-span-8 relative group overflow-hidden rounded-2xl h-[500px]">
                  <img 
                    alt={projects[0].name} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
                    src={projects[0].images[0] || ''}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-primary via-transparent to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />
                  <div className="absolute bottom-0 left-0 p-10">
                    <span className="bg-secondary-container text-on-secondary-container px-3 py-1 rounded-full text-xs font-bold mb-4 inline-block">{projects[0].category}</span>
                    <h3 className="font-display text-2xl md:text-3xl font-bold text-white mb-2">{projects[0].name}</h3>
                    <p className="text-white/80 text-sm">{projects[0].description}</p>
                  </div>
                </div>

                {/* Side grid cards */}
                <div className="md:col-span-4 flex flex-col gap-gutter">
                  {projects.slice(1, 3).map((proj, i) => (
                    <div key={proj._id} className="relative group overflow-hidden rounded-2xl flex-1 h-[238px]">
                      <img 
                        alt={proj.name} 
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
                        src={proj.images[0] || ''}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-primary/80 to-transparent" />
                      <div className="absolute bottom-0 left-0 p-6">
                        <span className="bg-tertiary-fixed text-on-tertiary-fixed px-3 py-1 rounded-full text-xs font-bold mb-2 inline-block">{proj.category}</span>
                        <h4 className="font-display font-semibold text-white text-lg">{proj.name}</h4>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            ) : (
              <p className="col-span-12 text-center text-on-surface-variant py-10">No projects currently pinned to the homepage.</p>
            )}
          </div>
        </div>
      </section>

      {/* Testimonials and Partners */}
      <section className="py-160px bg-surface-container-low">
        <div className="max-w-container-max mx-auto px-margin-desktop">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="font-display text-3xl font-bold text-primary mb-8">
                {settings?.metadata?.testimonialTitle || 'What Global Leaders Say'}
              </h2>
              <div className="space-y-8">
                {testimonials.map((t, index) => (
                  <div key={index} className="bg-white p-8 rounded-xl shadow-lg border-l-4 border-secondary">
                    <p className="italic font-sans text-on-surface-variant mb-6 text-lg">"{t.review}"</p>
                    <div className="flex items-center gap-4">
                      {t.image && (
                        <div className="w-12 h-12 rounded-full overflow-hidden">
                          <img src={t.image} alt={t.clientName} className="w-full h-full object-cover" />
                        </div>
                      )}
                      <div>
                        <div className="font-display font-bold text-primary">{t.clientName}</div>
                        <div className="text-sm text-secondary">{t.position}, {t.company}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Partner list */}
            <div className="grid grid-cols-3 gap-8 grayscale opacity-50">
              {partners.map((partner, idx) => (
                <div key={idx} className="flex items-center justify-center p-4 bg-white rounded-lg shadow-sm">
                  <span className="font-display font-bold text-lg md:text-xl text-primary/40">{partner.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Pinned Gallery Showcase */}
      {gallery.length > 0 && (
        <section className="py-160px bg-background border-t border-outline-variant/10">
          <div className="max-w-container-max mx-auto px-margin-desktop">
            <div className="text-center mb-16">
              <span className="font-display text-xs font-bold text-secondary uppercase tracking-widest block mb-2">Visual Showcase</span>
              <h2 className="font-display text-3xl md:text-4xl font-extrabold text-primary mb-4">GEO Group Gallery</h2>
              <p className="font-sans text-on-surface-variant text-sm max-w-2xl mx-auto">
                Explore real-time physical snapshots and high-fidelity project captures from across our architectural and construction divisions.
              </p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {gallery.map((item) => (
                <div 
                  key={item._id} 
                  onClick={() => setSelectedMedia(item)}
                  className="group relative overflow-hidden rounded-xl h-64 shadow-md bg-surface-container-low transition-all duration-300 hover:-translate-y-1 hover:shadow-lg cursor-pointer"
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
                  <div className="absolute inset-0 bg-primary/70 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                    <span className="text-secondary font-display text-[9px] uppercase tracking-wider mb-1 font-semibold">{item.division} DIVISION</span>
                    <p className="text-white font-display font-semibold text-sm">{item.title}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Interactive Contact CTA Banner */}
      <section className="py-160px bg-background">
        <div className="max-w-container-max mx-auto px-margin-desktop">
          <div className="bg-primary rounded-3xl p-12 md:p-20 relative overflow-hidden text-center text-on-primary shadow-2xl">
            <div className="relative z-10">
              <h2 className="font-display text-3xl md:text-4xl font-bold mb-6">
                {settings?.metadata?.ctaTitle || 'Ready to Start Your Next Milestone?'}
              </h2>
              <p className="font-sans text-lg opacity-80 max-w-2xl mx-auto mb-10">
                {settings?.metadata?.ctaSubtitle || 'Consult with our experts across Architectural Design, Geotechnical Engineering, and Infrastructure Construction.'}
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                <Link to="/contact" className="bg-secondary text-white px-10 py-5 rounded-lg font-display font-semibold hover:bg-secondary/90 transition-all flex items-center justify-center gap-3 w-full sm:w-auto">
                  <span className="material-symbols-outlined">mail</span> {settings?.metadata?.ctaContactText || 'Contact Us Now'}
                </Link>
                <a href={`https://wa.me/${(settings?.whatsappNumber || '971500000000').replace(/\D/g, '')}`} target="_blank" rel="noopener noreferrer" className="bg-[#25D366] text-white px-10 py-5 rounded-lg font-display font-semibold hover:opacity-90 transition-all flex items-center justify-center gap-3 w-full sm:w-auto">
                  <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"></path></svg>
                  {settings?.metadata?.ctaWhatsappText || 'WhatsApp Us'}
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Lightbox media={selectedMedia} onClose={() => setSelectedMedia(null)} />
    </div>
  );
};

export default Home;

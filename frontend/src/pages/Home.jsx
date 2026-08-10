import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import API from '../services/api';
import SEO from '../components/SEO';
import SchemaMarkup from '../components/SchemaMarkup';
import ThreeHeroBackground from '../components/ThreeHeroBackground';
import Lightbox from '../components/Lightbox';
import { getMediaUrl } from '../services/media';
import ProjectDetailModal from '../components/ProjectDetailModal';
import Reveal from '../components/Reveal';
import CountUp from '../components/CountUp';

const Home = () => {
  const [settings, setSettings] = useState(null);
  const [projects, setProjects] = useState([]);
  const [testimonials, setTestimonials] = useState([]);
  const [gallery, setGallery] = useState([]);
  const [arcGalleryProjects, setArcGalleryProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedMedia, setSelectedMedia] = useState(null);
  const [selectedProject, setSelectedProject] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [settingsRes, projectsRes, testimonialsRes, galleryRes, arcGalleryRes] = await Promise.all([
          API.get('/companies/settings'),
          API.get('/projects?isPinnedHomepage=true'),
          API.get('/testimonials?division=GLOBAL'),
          API.get('/gallery?isPinnedHomepage=true'),
          API.get('/projects?division=ARC&isFeatured=true'),
        ]);
        if (settingsRes.data.success) setSettings(settingsRes.data.data);
        if (projectsRes.data.success) setProjects(projectsRes.data.data);
        if (testimonialsRes.data.success) setTestimonials(testimonialsRes.data.data);
        if (galleryRes.data.success) setGallery(galleryRes.data.data);
        if (arcGalleryRes.data.success) setArcGalleryProjects(arcGalleryRes.data.data);
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

  const stats = settings?.homepage?.stats || [
    { label: 'Projects Completed', value: '500+' },
    { label: 'Global Clients', value: '120+' },
    { label: 'Years Excellence', value: '25+' },
    { label: 'Active Projects', value: '45+' },
  ];

  const partners = settings?.homepage?.partners || [
    { name: 'PARTNER_A' }, { name: 'PARTNER_B' }, { name: 'PARTNER_C' },
    { name: 'PARTNER_D' }, { name: 'PARTNER_E' }, { name: 'PARTNER_F' },
  ];

  const showcaseItems = arcGalleryProjects.length > 0
    ? arcGalleryProjects.slice(0, 8).map((project) => ({
        ...project,
        showcaseType: 'project',
        url: project.images?.[0],
        title: project.name,
      }))
    : gallery.map((item) => ({ ...item, showcaseType: 'media' }));

  const divisions = [
    { to: '/geo-arc', icon: 'architecture', title: 'GEO ARC', desc: 'Pioneering architectural solutions that blend aesthetic elegance with functional sustainability for modern urban landscapes.' },
    { to: '/geo-soil-testing', icon: 'science', title: 'GEO Soil Testing', desc: 'Specialized geotechnical analysis ensuring the foundational integrity of complex engineering projects worldwide.' },
    { to: '/geo-construction', icon: 'home_work', title: 'GEO Construction', desc: 'Full-cycle construction management for commercial and industrial infrastructures, delivered with unmatched precision.' },
  ];

  return (
    <div className="relative w-full bg-ivory">
      <SEO title={metaTitle} description={metaDescription} />
      <SchemaMarkup type="Organization" data={{ email: settings?.contactEmail, phone: settings?.contactPhone, linkedin: settings?.socialLinks?.linkedin, twitter: settings?.socialLinks?.twitter }} />

      {/* ===== Hero ===== */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden luxe-dark">
        {settings?.homepage?.heroBgVideo ? (
          <video className="absolute inset-0 w-full h-full object-cover opacity-40" autoPlay loop muted playsInline src={getMediaUrl(settings.homepage.heroBgVideo)} />
        ) : settings?.homepage?.heroBgImage ? (
          <img className="absolute inset-0 w-full h-full object-cover opacity-40" src={getMediaUrl(settings.homepage.heroBgImage)} alt="Hero Background" decoding="async" fetchPriority="high" />
        ) : (
          <div className="absolute inset-0 opacity-60"><ThreeHeroBackground /></div>
        )}
        {/* Ink gradient veils */}
        <div className="absolute inset-0 bg-gradient-to-b from-ink/80 via-ink/60 to-ink z-10" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,rgba(201,162,39,0.10),transparent_55%)] z-10" />

        <div className="relative z-20 max-w-container-max mx-auto px-6 md:px-margin-desktop text-center pt-24">
          <div className="animate-fade-in mb-8 inline-flex items-center gap-3 px-5 py-2 rounded-full border border-gold/30 bg-ink-700/40 backdrop-blur-sm">
            <span className="w-1.5 h-1.5 rounded-full bg-gold animate-pulse" />
            <span className="text-champagne/90 text-[11px] tracking-luxe uppercase font-medium">Est. Global Infrastructure Excellence</span>
          </div>

          <h1 className="font-display text-4xl md:text-7xl font-bold text-ivory mb-6 max-w-5xl mx-auto leading-[1.08] animate-fade-up">
            {settings?.homepage?.heroTitle || (
              <>Building the Future with <span className="text-gradient-gold italic">Precision</span> &amp; <span className="text-gradient-gold italic">Innovation</span></>
            )}
          </h1>
          <p className="font-sans text-base md:text-xl text-luxury-muted mb-10 max-w-2xl mx-auto leading-relaxed animate-fade-up" style={{ animationDelay: '120ms' }}>
            {settings?.homepage?.heroSubtitle || 'A global conglomerate delivering excellence in architectural design, soil engineering, and large-scale infrastructure construction.'}
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-5 animate-fade-up" style={{ animationDelay: '240ms' }}>
            <a href="#divisions" className="btn-gold px-10 py-4 rounded-full font-semibold uppercase tracking-wider text-sm w-full sm:w-auto">
              Explore Divisions
            </a>
            <Link to="/contact" className="btn-outline-gold px-10 py-4 rounded-full font-semibold uppercase tracking-wider text-sm w-full sm:w-auto">
              Request Consultation
            </Link>
          </div>
        </div>

        {/* Scroll cue */}
        <a href="#divisions" className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2 text-gold/70 hover:text-gold transition-colors">
          <span className="text-[10px] uppercase tracking-luxe">Scroll</span>
          <span className="material-symbols-outlined animate-bounce">keyboard_arrow_down</span>
        </a>
      </section>

      {/* ===== Divisions ===== */}
      <section id="divisions" className="py-28 md:py-36 bg-ivory relative">
        <div className="max-w-container-max mx-auto px-6 md:px-margin-desktop">
          <Reveal className="mb-16 text-center">
            <p className="luxe-eyebrow center justify-center mb-4">Our Core Divisions</p>
            <h2 className="font-display text-3xl md:text-5xl font-bold text-ink">Three Pillars of <span className="text-gradient-gold italic">Excellence</span></h2>
          </Reveal>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {divisions.map((d, i) => (
              <Reveal key={d.to} delay={i * 120}>
                <div className="luxe-card rounded-2xl flex flex-col items-center text-center p-10 group h-full">
                  <div className="w-20 h-20 rounded-full bg-ink flex items-center justify-center mb-8 border border-gold/30 group-hover:shadow-luxe-gold transition-all duration-500">
                    <span className="material-symbols-outlined text-4xl text-gold">{d.icon}</span>
                  </div>
                  <h3 className="font-display text-2xl font-bold text-ink mb-4">{d.title}</h3>
                  <p className="font-sans text-on-surface-variant mb-8 text-sm leading-relaxed flex-grow">{d.desc}</p>
                  <Link to={d.to} className="text-gold-deep font-sans text-xs uppercase tracking-wider font-semibold flex items-center gap-2 group-hover:gap-4 transition-all">
                    View Division <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
                  </Link>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <div className="section-rule max-w-container-max mx-auto" />

      {/* ===== About ===== */}
      <section className="py-28 md:py-36 relative overflow-hidden bg-cream">
        <div className="max-w-container-max mx-auto px-6 md:px-margin-desktop grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <Reveal className="relative gold-frame">
            <div className="rounded-2xl overflow-hidden shadow-luxe relative z-10">
              {settings?.homepage?.aboutVideo ? (
                <video className="w-full h-[560px] object-cover" autoPlay loop muted playsInline src={getMediaUrl(settings.homepage.aboutVideo)} />
              ) : (
                <img alt="Modern architecture" className="w-full h-[560px] object-cover" src={getMediaUrl(settings?.homepage?.aboutImage) || 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?q=80&w=1200&auto=format&fit=crop'} loading="lazy" decoding="async" />
              )}
            </div>
            <div className="absolute -bottom-6 -right-6 w-40 h-40 border border-gold/40 rounded-2xl -z-0" />
          </Reveal>
          <Reveal delay={120}>
            <p className="luxe-eyebrow mb-4">About GEO Group</p>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-ink mb-6 leading-tight">{settings?.homepage?.aboutTitle || 'A Legacy Built on Precision & Trust'}</h2>
            <p className="font-sans text-on-surface-variant mb-8 leading-relaxed">
              {settings?.homepage?.aboutText || 'With over two decades of experience, GEO Group of Companies has stood as a pillar of reliability in the construction and engineering sectors. We integrate cutting-edge technology with traditional craftsmanship to deliver projects that shape the skylines of tomorrow.'}
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {[
                { icon: 'rocket_launch', title: 'Our Mission', text: settings?.homepage?.aboutMission || 'To define new standards in sustainable construction and technical precision.' },
                { icon: 'visibility', title: 'Our Vision', text: settings?.homepage?.aboutVision || 'Becoming the global leader in integrated engineering and architectural services.' },
              ].map((b) => (
                <div key={b.title} className="flex gap-4">
                  <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-ink flex items-center justify-center border border-gold/25">
                    <span className="material-symbols-outlined text-gold">{b.icon}</span>
                  </div>
                  <div>
                    <h4 className="font-display font-bold text-ink mb-1">{b.title}</h4>
                    <p className="font-sans text-xs text-on-surface-variant leading-relaxed">{b.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ===== Stats ===== */}
      <section className="py-24 luxe-dark luxe-grain relative">
        <div className="relative z-10 max-w-container-max mx-auto px-6 md:px-margin-desktop">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-10 text-center divide-gold/10 md:divide-x">
            {stats.map((stat, idx) => (
              <Reveal key={idx} delay={idx * 100} className="space-y-2">
                <div className="font-display text-4xl md:text-6xl font-bold text-gradient-gold">
                  <CountUp value={stat.value} />
                </div>
                <div className="font-sans text-[10px] md:text-xs uppercase tracking-luxe text-luxury-muted">{stat.label}</div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ===== Signature Projects ===== */}
      <section className="py-28 md:py-36 bg-ivory">
        <div className="max-w-container-max mx-auto px-6 md:px-margin-desktop">
          <Reveal className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-16 gap-6">
            <div>
              <p className="luxe-eyebrow mb-4">Portfolio</p>
              <h2 className="font-display text-3xl md:text-5xl font-bold text-ink">Signature <span className="text-gradient-gold italic">Projects</span></h2>
            </div>
            <Link to="/geo-arc" className="btn-outline-gold px-6 py-3 rounded-full text-xs uppercase tracking-wider font-semibold text-gold-deep border-gold-deep/40">
              View Full Portfolio
            </Link>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
            {projects.length > 0 ? (
              <>
                <Reveal className="md:col-span-8">
                  <div onClick={() => setSelectedProject(projects[0])} className="rounded-2xl overflow-hidden relative group shadow-luxe cursor-pointer h-full min-h-[400px]">
                    <img alt={projects[0].name} className="w-full h-full object-cover absolute inset-0 transition-transform duration-700 group-hover:scale-110" src={getMediaUrl(projects[0].images?.[0]) || ''} loading="lazy" decoding="async" />
                    <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/40 to-transparent flex flex-col justify-end p-8">
                      <span className="border border-gold/50 text-gold px-3 py-1 rounded-full text-[10px] uppercase tracking-wider font-semibold mb-4 inline-block w-fit">{projects[0].category}</span>
                      <h3 className="font-display text-2xl md:text-3xl font-bold text-ivory mb-2">{projects[0].name}</h3>
                      <p className="text-luxury-muted text-sm max-w-lg line-clamp-2">{projects[0].description}</p>
                    </div>
                  </div>
                </Reveal>
                <div className="md:col-span-4 flex flex-col gap-6">
                  {projects.slice(1, 3).map((proj) => (
                    <Reveal key={proj._id} delay={120} className="flex-1">
                      <div onClick={() => setSelectedProject(proj)} className="relative h-full min-h-[188px] rounded-2xl overflow-hidden group shadow-luxe cursor-pointer">
                        <img alt={proj.name} className="w-full h-full object-cover absolute inset-0 transition-transform duration-500 group-hover:scale-105" src={getMediaUrl(proj.images?.[0]) || ''} loading="lazy" decoding="async" />
                        <div className="absolute inset-0 bg-ink/60 group-hover:bg-ink/30 transition-all flex items-end p-6">
                          <div>
                            <span className="text-gold font-sans font-semibold text-[10px] uppercase tracking-wider block mb-1">{proj.category}</span>
                            <h4 className="text-ivory font-display font-bold text-lg">{proj.name}</h4>
                          </div>
                        </div>
                      </div>
                    </Reveal>
                  ))}
                </div>
              </>
            ) : (
              <p className="col-span-12 text-center text-on-surface-variant py-10">No projects currently pinned to the homepage.</p>
            )}
          </div>
        </div>
      </section>

      {/* ===== Testimonials + Partners ===== */}
      <section className="py-28 md:py-36 bg-cream">
        <div className="max-w-container-max mx-auto px-6 md:px-margin-desktop">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <Reveal>
              <p className="luxe-eyebrow mb-4">Testimonials</p>
              <h2 className="font-display text-3xl md:text-4xl font-bold text-ink mb-8">
                {settings?.metadata?.testimonialTitle || 'What Global Leaders Say'}
              </h2>
              <div className="space-y-6">
                {testimonials.length > 0 ? testimonials.map((t, index) => (
                  <div key={index} className="luxe-card bg-white/80 p-8 rounded-2xl relative">
                    <span className="material-symbols-outlined text-gold/30 text-5xl absolute top-4 right-6">format_quote</span>
                    <p className="font-cormorant italic text-xl text-ink/80 mb-6 leading-relaxed relative z-10">"{t.review}"</p>
                    <div className="flex items-center gap-4">
                      {t.image && <div className="w-12 h-12 rounded-full overflow-hidden border border-gold/40"><img src={t.image} alt={t.clientName} className="w-full h-full object-cover" loading="lazy" decoding="async" /></div>}
                      <div>
                        <div className="font-display font-bold text-ink">{t.clientName}</div>
                        <div className="text-sm text-gold-deep">{t.position}, {t.company}</div>
                      </div>
                    </div>
                  </div>
                )) : (
                  <div className="luxe-card bg-white/80 p-8 rounded-2xl">
                    <p className="font-cormorant italic text-xl text-ink/70">"GEO Group transformed our vision into a landmark. Precision, elegance, and reliability at every stage."</p>
                    <div className="mt-6 text-sm text-gold-deep">Featured Client Testimonial</div>
                  </div>
                )}
              </div>
            </Reveal>

            <Reveal delay={120}>
              <p className="luxe-eyebrow mb-6">Trusted By Industry Leaders</p>
              <div className="grid grid-cols-3 gap-4">
                {partners.map((partner, idx) => (
                  <div key={idx} className="flex items-center justify-center p-6 bg-white/70 rounded-xl border border-gold/15 hover:border-gold/40 transition-colors">
                    <span className="font-display font-bold text-base md:text-lg text-ink/40">{partner.name}</span>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ===== Gallery ===== */}
      {showcaseItems.length > 0 && (
        <section className="py-28 md:py-36 bg-ivory">
          <div className="max-w-container-max mx-auto px-6 md:px-margin-desktop">
            <Reveal className="text-center mb-16">
              <p className="luxe-eyebrow center justify-center mb-4">Visual Showcase</p>
              <h2 className="font-display text-3xl md:text-5xl font-bold text-ink mb-4">The <span className="text-gradient-gold italic">Gallery</span></h2>
              <p className="font-sans text-on-surface-variant text-sm max-w-2xl mx-auto">
                Selected architectural work from the GEO ARC project portfolio.
              </p>
            </Reveal>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
              {showcaseItems.map((item, idx) => (
                <Reveal key={item._id} delay={(idx % 4) * 80}>
                  <div
                    onClick={() => item.showcaseType === 'project' ? setSelectedProject(item) : setSelectedMedia(item)}
                    className="group relative overflow-hidden rounded-xl h-64 shadow-luxe-soft bg-cream cursor-pointer"
                  >
                    {item.showcaseType === 'media' && item.type === 'video' ? (
                      <div className="w-full h-full relative">
                        <video src={item.url} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" muted playsInline />
                        <div className="absolute inset-0 flex items-center justify-center bg-ink/20 group-hover:bg-ink/40 transition-colors">
                          <span className="material-symbols-outlined text-gold text-5xl opacity-90 group-hover:scale-110 transition-transform">play_circle</span>
                        </div>
                      </div>
                    ) : (
                      <img src={getMediaUrl(item.url)} alt={item.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" loading="lazy" decoding="async" />
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-ink/90 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                      <span className="text-gold font-sans text-[9px] uppercase tracking-wider mb-1 font-semibold">GEO {item.division || 'ARC'} Division</span>
                      <p className="text-ivory font-display font-semibold text-sm">{item.title}</p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ===== CTA ===== */}
      <section className="py-28 bg-cream">
        <div className="max-w-container-max mx-auto px-6 md:px-margin-desktop">
          <Reveal>
            <div className="luxe-dark luxe-grain rounded-3xl p-12 md:p-20 relative overflow-hidden text-center shadow-luxe">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(201,162,39,0.15),transparent_60%)]" />
              <div className="relative z-10">
                <p className="luxe-eyebrow center justify-center mb-6">Let's Build Together</p>
                <h2 className="font-display text-3xl md:text-5xl font-bold text-ivory mb-6 max-w-3xl mx-auto leading-tight">
                  {settings?.metadata?.ctaTitle || 'Ready to Start Your Next Milestone?'}
                </h2>
                <p className="font-sans text-base md:text-lg text-luxury-muted max-w-2xl mx-auto mb-10">
                  {settings?.metadata?.ctaSubtitle || 'Consult with our experts across Architectural Design, Geotechnical Engineering, and Infrastructure Construction.'}
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-5">
                  <Link to="/contact" className="btn-gold px-10 py-4 rounded-full font-semibold uppercase tracking-wider text-sm flex items-center justify-center gap-3 w-full sm:w-auto">
                    <span className="material-symbols-outlined">mail</span> {settings?.metadata?.ctaContactText || 'Contact Us Now'}
                  </Link>
                  <a href={`https://wa.me/${(settings?.whatsappNumber || '971500000000').replace(/\D/g, '')}`} target="_blank" rel="noopener noreferrer" className="btn-outline-gold px-10 py-4 rounded-full font-semibold uppercase tracking-wider text-sm flex items-center justify-center gap-3 w-full sm:w-auto">
                    <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884" /></svg>
                    {settings?.metadata?.ctaWhatsappText || 'WhatsApp Us'}
                  </a>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <Lightbox media={selectedMedia} onClose={() => setSelectedMedia(null)} />
      {selectedProject && <ProjectDetailModal project={selectedProject} onClose={() => setSelectedProject(null)} />}
    </div>
  );
};

export default Home;

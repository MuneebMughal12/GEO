import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import API from '../services/api';
import SEO from '../components/SEO';
import SchemaMarkup from '../components/SchemaMarkup';
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

  const partners = settings?.homepage?.partners || [];

  const showcaseItems = arcGalleryProjects.length > 0
    ? arcGalleryProjects.slice(0, 8).map((project) => ({
        ...project,
        showcaseType: 'project',
        url: project.images?.[0],
        title: project.name,
      }))
    : gallery.map((item) => ({ ...item, showcaseType: 'media' }));

  const heroImage = getMediaUrl(
    settings?.homepage?.heroBgImage ||
    arcGalleryProjects[0]?.images?.[0] ||
    projects[0]?.images?.[0]
  ) || 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=85&w=2200&auto=format&fit=crop';

  const divisions = [
    { to: '/geo-arc', number: '01', icon: 'architecture', title: 'GEO ARC', label: 'Architecture & Design', image: arcGalleryProjects[0]?.images?.[0] || 'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?q=85&w=1200&auto=format&fit=crop', desc: 'Pioneering architectural solutions that blend aesthetic elegance with functional sustainability for modern urban landscapes.' },
    { to: '/geo-soil-testing', number: '02', icon: 'science', title: 'GEO Soil Testing', label: 'Geotechnical Intelligence', image: 'https://images.unsplash.com/photo-1581094794329-c8112a89af12?q=85&w=1200&auto=format&fit=crop', desc: 'Specialized geotechnical analysis ensuring the foundational integrity of complex engineering projects worldwide.' },
    { to: '/geo-construction', number: '03', icon: 'home_work', title: 'GEO Construction', label: 'Build & Infrastructure', image: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?q=85&w=1200&auto=format&fit=crop', desc: 'Full-cycle construction management for commercial and industrial infrastructures, delivered with unmatched precision.' },
  ];

  const practices = [
    { icon: 'verified', title: 'Quality Without Compromise', text: 'Every drawing, test and build stage follows rigorous review standards.' },
    { icon: 'schedule', title: 'Delivery With Discipline', text: 'Clear milestones, transparent reporting and accountable project leadership.' },
    { icon: 'eco', title: 'Responsible by Design', text: 'Efficient systems and context-aware solutions reduce long-term impact.' },
    { icon: 'engineering', title: 'Integrated Expertise', text: 'Architecture, geotechnics and construction collaborate under one group.' },
  ];

  return (
    <div className="relative w-full bg-ivory">
      <SEO title={metaTitle} description={metaDescription} />
      <SchemaMarkup type="Organization" data={{ email: settings?.contactEmail, phone: settings?.contactPhone, linkedin: settings?.socialLinks?.linkedin, twitter: settings?.socialLinks?.twitter }} />

      {/* ===== Hero ===== */}
      <section className="relative min-h-[860px] md:min-h-screen flex items-center overflow-hidden bg-ink">
        {settings?.homepage?.heroBgVideo ? (
          <video className="absolute inset-0 w-full h-full object-cover" autoPlay loop muted playsInline src={getMediaUrl(settings.homepage.heroBgVideo)} />
        ) : (
          <img className="absolute inset-0 w-full h-full object-cover scale-[1.02]" src={heroImage} alt="GEO Group landmark project" decoding="async" fetchPriority="high" />
        )}
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(10,14,26,0.97)_0%,rgba(10,14,26,0.88)_42%,rgba(10,14,26,0.42)_72%,rgba(10,14,26,0.28)_100%)] z-10" />
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-transparent to-ink/25 z-10" />

        <div className="relative z-20 w-full max-w-container-max mx-auto px-6 md:px-margin-desktop pt-32 pb-56 md:pb-40">
          <div className="max-w-3xl border-l border-gold/70 pl-5 md:pl-9">
            <div className="animate-fade-in mb-7 inline-flex items-center gap-3 text-gold text-[11px] tracking-luxe uppercase font-semibold">
              <span className="w-10 h-px bg-gold" /> One Group. Three Disciplines.
            </div>
            <h1 className="font-display text-5xl sm:text-6xl md:text-[78px] font-bold text-ivory mb-7 leading-[0.98] tracking-[-0.035em] animate-fade-up">
              <>Architecture. Engineering.<br /><span className="text-gradient-gold">Construction.</span></>
            </h1>
            <p className="font-sans text-base md:text-lg text-champagne/75 mb-10 max-w-xl leading-relaxed animate-fade-up" style={{ animationDelay: '120ms' }}>
              {settings?.homepage?.heroSubtitle || 'Architecture, geotechnical intelligence and construction expertise—integrated to deliver confident outcomes from concept to completion.'}
            </p>
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 animate-fade-up" style={{ animationDelay: '240ms' }}>
              <a href="#divisions" className="btn-gold px-9 py-4 rounded-md font-semibold uppercase tracking-wider text-xs text-center">
                Explore Our Expertise
              </a>
              <Link to="/contact" className="border border-white/35 bg-white/5 hover:bg-white/10 text-ivory px-9 py-4 rounded-md font-semibold uppercase tracking-wider text-xs text-center transition-all">
                Start a Project
              </Link>
            </div>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 z-20">
          <div className="max-w-container-max mx-auto md:px-margin-desktop">
            <div className="grid grid-cols-3 bg-ivory/95 backdrop-blur-xl border-t border-gold/30 shadow-2xl">
              {[
                ['01', 'Architecture', 'Vision-led environments'],
                ['02', 'Soil Testing', 'Evidence-led foundations'],
                ['03', 'Construction', 'Precision-led delivery'],
              ].map(([number, title, subtitle]) => (
                <a key={number} href="#divisions" className="group px-4 py-6 md:px-8 md:py-8 border-r last:border-r-0 border-ink/10 hover:bg-gold transition-colors">
                  <span className="block text-[10px] tracking-luxe text-gold-deep group-hover:text-ink/60 mb-2">{number}</span>
                  <strong className="block font-display text-base md:text-xl text-ink">{title}</strong>
                  <span className="hidden md:block text-xs text-on-surface-variant group-hover:text-ink/70 mt-1">{subtitle}</span>
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ===== Divisions ===== */}
      <section id="divisions" className="py-24 md:py-32 bg-ink relative">
        <div className="max-w-container-max mx-auto px-6 md:px-margin-desktop">
          <Reveal className="mb-14 md:mb-16 grid md:grid-cols-2 gap-6 items-end">
            <div>
              <p className="luxe-eyebrow mb-4">Our Core Divisions</p>
              <h2 className="font-display text-4xl md:text-6xl font-bold text-ivory leading-[1.04]">One vision.<br /><span className="text-gradient-gold">Complete expertise.</span></h2>
            </div>
            <p className="font-sans text-champagne/65 md:pl-12 md:border-l border-gold/30 leading-relaxed max-w-xl">From the first line on paper to the final structure on site, our specialist divisions work together to solve complex challenges with clarity.</p>
          </Reveal>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {divisions.map((d, i) => (
              <Reveal key={d.to} delay={i * 120}>
                <Link to={d.to} className="relative block h-[520px] overflow-hidden group bg-ink shadow-luxe">
                  <img src={getMediaUrl(d.image)} alt={d.title} className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" loading="lazy" decoding="async" />
                  <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/35 to-ink/5" />
                  <div className="absolute top-6 left-6 right-6 flex items-center justify-between text-ivory">
                    <span className="text-[11px] tracking-luxe text-gold">{d.number}</span>
                    <span className="material-symbols-outlined w-11 h-11 border border-white/30 flex items-center justify-center rounded-full backdrop-blur-sm group-hover:bg-gold group-hover:text-ink group-hover:border-gold transition-all">{d.icon}</span>
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 p-7 md:p-8 translate-y-16 group-hover:translate-y-0 transition-transform duration-500">
                    <span className="text-gold text-[10px] uppercase tracking-luxe font-semibold">{d.label}</span>
                    <h3 className="font-display text-3xl font-bold text-ivory mt-2 mb-4">{d.title}</h3>
                    <p className="font-sans text-champagne/75 text-sm leading-relaxed mb-5 opacity-0 group-hover:opacity-100 transition-opacity duration-500">{d.desc}</p>
                    <span className="text-ivory text-xs uppercase tracking-wider font-semibold flex items-center gap-3">Discover division <span className="material-symbols-outlined text-gold text-lg">arrow_forward</span></span>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <div className="section-rule max-w-container-max mx-auto" />

      {/* ===== About ===== */}
      <section className="py-24 md:py-32 relative overflow-hidden bg-ivory">
        <div className="max-w-container-max mx-auto px-6 md:px-margin-desktop grid grid-cols-1 md:grid-cols-[0.95fr_1.05fr] gap-12 md:gap-16 items-center">
          <Reveal className="relative">
            <div className="rounded-[28px] overflow-hidden shadow-luxe relative z-10">
              {settings?.homepage?.aboutVideo ? (
                <video className="w-full h-[560px] object-cover" autoPlay loop muted playsInline src={getMediaUrl(settings.homepage.aboutVideo)} />
              ) : (
                <img alt="Modern architecture" className="w-full h-[560px] object-cover" src={getMediaUrl(settings?.homepage?.aboutImage) || 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?q=80&w=1200&auto=format&fit=crop'} loading="lazy" decoding="async" />
              )}
            </div>
            <div className="absolute top-8 left-0 z-20 bg-gold text-ink px-7 py-5 rounded-r-2xl shadow-xl">
              <strong className="font-display text-4xl md:text-5xl">25+</strong>
              <span className="block text-[10px] uppercase tracking-wider font-bold">Years of excellence</span>
            </div>
          </Reveal>
          <Reveal delay={120}>
            <p className="luxe-eyebrow mb-4">Why Choose Us</p>
            <h2 className="font-display text-3xl md:text-5xl font-bold text-ink mb-5 leading-tight">{settings?.homepage?.aboutTitle || 'Building Dreams, Crafting Excellence'}</h2>
            <h3 className="font-display text-base md:text-lg font-bold text-ink/80 mb-4 uppercase">Your trusted partner in design, testing & construction</h3>
            <p className="font-sans text-on-surface-variant mb-8 leading-relaxed">
              {settings?.homepage?.aboutText || 'With over two decades of experience, GEO Group of Companies has stood as a pillar of reliability in the construction and engineering sectors. We integrate cutting-edge technology with traditional craftsmanship to deliver projects that shape the skylines of tomorrow.'}
            </p>
            <div className="space-y-4">
              {[
                { icon: 'architecture', title: 'As an Architect', text: 'We create context-aware residential, commercial and institutional environments.' },
                { icon: 'science', title: 'As an Engineer', text: 'We convert ground conditions and technical evidence into buildable confidence.' },
                { icon: 'construction', title: 'As a Builder', text: 'We execute with disciplined coordination, safety and lasting material quality.' },
              ].map((b) => (
                <div key={b.title} className="flex gap-4 items-center bg-white border-l-4 border-gold rounded-2xl p-5 shadow-luxe-soft hover:-translate-y-1 transition-transform">
                  <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-gold flex items-center justify-center text-ink">
                    <span className="material-symbols-outlined">{b.icon}</span>
                  </div>
                  <div className="flex-1">
                    <h4 className="font-display font-bold text-ink mb-1">{b.title}</h4>
                    <p className="font-sans text-xs md:text-sm text-on-surface-variant leading-relaxed">{b.text}</p>
                  </div>
                  <span className="material-symbols-outlined text-gold">expand_more</span>
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

      {/* ===== Delivery Standards ===== */}
      <section className="bg-ivory overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-2">
          <Reveal className="relative min-h-[520px] lg:min-h-[680px] overflow-hidden">
            <img
              src={getMediaUrl(arcGalleryProjects[1]?.images?.[0]) || 'https://images.unsplash.com/photo-1531834685032-c34bf0d84c77?q=85&w=1500&auto=format&fit=crop'}
              alt="GEO team delivering an engineered project"
              className="absolute inset-0 w-full h-full object-cover"
              loading="lazy"
              decoding="async"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/20 to-transparent" />
            <div className="absolute left-6 right-6 bottom-8 md:left-12 md:right-12 md:bottom-12 text-ivory">
              <span className="inline-block border border-gold/60 px-4 py-2 text-[10px] uppercase tracking-luxe text-gold mb-5">The GEO Standard</span>
              <h2 className="font-display text-4xl md:text-6xl font-bold leading-[1.02] max-w-xl">Designed with purpose.<br />Delivered with proof.</h2>
            </div>
          </Reveal>

          <div className="bg-gold px-6 py-16 md:px-14 md:py-20 lg:px-20 lg:py-24 flex items-center">
            <div className="max-w-2xl">
              <Reveal>
                <p className="text-ink/60 text-[11px] tracking-luxe uppercase font-bold mb-5">How we work</p>
                <h3 className="font-display text-3xl md:text-5xl font-bold text-ink leading-tight mb-5">Confidence at every stage.</h3>
                <p className="text-ink/70 leading-relaxed mb-10 max-w-xl">A strong outcome is never accidental. Our teams combine creative thinking, technical evidence and disciplined execution from the first conversation onward.</p>
              </Reveal>
              <div className="grid sm:grid-cols-2 gap-x-10 gap-y-8">
                {practices.map((item, index) => (
                  <Reveal key={item.title} delay={index * 80}>
                    <div className="border-t border-ink/25 pt-5">
                      <div className="flex items-center gap-3 mb-3">
                        <span className="material-symbols-outlined text-ink">{item.icon}</span>
                        <h4 className="font-display font-bold text-lg text-ink">{item.title}</h4>
                      </div>
                      <p className="text-sm text-ink/65 leading-relaxed">{item.text}</p>
                    </div>
                  </Reveal>
                ))}
              </div>
              <Reveal delay={240}>
                <Link to="/about" className="inline-flex items-center gap-3 mt-10 px-7 py-3.5 bg-ink text-ivory rounded-md text-xs uppercase tracking-wider font-semibold hover:bg-ink-700 transition-colors">
                  Discover Our Approach <span className="material-symbols-outlined text-lg">arrow_forward</span>
                </Link>
              </Reveal>
            </div>
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

          <div className="grid grid-cols-1 md:grid-cols-2 gap-7">
            {projects.length > 0 ? (
              projects.slice(0, 4).map((proj, index) => (
                <Reveal key={proj._id} delay={(index % 2) * 100}>
                  <div onClick={() => setSelectedProject(proj)} className="relative h-[390px] md:h-[460px] rounded-[28px] overflow-hidden group shadow-luxe cursor-pointer">
                    <img alt={proj.name} className="w-full h-full object-cover absolute inset-0 transition-transform duration-700 group-hover:scale-105" src={getMediaUrl(proj.images?.[0]) || ''} loading="lazy" decoding="async" />
                    <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/20 to-transparent flex flex-col justify-end p-7 md:p-9">
                      <span className="text-gold text-[10px] uppercase tracking-luxe font-bold mb-2">{proj.category}</span>
                      <h3 className="font-display text-2xl md:text-3xl font-bold text-ivory mb-3">{proj.name}</h3>
                      <p className="text-champagne/70 text-sm line-clamp-2 max-w-xl mb-5">{proj.description}</p>
                      <span className="inline-flex items-center gap-2 bg-gold text-ink px-5 py-3 rounded-full w-fit text-[10px] uppercase tracking-wider font-bold">Explore Project <span className="material-symbols-outlined text-base">arrow_forward</span></span>
                    </div>
                  </div>
                </Reveal>
              ))
            ) : (
              <p className="col-span-12 text-center text-on-surface-variant py-10">No projects currently pinned to the homepage.</p>
            )}
          </div>
        </div>
      </section>

      {/* ===== Testimonials + Reasons to Choose GEO ===== */}
      <section className="py-24 md:py-36 bg-cream">
        <div className="max-w-container-max mx-auto px-6 md:px-margin-desktop">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-stretch">
            <Reveal className="lg:col-span-7">
              <div>
              <p className="luxe-eyebrow mb-4">Client Perspective</p>
              <h2 className="font-display text-4xl md:text-5xl font-bold text-ink mb-8 leading-tight">Trust is earned<br /><span className="text-gradient-gold italic">one decision at a time.</span></h2>
              <div className="space-y-6">
                {testimonials.length > 0 ? testimonials.map((t, index) => (
                  <div key={index} className="bg-white p-8 md:p-10 border-l-2 border-gold shadow-luxe-soft relative">
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
                  <div className="bg-ink p-8 md:p-10 text-ivory shadow-luxe">
                    <p className="font-display text-2xl md:text-3xl leading-snug">Clear advice. Coordinated expertise. Accountable delivery.</p>
                    <p className="mt-5 text-sm text-champagne/60 leading-relaxed">Our work is structured around the decisions clients need to make—from concept feasibility and ground conditions to cost, sequencing and final delivery.</p>
                  </div>
                )}
              </div>
              </div>
            </Reveal>

            <Reveal delay={120} className="lg:col-span-5 bg-gold p-8 md:p-12">
              <p className="text-ink/60 text-[10px] tracking-luxe uppercase font-bold mb-4">Why GEO Group</p>
              <h3 className="font-display text-3xl md:text-4xl font-bold text-ink mb-8">One accountable partner from insight to execution.</h3>
              <div className="space-y-0 border-t border-ink/20">
                {[
                  ['01', 'Integrated disciplines', 'Architecture, testing and construction aligned from day one.'],
                  ['02', 'Evidence-led decisions', 'Technical clarity before time and budget are committed.'],
                  ['03', 'Visible accountability', 'Clear ownership, milestones and communication throughout.'],
                  ['04', 'Built for longevity', 'Solutions considered beyond handover and immediate delivery.'],
                ].map(([number, title, text]) => (
                  <div key={number} className="grid grid-cols-[44px_1fr] gap-4 py-5 border-b border-ink/20">
                    <span className="font-display font-bold text-ink/45">{number}</span>
                    <div><h4 className="font-display font-bold text-lg text-ink">{title}</h4><p className="text-sm text-ink/65 leading-relaxed mt-1">{text}</p></div>
                  </div>
                ))}
              </div>
              {partners.length > 0 && <p className="mt-7 text-xs text-ink/55">Trusted relationships: {partners.map((partner) => partner.name).join(' • ')}</p>}
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
      <section className="bg-cream">
        <div className="max-w-container-max mx-auto">
          <Reveal>
            <div className="luxe-dark luxe-grain p-12 md:p-24 relative overflow-hidden text-center shadow-luxe">
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
                  <Link to="/contact" className="btn-gold px-10 py-4 rounded-md font-semibold uppercase tracking-wider text-sm flex items-center justify-center gap-3 w-full sm:w-auto">
                    <span className="material-symbols-outlined">mail</span> {settings?.metadata?.ctaContactText || 'Contact Us Now'}
                  </Link>
                  <a href={`https://wa.me/${(settings?.whatsappNumber || '971500000000').replace(/\D/g, '')}`} target="_blank" rel="noopener noreferrer" className="btn-outline-gold px-10 py-4 rounded-md font-semibold uppercase tracking-wider text-sm flex items-center justify-center gap-3 w-full sm:w-auto">
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

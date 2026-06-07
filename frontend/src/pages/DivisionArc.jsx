import React, { useState, useEffect } from 'react';
import API from '../services/api';
import SEO from '../components/SEO';
import SchemaMarkup from '../components/SchemaMarkup';

const DivisionArc = () => {
  const [company, setCompany] = useState(null);
  const [services, setServices] = useState([]);
  const [projects, setProjects] = useState([]);
  const [team, setTeam] = useState([]);
  const [gallery, setGallery] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchArcData = async () => {
      try {
        const [compRes, servRes, projRes, teamRes, galRes] = await Promise.all([
          API.get('/companies/geo-arc'),
          API.get('/services?division=ARC'),
          API.get('/projects?division=ARC'),
          API.get('/team?division=ARC'),
          API.get('/gallery?division=ARC')
        ]);

        if (compRes.data.success) setCompany(compRes.data.data);
        if (servRes.data.success) setServices(servRes.data.data);
        if (projRes.data.success) setProjects(projRes.data.data);
        if (teamRes.data.success) setTeam(teamRes.data.data);
        if (galRes.data.success) setGallery(galRes.data.data);
      } catch (err) {
        console.error('Error fetching GEO ARC data:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchArcData();
  }, []);

  const metaTitle = company?.seo?.metaTitle || 'GEO ARC | Engineering & Architecture';
  const metaDescription = company?.seo?.metaDescription || 'Innovative architectural design, masterplanning, and structural engineering services by GEO ARC.';

  return (
    <div className="relative w-full blueprint-overlay pt-20">
      <SEO title={metaTitle} description={metaDescription} />
      <SchemaMarkup type="Service" data={{ name: 'GEO ARC Architectural & Engineering Design', description: metaDescription }} />

      {/* Hero Header */}
      <header className="relative pt-24 pb-20 md:pt-36 md:pb-28">
        <div className="max-w-container-max mx-auto px-margin-desktop grid grid-cols-1 md:grid-cols-2 gap-gutter items-center">
          <div className="relative z-10 space-y-6">
            <span className="inline-block py-1.5 px-4 gold-badge text-primary font-display font-semibold text-[10px] uppercase tracking-widest rounded-full">
              Engineering & Architecture
            </span>
            <h1 className="font-display text-4xl md:text-5xl font-extrabold text-primary leading-tight">
              {company?.name || 'GEO ARC'}: {company?.tagline || 'Defining the Global Skyline'}
            </h1>
            <p className="font-sans text-on-surface-variant text-base md:text-lg leading-relaxed">
              {company?.description || 'Precision-engineered structures meeting world-class architectural vision. We bridge the gap between aesthetic brilliance and structural integrity.'}
            </p>
            <div className="flex flex-wrap gap-4 pt-4">
              <a href="#portfolio" className="bg-primary text-on-primary px-8 py-4 rounded-lg font-display font-semibold text-xs hover:shadow-lg transition-all">
                View Portfolio
              </a>
              <a href="#disciplines" className="border border-primary text-primary px-8 py-4 rounded-lg font-display font-semibold text-xs hover:bg-primary/5 transition-all">
                Our Disciplines
              </a>
            </div>
          </div>
          <div className="relative h-[300px] md:h-[500px] rounded-2xl overflow-hidden shadow-2xl">
            <img 
              className="w-full h-full object-cover" 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuALFxi773AFyBHTufFGUq5Ht4X7XJOc07BLrNPATVM7_n_GM2i97oOmwuwmr2y6wwe3k4ZzYrK_5qKBMFg7cjJdoeMte-DQRkTmdd-XBipsRyDE4r06TYPuVtfR12lpX7udRIeBlmoQSruwDtgeE-Ay3Tle16cmEqOSecBJP67eShq2VPUpiq3MDvrdpC8P1UqYSegXQrXs-bNwL5dCxWOpzo3kbOA6e954ufpQdzu_owBJClt1lHO3zLfGH6Bd06BcehglmRxN5n4"
              alt="GEO ARC Wireframe Banner"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-primary/40 to-transparent" />
          </div>
        </div>
      </header>

      {/* Specialized Services Section */}
      <section id="disciplines" className="py-120px bg-surface-container-lowest border-y border-outline-variant/10">
        <div className="max-w-container-max mx-auto px-margin-desktop">
          <div className="text-center mb-16">
            <h2 className="font-display text-3xl font-bold text-primary mb-4">Core Disciplines</h2>
            <div className="w-20 h-1 bg-secondary mx-auto"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-gutter">
            {services.map((service) => (
              <div key={service._id} className="p-8 bg-white border border-outline-variant/30 rounded-xl sky-glow transition-all duration-300 flex flex-col justify-between">
                <div>
                  <div className="w-12 h-12 bg-primary-fixed flex items-center justify-center rounded-lg mb-6 text-primary">
                    <span className="material-symbols-outlined text-2xl">{service.icon}</span>
                  </div>
                  <h3 className="font-display text-xl font-bold text-primary mb-4">{service.name}</h3>
                  <p className="font-sans text-sm text-on-surface-variant mb-6">{service.description}</p>
                </div>
                {service.features && service.features.length > 0 && (
                  <ul className="space-y-3 font-sans text-sm text-on-surface mt-auto">
                    {service.features.map((feature, i) => (
                      <li key={i} className="flex items-center gap-2">
                        <span className="material-symbols-outlined text-[18px] text-secondary">check_circle</span>
                        {feature}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Gallery (Asymmetric Layout) */}
      <section id="portfolio" className="py-120px bg-background">
        <div className="max-w-container-max mx-auto px-margin-desktop">
          <div className="flex justify-between items-end mb-16">
            <div>
              <h2 className="font-display text-3xl font-bold text-primary">Landmark Projects</h2>
              <p className="font-sans text-sm text-on-surface-variant mt-2">A testament to our global footprint and engineering prowess.</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-gutter">
            {projects.map((project, idx) => {
              const spanClass = idx % 3 === 0 ? 'md:col-span-8' : 'md:col-span-4';
              return (
                <div key={project._id} className={`${spanClass} group relative overflow-hidden rounded-2xl h-[450px] shadow-lg`}>
                  <img 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
                    src={project.images[0] || ''}
                    alt={project.name}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-primary/85 via-transparent to-transparent opacity-80 group-hover:opacity-95 transition-all duration-300 flex flex-col justify-end p-8">
                    <span className="text-secondary-fixed-dim font-display text-[10px] uppercase tracking-widest mb-1">{project.location}</span>
                    <h4 className="text-white font-display text-xl font-bold">{project.name}</h4>
                    <p className="text-white/70 text-xs font-sans mt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">{project.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Media Gallery Section */}
      {gallery.length > 0 && (
        <section id="gallery" className="py-120px bg-surface-container-low border-t border-outline-variant/10">
          <div className="max-w-container-max mx-auto px-margin-desktop">
            <div className="text-center mb-16">
              <h2 className="font-display text-3xl font-bold text-primary mb-4">Division Showcase Gallery</h2>
              <p className="font-sans text-sm text-on-surface-variant max-w-2xl mx-auto">Browse high-fidelity design models, physical blueprints, and structural milestones.</p>
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
          <div className="text-center mb-16">
            <h2 className="font-display text-3xl font-bold text-primary mb-4">Visionaries Behind the Blueprint</h2>
            <p className="font-sans text-on-surface-variant text-sm max-w-2xl mx-auto">Our lead architects bring decades of international experience and multiple award-winning designs to every GEO Group project.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-gutter">
            {team.map((member) => (
              <div key={member._id} className="group">
                <div className="relative aspect-[3/4] overflow-hidden rounded-xl mb-6 shadow-lg">
                  <img 
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" 
                    src={member.profileImage}
                    alt={member.name}
                  />
                </div>
                <h4 className="font-display text-lg font-bold text-primary">{member.name}</h4>
                <p className="font-sans text-xs text-secondary font-semibold">{member.designation}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Certifications and legacy of excellence */}
      <section className="py-120px bg-white border-t border-outline-variant/20">
        <div className="max-w-container-max mx-auto px-margin-desktop">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-gutter items-center">
            <div>
              <h2 className="font-display text-3xl font-bold text-primary mb-6">A Legacy of Excellence</h2>
              <p className="font-sans text-on-surface-variant text-sm mb-8 leading-relaxed">Our commitment to safety, innovation, and design quality is verified by the industry's most rigorous certification bodies.</p>
              <div className="grid grid-cols-2 gap-6">
                {company?.certifications?.map((c, i) => (
                  <div key={i} className="flex items-center gap-4">
                    <div className="w-12 h-12 flex-shrink-0 bg-secondary/10 rounded-full flex items-center justify-center text-secondary">
                      <span className="material-symbols-outlined">{c.icon || 'verified'}</span>
                    </div>
                    <div>
                      <h5 className="font-display font-semibold text-xs text-primary">{c.title}</h5>
                      <p className="text-[10px] text-on-surface-variant">{c.subtitle}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative bg-primary p-12 rounded-2xl overflow-hidden group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-secondary/20 blur-3xl rounded-full translate-x-1/2 -translate-y-1/2" />
              <div className="relative z-10">
                <span className="material-symbols-outlined text-tertiary-fixed-dim text-4xl mb-6">trophy</span>
                <h3 className="text-white font-display text-xl font-bold mb-4">"Engineering Company of the Decade"</h3>
                <p className="text-on-primary-container font-sans text-sm mb-8">— Global Construction Review</p>
                <hr className="border-on-primary-container/20 mb-8" />
                <div className="flex items-center justify-between">
                  <div className="flex -space-x-4">
                    <div className="w-10 h-10 rounded-full bg-white/20 border-2 border-primary flex items-center justify-center text-[10px] text-white">RIBA</div>
                    <div className="w-10 h-10 rounded-full bg-white/20 border-2 border-primary flex items-center justify-center text-[10px] text-white">AIA</div>
                    <div className="w-10 h-10 rounded-full bg-white/20 border-2 border-primary flex items-center justify-center text-[10px] text-white">ASCE</div>
                  </div>
                  <span className="text-on-primary-container font-display text-xs font-semibold">Over 45+ Global Awards</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default DivisionArc;

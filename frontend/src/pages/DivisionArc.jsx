import React, { useState, useEffect } from 'react';
import API from '../services/api';
import SEO from '../components/SEO';
import SchemaMarkup from '../components/SchemaMarkup';
import Lightbox from '../components/Lightbox';
import { getMediaUrl } from '../services/media';
import ProjectDetailModal from '../components/ProjectDetailModal';

const DivisionArc = () => {
  const [company, setCompany] = useState(null);
  const [services, setServices] = useState([]);
  const [projects, setProjects] = useState([]);
  const [allTeam, setAllTeam] = useState([]);
  const [gallery, setGallery] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedMedia, setSelectedMedia] = useState(null);
  const [selectedProject, setSelectedProject] = useState(null);

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
        if (teamRes.data.success) setAllTeam(teamRes.data.data);
        if (galRes.data.success) setGallery(galRes.data.data);
      } catch (err) {
        console.error('Error fetching GEO ARC data:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchArcData();
  }, []);

  const activeDivisionCeo = allTeam.find(m => m.designation.toUpperCase().includes('CEO'));
  const activeDivisionMembers = allTeam.filter(m => !m.designation.toUpperCase().includes('CEO'));

  const renderTeamPortrait = (member, className) => member.profileImage ? (
    <img
      src={getMediaUrl(member.profileImage)}
      alt={member.name}
      className={className}
      loading="lazy"
      decoding="async"
    />
  ) : (
    <div className={`${className} bg-gradient-to-br from-primary to-primary-container flex items-center justify-center text-white font-display text-4xl font-bold`}>
      {member.name.split(' ').map(part => part[0]).join('').slice(0, 2).toUpperCase()}
    </div>
  );

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
              {company?.metadata?.disciplineTag || 'Engineering & Architecture'}
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
            {company?.heroVideo ? (
              <video className="w-full h-full object-cover" autoPlay loop muted playsInline src={company.heroVideo} />
            ) : (
              <img
                className="w-full h-full object-cover"
                src={getMediaUrl(company?.featuredImage) || getMediaUrl(projects[0]?.images?.[0]) || ''}
                alt="GEO ARC Wireframe Banner"
                decoding="async"
                fetchPriority="high"
              />
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-primary/40 to-transparent" />
          </div>
        </div>
      </header>

      {/* Specialized Services Section */}
      <section id="disciplines" className="py-[160px] bg-surface-container-lowest border-y border-outline-variant/10">
        <div className="max-w-container-max mx-auto px-margin-desktop">
          <div className="text-center mb-24">
            <h2 className="font-display text-3xl font-bold text-primary mb-4">
              {company?.metadata?.coreDisciplinesTitle || 'Core Disciplines'}
            </h2>
            <div className="w-20 h-1 bg-gold mx-auto"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {services.map((service, idx) => (
              <div key={service._id} className={`p-8 bg-white border border-outline-variant/30 rounded-xl sky-glow flex flex-col justify-between cursor-pointer ${idx % 3 === 0 ? 'animate-float-slow' : idx % 3 === 1 ? 'animate-float-normal' : 'animate-float-fast'}`}>
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
                        <span className="material-symbols-outlined text-[18px] text-gold-deep">check_circle</span>
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
      <section id="portfolio" className="py-[160px] bg-background">
        <div className="max-w-container-max mx-auto px-margin-desktop">
          <div className="flex justify-between items-end mb-24">
            <div>
              <h2 className="font-display text-3xl font-bold text-primary">
                {company?.metadata?.landmarkProjectsTitle || 'Landmark Projects'}
              </h2>
              <p className="font-sans text-sm text-on-surface-variant mt-2">
                {company?.metadata?.landmarkProjectsSubtitle || 'A testament to our global footprint and engineering prowess.'}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
            {projects.map((project, idx) => {
              const spanClass = idx % 3 === 0 ? 'md:col-span-8' : 'md:col-span-4';
              return (
                <div 
                  key={project._id} 
                  onClick={() => setSelectedProject(project)}
                  className={`${spanClass} group relative overflow-hidden rounded-2xl h-[450px] shadow-lg cursor-pointer ${idx % 3 === 0 ? 'animate-float-slow' : idx % 3 === 1 ? 'animate-float-normal' : 'animate-float-fast'}`}
                >
                  <img
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    src={getMediaUrl(project.images[0]) || ''}
                    alt={project.name}
                    loading="lazy"
                    decoding="async"
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
        <section id="gallery" className="py-[160px] bg-surface-container-low border-t border-outline-variant/10">
          <div className="max-w-container-max mx-auto px-margin-desktop">
            <div className="text-center mb-24">
              <h2 className="font-display text-3xl font-bold text-primary mb-4">Division Showcase Gallery</h2>
              <p className="font-sans text-sm text-on-surface-variant max-w-2xl mx-auto">Browse high-fidelity design models, physical blueprints, and structural milestones.</p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {gallery.map((item) => (
                <div key={item._id} onClick={() => setSelectedMedia(item)} className="group relative overflow-hidden rounded-xl h-64 shadow-luxe-soft bg-cream cursor-pointer">
                  <img
                    src={item.url}
                    alt={item.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                    decoding="async"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-ink/90 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                    <p className="text-ivory font-display font-semibold text-sm">{item.title}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Team Section */}
      <section className="py-[160px] bg-surface-container-low border-t border-outline-variant/10">
        <div className="max-w-container-max mx-auto px-margin-desktop">
          <div className="text-center mb-20">
            <span className="font-display text-xs font-bold text-gold-deep uppercase tracking-widest block mb-2">Our People</span>
            <h2 className="font-display text-3xl md:text-4xl font-extrabold text-primary mb-4">GEO ARC Team</h2>
            <p className="font-sans text-on-surface-variant text-sm max-w-2xl mx-auto mb-12">
              The dedicated architecture team responsible for GEO ARC design development and project documentation.
            </p>
          </div>

          {/* GEO ARC division leader */}
          <div className="max-w-2xl mx-auto mb-24">
            {activeDivisionCeo && (
              <div className="bg-white border border-outline-variant/30 rounded-2xl p-6 md:p-8 flex flex-col sm:flex-row gap-6 animate-float-normal cursor-pointer">
                <div className="w-full sm:w-1/3 aspect-[3/4] overflow-hidden rounded-xl bg-surface-container">
                  {renderTeamPortrait(activeDivisionCeo, 'w-full h-full object-cover')}
                </div>
                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <span className="inline-block px-2.5 py-1 bg-primary-fixed/10 text-primary text-[9px] font-display font-semibold uppercase tracking-wider rounded-md mb-3">Department Head</span>
                    <h3 className="font-display text-xl font-bold text-primary">{activeDivisionCeo.name}</h3>
                    <p className="font-sans text-xs text-gold-deep font-semibold mt-1">{activeDivisionCeo.designation}</p>
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
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-10 max-w-3xl mx-auto">
                {activeDivisionMembers.map((member, idx) => (
                  <div key={member._id} className={`group bg-white border border-outline-variant/20 rounded-xl p-6 shadow-sm cursor-pointer flex flex-col justify-between ${idx % 3 === 0 ? 'animate-float-slow' : idx % 3 === 1 ? 'animate-float-normal' : 'animate-float-fast'}`}>
                    <div>
                      <div className="relative aspect-[3/4] overflow-hidden rounded-lg mb-6 shadow-sm bg-surface-container">
                        {renderTeamPortrait(member, 'w-full h-full object-cover transition-transform duration-500 group-hover:scale-105')}
                      </div>
                      <h4 className="font-display text-base font-bold text-primary">{member.name}</h4>
                      <p className="font-sans text-xs text-gold-deep font-semibold mt-1">{member.designation}</p>
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

      {/* Certifications and legacy of excellence */}
      <section className="py-120px bg-white border-t border-outline-variant/20">
        <div className="max-w-container-max mx-auto px-margin-desktop">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-gutter items-center">
            <div>
              <h2 className="font-display text-3xl font-bold text-primary mb-6">
                {company?.metadata?.legacyTitle || 'A Legacy of Excellence'}
              </h2>
              <p className="font-sans text-on-surface-variant text-sm mb-8 leading-relaxed">
                {company?.metadata?.legacyText || 'Our commitment to safety, innovation, and design quality is verified by the industry\'s most rigorous certification bodies.'}
              </p>
              <div className="grid grid-cols-2 gap-6">
                {company?.certifications?.map((c, i) => (
                  <div key={i} className="flex items-center gap-4">
                    <div className="w-12 h-12 flex-shrink-0 bg-gold/10 rounded-full flex items-center justify-center text-gold-deep">
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
              <div className="absolute top-0 right-0 w-32 h-32 bg-gold/20 blur-3xl rounded-full translate-x-1/2 -translate-y-1/2" />
              <div className="relative z-10">
                <span className="material-symbols-outlined text-tertiary-fixed-dim text-4xl mb-6">trophy</span>
                <h3 className="text-white font-display text-xl font-bold mb-4">
                  {company?.metadata?.awardQuote || '"Engineering Company of the Decade"'}
                </h3>
                <p className="text-on-primary-container font-sans text-sm mb-8">
                  {company?.metadata?.awardAuthor || '— Global Construction Review'}
                </p>
                <hr className="border-on-primary-container/20 mb-8" />
                <div className="flex items-center justify-between">
                  <div className="flex -space-x-4">
                    <div className="w-10 h-10 rounded-full bg-white/20 border-2 border-primary flex items-center justify-center text-[10px] text-white">RIBA</div>
                    <div className="w-10 h-10 rounded-full bg-white/20 border-2 border-primary flex items-center justify-center text-[10px] text-white">AIA</div>
                    <div className="w-10 h-10 rounded-full bg-white/20 border-2 border-primary flex items-center justify-center text-[10px] text-white">ASCE</div>
                  </div>
                  <span className="text-on-primary-container font-display text-xs font-semibold">
                    {company?.metadata?.awardYears || 'Over 45+ Global Awards'}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Lightbox media={selectedMedia} onClose={() => setSelectedMedia(null)} />
      {selectedProject && <ProjectDetailModal project={selectedProject} onClose={() => setSelectedProject(null)} />}
    </div>
  );
};

export default DivisionArc;

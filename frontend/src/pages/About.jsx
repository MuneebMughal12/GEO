import React, { useState, useEffect } from 'react';
import API from '../services/api';
import SEO from '../components/SEO';
import Reveal from '../components/Reveal';
import { getMediaUrl } from '../services/media';
import PremiumPageHero from '../components/PremiumPageHero';

const About = () => {
  const [settings, setSettings] = useState(null);
  const [team, setTeam] = useState([]);

  useEffect(() => {
    const fetchAboutData = async () => {
      try {
        const [settRes, teamRes] = await Promise.all([
          API.get('/companies/settings'),
          API.get('/team?division=GLOBAL'),
        ]);
        if (settRes.data.success) setSettings(settRes.data.data);
        if (teamRes.data.success) setTeam(teamRes.data.data);
      } catch (err) {
        console.error('Error loading about data:', err);
      }
    };
    fetchAboutData();
  }, []);

  const m = settings?.metadata || {};

  const commitments = [
    { icon: m.aboutCommit1Icon || 'verified_user', title: m.aboutCommit1Title || 'Absolute Safety', desc: m.aboutCommit1Desc || 'Zero-accident targets supported by rigorous field auditing protocols.' },
    { icon: m.aboutCommit2Icon || 'eco', title: m.aboutCommit2Title || 'Biophilic Sustainability', desc: m.aboutCommit2Desc || 'Using green concrete mixtures and energy-balanced masterplans.' },
    { icon: m.aboutCommit3Icon || 'monitoring', title: m.aboutCommit3Title || 'Precision Analysis', desc: m.aboutCommit3Desc || 'Geotechnical datasets certified in climate-regulated laboratory ovens.' },
  ];

  const journey = [
    { year: m.aboutJourney1Year || '1998 — Corporate Foundation', desc: m.aboutJourney1Desc || 'GEO Group begins as a specialized surveying consultancy firm in Abu Dhabi.' },
    { year: m.aboutJourney2Year || '2005 — Geotechnical Expansion', desc: m.aboutJourney2Desc || 'Launching material testing labs and core drilling rigs under GEO Soil Testing.' },
    { year: m.aboutJourney3Year || '2014 — Infrastructure Milestone', desc: m.aboutJourney3Desc || 'Sealing municipal civil infrastructure bids and bridge portfolios under GEO Construction.' },
  ];

  return (
    <div className="relative w-full bg-ivory">
      <SEO title="About Us | GEO Group of Companies" description="Learn about our journey, corporate leadership, core values, and our divisions: GEO ARC, GEO Soil Testing, and GEO Construction." />

      <PremiumPageHero
        eyebrow="Our Legacy"
        current="About"
        image={settings?.homepage?.aboutImage || 'https://images.unsplash.com/photo-1542621334-a254cf47733d?q=85&w=2200&auto=format&fit=crop'}
        title={m.aboutHeroTitle || <>Built on trust.<br /><span className="text-gradient-gold italic">Driven by detail.</span></>}
        description={m.aboutHeroSubtitle || 'For more than two decades, GEO Group has united architectural imagination, geotechnical evidence and disciplined construction delivery.'}
      />

      {/* Leadership message */}
      <section className="py-24 md:py-36 bg-ivory overflow-hidden">
        <div className="max-w-container-max mx-auto px-6 md:px-margin-desktop">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
            <Reveal className="lg:col-span-5 relative">
              <div className="aspect-[4/5] overflow-hidden bg-cream">
                <img src="https://images.unsplash.com/photo-1497366754035-f200968a6e72?q=85&w=1400&auto=format&fit=crop" alt="GEO Group collaborative leadership environment" className="w-full h-full object-cover" loading="lazy" decoding="async" />
              </div>
              <div className="absolute -bottom-6 -right-3 md:-right-6 bg-gold text-ink p-6 md:p-8 w-48 md:w-56 shadow-luxe">
                <span className="font-display text-4xl md:text-5xl font-bold">25+</span>
                <span className="block text-[10px] uppercase tracking-luxe mt-2 font-semibold">Years of accountable delivery</span>
              </div>
            </Reveal>
            <Reveal delay={120} className="lg:col-span-7 lg:pl-4 space-y-6">
              <p className="luxe-eyebrow">Message from Leadership</p>
              <h2 className="font-display text-4xl md:text-6xl font-bold text-ink leading-[1.05]">
                {m.aboutMessageHeading || <>Standards that endure.<br /><span className="text-gradient-gold italic">Partnerships that last.</span></>}
              </h2>
              <p className="font-sans text-on-surface-variant text-sm md:text-base leading-relaxed max-w-2xl">
                {m.aboutMessageText1 || 'At GEO Group of Companies, our operational philosophy is anchored in precision, transparency, and safety. Every project proposal we evaluate, borehole test we log, and civil foundation we secure represents our pledge of permanence to the stakeholders who place their trust in us.'}
              </p>
              <p className="font-sans text-on-surface-variant text-sm md:text-base leading-relaxed max-w-2xl">
                {m.aboutMessageText2 || 'We continue to expand our technical capabilities, adopting intelligent modeling and evidence-led systems to make the built environment safer, more sustainable and more efficient.'}
              </p>
              <div className="grid grid-cols-3 gap-4 pt-5 border-t border-gold/25">
                {[['03', 'Specialist divisions'], ['01', 'Integrated standard'], ['360°', 'Project perspective']].map(([value, label]) => (
                  <div key={label}><strong className="font-display text-2xl md:text-3xl text-ink">{value}</strong><span className="block text-[9px] md:text-[10px] uppercase tracking-wider text-on-surface-variant mt-1">{label}</span></div>
                ))}
              </div>
            </Reveal>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-0 mt-24 border border-gold/20">
            {commitments.map((c, index) => (
              <Reveal key={c.title} delay={index * 80}>
                <div className="h-full p-8 md:p-10 bg-white border-b md:border-b-0 md:border-r last:border-0 border-gold/20 group hover:bg-ink transition-colors duration-500">
                  <div className="w-12 h-12 bg-gold flex items-center justify-center mb-7 text-ink">
                    <span className="material-symbols-outlined text-2xl">{c.icon}</span>
                  </div>
                  <span className="text-[10px] tracking-luxe text-gold-deep group-hover:text-gold">0{index + 1}</span>
                  <h4 className="font-display font-bold text-ink group-hover:text-ivory text-xl mt-2 mb-3">{c.title}</h4>
                  <p className="text-sm text-on-surface-variant group-hover:text-champagne/65 leading-relaxed">{c.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-24 md:py-32 bg-cream">
        <div className="max-w-container-max mx-auto px-6 md:px-margin-desktop">
          <Reveal className="text-center mb-16">
            <p className="luxe-eyebrow center justify-center mb-4">Milestones</p>
            <h2 className="font-display text-3xl md:text-5xl font-bold text-ink">Our <span className="text-gradient-gold italic">Journey</span></h2>
          </Reveal>
          <div className="relative border-l border-gold/30 max-w-3xl mx-auto pl-8 space-y-12">
            {journey.map((j, i) => (
              <Reveal key={i} delay={i * 100} className="relative">
                <span className="absolute left-[-41px] top-1.5 w-6 h-6 rounded-full bg-gold-gradient border-4 border-cream shadow-luxe-gold" />
                <h4 className="font-display font-bold text-ink text-lg">{j.year}</h4>
                <p className="font-sans text-on-surface-variant text-sm mt-1 leading-relaxed">{j.desc}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Leadership team */}
      {team.length > 0 && (
        <section className="py-24 md:py-32 bg-ivory">
          <div className="max-w-container-max mx-auto px-6 md:px-margin-desktop">
            <Reveal className="text-center mb-16">
              <p className="luxe-eyebrow center justify-center mb-4">The People</p>
              <h2 className="font-display text-3xl md:text-5xl font-bold text-ink">Leadership <span className="text-gradient-gold italic">Team</span></h2>
            </Reveal>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {team.map((member, i) => (
                <Reveal key={member._id || i} delay={(i % 4) * 80}>
                  <div className="luxe-card bg-white/80 rounded-2xl overflow-hidden group text-center h-full">
                    <div className="h-64 overflow-hidden bg-cream">
                      {member.image ? (
                        <img src={getMediaUrl(member.image)} alt={member.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-gold/40"><span className="material-symbols-outlined text-6xl">person</span></div>
                      )}
                    </div>
                    <div className="p-6">
                      <h4 className="font-display font-bold text-ink text-lg">{member.name}</h4>
                      <p className="text-gold-deep text-xs uppercase tracking-wider mt-1">{member.position}</p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
};

export default About;

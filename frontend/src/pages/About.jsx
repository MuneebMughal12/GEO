import React, { useState, useEffect } from 'react';
import API from '../services/api';
import SEO from '../components/SEO';
import Reveal from '../components/Reveal';
import { getMediaUrl } from '../services/media';

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

      {/* Hero */}
      <section className="luxe-dark luxe-grain py-40 pb-24 text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_20%,rgba(201,162,39,0.12),transparent_55%)]" />
        <div className="relative z-10 max-w-container-max mx-auto px-6 md:px-margin-desktop space-y-5">
          <p className="luxe-eyebrow center justify-center animate-fade-in">Our Legacy</p>
          <h1 className="font-display text-4xl md:text-6xl font-bold text-ivory tracking-tight animate-fade-up">
            {m.aboutHeroTitle || <>The GEO Group <span className="text-gradient-gold italic">Story</span></>}
          </h1>
          <p className="font-sans text-luxury-muted max-w-xl mx-auto text-sm md:text-base animate-fade-up" style={{ animationDelay: '120ms' }}>
            {m.aboutHeroSubtitle || 'Engineering stability and architectural brilliance across borders for over 25 years.'}
          </p>
        </div>
      </section>

      {/* Leadership message */}
      <section className="py-24 md:py-32 bg-ivory">
        <div className="max-w-container-max mx-auto px-6 md:px-margin-desktop grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <Reveal className="space-y-6">
            <p className="luxe-eyebrow">Message from Leadership</p>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-ink leading-tight">
              {m.aboutMessageHeading || 'Uncompromising Standards in Civil Engineering'}
            </h2>
            <p className="font-sans text-on-surface-variant text-sm md:text-base leading-relaxed">
              {m.aboutMessageText1 || 'At GEO Group of Companies, our operational philosophy is anchored in precision, transparency, and safety. Every project proposal we evaluate, borehole test we log, and civil foundation we secure represents our pledge of permanence to the global stakeholders who place their trust in our capabilities.'}
            </p>
            <p className="font-sans text-on-surface-variant text-sm md:text-base leading-relaxed">
              {m.aboutMessageText2 || 'We continue to expand our technological parameters, adopting parametric modeling and high-capacity remote telemetry to make our physical infrastructures smarter, more sustainable, and highly efficient.'}
            </p>
          </Reveal>
          <Reveal delay={120}>
            <div className="luxe-card bg-white/80 p-10 rounded-2xl">
              <h4 className="font-display font-bold text-ink text-xl mb-6">Core Commitments</h4>
              <div className="space-y-6">
                {commitments.map((c) => (
                  <div key={c.title} className="flex gap-4">
                    <div className="flex-shrink-0 w-11 h-11 rounded-lg bg-ink flex items-center justify-center border border-gold/25">
                      <span className="material-symbols-outlined text-gold text-xl">{c.icon}</span>
                    </div>
                    <div>
                      <h5 className="font-display font-bold text-sm text-ink">{c.title}</h5>
                      <p className="font-sans text-xs text-on-surface-variant mt-1 leading-relaxed">{c.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
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

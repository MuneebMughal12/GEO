import React, { useState, useEffect } from 'react';
import API from '../services/api';
import SEO from '../components/SEO';

const About = () => {
  const [settings, setSettings] = useState(null);
  const [team, setTeam] = useState([]);

  useEffect(() => {
    const fetchAboutData = async () => {
      try {
        const [settRes, teamRes] = await Promise.all([
          API.get('/companies/settings'),
          API.get('/team?division=GLOBAL')
        ]);
        if (settRes.data.success) setSettings(settRes.data.data);
        if (teamRes.data.success) setTeam(teamRes.data.data);
      } catch (err) {
        console.error('Error loading about data:', err);
      }
    };
    fetchAboutData();
  }, []);

  return (
    <div className="relative w-full pt-20">
      <SEO 
        title="About Us | GEO Group of Companies" 
        description="Learn about our journey, corporate leadership, core values, and our divisions: GEO ARC, GEO Soil Testing, and GEO Construction."
      />

      {/* Header */}
      <section className="bg-primary text-white py-24 text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary-container/30 to-secondary/20 pointer-events-none" />
        <div className="relative z-10 max-w-container-max mx-auto px-margin-desktop space-y-4">
          <h1 className="font-display text-4xl md:text-5xl font-extrabold tracking-tight">
            {settings?.metadata?.aboutHeroTitle || 'Our Corporate Story'}
          </h1>
          <p className="font-sans text-white/80 max-w-xl mx-auto text-sm md:text-base">
            {settings?.metadata?.aboutHeroSubtitle || 'Engineering stability and architectural brilliance across borders for over 25 years.'}
          </p>
        </div>
      </section>

      {/* Corporate Message */}
      <section className="py-24 bg-background">
        <div className="max-w-container-max mx-auto px-margin-desktop grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <div className="space-y-6">
            <span className="font-display text-xs font-bold text-secondary uppercase tracking-widest block">Message from Leadership</span>
            <h2 className="font-display text-3xl font-bold text-primary">
              {settings?.metadata?.aboutMessageHeading || 'Uncompromising Standards in Civil Engineering'}
            </h2>
            <p className="font-sans text-on-surface-variant text-sm md:text-base leading-relaxed">
              {settings?.metadata?.aboutMessageText1 || 'At GEO Group of Companies, our operational philosophy is anchored in precision, transparency, and safety. Every project proposal we evaluate, borehole test we log, and civil foundation we secure represents our pledge of permanence to the global stakeholders who place their trust in our capabilities.'}
            </p>
            <p className="font-sans text-on-surface-variant text-sm md:text-base leading-relaxed">
              {settings?.metadata?.aboutMessageText2 || 'We continue to expand our technological parameters, adopting parametric modeling and high-capacity remote telemetry to make our physical infrastructures smarter, more sustainable, and highly efficient.'}
            </p>
          </div>
          <div className="bg-white p-10 rounded-2xl border border-outline-variant/30 shadow-md">
            <h4 className="font-display font-bold text-primary text-lg mb-4">Core Commitments</h4>
            <div className="space-y-6">
              <div className="flex gap-4">
                <span className="material-symbols-outlined text-secondary text-2xl">verified_user</span>
                <div>
                  <h5 className="font-display font-bold text-sm text-primary">Absolute Safety</h5>
                  <p className="font-sans text-xs text-on-surface-variant mt-1">Zero-accident targets supported by rigorous field auditing protocols.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <span className="material-symbols-outlined text-secondary text-2xl">eco</span>
                <div>
                  <h5 className="font-display font-bold text-sm text-primary">Biophilic Sustainability</h5>
                  <p className="font-sans text-xs text-on-surface-variant mt-1">Using green concrete mixtures and energy-balanced masterplans.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <span className="material-symbols-outlined text-secondary text-2xl">monitoring</span>
                <div>
                  <h5 className="font-display font-bold text-sm text-primary">Precision Analysis</h5>
                  <p className="font-sans text-xs text-on-surface-variant mt-1">Geotechnical datasets certified in climate-regulated laboratory ovens.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Corporate Timeline */}
      <section className="py-24 bg-surface-container-low border-t border-outline-variant/10">
        <div className="max-w-container-max mx-auto px-margin-desktop">
          <div className="text-center mb-16">
            <h2 className="font-display text-3xl font-bold text-primary mb-4">Our Journey</h2>
            <div className="w-16 h-1 bg-secondary mx-auto"></div>
          </div>
          <div className="relative border-l-2 border-outline-variant/30 max-w-3xl mx-auto pl-8 space-y-12">
            <div className="relative">
              <span className="absolute left-[-41px] top-1.5 w-6 h-6 rounded-full bg-secondary border-4 border-white shadow-md" />
              <h4 className="font-display font-bold text-primary text-lg">1998 - Corporate Foundation</h4>
              <p className="font-sans text-on-surface-variant text-sm mt-1">GEO Group starts as a specialized surveying and surveying consultancy firm in Abu Dhabi.</p>
            </div>
            <div className="relative">
              <span className="absolute left-[-41px] top-1.5 w-6 h-6 rounded-full bg-primary border-4 border-white shadow-md" />
              <h4 className="font-display font-bold text-primary text-lg">2005 - Geotechnical Expansion</h4>
              <p className="font-sans text-on-surface-variant text-sm mt-1">Launching specialized material testing lab services and core drilling rigs under GEO Soil Testing.</p>
            </div>
            <div className="relative">
              <span className="absolute left-[-41px] top-1.5 w-6 h-6 rounded-full bg-primary border-4 border-white shadow-md" />
              <h4 className="font-display font-bold text-primary text-lg">2014 - Infrastructure Milestone</h4>
              <p className="font-sans text-on-surface-variant text-sm mt-1">Sealing municipal civil infrastructure bids and bridge building portfolios under GEO Construction.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;

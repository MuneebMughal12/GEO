import React from 'react';
import { Link } from 'react-router-dom';
import { getMediaUrl } from '../services/media';

const PremiumPageHero = ({
  eyebrow,
  title,
  description,
  image,
  current,
  children,
  compact = false,
}) => (
  <section className={`relative flex items-end overflow-hidden bg-ink ${compact ? 'min-h-[500px]' : 'min-h-[620px] md:min-h-[700px]'}`}>
    <img
      src={getMediaUrl(image)}
      alt=""
      aria-hidden="true"
      className="absolute inset-0 h-full w-full object-cover"
      decoding="async"
      fetchPriority="high"
    />
    <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(10,14,26,0.98)_0%,rgba(10,14,26,0.86)_48%,rgba(10,14,26,0.38)_100%)]" />
    <div className="absolute inset-0 bg-gradient-to-t from-ink via-transparent to-ink/35" />

    <div className="relative z-10 w-full max-w-container-max mx-auto px-6 md:px-margin-desktop pt-36 pb-16 md:pb-24">
      <div className="max-w-3xl border-l border-gold/70 pl-5 md:pl-9">
        <div className="flex items-center gap-2 text-[10px] uppercase tracking-luxe text-champagne/65 mb-8 animate-fade-in">
          <Link to="/" className="hover:text-gold transition-colors">Home</Link>
          <span className="text-gold">/</span>
          <span className="text-gold">{current}</span>
        </div>
        <p className="flex items-center gap-3 text-gold text-[11px] tracking-luxe uppercase font-semibold mb-5 animate-fade-in">
          <span className="w-10 h-px bg-gold" /> {eyebrow}
        </p>
        <h1 className="font-display text-4xl sm:text-5xl md:text-7xl font-bold text-ivory leading-[1.02] tracking-[-0.03em] animate-fade-up">
          {title}
        </h1>
        {description && (
          <p className="mt-6 max-w-2xl text-sm md:text-lg leading-relaxed text-champagne/70 animate-fade-up" style={{ animationDelay: '100ms' }}>
            {description}
          </p>
        )}
        {children && <div className="mt-9 animate-fade-up" style={{ animationDelay: '180ms' }}>{children}</div>}
      </div>
    </div>
  </section>
);

export default PremiumPageHero;

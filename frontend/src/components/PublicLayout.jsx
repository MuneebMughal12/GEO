import React, { useState, useEffect } from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import API from '../services/api';
import FloatingActions from './FloatingActions';

const PublicLayout = () => {
  const location = useLocation();
  const [settings, setSettings] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const res = await API.get('/companies/settings');
        if (res.data.success) setSettings(res.data.data);
      } catch (err) {
        console.error('Error fetching global settings:', err);
      }
    };
    fetchSettings();

    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => { setMenuOpen(false); }, [location.pathname]);

  const siteName = settings?.siteName || 'GEO Group';

  const navLink = (to, label, opts = {}) => {
    const active = opts.match ? location.pathname.startsWith(to) : location.pathname === to;
    return (
      <Link
        to={to}
        className={`relative font-sans text-[13px] tracking-wide uppercase transition-colors duration-300 py-1 ${
          active ? 'text-gold' : 'text-champagne/80 hover:text-gold'
        }`}
      >
        {label}
        <span
          className={`absolute -bottom-0.5 left-0 h-px bg-gold transition-all duration-300 ${
            active ? 'w-full' : 'w-0'
          }`}
        />
      </Link>
    );
  };

  return (
    <div className="flex flex-col min-h-screen bg-ivory">
      {/* ===== Navigation ===== */}
      <nav
        className={`fixed top-0 w-full z-50 transition-all duration-500 ${
          scrolled
            ? 'py-2 bg-ink/95 backdrop-blur-xl shadow-luxe border-b border-gold/25'
            : 'py-4 bg-ink/70 backdrop-blur-md border-b border-gold/10'
        }`}
      >
        <div className="flex justify-between items-center max-w-container-max mx-auto px-6 md:px-margin-desktop h-14">
          <Link to="/" className="flex items-baseline gap-1.5 group">
            <span className="font-display text-xl md:text-2xl font-bold text-ivory tracking-tight">
              {siteName.split(' ')[0]}
            </span>
            <span className="font-display text-xl md:text-2xl font-bold text-gradient-gold">
              {siteName.split(' ').slice(1).join(' ') || 'Group'}
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-9">
            {navLink('/', 'Home')}
            {navLink('/about', 'About')}

            <div className="relative group">
              <span className="font-sans text-[13px] tracking-wide uppercase text-champagne/80 hover:text-gold cursor-pointer transition-colors duration-300 flex items-center gap-1">
                Divisions <span className="material-symbols-outlined text-[16px]">expand_more</span>
              </span>
              <div className="absolute top-full left-1/2 -translate-x-1/2 mt-3 w-64 rounded-xl bg-ink border border-gold/25 shadow-luxe py-2 opacity-0 translate-y-2 pointer-events-none group-hover:opacity-100 group-hover:translate-y-0 group-hover:pointer-events-auto transition-all duration-300 before:content-[''] before:absolute before:-top-3 before:left-0 before:right-0 before:h-3">
                {[
                  ['/geo-arc', 'GEO ARC', 'Architecture'],
                  ['/geo-soil-testing', 'GEO Soil Testing', 'Laboratory'],
                  ['/geo-construction', 'GEO Construction', 'Civil'],
                ].map(([to, t, s]) => (
                  <Link key={to} to={to} className="block px-4 py-2.5 hover:bg-ink-700 transition-colors group/item">
                    <span className="block text-champagne text-sm font-semibold group-hover/item:text-gold transition-colors">{t}</span>
                    <span className="block text-luxury-muted text-[11px] uppercase tracking-wider">{s}</span>
                  </Link>
                ))}
              </div>
            </div>

            {navLink('/blog', 'Knowledge', { match: true })}
            {navLink('/contact', 'Contact')}

            <Link to="/contact" className="btn-gold px-6 py-2.5 rounded-full font-semibold text-xs uppercase tracking-wider">
              Get a Quote
            </Link>
          </div>

          <button className="md:hidden text-gold" onClick={() => setMenuOpen(!menuOpen)}>
            <span className="material-symbols-outlined text-2xl">{menuOpen ? 'close' : 'menu'}</span>
          </button>
        </div>

        {/* Mobile Nav Drawer */}
        {menuOpen && (
          <div className="md:hidden bg-ink border-b border-gold/20 px-6 py-8 flex flex-col gap-5 shadow-luxe animate-fade-in">
            <Link to="/" className="text-champagne font-display text-lg">Home</Link>
            <Link to="/about" className="text-champagne font-display text-lg">About</Link>
            <div className="border-t border-gold/10 pt-4 space-y-3">
              <p className="luxe-eyebrow">Divisions</p>
              <Link to="/geo-arc" className="block pl-4 text-champagne/90 font-semibold">GEO ARC</Link>
              <Link to="/geo-soil-testing" className="block pl-4 text-champagne/90 font-semibold">GEO Soil Testing</Link>
              <Link to="/geo-construction" className="block pl-4 text-champagne/90 font-semibold">GEO Construction</Link>
            </div>
            <Link to="/blog" className="text-champagne font-display text-lg">Knowledge Center</Link>
            <Link to="/contact" className="text-champagne font-display text-lg">Contact</Link>
            <Link to="/contact" className="btn-gold text-center py-4 rounded-full font-bold uppercase tracking-wider text-sm">
              Get a Quote
            </Link>
          </div>
        )}
      </nav>

      {/* ===== Main ===== */}
      <main className="flex-grow">
        <Outlet />
      </main>

      {/* ===== Footer ===== */}
      <footer className="luxe-dark luxe-grain w-full mt-auto relative overflow-hidden">
        <div className="section-rule" />

        {/* Newsletter band */}
        <div className="relative z-10 max-w-container-max mx-auto px-6 md:px-margin-desktop pt-20 pb-16">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8 pb-16 border-b border-gold/15">
            <div>
              <p className="luxe-eyebrow mb-3">Stay Informed</p>
              <h3 className="font-display text-2xl md:text-3xl text-ivory max-w-md leading-tight">
                Insights on architecture, engineering &amp; infrastructure.
              </h3>
            </div>
            <form className="flex w-full max-w-md" onSubmit={(e) => e.preventDefault()}>
              <input
                type="email"
                placeholder="Your email address"
                className="flex-1 bg-ink-700/60 border border-gold/25 rounded-l-full px-6 py-3.5 text-sm text-ivory placeholder:text-luxury-muted focus:outline-none focus:border-gold transition-colors"
              />
              <button type="submit" className="btn-gold px-7 rounded-r-full text-xs uppercase tracking-wider font-semibold">
                Subscribe
              </button>
            </form>
          </div>
        </div>

        <div className="relative z-10 grid grid-cols-1 md:grid-cols-4 gap-12 max-w-container-max mx-auto px-6 md:px-margin-desktop pb-16">
          <div>
            <div className="flex items-baseline gap-1.5 mb-6">
              <span className="font-display text-2xl font-bold text-ivory">{siteName.split(' ')[0]}</span>
              <span className="font-display text-2xl font-bold text-gradient-gold">{siteName.split(' ').slice(1).join(' ') || 'Group'}</span>
            </div>
            <p className="text-luxury-muted text-sm mb-6 leading-relaxed">
              {settings?.metadata?.footerText || "Building tomorrow's infrastructure with today's most advanced technology and precision-led engineering."}
            </p>
            <div className="flex gap-3">
              <a href={settings?.socialLinks?.linkedin || '#'} className="w-10 h-10 rounded-full border border-gold/30 flex items-center justify-center text-gold hover:bg-gold hover:text-ink transition-colors"><span className="material-symbols-outlined text-[20px]">language</span></a>
              <a href={settings?.socialLinks?.twitter || '#'} className="w-10 h-10 rounded-full border border-gold/30 flex items-center justify-center text-gold hover:bg-gold hover:text-ink transition-colors"><span className="material-symbols-outlined text-[20px]">share</span></a>
              {settings?.whatsappNumber && (
                <a href={`https://wa.me/${settings.whatsappNumber.replace(/\D/g, '')}`} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full border border-gold/30 flex items-center justify-center text-gold hover:bg-[#25D366] hover:text-white hover:border-[#25D366] transition-colors" title="WhatsApp Us">
                  <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" /></svg>
                </a>
              )}
            </div>
          </div>
          <div>
            <h4 className="luxe-eyebrow mb-6">Our Divisions</h4>
            <ul className="space-y-3 text-sm text-luxury-muted">
              <li><Link to="/geo-arc" className="hover:text-gold transition-colors">GEO ARC — Architecture</Link></li>
              <li><Link to="/geo-soil-testing" className="hover:text-gold transition-colors">GEO Soil Testing — Laboratory</Link></li>
              <li><Link to="/geo-construction" className="hover:text-gold transition-colors">GEO Construction — Civil</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="luxe-eyebrow mb-6">Company</h4>
            <ul className="space-y-3 text-sm text-luxury-muted">
              <li><Link to="/about" className="hover:text-gold transition-colors">Our Story</Link></li>
              <li><Link to="/blog" className="hover:text-gold transition-colors">Knowledge Center</Link></li>
              <li><Link to="/contact" className="hover:text-gold transition-colors">Contact Support</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="luxe-eyebrow mb-6">Headquarters</h4>
            <p className="text-sm text-luxury-muted mb-4 leading-relaxed">{settings?.address || '1200 Elite Tower, Abu Dhabi, UAE'}</p>
            <p className="text-sm text-luxury-muted leading-relaxed">
              <a href={`mailto:${settings?.contactEmail || 'contact@geogroup.global'}`} className="hover:text-gold transition-colors">{settings?.contactEmail || 'contact@geogroup.global'}</a><br />
              <a href={`tel:${settings?.contactPhone || '+97140000000'}`} className="hover:text-gold transition-colors">{settings?.contactPhone || '+971 4 000 0000'}</a>
            </p>
          </div>
        </div>

        <div className="relative z-10 max-w-container-max mx-auto px-6 md:px-margin-desktop py-6 border-t border-gold/10 flex flex-col md:flex-row justify-between items-center text-xs text-luxury-muted gap-4">
          <p>{settings?.metadata?.footerCopyright || `© ${new Date().getFullYear()} ${siteName} of Companies. All Rights Reserved.`}</p>
          <div className="flex gap-8">
            <Link to="#" className="hover:text-gold transition-colors">Terms of Service</Link>
            <Link to="#" className="hover:text-gold transition-colors">Privacy Policy</Link>
          </div>
        </div>
      </footer>

      <FloatingActions whatsappNumber={settings?.whatsappNumber} />
    </div>
  );
};

export default PublicLayout;

import React, { useState, useEffect } from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import API from '../services/api';

const PublicLayout = () => {
  const location = useLocation();
  const [settings, setSettings] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const res = await API.get('/companies/settings');
        if (res.data.success) {
          setSettings(res.data.data);
        }
      } catch (err) {
        console.error('Error fetching global settings:', err);
      }
    };
    fetchSettings();

    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const siteName = settings?.siteName || 'GEO Group';

  return (
    <div className="flex flex-col min-h-screen">
      {/* Navigation Shell */}
      <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        scrolled 
          ? 'py-2 bg-white/90 shadow-xl' 
          : 'py-4 bg-white/70 backdrop-blur-xl'
      } border-b border-white/20`}>
        <div className="flex justify-between items-center max-w-container-max mx-auto px-margin-desktop h-16">
          <Link to="/" className="font-display text-xl md:text-2xl font-bold text-primary">
            {siteName}
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-10">
            <Link 
              to="/" 
              className={`font-body text-sm ${location.pathname === '/' ? 'text-secondary border-b-2 border-secondary pb-1 font-semibold' : 'text-on-surface hover:text-secondary transition-all'}`}
            >
              Home
            </Link>
            <Link 
              to="/about" 
              className={`font-body text-sm ${location.pathname === '/about' ? 'text-secondary border-b-2 border-secondary pb-1 font-semibold' : 'text-on-surface hover:text-secondary transition-all'}`}
            >
              About
            </Link>
            
            {/* Divisions Dropdown */}
            <div className="relative group">
              <span className="font-body text-sm text-on-surface hover:text-secondary cursor-pointer transition-all flex items-center gap-1">
                Divisions <span className="material-symbols-outlined text-[16px]">expand_more</span>
              </span>
              <div className="absolute top-full left-0 mt-2 w-56 rounded-xl bg-white shadow-xl border border-outline-variant/20 py-2 opacity-0 translate-y-2 pointer-events-none group-hover:opacity-100 group-hover:translate-y-0 group-hover:pointer-events-auto transition-all duration-300 before:content-[''] before:absolute before:-top-2 before:left-0 before:right-0 before:h-2">
                <Link to="/geo-arc" className="block px-4 py-2 hover:bg-surface-container-low text-primary text-sm font-semibold">
                  GEO ARC (Architecture)
                </Link>
                <Link to="/geo-soil-testing" className="block px-4 py-2 hover:bg-surface-container-low text-primary text-sm font-semibold">
                  GEO Soil Testing (Laboratory)
                </Link>
                <Link to="/geo-construction" className="block px-4 py-2 hover:bg-surface-container-low text-primary text-sm font-semibold">
                  GEO Construction (Civil)
                </Link>
              </div>
            </div>

            <Link 
              to="/blog" 
              className={`font-body text-sm ${location.pathname.startsWith('/blog') ? 'text-secondary border-b-2 border-secondary pb-1 font-semibold' : 'text-on-surface hover:text-secondary transition-all'}`}
            >
              Knowledge Center
            </Link>
            <Link 
              to="/contact" 
              className={`font-body text-sm ${location.pathname === '/contact' ? 'text-secondary border-b-2 border-secondary pb-1 font-semibold' : 'text-on-surface hover:text-secondary transition-all'}`}
            >
              Contact
            </Link>
            
            <Link to="/contact" className="bg-primary text-on-primary px-6 py-2.5 rounded-lg font-semibold text-xs hover:scale-105 transition-transform duration-200 shadow-md">
              Get a Quote
            </Link>
          </div>

          {/* Mobile Menu Toggle */}
          <button className="md:hidden text-primary" onClick={() => setMenuOpen(!menuOpen)}>
            <span className="material-symbols-outlined text-2xl">{menuOpen ? 'close' : 'menu'}</span>
          </button>
        </div>

        {/* Mobile Nav Drawer */}
        {menuOpen && (
          <div className="md:hidden bg-white border-b border-outline-variant/20 px-6 py-8 flex flex-col gap-6 shadow-2xl animate-fade-in">
            <Link to="/" onClick={() => setMenuOpen(false)} className="text-primary font-semibold text-lg">Home</Link>
            <Link to="/about" onClick={() => setMenuOpen(false)} className="text-primary font-semibold text-lg">About</Link>
            <div className="border-t border-outline-variant/10 pt-4 space-y-3">
              <p className="text-xs font-bold text-outline-variant uppercase tracking-widest">Divisions</p>
              <Link to="/geo-arc" onClick={() => setMenuOpen(false)} className="block pl-4 text-primary font-semibold">GEO ARC</Link>
              <Link to="/geo-soil-testing" onClick={() => setMenuOpen(false)} className="block pl-4 text-primary font-semibold">GEO Soil Testing</Link>
              <Link to="/geo-construction" onClick={() => setMenuOpen(false)} className="block pl-4 text-primary font-semibold">GEO Construction</Link>
            </div>
            <Link to="/blog" onClick={() => setMenuOpen(false)} className="text-primary font-semibold text-lg">Knowledge Center</Link>
            <Link to="/contact" onClick={() => setMenuOpen(false)} className="text-primary font-semibold text-lg">Contact</Link>
            <Link to="/contact" onClick={() => setMenuOpen(false)} className="bg-primary text-white text-center py-4 rounded-xl font-bold shadow-md">
              Get a Quote
            </Link>
          </div>
        )}
      </nav>

      {/* Main Content Area */}
      <main className="flex-grow">
        <Outlet />
      </main>

      {/* Footer Shell */}
      <footer className="bg-primary text-on-primary w-full border-t border-outline-variant/30 mt-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-gutter max-w-container-max mx-auto px-margin-desktop py-160px">
          <div>
            <div className="font-display text-2xl font-bold text-on-primary mb-6">{siteName}</div>
            <p className="text-outline-variant text-sm mb-6">
              {settings?.metadata?.footerText || "Building tomorrow's infrastructure with today's most advanced technology and precision-led engineering."}
            </p>
            <div className="flex gap-4">
              <a href={settings?.socialLinks?.linkedin || '#'} className="w-10 h-10 rounded-full border border-outline-variant/30 flex items-center justify-center hover:bg-secondary transition-colors"><span className="material-symbols-outlined text-[20px]">language</span></a>
              <a href={settings?.socialLinks?.twitter || '#'} className="w-10 h-10 rounded-full border border-outline-variant/30 flex items-center justify-center hover:bg-secondary transition-colors"><span className="material-symbols-outlined text-[20px]">share</span></a>
            </div>
          </div>
          <div>
            <h4 className="font-display font-semibold text-lg mb-6">Our Divisions</h4>
            <ul className="space-y-4 text-sm text-outline-variant">
              <li><Link to="/geo-arc" className="hover:text-white transition-colors">GEO ARC (Architecture)</Link></li>
              <li><Link to="/geo-soil-testing" className="hover:text-white transition-colors">GEO Soil Testing (Laboratory)</Link></li>
              <li><Link to="/geo-construction" className="hover:text-white transition-colors">GEO Construction (Civil)</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-display font-semibold text-lg mb-6">Quick Links</h4>
            <ul className="space-y-4 text-sm text-outline-variant">
              <li><Link to="/about" className="hover:text-white transition-colors">Company Story</Link></li>
              <li><Link to="/blog" className="hover:text-white transition-colors">Knowledge Center</Link></li>
              <li><Link to="/contact" className="hover:text-white transition-colors">Contact Support</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-display font-semibold text-lg mb-6">Global Headquarters</h4>
            <p className="text-sm text-outline-variant mb-4">{settings?.address || '1200 Elite Tower, Abu Dhabi, UAE'}</p>
            <p className="text-sm text-outline-variant">
              {settings?.contactEmail || 'contact@geogroup.global'}<br/>
              {settings?.contactPhone || '+971 4 000 0000'}
            </p>
          </div>
        </div>
        <div className="max-w-container-max mx-auto px-margin-desktop py-8 border-t border-outline-variant/10 flex flex-col md:flex-row justify-between items-center text-xs text-outline-variant">
          <p>{settings?.metadata?.footerCopyright || `© ${new Date().getFullYear()} ${siteName} of Companies. All Rights Reserved.`}</p>
          <div className="flex gap-8 mt-4 md:mt-0">
            <Link to="#" className="hover:text-white transition-colors">Terms of Service</Link>
            <Link to="#" className="hover:text-white transition-colors">Cookie Policy</Link>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default PublicLayout;

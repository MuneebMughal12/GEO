import React from 'react';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO';

const NotFound = () => (
  <div className="min-h-screen luxe-dark luxe-grain flex items-center justify-center px-6 relative overflow-hidden">
    <SEO title="Page Not Found | GEO Group" />
    <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,rgba(201,162,39,0.12),transparent_55%)]" />
    <div className="relative z-10 text-center max-w-lg">
      <p className="font-display text-[9rem] leading-none font-bold text-gradient-gold">404</p>
      <h1 className="font-display text-3xl font-bold text-ivory mt-2 mb-4">This Page Was Not Found</h1>
      <p className="font-sans text-luxury-muted mb-10">
        The page you are looking for may have been moved, renamed, or is temporarily unavailable.
      </p>
      <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
        <Link to="/" className="btn-gold px-8 py-4 rounded-full font-semibold uppercase tracking-wider text-sm w-full sm:w-auto">
          Back to Home
        </Link>
        <Link to="/contact" className="btn-outline-gold px-8 py-4 rounded-full font-semibold uppercase tracking-wider text-sm w-full sm:w-auto">
          Contact Us
        </Link>
      </div>
    </div>
  </div>
);

export default NotFound;

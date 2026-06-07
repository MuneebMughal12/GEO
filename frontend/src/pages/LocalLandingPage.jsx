import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import API from '../services/api';
import SEO from '../components/SEO';
import SchemaMarkup from '../components/SchemaMarkup';

const LocalLandingPage = () => {
  const { slug } = useParams();
  const [page, setPage] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPage = async () => {
      try {
        const res = await API.get(`/locations/${slug}`);
        if (res.data.success) {
          setPage(res.data.data);
        }
      } catch (err) {
        console.error('Error fetching Local SEO page:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchPage();
  }, [slug]);

  if (loading) {
    return (
      <div className="pt-32 text-center text-on-surface-variant min-h-screen">
        Loading location details...
      </div>
    );
  }

  if (!page) {
    return (
      <div className="pt-32 text-center text-on-surface-variant min-h-screen">
        <h2 className="text-2xl font-bold">Location Page Not Found</h2>
        <Link to="/" className="text-secondary mt-4 block underline">Back to Homepage</Link>
      </div>
    );
  }

  const metaTitle = page.seo?.metaTitle || `${page.title} | GEO Group`;
  const metaDescription = page.seo?.metaDescription || page.description;

  return (
    <div className="relative w-full pt-20 bg-background min-h-screen">
      <SEO title={metaTitle} description={metaDescription} />
      <SchemaMarkup type="LocalBusiness" data={{ name: page.title, description: page.description, city: page.city }} />
      {page.faqs && page.faqs.length > 0 && <SchemaMarkup type="FAQ" data={{ faqs: page.faqs }} />}

      <section className="bg-primary text-white py-20 text-center">
        <div className="max-w-container-max mx-auto px-margin-desktop space-y-4">
          <span className="inline-block py-1 px-3 bg-secondary/20 text-secondary-fixed text-xs font-bold uppercase tracking-wider rounded">
            Local Services: GEO {page.division}
          </span>
          <h1 className="font-display text-3xl md:text-4xl font-extrabold tracking-tight">
            {page.title}
          </h1>
        </div>
      </section>

      <section className="py-24">
        <div className="max-w-3xl mx-auto px-6">
          {/* Main content body (rich text) */}
          <div 
            className="prose prose-blue font-sans text-on-surface-variant leading-relaxed text-base space-y-6"
            dangerouslySetInnerHTML={{ __html: page.content }}
          />

          {/* FAQs section */}
          {page.faqs && page.faqs.length > 0 && (
            <div className="mt-16 space-y-8 border-t border-outline-variant/30 pt-16">
              <h3 className="font-display text-2xl font-bold text-primary mb-8">Frequently Asked Questions</h3>
              <div className="space-y-6">
                {page.faqs.map((faq, idx) => (
                  <div key={idx} className="bg-white p-6 rounded-2xl border border-outline-variant/20 shadow-sm">
                    <h4 className="font-display font-bold text-primary text-sm mb-2">{faq.question}</h4>
                    <p className="font-sans text-xs text-on-surface-variant leading-relaxed">{faq.answer}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default LocalLandingPage;

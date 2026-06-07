import { useEffect } from 'react';

const SchemaMarkup = ({ type, data }) => {
  useEffect(() => {
    if (!data) return;

    let schemaObject = {};

    switch (type) {
      case 'Organization':
        schemaObject = {
          '@context': 'https://schema.org',
          '@type': 'Organization',
          name: 'GEO Group of Companies',
          url: window.location.origin,
          logo: `${window.location.origin}/logo.png`,
          contactPoint: {
            '@type': 'ContactPoint',
            telephone: data.phone || '+971 4 000 0000',
            contactType: 'customer service',
            email: data.email || 'contact@geogroup.global'
          },
          sameAs: [
            data.linkedin || 'https://linkedin.com/company/geogroup',
            data.twitter || 'https://twitter.com/geogroup'
          ]
        };
        break;

      case 'LocalBusiness':
        schemaObject = {
          '@context': 'https://schema.org',
          '@type': 'LocalBusiness',
          name: data.name || 'GEO Soil Testing',
          description: data.description,
          telephone: data.phone || '+971 4 000 0000',
          address: {
            '@type': 'PostalAddress',
            streetAddress: data.address || 'Elite Tower, Financial District',
            addressLocality: data.city || 'Karachi',
            addressRegion: data.region || 'Sindh',
            addressCountry: data.country || 'Pakistan'
          },
          url: window.location.href
        };
        break;

      case 'Service':
        schemaObject = {
          '@context': 'https://schema.org',
          '@type': 'Service',
          serviceType: data.name,
          provider: {
            '@type': 'Organization',
            name: 'GEO Group of Companies'
          },
          description: data.description,
          areaServed: data.city || 'Pakistan'
        };
        break;

      case 'FAQ':
        schemaObject = {
          '@context': 'https://schema.org',
          '@type': 'FAQPage',
          mainEntity: data.faqs.map(faq => ({
            '@type': 'Question',
            name: faq.question,
            acceptedAnswer: {
              '@type': 'Answer',
              text: faq.answer
            }
          }))
        };
        break;

      case 'Project':
        schemaObject = {
          '@context': 'https://schema.org',
          '@type': 'Project',
          name: data.name,
          description: data.description,
          location: {
            '@type': 'Place',
            name: data.location
          },
          provider: {
            '@type': 'Organization',
            name: `GEO ${data.division}`
          }
        };
        break;

      default:
        break;
    }

    // Create script tag
    const scriptId = `jsonld-schema-${type}-${Math.random().toString(36).substr(2, 9)}`;
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.id = scriptId;
    script.innerHTML = JSON.stringify(schemaObject);
    document.head.appendChild(script);

    return () => {
      const el = document.getElementById(scriptId);
      if (el) el.remove();
    };
  }, [type, data]);

  return null;
};

export default SchemaMarkup;

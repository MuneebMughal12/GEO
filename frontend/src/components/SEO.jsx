import { useEffect } from 'react';

const SEO = ({ title, description, keywords = [] }) => {
  useEffect(() => {
    if (title) {
      document.title = title;
    }

    const updateMetaTag = (name, content) => {
      let element = document.querySelector(`meta[name="${name}"]`);
      if (!element) {
        element = document.createElement('meta');
        element.setAttribute('name', name);
        document.head.appendChild(element);
      }
      element.setAttribute('content', content);
    };

    const updateOgTag = (property, content) => {
      let element = document.querySelector(`meta[property="${property}"]`);
      if (!element) {
        element = document.createElement('meta');
        element.setAttribute('property', property);
        document.head.appendChild(element);
      }
      element.setAttribute('content', content);
    };

    if (description) {
      updateMetaTag('description', description);
      updateOgTag('og:description', description);
      updateOgTag('twitter:description', description);
    }

    if (keywords && keywords.length > 0) {
      updateMetaTag('keywords', keywords.join(', '));
    }

    if (title) {
      updateOgTag('og:title', title);
      updateOgTag('twitter:title', title);
    }

    // Set canonical link
    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      document.head.appendChild(canonical);
    }
    canonical.setAttribute('href', window.location.href);

  }, [title, description, keywords]);

  return null;
};

export default SEO;

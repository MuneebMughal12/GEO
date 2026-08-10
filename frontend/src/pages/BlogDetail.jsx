import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import API from '../services/api';
import SEO from '../components/SEO';
import PremiumPageHero from '../components/PremiumPageHero';
import { getMediaUrl } from '../services/media';

const BlogDetail = () => {
  const { slug } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await API.get(`/blog/${slug}`);
        if (res.data.success) {
          setPost(res.data.data);
        }
      } catch (err) {
        console.error('Error fetching blog post:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchPost();
  }, [slug]);

  if (loading) {
    return (
      <div className="pt-32 text-center text-on-surface-variant min-h-screen">
        Loading article details...
      </div>
    );
  }

  if (!post) {
    return (
      <div className="pt-32 text-center text-on-surface-variant min-h-screen">
        <h2 className="text-2xl font-bold">Article Not Found</h2>
        <Link to="/blog" className="text-gold-deep mt-4 block underline">Back to Knowledge Center</Link>
      </div>
    );
  }

  const metaTitle = post.seo?.metaTitle || `${post.title} | GEO Group`;
  const metaDescription = post.seo?.metaDescription || post.summary;

  return (
    <div className="relative w-full bg-ivory min-h-screen">
      <SEO title={metaTitle} description={metaDescription} />

      <PremiumPageHero
        eyebrow={post.category}
        current="Article"
        image={getMediaUrl(post.featuredImage) || 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?q=85&w=2200&auto=format&fit=crop'}
        title={post.title}
        description={post.summary}
        compact
      />

      <article className="max-w-4xl mx-auto px-6 py-20 md:py-28">
        <Link to="/blog" className="text-gold-deep font-display font-semibold text-xs flex items-center gap-1 mb-8 hover:underline">
          <span className="material-symbols-outlined text-[16px]">arrow_back</span> Back to Knowledge Center
        </Link>

        <header className="mb-12 pb-8 border-b border-gold/25">
          <div className="flex justify-between items-center text-xs text-outline font-semibold uppercase tracking-wider">
            <span>By {post.author}</span>
            <span>{new Date(post.createdAt).toLocaleDateString()}</span>
          </div>
        </header>

        {/* Content body */}
        <section className="font-sans text-on-surface-variant leading-[1.9] text-base md:text-lg space-y-7 whitespace-pre-wrap first-letter:font-display first-letter:text-6xl first-letter:font-bold first-letter:text-gold-deep first-letter:float-left first-letter:mr-3 first-letter:leading-none">
          {post.content}
        </section>
      </article>
    </div>
  );
};

export default BlogDetail;

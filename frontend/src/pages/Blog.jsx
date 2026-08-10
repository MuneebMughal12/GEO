import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import API from '../services/api';
import SEO from '../components/SEO';
import PremiumPageHero from '../components/PremiumPageHero';
import { getMediaUrl } from '../services/media';

const Blog = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await API.get('/blog');
        if (res.data.success) {
          setPosts(res.data.data);
        }
      } catch (err) {
        console.error('Error fetching articles:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchPosts();
  }, []);

  return (
    <div className="relative w-full bg-ivory">
      <SEO 
        title="Knowledge Center | GEO Group" 
        description="Browse technical articles, engineering guides, and soil testing methodologies authored by GEO Group experts."
      />

      <PremiumPageHero
        eyebrow="Ideas & Intelligence"
        current="Knowledge"
        image="https://images.unsplash.com/photo-1455390582262-044cdead277a?q=85&w=2200&auto=format&fit=crop"
        title={<>Knowledge that moves<br /><span className="text-gradient-gold italic">projects forward.</span></>}
        description="Technical perspectives, field intelligence and practical guidance from GEO Group specialists."
        compact
      />

      {/* List Grid */}
      <section className="py-24 md:py-36 bg-ivory">
        <div className="max-w-container-max mx-auto px-6 md:px-margin-desktop">
          <div className="grid md:grid-cols-2 gap-8 items-end mb-14">
            <div><p className="luxe-eyebrow mb-4">Latest Thinking</p><h2 className="font-display text-4xl md:text-5xl font-bold text-ink leading-tight">Insights from the field.</h2></div>
            <p className="text-on-surface-variant leading-relaxed md:border-l md:border-gold/30 md:pl-8">Explore the decisions, methods and technical lessons behind stronger architecture, safer foundations and better construction outcomes.</p>
          </div>
          {loading ? (
            <p className="text-center text-on-surface-variant">Loading insights...</p>
          ) : posts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-gutter">
              {posts.map((post) => (
                <article key={post._id} className="bg-white border border-gold/15 overflow-hidden shadow-luxe-soft hover:-translate-y-2 hover:shadow-luxe transition-all duration-500 flex flex-col">
                  <Link to={`/blog/${post.slug}`} className="block h-60 overflow-hidden bg-ink">
                    <img src={getMediaUrl(post.featuredImage) || 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?q=85&w=1000&auto=format&fit=crop'} alt={post.title} className="w-full h-full object-cover opacity-85 hover:scale-105 transition-transform duration-700" loading="lazy" decoding="async" />
                  </Link>
                  <div className="p-7 space-y-4 flex-grow">
                    <span className="inline-block px-3 py-1 rounded bg-gold/15 text-gold-deep text-[10px] font-bold uppercase tracking-wider">
                      {post.category}
                    </span>
                    <h3 className="font-display font-bold text-primary text-lg">
                      <Link to={`/blog/${post.slug}`} className="hover:text-gold-deep transition-colors">
                        {post.title}
                      </Link>
                    </h3>
                    <p className="font-sans text-xs text-on-surface-variant leading-relaxed">
                      {post.summary}
                    </p>
                  </div>
                  <div className="px-7 py-5 border-t border-gold/15 flex justify-between items-center text-xs text-outline font-semibold">
                    <span>By {post.author}</span>
                    <Link to={`/blog/${post.slug}`} className="text-gold-deep hover:underline flex items-center gap-1">
                      Read Article <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <p className="text-center text-on-surface-variant py-12">No articles published yet.</p>
          )}
        </div>
      </section>
    </div>
  );
};

export default Blog;

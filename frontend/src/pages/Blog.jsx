import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import API from '../services/api';
import SEO from '../components/SEO';

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
    <div className="relative w-full pt-20">
      <SEO 
        title="Knowledge Center | GEO Group" 
        description="Browse technical articles, engineering guides, and soil testing methodologies authored by GEO Group experts."
      />

      {/* Header */}
      <section className="bg-primary text-white py-24 text-center">
        <div className="max-w-container-max mx-auto px-margin-desktop space-y-4">
          <h1 className="font-display text-4xl md:text-5xl font-extrabold tracking-tight">Knowledge Center</h1>
          <p className="font-sans text-white/80 max-w-xl mx-auto text-sm md:text-base">Technical insights and industry whitepapers from our engineering divisions.</p>
        </div>
      </section>

      {/* List Grid */}
      <section className="py-24 bg-background">
        <div className="max-w-container-max mx-auto px-margin-desktop">
          {loading ? (
            <p className="text-center text-on-surface-variant">Loading insights...</p>
          ) : posts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-gutter">
              {posts.map((post) => (
                <article key={post._id} className="bg-white rounded-2xl border border-outline-variant/30 overflow-hidden shadow-sm hover:shadow-lg transition-shadow duration-300 flex flex-col justify-between">
                  <div className="p-6 space-y-4">
                    <span className="inline-block px-3 py-1 rounded bg-secondary/15 text-secondary text-[10px] font-bold uppercase tracking-wider">
                      {post.category}
                    </span>
                    <h3 className="font-display font-bold text-primary text-lg">
                      <Link to={`/blog/${post.slug}`} className="hover:text-secondary transition-colors">
                        {post.title}
                      </Link>
                    </h3>
                    <p className="font-sans text-xs text-on-surface-variant leading-relaxed">
                      {post.summary}
                    </p>
                  </div>
                  <div className="p-6 pt-0 border-t border-outline-variant/10 flex justify-between items-center text-xs text-outline font-semibold">
                    <span>By {post.author}</span>
                    <Link to={`/blog/${post.slug}`} className="text-secondary hover:underline flex items-center gap-1">
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

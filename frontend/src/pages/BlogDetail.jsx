import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import API from '../services/api';
import SEO from '../components/SEO';

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
        <Link to="/blog" className="text-secondary mt-4 block underline">Back to Knowledge Center</Link>
      </div>
    );
  }

  const metaTitle = post.seo?.metaTitle || `${post.title} | GEO Group`;
  const metaDescription = post.seo?.metaDescription || post.summary;

  return (
    <div className="relative w-full pt-20 bg-background min-h-screen">
      <SEO title={metaTitle} description={metaDescription} />

      <article className="max-w-3xl mx-auto px-6 py-20">
        <Link to="/blog" className="text-secondary font-display font-semibold text-xs flex items-center gap-1 mb-8 hover:underline">
          <span className="material-symbols-outlined text-[16px]">arrow_back</span> Back to Knowledge Center
        </Link>

        <header className="space-y-4 mb-10 pb-8 border-b border-outline-variant/30">
          <span className="bg-secondary/10 text-secondary px-3 py-1 rounded text-xs font-bold uppercase tracking-wider">
            {post.category}
          </span>
          <h1 className="font-display text-3xl md:text-4xl font-extrabold text-primary leading-tight">
            {post.title}
          </h1>
          <div className="flex justify-between items-center text-xs text-outline font-semibold">
            <span>By {post.author}</span>
            <span>{new Date(post.createdAt).toLocaleDateString()}</span>
          </div>
        </header>

        {/* Content body */}
        <section className="font-sans text-on-surface-variant leading-relaxed text-base space-y-6 whitespace-pre-wrap">
          {post.content}
        </section>
      </article>
    </div>
  );
};

export default BlogDetail;

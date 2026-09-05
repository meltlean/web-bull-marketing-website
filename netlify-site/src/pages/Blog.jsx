import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import { getBlogPosts, applyMeta } from '../lib/content.js';

export default function Blog() {
  const posts = getBlogPosts();
  useEffect(() => { applyMeta('Blog | Web Bull Marketing', 'Insights on pipeline, marketing, and revenue for remodeling businesses.'); }, []);

  return (
    <section style={{ paddingTop: 130 }}>
      <div className="wrap">
        <div className="section-head">
          <div className="eyebrow"><span>From The Blog</span></div>
          <h2>Pipeline &amp; revenue insights for remodelers</h2>
        </div>
        <div className="blog-grid">
          {posts.map((post) => (
            <div className="glass-card blog-card" key={post.slug}>
              {post.image && (
                <Link to={`/blog/${post.slug}`}>
                  <img src={post.image} alt={post.title} className="blog-card-image" />
                </Link>
              )}
              <div className="blog-date">{post.date}</div>
              <h3><Link to={`/blog/${post.slug}`}>{post.title}</Link></h3>
              <p>{post.excerpt}</p>
              <Link className="read-more" to={`/blog/${post.slug}`}>Read more <ChevronRight size={14} /></Link>
            </div>
          ))}
          {posts.length === 0 && <p style={{ color: 'var(--gray-light)' }}>No posts yet — add one from the Site Admin.</p>}
        </div>
      </div>
    </section>
  );
}

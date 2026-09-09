import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import { getPostsByCategory, getCategoryMeta, applyMeta } from '../lib/content.js';

export default function CategoryPage({ category, seoTitleOverride, seoDescriptionOverride }) {
  const meta = getCategoryMeta(category);
  const posts = getPostsByCategory(category);

  useEffect(() => {
    applyMeta(
      seoTitleOverride || `${meta.label} | Web Bull Marketing`,
      seoDescriptionOverride || `${meta.label} articles and insights for design-build firms and high-end remodelers nationwide.`
    );
  }, [category]);

  return (
    <section style={{ paddingTop: 130 }}>
      <div className="wrap">
        <div className="section-head">
          <div className="eyebrow"><span>Resources</span></div>
          <h2>{meta.label}</h2>
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
          {posts.length === 0 && (
            <p style={{ color: 'var(--gray-light)' }}>No articles here yet — add one from the Site Admin and tag it with this category.</p>
          )}
        </div>
      </div>
    </section>
  );
}

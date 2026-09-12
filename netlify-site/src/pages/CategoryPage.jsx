import React from 'react';
import { Link } from 'react-router-dom';
import { Head } from 'vite-react-ssg';
import { ChevronRight } from 'lucide-react';
import { getPostsByCategory, getCategoryMeta } from '../lib/content.js';

export default function CategoryPage({ category, seoTitleOverride, seoDescriptionOverride }) {
  const meta = getCategoryMeta(category);
  const posts = getPostsByCategory(category);
  const seoTitle = seoTitleOverride || `${meta.label} | Web Bull Marketing`;
  const seoDescription = seoDescriptionOverride || `${meta.label} articles and insights for design-build firms and high-end remodelers nationwide.`;

  return (
    <section style={{ paddingTop: 130 }}>
      <Head>
        <title>{seoTitle}</title>
        <meta name="description" content={seoDescription} />
      </Head>
      <div className="wrap">
        <div className="section-head">
          <div className="eyebrow"><span>Resources</span></div>
          <h1>{meta.label}</h1>
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

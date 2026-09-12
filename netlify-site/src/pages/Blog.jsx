import React from 'react';
import { Link } from 'react-router-dom';
import { Head } from 'vite-react-ssg';
import { ChevronRight } from 'lucide-react';
import { getBlogPosts } from '../lib/content.js';

export default function Blog() {
  const posts = getBlogPosts();

  return (
    <section style={{ paddingTop: 130 }}>
      <Head>
        <title>Blog | Web Bull Marketing</title>
        <meta name="description" content="Insights on pipeline, marketing, and revenue for remodeling businesses." />
      </Head>
      <div className="wrap">
        <div className="section-head">
          <div className="eyebrow"><span>From The Blog</span></div>
          <h1>Pipeline &amp; revenue insights for remodelers</h1>
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

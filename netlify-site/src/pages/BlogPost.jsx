import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ChevronLeft } from 'lucide-react';
import { getBlogPostBySlug, applyMeta, renderMarkdown } from '../lib/content.js';

export default function BlogPost() {
  const { slug } = useParams();
  const post = getBlogPostBySlug(slug);

  useEffect(() => {
    if (post) applyMeta(`${post.title} | Bull Marketing`, post.excerpt);
  }, [post]);

  if (!post) {
    return (
      <div className="wrap" style={{ padding: '140px 0', textAlign: 'center', color: 'var(--gray-light)' }}>
        Post not found. <Link to="/blog" style={{ color: 'var(--green-bright)' }}>Back to blog</Link>
      </div>
    );
  }

  return (
    <section style={{ paddingTop: 130 }}>
      <div className="wrap" style={{ maxWidth: 760 }}>
        <Link to="/blog" className="back-link"><ChevronLeft size={15} /> Back to blog</Link>
        <div className="blog-date" style={{ marginTop: 24 }}>{post.date}</div>
        <h1 style={{ marginTop: 10 }}>{post.title}</h1>
        {post.image && (
          <img src={post.image} alt={post.title} className="blog-featured-image" />
        )}
        <div className="blog-content" dangerouslySetInnerHTML={{ __html: renderMarkdown(post.body) }} />
      </div>
    </section>
  );
}

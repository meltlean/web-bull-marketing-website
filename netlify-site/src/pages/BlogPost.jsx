import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { Head } from 'vite-react-ssg';
import { ChevronLeft } from 'lucide-react';
import { getBlogPostBySlug, renderMarkdown } from '../lib/content.js';

export default function BlogPost() {
  const { slug } = useParams();
  const post = getBlogPostBySlug(slug);

  if (!post) {
    return (
      <div className="wrap" style={{ padding: '140px 0', textAlign: 'center', color: 'var(--gray-light)' }}>
        Post not found. <Link to="/blog" style={{ color: 'var(--green-bright)' }}>Back to blog</Link>
      </div>
    );
  }

  const title = post.seo_title && post.seo_title.trim() ? post.seo_title : `${post.title} | Web Bull Marketing`;
  const description = post.seo_description && post.seo_description.trim() ? post.seo_description : post.excerpt;

  return (
    <section style={{ paddingTop: 130 }}>
      <Head>
        <title>{title}</title>
        {description && <meta name="description" content={description} />}
      </Head>
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

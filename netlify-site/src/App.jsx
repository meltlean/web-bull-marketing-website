import React, { useEffect, useRef, useState } from 'react';
import { Routes, Route, Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, Calendar, Instagram, Facebook, Twitter, Linkedin, Youtube, Music2, Globe } from 'lucide-react';
import { getSettings, applyGA, injectEmbedCode, applyCustomHeadCode } from './lib/content.js';

import Home from './pages/Home.jsx';
import About from './pages/About.jsx';
import Services from './pages/Services.jsx';
import Pricing from './pages/Pricing.jsx';
import Testimonials from './pages/Testimonials.jsx';
import FAQ from './pages/FAQ.jsx';
import Blog from './pages/Blog.jsx';
import BlogPost from './pages/BlogPost.jsx';
import Contact from './pages/Contact.jsx';

const NAV_ITEMS = [
  { to: '/', label: 'Home' },
  { to: '/services', label: 'Services' },
  { to: '/pricing', label: 'Pricing' },
  { to: '/testimonials', label: 'Testimonials' },
  { to: '/faq', label: 'FAQ' },
  { to: '/blog', label: 'Blog' },
  { to: '/about', label: 'About' },
  { to: '/contact', label: 'Contact' },
];

function iconFor(name) {
  const n = (name || '').toLowerCase();
  if (n.includes('face')) return Facebook;
  if (n.includes('twit') || n.includes('x')) return Twitter;
  if (n.includes('link')) return Linkedin;
  if (n.includes('you')) return Youtube;
  if (n.includes('tik')) return Music2;
  return Globe;
}

export default function App() {
  const settings = getSettings();
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const chatbotRef = useRef(null);
  const bookingLink = settings.booking_link || '#';

  useEffect(() => { setMobileNavOpen(false); window.scrollTo({ top: 0 }); }, [location.pathname]);
  useEffect(() => { applyGA(settings.ga_id); }, [settings.ga_id]);
  useEffect(() => { applyCustomHeadCode(settings.custom_head_code); }, [settings.custom_head_code]);
  useEffect(() => { injectEmbedCode(chatbotRef.current, settings.chatbot_embed); }, [settings.chatbot_embed]);

  const socials = [
    { name: 'Instagram', url: settings.instagram, Icon: Instagram },
    ...((settings.socials || []).map((s) => ({ ...s, Icon: iconFor(s.name) }))),
  ].filter((s) => s.url);

  return (
    <div className="wbm-root">
      <div className="glow-field"><div className="orb red" /><div className="orb green" /><div className="orb gray" /></div>
      <div className="grain" />

      <div className="topbar">
        <div className="wrap topbar-inner">
          <Link to="/" className="brandmark"><img src="/logo.png" alt="Web Bull Marketing" /></Link>
          <nav className="nav-links desktop-only">
            {NAV_ITEMS.map((item) => (
              <Link key={item.to} to={item.to} className={location.pathname === item.to ? 'active' : ''}>{item.label}</Link>
            ))}
          </nav>
          <div className="nav-right">
            <a href={bookingLink} target="_blank" rel="noreferrer" className="cta-mini desktop-only"><Calendar size={14} /> Book a Call</a>
            <button className="icon-btn mobile-only" onClick={() => setMobileNavOpen((v) => !v)}>{mobileNavOpen ? <X size={18} /> : <Menu size={18} />}</button>
          </div>
        </div>
        {mobileNavOpen && (
          <div className="mobile-nav wrap">
            {NAV_ITEMS.map((item) => (<Link key={item.to} to={item.to}>{item.label}</Link>))}
            <a href={bookingLink} target="_blank" rel="noreferrer" className="cta-mini" style={{ marginTop: 10, justifyContent: 'center' }}><Calendar size={14} /> Book a Call</a>
          </div>
        )}
      </div>

      <main>
        <Routes>
          <Route path="/" element={<Home bookingLink={bookingLink} />} />
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<Services />} />
          <Route path="/pricing" element={<Pricing bookingLink={bookingLink} />} />
          <Route path="/testimonials" element={<Testimonials />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:slug" element={<BlogPost />} />
          <Route path="/contact" element={<Contact bookingLink={bookingLink} formEmbedUrl={settings.form_embed_url} socials={socials} />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>

      <footer>
        <div className="wrap">
          <Link to="/" className="brandmark" style={{ justifyContent: 'center' }}><img src="/logo.png" alt="Web Bull Marketing" style={{ height: 24 }} /></Link>
          {socials.length > 0 && (
            <div className="social-row" style={{ justifyContent: 'center', margin: '18px 0' }}>
              {socials.map((s, i) => (<a key={i} href={s.url} target="_blank" rel="noreferrer" className="social-btn" title={s.name}><s.Icon size={16} /></a>))}
            </div>
          )}
          Pipeline Revenue Audit &middot; Built for remodelers who close on legacy homes
          <div style={{ marginTop: 10 }}><a href="/admin/" style={{ color: 'var(--gray)', fontSize: 12 }}>Site Admin</a></div>
        </div>
      </footer>

      <div ref={chatbotRef} id="wbm-chatbot-mount" />
    </div>
  );
}

function NotFound() {
  const navigate = useNavigate();
  return (
    <div className="wrap" style={{ padding: '140px 0', textAlign: 'center' }}>
      <h1 style={{ fontSize: 32 }}>Page not found</h1>
      <p style={{ color: 'var(--gray-light)', marginTop: 12 }}>That page doesn't exist.</p>
      <button className="btn btn-primary" style={{ marginTop: 24 }} onClick={() => navigate('/')}>Back Home</button>
    </div>
  );
}

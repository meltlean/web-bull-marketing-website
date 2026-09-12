import React from 'react';
import Layout from './Layout.jsx';
import { getBlogPosts, getCustomPages } from './lib/content.js';

import Home from './pages/Home.jsx';
import About from './pages/About.jsx';
import Services from './pages/Services.jsx';
import Pricing from './pages/Pricing.jsx';
import Testimonials from './pages/Testimonials.jsx';
import FAQ from './pages/FAQ.jsx';
import Blog from './pages/Blog.jsx';
import BlogPost from './pages/BlogPost.jsx';
import Contact from './pages/Contact.jsx';
import RemodelingGrowthCalculator from './pages/RemodelingGrowthCalculator.jsx';
import ResourcesHub from './pages/ResourcesHub.jsx';
import MarketingIntelligenceHub from './pages/MarketingIntelligenceHub.jsx';
import CategoryPage from './pages/CategoryPage.jsx';
import CustomPage from './pages/CustomPage.jsx';
import NotFound from './pages/NotFound.jsx';

export const routes = [
  {
    path: '/',
    element: <Layout />,
    children: [
      { index: true, element: <Home /> },
      { path: 'about', element: <About /> },
      { path: 'services', element: <Services /> },
      { path: 'pricing', element: <Pricing /> },
      { path: 'testimonials', element: <Testimonials /> },
      { path: 'faq', element: <FAQ /> },
      { path: 'blog', element: <Blog /> },
      {
        path: 'blog/:slug',
        element: <BlogPost />,
        getStaticPaths: () => getBlogPosts().map((p) => `blog/${p.slug}`),
      },
      { path: 'resources', element: <ResourcesHub /> },
      { path: 'marketing-intelligence', element: <MarketingIntelligenceHub /> },
      { path: 'web-marketing-intelligence', element: <CategoryPage category="web-marketing-intelligence" /> },
      { path: 'local-seo', element: <CategoryPage category="local-seo" /> },
      { path: 'google-ads', element: <CategoryPage category="google-ads" /> },
      { path: 'ai-search', element: <CategoryPage category="ai-search" /> },
      { path: 'contractor-marketing', element: <CategoryPage category="contractor-marketing" /> },
      { path: 'contractor-marketing-guides', element: <CategoryPage category="contractor-marketing-guides" /> },
      { path: 'case-studies', element: <CategoryPage category="case-studies" /> },
      { path: 'tools-calculators', element: <CategoryPage category="tools-calculators" /> },
      { path: 'contact', element: <Contact /> },
      { path: 'remodeling-growth-calculator', element: <RemodelingGrowthCalculator /> },
      {
        path: ':slug',
        element: <CustomPage />,
        getStaticPaths: () => getCustomPages().map((p) => p.slug),
      },
      { path: '*', element: <NotFound /> },
    ],
  },
];

export default routes;

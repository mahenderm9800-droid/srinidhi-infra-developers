import React, { lazy, Suspense, useEffect } from 'react';
import { BrowserRouter as Router, useLocation } from './router';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import WhatsAppButton from './components/WhatsAppButton';
import SEOManager from './components/SEOManager';

const Home = lazy(() => import('./pages/Home'));
const About = lazy(() => import('./pages/About'));
const Services = lazy(() => import('./pages/Services'));
const Projects = lazy(() => import('./pages/Projects'));
const ProjectDetail = lazy(() => import('./pages/ProjectDetail'));
const Blog = lazy(() => import('./pages/Blog'));
const BlogPost = lazy(() => import('./pages/BlogPost'));
const Contact = lazy(() => import('./pages/Contact'));
const NotFound = lazy(() => import('./pages/NotFound'));

// Scroll to Top on Page Navigation
const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

function App() {
  return (
    <Router>
      <Website />
    </Router>
  );
}

const Website = () => {
  const { pathname } = useLocation();
  const normalizedPath = pathname !== '/' ? pathname.replace(/\/+$/, '') : '/';
  let Page = NotFound;

  if (normalizedPath === '/') Page = Home;
  else if (normalizedPath === '/about') Page = About;
  else if (normalizedPath === '/services') Page = Services;
  else if (normalizedPath === '/projects') Page = Projects;
  else if (/^\/projects\/[^/]+$/.test(normalizedPath)) Page = ProjectDetail;
  else if (normalizedPath === '/blog') Page = Blog;
  else if (/^\/blog\/[^/]+$/.test(normalizedPath)) Page = BlogPost;
  else if (normalizedPath === '/contact') Page = Contact;

  return (
    <>
      <ScrollToTop />
      <SEOManager />
      <div className="flex flex-col min-h-screen bg-white text-slate-900">
        <Navbar />
        <div className="flex-grow">
          <Suspense fallback={<div className="min-h-[60vh] bg-white" aria-live="polite" />}>
            <Page />
          </Suspense>
        </div>
        <Footer />
        <WhatsAppButton />
      </div>
    </>
  );
};

export default App;

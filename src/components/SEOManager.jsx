import { useEffect } from 'react';
import { useLocation } from '../router';

const SITE_URL = 'https://srinidhiinfradevelopers.com';
const DEFAULT_IMAGE = `${SITE_URL}/og-cover.webp`;

const routeMetadata = {
  '/': {
    title: 'Srinidhi Infra Developers | Premium Construction & Real Estate in Hyderabad',
    description: 'Srinidhi Infra Developers delivers premium residential, commercial and turnkey construction projects in Hyderabad with transparent pricing and dependable execution.'
  },
  '/about': {
    title: 'About Srinidhi Infra Developers | Hyderabad Construction Company',
    description: 'Meet Srinidhi Infra Developers, our leadership, values and quality-led approach to residential and commercial construction in Hyderabad.'
  },
  '/services': {
    title: 'Construction & Real Estate Services in Hyderabad | Srinidhi Infra',
    description: 'Explore turnkey construction, architectural design, project management and real estate development services from Srinidhi Infra Developers.'
  },
  '/projects': {
    title: 'Construction & Real Estate Projects in Hyderabad | Srinidhi Infra',
    description: 'View residential, commercial and plotted development projects delivered and managed by Srinidhi Infra Developers across Hyderabad.'
  },
  '/blog': {
    title: 'Hyderabad Construction & Real Estate Insights | Srinidhi Infra',
    description: 'Read practical guidance on construction quality, property investment, RERA compliance and real estate trends in Hyderabad and Telangana.'
  },
  '/contact': {
    title: 'Contact Srinidhi Infra Developers | Construction Enquiry Hyderabad',
    description: 'Contact Srinidhi Infra Developers for construction package details, project consultations and real estate enquiries in Hyderabad.'
  }
};

const setMeta = (selector, attribute, value) => {
  let element = document.head.querySelector(selector);
  if (!element) {
    element = document.createElement('meta');
    const [name, key] = attribute;
    element.setAttribute(name, key);
    document.head.appendChild(element);
  }
  element.setAttribute('content', value);
};

const SEOManager = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    const cleanPath = pathname !== '/' ? pathname.replace(/\/+$/, '') : '/';
    const isProject = cleanPath.startsWith('/projects/');
    const isBlogPost = cleanPath.startsWith('/blog/');
    const metadata = routeMetadata[cleanPath] || (isProject
      ? {
          title: 'Project Details | Srinidhi Infra Developers',
          description: 'Explore project specifications, amenities and enquiry details from Srinidhi Infra Developers in Hyderabad.'
        }
      : isBlogPost
        ? {
            title: 'Construction & Real Estate Article | Srinidhi Infra Developers',
            description: 'Read expert construction and real estate guidance from Srinidhi Infra Developers in Hyderabad.'
          }
        : {
            title: 'Page Not Found | Srinidhi Infra Developers',
            description: 'The requested page could not be found. Explore Srinidhi Infra Developers projects and services.'
          });

    const canonicalUrl = `${SITE_URL}${cleanPath === '/' ? '/' : cleanPath}`;
    document.title = metadata.title;
    setMeta("meta[name='description']", ['name', 'description'], metadata.description);
    setMeta("meta[name='robots']", ['name', 'robots'], routeMetadata[cleanPath] || isProject || isBlogPost
      ? 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1'
      : 'noindex, follow');
    setMeta("meta[property='og:title']", ['property', 'og:title'], metadata.title);
    setMeta("meta[property='og:description']", ['property', 'og:description'], metadata.description);
    setMeta("meta[property='og:url']", ['property', 'og:url'], canonicalUrl);
    setMeta("meta[property='og:image']", ['property', 'og:image'], DEFAULT_IMAGE);
    setMeta("meta[name='twitter:title']", ['name', 'twitter:title'], metadata.title);
    setMeta("meta[name='twitter:description']", ['name', 'twitter:description'], metadata.description);
    setMeta("meta[name='twitter:image']", ['name', 'twitter:image'], DEFAULT_IMAGE);

    let canonical = document.head.querySelector("link[rel='canonical']");
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      document.head.appendChild(canonical);
    }
    canonical.setAttribute('href', canonicalUrl);
  }, [pathname]);

  return null;
};

export default SEOManager;

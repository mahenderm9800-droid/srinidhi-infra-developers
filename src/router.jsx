import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';

const RouterContext = createContext(null);

export const BrowserRouter = ({ children }) => {
  const [pathname, setPathname] = useState(() => window.location.pathname || '/');

  useEffect(() => {
    const handleNavigation = () => setPathname(window.location.pathname || '/');
    window.addEventListener('popstate', handleNavigation);
    return () => window.removeEventListener('popstate', handleNavigation);
  }, []);

  const navigate = (to, { replace = false } = {}) => {
    const target = new URL(to, window.location.origin);
    if (target.origin !== window.location.origin) {
      window.location.assign(target.href);
      return;
    }
    window.history[replace ? 'replaceState' : 'pushState']({}, '', `${target.pathname}${target.search}${target.hash}`);
    setPathname(target.pathname || '/');
  };

  const value = useMemo(() => ({ pathname, navigate }), [pathname]);
  return <RouterContext.Provider value={value}>{children}</RouterContext.Provider>;
};

export const useLocation = () => {
  const context = useContext(RouterContext);
  if (!context) throw new Error('useLocation must be used inside BrowserRouter.');
  return { pathname: context.pathname };
};

export const useParams = () => {
  const { pathname } = useLocation();
  const match = pathname.match(/^\/(?:projects|blog)\/([^/?#]+)\/?$/);
  return { id: match ? decodeURIComponent(match[1]) : undefined };
};

export const Link = ({ to, onClick, target, children, ...props }) => {
  const context = useContext(RouterContext);

  const handleClick = (event) => {
    onClick?.(event);
    if (
      event.defaultPrevented ||
      event.button !== 0 ||
      event.metaKey ||
      event.ctrlKey ||
      event.shiftKey ||
      event.altKey ||
      target === '_blank'
    ) return;

    event.preventDefault();
    context.navigate(to);
  };

  return <a href={to} target={target} onClick={handleClick} {...props}>{children}</a>;
};

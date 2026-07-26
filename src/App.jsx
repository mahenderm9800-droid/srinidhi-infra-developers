import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import About from './pages/About';
import Services from './pages/Services';
import Blog from './pages/Blog';
import BlogPost from './pages/BlogPost';
import Contact from './pages/Contact';
import Admin from './pages/Admin';
import AdminLogin from './pages/AdminLogin';

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
      <ScrollToTop />
      <div className="flex flex-col min-h-screen bg-white text-slate-900">
        <Routes>
          {/* Admin layouts shouldn't show standard Navbar/Footer */}
          <Route 
            path="/admin/*" 
            element={
              <Routes>
                <Route index element={<Admin />} />
                <Route path="login" element={<AdminLogin />} />
              </Routes>
            } 
          />
          
          {/* Main Website Layout */}
          <Route 
            path="/*" 
            element={
              <>
                <Navbar />
                <div className="flex-grow">
                  <Routes>
                    <Route index element={<Home />} />
                    <Route path="about" element={<About />} />
                    <Route path="services" element={<Services />} />
                    <Route path="blog" element={<Blog />} />
                    <Route path="blog/:id" element={<BlogPost />} />
                    <Route path="contact" element={<Contact />} />
                  </Routes>
                </div>
                <Footer />
              </>
            } 
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

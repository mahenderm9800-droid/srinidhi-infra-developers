import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, User, Calendar, ArrowRight } from 'lucide-react';
import { getPosts } from '../services/db';
import PageHero from '../components/PageHero';

const Blog = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadPosts = async () => {
      try {
        const data = await getPosts();
        setPosts(data);
      } catch (err) {
        console.error("Error fetching posts", err);
      } finally {
        setLoading(false);
      }
    };
    loadPosts();
  }, []);

  return (
    <div className="bg-white min-h-screen text-slate-800 font-sans">
      {/* Header Banner */}
      <PageHero
        eyebrow="Market Insights"
        title="News & Blogs"
        align="left"
        image="https://images.unsplash.com/photo-1457369804613-52c61a468e7d?auto=format&fit=crop&w=1600&q=80"
        description="Keep up to date with real estate guidelines, investment updates, legal rules, and infrastructure announcements in Hyderabad."
      />


      {/* Blog Listing Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-16 relative overflow-hidden">
        {/* Glow Blob */}
        <div className="glow-blob w-96 h-96 bg-accent-400/10 top-20 right-10" />

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 relative z-10">
            {[1, 2].map((n) => (
              <div key={n} className="bg-white rounded-2xl border border-slate-200 h-96 animate-pulse" />
            ))}
          </div>
        ) : posts.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-2xl border border-slate-205 shadow-sm relative z-10">
            <BookOpen className="h-12 w-12 text-slate-350 mx-auto mb-4" />
            <h3 className="font-serif text-lg font-bold text-slate-800 mb-2">No Articles Published</h3>
            <p className="text-sm text-slate-500">Check back later for real estate news and guides.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 relative z-10">
            {posts.map((post) => (
              <article 
                key={post.id} 
                className="premium-card premium-card-hover card-sheen overflow-hidden flex flex-col group"
              >
                <div className="relative h-48 sm:h-64 overflow-hidden bg-slate-100">
                  <img 
                    src={post.coverImageUrl} 
                    alt={post.title} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-4 left-4 bg-slate-900/80 backdrop-blur-md text-white text-[10px] font-bold px-3 py-1 rounded-full tracking-wide uppercase">
                    Guides & Analysis
                  </div>
                </div>

                <div className="p-6 sm:p-8 flex-grow flex flex-col justify-between">
                  <div className="space-y-3">
                    <div className="flex flex-wrap gap-4 text-[10px] text-slate-500 font-bold uppercase tracking-wider">
                      <span className="flex items-center">
                        <Calendar className="h-3.5 w-3.5 mr-1.5 text-accent-600" />
                        {new Date(post.publishedAt).toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' })}
                      </span>
                      <span className="flex items-center">
                        <User className="h-3.5 w-3.5 mr-1.5 text-accent-600" />
                        {post.author}
                      </span>
                    </div>

                    <h2 className="font-serif text-lg sm:text-xl font-bold text-slate-900 group-hover:text-accent-600 transition-colors leading-snug">
                      {post.title}
                    </h2>
                    
                    <p className="text-xs text-slate-500 leading-relaxed font-light line-clamp-3">
                      {post.content}
                    </p>
                  </div>

                  <div className="border-t border-slate-100 pt-5 mt-6">
                    <Link 
                      to={`/blog/${post.id}`} 
                      className="inline-flex items-center text-xs font-bold text-accent-600 hover:text-accent-700 transition-colors group/link"
                    >
                      Read Full Article 
                      <ArrowRight className="h-3.5 w-3.5 ml-1.5 group-hover/link:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

export default Blog;

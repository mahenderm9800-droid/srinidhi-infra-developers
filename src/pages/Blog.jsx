import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, User, Calendar, ArrowRight } from 'lucide-react';
import { getPosts } from '../services/db';

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
    <div className="bg-slate-50 min-h-screen">
      {/* Header Banner */}
      <section className="bg-gradient-to-r from-emerald-800 to-emerald-950 pt-32 pb-12 text-white relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center md:text-left">
          <span className="text-accent-400 text-xs font-semibold tracking-widest uppercase block mb-2">Market Insights</span>
          <h1 className="text-3xl sm:text-4xl font-serif font-bold text-white">News & Blogs</h1>
          <p className="text-xs sm:text-sm text-slate-450 mt-2 max-w-xl">
            Keep up to date with real estate guidelines, investment updates, legal rules, and infrastructure announcements in Hyderabad.
          </p>
        </div>
      </section>

      {/* Blog Listing Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[1, 2].map((n) => (
              <div key={n} className="bg-white rounded-xl border border-slate-200 h-96 animate-pulse" />
            ))}
          </div>
        ) : posts.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-xl border border-slate-205 shadow-sm">
            <BookOpen className="h-12 w-12 text-slate-350 mx-auto mb-4" />
            <h3 className="font-serif text-lg font-bold text-slate-800 mb-2">No Articles Published</h3>
            <p className="text-sm text-slate-500">Check back later for real estate news and guides.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {posts.map((post) => (
              <article 
                key={post.id} 
                className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 flex flex-col group"
              >
                <div className="relative h-60 overflow-hidden bg-slate-100">
                  <img 
                    src={post.coverImageUrl} 
                    alt={post.title} 
                    className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-300"
                  />
                  <div className="absolute top-4 left-4 bg-emerald-700/90 text-white text-[10px] font-bold px-2.5 py-1 rounded tracking-wide uppercase">
                    Guides & Analysis
                  </div>
                </div>

                <div className="p-6 md:p-8 flex-1 flex flex-col justify-between">
                  <div className="space-y-3">
                    <div className="flex items-center space-x-4 text-[11px] text-slate-450 font-semibold uppercase">
                      <span className="flex items-center">
                        <Calendar className="h-3.5 w-3.5 mr-1" />
                        {new Date(post.publishedAt).toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' })}
                      </span>
                      <span className="flex items-center">
                        <User className="h-3.5 w-3.5 mr-1" />
                        {post.author}
                      </span>
                    </div>

                    <h2 className="font-serif text-lg md:text-xl font-bold text-slate-950 group-hover:text-accent-600 transition-colors leading-snug">
                      {post.title}
                    </h2>
                    
                    <p className="text-xs sm:text-sm text-slate-550 leading-relaxed line-clamp-3">
                      {post.content}
                    </p>
                  </div>

                  <div className="border-t border-slate-100 pt-5 mt-6">
                    <Link 
                      to={`/blog/${post.id}`} 
                      className="inline-flex items-center text-xs font-bold text-accent-600 hover:text-accent-500 group-hover:underline"
                    >
                      Read Full Article 
                      <ArrowRight className="h-3.5 w-3.5 ml-1.5 group-hover:translate-x-0.5 transition-transform" />
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

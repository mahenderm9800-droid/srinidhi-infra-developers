import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Calendar, User, ArrowLeft, ArrowRight, Clock, Share2, HelpCircle } from 'lucide-react';
import { getPostById, getPosts } from '../services/db';

const BlogPost = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [suggestedPosts, setSuggestedPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadPostAndSuggestions = async () => {
      try {
        const data = await getPostById(id);
        if (data) {
          setPost(data);
          
          const allPosts = await getPosts();
          const suggestions = allPosts
            .filter(p => p.id !== data.id)
            .slice(0, 2); // show up to 2 other suggestions
          setSuggestedPosts(suggestions);
        }
      } catch (err) {
        console.error("Error loading blog post and suggestions", err);
      } finally {
        setLoading(false);
      }
    };
    loadPostAndSuggestions();
  }, [id]);

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: post.title,
        text: post.content.substring(0, 100) + '...',
        url: window.location.href
      }).catch(err => console.log(err));
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert("Article link copied to clipboard!");
    }
  };

  if (loading) {
    return (
      <div className="pt-32 pb-16 text-center max-w-7xl mx-auto px-4">
        <div className="h-10 w-10 border-4 border-accent-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
        <p className="text-slate-500 text-xs">Loading article details...</p>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="pt-32 pb-24 text-center max-w-xl mx-auto px-4">
        <HelpCircle className="h-16 w-16 text-slate-350 mx-auto mb-4" />
        <h2 className="font-serif text-2xl font-bold text-slate-900 mb-2">Article Not Found</h2>
        <p className="text-sm text-slate-500 mb-6">The blog post you are looking for does not exist or has been deleted.</p>
        <Link to="/blog" className="px-6 py-2.5 bg-slate-900 text-white rounded-lg text-xs font-semibold hover:bg-slate-800 transition-colors">
          Back to Blog
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-slate-50 pt-24 min-h-screen pb-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Back Link */}
        <div className="py-6">
          <Link to="/blog" className="inline-flex items-center text-xs font-bold text-slate-500 hover:text-slate-800 transition-colors">
            <ArrowLeft className="h-4 w-4 mr-1.5" /> Back to Blog
          </Link>
        </div>

        {/* Article Meta */}
        <div className="space-y-4 mb-8">
          <div className="flex flex-wrap items-center gap-4 text-xs text-slate-450 font-semibold uppercase">
            <span className="flex items-center bg-slate-100 px-2.5 py-1 rounded">
              <Calendar className="h-3.5 w-3.5 mr-1.5 text-accent-500" />
              {new Date(post.publishedAt).toLocaleDateString('en-US', { day: 'numeric', month: 'long', year: 'numeric' })}
            </span>
            <span className="flex items-center">
              <User className="h-3.5 w-3.5 mr-1.5 text-slate-400" />
              {post.author}
            </span>
            <span className="flex items-center">
              <Clock className="h-3.5 w-3.5 mr-1.5 text-slate-400" />
              4 min read
            </span>
          </div>

          <h1 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-950 leading-tight">
            {post.title}
          </h1>
        </div>

        {/* Cover Image */}
        <div className="h-64 sm:h-[400px] rounded-xl overflow-hidden border border-slate-200 bg-slate-100 mb-8 shadow-sm">
          <img 
            src={post.coverImageUrl} 
            alt={post.title} 
            className="w-full h-full object-cover"
          />
        </div>

        {/* Article Content & Actions */}
        <div className="bg-white p-6 sm:p-10 rounded-xl border border-slate-200 shadow-sm space-y-6">
          {/* Share Action */}
          <div className="flex justify-between items-center border-b border-slate-100 pb-4">
            <span className="text-xs text-slate-450 font-bold uppercase tracking-wider">Official Publication</span>
            <button 
              onClick={handleShare}
              className="inline-flex items-center text-xs font-bold text-slate-600 hover:text-accent-600 border border-slate-200 rounded-lg px-3 py-1.5 hover:border-accent-500 transition-colors"
            >
              <Share2 className="h-4 w-4 mr-1.5" /> Share Article
            </button>
          </div>

          {/* Article Text */}
          <div className="text-slate-700 text-sm sm:text-base leading-relaxed space-y-6 whitespace-pre-line font-sans">
            {post.content}
          </div>
        </div>

        {/* Suggested Blogs Section */}
        {suggestedPosts.length > 0 && (
          <div className="mt-16 border-t border-slate-200 pt-12 space-y-6">
            <h3 className="font-serif text-xl font-bold text-slate-950">Suggested Articles</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {suggestedPosts.map((sPost) => (
                <Link 
                  key={sPost.id} 
                  to={`/blog/${sPost.id}`} 
                  className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 flex flex-col group"
                >
                  <div className="h-40 relative bg-slate-100 overflow-hidden">
                    <img 
                      src={sPost.coverImageUrl} 
                      alt={sPost.title} 
                      className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-300"
                    />
                  </div>
                  <div className="p-5 flex-1 flex flex-col justify-between">
                    <div>
                      <span className="text-[10px] text-slate-400 font-semibold tracking-wider block mb-1 uppercase">
                        {new Date(sPost.publishedAt).toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' })}
                      </span>
                      <h4 className="font-serif text-sm font-bold text-slate-950 group-hover:text-accent-600 transition-colors line-clamp-2">
                        {sPost.title}
                      </h4>
                    </div>
                    <span className="text-xs text-accent-600 font-bold group-hover:underline flex items-center mt-4">
                      Read Article <ArrowRight className="h-3 w-3 ml-1" />
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default BlogPost;

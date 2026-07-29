import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Calendar, User, ArrowLeft, ArrowRight, Clock, Share2, HelpCircle, CheckCircle2, ChevronDown, Tag } from 'lucide-react';
import { getPostById, getPosts } from '../services/db';

const BlogPost = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [suggestedPosts, setSuggestedPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openFaq, setOpenFaq] = useState(null);

  useEffect(() => {
    const loadPostAndSuggestions = async () => {
      try {
        const data = await getPostById(id);
        if (data) {
          setPost(data);
          
          // Update Page Title and Meta Tags for Google SEO
          document.title = data.metaTitle || `${data.title} | Srinidhi Infra Developers`;
          
          let metaDesc = document.querySelector("meta[name='description']");
          if (!metaDesc) {
            metaDesc = document.createElement('meta');
            metaDesc.name = 'description';
            document.head.appendChild(metaDesc);
          }
          metaDesc.content = data.metaDescription || data.summary || data.title;

          let metaKeywords = document.querySelector("meta[name='keywords']");
          if (!metaKeywords) {
            metaKeywords = document.createElement('meta');
            metaKeywords.name = 'keywords';
            document.head.appendChild(metaKeywords);
          }
          metaKeywords.content = data.keywords ? data.keywords.join(', ') : 'Real Estate Hyderabad, Srinidhi Infra';

          // Inject JSON-LD Structured Data Schema for Google Search
          const existingSchema = document.getElementById('jsonld-blog-schema');
          if (existingSchema) existingSchema.remove();

          const articleSchema = {
            "@context": "https://schema.org",
            "@type": "BlogPosting",
            "headline": data.title,
            "description": data.metaDescription || data.summary,
            "image": [data.coverImageUrl],
            "datePublished": data.publishedAt,
            "author": {
              "@type": "Organization",
              "name": data.author || "Srinidhi Infra Developers",
              "url": window.location.origin
            },
            "publisher": {
              "@type": "Organization",
              "name": "Srinidhi Infra Developers",
              "logo": {
                "@type": "ImageObject",
                "url": `${window.location.origin}/logo-header.png`
              }
            },
            "mainEntityOfPage": {
              "@type": "WebPage",
              "@id": window.location.href
            }
          };

          const script = document.createElement('script');
          script.id = 'jsonld-blog-schema';
          script.type = 'application/ld+json';
          script.text = JSON.stringify(articleSchema);
          document.head.appendChild(script);

          // Fetch suggested articles
          const allPosts = await getPosts();
          const suggestions = allPosts
            .filter(p => p.id !== data.id && p.slug !== data.slug)
            .slice(0, 2);
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
        text: post.metaDescription || post.summary || post.title,
        url: window.location.href
      }).catch(err => console.log(err));
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert("Article link copied to clipboard!");
    }
  };

  // Helper to render content formatted with ## headings
  const renderFormattedContent = (content) => {
    if (!content) return null;

    const sections = content.split('\n\n');
    return sections.map((paragraph, index) => {
      if (paragraph.startsWith('## ')) {
        const headingText = paragraph.replace('## ', '');
        return (
          <h2 key={index} className="font-serif text-sm sm:text-base font-semibold text-slate-800 mt-5 mb-2.5 border-l-2 border-accent-500 pl-3">
            {headingText}
          </h2>
        );
      }
      if (paragraph.startsWith('- ')) {
        const items = paragraph.split('\n');
        return (
          <ul key={index} className="space-y-1.5 my-3 pl-1">
            {items.map((item, i) => (
              <li key={i} className="flex items-start text-slate-600 font-normal text-xs sm:text-sm">
                <span className="h-1.5 w-1.5 rounded-full bg-accent-500 mt-1.5 mr-2.5 shrink-0" />
                <span>{item.replace('- ', '')}</span>
              </li>
            ))}
          </ul>
        );
      }
      return (
        <p key={index} className="text-slate-600 font-normal text-xs sm:text-sm leading-relaxed mb-3.5">
          {paragraph}
        </p>
      );
    });
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
        <h2 className="font-serif text-lg font-semibold text-slate-900 mb-2">Article Not Found</h2>
        <p className="text-xs text-slate-500 mb-6">The blog post you are looking for does not exist or has been deleted.</p>
        <Link to="/blog" className="px-6 py-2.5 bg-slate-900 text-white rounded-lg text-xs font-medium hover:bg-slate-800 transition-colors">
          Back to Blog
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-slate-50/50 pt-24 min-h-screen pb-20 font-sans">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Back Link & Category */}
        <div className="py-5 flex justify-between items-center">
          <Link to="/blog" className="inline-flex items-center text-xs font-medium text-slate-600 hover:text-accent-600 transition-colors">
            <ArrowLeft className="h-3.5 w-3.5 mr-1.5" /> Back to Articles
          </Link>
          <span className="bg-accent-500/10 text-accent-700 border border-accent-500/20 text-[10px] font-medium px-3 py-0.5 rounded-full uppercase tracking-wider">
            {post.category || "Real Estate Guide"}
          </span>
        </div>

        {/* Article Header */}
        <div className="space-y-2.5 mb-6">
          <div className="flex flex-wrap items-center gap-3 text-[11px] text-slate-500 font-medium uppercase">
            <span className="flex items-center bg-white border border-slate-200 px-2.5 py-0.5 rounded-lg shadow-2xs">
              <Calendar className="h-3 w-3 mr-1.5 text-accent-600" />
              {new Date(post.publishedAt).toLocaleDateString('en-US', { day: 'numeric', month: 'long', year: 'numeric' })}
            </span>
            <span className="flex items-center">
              <User className="h-3 w-3 mr-1.5 text-slate-400" />
              {post.author}
            </span>
            <span className="flex items-center">
              <Clock className="h-3 w-3 mr-1.5 text-slate-400" />
              {post.readTime || "5 min read"}
            </span>
          </div>

          <h1 className="font-serif text-lg sm:text-xl lg:text-2xl font-semibold text-slate-900 tracking-tight leading-snug">
            {post.title}
          </h1>
        </div>

        {/* Cover Image */}
        <div className="h-56 sm:h-[380px] rounded-2xl overflow-hidden border border-slate-200 shadow-sm mb-8 relative">
          <img 
            src={post.coverImageUrl} 
            alt={post.title} 
            className="w-full h-full object-cover"
          />
        </div>

        {/* Key Takeaways Box (SEO Summary Box) */}
        {post.keyTakeaways && post.keyTakeaways.length > 0 && (
          <div className="bg-slate-900 text-white p-5 sm:p-6 rounded-2xl border border-slate-800 shadow-md mb-8 relative overflow-hidden">
            <h3 className="font-serif text-xs sm:text-sm font-semibold text-white mb-3 flex items-center">
              <CheckCircle2 className="h-4 w-4 text-accent-400 mr-2 shrink-0" />
              Key Takeaways
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {post.keyTakeaways.map((item, idx) => (
                <div key={idx} className="flex items-start text-xs font-normal text-slate-300">
                  <span className="h-1.5 w-1.5 rounded-full bg-accent-400 mt-1.5 mr-2 shrink-0" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Main Article Content Card */}
        <div className="bg-white p-5 sm:p-8 rounded-2xl border border-slate-200/80 shadow-md space-y-4">
          {/* Share Action */}
          <div className="flex justify-between items-center border-b border-slate-100 pb-3">
            <span className="text-[10px] text-slate-400 font-medium uppercase tracking-wider flex items-center">
              <Tag className="h-3 w-3 mr-1 text-accent-600" /> Google SEO Standard
            </span>
            <button 
              onClick={handleShare}
              className="inline-flex items-center text-[11px] font-medium text-slate-600 hover:text-accent-600 border border-slate-200 rounded-lg px-3 py-1 hover:border-accent-500 transition-colors shadow-2xs"
            >
              <Share2 className="h-3.5 w-3.5 mr-1 text-accent-600" /> Share
            </button>
          </div>

          {/* Formatted Body */}
          <div className="prose prose-slate max-w-none">
            {renderFormattedContent(post.content)}
          </div>

          {/* Keywords / SEO Tags */}
          {post.keywords && (
            <div className="border-t border-slate-100 pt-4 mt-6">
              <span className="text-[10px] text-slate-400 font-medium uppercase tracking-wider block mb-2">Topic Keywords</span>
              <div className="flex flex-wrap gap-1.5">
                {post.keywords.map((kw, i) => (
                  <span key={i} className="bg-slate-100 text-slate-600 text-[10px] font-normal px-2.5 py-0.5 rounded-md border border-slate-200/60">
                    #{kw}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* FAQ Accordion Section for Google Search Snippets */}
        {post.faqs && post.faqs.length > 0 && (
          <div className="mt-8 bg-white rounded-2xl border border-slate-200/80 p-5 sm:p-7 shadow-md">
            <div className="mb-3">
              <span className="text-[10px] text-accent-600 font-medium tracking-widest uppercase block mb-0.5">Search Answers</span>
              <h3 className="font-serif text-sm sm:text-base font-semibold text-slate-900">Frequently Asked Questions</h3>
            </div>

            <div className="space-y-2.5">
              {post.faqs.map((faq, idx) => (
                <div key={idx} className="border border-slate-200/80 rounded-xl overflow-hidden transition-all duration-200">
                  <button
                    onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                    className="w-full p-3.5 text-left font-serif font-semibold text-slate-800 text-xs sm:text-sm flex justify-between items-center hover:bg-slate-50 transition-colors"
                  >
                    <span>{faq.question}</span>
                    <ChevronDown className={`h-3.5 w-3.5 text-accent-600 transition-transform duration-300 shrink-0 ml-3 ${openFaq === idx ? 'rotate-180' : ''}`} />
                  </button>
                  {openFaq === idx && (
                    <div className="p-3.5 pt-0 text-slate-600 text-xs font-normal leading-relaxed border-t border-slate-100 bg-slate-50/50">
                      {faq.answer}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Suggested Articles */}
        {suggestedPosts.length > 0 && (
          <div className="mt-12 border-t border-slate-200 pt-8 space-y-5">
            <h3 className="font-serif text-base font-semibold text-slate-900">Recommended Reading</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {suggestedPosts.map((sPost) => (
                <Link 
                  key={sPost.id} 
                  to={`/blog/${sPost.slug || sPost.id}`} 
                  className="bg-white rounded-2xl border border-slate-200/80 overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 flex flex-col group"
                >
                  <div className="h-40 relative bg-slate-100 overflow-hidden">
                    <img 
                      src={sPost.coverImageUrl} 
                      alt={sPost.title} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-5 flex-1 flex flex-col justify-between">
                    <div>
                      <span className="text-[10px] text-accent-600 font-medium tracking-wider block mb-1 uppercase">
                        {sPost.category || "Guide"}
                      </span>
                      <h4 className="font-serif text-xs sm:text-sm font-semibold text-slate-900 group-hover:text-accent-600 transition-colors line-clamp-2">
                        {sPost.title}
                      </h4>
                    </div>
                    <span className="text-xs text-accent-600 font-medium group-hover:underline flex items-center mt-3">
                      Read Article <ArrowRight className="h-3 w-3 ml-1.5" />
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

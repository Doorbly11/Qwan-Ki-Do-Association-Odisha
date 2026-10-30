import React, { useState } from 'react';
import { useData } from '../context/DataContext';
import { NewsArticle } from '../types';
import { Search, Share2, Check, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export const NewsSection: React.FC = () => {
  const { newsArticles } = useData();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedArticle, setSelectedArticle] = useState<NewsArticle | null>(null);
  const [copiedLink, setCopiedLink] = useState(false);

  const filteredNews = newsArticles.filter((item) => {
    const excerpt = item.excerpt || (item as any).summary || '';
    return (
      item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.category.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });


  const handleShare = (article: NewsArticle) => {
    if (navigator.share) {
      navigator.share({
        title: article.title,
        text: article.excerpt,
        url: window.location.href,
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2000);
    }
  };

  return (
    <section id="news" className="py-20 bg-white border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.5 }}
          className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12"
        >
          <div className="max-w-3xl">
            <div className="flex items-center gap-2 text-xs font-semibold text-[#008A68] uppercase tracking-wider mb-2">
              <span>Official Association Dispatch</span>
              <span aria-hidden="true">·</span>
              <span>Odisha Bureau</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight mb-4">
              News & Student Achievements
            </h2>
            <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
              Official press bulletins, state team selections, convocation results, and community outreach initiatives
              from Qwan Ki Do Association Odisha.
            </p>
          </div>

          {/* Search Bar */}
          <div className="w-full md:w-72 relative shrink-0">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search news..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-3 py-2 text-xs bg-stone-50 border border-stone-200 rounded-lg text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-[#008A68]"
            />
          </div>
        </motion.div>

        {/* News Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {filteredNews.map((article) => (
            <motion.article
              key={article.id}
              whileHover={{ y: -3 }}
              className="bg-white border border-stone-200 rounded-xl p-6 flex flex-col justify-between hover:border-stone-300 transition-shadow hover:shadow-md shadow-2xs"
            >
              <div>
                {/* Unboxed Metadata (Per anti-slop guidelines) */}
                <div className="flex items-center gap-2 text-xs text-slate-500 mb-2.5">
                  <span className="capitalize text-[#008A68] font-medium">{article.category}</span>
                  <span aria-hidden="true">·</span>
                  <span>{article.date}</span>
                  <span aria-hidden="true">·</span>
                  <span>{article.readTime}</span>
                </div>

                <h3 className="font-serif text-lg font-bold text-slate-900 mb-3 leading-snug hover:text-[#008A68] transition-colors">
                  <button
                    onClick={() => setSelectedArticle(article)}
                    className="text-left cursor-pointer"
                  >
                    {article.title}
                  </button>
                </h3>

                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed line-clamp-3 mb-4">
                  {article.excerpt || (article as any).summary}
                </p>
              </div>

              <div className="pt-4 border-t border-stone-100 flex items-center justify-between">
                <button
                  onClick={() => setSelectedArticle(article)}
                  className="inline-flex items-center gap-1 text-xs font-semibold text-[#008A68] hover:text-[#007256] cursor-pointer"
                >
                  <span>Read Full Release</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>

                <button
                  onClick={() => handleShare(article)}
                  title="Share dispatch"
                  className="p-1.5 text-slate-400 hover:text-slate-700 rounded transition-colors cursor-pointer"
                >
                  <Share2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </motion.article>
          ))}
        </div>

        {/* Article Reader Modal with Motion */}
        <AnimatePresence>
          {selectedArticle && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs"
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 15 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 15 }}
                transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                className="bg-white rounded-xl max-w-2xl w-full max-h-[85vh] overflow-y-auto p-6 sm:p-8 shadow-2xl relative"
              >
                <button
                  onClick={() => setSelectedArticle(null)}
                  className="absolute top-5 right-5 text-slate-400 hover:text-slate-800 p-1 rounded cursor-pointer"
                  aria-label="Close"
                >
                  ✕
                </button>

                <div className="flex items-center gap-2 text-xs text-slate-500 mb-2">
                  <span className="capitalize text-[#008A68] font-semibold">{selectedArticle.category}</span>
                  <span aria-hidden="true">·</span>
                  <span>{selectedArticle.date}</span>
                  <span aria-hidden="true">·</span>
                  <span>Author: {selectedArticle.author}</span>
                </div>

                <h2 className="font-serif text-2xl sm:text-3xl font-bold text-slate-900 mb-6 leading-snug">
                  {selectedArticle.title}
                </h2>

                <div className="space-y-4 text-sm sm:text-base text-slate-700 leading-relaxed pb-6 border-b border-stone-200">
                  {(selectedArticle.content || [(selectedArticle as any).summary || '']).map((para, i) => (
                    <p key={i}>{para}</p>
                  ))}
                </div>

                <div className="pt-4 flex items-center justify-between">
                  <button
                    onClick={() => handleShare(selectedArticle)}
                    className="inline-flex items-center gap-1.5 text-xs font-medium text-slate-700 bg-stone-100 hover:bg-stone-200 px-3 py-1.5 rounded transition-colors cursor-pointer"
                  >
                    {copiedLink ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Share2 className="w-3.5 h-3.5" />}
                    <span>{copiedLink ? 'Link Copied' : 'Share Article'}</span>
                  </button>

                  <button
                    onClick={() => setSelectedArticle(null)}
                    className="px-4 py-1.5 text-xs font-semibold text-white bg-[#008A68] rounded cursor-pointer"
                  >
                    Close Reader
                  </button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

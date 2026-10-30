import React, { useState, useEffect } from 'react';
import { useData } from '../context/DataContext';
import { GalleryMedia } from '../types';
import {
  ArrowLeft,
  Search,
  Filter,
  Maximize2,
  X,
  ChevronLeft,
  ChevronRight,
  Calendar,
  MapPin,
  Tag,
  Share2,
  Download,
  Sparkles,
  Camera,
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface ImageGalleryPageProps {
  onBackToHome: () => void;
}

export const ImageGalleryPage: React.FC<ImageGalleryPageProps> = ({ onBackToHome }) => {
  const { galleryItems } = useData();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  // Filter gallery items by category and search
  const filteredItems = galleryItems.filter((item) => {
    const matchesCategory =
      selectedCategory === 'all' || item.category === selectedCategory;
    const matchesSearch =
      searchQuery.trim() === '' ||
      item.headline.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.caption.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (item.district && item.district.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  const openLightbox = (index: number) => {
    setLightboxIndex(index);
  };

  const closeLightbox = () => {
    setLightboxIndex(null);
  };

  const showPrev = () => {
    if (lightboxIndex !== null) {
      setLightboxIndex((lightboxIndex - 1 + filteredItems.length) % filteredItems.length);
    }
  };

  const showNext = () => {
    if (lightboxIndex !== null) {
      setLightboxIndex((lightboxIndex + 1) % filteredItems.length);
    }
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (lightboxIndex === null) return;
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowLeft') showPrev();
      if (e.key === 'ArrowRight') showNext();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightboxIndex, filteredItems.length]);

  // Scroll to top when page mounts
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const activeLightboxItem = lightboxIndex !== null ? filteredItems[lightboxIndex] : null;

  return (
    <div className="min-h-screen bg-[#FAF7F2] text-slate-800 pb-20">
      {/* Top Breadcrumb & Page Banner */}
      <div className="bg-white border-b border-amber-200/80 shadow-xs sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex items-center justify-between gap-4">
          <button
            onClick={onBackToHome}
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-[#008A68] hover:text-[#007256] transition-colors cursor-pointer group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            <span>Return to Main Website</span>
          </button>

          <div className="flex items-center gap-2 text-xs text-stone-500">
            <span className="hidden sm:inline font-medium">Odisha Qwan Ki Do Association</span>
            <span className="hidden sm:inline">·</span>
            <span className="px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-900 font-semibold text-[11px]">
              Dedicated Image Gallery
            </span>
          </div>
        </div>
      </div>

      {/* Hero Header Area for Gallery */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 sm:pt-12 pb-8">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 text-xs font-bold text-[#008A68] uppercase tracking-wider mb-2">
            <Camera className="w-4 h-4" />
            <span>Official Odisha Visual Chronicle</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight mb-4">
            Official Image Gallery
          </h1>
          <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
            A comprehensive visual record of martial arts excellence across Odisha. Browse authentic
            championship bouts, sacred animal form demonstrations, youth training sessions, and annual belt
            examinations with official headlines and captions.
          </p>
        </div>

        {/* Filter Toolbar & Search */}
        <div className="mt-8 pt-6 border-t border-amber-200/60 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
          {/* Category Tabs */}
          <div className="flex flex-wrap items-center gap-2">
            {[
              { id: 'all', label: 'All Photos' },
              { id: 'championship', label: 'Championships' },
              { id: 'training', label: 'Dojo Training' },
              { id: 'gradings', label: 'Belt Gradings' },
              { id: 'seminars', label: 'Master Seminars' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setSelectedCategory(tab.id)}
                className={`px-3.5 py-2 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
                  selectedCategory === tab.id
                    ? 'bg-[#008A68] text-white shadow-xs'
                    : 'bg-white text-slate-700 hover:bg-stone-100 border border-stone-200'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Search Box */}
          <div className="relative w-full md:w-80">
            <Search className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search photo headline or location..."
              className="w-full pl-9 pr-3.5 py-2 text-xs bg-white border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#008A68] focus:border-transparent placeholder-stone-400"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-600"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Main Image Grid with Headline on Each Image */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {filteredItems.length === 0 ? (
          <div className="bg-white rounded-2xl p-12 text-center border border-stone-200 my-8">
            <Camera className="w-12 h-12 text-stone-400 mx-auto mb-3" />
            <h3 className="font-serif text-lg font-bold text-slate-800">No photos found</h3>
            <p className="text-xs text-stone-500 mt-1">
              Try adjusting your category filter or search keywords.
            </p>
            <button
              onClick={() => {
                setSelectedCategory('all');
                setSearchQuery('');
              }}
              className="mt-4 px-4 py-2 bg-[#008A68] text-white text-xs font-semibold rounded-lg"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {filteredItems.map((item, index) => (
              <motion.article
                key={item.id}
                layout
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                className="bg-white rounded-2xl border border-stone-200 shadow-xs hover:shadow-md transition-all overflow-hidden flex flex-col justify-between group"
              >
                <div>
                  {/* Photo Visual Frame */}
                  <div
                    onClick={() => openLightbox(index)}
                    className="relative aspect-[16/10] w-full bg-stone-100 overflow-hidden cursor-pointer"
                  >
                    <img
                      src={item.imageUrl}
                      alt={item.altText || item.headline}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                    />

                    {/* Category Overlay Tag */}
                    <div className="absolute top-3 left-3">
                      <span className="text-[10px] uppercase font-bold tracking-wider px-2.5 py-1 rounded-full bg-slate-900/80 backdrop-blur-xs text-white shadow-xs">
                        {item.category}
                      </span>
                    </div>

                    {/* Hover Zoom Icon */}
                    <div className="absolute inset-0 bg-slate-900/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <div className="p-2.5 rounded-full bg-white/90 text-slate-900 shadow-md">
                        <Maximize2 className="w-5 h-5" />
                      </div>
                    </div>
                  </div>

                  {/* Body Content with Explicit Bold Headline */}
                  <div className="p-5">
                    {/* Location & Date Metadata */}
                    <div className="flex flex-wrap items-center gap-3 text-xs text-stone-500 mb-2.5">
                      {item.district && (
                        <span className="flex items-center gap-1 font-medium text-[#008A68]">
                          <MapPin className="w-3.5 h-3.5 shrink-0" />
                          <span>{item.district}</span>
                        </span>
                      )}
                      {item.date && (
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3 h-3 text-amber-600 shrink-0" />
                          <span>{item.date}</span>
                        </span>
                      )}
                    </div>

                    {/* REQUIRED: PROMINENT HEADLINE FOR EACH IMAGE */}
                    <h2
                      onClick={() => openLightbox(index)}
                      className="font-serif text-base sm:text-lg font-bold text-slate-900 leading-snug group-hover:text-[#008A68] transition-colors cursor-pointer mb-2"
                    >
                      {item.headline}
                    </h2>

                    {/* Secondary Title */}
                    <p className="text-xs font-semibold text-stone-600 mb-2">
                      {item.title}
                    </p>

                    {/* Caption / Description */}
                    <p className="text-xs text-stone-600 leading-relaxed line-clamp-3">
                      {item.caption}
                    </p>
                  </div>
                </div>

                {/* Card Action Footer */}
                <div className="px-5 py-3 bg-stone-50 border-t border-stone-100 flex items-center justify-between text-xs">
                  <button
                    onClick={() => openLightbox(index)}
                    className="font-semibold text-[#008A68] hover:text-[#007256] inline-flex items-center gap-1 cursor-pointer"
                  >
                    <span>View High-Res Photo</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>

                  <span className="text-[11px] text-stone-400">
                    Photo #{index + 1}
                  </span>
                </div>
              </motion.article>
            ))}
          </div>
        )}
      </div>

      {/* Accessible Full-Screen Modal Lightbox */}
      <AnimatePresence>
        {activeLightboxItem && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-slate-950/90 backdrop-blur-md flex items-center justify-center p-4 sm:p-6"
            onClick={closeLightbox}
          >
            <div
              className="relative max-w-5xl w-full bg-white rounded-2xl overflow-hidden shadow-2xl flex flex-col max-h-[92vh]"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Lightbox Header with Headline */}
              <div className="p-4 sm:p-5 bg-white border-b border-stone-200 flex items-center justify-between gap-4">
                <div className="min-w-0">
                  <span className="text-[10px] uppercase font-bold tracking-wider text-[#008A68] block">
                    {activeLightboxItem.category} · {activeLightboxItem.district || 'Odisha'}
                  </span>
                  <h3 className="font-serif text-base sm:text-lg font-bold text-slate-900 truncate">
                    {activeLightboxItem.headline}
                  </h3>
                </div>

                <button
                  onClick={closeLightbox}
                  aria-label="Close Lightbox"
                  className="p-2 text-stone-500 hover:text-slate-900 hover:bg-stone-100 rounded-lg transition-colors cursor-pointer shrink-0"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Lightbox Image Viewport */}
              <div className="relative flex-1 bg-stone-900 flex items-center justify-center overflow-hidden min-h-[300px] sm:min-h-[460px]">
                <img
                  src={activeLightboxItem.imageUrl}
                  alt={activeLightboxItem.altText || activeLightboxItem.headline}
                  className="max-h-[65vh] w-auto max-w-full object-contain mx-auto"
                />

                {/* Left/Right Navigation Buttons */}
                <button
                  onClick={showPrev}
                  aria-label="Previous photo"
                  className="absolute left-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/50 hover:bg-black/80 text-white backdrop-blur-xs transition-colors cursor-pointer"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>

                <button
                  onClick={showNext}
                  aria-label="Next photo"
                  className="absolute right-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/50 hover:bg-black/80 text-white backdrop-blur-xs transition-colors cursor-pointer"
                >
                  <ChevronRight className="w-6 h-6" />
                </button>
              </div>

              {/* Lightbox Description Bar */}
              <div className="p-4 sm:p-5 bg-stone-50 border-t border-stone-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs">
                <div className="max-w-2xl">
                  <p className="font-semibold text-slate-900 mb-1">
                    {activeLightboxItem.title}
                  </p>
                  <p className="text-stone-600 leading-relaxed">
                    {activeLightboxItem.caption}
                  </p>
                </div>

                <div className="flex items-center gap-3 shrink-0">
                  <span className="text-stone-500 font-mono text-[11px]">
                    {(lightboxIndex ?? 0) + 1} of {filteredItems.length}
                  </span>
                  <button
                    onClick={onBackToHome}
                    className="px-3 py-1.5 bg-[#008A68] hover:bg-[#007256] text-white font-medium rounded-lg transition-colors"
                  >
                    Back to Home
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

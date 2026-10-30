import React, { useState, useEffect } from 'react';
import { useData } from '../context/DataContext';
import { GalleryMedia } from '../types';
import { X, ChevronLeft, ChevronRight, Maximize2, ExternalLink, Camera } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface GallerySectionProps {
  onOpenFullGalleryPage?: () => void;
}

export const GallerySection: React.FC<GallerySectionProps> = ({ onOpenFullGalleryPage }) => {
  const { galleryItems } = useData();
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const filteredItems = galleryItems.filter((item) => {
    if (activeCategory === 'all') return true;
    return item.category === activeCategory;
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

  return (
    <section id="gallery" className="py-20 bg-[#FAF9F6] border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.5 }}
            className="max-w-3xl"
          >
            <div className="flex items-center gap-2 text-xs font-semibold text-[#008A68] uppercase tracking-wider mb-2">
              <Camera className="w-4 h-4" />
              <span>Visual Chronicle</span>
              <span aria-hidden="true">·</span>
              <span>Documentary Gallery</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight mb-4">
              Dojo Life, Gradings & Championships
            </h2>
            <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
              Authentic moments of disciplined practice, ceremonial belt examinations, and competitive spirit
              captured across affiliated training centres throughout Odisha.
            </p>
          </motion.div>

          {onOpenFullGalleryPage && (
            <button
              onClick={onOpenFullGalleryPage}
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#008A68] hover:bg-[#007256] text-white font-semibold text-xs sm:text-sm rounded-xl shadow-xs hover:shadow-md transition-all cursor-pointer shrink-0"
            >
              <span>Open Dedicated Image Gallery (Full Page)</span>
              <ExternalLink className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap items-center gap-2 mb-8">
          <button
            onClick={() => setActiveCategory('all')}
            className={`px-3.5 py-1.5 text-xs font-medium rounded-md transition-colors cursor-pointer ${
              activeCategory === 'all'
                ? 'bg-[#008A68] text-white shadow-2xs'
                : 'bg-white text-slate-700 border border-stone-200 hover:bg-stone-50'
            }`}
          >
            All Media ({galleryItems.length})
          </button>
          <button
            onClick={() => setActiveCategory('training')}
            className={`px-3.5 py-1.5 text-xs font-medium rounded-md transition-colors cursor-pointer ${
              activeCategory === 'training'
                ? 'bg-[#008A68] text-white shadow-2xs'
                : 'bg-white text-slate-700 border border-stone-200 hover:bg-stone-50'
            }`}
          >
            Dojo Training
          </button>
          <button
            onClick={() => setActiveCategory('gradings')}
            className={`px-3.5 py-1.5 text-xs font-medium rounded-md transition-colors cursor-pointer ${
              activeCategory === 'gradings'
                ? 'bg-[#008A68] text-white shadow-2xs'
                : 'bg-white text-slate-700 border border-stone-200 hover:bg-stone-50'
            }`}
          >
            Belt Gradings
          </button>
          <button
            onClick={() => setActiveCategory('championship')}
            className={`px-3.5 py-1.5 text-xs font-medium rounded-md transition-colors cursor-pointer ${
              activeCategory === 'championship'
                ? 'bg-[#008A68] text-white shadow-2xs'
                : 'bg-white text-slate-700 border border-stone-200 hover:bg-stone-50'
            }`}
          >
            Championships
          </button>
          <button
            onClick={() => setActiveCategory('seminars')}
            className={`px-3.5 py-1.5 text-xs font-medium rounded-md transition-colors cursor-pointer ${
              activeCategory === 'seminars'
                ? 'bg-[#008A68] text-white shadow-2xs'
                : 'bg-white text-slate-700 border border-stone-200 hover:bg-stone-50'
            }`}
          >
            Master Seminars
          </button>
        </div>

        {/* Media Grid */}
        <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence mode="popLayout">
            {filteredItems.map((item, index) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.25 }}
                whileHover={{ y: -4 }}
                onClick={() => openLightbox(index)}
                className="group relative bg-white rounded-xl overflow-hidden border border-stone-200 cursor-pointer shadow-2xs hover:shadow-md transition-shadow flex flex-col"
              >
                <div className="relative aspect-4/3 w-full overflow-hidden bg-stone-100">
                  <img
                    src={item.imageUrl}
                    alt={item.altText || item.headline || item.title}
                    className="w-full h-full object-cover object-center group-hover:scale-104 transition-transform duration-300"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-slate-950/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <div className="w-10 h-10 rounded-full bg-white/80 text-slate-900 flex items-center justify-center backdrop-blur-xs">
                      <Maximize2 className="w-5 h-5" />
                    </div>
                  </div>
                  <div className="absolute top-2.5 left-2.5">
                    <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-slate-900/80 text-white backdrop-blur-xs">
                      {item.category}
                    </span>
                  </div>
                </div>

                <div className="p-4 flex-1 flex flex-col justify-between">
                  <div>
                    {/* REQUIRED: BOLD HEADLINE FOR EACH IMAGE */}
                    <h3 className="font-serif text-sm sm:text-base font-bold text-slate-900 leading-snug line-clamp-2 mb-1.5 group-hover:text-[#008A68] transition-colors">
                      {item.headline || item.title}
                    </h3>
                    <p className="text-xs font-medium text-stone-500 mb-1">
                      {item.title}
                    </p>
                    <p className="text-xs text-slate-600 line-clamp-2">
                      {item.caption}
                    </p>
                  </div>

                  <div className="mt-3 pt-2.5 border-t border-stone-100 flex items-center justify-between text-[11px] text-stone-500">
                    <span>{item.district || 'Odisha Centre'}</span>
                    <span>{item.date}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Accessible Lightbox Modal with Motion */}
        <AnimatePresence>
          {lightboxIndex !== null && filteredItems[lightboxIndex] && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              role="dialog"
              aria-modal="true"
              aria-label="Image view"
              className="fixed inset-0 z-50 bg-black/92 backdrop-blur-sm flex items-center justify-center p-4"
            >
              <button
                onClick={closeLightbox}
                className="absolute top-5 right-5 text-white/80 hover:text-white p-2 cursor-pointer z-10"
                aria-label="Close Lightbox"
              >
                <X className="w-7 h-7" />
              </button>

              <button
                onClick={showPrev}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-white/80 hover:text-white p-3 rounded-full bg-black/40 hover:bg-black/70 cursor-pointer z-10"
                aria-label="Previous image"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>

              <button
                onClick={showNext}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-white/80 hover:text-white p-3 rounded-full bg-black/40 hover:bg-black/70 cursor-pointer z-10"
                aria-label="Next image"
              >
                <ChevronRight className="w-6 h-6" />
              </button>

              <div className="max-w-4xl w-full flex flex-col items-center">
                <motion.div
                  key={filteredItems[lightboxIndex].id}
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.96 }}
                  transition={{ duration: 0.2 }}
                  className="max-h-[75vh] overflow-hidden rounded-lg shadow-2xl"
                >
                  <img
                    src={filteredItems[lightboxIndex].imageUrl}
                    alt={filteredItems[lightboxIndex].altText || filteredItems[lightboxIndex].headline || filteredItems[lightboxIndex].title}
                    className="max-h-[75vh] w-auto max-w-full object-contain"
                  />
                </motion.div>

                <div className="mt-4 text-center text-white max-w-2xl px-4">
                  <p className="text-xs text-emerald-400 font-semibold uppercase tracking-wider mb-1">
                    {filteredItems[lightboxIndex].category} · {lightboxIndex + 1} of {filteredItems.length}
                  </p>
                  <h4 className="font-serif text-lg font-bold">
                    {filteredItems[lightboxIndex].headline || filteredItems[lightboxIndex].title}
                  </h4>
                  <p className="text-xs text-stone-300 mt-0.5 font-medium">
                    {filteredItems[lightboxIndex].title}
                  </p>
                  <p className="text-xs sm:text-sm text-stone-300 mt-1">
                    {filteredItems[lightboxIndex].caption}
                  </p>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

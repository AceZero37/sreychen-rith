import React, { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import "./PhotoGallery.css";

const GALLERY_IMAGES = [
  {
    src: "/assets/images/3.jpg",
    captionKh: "អនុស្សាវរីយ៍ផ្អែមល្ហែម",
    captionEn: "Sweet Moments",
  },
  {
    src: "/assets/images/4.jpg",
    captionKh: "នៅក្បែរគ្នារៀងរហូត",
    captionEn: "Forever Together",
  },
  {
    src: "/assets/images/9.jpg",
    captionKh: "អនុស្សាវរីយ៍រីករាយ",
    captionEn: "Happy Memories",
  },
  {
    src: "/assets/images/1.jpg",
    captionKh: "កូនកំលោះ — សុវណ្ណ ណារិទ្ធ",
    captionEn: "The Groom — Sovan Narith",
  },
  {
    src: "/assets/images/2.jpg",
    captionKh: "កូនក្រមុំ — ស៊ិន ស្រីចិន",
    captionEn: "The Bride — Sin SreyChen",
  },
  {
    src: "/assets/images/5.jpg",
    captionKh: "ស្នាមញញឹមពោរពេញដោយសុភមង្គល",
    captionEn: "Pure Happiness",
  },
  {
    src: "/assets/images/6.jpg",
    captionKh: "ថ្ងៃដ៏ស្រស់បំព្រង",
    captionEn: "Joyful Days",
  },
  {
    src: "/assets/images/7.jpg",
    captionKh: "ដំណើរជាមួយគ្នា",
    captionEn: "Romantic Journey",
  },
  {
    src: "/assets/images/8.jpg",
    captionKh: "រឿងរ៉ាវនៃសេចក្តីស្រឡាញ់",
    captionEn: "Our Love Story",
  },
];

const slideVariants = {
  enter: (direction) => ({
    x: direction > 0 ? 250 : -250,
    opacity: 0,
    scale: 0.94,
  }),
  center: {
    x: 0,
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.35,
      ease: [0.16, 1, 0.3, 1],
    },
  },
  exit: (direction) => ({
    x: direction > 0 ? -250 : 250,
    opacity: 0,
    scale: 0.94,
    transition: {
      duration: 0.25,
      ease: "easeInOut",
    },
  }),
};

const PhotoGallery = ({ lang = "kh" }) => {
  const isKh = lang === "kh";
  const [photoIndex, setPhotoIndex] = useState(null);
  const [direction, setDirection] = useState(0);

  // Touch swipe handling
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  const isOpen = photoIndex !== null;

  const goToNext = useCallback(() => {
    if (photoIndex === null) return;
    setDirection(1);
    setPhotoIndex((prev) => (prev + 1) % GALLERY_IMAGES.length);
  }, [photoIndex]);

  const goToPrev = useCallback(() => {
    if (photoIndex === null) return;
    setDirection(-1);
    setPhotoIndex((prev) =>
      prev === 0 ? GALLERY_IMAGES.length - 1 : prev - 1
    );
  }, [photoIndex]);

  const closeLightbox = useCallback(() => {
    setPhotoIndex(null);
  }, []);

  // Keyboard Navigation: ArrowLeft, ArrowRight, Escape
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e) => {
      if (e.key === "ArrowRight") {
        e.preventDefault();
        goToNext();
      } else if (e.key === "ArrowLeft") {
        e.preventDefault();
        goToPrev();
      } else if (e.key === "Escape") {
        e.preventDefault();
        closeLightbox();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, goToNext, goToPrev, closeLightbox]);

  // Prevent background scrolling when lightbox is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  // Touch Swipe Handlers
  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e) => {
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    const diff = touchEndX.current - touchStartX.current;
    const threshold = 45;

    if (Math.abs(diff) > threshold) {
      if (diff < 0) {
        goToNext();
      } else {
        goToPrev();
      }
    }
    touchStartX.current = 0;
    touchEndX.current = 0;
  };

  return (
    <motion.div
      className="gallery-section-card"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: false, amount: 0.15 }}
      transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
    >
      <motion.div
        className="section-header text-center"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, amount: 0.2 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      >
        <span className="section-badge">
          {isKh ? "អនុស្សាវរីយ៍ស្នេហ៍" : "Love Gallery"}
        </span>
        <h2 className="section-title">
          {isKh ? "អាល់ប៊ុមរូបថតអនុស្សាវរីយ៍" : "Our Precious Memories"}
        </h2>
        <p className="section-subtitle">
          {isKh
            ? "រូបភាពអនុស្សាវរីយ៍ដ៏មានអត្ថន័យរបស់ ណារិទ្ធ & ស៊ិន ស្រីចិន"
            : "Cherished moments and memories of Sovan Narith & Sin SreyChen"}
        </p>
        <div className="small-golden-divider" />
      </motion.div>

      {/* Grid of Photos - each animating on scroll up and down */}
      <div className="photo-grid">
        {GALLERY_IMAGES.map((img, idx) => (
          <motion.div
            key={idx}
            className="photo-grid-item"
            onClick={() => {
              setDirection(0);
              setPhotoIndex(idx);
            }}
            initial={{ opacity: 0, scale: 0.9, y: 25 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: false, amount: 0.1 }}
            transition={{
              duration: 0.5,
              delay: (idx % 3) * 0.08,
              ease: [0.16, 1, 0.3, 1],
            }}
            whileHover={{ y: -6, scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
          >
            <img
              src={img.src}
              alt={isKh ? img.captionKh : img.captionEn}
              className="grid-thumbnail"
              loading="lazy"
            />
            <div className="photo-overlay">
              <span className="photo-zoom-icon">🔍</span>
              <span className="photo-caption">
                {isKh ? img.captionKh : img.captionEn}
              </span>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="lightbox-backdrop"
            onClick={closeLightbox}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
          >
            {/* Top Toolbar */}
            <div className="lightbox-top-toolbar" onClick={(e) => e.stopPropagation()}>
              <div className="lightbox-counter-badge">
                <span>{photoIndex + 1}</span> / <span>{GALLERY_IMAGES.length}</span>
              </div>
              <button
                type="button"
                className="lightbox-close-btn"
                onClick={closeLightbox}
                aria-label="Close Lightbox"
                title="Close (Esc)"
              >
                ✕
              </button>
            </div>

            {/* Prev Button */}
            <button
              type="button"
              className="lightbox-nav-btn prev-btn"
              onClick={(e) => {
                e.stopPropagation();
                goToPrev();
              }}
              aria-label="Previous Photo"
              title="Previous (Left Arrow)"
            >
              ‹
            </button>

            {/* Main Image Stage */}
            <div
              className="lightbox-stage"
              onClick={(e) => e.stopPropagation()}
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
            >
              <AnimatePresence custom={direction} mode="wait">
                <motion.div
                  key={photoIndex}
                  custom={direction}
                  variants={slideVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  className="lightbox-img-wrapper"
                >
                  <img
                    src={GALLERY_IMAGES[photoIndex].src}
                    alt={
                      isKh
                        ? GALLERY_IMAGES[photoIndex].captionKh
                        : GALLERY_IMAGES[photoIndex].captionEn
                    }
                    className="lightbox-main-img"
                    draggable="false"
                  />
                  <div className="lightbox-caption-bar">
                    <p className="lightbox-caption-text">
                      {isKh
                        ? GALLERY_IMAGES[photoIndex].captionKh
                        : GALLERY_IMAGES[photoIndex].captionEn}
                    </p>
                    <span className="lightbox-swipe-hint">
                      {isKh ? "អូសទៅឆ្វេង/ស្តាំ ឬប្រើព្រួញក្ដារចុច" : "Swipe or use arrow keys"}
                    </span>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Next Button */}
            <button
              type="button"
              className="lightbox-nav-btn next-btn"
              onClick={(e) => {
                e.stopPropagation();
                goToNext();
              }}
              aria-label="Next Photo"
              title="Next (Right Arrow)"
            >
              ›
            </button>

            {/* Bottom Thumbnail Strip */}
            <div
              className="lightbox-thumbnail-strip"
              onClick={(e) => e.stopPropagation()}
            >
              {GALLERY_IMAGES.map((item, idx) => (
                <button
                  key={idx}
                  type="button"
                  className={`lightbox-thumb-btn ${
                    idx === photoIndex ? "active" : ""
                  }`}
                  onClick={() => {
                    setDirection(idx > photoIndex ? 1 : -1);
                    setPhotoIndex(idx);
                  }}
                  aria-label={`Jump to photo ${idx + 1}`}
                >
                  <img
                    src={item.src}
                    alt={item.captionEn}
                    className="lightbox-thumb-img"
                  />
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default PhotoGallery;

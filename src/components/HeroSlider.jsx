import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "motion/react";

const slides = [
  {
    title: "Discover Our Stunning Accommodations",
    subtitle: "Explore Your Room Options",
  },
  {
    title: "Luxury Meets the Great Outdoors",
    subtitle: "Premium Cottages with Modern Amenities",
  },
  {
    title: "Experience Unforgettable Stays",
    subtitle: "Pick the Perfect Room for Your Journey",
  },
];

const HeroSlider = () => {
  const [current, setCurrent] = useState(0);
  const videoSrc = "HotelImages/herovideo102.mp4";

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []); // slides length is constant, no need to include

  // Optionally, handle video load error
  const [videoError, setVideoError] = useState(false);

  return (
    <div className="hero">
      <video
        autoPlay
        loop
        muted
        playsInline
        className="hero-video"
        aria-hidden="true"
        onError={() => setVideoError(true)}
      >
        <source src={videoSrc} type="video/mp4" />
        {/* Add fallback: webm or ogg if available */}
      </video>
      {/* Fallback if video fails */}
      {videoError && <div className="hero-fallback-bg" />}

      <div className="hero-overlay">
        <AnimatePresence mode="wait">
          <motion.div
            key={current} // using index as key is fine for static array
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            className="hero-content"
          >
            <h1 className="hero-title">{slides[current].title}</h1>
            <p className="hero-subtitle">{slides[current].subtitle}</p>
            <div className="hero-btns">
              <Link to="/contact" className="btn btn-primary">
                Book Now
              </Link>
              <Link
                to="/rooms"
                className="btn btn-outline"
                style={{ borderColor: "white", color: "white" }}
              >
                Explore Rooms
              </Link>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default HeroSlider;



import React from "react";
import { Link } from "react-router-dom";
import "./CTASection.css";

const CTASection = () => {
  return (
    <section
      className="cta-section"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1800&q=80')",
      }}
    >
      <div className="cta-overlay"></div>

      <div className="container">
        <div className="cta-content">
          <span className="cta-tag">
            🌿 Luxury Stay • Jim Corbett National Park
          </span>

          <h2 className="cta-title">
            Escape Into The Wild.
            <br />
            Stay In Luxury.
          </h2>

          <p className="cta-subtitle">
            Wake up to birdsong, unwind amidst lush forests, and experience
            unforgettable hospitality at Corbett Phoenix Resort in the heart of
            Ramnagar.
          </p>

          <div className="hero-btns">
            <Link to="/rooms" className="cta-btn primary">
              Book Your Stay
            </Link>

            <Link to="/contact" className="cta-btn secondary">
              Contact Us
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;

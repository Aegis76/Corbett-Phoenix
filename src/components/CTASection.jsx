

import React from "react";
import { Link } from "react-router-dom";
import "./CTASection.css";

const CTASection = () => {
  return (
    <section className="cta-section">
  <div className="cta-overlay"></div>

  <div className="container">
    <div className="cta-content">

      <span className="cta-tag">
        ★ Luxury Hotel in Jim Corbett
      </span>

      <h2 className="cta-title">
        Stay in Comfort.
        <br />
        Wake Up to Nature.
      </h2>

      <p className="cta-subtitle">
        Experience elegant rooms, warm hospitality, delicious dining, and peaceful surroundings at Corbett Phoenix Hotel—your perfect getaway near Jim Corbett National Park.
      </p>

      <div className="hero-btns">
        <Link to="/rooms" className="cta-btn primary">
          Reserve Your Room
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

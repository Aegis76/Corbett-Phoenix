import React from 'react';
import { Link } from 'react-router-dom';

const CTASection = () => {
  return (
    <section className="cta-section">
      <div className="container">
        <h2 className="cta-title">Plan Your Jungle Escape Today</h2>
        <p className="cta-subtitle">Experience the perfect blend of luxury and wilderness at Corbett Phoenix Resort.</p>
        <div className="hero-btns">
          <Link to="/contact" className="btn btn-primary" style={{ backgroundColor: 'white', color: 'var(--primary)' }}>Book Now</Link>
          <Link to="/contact" className="btn btn-outline" style={{ borderColor: 'white', color: 'white' }}>Contact Us</Link>
        </div>
      </div>
    </section>
  );
};

export default CTASection;

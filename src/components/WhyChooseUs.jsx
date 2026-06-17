import React from "react";
import "../styles/WhyChooseUs.css";

const WhyChooseUs = () => {
  const features = [
    "Cozy and spacious rooms with scenic view",
    "Organic food sourced from local farms",
    "Proximity to Corbett Tiger Reserve and nature trails",
    "Bonfire nights, jungle safaris & more",
    "Ideal for family vacations, solo retreats, and intimate gatherings",
  ];

  return (
    <section className="wcu-section">
      {/* Top Brand Message */}
      <div className="wcu-banner">
        <div className="container">
          <p className="banner-text">
            Whether you’re here for a relaxing holiday, a wildlife adventure, or
            a peaceful work-from-mountains getaway,{" "}
            <strong>Corbett Phoenix</strong> promises warmth, personalized
            hospitality, and breathtaking views.
          </p>
        </div>
      </div>

      <div className="container wcu-main-grid">
        {/* Left Content */}
        <div className="wcu-content">
          <h2 className="wcu-title">
            Why Choose <span className="accent-text">Corbett Phoenix</span>?
          </h2>
          <div className="wcu-divider">
            <span className="dot"></span>
            <span className="dot"></span>
            <span className="line"></span>
          </div>

          <ul className="wcu-list">
            {features.map((feature, index) => (
              <li key={index} className="wcu-item">
                <span className="item-number">{index + 1}.</span>
                <span className="item-text">{feature}</span>
              </li>
            ))}
          </ul>

          <p className="wcu-footer-text">
            Book your stay today and reconnect with nature in its purest form.
          </p>
          <button className="wcu-cta">Book Your Stay</button>
        </div>

        {/* Right Image with Decorative Frame */}
        <div className="wcu-image-wrapper">
          <div className="image-decoration"></div>
          <img
            src="https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&q=80&w=1000"
            alt="Resort Experience"
            className="wcu-main-img"
          />
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;

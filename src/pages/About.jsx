import React, { useState } from "react";
import {
  Quote,
  ChevronLeft,
  ChevronRight,
  Utensils,
  Leaf,
  Heart,
} from "lucide-react";
import "../styles/About.css";
import ReviewSection from "../components/ReviewSection";

const About = () => {
  const [current, setCurrent] = useState(0);
  const reviews = [
    {
      name: "Farham Saif",
      text: "If you’re looking for a genuine safari experience in Jim Corbett, Corbett Phoenix is the best! Their team knows the forest routes well.",
      rating: 5,
    },
    {
      name: "Krishan Singh",
      text: "I booked a package through Corbett Phoenix and had a seamless experience. Everything from pickup to safari was timely.",
      rating: 5,
    },
    {
      name: "Vaibhav Sharma",
      text: "Loved the professional service! The staff was friendly, and the accommodations were neat and comfortable.",
      rating: 5,
    },
  ];

  return (
    <div className="about-wrapper">
      {/* SECTION 1: MODERN HERO */}
      <section className="about-hero-new">
        <div className="hero-content">
          <span className="gold-badge">Est. 2015</span>
          <h1>
            Our Story & <span className="gold-text-highlight">Philosophy</span>
          </h1>
          <p>Discover the perfect sanctuary for your wilderness retreat.</p>
        </div>
      </section>

      {/* SECTION 2: BENTO STYLE ABOUT */}
      <section className="bento-about">
        <div className="container grid-layout">
          <div className="bento-card main-info shadow-3d">
            <h2 className="gold-title">Welcome to Phoenix Corbet – Your Gateway to Peace in the Heart of Nature</h2>
            <p>
              Phoenix Corbet was born out of a dream to create a peaceful
              retreat in the lap of nature. Located in Awala Khot, Kotabagh, our
              property is a perfect blend of eco-conscious living, warm
              hospitality, and Kumaoni culture. We’re a family-run hotel that
              believes in offering authentic experiences — whether that means
              sharing home-cooked meals made from local produce, helping you
              spot wildlife on a guided walk, or simply giving you the perfect
              quiet corner to read your favorite book. We’re not just a place to
              stay — we’re a story, a community, and a doorway to explore one of
              the most beautiful regions in India. At Phoenix Corbet, our
              mission is to make every guest feel at home while discovering the
              unexplored side of Uttarakhand.
            </p>
            <div className="stats-row">
              <div className="stat">
                <h3>12+</h3>
                <p>Years</p>
              </div>
              <div className="stat">
                <h3>1k+</h3>
                <p>Happy Guests</p>
              </div>
            </div>
          </div>
          <div className="bento-card image-card">
            <img src="/HotelImages/hotelFront.jpeg" alt="Resort" />
          </div>
          <div className="bento-card feature-card shadow-3d">
            <Leaf className="gold-icon" />
            <h1>Sustainability</h1>
            <p>
             We prioritize local resources and eco-friendly practices.
            </p>
          </div>
          <div className="bento-card feature-card shadow-3d">
            <Heart className="gold-icon" />
            <h1>Hospitality</h1>
            <p>
             We treat every guest like family.
            </p>
          </div>
           <div className="bento-card feature-card shadow-3d">
            <Heart className="gold-icon" />
            <h1>Experience</h1>
            <p>
            We aim to provide moments that turn into lasting memories.
            </p>
          </div>
        </div>
      </section>

      {/* SECTION 3: Who we are (Matching Deluxe Room Style) */}
      <section className="chef-showcase">
        <div className="container">
          <h2 className="section-heading">
            Who We <span className="gold-text-highlight">Are</span>
          </h2>
          <div className="chef-container shadow-3d">
            <div className="chef-img">
              <img src="https://github.com/Aegis76/Corbett-Phoenix/blob/main/public/WhatsApp%20Unknown%202026-06-20%20at%201.08.09%20AM/Screenshot%202026-06-23%20131703.png?raw=true" alt="Chef" />
            </div>
            <div className="chef-details">
              <span className="chef-tag">
                <Utensils size={14} /> Our Roots
              </span>
              <h3>Corbett Phoenix</h3>
              <p>
                We are storytellers, dreamers, and doers.
We are people who’ve swapped city lights for starlit skies.
We are Phoenix Corbet.

         
              </p>
              <div className="location">
               Located in Awala Khot, Kotabagh — our hotel is your ideal base to explore Corbett National Park, hidden waterfalls, scenic hiking trails, and untouched Kumaoni villages.
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 4: GUEST REVIEWS SLIDER */}
      <ReviewSection />
    </div>
  );
};

export default About;

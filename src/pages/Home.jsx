import React, { useState } from "react";
import { Link } from "react-router-dom";
import HeroSlider from "../components/HeroSlider";
import ExperienceCard from "../components/ExperienceCard";
import Amenities from "../components/Amenities";
import PackageCard from "../components/PackageCard";
import GalleryGrid from "../components/GalleryGrid";
import Testimonials from "../components/Testimonials";
import CTASection from "../components/CTASection";
import StatsSection from "../components/StatsSection";
import NearbyAttractions from "../components/NearbyAttractions";
import WhyChooseUs from "../components/WhyChooseUs";

const rooms = [
  { id: 1, name: "Deluxe Room", description: "Spacious room with garden view and modern amenities.", image: "/HotelImages/FamilySuite.jpeg", price: "4,500" },
  { id: 2, name: "Premium Room", description: "Luxury room with private balcony and forest views.", image: "/HotelImages/DeluxeRoom.jpeg", price: "6,000" },
  { id: 3, name: "Luxury Cottage", description: "Independent cottage for ultimate privacy and comfort.", image: "/HotelImages/PremiumRoom.jpeg", price: "8,500" },
];

const packages = [
  {
    id: 1,
    title: "2N/3D Wildlife Special",
    inclusions: ["Luxury Stay", "All Meals Included", "1 Jeep Safari", "Nature Walk"],
    image: "https://images.unsplash.com/photo-1500043356145-5e17a7fe42c5?auto=format&fit=crop&q=80&w=800",
    price: "12,999",
  },
];

/* Lightweight preview card for the homepage — links into /rooms to book */
const RoomPreviewCard = ({ room }) => {
  const [hover, setHover] = useState(false);
  return (
    <div
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        background: "#fff",
        borderRadius: "16px",
        overflow: "hidden",
        border: "1px solid rgba(15,61,46,0.08)",
        boxShadow: hover ? "0 18px 40px rgba(15,61,46,0.14)" : "0 10px 30px rgba(15,61,46,0.06)",
        transform: hover ? "translateY(-6px)" : "none",
        transition: "transform 0.35s ease, box-shadow 0.35s ease",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <div style={{ height: "220px", overflow: "hidden" }}>
        <img
          src={room.image}
          alt={room.name}
          style={{ width: "100%", height: "100%", objectFit: "cover", transform: hover ? "scale(1.06)" : "none", transition: "transform 0.6s ease" }}
        />
      </div>
      <div style={{ padding: "22px", display: "flex", flexDirection: "column", flex: 1 }}>
        <h3 style={{ fontSize: "1.35rem", fontWeight: 700, color: "#0f3d2e", marginBottom: "8px" }}>{room.name}</h3>
        <p style={{ color: "#5a6b62", fontSize: "0.95rem", lineHeight: 1.6, marginBottom: "18px", flex: 1 }}>{room.description}</p>
        <div style={{ display: "flex", alignItems: "baseline", gap: "6px", marginBottom: "18px" }}>
          <span style={{ fontSize: "0.85rem", color: "#5a6b62" }}>Starting from</span>
          <span style={{ fontSize: "1.4rem", fontWeight: 800, color: "#0f3d2e" }}>₹{room.price}</span>
          <span style={{ fontSize: "0.8rem", color: "#5a6b62" }}>/ night</span>
        </div>
        <Link to="/rooms" className="btn btn-primary" style={{ textAlign: "center" }}>
          View Details &amp; Book
        </Link>
      </div>
    </div>
  );
};

const Home = () => {
  return (
    <main>
      <HeroSlider />

      {/* About Section */}
      <section className="section-padding">
        <div className="container">
          <div className="about-section">
            <div className="about-content">
              <h2 className="section-title" style={{ textAlign: "left" }}>
                Welcome to Corbett Phoenix Resort
              </h2>
              <p style={{ marginBottom: "20px", fontSize: "1.1rem" }}>
                Your gateway to peace in the heart of nature. Nestled in the lush greens of Awala Khot, Kotabagh, just a short drive from the enchanting Corbett National Park, Phoenix Corbett is a tranquil escape for nature lovers, adventure seekers, and anyone looking to disconnect from city life.
              </p>
              <p style={{ marginBottom: "30px", color: "var(--text-light)" }}>
                Surrounded by the majestic hills of Nainital and the serene landscapes of Uttarakhand, our resort blends rustic charm with modern comfort for an experience that rejuvenates body, mind, and soul.
              </p>
              <Link to="/contact" className="btn btn-primary">Learn More</Link>
            </div>
            <div className="about-img">
              <img src="/HotelImages/WhatsApp Image 2026-03-20 at 11.48.55 AM (2).jpeg" alt="Resort View" />
            </div>
          </div>
        </div>
      </section>

      {/* Rooms Preview */}
      <section className="section-padding" style={{ backgroundColor: "#f9f9f9" }}>
        <div className="container">
          <h2 className="section-title">Our Luxury Stays</h2>
          <div className="card-grid">
            {rooms.map((room) => (
              <RoomPreviewCard key={room.id} room={room} />
            ))}
          </div>
          <div style={{ textAlign: "center", marginTop: "50px" }}>
            <Link to="/rooms" className="btn btn-outline">View All Rooms</Link>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="section-padding">
        <WhyChooseUs />
      </section>

      {/* Amenities */}
      <section className="section-padding" style={{ backgroundColor: "#f9f9f9" }}>
        <div className="container">
          <h2 className="section-title">Resort Amenities</h2>
          <Amenities />
        </div>
      </section>

      {/* Packages Preview */}
      <section className="section-padding">
        <div className="container">
          <h2 className="section-title">Exclusive Packages</h2>
          <div className="card-grid">
            {packages.map((pkg) => (
              <PackageCard key={pkg.id} pkg={pkg} />
            ))}
          </div>
          <div style={{ textAlign: "center", marginTop: "50px" }}>
            <Link to="/packages" className="btn btn-outline">Explore All Packages</Link>
          </div>
        </div>
      </section>

      {/* Gallery Preview */}
      <section className="section-padding" style={{ backgroundColor: "#f9f9f9" }}>
        <div className="container">
          <h2 className="section-title">Gallery Highlights</h2>
          <GalleryGrid limit={6} />
          <div style={{ textAlign: "center", marginTop: "50px" }}>
            <Link to="/gallery" className="btn btn-outline">View Full Gallery</Link>
          </div>
        </div>
      </section>

      <section>
        <NearbyAttractions />
      </section>

      <section className="section-padding" style={{ backgroundColor: "#f9f9f9" }}>
        <StatsSection />
      </section>

      {/* Testimonials */}
      <section className="section-padding" style={{ backgroundColor: "#f9f9f9" }}>
        <div className="container">
          <h2 className="section-title">Guest Reviews</h2>
          <Testimonials />
        </div>
      </section>

      <CTASection />
    </main>
  );
};

export default Home;

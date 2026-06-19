import React from "react";
import { Link } from "react-router-dom";

import HeroSlider from "../components/HeroSlider";
import RoomCard from "../components/RoomCard";
import Amenities from "../components/Amenities";
import GalleryGrid from "../components/GalleryGrid";
import Testimonials from "../components/Testimonials";
import CTASection from "../components/CTASection";
import StatsSection from "../components/StatsSection";
import NearbyAttractions from "../components/NearbyAttractions";
import WhyChooseUs from "../components/WhyChooseUs";

const rooms = [
  {
    id: 1,
    name: "Forest View Deluxe",
    description:
      "Comfortable room with modern interiors and scenic mountain views.",
    image: "/HotelImages/FamilySuite.jpeg",
    price: "4,500",
  },
  {
    id: 2,
    name: "Premium Valley Room",
    description:
      "Elegant accommodation with spacious interiors and premium facilities.",
    image: "/HotelImages/DeluxeRoom.jpeg",
    price: "6,000",
  },
  {
    id: 3,
    name: "Luxury Family Suite",
    description:
      "Perfect for families seeking extra space and comfort.",
    image: "/HotelImages/PremiumRoom.jpeg",
    price: "8,500",
  },
];

const Home = () => {
  return (
    <main>
      {/* HERO */}
      <HeroSlider />

      {/* BOOKING BAR */}
      <section className="booking-strip">
        <div className="container">
          <div className="booking-box">
            <div className="booking-item">
              <label>Check In</label>
              <input type="date" />
            </div>

            <div className="booking-item">
              <label>Check Out</label>
              <input type="date" />
            </div>

            <div className="booking-item">
              <label>Guests</label>
              <select>
                <option>1 Guest</option>
                <option>2 Guests</option>
                <option>3 Guests</option>
                <option>4 Guests</option>
              </select>
            </div>

            <button className="booking-btn">
              Check Availability
            </button>
          </div>
        </div>
      </section>

      {/* ABOUT HOTEL */}
      <section className="section-padding">
        <div className="container">
          <div className="about-grid">

            <div className="about-image">
              <img
                src="/HotelImages/WhatsApp Image 2026-03-20 at 11.48.55 AM (2).jpeg"
                alt="Corbett Phoenix Hotel"
              />
            </div>

            <div className="about-content">
              <span className="sub-title">
                Welcome To Corbett Phoenix Hotel
              </span>

              <h2>
                A Comfortable Stay Surrounded By Nature
              </h2>

              <p>
                Located in Awala Khot, Kotabagh, Corbett Phoenix Hotel
                offers modern accommodations, warm hospitality, and
                stunning views of Uttarakhand's natural beauty.
              </p>

              <p>
                Whether you're planning a family vacation, a romantic
                getaway, or a peaceful retreat, our hotel provides
                the perfect blend of comfort, convenience, and
                tranquility near Jim Corbett National Park.
              </p>

              <div className="about-features">
                <div>✓ Premium Rooms</div>
                <div>✓ Restaurant</div>
                <div>✓ Free WiFi</div>
                <div>✓ Parking Facility</div>
                <div>✓ Family Friendly</div>
                <div>✓ Room Service</div>
              </div>

              <Link
                to="/about"
                className="btn btn-primary"
              >
                Discover More
              </Link>
            </div>

          </div>
        </div>
      </section>

      {/* STATS */}
      <section className="section-padding bg-light">
        <StatsSection />
      </section>

      {/* ROOMS */}
      <section className="section-padding">
        <div className="container">

          <h2 className="section-title">
            Featured Rooms
          </h2>

          <div className="card-grid">
            {rooms.map((room) => (
              <RoomCard
                key={room.id}
                room={room}
              />
            ))}
          </div>

          <div
            style={{
              textAlign: "center",
              marginTop: "50px",
            }}
          >
            <Link
              to="/rooms"
              className="btn btn-outline"
            >
              View All Rooms
            </Link>
          </div>

        </div>
      </section>

      {/* WHY CHOOSE US */}
      <section className="section-padding bg-light">
        <WhyChooseUs />
      </section>

      {/* AMENITIES */}
      <section className="section-padding">
        <div className="container">
          <h2 className="section-title">
            Hotel Amenities
          </h2>

          <Amenities />
        </div>
      </section>

      {/* HOTEL HIGHLIGHTS */}
      <section className="section-padding bg-light">
        <div className="container">

          <h2 className="section-title">
            Hotel Highlights
          </h2>

          <div className="highlights-grid">

            <div className="highlight-card">
              <h3>Mountain Views</h3>
              <p>
                Wake up to beautiful mountain scenery
                and fresh air every morning.
              </p>
            </div>

            <div className="highlight-card">
              <h3>Restaurant</h3>
              <p>
                Enjoy delicious meals prepared with
                fresh ingredients.
              </p>
            </div>

            <div className="highlight-card">
              <h3>Parking</h3>
              <p>
                Secure and convenient parking
                available for all guests.
              </p>
            </div>

            <div className="highlight-card">
              <h3>Free WiFi</h3>
              <p>
                Stay connected with high-speed
                internet throughout the hotel.
              </p>
            </div>

          </div>

        </div>
      </section>

      {/* ATTRACTIONS */}
      <NearbyAttractions />

      {/* GALLERY */}
      <section className="section-padding">
        <div className="container">

          <h2 className="section-title">
            Gallery
          </h2>

          <GalleryGrid limit={6} />

          <div
            style={{
              textAlign: "center",
              marginTop: "40px",
            }}
          >
            <Link
              to="/gallery"
              className="btn btn-outline"
            >
              View Full Gallery
            </Link>
          </div>

        </div>
      </section>

      {/* BANNER */}
      <section className="hotel-banner">
        <div className="hotel-banner-overlay">
          <div className="container">
            <h2>
              Stay Close To Nature,
              Enjoy Modern Comfort
            </h2>

            <p>
              Experience unforgettable hospitality
              in the heart of Uttarakhand.
            </p>

            <Link
              to="/contact"
              className="btn btn-primary"
            >
              Book Your Stay
            </Link>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="section-padding">
        <div className="container">

          <h2 className="section-title">
            Guest Reviews
          </h2>

          <Testimonials />

        </div>
      </section>

      {/* CTA */}
      <CTASection />
    </main>
  );
};

export default Home;

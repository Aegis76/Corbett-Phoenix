import React from "react";
import { Link } from "react-router-dom";
import HeroSlider from "../components/HeroSlider";
import RoomCard from "../components/RoomCard";
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
  {
    id: 1,
    name: "Deluxe Room",
    description: "Spacious room with garden view and modern amenities.",
    image: "/HotelImages/FamilySuite.jpeg",
    price: "4,500",
  },
  {
    id: 2,
    name: "Premium Room",
    description: "Luxury room with private balcony and forest views.",
    image: "/HotelImages/DeluxeRoom.jpeg",
    price: "6,000",
  },
  {
    id: 3,
    name: "Luxury Cottage",
    description: "Independent cottage for ultimate privacy and comfort.",
    image: "/HotelImages/PremiumRoom.jpeg",
    price: "8,500",
  },
];

const Home = () => {
  return (
    <main>
      <HeroSlider />

      {/* Floating Booking Bar */}
      <section className="booking-bar">
        <div className="container">
          <div className="booking-wrapper">
            <input type="date" />
            <input type="date" />
            <select>
              <option>Guests</option>
              <option>1 Guest</option>
              <option>2 Guests</option>
              <option>3 Guests</option>
              <option>4 Guests</option>
            </select>

            <Link to="/contact" className="btn btn-primary">
              Book Now
            </Link>
          </div>
        </div>
      </section>

      {/* About */}
      <section className="section-padding">
        <div className="container">
          <div className="welcome-grid">
            <div className="welcome-image">
              <img
                src="/HotelImages/WhatsApp Image 2026-03-20 at 11.48.55 AM (2).jpeg"
                alt=""
              />
            </div>

            <div className="welcome-content">
              <span className="subheading">
                WELCOME TO PHOENIX CORBETT
              </span>

              <h2>
                Experience Luxury Amid Nature
              </h2>

              <p>
                Nestled in the serene landscapes of Kotabagh and surrounded by
                the majestic hills of Uttarakhand, Phoenix Corbett Resort
                offers a perfect blend of luxury, comfort, and wilderness.
              </p>

              <ul>
                <li>✓ Luxury Rooms & Suites</li>
                <li>✓ Swimming Pool</li>
                <li>✓ Multi Cuisine Restaurant</li>
                <li>✓ Safari Booking Assistance</li>
              </ul>

              <Link to="/about" className="btn btn-primary">
                Discover More
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <StatsSection />

      {/* Rooms */}
      <section className="section-padding rooms-section">
        <div className="container">
          <div className="section-header">
            <span>LUXURY ACCOMMODATION</span>
            <h2>Our Finest Rooms & Cottages</h2>
            <p>
              Designed for comfort, elegance and unforgettable experiences.
            </p>
          </div>

          <div className="card-grid">
            {rooms.map((room) => (
              <RoomCard key={room.id} room={room} />
            ))}
          </div>

          <div className="center-btn">
            <Link to="/rooms" className="btn btn-outline">
              View All Rooms
            </Link>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="section-padding">
        <WhyChooseUs />
      </section>

      {/* Experiences */}
      <section className="experience-section">
        <div className="container">
          <div className="section-header">
            <span>ADVENTURE & NATURE</span>
            <h2>Experiences You'll Love</h2>
          </div>

          <div className="experience-grid">
            <ExperienceCard
              experience={{
                title: "Jeep Safari",
                description:
                  "Explore the wilderness of Jim Corbett.",
                image:
                  "https://images.unsplash.com/photo-1534171472159-edb6d1e0b63c"
              }}
            />

            <ExperienceCard
              experience={{
                title: "Bird Watching",
                description:
                  "Witness rare birds in their natural habitat.",
                image:
                  "https://images.unsplash.com/photo-1444464666168-49d633b867ad"
              }}
            />
          </div>
        </div>
      </section>

      {/* Amenities */}
      <section className="luxury-amenities">
        <div className="container">
          <div className="section-header light">
            <span>LUXURY FACILITIES</span>
            <h2>Resort Amenities</h2>
          </div>

          <Amenities />
        </div>
      </section>

      {/* Gallery */}
      <section className="section-padding">
        <div className="container">
          <div className="section-header">
            <span>OUR GALLERY</span>
            <h2>Moments Captured</h2>
          </div>

          <GalleryGrid limit={8} />

          <div className="center-btn">
            <Link to="/gallery" className="btn btn-outline">
              View Full Gallery
            </Link>
          </div>
        </div>
      </section>

      {/* Attractions */}
      <NearbyAttractions />

      {/* Reviews */}
      <section className="section-padding review-section">
        <div className="container">
          <div className="section-header">
            <span>TESTIMONIALS</span>
            <h2>What Our Guests Say</h2>
          </div>

          <Testimonials />
        </div>
      </section>

      {/* Instagram Style Section */}
      <section className="instagram-section">
        <div className="container">
          <div className="section-header">
            <span>FOLLOW OUR JOURNEY</span>
            <h2>@corbettphoenixresort</h2>
          </div>

          <div className="instagram-grid">
            <img src="/HotelImages/gallery1.jpeg" alt="" />
            <img src="/HotelImages/gallery2.jpeg" alt="" />
            <img src="/HotelImages/gallery3.jpeg" alt="" />
            <img src="/HotelImages/gallery4.jpeg" alt="" />
            <img src="/HotelImages/gallery5.jpeg" alt="" />
            <img src="/HotelImages/gallery6.jpeg" alt="" />
          </div>
        </div>
      </section>

      <CTASection />
    </main>
  );
};

export default Home;

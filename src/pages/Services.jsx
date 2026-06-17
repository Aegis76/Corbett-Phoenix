import React from "react";
import { Coffee, Ship, Waves, Wind, ShieldCheck, Map } from "lucide-react";
import "../styles/Services.css";

const Services = () => {
  const serviceList = [
    {
      title: "In-Room Dining",
      icon: <Waves size={24} />,
      desc: "Experience gourmet dining in the comfort of your suite. From local Kumaoni delicacies to international cuisines, our 24/7 room service ensures a private and delicious experience whenever hunger strikes.",
      image:
        "https://images.unsplash.com/photo-1630330182004-98836f32e293?q=80&w=800",
    },
    {
      title: "Tea & Breakfast",
      icon: <Coffee size={24} />,
      desc: "Wake up to the aroma of freshly brewed Himalayan tea. Our breakfast buffet features organic farm-to-table ingredients, freshly baked breads, and seasonal fruits to energize your morning.",
      image:
        "https://images.unsplash.com/photo-1533089860892-a7c6f0a88666?q=80&w=800",
    },
    {
      title: "Guided Jungle Safari",
      icon: <Map size={24} />,
      desc: "Embark on an unforgettable adventure through Jim Corbett National Park. Our expert naturalists guide you through dense forests to spot tigers, elephants, and over 600 species of exotic birds.",
      image:
        "https://images.unsplash.com/photo-1581012733301-f99133840551?q=80&w=800",
    },
    {
      title: "Express Laundry",
      icon: <Wind size={24} />,
      desc: "Travel light and stay fresh. Our professional laundry and dry-cleaning service handles your garments with extreme care, ensuring they are returned crisp, clean, and ready for your next adventure.",
      image:
        "https://images.unsplash.com/photo-1517677208171-0bc6725a3e60?q=80&w=800",
    },
    {
      title: "Secure Luggage Care",
      icon: <ShieldCheck size={24} />,
      desc: "Arriving early or leaving late? Our supervised luggage storage facility allows you to explore the Corbett region freely, knowing your belongings are safely stored and monitored 24/7.",
      image:
        "https://images.unsplash.com/photo-1583922606661-09955f255971?q=80&w=800",
    },
    {
      title: "Riverside Wellness",
      icon: <Ship size={24} />,
      desc: "Find your inner peace with our riverside yoga sessions. Guided by masters, these sessions focus on meditation and breathing exercises with the soothing sound of the Kosi river in the background.",
      image:
        "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?q=80&w=800",
    },
  ];

  return (
    <main className="services-page">
      <section className="services-hero">
        <div className="hero-content">
          <h1 className="hero-title">Bespoke Services</h1>
          <div className="title-underline"></div>
          <p className="hero-subtitle">
            Elevating your stay with authentic hospitality
          </p>
        </div>
      </section>

      <section className="services-section">
        <div className="container">
          <div className="services-grid">
            {serviceList.map((service, index) => (
              <div key={index} className="service-card">
                <div className="service-img-box">
                  <img src={service.image} alt={service.title} />
                  <div className="service-icon-badge">{service.icon}</div>
                </div>
                <div className="service-info">
                  <h3 className="service-name">{service.title}</h3>
                  <p className="service-description">{service.desc}</p>
                </div>
                <div className="service-footer-line"></div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
};

export default Services;

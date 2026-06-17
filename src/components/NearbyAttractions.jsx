import React, { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import "../styles/NearbyAttractions.css";

const NearbyAttractions = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const attractions = [
    {
      id: 1,
      title: "Corbett Falls",
      image: "/Images/corbett-waterfall.jpg",
      description:
        "Corbett Falls is a scenic waterfall located near Kaladhungi in Uttarakhand, close to Jim Corbett National Park. Surrounded by dense teak forests and natural beauty, it offers a serene picnic spot for visitors. The peaceful ambiance and lush greenery make it an ideal getaway for nature lovers and photographers.",
    },
    {
      id: 2,
      title: "Shri Hanuman Dham",
      image: "/Images/Screenshot 2026-04-18 090940.png",
      description:
        "Shri Hanuman Dham is a beautiful temple dedicated to Lord Hanuman, located in Ramnagar, Uttarakhand. Surrounded by peaceful hills, it features impressive architecture, lush gardens, and spiritual calm. The dham attracts devotees and tourists alike, offering a serene atmosphere for prayer, meditation, and scenic enjoyment.",
    },
    {
      id: 3,
      title: "Bijrani Zone",
      image: "/Images/images.jpg",
      description:
        "Bijrani Zone is one of the most popular safari zones in Jim Corbett National Park. Known for its scenic beauty and dense forests, it offers a high chance of spotting tigers and other wildlife. The zone attracts many nature lovers and adventure seekers throughout the year &amp; mainly presence of all type of  activities which is perform in thos zone .",
    },
    {
      id: 4,
      title: "Dhangarhi Gate",
      image: "/Images/Other-Things-To-Consider-12.jpg",
      description:
        "Dhangarhi Gate is the main entrance to Jim Corbett National Park, located near Ramnagar in Uttarakhand. It houses a small museum displaying park history and wildlife. Visitors start their safari journeys here, making it a key point for exploring Corbett’s rich biodiversity and natural beauty. This is the famous beauty .",
    },
  ];

  const nextSlide = () => {
    if (currentIndex < attractions.length - 3) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const prevSlide = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  return (
    <section className="attractions-section">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">Nearby Attractions</h2>
          <div className="slider-controls">
            <button
              onClick={prevSlide}
              className={`control-btn ${currentIndex === 0 ? "disabled" : ""}`}
              disabled={currentIndex === 0}
            >
              <ChevronLeft size={24} />
            </button>
            <button
              onClick={nextSlide}
              className={`control-btn ${currentIndex >= attractions.length - 3 ? "disabled" : ""}`}
              disabled={currentIndex >= attractions.length - 3}
            >
              <ChevronRight size={24} />
            </button>
          </div>
        </div>

        <div className="slider-viewport">
          <div
            className="card-slider"
            style={{ transform: `translateX(-${currentIndex * (100 / 3)}%)` }}
          >
            {attractions.map((item) => (
              <div key={item.id} className="experience-card-wrapper">
                <div className="experience-card">
                  <div className="img-container">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="card-img"
                    />
                  </div>
                  <div className="card-content">
                    <h3 className="card-title">{item.title}</h3>
                    <p className="card-desc">{item.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default NearbyAttractions;

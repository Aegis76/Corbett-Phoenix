import React from "react";
import "../styles/ReviewSection.css";

const ReviewSection = () => {
  const reviews = [
    {
      id: 1,
      name: "Farham saif",
      image: "https://cdn-icons-png.flaticon.com/512/3655/3655682.png", // Food/Service Icon
      text: "If you’re looking for a genuine safari experience in Jim Corbett, Corbett Phoenix is the best! Their team knows the forest routes well and ensures safety throughout the trip. Very impressed!",
      rating: 5,
    },
    {
      id: 2,
      name: "Krishan Singh",
      image: "https://cdn-icons-png.flaticon.com/512/2737/2737034.png", // Dining Icon
      text: "I booked a package through Corbett Phoenix and had a seamless experience. Everything from pickup to safari was timely. Great hospitality and well-managed tour. Worth the money!",
      rating: 5,
    },
    {
      id: 3,
      name: "Vaibhav Sharma",
      image: "https://cdn-icons-png.flaticon.com/512/3655/3655682.png", // Food/Service Icon
      text: "Loved the professional service by Corbett Phoenix! The staff was friendly, and the accommodations were neat and comfortable. Jungle safari arrangements were top-notch. Will definitely visit again!",
      rating: 5,
    },
  ];

  return (
    <section className="review-container">
      <h2 className="review-title">Guest Reviews</h2>
      <div className="title-underline">
        <span></span>
        <div className="red-line"></div>
      </div>

      <div className="slider-wrapper">
        <button className="arrow-btn left-arrow">←</button>

        <div className="reviews-grid">
          {reviews.map((review) => (
            <div key={review.id} className="review-card">
              <div className="red-quote-badge">
                <span className="quote-mark">❞</span>
              </div>

              <div className="card-content">
                <div className="icon-box">
                  <img src={review.image} alt="Service Icon" />
                </div>
                <h3 className="reviewer-name">{review.name}</h3>
                <div className="stars">{"★".repeat(review.rating)}</div>
                <p className="review-body">"{review.text}"</p>
              </div>
            </div>
          ))}
        </div>

        <button className="arrow-btn right-arrow">→</button>
      </div>
    </section>
  );
};

export default ReviewSection;

import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Wifi,
  Wind,
  Tv,
  ChevronDown,
  ChevronUp,
  CheckCircle2,
  Info,
} from "lucide-react";
import "../styles/roomcard.css";

const RoomCard = ({ room }) => {
  const [showPlans, setShowPlans] = useState(false);

  return (
    <div className="room-pricing-card">
      <div className="room-main-info">
        <div className="room-image-wrapper">
          <img src={room.image} alt={room.name} className="room-image" />
        </div>
        <div className="room-details">
          <h3 className="room-card-title">{room.name}</h3>
          <p className="room-card-desc">{room.description}</p>

          <div className="room-base-amenities">
            <div className="room-amenity-tag">
              <Wifi size={14} /> <span>Free Wifi</span>
            </div>
            <div className="room-amenity-tag">
              <Wind size={14} /> <span>AC</span>
            </div>
            <div className="room-amenity-tag">
              <Tv size={14} /> <span>Smart TV</span>
            </div>
          </div>

          <button
            className="room-view-rates-btn"
            onClick={() => setShowPlans(!showPlans)}
          >
            {showPlans ? "Hide Rates" : "View Rates & Plans"}
            {showPlans ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
          </button>
        </div>
      </div>

      {showPlans && (
        <div className="room-plans-container">
          <div className="room-plans-header">
            <span>Pricing Plan</span>
            <span>Inclusions</span>
            <span>Price per Night</span>
          </div>

          <div className="room-plans-list">
            {room.plans.map((plan) => (
              <div key={plan.id} className="room-plan-row">
                <div className="room-plan-name-col">
                  <h4 className="room-plan-name">{plan.name}</h4>
                  <div className="room-cancellation-text">
                    <Info size={12} />
                    <span>{plan.cancellation}</span>
                  </div>
                </div>

                <div className="room-inclusions-col">
                  <ul className="room-inclusions-grid">
                    {plan.inclusions.map((inc, index) => (
                      <li key={index}>
                        <CheckCircle2 size={12} className="room-check-icon" />
                        {inc}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="room-price-column">
                  <div className="room-price-display">
                    <span className="room-currency">₹</span>
                    <span className="room-amount">{plan.price}</span>
                    <span className="room-per-night">/ night</span>
                  </div>
                  <Link to="/contact" className="room-book-btn">
                    Select
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default RoomCard;

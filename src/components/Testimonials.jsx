import React from "react";
import { Star } from "lucide-react";

const testimonials = [
  {
    name: "Rohit Sharma",
    text: "Corbett Phoenix is ideal if you’re looking to escape the city hustle. I stayed here for a weekend to focus on writing and was amazed by the calm environment. The rooms were cozy with all basic amenities. I found the staff very courteous and attentive. The food was homemade and comforting. There’s a beautiful walking path around the resort, and I loved sitting under the trees with my notebook. Internet worked fine too. For anyone looking for peace and natural surroundings, this place is unbeatable. It’s clean, budget-friendly, and simply serene. Highly recommended for solo travelers and creative folks!",
    rating: 5,
  },
  {
    name: "Devansh Rao",
    text: "We celebrated our anniversary at Corbett Phoenix and couldn’t be happier with our choice. The staff had even decorated the room slightly for the occasion, which felt so thoughtful. We loved the greenery around the resort and had a peaceful stay. The room was clean, the bathroom well maintained, and everything worked smoothly. They even helped us plan our safari and gave us great local tips. The food, especially breakfast and tea snacks, was excellent. We felt very cared for and left with beautiful memories. If you’re a couple looking for a romantic and quiet getaway — go for it!",
    rating: 5,
  },
  {
    name: "Seema Verma",
    text: "We had a wonderful family vacation at Corbett Phoenix. From the moment we arrived, the hospitality was warm and welcoming. The rooms were spacious, clean, and ideal for kids too. There was enough open space for children to play, and the property felt very safe. We enjoyed evening walks, the garden views, and the overall calmness. Meals were freshly prepared and suited everyone’s taste. The staff also helped us arrange a short sightseeing trip nearby. It’s a great blend of comfort, nature, and service. My kids loved every bit of it, and we’ll surely return for a longer stay.",
    rating: 4,
  },
];

const Testimonials = () => {
  return (
    <div className="card-grid">
      {testimonials.map((item, index) => (
        <div key={index} className="amenity-item" style={{ textAlign: "left" }}>
          <div
            style={{
              display: "flex",
              gap: "2px",
              marginBottom: "15px",
              color: "#f1c40f",
            }}
          >
            {[...Array(item.rating)].map((_, i) => (
              <Star key={i} size={16} fill="#f1c40f" />
            ))}
          </div>
          <p
            style={{
              fontStyle: "italic",
              marginBottom: "20px",
              color: "var(--text-light)",
            }}
          >
            "{item.text}"
          </p>
          <h4 style={{ color: "var(--primary)" }}>- {item.name}</h4>
        </div>
      ))}
    </div>
  );
};

export default Testimonials;

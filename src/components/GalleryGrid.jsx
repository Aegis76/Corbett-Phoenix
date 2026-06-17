import React from "react";

const images = [
  {
    id: 1,
    url: "/HotelImages/hotelSunRiseView.jpeg",
    large: true,
  },
  {
    id: 2,
    url: "https://images.unsplash.com/photo-1544644181-1484b3fdfc62?auto=format&fit=crop&q=80&w=800",
  },
  {
    id: 3,
    url: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&q=80&w=800",
  },
  {
    id: 4,
    url: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&q=80&w=800",
  },
  {
    id: 5,
    url: "https://images.unsplash.com/photo-1445019980597-93fa8acb246c?auto=format&fit=crop&q=80&w=800",
  },
  {
    id: 6,
    url: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&q=80&w=800",
    large: true,
  },
  {
    id: 7,
    url: "https://images.unsplash.com/photo-1540541338287-41700207dee6?auto=format&fit=crop&q=80&w=800",
  },
  {
    id: 8,
    url: "https://images.unsplash.com/photo-1564501049412-61c2a3083791?auto=format&fit=crop&q=80&w=800",
  },
];

const GalleryGrid = ({ limit }) => {
  const displayImages = limit ? images.slice(0, limit) : images;

  return (
    <div className="gallery-grid">
      {displayImages.map((img) => (
        <div
          key={img.id}
          className={`gallery-item ${img.large ? "large" : ""}`}
        >
          <img src={img.url} alt="Resort Gallery" />
        </div>
      ))}
    </div>
  );
};

export default GalleryGrid;

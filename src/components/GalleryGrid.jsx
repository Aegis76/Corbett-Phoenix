import React from "react";

const images = [
  {
    id: 1,
    url: "/HotelImages/hotelSunRiseView.jpeg",
    large: true,
  },
  {
    id: 2,
    url: "https://github.com/Aegis76/Corbett-Phoenix/blob/main/public/IMG_7371.jpg?raw=true",
  },
  {
    id: 3,
    url: "https://github.com/Aegis76/Corbett-Phoenix/blob/main/public/IMG-20260618-WA0007.jpg?raw=true",
  },
  {
    id: 4,
    url: "https://images.unsplash.com/photo-1527535619493-71d50f2d1ed4?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    id: 5,
    url: "https://images.unsplash.com/photo-1638260245218-2adb54cb41a5?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    id: 6,
    url: "",
    large: true,
  },
  {
    id: 7,
    url: "",
  },
  {
    id: 8,
    url: "",
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

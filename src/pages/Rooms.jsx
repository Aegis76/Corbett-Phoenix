import React from "react";
import RoomCard from "../components/RoomCard";
import CTASection from "../components/CTASection";

const allRooms = [
  {
    id: 1,
    name: "Standard Room",
    description: "AC Single Bedrooms–Private, Comfortable, and Cool",
    image: "/HotelImages/DeluxeRoom.jpeg",
    plans: [
      {
        id: "d1",
        type: "MAP",
        name: "AC Single Bedrooms",
        price: "2000",
        inclusions: ["Free WiFi", "AC", "TV", "Electric Kettle"],
        cancellation: "Non-Refundable",
      },
      {
        id: "d2",
        type: "CP",
        name: "Family Suites",
        price: "1500",
        inclusions: ["Free WiFi", "AC", "TV", "Electric Kettle"],
        cancellation: "Free cancellation before 48 hours",
      },
      {
        id: "d3",
        type: "AP",
        name: "Double Bed Rooms",
        price: "2500",
        inclusions: ["Free WiFi", "AC", "TV", "Electric Kettle"],
        cancellation: "Free cancellation before 48 hours",
      },
      {
        id: "d4",
        type: "EP",
        name: "Executive Stay Room",
        price: "1000",
        inclusions: ["Free WiFi", "AC", "TV", "Electric Kettle"],
        cancellation: "Free cancellation before 48 hours",
      },
    ],
  },

  {
    id: 2,
    name: "Deluxe Room",
    description:
      "Experience luxury with our Premium rooms featuring private balconies overlooking the dense forest.",
    image: "/HotelImages/PremiumRoom.jpeg",
    plans: [
      {
        id: "p1",
        type: "CP",
        name: "Double Bed Rooms",
        price: "3000",
        inclusions: ["Forest View", "Free WiFi", "AC", "TV"],
        cancellation: "Non-Refundable",
      },
      {
        id: "p2",
        type: "EP",
        name: "Executive Stay Room",
        price: "2000",
        inclusions: ["Breakfast included", "Forest View", "Free WiFi"],
        cancellation: "Free cancellation before 48 hours",
      },
      {
        id: "p3",
        type: "AP",
        name: "Family Suites",
        price: "5000",
        inclusions: ["Breakfast & Dinner", "Forest View", "Free WiFi"],
        cancellation: "Free cancellation before 48 hours",
      },
      {
        id: "p4",
        type: "MAP",
        name: "AC Single Bedrooms",
        price: "4000",
        inclusions: ["Breakfast, Lunch & Dinner", "Forest View", "Free WiFi"],
        cancellation: "Free cancellation before 48 hours",
      },
    ],
  },

  {
    id: 3,
    name: "Family Suite",
    description:
      "Ideal for families, these suites offer two interconnected rooms with a common living area.",
    image: "/HotelImages/PremiumRoom.jpeg",
    plans: [
      {
        id: "f1",
        type: "AP",
        name: "AC Single Bedrooms",
        price: "10000",
        inclusions: ["2 Bedrooms", "Living Area", "Free WiFi", "AC"],
        cancellation: "Non-Refundable",
      },
      {
        id: "f2",
        type: "CP",
        name: "Double Bed Rooms",
        price: "6000",
        inclusions: ["Breakfast included", "2 Bedrooms", "Living Area"],
        cancellation: "Free cancellation before 48 hours",
      },
      {
        id: "f3",
        type: "EP",
        name: "Family Suites",
        price: "4000",
        inclusions: ["Breakfast & Dinner", "2 Bedrooms", "Living Area"],
        cancellation: "Free cancellation before 48 hours",
      },
      {
        id: "f4",
        type: "MAP",
        name: "Executive Stay Room",
        price: "8000",
        inclusions: ["Breakfast, Lunch & Dinner", "2 Bedrooms", "Living Area"],
        cancellation: "Free cancellation before 48 hours",
      },
    ],
  },
];

const Rooms = () => {
  const getPrice = (plans, type) => {
    const plan = plans.find((p) => p.type === type);
    return plan ? `₹${plan.price}` : "-";
  };

  return (
    <main>
      {/* Hero Section */}
      <section
        className="section-padding"
        style={{
          backgroundColor: "var(--primary)",
          color: "#fff",
          textAlign: "center",
        }}
      >
        <div className="container">
          <h1 style={{ fontSize: "3.5rem", marginBottom: "20px" }}>
            Our Rooms & Suites
          </h1>
          <p style={{ fontSize: "1.2rem", opacity: 0.9 }}>
            Discover the perfect sanctuary for your wilderness retreat.
          </p>
        </div>
      </section>

      {/* Tariff Table */}
      <section className="section-padding">
        <div className="container">
          <h2 style={{ marginBottom: "20px", textAlign: "center" }}>
            Room Tariff
          </h2>

          <div style={{ overflowX: "auto" }}>
            <table
              style={{
                width: "100%",
                borderCollapse: "collapse",
                textAlign: "center",
              }}
            >
              <thead>
                <tr>
                  <th style={thStyle}>Room Category</th>
                  <th style={thStyle}>EP</th>
                  <th style={thStyle}>CP</th>
                  <th style={thStyle}>MAP</th>
                  <th style={thStyle}>AP</th>
                </tr>
              </thead>

              <tbody>
                {allRooms.map((room) => (
                  <tr key={room.id}>
                    <td style={tdStyle}>{room.name}</td>
                    <td style={tdStyle}>{getPrice(room.plans, "EP")}</td>
                    <td style={tdStyle}>{getPrice(room.plans, "CP")}</td>
                    <td style={tdStyle}>{getPrice(room.plans, "MAP")}</td>
                    <td style={tdStyle}>{getPrice(room.plans, "AP")}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Room Cards */}
      <section className="section-padding">
        <div className="container">
          <div className="room-list">
            {allRooms.map((room) => (
              <RoomCard key={room.id} room={room} />
            ))}
          </div>
        </div>
      </section>

      <CTASection />
    </main>
  );
};

const thStyle = {
  border: "1px solid #ddd",
  padding: "12px",
  backgroundColor: "#0f3d2e",
  color: "#fff",
};

const tdStyle = {
  border: "1px solid #ddd",
  padding: "12px",
};

export default Rooms;

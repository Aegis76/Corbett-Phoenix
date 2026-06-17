import React from "react";
import RoomCard from "../components/RoomCard";
import CTASection from "../components/CTASection";

/* ---------- ROOM CARD DATA ---------- */
const allRooms = [
  {
    id: 1,
    name: "Standard Room",
    description: "AC Single Bedrooms – Private, Comfortable, and Cool",
    image: "/HotelImages/DeluxeRoom.jpeg",
    plans: [
      {
        id: "d1",
        type: "CP",
        name: "CP Plan",
        price: "1500",
        inclusions: ["Free WiFi", "AC", "TV", "Electric Kettle"],
        cancellation: "Non-Refundable",
      },
      {
        id: "d2",
        type: "MAP",
        name: "MAP Plan",
        price: "2000",
        inclusions: ["Free WiFi", "AC", "TV", "Electric Kettle"],
        cancellation: "Free cancellation before 48 hours",
      },
      {
        id: "d3",
        type: "AP",
        name: "AP Plan",
        price: "2500",
        inclusions: ["Free WiFi", "AC", "TV", "Electric Kettle"],
        cancellation: "Free cancellation before 48 hours",
      },
    ],
  },

  {
    id: 2,
    name: "Deluxe Room",
    description:
      "Experience luxury with our premium rooms featuring private balconies overlooking the forest.",
    image: "/HotelImages/PremiumRoom.jpeg",
    plans: [
      {
        id: "p1",
        type: "CP",
        name: "CP Plan",
        price: "2500",
        inclusions: ["Forest View", "Free WiFi", "AC", "TV"],
        cancellation: "Non-Refundable",
      },
      {
        id: "p2",
        type: "MAP",
        name: "MAP Plan",
        price: "3000",
        inclusions: ["Breakfast included", "Forest View", "Free WiFi"],
        cancellation: "Free cancellation before 48 hours",
      },
      {
        id: "p3",
        type: "AP",
        name: "AP Plan",
        price: "3500",
        inclusions: ["Breakfast & Dinner", "Forest View", "Free WiFi"],
        cancellation: "Free cancellation before 48 hours",
      },
    ],
  },

  {
    id: 3,
    name: "Family Suite",
    description:
      "Ideal for families with spacious rooms and a common living area.",
    image: "/HotelImages/PremiumRoom.jpeg",
    plans: [
      {
        id: "f1",
        type: "CP",
        name: "CP Plan",
        price: "5000",
        inclusions: ["2 Bedrooms", "Living Area", "Free WiFi", "AC"],
        cancellation: "Non-Refundable",
      },
      {
        id: "f2",
        type: "MAP",
        name: "MAP Plan",
        price: "6000",
        inclusions: ["Breakfast included", "2 Bedrooms", "Living Area"],
        cancellation: "Free cancellation before 48 hours",
      },
      {
        id: "f3",
        type: "AP",
        name: "AP Plan",
        price: "7000",
        inclusions: [
          "Breakfast, Lunch & Dinner",
          "2 Bedrooms",
          "Living Area",
        ],
        cancellation: "Free cancellation before 48 hours",
      },
    ],
  },
];

/* ---------- SEASONAL TARIFF TABLE ---------- */
const seasonalTariffs = [
  {
    period: "15 Oct - 15 Jun",
    rows: [
      { category: "Standard Room", cp: 1500, map: 2000, ap: 2500 },
      { category: "Deluxe Room", cp: 2500, map: 3000, ap: 3500 },
      { category: "Family Suite", cp: 5000, map: 6000, ap: 7000 },
    ],
  },
  {
    period: "16 Jun - 14 Oct",
    rows: [
      { category: "Standard Room", cp: 700, map: 1200, ap: 1700 },
      { category: "Deluxe Room", cp: 1500, map: 2000, ap: 2500 },
      { category: "Family Suite", cp: 3000, map: 4000, ap: 5000 },
    ],
  },
];

/* ---------- STYLES ---------- */
const thStyle = {
  border: "1px solid #ddd",
  padding: "12px",
  backgroundColor: "#0f3d2e",
  color: "#fff",
  fontWeight: "bold",
};

const tdStyle = {
  border: "1px solid #ddd",
  padding: "12px",
};

const Rooms = () => {
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

      {/* Tariff Tables */}
      <section className="section-padding">
        <div className="container">
          <h2 style={{ textAlign: "center", marginBottom: "30px" }}>
            Room Tariff
          </h2>

          {seasonalTariffs.map((season) => (
            <div key={season.period} style={{ marginBottom: "40px" }}>
              <h3
                style={{
                  textAlign: "center",
                  marginBottom: "15px",
                }}
              >
                {season.period}
              </h3>

              <div style={{ overflowX: "auto" }}>
                <table
                  style={{
                    width: "100%",
                    minWidth: "600px",
                    borderCollapse: "collapse",
                    textAlign: "center",
                  }}
                >
                  <thead>
                    <tr>
                      <th style={thStyle}>Category</th>
                      <th style={thStyle}>CP</th>
                      <th style={thStyle}>MAP</th>
                      <th style={thStyle}>AP</th>
                    </tr>
                  </thead>

                  <tbody>
                    {season.rows.map((row) => (
                      <tr
                        key={`${season.period}-${row.category}`}
                      >
                        <td style={tdStyle}>{row.category}</td>
                        <td style={tdStyle}>₹{row.cp}</td>
                        <td style={tdStyle}>₹{row.map}</td>
                        <td style={tdStyle}>₹{row.ap}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Room Cards */}
      <section className="section-padding">
        <div className="container">
          <div className="room-list">
            {allRooms.map((room) => (
              <RoomCard
                key={room.id}
                room={room}
              />
            ))}
          </div>
        </div>
      </section>

      <CTASection />
    </main>
  );
};

export default Rooms;

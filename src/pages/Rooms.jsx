import React from "react";
import RoomCard from "../components/RoomCard";
import CTASection from "../components/CTASection";

const allRooms = [
  {
    id: 1,
    name: " Standard Room",
    description: "AC Single Bedrooms–Private,Comfortable,and Cool(MAP-2000)",
    image: "/HotelImages/DeluxeRoom.jpeg",
    plans: [
      {
        id: "d1",
        name: "AC Single Bedrooms–Private,Comfortable,and Cool(MAP-2000)",
        price: "2,000.00",
        inclusions: ["Free WiFi", "AC", "TV", "Electric Kettle"],
        cancellation: "Non-Refundable",
      },
      {
        id: "d2",
        name: "Family Suites–AC Rooms for a Relaxed Family Stay ( CP-1500 )",
        price: "1,500",
        inclusions: ["Free WiFi", "AC", "TV", "Electric Kettle"],
        cancellation: "Free cancellation before 48 hours",
      },
      {
        id: "d3",
        name: "Double Bed Rooms–Perfect for Couples or Solo Travelers ( AP-2500 )",
        price: "2,500",
        inclusions: ["Free WiFi", "AC", "TV", "Electric Kettle"],
        cancellation: "Free cancellation before 48 hours",
      },
      {
        id: "d4",
        name: "Executive and Single Person and Guest Stay Room(EP-1000)",
        price: "1,000",
        inclusions: ["Free WiFi", "AC", "TV", "Electric Kettle"],
        cancellation: "Free cancellation before 48 hours",
      },
    ],
  },
  {
    id: 2,
    name: "Delax Room",
    description:
      "Experience luxury with our Premium rooms featuring private balconies overlooking the dense Corbett forest.",
    image: "/HotelImages/PremiumRoom.jpeg",
    plans: [
      {
        id: "p1",
        name: "Double Bed Rooms–Perfect for Couples or Solo Travelers(CP-3000)",
        price: "3,000",
        inclusions: ["Forest View", "Free WiFi", "AC", "TV"],
        cancellation: "Non-Refundable",
      },
      {
        id: "p2",
        name: "Executive and Single Person and Guest Stay Room(EP-2000)",
        price: "2,000",
        inclusions: ["Breakfast included", "Forest View", "Free WiFi"],
        cancellation: "Free cancellation before 48 hours",
      },
      {
        id: "p3",
        name: "Family Suites–AC Rooms for a Relaxed Family Stay(AP-5000)",
        price: "5,000",
        inclusions: ["Breakfast & Dinner", "Forest View", "Free WiFi"],
        cancellation: "Free cancellation before 48 hours",
      },
      {
        id: "p4",
        name: "AC Single Bedrooms–Private,Comfortable,and Cool(MAP-4000)",
        price: "4,000",
        inclusions: ["Breakfast, Lunch & Dinner", "Forest View", "Free WiFi"],
        cancellation: "Free cancellation before 48 hours",
      },
    ],
  },

  {
    id: 4,
    name: "Family Suite",
    description:
      "Ideal for families, these suites offer two interconnected rooms with a common living area and forest view.",
    image: "/HotelImages/PremiumRoom.jpeg",
    plans: [
      {
        id: "f1",
        name: "AC Single Bedrooms–Private,Comfortable,and Cool(AP-10000)",
        price: "10,000",
        inclusions: ["2 Bedrooms", "Living Area", "Free WiFi", "AC"],
        cancellation: "Non-Refundable",
      },
      {
        id: "f2",
        name: "Double Bed Rooms–Perfect for Couples or Solo Travelers(CP-6000)",
        price: "6,000",
        inclusions: ["Breakfast included", "2 Bedrooms", "Living Area"],
        cancellation: "Free cancellation before 48 hours",
      },
      {
        id: "f3",
        name: "Family Suites–AC Rooms for a Relaxed Family Stay(EP-4000)",
        price: "4,000",
        inclusions: ["Breakfast & Dinner", "2 Bedrooms", "Living Area"],
        cancellation: "Free cancellation before 48 hours",
      },
      {
        id: "f4",
        name: "Executive Stay Room – Luxurious Space for a Premium Experience(MAP-8000)",
        price: "8,000",
        inclusions: ["Breakfast, Lunch & Dinner", "2 Bedrooms", "Living Area"],
        cancellation: "Free cancellation before 48 hours",
      },
    ],
  },
];

const Rooms = () => {
  return (
    <main>
      <section
        className="section-padding"
        style={{
          backgroundColor: "var(--primary)",
          color: "white",
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

export default Rooms;

import React, { useState } from "react";
import RoomCard from "../components/RoomCard";
import CTASection from "../components/CTASection";

/* ---------- DATE / SEASON HELPERS ---------- */
const parseDate = (str) => {
  const [y, m, d] = str.split("-").map(Number);
  return new Date(y, m - 1, d); // local midnight, avoids TZ off-by-one
};
const getSeason = (date) => {
  const m = date.getMonth();
  const day = date.getDate();
  const afterJun16 = m > 5 || (m === 5 && day >= 16);
  const beforeOct15 = m < 9 || (m === 9 && day <= 14);
  return afterJun16 && beforeOct15 ? "off" : "peak"; // off = 16 Jun–14 Oct
};
const nightsBetween = (ci, co) => {
  if (!ci || !co) return 0;
  const n = Math.round((parseDate(co) - parseDate(ci)) / 86400000);
  return n > 0 ? n : 0;
};

/* ---------- SINGLE SOURCE OF TRUTH ---------- */
const allRooms = [
  {
    id: 1,
    name: "Standard Room",
    description: "AC Single Bedrooms – Private, Comfortable, and Cool",
    image: "/HotelImages/DeluxeRoom.jpeg",
    plans: [
      { id: "d1", type: "CP", name: "CP Plan", inclusions: ["Free WiFi", "AC", "TV", "Electric Kettle"], cancellation: "Non-Refundable", prices: { peak: 1500, off: 700 } },
      { id: "d2", type: "MAP", name: "MAP Plan", inclusions: ["Free WiFi", "AC", "TV", "Electric Kettle"], cancellation: "Free cancellation before 48 hours", prices: { peak: 2000, off: 1200 } },
      { id: "d3", type: "AP", name: "AP Plan", inclusions: ["Free WiFi", "AC", "TV", "Electric Kettle"], cancellation: "Free cancellation before 48 hours", prices: { peak: 2500, off: 1700 } },
    ],
  },
  {
    id: 2,
    name: "Deluxe Room",
    description: "Experience luxury with our premium rooms featuring private balconies overlooking the forest.",
    image: "/HotelImages/PremiumRoom.jpeg",
    plans: [
      { id: "p1", type: "CP", name: "CP Plan", inclusions: ["Forest View", "Free WiFi", "AC", "TV"], cancellation: "Non-Refundable", prices: { peak: 2500, off: 1500 } },
      { id: "p2", type: "MAP", name: "MAP Plan", inclusions: ["Breakfast included", "Forest View", "Free WiFi"], cancellation: "Free cancellation before 48 hours", prices: { peak: 3000, off: 2000 } },
      { id: "p3", type: "AP", name: "AP Plan", inclusions: ["Breakfast & Dinner", "Forest View", "Free WiFi"], cancellation: "Free cancellation before 48 hours", prices: { peak: 3500, off: 2500 } },
    ],
  },
  {
    id: 3,
    name: "Family Suite",
    description: "Ideal for families with spacious rooms and a common living area.",
    image: "/HotelImages/PremiumRoom.jpeg",
    plans: [
      { id: "f1", type: "CP", name: "CP Plan", inclusions: ["2 Bedrooms", "Living Area", "Free WiFi", "AC"], cancellation: "Non-Refundable", prices: { peak: 5000, off: 3000 } },
      { id: "f2", type: "MAP", name: "MAP Plan", inclusions: ["Breakfast included", "2 Bedrooms", "Living Area"], cancellation: "Free cancellation before 48 hours", prices: { peak: 6000, off: 4000 } },
      { id: "f3", type: "AP", name: "AP Plan", inclusions: ["Breakfast, Lunch & Dinner", "2 Bedrooms", "Living Area"], cancellation: "Free cancellation before 48 hours", prices: { peak: 7000, off: 5000 } },
    ],
  },
];

/* ---------- TABLE DERIVED FROM allRooms ---------- */
const SEASON_META = [
  { key: "peak", label: "Peak Season", period: "15 Oct – 15 Jun" },
  { key: "off", label: "Off Season", period: "16 Jun – 14 Oct" },
];
const priceOf = (room, type, key) =>
  room.plans.find((p) => p.type === type).prices[key];
const seasonalTariffs = SEASON_META.map((s) => ({
  key: s.key,
  label: s.label,
  period: s.period,
  rows: allRooms.map((r) => ({
    category: r.name,
    cp: priceOf(r, "CP", s.key),
    map: priceOf(r, "MAP", s.key),
    ap: priceOf(r, "AP", s.key),
  })),
}));

/* ---------- STYLES ---------- */
const tableContainerStyle = { backgroundColor: "#fff", borderRadius: "16px", overflow: "hidden", boxShadow: "0 4px 20px rgba(0,0,0,0.08)", marginBottom: "40px" };
const tariffTitleStyle = { textAlign: "center", marginBottom: "40px", fontSize: "2.5rem", color: "#0f3d2e" };
const seasonHeadingStyle = { textAlign: "center", marginBottom: "16px", color: "#0f3d2e", fontSize: "1.5rem", fontWeight: "700" };
const thStyle = { padding: "16px", backgroundColor: "#0f3d2e", color: "#fff", fontWeight: "600" };
const tdStyle = { padding: "14px", borderBottom: "1px solid #eee" };
const dateBarStyle = { display: "flex", flexWrap: "wrap", gap: "20px", justifyContent: "center", alignItems: "flex-end", maxWidth: "720px", margin: "0 auto 50px", background: "#fff", padding: "24px", borderRadius: "16px", boxShadow: "0 4px 20px rgba(0,0,0,0.08)" };
const dateFieldStyle = { display: "flex", flexDirection: "column", gap: "6px" };
const dateLabelStyle = { fontSize: "0.85rem", fontWeight: 600, color: "#0f3d2e" };
const dateInputStyle = { padding: "10px 14px", border: "1px solid #ccc", borderRadius: "8px", fontSize: "1rem" };

const Rooms = () => {
  const today = new Date().toISOString().slice(0, 10);
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");

  const activeSeason = checkIn ? getSeason(parseDate(checkIn)) : null;
  const nights = nightsBetween(checkIn, checkOut);

  return (
    <main>
      {/* Hero */}
      <section className="section-padding" style={{ backgroundColor: "var(--primary)", color: "#fff", textAlign: "center" }}>
        <div className="container">
          <h1 style={{ fontSize: "clamp(2.5rem, 5vw, 4rem)", marginBottom: "20px", fontWeight: "700", letterSpacing: "1px" }}>
            Our Rooms & Suites
          </h1>
          <p style={{ fontSize: "1.15rem", maxWidth: "700px", margin: "0 auto", opacity: 0.9, lineHeight: "1.7" }}>
            Discover the perfect sanctuary for your wilderness retreat.
          </p>
        </div>
      </section>

      {/* Date + Seasonal Tariff */}
      <section className="section-padding" style={{ backgroundColor: "#f8faf8" }}>
        <div className="container">
          {/* Date selector */}
          <div style={dateBarStyle}>
            <div style={dateFieldStyle}>
              <label style={dateLabelStyle}>Check-in</label>
              <input
                type="date"
                min={today}
                value={checkIn}
                style={dateInputStyle}
                onChange={(e) => {
                  setCheckIn(e.target.value);
                  if (checkOut && e.target.value >= checkOut) setCheckOut("");
                }}
              />
            </div>
            <div style={dateFieldStyle}>
              <label style={dateLabelStyle}>Check-out</label>
              <input
                type="date"
                min={checkIn || today}
                value={checkOut}
                style={dateInputStyle}
                onChange={(e) => setCheckOut(e.target.value)}
              />
            </div>
            <div style={{ ...dateFieldStyle, justifyContent: "flex-end" }}>
              <span style={{ fontSize: "0.9rem", color: "#0f3d2e" }}>
                {activeSeason
                  ? `${SEASON_META.find((s) => s.key === activeSeason).label}${nights ? ` · ${nights} night${nights > 1 ? "s" : ""}` : ""}`
                  : "Select dates to see rates"}
              </span>
            </div>
          </div>

          <h2 style={tariffTitleStyle}>Seasonal Room Tariff</h2>

          {seasonalTariffs.map((season) => {
            const isActive = season.key === activeSeason;
            return (
              <div key={season.key}>
                <h3 style={seasonHeadingStyle}>
                  {season.period}
                  {isActive && (
                    <span style={{ marginLeft: "10px", fontSize: "0.8rem", background: "#0f3d2e", color: "#fff", padding: "3px 10px", borderRadius: "20px", verticalAlign: "middle" }}>
                      Your dates
                    </span>
                  )}
                </h3>
                <div style={{ ...tableContainerStyle, outline: isActive ? "2px solid #0f3d2e" : "none" }}>
                  <div style={{ overflowX: "auto" }}>
                    <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "center", minWidth: "650px" }}>
                      <thead>
                        <tr>
                          <th style={thStyle}>Room Category</th>
                          <th style={thStyle}>CP</th>
                          <th style={thStyle}>MAP</th>
                          <th style={thStyle}>AP</th>
                        </tr>
                      </thead>
                      <tbody>
                        {season.rows.map((row, index) => (
                          <tr key={`${season.key}-${row.category}`} style={{ backgroundColor: index % 2 === 0 ? "#ffffff" : "#f7f9f7" }}>
                            <td style={{ ...tdStyle, fontWeight: "600", color: "#0f3d2e" }}>{row.category}</td>
                            <td style={tdStyle}>₹{row.cp.toLocaleString()}</td>
                            <td style={tdStyle}>₹{row.map.toLocaleString()}</td>
                            <td style={tdStyle}>₹{row.ap.toLocaleString()}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Room Cards */}
      <section className="section-padding">
        <div className="container">
          <div className="room-list">
            {allRooms.map((room) => (
              <RoomCard key={room.id} room={room} season={activeSeason} nights={nights} />
            ))}
          </div>
        </div>
      </section>

      <CTASection />
    </main>
  );
};

export default Rooms;

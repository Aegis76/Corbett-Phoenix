import React, { useState } from "react";
import RoomCard from "../components/RoomCard";
import CTASection from "../components/CTASection";

/* ---------- DATE / SEASON HELPERS ---------- */
const parseDate = (str) => {
  const [y, m, d] = str.split("-").map(Number);
  return new Date(y, m - 1, d); // local midnight, avoids TZ off-by-one
};

// today as YYYY-MM-DD in LOCAL time.
// NOTE: toISOString() returns UTC — in IST (UTC+5:30) that rolls back a day
// before 05:30 local, which is exactly how "yesterday" was sneaking through.
const todayStr = () => {
  const d = new Date();
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
};
const addDays = (str, n) => {
  const d = parseDate(str);
  d.setDate(d.getDate() + n);
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
};
const getSeason = (date) => {
  const m = date.getMonth();
  const day = date.getDate();
  const afterJun16 = m > 5 || (m === 5 && day >= 16);
  const beforeOct15 = m < 9 || (m === 9 && day <= 14);
  return afterJun16 && beforeOct15 ? "peak" : "off"; // peak = 16 Jun–14 Oct
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
  { key: "peak", label: "Peak Season", period: "16 Jun – 14 Oct" },
  { key: "off", label: "Off Season", period: "15 Oct – 15 Jun" },
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
const tariffTitleStyle = { textAlign: "center", marginBottom: "8px", fontSize: "2.5rem", color: "#0f3d2e", fontWeight: 700 };
const tariffSubtitleStyle = { textAlign: "center", marginBottom: "44px", color: "#5a6b62", fontSize: "1rem" };
const seasonHeadingStyle = { display: "flex", alignItems: "center", justifyContent: "center", flexWrap: "wrap", gap: "12px", marginBottom: "18px", color: "#0f3d2e", fontSize: "1.4rem", fontWeight: 700 };
const tariffTableWrap = { backgroundColor: "#fff", borderRadius: "18px", overflow: "hidden", border: "1px solid rgba(15,61,46,0.08)", marginBottom: "44px", transition: "box-shadow 0.3s ease" };
const thStyle = { padding: "18px", background: "linear-gradient(135deg, #0f3d2e, #2d4632)", color: "#fff", fontWeight: 600, fontSize: "0.95rem", letterSpacing: "0.4px" };
const tdStyle = { padding: "16px" };
const datesBadgeStyle = { fontSize: "0.72rem", fontWeight: 700, background: "#0f3d2e", color: "#fff", padding: "4px 12px", borderRadius: "999px", letterSpacing: "0.4px" };
const dateBarStyle = { display: "flex", flexWrap: "wrap", gap: "20px", justifyContent: "center", alignItems: "flex-end", maxWidth: "720px", margin: "0 auto 50px", background: "#fff", padding: "24px", borderRadius: "16px", boxShadow: "0 4px 20px rgba(0,0,0,0.08)" };
const dateFieldStyle = { display: "flex", flexDirection: "column", gap: "6px" };
const dateLabelStyle = { fontSize: "0.85rem", fontWeight: 600, color: "#0f3d2e" };
const dateInputStyle = { padding: "10px 14px", border: "1px solid #ccc", borderRadius: "8px", fontSize: "1rem" };

const Rooms = () => {
  const today = todayStr();
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");

  // check-out can never be earlier than the morning after check-in
  const minCheckOut = checkIn ? addDays(checkIn, 1) : today;

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
                  const val = e.target.value;
                  // reject any past date — guards typed/pasted input that `min` doesn't catch
                  if (val && val < today) return;
                  setCheckIn(val);
                  // if existing check-out is now on/before the new check-in, clear it
                  if (checkOut && val && checkOut <= val) setCheckOut("");
                }}
              />
            </div>
            <div style={dateFieldStyle}>
              <label style={dateLabelStyle}>Check-out</label>
              <input
                type="date"
                min={minCheckOut}
                value={checkOut}
                style={dateInputStyle}
                onChange={(e) => {
                  const val = e.target.value;
                  // must be at least one night after check-in (or after today if none picked)
                  if (val && val < minCheckOut) return;
                  setCheckOut(val);
                }}
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
          <p style={tariffSubtitleStyle}>
            Rates change by season — pick your dates above and the matching rates light up.
          </p>

          {seasonalTariffs.map((season) => {
            const isActive = season.key === activeSeason;
            return (
              <div key={season.key}>
                <h3 style={seasonHeadingStyle}>
                  <span>{season.label}</span>
                  <span style={{ fontWeight: 500, color: "#5a6b62", fontSize: "1rem" }}>
                    ({season.period})
                  </span>
                  {isActive && <span style={datesBadgeStyle}>Your dates</span>}
                </h3>

                <div
                  style={{
                    ...tariffTableWrap,
                    boxShadow: isActive
                      ? "0 0 0 2px #0f3d2e, 0 16px 38px rgba(15,61,46,0.16)"
                      : "0 10px 30px rgba(15,61,46,0.06)",
                  }}
                >
                  <div style={{ overflowX: "auto" }}>
                    <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "center", minWidth: "640px" }}>
                      <thead>
                        <tr>
                          <th style={{ ...thStyle, textAlign: "left", paddingLeft: "28px" }}>Room Category</th>
                          <th style={thStyle}>CP</th>
                          <th style={thStyle}>MAP</th>
                          <th style={thStyle}>AP</th>
                        </tr>
                      </thead>
                      <tbody>
                        {season.rows.map((row, index) => {
                          const isLast = index === season.rows.length - 1;
                          const cellBorder = isLast ? "none" : "1px solid rgba(15,61,46,0.06)";
                          return (
                            <tr key={`${season.key}-${row.category}`} style={{ backgroundColor: index % 2 === 0 ? "#ffffff" : "#f7faf8" }}>
                              <td style={{ ...tdStyle, textAlign: "left", paddingLeft: "28px", fontWeight: 700, color: "#0f3d2e", borderBottom: cellBorder }}>
                                {row.category}
                              </td>
                              <td style={{ ...tdStyle, borderBottom: cellBorder }}>₹{row.cp.toLocaleString()}</td>
                              <td style={{ ...tdStyle, borderBottom: cellBorder }}>₹{row.map.toLocaleString()}</td>
                              <td style={{ ...tdStyle, borderBottom: cellBorder, fontWeight: 600, color: "#0f3d2e" }}>₹{row.ap.toLocaleString()}</td>
                            </tr>
                          );
                        })}
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

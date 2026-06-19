import React, { useState, useRef } from "react";
import RoomCard from "../components/RoomCard";
import CTASection from "../components/CTASection";

/* ---------- HOTEL CONTACT — FILL THIS ---------- */
// Country code + number, no "+", no spaces. India example: 91 + 10-digit.
const HOTEL_WHATSAPP = "919876543210";

/* ---------- DATE / SEASON HELPERS ---------- */
const parseDate = (str) => {
  const [y, m, d] = str.split("-").map(Number);
  return new Date(y, m - 1, d);
};
const todayStr = () => {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
};
const addDays = (str, n) => {
  const d = parseDate(str);
  d.setDate(d.getDate() + n);
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
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
const priceOf = (room, type, key) => room.plans.find((p) => p.type === type).prices[key];
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

/* ---------- BOOKING MODAL STYLES ---------- */
const overlayStyle = { position: "fixed", inset: 0, background: "rgba(10,25,18,0.55)", backdropFilter: "blur(3px)", display: "flex", alignItems: "flex-start", justifyContent: "center", padding: "40px 16px", zIndex: 1000, overflowY: "auto" };
const modalStyle = { background: "#fff", borderRadius: "20px", width: "100%", maxWidth: "520px", overflow: "hidden", boxShadow: "0 30px 70px rgba(0,0,0,0.35)" };
const modalHeaderStyle = { background: "linear-gradient(135deg, #0f3d2e, #2d4632)", color: "#fff", padding: "24px 28px", position: "relative" };
const modalBodyStyle = { padding: "26px 28px 30px" };
const summaryBoxStyle = { background: "rgba(15,61,46,0.05)", border: "1px solid rgba(15,61,46,0.1)", borderRadius: "12px", padding: "16px 18px", marginBottom: "22px", fontSize: "0.9rem", color: "#0f3d2e", display: "grid", gap: "8px" };
const summaryRowStyle = { display: "flex", justifyContent: "space-between", gap: "12px" };
const fieldStyle = { display: "flex", flexDirection: "column", gap: "6px", marginBottom: "16px" };
const inputStyle2 = { padding: "11px 14px", border: "1px solid #ccc", borderRadius: "10px", fontSize: "1rem", width: "100%", boxSizing: "border-box" };
const labelStyle2 = { fontSize: "0.85rem", fontWeight: 600, color: "#0f3d2e" };
const submitBtnStyle = { width: "100%", background: "linear-gradient(135deg, #128C7E, #25D366)", color: "#fff", border: "none", padding: "14px", borderRadius: "12px", fontSize: "1rem", fontWeight: 700, cursor: "pointer", marginTop: "6px" };
const payNoteStyle = { display: "flex", alignItems: "center", gap: "8px", background: "rgba(22,163,74,0.08)", border: "1px solid rgba(22,163,74,0.25)", color: "#15803d", padding: "10px 14px", borderRadius: "10px", fontSize: "0.85rem", marginBottom: "18px", fontWeight: 600 };
const errStyle = { color: "#c0392b", fontSize: "0.85rem", marginBottom: "12px", fontWeight: 600 };
const closeXStyle = { position: "absolute", top: "16px", right: "18px", background: "rgba(255,255,255,0.15)", border: "none", color: "#fff", width: "30px", height: "30px", borderRadius: "50%", cursor: "pointer", fontSize: "1.2rem", lineHeight: 1 };

/* ---------- BOOKING MODAL ---------- */
const BookingModal = ({ booking, onClose }) => {
  const [form, setForm] = useState({ name: "", email: "", phone: "", guests: 1, agree: false });
  const [err, setErr] = useState("");
  const [status, setStatus] = useState("idle"); // idle | success | error
  const set = (k, v) => setForm((f) => ({ ...f, [k]: v }));

  const submit = () => {
    if (!form.name.trim()) return setErr("Please enter your full name.");
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) return setErr("Please enter a valid email.");
    if (!form.phone.trim()) return setErr("Please enter your phone number.");
    if (!form.guests || Number(form.guests) < 1) return setErr("Please enter the number of guests.");
    if (!form.agree) return setErr("Please accept the privacy policy to continue.");
    setErr("");

    const msg =
`*New Booking Request — Corbett Phoenix*

*Room:* ${booking.roomName}
*Plan:* ${booking.planName} (${booking.season})
*Check-in:* ${booking.checkIn}
*Check-out:* ${booking.checkOut}
*Nights:* ${booking.nights}
*Rate/night:* ₹${booking.nightly.toLocaleString()}
*Total:* ₹${booking.total.toLocaleString()}
*Payment:* Pay at Property

*Guest:* ${form.name}
*Email:* ${form.email}
*Phone:* ${form.phone}
*Guests:* ${form.guests}`;

    const url = `https://wa.me/${HOTEL_WHATSAPP}?text=${encodeURIComponent(msg)}`;
    const win = window.open(url, "_blank");
    setStatus(win ? "success" : "error");
  };

  return (
    <div style={overlayStyle} onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div style={modalStyle}>
        <div style={modalHeaderStyle}>
          <button style={closeXStyle} onClick={onClose} aria-label="Close">×</button>
          <div style={{ fontSize: "0.78rem", opacity: 0.85, letterSpacing: "0.6px" }}>COMPLETE YOUR BOOKING</div>
          <div style={{ fontSize: "1.3rem", fontWeight: 700, marginTop: "4px" }}>{booking.roomName}</div>
          <div style={{ fontSize: "0.9rem", opacity: 0.9 }}>{booking.planName} · {booking.season}</div>
        </div>

        <div style={modalBodyStyle}>
          {status === "success" ? (
            <div style={{ textAlign: "center", padding: "20px 0" }}>
              <div style={{ fontSize: "2.4rem", marginBottom: "10px", color: "#25D366" }}>✓</div>
              <h3 style={{ color: "#0f3d2e", marginBottom: "8px" }}>Almost done!</h3>
              <p style={{ color: "#5a6b62", fontSize: "0.92rem", lineHeight: 1.6 }}>
                Your booking details are ready in WhatsApp — just press <strong>send</strong> there to confirm with the resort. Payment is collected at the property.
              </p>
              <button style={{ ...submitBtnStyle, marginTop: "20px" }} onClick={onClose}>Done</button>
            </div>
          ) : (
            <>
              <div style={summaryBoxStyle}>
                <div style={summaryRowStyle}><span>Check-in</span><strong>{booking.checkIn}</strong></div>
                <div style={summaryRowStyle}><span>Check-out</span><strong>{booking.checkOut}</strong></div>
                <div style={summaryRowStyle}><span>Nights</span><strong>{booking.nights}</strong></div>
                <div style={summaryRowStyle}><span>Rate / night</span><strong>₹{booking.nightly.toLocaleString()}</strong></div>
                <div style={{ ...summaryRowStyle, borderTop: "1px solid rgba(15,61,46,0.15)", paddingTop: "8px", fontSize: "1.05rem" }}>
                  <span style={{ fontWeight: 700 }}>Total</span><strong>₹{booking.total.toLocaleString()}</strong>
                </div>
              </div>

              <div style={fieldStyle}>
                <label style={labelStyle2}>Full name</label>
                <input style={inputStyle2} value={form.name} onChange={(e) => set("name", e.target.value)} placeholder="Your name" />
              </div>
              <div style={fieldStyle}>
                <label style={labelStyle2}>Email</label>
                <input style={inputStyle2} type="email" value={form.email} onChange={(e) => set("email", e.target.value)} placeholder="you@example.com" />
              </div>
              <div style={fieldStyle}>
                <label style={labelStyle2}>Phone</label>
                <input style={inputStyle2} type="tel" value={form.phone} onChange={(e) => set("phone", e.target.value)} placeholder="+91 …" />
              </div>
              <div style={fieldStyle}>
                <label style={labelStyle2}>Number of guests</label>
                <input style={inputStyle2} type="number" min="1" value={form.guests} onChange={(e) => set("guests", e.target.value)} />
              </div>

              <div style={payNoteStyle}>● Payment method: Pay at Property</div>

              <label style={{ display: "flex", gap: "10px", alignItems: "flex-start", fontSize: "0.85rem", color: "#5a6b62", marginBottom: "18px", cursor: "pointer" }}>
                <input type="checkbox" checked={form.agree} onChange={(e) => set("agree", e.target.checked)} style={{ marginTop: "3px" }} />
                <span>I agree to the{" "}
                  <a href="/privacy-policy" target="_blank" rel="noreferrer" style={{ color: "#0f3d2e", fontWeight: 600 }}>privacy policy</a>{" "}and booking terms.
                </span>
              </label>

              {err && <div style={errStyle}>{err}</div>}
              {status === "error" && <div style={errStyle}>Couldn't open WhatsApp. Please allow popups, or message the resort directly.</div>}

              <button style={submitBtnStyle} onClick={submit}>Confirm Booking via WhatsApp</button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

const Rooms = () => {
  const today = todayStr();
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [booking, setBooking] = useState(null);
  const dateRef = useRef(null);

  const minCheckOut = checkIn ? addDays(checkIn, 1) : today;
  const activeSeason = checkIn ? getSeason(parseDate(checkIn)) : null;
  const activeSeasonLabel = activeSeason ? SEASON_META.find((s) => s.key === activeSeason).label : "";
  const nights = nightsBetween(checkIn, checkOut);

  const handleBook = ({ roomName, planName, nightly, total }) =>
    setBooking({ roomName, planName, season: activeSeasonLabel, checkIn, checkOut, nights, nightly, total });
  const scrollToDates = () => dateRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });

  return (
    <main>
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

      <section className="section-padding" style={{ backgroundColor: "#f8faf8" }}>
        <div className="container">
          <div style={dateBarStyle} ref={dateRef}>
            <div style={dateFieldStyle}>
              <label style={dateLabelStyle}>Check-in</label>
              <input type="date" min={today} value={checkIn} style={dateInputStyle}
                onChange={(e) => {
                  const val = e.target.value;
                  if (val && val < today) return;
                  setCheckIn(val);
                  if (checkOut && val && checkOut <= val) setCheckOut("");
                }} />
            </div>
            <div style={dateFieldStyle}>
              <label style={dateLabelStyle}>Check-out</label>
              <input type="date" min={minCheckOut} value={checkOut} style={dateInputStyle}
                onChange={(e) => {
                  const val = e.target.value;
                  if (val && val < minCheckOut) return;
                  setCheckOut(val);
                }} />
            </div>
            <div style={{ ...dateFieldStyle, justifyContent: "flex-end" }}>
              <span style={{ fontSize: "0.9rem", color: "#0f3d2e" }}>
                {activeSeason
                  ? `${activeSeasonLabel}${nights ? ` · ${nights} night${nights > 1 ? "s" : ""}` : ""}`
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
                  <span style={{ fontWeight: 500, color: "#5a6b62", fontSize: "1rem" }}>({season.period})</span>
                  {isActive && <span style={datesBadgeStyle}>Your dates</span>}
                </h3>
                <div style={{ ...tariffTableWrap, boxShadow: isActive ? "0 0 0 2px #0f3d2e, 0 16px 38px rgba(15,61,46,0.16)" : "0 10px 30px rgba(15,61,46,0.06)" }}>
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
                              <td style={{ ...tdStyle, textAlign: "left", paddingLeft: "28px", fontWeight: 700, color: "#0f3d2e", borderBottom: cellBorder }}>{row.category}</td>
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

      <section className="section-padding">
        <div className="container">
          <div className="room-list">
            {allRooms.map((room) => (
              <RoomCard key={room.id} room={room} season={activeSeason} nights={nights} onBook={handleBook} onNeedDates={scrollToDates} />
            ))}
          </div>
        </div>
      </section>

      <CTASection />

      {booking && <BookingModal booking={booking} onClose={() => setBooking(null)} />}
    </main>
  );
};

export default Rooms;

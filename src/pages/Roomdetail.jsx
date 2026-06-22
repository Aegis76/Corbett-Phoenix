import React, { useState, useRef } from "react";
import { useParams, Link } from "react-router-dom";
import CTASection from "../components/CTASection";

/* ---------- HOTEL CONFIG — EDIT THESE ---------- */
const HOTEL_WHATSAPP = "919876543210"; // country code + number, no "+"
const HOTEL_NAME = "Corbett Phoenix";
const HOTEL_PHONE = "+91 98765 43210";
const HOTEL_EMAIL = "stay@corbettphoenix.com";
const HOTEL_LOCATION = "Awala Khot, Kotabagh · near Corbett National Park, Uttarakhand";
const CHECK_IN_TIME = "12:00 PM";
const CHECK_OUT_TIME = "11:00 AM";
const TAX_RATE = 0.12; // 12% GST

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
const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const fmtShort = (str) => {
  if (!str) return "";
  const d = parseDate(str);
  return `${d.getDate()} ${MONTHS[d.getMonth()]}`;
};

/* ---------- SINGLE SOURCE OF TRUTH ---------- */
const allRooms = [
  {
    id: 1,
    name: "Standard Room",
    description: "AC single bedrooms — private, comfortable, and cool, with all the essentials for a restful stay.",
    image: "/HotelImages/DeluxeRoom.jpeg",
    guests: 2,
    bed: "1 Queen Bed",
    size: "150 sq ft",
    plans: [
      { id: "d1", type: "CP", name: "CP Plan", inclusions: ["Free WiFi", "AC", "TV", "Electric Kettle"], cancellation: "Non-Refundable", prices: { peak: 1500, off: 700 } },
      { id: "d2", type: "MAP", name: "MAP Plan", inclusions: ["Free WiFi", "AC", "TV", "Electric Kettle"], cancellation: "Free cancellation before 48 hours", prices: { peak: 2000, off: 1200 } },
      { id: "d3", type: "AP", name: "AP Plan", inclusions: ["Free WiFi", "AC", "TV", "Electric Kettle"], cancellation: "Free cancellation before 48 hours", prices: { peak: 2500, off: 1700 } },
    ],
  },
  {
    id: 2,
    name: "Deluxe Room",
    description: "Experience comfort and elegance with our spacious Deluxe Room, featuring a private balcony overlooking the forest.",
    image: "/HotelImages/PremiumRoom.jpeg",
    guests: 2,
    bed: "1 King Bed",
    size: "220 sq ft",
    plans: [
      { id: "p1", type: "CP", name: "CP Plan", inclusions: ["Forest View", "Free WiFi", "AC", "TV"], cancellation: "Non-Refundable", prices: { peak: 2500, off: 1500 } },
      { id: "p2", type: "MAP", name: "MAP Plan", inclusions: ["Breakfast included", "Forest View", "Free WiFi"], cancellation: "Free cancellation before 48 hours", prices: { peak: 3000, off: 2000 } },
      { id: "p3", type: "AP", name: "AP Plan", inclusions: ["Breakfast & Dinner", "Forest View", "Free WiFi"], cancellation: "Free cancellation before 48 hours", prices: { peak: 3500, off: 2500 } },
    ],
  },
  {
    id: 3,
    name: "Family Suite",
    description: "Ideal for families — spacious rooms with a shared living area and room for everyone to unwind.",
    image: "/HotelImages/FamilySuite.jpeg",
    guests: 4,
    bed: "2 Bedrooms",
    size: "420 sq ft",
    plans: [
      { id: "f1", type: "CP", name: "CP Plan", inclusions: ["2 Bedrooms", "Living Area", "Free WiFi", "AC"], cancellation: "Non-Refundable", prices: { peak: 5000, off: 3000 } },
      { id: "f2", type: "MAP", name: "MAP Plan", inclusions: ["Breakfast included", "2 Bedrooms", "Living Area"], cancellation: "Free cancellation before 48 hours", prices: { peak: 6000, off: 4000 } },
      { id: "f3", type: "AP", name: "AP Plan", inclusions: ["Breakfast, Lunch & Dinner", "2 Bedrooms", "Living Area"], cancellation: "Free cancellation before 48 hours", prices: { peak: 7000, off: 5000 } },
    ],
  },
];

const SEASON_META = [
  { key: "peak", label: "Peak Season", period: "16 Jun – 14 Oct" },
  { key: "off", label: "Off Season", period: "15 Oct – 15 Jun" },
];
const priceOf = (room, type, key) => room.plans.find((p) => p.type === type).prices[key];

const PLAN_TYPES = ["CP", "MAP", "AP"];
const AMENITIES = ["Air Conditioning", "Private Bathroom", "LED TV", "24×7 Hot Water", "Free WiFi", "Room Service", "Tea/Coffee Maker", "Wardrobe"];
const WHY_BOOK = [
  ["🏷️", "Best Price Guarantee"],
  ["🔄", "Free Cancellation"],
  ["🔒", "Secure Booking"],
  ["🎧", "24/7 Customer Support"],
];
const GALLERY = ["/HotelImages/DeluxeRoom.jpeg", "/HotelImages/PremiumRoom.jpeg", "/HotelImages/FamilySuite.jpeg"];

/* ---------- BOOKING MODAL (unchanged from your code) ---------- */
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

const BookingModal = ({ booking, onClose }) => {
  const [form, setForm] = useState({ name: "", email: "", phone: "", guests: 1, agree: false });
  const [err, setErr] = useState("");
  const [status, setStatus] = useState("idle");
  const set = (k, v) => setForm((f) => ({ ...f, [k]: v }));

  const submit = () => {
    if (!form.name.trim()) return setErr("Please enter your full name.");
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) return setErr("Please enter a valid email.");
    if (!form.phone.trim()) return setErr("Please enter your phone number.");
    if (!form.guests || Number(form.guests) < 1) return setErr("Please enter the number of guests.");
    if (!form.agree) return setErr("Please accept the privacy policy to continue.");
    setErr("");

    const msg =
`*New Booking Request — ${HOTEL_NAME}*

*Room:* ${booking.roomName}
*Plan:* ${booking.planName} (${booking.season})
*Check-in:* ${booking.checkIn || "—"}
*Check-out:* ${booking.checkOut || "—"}
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
                <div style={summaryRowStyle}><span>Check-in</span><strong>{booking.checkIn || "—"}</strong></div>
                <div style={summaryRowStyle}><span>Check-out</span><strong>{booking.checkOut || "—"}</strong></div>
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

/* ---------- SCOPED PAGE CSS (responsive) ---------- */
const CSS = `
.cp { --g:#0f3d2e; --g2:#2d4632; --gold:#c4a962; --cream:#f3f1ea; --card:#ffffff;
  --ink:#283a31; --muted:#6f7d73; --line:rgba(15,61,46,.10);
  background:var(--cream); color:var(--ink); font-family:'Inter',system-ui,sans-serif; }
.cp .wrap { max-width:1200px; margin:0 auto; padding:36px 20px 60px; }
.cp .main { display:grid; grid-template-columns:1fr 340px; gap:28px; align-items:start; }
.cp .leftcol { min-width:0; display:flex; flex-direction:column; gap:26px; }
.cp .side { position:sticky; top:24px; display:flex; flex-direction:column; gap:20px; }

.cp .card { background:var(--card); border:1px solid var(--line); border-radius:18px; }
.cp .eyebrow { color:var(--gold); font-weight:700; letter-spacing:2px; font-size:12px; text-transform:uppercase; }
.cp h1.room-name { font-size:clamp(1.9rem,4vw,2.6rem); color:var(--g); font-weight:800; margin:8px 0 12px; line-height:1.1; }
.cp .room-desc { color:var(--muted); line-height:1.65; max-width:460px; }

.cp .showcase { display:grid; grid-template-columns:minmax(220px,1fr) 1.35fr; gap:26px; align-items:center; }
.cp .specs { display:flex; flex-wrap:wrap; gap:10px; margin-top:18px; }
.cp .spec { display:flex; align-items:center; gap:8px; background:#fff; border:1px solid var(--line);
  border-radius:12px; padding:10px 14px; font-size:13px; font-weight:600; color:var(--g); }
.cp .showcase-img { width:100%; height:300px; object-fit:cover; border-radius:18px; box-shadow:0 18px 40px rgba(15,61,46,.14); }

.cp .availability { background:linear-gradient(160deg,var(--g),var(--g2)); color:#fff; border-radius:18px; padding:22px; }
.cp .availability h3 { font-size:1.15rem; margin:0 0 16px; font-weight:700; }
.cp .field { display:flex; flex-direction:column; gap:6px; margin-bottom:14px; }
.cp .field label { font-size:12px; opacity:.85; font-weight:600; }
.cp .field input, .cp .field select { padding:11px 13px; border:none; border-radius:10px; font-size:15px;
  font-family:inherit; background:#fff; color:#283a31; width:100%; box-sizing:border-box; }
.cp .avail-btn { width:100%; background:var(--gold); color:#3a2f12; border:none; border-radius:10px;
  padding:13px; font-size:15px; font-weight:800; cursor:pointer; margin-top:4px; transition:filter .2s; }
.cp .avail-btn:hover { filter:brightness(1.06); }
.cp .avail-hint { font-size:12px; color:#ffd9d2; margin-top:8px; }

.cp .sec-head { display:flex; align-items:center; justify-content:space-between; gap:12px;
  padding:18px 22px; border-bottom:1px solid var(--line); }
.cp .sec-head .t { display:flex; align-items:center; gap:10px; font-weight:800; color:var(--g); font-size:1.05rem; }
.cp .sec-head .sub { font-size:12px; color:var(--muted); font-weight:600; }
.cp .sec-head .dates { font-size:13px; color:var(--muted); font-weight:700; }

.cp table { width:100%; border-collapse:collapse; }
.cp thead th { background:linear-gradient(135deg,var(--g),var(--g2)); color:#fff; font-weight:600;
  font-size:.85rem; letter-spacing:.4px; padding:14px; text-align:center; }
.cp thead th:first-child { text-align:left; padding-left:22px; }
.cp tbody td { padding:15px 14px; text-align:center; font-size:.95rem; border-bottom:1px solid var(--line); }
.cp tbody td:first-child { text-align:left; padding-left:22px; font-weight:700; color:var(--g); }
.cp tbody tr { cursor:pointer; transition:background .15s; }
.cp tbody tr:hover { background:#f5f9f5; }
.cp tbody tr.active { background:#eaf3ea; }
.cp tbody tr.active td:first-child { box-shadow:inset 4px 0 0 var(--gold); }
.cp tbody tr.active td { color:var(--g); font-weight:700; }
.cp .legend { padding:14px 22px; font-size:12.5px; color:var(--muted); display:flex; gap:18px; flex-wrap:wrap; }
.cp .legend b { color:var(--g); }

.cp .summary { padding:22px; }
.cp .summary h3 { margin:0 0 16px; color:var(--g); font-size:1.1rem; font-weight:800; }
.cp .srow { display:flex; justify-content:space-between; gap:12px; font-size:.92rem; padding:7px 0; color:var(--ink); }
.cp .srow .lbl small { display:block; color:var(--muted); font-size:11px; }
.cp .stotal { display:flex; justify-content:space-between; align-items:center; margin-top:10px; padding-top:14px;
  border-top:1px dashed var(--line); }
.cp .stotal .amt { font-size:1.5rem; font-weight:900; color:var(--g); }
.cp .plan-pills { display:flex; gap:8px; margin-bottom:16px; }
.cp .plan-pill { flex:1; text-align:center; padding:8px; border-radius:9px; border:1.5px solid var(--line);
  background:#fff; font-weight:700; font-size:13px; color:var(--g); cursor:pointer; transition:all .2s; }
.cp .plan-pill.on { background:var(--g); color:#fff; border-color:var(--g); }
.cp .book-btn { width:100%; background:var(--g); color:#fff; border:none; border-radius:11px; padding:14px;
  font-weight:800; font-size:1rem; cursor:pointer; margin-top:14px; transition:background .2s; }
.cp .book-btn:hover { background:var(--g2); }
.cp .cancel-note { display:flex; align-items:center; gap:7px; justify-content:center; margin-top:10px;
  font-size:12px; color:#1d8a4e; font-weight:600; }

.cp .mini-card { padding:20px 22px; }
.cp .mini-card h4 { margin:0 0 14px; color:var(--g); font-weight:800; font-size:1rem; }
.cp .why-row { display:flex; align-items:center; gap:12px; padding:8px 0; font-size:.9rem; color:var(--ink); }
.cp .why-row span.ic { width:30px; height:30px; border-radius:50%; background:#eef4ee; display:flex;
  align-items:center; justify-content:center; font-size:15px; flex-shrink:0; }
.cp .help-row { display:flex; align-items:center; gap:12px; padding:8px 0; font-size:.88rem; }
.cp .help-row .ic { font-size:18px; }
.cp .help-row b { color:var(--g); display:block; }
.cp .help-row .muted { color:var(--muted); font-size:12px; }

.cp .bottom { display:grid; grid-template-columns:1fr 1fr; gap:26px; }
.cp .amen-grid { display:grid; grid-template-columns:1fr 1fr; gap:12px 18px; padding:6px 0 0; }
.cp .amen { display:flex; align-items:center; gap:9px; font-size:.9rem; color:var(--ink); }
.cp .amen .tick { color:#1d8a4e; font-weight:800; }
.cp .gal-grid { display:grid; grid-template-columns:1fr 1fr 1fr; gap:10px; padding:6px 0 0; }
.cp .gal-grid img { width:100%; height:90px; object-fit:cover; border-radius:10px; }

.cp .acceptbar { margin-top:30px; background:#fff; border:1px solid var(--line); border-radius:16px;
  display:flex; flex-wrap:wrap; gap:24px; align-items:center; justify-content:space-between; padding:18px 24px; }
.cp .ab-item { display:flex; align-items:center; gap:10px; font-size:13px; color:var(--ink); }
.cp .ab-item .ic { font-size:18px; }
.cp .ab-item b { display:block; color:var(--g); }
.cp .ab-pays { display:flex; gap:8px; align-items:center; }
.cp .pay { font-size:11px; font-weight:800; padding:5px 9px; border-radius:6px; border:1px solid var(--line); color:var(--g); }

@media (max-width: 960px) {
  .cp .main { grid-template-columns:1fr; }
  .cp .side { position:static; }
  .cp .showcase { grid-template-columns:1fr; }
  .cp .showcase-img { height:240px; }
}
@media (max-width: 560px) {
  .cp .bottom { grid-template-columns:1fr; }
  .cp .table-scroll { overflow-x:auto; }
  .cp table { min-width:520px; }
}
`;

/* ---------- PAGE ---------- */
const RoomDetail = () => {
  const { roomId } = useParams();
  const today = todayStr();
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [selectedRoomId, setSelectedRoomId] = useState(() => {
    const id = Number(roomId);
    return allRooms.some((r) => r.id === id) ? id : allRooms[0].id;
  });
  const [planType, setPlanType] = useState("CP");
  const [guests, setGuests] = useState(2);
  const [booking, setBooking] = useState(null);
  const [hint, setHint] = useState("");
  const availRef = useRef(null);
  const summaryRef = useRef(null);

  const minCheckOut = checkIn ? addDays(checkIn, 1) : today;
  const seasonKey = checkIn ? getSeason(parseDate(checkIn)) : getSeason(new Date());
  const seasonMeta = SEASON_META.find((s) => s.key === seasonKey);
  const nights = nightsBetween(checkIn, checkOut) || 1;

  const room = allRooms.find((r) => r.id === selectedRoomId);
  const plan = room.plans.find((p) => p.type === planType);
  const nightly = plan.prices[seasonKey];
  const subtotal = nightly * nights;
  const taxes = Math.round(subtotal * TAX_RATE);
  const total = subtotal + taxes;

  const dateRange = checkIn && checkOut ? `${fmtShort(checkIn)} – ${fmtShort(checkOut)}` : seasonMeta.period;

  const checkAvailability = () => {
    if (!checkIn || !checkOut) {
      setHint("Please pick your check-in and check-out dates.");
      return;
    }
    setHint("");
    summaryRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
  };

  const openBooking = () => {
    if (!checkIn || !checkOut) {
      setHint("Please select your dates first.");
      availRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
      return;
    }
    setBooking({
      roomName: room.name,
      planName: plan.name,
      season: seasonMeta.label,
      checkIn, checkOut, nights, nightly, total,
    });
  };

  return (
    <main className="cp">
      <style>{CSS}</style>
      <div className="wrap">
        <Link to="/rooms" style={{ display: "inline-flex", alignItems: "center", gap: "6px", color: "#0f3d2e", fontWeight: 700, textDecoration: "none", marginBottom: "18px", fontSize: "14px" }}>← Back to all rooms</Link>
        <div className="main">
          {/* LEFT COLUMN */}
          <div className="leftcol">
            {/* SHOWCASE */}
            <div className="showcase">
              <div>
                <div className="eyebrow">Premium Stay</div>
                <h1 className="room-name">{room.name}</h1>
                <p className="room-desc">{room.description}</p>
                <div className="specs">
                  <div className="spec">👥 {room.guests} Guests</div>
                  <div className="spec">🛏️ {room.bed}</div>
                  <div className="spec">📐 {room.size}</div>
                  <div className="spec">📶 Free WiFi</div>
                </div>
              </div>
              <img className="showcase-img" src={room.image} alt={room.name} />
            </div>

            {/* RATES */}
            <div className="card" ref={availRef}>
              <div className="sec-head">
                <div className="t">🛏️ Room Rates <span className="sub">(Per Room Per Night)</span></div>
                <div className="dates">{dateRange}</div>
              </div>
              <div className="table-scroll">
                <table>
                  <thead>
                    <tr><th>Category</th><th>CP</th><th>MAP</th><th>AP</th></tr>
                  </thead>
                  <tbody>
                    {allRooms.map((r) => (
                      <tr key={r.id} className={r.id === selectedRoomId ? "active" : ""} onClick={() => setSelectedRoomId(r.id)}>
                        <td>{r.name}<br /><small style={{ color: "#6f7d73", fontWeight: 500 }}>👥 {r.guests}</small></td>
                        <td>₹{priceOf(r, "CP", seasonKey).toLocaleString()}</td>
                        <td>₹{priceOf(r, "MAP", seasonKey).toLocaleString()}</td>
                        <td>₹{priceOf(r, "AP", seasonKey).toLocaleString()}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="legend">
                <span><b>CP</b> — Room Only</span>
                <span><b>MAP</b> — Breakfast & Dinner</span>
                <span><b>AP</b> — All Meals</span>
              </div>
            </div>

            {/* AMENITIES + GALLERY */}
            <div className="bottom">
              <div className="card mini-card">
                <h4>Room Amenities</h4>
                <div className="amen-grid">
                  {AMENITIES.map((a) => (
                    <div className="amen" key={a}><span className="tick">✓</span>{a}</div>
                  ))}
                </div>
              </div>
              <div className="card mini-card">
                <h4>Room Gallery</h4>
                <div className="gal-grid">
                  {GALLERY.map((src, i) => <img key={i} src={src} alt={`Gallery ${i + 1}`} />)}
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT SIDEBAR */}
          <div className="side">
            {/* AVAILABILITY */}
            <div className="availability">
              <h3>Check Availability</h3>
              <div className="field">
                <label>Check-in</label>
                <input type="date" min={today} value={checkIn}
                  onChange={(e) => {
                    const val = e.target.value;
                    if (val && val < today) return;
                    setCheckIn(val);
                    if (checkOut && val && checkOut <= val) setCheckOut("");
                  }} />
              </div>
              <div className="field">
                <label>Check-out</label>
                <input type="date" min={minCheckOut} value={checkOut}
                  onChange={(e) => {
                    const val = e.target.value;
                    if (val && val < minCheckOut) return;
                    setCheckOut(val);
                  }} />
              </div>
              <div className="field">
                <label>Guests</label>
                <select value={guests} onChange={(e) => setGuests(Number(e.target.value))}>
                  {[1, 2, 3, 4, 5, 6].map((n) => <option key={n} value={n}>{n} {n === 1 ? "Adult" : "Adults"}</option>)}
                </select>
              </div>
              <button className="avail-btn" onClick={checkAvailability}>Check Availability</button>
              {hint && <div className="avail-hint">{hint}</div>}
            </div>

            {/* STAY SUMMARY */}
            <div className="card summary" ref={summaryRef}>
              <h3>Your Stay Summary</h3>
              <div className="plan-pills">
                {PLAN_TYPES.map((t) => (
                  <div key={t} className={`plan-pill ${planType === t ? "on" : ""}`} onClick={() => setPlanType(t)}>{t}</div>
                ))}
              </div>
              <div className="srow"><span className="lbl">{room.name} <small>{plan.name} · {seasonMeta.label}</small></span><strong>₹{nightly.toLocaleString()}</strong></div>
              <div className="srow"><span className="lbl">1 Room × {nights} Night{nights > 1 ? "s" : ""}</span><span>₹{subtotal.toLocaleString()}</span></div>
              <div className="srow"><span className="lbl">Taxes & Charges <small>{Math.round(TAX_RATE * 100)}% GST</small></span><span>₹{taxes.toLocaleString()}</span></div>
              <div className="stotal"><strong>Total</strong><span className="amt">₹{total.toLocaleString()}</span></div>
              <button className="book-btn" onClick={openBooking}>Book Now</button>
              <div className="cancel-note">✓ Free cancellation up to 48 hrs</div>
            </div>

            {/* WHY BOOK */}
            <div className="card mini-card">
              <h4>Why Book With Us?</h4>
              {WHY_BOOK.map(([ic, t]) => (
                <div className="why-row" key={t}><span className="ic">{ic}</span>{t}</div>
              ))}
            </div>

            {/* NEED HELP */}
            <div className="card mini-card">
              <h4>Need Help?</h4>
              <div className="help-row"><span className="ic">📞</span><div><span className="muted">Call us anytime</span><b>{HOTEL_PHONE}</b></div></div>
              <div className="help-row"><span className="ic">✉️</span><div><span className="muted">Email us</span><b>{HOTEL_EMAIL}</b></div></div>
            </div>
          </div>
        </div>

        {/* PAYMENTS / INFO BAR */}
        <div className="acceptbar">
          <div className="ab-item"><span className="ic">📍</span><div><b>Our Location</b>{HOTEL_LOCATION}</div></div>
          <div className="ab-item"><span className="ic">🕒</span><div><b>Check-in / Check-out</b>Check-in: {CHECK_IN_TIME} · Check-out: {CHECK_OUT_TIME}</div></div>
          <div className="ab-item"><div><b>We Accept</b><div className="ab-pays"><span className="pay">VISA</span><span className="pay">MASTERCARD</span><span className="pay">UPI</span></div></div></div>
        </div>
      </div>

      <CTASection />

      {booking && <BookingModal booking={booking} onClose={() => setBooking(null)} />}
    </main>
  );
};

export default RoomDetail;

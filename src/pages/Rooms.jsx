import React, { useState, useRef } from "react";
import { useParams, Link } from "react-router-dom";
import {
  Users, BedDouble, Maximize, Wifi, ChevronLeft, ChevronRight,
  Calendar, Check, ShieldCheck, RotateCcw, Lock, Coffee, Crown,
  Phone, Mail, MapPin, Clock,
} from "lucide-react";
import CTASection from "../components/CTASection";

/* ---------------- HOTEL CONFIG — EDIT THESE ---------------- */
const HOTEL_WHATSAPP = "919411197491"; // country code + number, no "+"
const HOTEL_NAME = "Corbett Phoenix";
const HOTEL_PHONE = "+91 92118 02202";
const HOTEL_EMAIL = "corbettphoenix@mmthotels.com";
const HOTEL_HOURS = "10 AM – 7 PM";
const HOTEL_LOCATION = "Awala Khot, Kotabagh · near Jim Corbett National Park, Uttarakhand";
const CHECK_IN_TIME = "12:00 PM";
const CHECK_OUT_TIME = "11:00 AM";
const TAX_RATE = 0.12; // 12% GST

/* ---------------- DATE / SEASON HELPERS ---------------- */
const parseDate = (str) => { const [y, m, d] = str.split("-").map(Number); return new Date(y, m - 1, d); };
const todayStr = () => { const d = new Date(); return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`; };
const addDays = (str, n) => { const d = parseDate(str); d.setDate(d.getDate() + n); return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`; };
const getSeason = (date) => {
  const m = date.getMonth(), day = date.getDate();
  const afterJun16 = m > 5 || (m === 5 && day >= 16);
  const beforeOct15 = m < 9 || (m === 9 && day <= 14);
  return afterJun16 && beforeOct15 ? "peak" : "off";
};
const nightsBetween = (ci, co) => { if (!ci || !co) return 0; const n = Math.round((parseDate(co) - parseDate(ci)) / 86400000); return n > 0 ? n : 0; };
const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const fmtShort = (str) => { if (!str) return "—"; const d = parseDate(str); return `${d.getDate()} ${MONTHS[d.getMonth()]} ${d.getFullYear()}`; };

/* ---------------- SINGLE SOURCE OF TRUTH ---------------- */
const allRooms = [
  {
    id: 1, name: "Standard Room", eyebrow: "Cosy Retreat",
    description: "AC single bedrooms — private, comfortable, and cool, with all the essentials for a restful stay near the forest.",
    image: "https://github.com/Aegis76/Corbett-Phoenix/blob/main/public/IMG-20260618-WA0015.jpg?raw=true",
    guests: 2, bed: "1 Queen Bed", size: "150 sq ft",
    plans: [
      { id: "d1", type: "CP", name: "CP Plan", inclusions: ["Free WiFi", "AC", "TV", "Electric Kettle"], cancellation: "Non-Refundable", prices: { peak: 1500, off: 700 } },
      { id: "d2", type: "MAP", name: "MAP Plan", inclusions: ["Breakfast & Dinner", "Free WiFi", "AC", "TV"], cancellation: "Free cancellation before 48 hours", prices: { peak: 2000, off: 1200 } },
      { id: "d3", type: "AP", name: "AP Plan", inclusions: ["All Meals", "Free WiFi", "AC", "TV"], cancellation: "Free cancellation before 48 hours", prices: { peak: 2500, off: 1700 } },
    ],
  },
  {
    id: 2, name: "Deluxe Room", eyebrow: "Forest View",
    description: "Spacious comfort with a private balcony overlooking the forest — elegant interiors, serene views, and modern amenities.",
    image: "https://github.com/Aegis76/Corbett-Phoenix/blob/main/public/IMG-20260618-WA0017.jpg?raw=true",
    guests: 2, bed: "1 King Bed", size: "220 sq ft",
    plans: [
      { id: "p1", type: "CP", name: "CP Plan", inclusions: ["Forest View", "Free WiFi", "AC", "TV"], cancellation: "Non-Refundable", prices: { peak: 2500, off: 1500 } },
      { id: "p2", type: "MAP", name: "MAP Plan", inclusions: ["Breakfast & Dinner", "Forest View", "Free WiFi"], cancellation: "Free cancellation before 48 hours", prices: { peak: 3000, off: 2000 } },
      { id: "p3", type: "AP", name: "AP Plan", inclusions: ["All Meals", "Forest View", "Free WiFi"], cancellation: "Free cancellation before 48 hours", prices: { peak: 3500, off: 2500 } },
    ],
  },
  {
    id: 3, name: "Family Suite", eyebrow: "Space For Everyone",
    description: "Ideal for families — spacious rooms with a shared living area and room for everyone to unwind after a day in the wild.",
    image: "https://github.com/Aegis76/Corbett-Phoenix/blob/main/public/IMG-20260618-WA0014.jpg?raw=true",
    guests: 4, bed: "2 Bedrooms", size: "420 sq ft",
    plans: [
      { id: "f1", type: "CP", name: "CP Plan", inclusions: ["2 Bedrooms", "Living Area", "Free WiFi", "AC"], cancellation: "Non-Refundable", prices: { peak: 5000, off: 3000 } },
      { id: "f2", type: "MAP", name: "MAP Plan", inclusions: ["Breakfast & Dinner", "2 Bedrooms", "Living Area"], cancellation: "Free cancellation before 48 hours", prices: { peak: 6000, off: 4000 } },
      { id: "f3", type: "AP", name: "AP Plan", inclusions: ["All Meals", "2 Bedrooms", "Living Area"], cancellation: "Free cancellation before 48 hours", prices: { peak: 7000, off: 5000 } },
    ],
  },
];

const SEASON_META = { peak: "Peak Season", off: "Off Season" };
const PLAN_TYPES = ["CP", "MAP", "AP"];
const PLAN_DESC = { CP: "Room Only", MAP: "Breakfast & Dinner", AP: "All Meals" };
const AMENITIES = ["Air Conditioning", "Private Bathroom", "LED TV", "24×7 Hot Water", "Free WiFi", "Room Service", "Tea/Coffee Maker", "Wardrobe"];
const TRUST = [
  [ShieldCheck, "Best Rate Guarantee", "Find a lower price? We'll match it."],
  [RotateCcw, "Free Cancellation", "Cancel up to 48 hours before check-in."],
  [Lock, "Secure Booking", "Your details stay private and protected."],
];
const PERKS = [
  [ShieldCheck, "Best Price Guarantee"],
  [RotateCcw, "Free Cancellation"],
  [Coffee, "Complimentary Breakfast"],
  [Crown, "Exclusive Member Benefits"],
];

/* ---------------- BOOKING MODAL ---------------- */
const ov = { position: "fixed", inset: 0, background: "rgba(10,25,18,0.55)", backdropFilter: "blur(3px)", display: "flex", alignItems: "flex-start", justifyContent: "center", padding: "40px 16px", zIndex: 1000, overflowY: "auto" };
const md = { background: "#fff", borderRadius: "20px", width: "100%", maxWidth: "520px", overflow: "hidden", boxShadow: "0 30px 70px rgba(0,0,0,0.35)" };
const mh = { background: "linear-gradient(135deg,#0f3d2e,#1f5340)", color: "#fff", padding: "24px 28px", position: "relative" };
const mb = { padding: "26px 28px 30px" };
const sumBox = { background: "rgba(15,61,46,0.05)", border: "1px solid rgba(15,61,46,0.1)", borderRadius: "12px", padding: "16px 18px", marginBottom: "22px", fontSize: "0.9rem", color: "#0f3d2e", display: "grid", gap: "8px" };
const sumRow = { display: "flex", justifyContent: "space-between", gap: "12px" };
const fld = { display: "flex", flexDirection: "column", gap: "6px", marginBottom: "16px" };
const inp = { padding: "11px 14px", border: "1px solid #ccc", borderRadius: "10px", fontSize: "1rem", width: "100%", boxSizing: "border-box" };
const lbl = { fontSize: "0.85rem", fontWeight: 600, color: "#0f3d2e" };
const subBtn = { width: "100%", background: "linear-gradient(135deg,#128C7E,#25D366)", color: "#fff", border: "none", padding: "14px", borderRadius: "12px", fontSize: "1rem", fontWeight: 700, cursor: "pointer", marginTop: "6px" };
const payNote = { display: "flex", alignItems: "center", gap: "8px", background: "rgba(22,163,74,0.08)", border: "1px solid rgba(22,163,74,0.25)", color: "#15803d", padding: "10px 14px", borderRadius: "10px", fontSize: "0.85rem", marginBottom: "18px", fontWeight: 600 };
const errS = { color: "#c0392b", fontSize: "0.85rem", marginBottom: "12px", fontWeight: 600 };
const closeX = { position: "absolute", top: "16px", right: "18px", background: "rgba(255,255,255,0.15)", border: "none", color: "#fff", width: "30px", height: "30px", borderRadius: "50%", cursor: "pointer", fontSize: "1.2rem", lineHeight: 1 };

const BookingModal = ({ booking, onClose }) => {
  const [form, setForm] = useState({ name: "", email: "", phone: "", guests: booking.guests || 1, agree: false });
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
    const win = window.open(`https://wa.me/${HOTEL_WHATSAPP}?text=${encodeURIComponent(msg)}`, "_blank");
    setStatus(win ? "success" : "error");
  };

  return (
    <div style={ov} onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div style={md}>
        <div style={mh}>
          <button style={closeX} onClick={onClose} aria-label="Close">×</button>
          <div style={{ fontSize: "0.78rem", opacity: 0.85, letterSpacing: "0.6px" }}>COMPLETE YOUR BOOKING</div>
          <div style={{ fontSize: "1.3rem", fontWeight: 700, marginTop: "4px" }}>{booking.roomName}</div>
          <div style={{ fontSize: "0.9rem", opacity: 0.9 }}>{booking.planName} · {booking.season}</div>
        </div>
        <div style={mb}>
          {status === "success" ? (
            <div style={{ textAlign: "center", padding: "20px 0" }}>
              <div style={{ fontSize: "2.4rem", marginBottom: "10px", color: "#25D366" }}>✓</div>
              <h3 style={{ color: "#0f3d2e", marginBottom: "8px" }}>Almost done!</h3>
              <p style={{ color: "#5a6b62", fontSize: "0.92rem", lineHeight: 1.6 }}>
                Your booking details are ready in WhatsApp — just press <strong>send</strong> there to confirm with the resort. Payment is collected at the property.
              </p>
              <button style={{ ...subBtn, marginTop: "20px" }} onClick={onClose}>Done</button>
            </div>
          ) : (
            <>
              <div style={sumBox}>
                <div style={sumRow}><span>Check-in</span><strong>{booking.checkIn}</strong></div>
                <div style={sumRow}><span>Check-out</span><strong>{booking.checkOut}</strong></div>
                <div style={sumRow}><span>Nights</span><strong>{booking.nights}</strong></div>
                <div style={sumRow}><span>Rate / night</span><strong>₹{booking.nightly.toLocaleString()}</strong></div>
                <div style={{ ...sumRow, borderTop: "1px solid rgba(15,61,46,0.15)", paddingTop: "8px", fontSize: "1.05rem" }}>
                  <span style={{ fontWeight: 700 }}>Total</span><strong>₹{booking.total.toLocaleString()}</strong>
                </div>
              </div>
              <div style={fld}><label style={lbl}>Full name</label><input style={inp} value={form.name} onChange={(e) => set("name", e.target.value)} placeholder="Your name" /></div>
              <div style={fld}><label style={lbl}>Email</label><input style={inp} type="email" value={form.email} onChange={(e) => set("email", e.target.value)} placeholder="you@example.com" /></div>
              <div style={fld}><label style={lbl}>Phone</label><input style={inp} type="tel" value={form.phone} onChange={(e) => set("phone", e.target.value)} placeholder="+91 …" /></div>
              <div style={fld}><label style={lbl}>Number of guests</label><input style={inp} type="number" min="1" value={form.guests} onChange={(e) => set("guests", e.target.value)} /></div>
              <div style={payNote}>● Payment method: Pay at Property</div>
              <label style={{ display: "flex", gap: "10px", alignItems: "flex-start", fontSize: "0.85rem", color: "#5a6b62", marginBottom: "18px", cursor: "pointer" }}>
                <input type="checkbox" checked={form.agree} onChange={(e) => set("agree", e.target.checked)} style={{ marginTop: "3px" }} />
                <span>I agree to the <a href="/privacy-policy" target="_blank" rel="noreferrer" style={{ color: "#0f3d2e", fontWeight: 600 }}>privacy policy</a> and booking terms.</span>
              </label>
              {err && <div style={errS}>{err}</div>}
              {status === "error" && <div style={errS}>Couldn't open WhatsApp. Please allow popups, or message the resort directly.</div>}
              <button style={subBtn} onClick={submit}>Confirm Booking via WhatsApp</button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

/* ---------------- SCOPED PAGE CSS ---------------- */
const CSS = `
.rdp{ --g:#0f3d2e; --g2:#1f5340; --gold:#c4a962; --cream:#f3f1ea; --card:#fff;
  --ink:#283a31; --muted:#6f7d73; --line:rgba(15,61,46,.10);
  --serif:'Fraunces','Playfair Display',Georgia,serif; background:var(--cream); color:var(--ink); }
.rdp .wrap{max-width:1180px;margin:0 auto;padding:0 20px;}

/* HERO */
.rdp .hero{position:relative;color:#fff;overflow:hidden;background:#0b2c20;}
.rdp .hero::before{content:"";position:absolute;inset:0;
  background:linear-gradient(90deg,rgba(8,28,20,.95) 0%,rgba(8,28,20,.78) 42%,rgba(8,28,20,.28) 100%),var(--heroimg) center/cover no-repeat;}
.rdp .hero-inner{position:relative;max-width:1180px;margin:0 auto;padding:46px 20px 92px;}
.rdp .crumb{display:flex;align-items:center;gap:8px;font-size:12px;letter-spacing:1.4px;text-transform:uppercase;
  color:rgba(255,255,255,.72);font-weight:600;margin-bottom:20px;}
.rdp .crumb a{color:rgba(255,255,255,.72);text-decoration:none;}
.rdp .crumb a:hover{color:#fff;}
.rdp .crumb .here{color:var(--gold);}
.rdp .eyebrow{display:flex;align-items:center;gap:10px;color:var(--gold);font-weight:700;letter-spacing:2px;
  text-transform:uppercase;font-size:12px;margin-bottom:10px;}
.rdp .eyebrow .ln{height:1px;width:30px;background:var(--gold);}
.rdp .hero h1{font-family:var(--serif);font-weight:700;font-size:clamp(2.2rem,5vw,3.4rem);line-height:1.06;margin:0 0 14px;}
.rdp .hero p{max-width:520px;line-height:1.7;color:rgba(255,255,255,.85);margin:0 0 18px;}
.rdp .hero-specs{display:flex;flex-wrap:wrap;gap:10px;}
.rdp .hspec{display:flex;align-items:center;gap:7px;background:rgba(255,255,255,.1);border:1px solid rgba(255,255,255,.18);
  border-radius:10px;padding:8px 13px;font-size:13px;font-weight:600;}
.rdp .hspec svg{color:var(--gold);}

/* BOOKING STRIP (overlaps hero) */
.rdp .bookbar-wrap{position:relative;z-index:5;max-width:1140px;margin:-58px auto 0;padding:0 20px;}
.rdp .bookbar{background:var(--card);border:1px solid var(--line);border-radius:16px;
  box-shadow:0 22px 50px rgba(15,61,46,.16);display:grid;grid-template-columns:1fr 1fr 1fr auto;gap:0;overflow:hidden;}
.rdp .bb-cell{display:flex;align-items:center;gap:12px;padding:18px 20px;border-right:1px solid var(--line);}
.rdp .bb-cell svg.lead{color:var(--gold);flex-shrink:0;}
.rdp .bb-cell .bl{font-size:11px;letter-spacing:1px;text-transform:uppercase;color:var(--muted);font-weight:700;display:block;margin-bottom:3px;}
.rdp .bb-cell input,.rdp .bb-cell select{appearance:none;-webkit-appearance:none;border:none;background:transparent;
  font-family:inherit;font-size:.95rem;font-weight:700;color:var(--g);width:100%;outline:none;cursor:pointer;padding:0;}
.rdp .bb-go{display:flex;align-items:stretch;}
.rdp .bb-go button{background:var(--g);color:#fff;border:none;padding:0 30px;font-family:inherit;font-weight:800;
  letter-spacing:.6px;font-size:.9rem;text-transform:uppercase;cursor:pointer;transition:background .2s;white-space:nowrap;}
.rdp .bb-go button:hover{background:var(--g2);}
.rdp .bb-hint{max-width:1140px;margin:10px auto 0;padding:0 20px;color:#b23b2e;font-size:13px;font-weight:600;}

/* BODY */
.rdp .body{display:grid;grid-template-columns:1fr 360px;gap:30px;align-items:start;padding:48px 0 20px;}
.rdp .left{min-width:0;display:flex;flex-direction:column;gap:28px;}
.rdp .side{position:sticky;top:24px;display:flex;flex-direction:column;gap:20px;}
.rdp .card{background:var(--card);border:1px solid var(--line);border-radius:18px;}
.rdp .sec-title{font-family:var(--serif);font-size:1.5rem;color:var(--g);font-weight:700;margin:0 0 4px;}
.rdp .sec-sub{color:var(--muted);font-size:.92rem;margin:0 0 20px;}

/* PLAN CARDS */
.rdp .plans{display:flex;flex-direction:column;gap:14px;}
.rdp .plan{display:grid;grid-template-columns:24px 1fr auto;gap:14px;align-items:center;
  border:1.5px solid var(--line);border-radius:14px;padding:16px 18px;cursor:pointer;transition:all .2s;background:#fff;}
.rdp .plan:hover{border-color:rgba(196,169,98,.6);}
.rdp .plan.on{border-color:var(--g);background:#f4f8f4;box-shadow:0 0 0 1px var(--g);}
.rdp .radio{width:20px;height:20px;border-radius:50%;border:2px solid var(--line);display:flex;align-items:center;justify-content:center;}
.rdp .plan.on .radio{border-color:var(--g);}
.rdp .plan.on .radio::after{content:"";width:10px;height:10px;border-radius:50%;background:var(--g);}
.rdp .plan .pname{font-weight:800;color:var(--g);font-size:1rem;}
.rdp .plan .pdesc{font-size:12.5px;color:var(--muted);margin-top:2px;}
.rdp .plan .pinc{font-size:12px;color:var(--muted);margin-top:7px;display:flex;flex-wrap:wrap;gap:6px;}
.rdp .plan .pinc span{background:#eef3ee;border-radius:6px;padding:3px 8px;color:var(--g);font-weight:600;}
.rdp .plan .pprice{text-align:right;}
.rdp .plan .pprice b{font-family:var(--serif);font-size:1.3rem;color:var(--g);}
.rdp .plan .pprice small{display:block;font-size:11px;color:var(--muted);font-weight:600;}
.rdp .plan .cancel{font-size:11px;color:#1d8a4e;font-weight:600;margin-top:6px;}

/* AMENITIES + GALLERY */
.rdp .bottom{display:grid;grid-template-columns:1fr 1fr;gap:28px;}
.rdp .pad{padding:24px;}
.rdp .amen-grid{display:grid;grid-template-columns:1fr 1fr;gap:12px 18px;}
.rdp .amen{display:flex;align-items:center;gap:9px;font-size:.9rem;color:var(--ink);}
.rdp .amen svg{color:#1d8a4e;flex-shrink:0;}
.rdp .gal{display:grid;grid-template-columns:1fr 1fr;gap:10px;}
.rdp .gal img{width:100%;height:108px;object-fit:cover;border-radius:10px;}
.rdp .gal img:first-child{grid-column:1/-1;height:150px;}

/* SUMMARY CARD */
.rdp .summary{padding:24px;}
.rdp .summary h3{font-family:var(--serif);color:var(--g);font-size:1.25rem;margin:0 0 16px;font-weight:700;}
.rdp .pills{display:flex;gap:8px;margin-bottom:18px;}
.rdp .pill{flex:1;text-align:center;padding:9px 0;border-radius:10px;border:1.5px solid var(--line);background:#fff;
  font-weight:800;font-size:13px;color:var(--g);cursor:pointer;transition:all .2s;}
.rdp .pill.on{background:var(--g);color:#fff;border-color:var(--g);}
.rdp .srow{display:flex;justify-content:space-between;gap:12px;font-size:.92rem;padding:7px 0;color:var(--ink);}
.rdp .srow small{display:block;color:var(--muted);font-size:11px;}
.rdp .stotal{display:flex;justify-content:space-between;align-items:center;margin-top:10px;padding-top:14px;border-top:1px dashed var(--line);}
.rdp .stotal .amt{font-family:var(--serif);font-size:1.6rem;font-weight:800;color:var(--g);}
.rdp .book-btn{width:100%;background:var(--g);color:#fff;border:none;border-radius:12px;padding:15px;
  font-weight:800;font-size:1rem;letter-spacing:.5px;cursor:pointer;margin-top:16px;transition:background .2s;}
.rdp .book-btn:hover{background:var(--g2);}

/* TRUST CARD */
.rdp .trust{padding:22px 24px;}
.rdp .trow{display:flex;align-items:flex-start;gap:13px;padding:11px 0;border-bottom:1px solid var(--line);}
.rdp .trow:last-child{border-bottom:none;}
.rdp .trow .ic{width:38px;height:38px;border-radius:10px;background:#eef4ee;display:flex;align-items:center;justify-content:center;flex-shrink:0;}
.rdp .trow .ic svg{color:var(--g);}
.rdp .trow b{display:block;color:var(--g);font-size:.92rem;}
.rdp .trow span{font-size:12.5px;color:var(--muted);}

/* PERKS STRIP */
.rdp .perks{border-top:1px solid var(--line);background:#fbfaf6;}
.rdp .perks-inner{max-width:1180px;margin:0 auto;padding:24px 20px;display:grid;grid-template-columns:repeat(4,1fr);gap:18px;}
.rdp .perk{display:flex;align-items:center;gap:12px;}
.rdp .perk svg{color:var(--gold);flex-shrink:0;}
.rdp .perk b{color:var(--g);font-size:.92rem;font-weight:700;}

/* HELP BAR */
.rdp .helpbar{max-width:1180px;margin:0 auto;padding:22px 20px 40px;display:grid;grid-template-columns:repeat(4,1fr);gap:20px;}
.rdp .hb{display:flex;align-items:flex-start;gap:12px;}
.rdp .hb .ic{color:var(--gold);flex-shrink:0;}
.rdp .hb b{display:block;color:var(--g);font-size:.92rem;}
.rdp .hb span{font-size:13px;color:var(--muted);}

/* RESPONSIVE */
@media (max-width:980px){
  .rdp .body{grid-template-columns:1fr;}
  .rdp .side{position:static;}
  .rdp .bookbar{grid-template-columns:1fr 1fr;}
  .rdp .bb-cell:nth-child(2){border-right:none;}
  .rdp .bb-cell:nth-child(1),.rdp .bb-cell:nth-child(2){border-bottom:1px solid var(--line);}
  .rdp .bb-go{grid-column:1/-1;}
  .rdp .bb-go button{width:100%;padding:15px;}
  .rdp .perks-inner{grid-template-columns:repeat(2,1fr);}
  .rdp .helpbar{grid-template-columns:repeat(2,1fr);}
}
@media (max-width:560px){
  .rdp .bottom{grid-template-columns:1fr;}
  .rdp .bookbar{grid-template-columns:1fr;}
  .rdp .bb-cell{border-right:none;border-bottom:1px solid var(--line);}
  .rdp .amen-grid{grid-template-columns:1fr;}
  .rdp .perks-inner,.rdp .helpbar{grid-template-columns:1fr;}
}
`;

/* ---------------- PAGE ---------------- */
const RoomDetail = () => {
  const { roomId } = useParams();
  const today = todayStr();
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [guests, setGuests] = useState(2);
  const [planType, setPlanType] = useState("CP");
  const [booking, setBooking] = useState(null);
  const [hint, setHint] = useState("");
  const bookbarRef = useRef(null);
  const summaryRef = useRef(null);

  const room = allRooms.find((r) => r.id === Number(roomId)) || allRooms[0];
  const minCheckOut = checkIn ? addDays(checkIn, 1) : today;
  const seasonKey = checkIn ? getSeason(parseDate(checkIn)) : getSeason(new Date());
  const seasonLabel = SEASON_META[seasonKey];
  const nights = nightsBetween(checkIn, checkOut) || 1;

  const plan = room.plans.find((p) => p.type === planType);
  const nightly = plan.prices[seasonKey];
  const subtotal = nightly * nights;
  const taxes = Math.round(subtotal * TAX_RATE);
  const total = subtotal + taxes;

  const checkAvailability = () => {
    if (!checkIn || !checkOut) { setHint("Please pick your check-in and check-out dates."); return; }
    setHint("");
    summaryRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
  };

  const openBooking = () => {
    if (!checkIn || !checkOut) {
      setHint("Please select your dates first.");
      bookbarRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
      return;
    }
    setBooking({
      roomName: room.name, planName: plan.name, season: seasonLabel,
      checkIn: fmtShort(checkIn), checkOut: fmtShort(checkOut),
      nights, nightly, total, guests,
    });
  };

  const heroStyle = { "--heroimg": `url('${room.image}')` };

  return (
    <main className="rdp" style={heroStyle}>
      <style>{CSS}</style>

      {/* HERO */}
      <header className="hero">
        <div className="hero-inner">
          <nav className="crumb" aria-label="Breadcrumb">
            <Link to="/">Home</Link><ChevronRight size={13} />
            <Link to="/rooms">Rooms &amp; Suites</Link><ChevronRight size={13} />
            <span className="here">{room.name}</span>
          </nav>
          <div className="eyebrow"><span className="ln" />{room.eyebrow}</div>
          <h1>{room.name}</h1>
          <p>{room.description}</p>
          <div className="hero-specs">
            <span className="hspec"><Users size={15} /> {room.guests} Guests</span>
            <span className="hspec"><BedDouble size={15} /> {room.bed}</span>
            <span className="hspec"><Maximize size={15} /> {room.size}</span>
            <span className="hspec"><Wifi size={15} /> Free WiFi</span>
          </div>
        </div>
      </header>

      {/* BOOKING STRIP */}
      <div className="bookbar-wrap" ref={bookbarRef}>
        <div className="bookbar">
          <div className="bb-cell">
            <Calendar className="lead" size={22} />
            <div style={{ width: "100%" }}>
              <span className="bl">Check-in</span>
              <input type="date" min={today} value={checkIn}
                onChange={(e) => { const v = e.target.value; if (v && v < today) return; setCheckIn(v); if (checkOut && v && checkOut <= v) setCheckOut(""); }} />
            </div>
          </div>
          <div className="bb-cell">
            <Calendar className="lead" size={22} />
            <div style={{ width: "100%" }}>
              <span className="bl">Check-out</span>
              <input type="date" min={minCheckOut} value={checkOut}
                onChange={(e) => { const v = e.target.value; if (v && v < minCheckOut) return; setCheckOut(v); }} />
            </div>
          </div>
          <div className="bb-cell">
            <Users className="lead" size={22} />
            <div style={{ width: "100%" }}>
              <span className="bl">Guests &amp; Rooms</span>
              <select value={guests} onChange={(e) => setGuests(Number(e.target.value))}>
                {[1, 2, 3, 4, 5, 6].map((n) => <option key={n} value={n}>{n} {n === 1 ? "Guest" : "Guests"}, 1 Room</option>)}
              </select>
            </div>
          </div>
          <div className="bb-go"><button onClick={checkAvailability}>Check Availability</button></div>
        </div>
        {hint && <div className="bb-hint">{hint}</div>}
      </div>

      {/* BODY */}
      <div className="wrap">
        <div className="body">
          {/* LEFT */}
          <div className="left">
            <div className="card pad">
              <h2 className="sec-title">Choose Your Plan</h2>
              <p className="sec-sub">
                {checkIn ? `${seasonLabel} rate · ${fmtShort(checkIn)} – ${fmtShort(checkOut)}` : `Showing ${seasonLabel} rates — select dates above to confirm.`}
              </p>
              <div className="plans">
                {room.plans.map((p) => (
                  <div key={p.id} className={`plan ${planType === p.type ? "on" : ""}`} onClick={() => setPlanType(p.type)}
                    role="button" tabIndex={0} onKeyDown={(e) => e.key === "Enter" && setPlanType(p.type)}>
                    <span className="radio" />
                    <div>
                      <div className="pname">{p.name}</div>
                      <div className="pdesc">{PLAN_DESC[p.type]}</div>
                      <div className="pinc">{p.inclusions.map((i) => <span key={i}>{i}</span>)}</div>
                      <div className="cancel">{p.cancellation}</div>
                    </div>
                    <div className="pprice">
                      <b>₹{p.prices[seasonKey].toLocaleString()}</b>
                      <small>/ night</small>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bottom">
              <div className="card pad">
                <h2 className="sec-title" style={{ fontSize: "1.25rem" }}>Room Amenities</h2>
                <p className="sec-sub" style={{ marginBottom: "16px" }}>Everything you need for a restful stay.</p>
                <div className="amen-grid">
                  {AMENITIES.map((a) => <div className="amen" key={a}><Check size={16} strokeWidth={3} />{a}</div>)}
                </div>
              </div>
              <div className="card pad">
                <h2 className="sec-title" style={{ fontSize: "1.25rem" }}>Room Gallery</h2>
                <p className="sec-sub" style={{ marginBottom: "16px" }}>A glimpse of your retreat.</p>
                <div className="gal">
                  {allRooms.map((r) => <img key={r.id} src={r.image} alt={r.name} loading="lazy" />)}
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT SIDEBAR */}
          <div className="side">
            <div className="card summary" ref={summaryRef}>
              <h3>Your Stay Summary</h3>
              <div className="pills">
                {PLAN_TYPES.map((t) => (
                  <div key={t} className={`pill ${planType === t ? "on" : ""}`} onClick={() => setPlanType(t)}>{t}</div>
                ))}
              </div>
              <div className="srow"><span>{room.name} <small>{plan.name} · {seasonLabel}</small></span><strong>₹{nightly.toLocaleString()}</strong></div>
              <div className="srow"><span>1 Room × {nights} Night{nights > 1 ? "s" : ""}</span><span>₹{subtotal.toLocaleString()}</span></div>
              <div className="srow"><span>Taxes &amp; Charges <small>{Math.round(TAX_RATE * 100)}% GST</small></span><span>₹{taxes.toLocaleString()}</span></div>
              <div className="stotal"><strong>Total</strong><span className="amt">₹{total.toLocaleString()}</span></div>
              <button className="book-btn" onClick={openBooking}>Book Now</button>
            </div>

            <div className="card trust">
              {TRUST.map(([Icon, t, s]) => (
                <div className="trow" key={t}>
                  <span className="ic"><Icon size={19} /></span>
                  <div><b>{t}</b><span>{s}</span></div>
                </div>
              ))}
            </div>

            <div className="card trust">
              <div className="trow"><span className="ic"><Phone size={19} /></span><div><b>{HOTEL_PHONE}</b><span>Need help? {HOTEL_HOURS}</span></div></div>
              <div className="trow"><span className="ic"><Mail size={19} /></span><div><b>{HOTEL_EMAIL}</b><span>We reply within minutes</span></div></div>
            </div>
          </div>
        </div>
      </div>

      {/* PERKS STRIP */}
      <section className="perks">
        <div className="perks-inner">
          {PERKS.map(([Icon, t]) => (
            <div className="perk" key={t}><Icon size={24} strokeWidth={1.7} /><b>{t}</b></div>
          ))}
        </div>
      </section>

      {/* HELP / INFO BAR */}
      <div className="helpbar">
        <div className="hb"><MapPin className="ic" size={22} /><div><b>Our Location</b><span>{HOTEL_LOCATION}</span></div></div>
        <div className="hb"><Clock className="ic" size={22} /><div><b>Check-in / Check-out</b><span>In: {CHECK_IN_TIME} · Out: {CHECK_OUT_TIME}</span></div></div>
        <div className="hb"><Phone className="ic" size={22} /><div><b>Reservations</b><span>{HOTEL_PHONE} · {HOTEL_HOURS}</span></div></div>
        <div className="hb"><Mail className="ic" size={22} /><div><b>Email Us</b><span>{HOTEL_EMAIL}</span></div></div>
      </div>

      <CTASection />

      {booking && <BookingModal booking={booking} onClose={() => setBooking(null)} />}
    </main>
  );
};

export default RoomDetail;


import React, { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import {
  Users,
  BedDouble,
  Maximize,
  Heart,
  SlidersHorizontal,
  Tag,
  ChevronRight,
  ArrowRight,
  Coffee,
  Wifi,
  Trees,
  Bell,
  ShieldCheck,
} from "lucide-react";
import CTASection from "../components/CTASection";

/* ----------------------------------------------------------------
   SINGLE SOURCE OF TRUTH
   (ids + plans kept identical to RoomDetail.jsx so /rooms/:id works)
----------------------------------------------------------------- */
const allRooms = [
  {
    id: 1,
    name: "Standard Room",
    badge: "Best Value",
    description: "AC single bedrooms — private, comfortable, and cool, with all the essentials for a restful stay.",
    image: "https://github.com/Aegis76/Corbett-Phoenix/blob/main/public/IMG-20260618-WA0015.jpg?raw=true",
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
    badge: "Most Popular",
    description: "Spacious comfort with a private balcony overlooking the forest — elegant interiors and serene views.",
    image: "https://github.com/Aegis76/Corbett-Phoenix/blob/main/public/IMG-20260618-WA0017.jpg?raw=true",
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
    badge: "Premium",
    description: "Ideal for families — spacious rooms with a shared living area and space for everyone to unwind.",
    image: "https://github.com/Aegis76/Corbett-Phoenix/blob/main/public/IMG-20260618-WA0014.jpg?raw=true",
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

/* lowest "from" price across every plan & season */
const fromPrice = (room) => Math.min(...room.plans.flatMap((p) => Object.values(p.prices)));

/* hero background image */
const HERO_IMAGE = "https://github.com/Aegis76/Corbett-Phoenix/blob/main/public/IMG-20260618-WA0017.jpg?raw=true";

const PERKS = [
  [Coffee, "Complimentary", "Breakfast"],
  [Wifi, "Free Wi-Fi", "Access"],
  [Trees, "Nature View", "Rooms"],
  [Bell, "24/7 Room", "Service"],
  [ShieldCheck, "Best Rate", "Guarantee"],
];

/* faint botanical accent */
const Leaf = ({ flip }) => (
  <svg viewBox="0 0 120 160" width="120" height="160" aria-hidden="true"
    style={{ transform: flip ? "scaleX(-1)" : "none" }}>
    <g fill="none" stroke="#0f3d2e" strokeWidth="1.4" opacity="0.5">
      <path d="M60 158 C60 110 60 70 60 8" />
      <path d="M60 120 C36 112 22 96 18 70 C46 74 58 96 60 120Z" />
      <path d="M60 96 C84 88 98 72 102 46 C74 50 62 72 60 96Z" />
      <path d="M60 70 C40 64 30 50 27 30 C50 34 58 52 60 70Z" />
      <path d="M60 48 C80 42 90 28 93 10 C71 14 62 30 60 48Z" />
    </g>
  </svg>
);

/* ----------------------------------------------------------------
   SCOPED PAGE CSS (responsive, namespaced under .rooms-page)
----------------------------------------------------------------- */
const CSS = `
.rooms-page{
  --g:#0f3d2e; --g2:#1f5340; --gold:#c4a962; --cream:#f3f1ea;
  --card:#ffffff; --ink:#283a31; --muted:#6f7d73; --line:rgba(15,61,46,.10);
  --serif:'Fraunces','Playfair Display',Georgia,serif;
  background:var(--cream); color:var(--ink);
}
.rooms-page .wrap{max-width:1200px;margin:0 auto;padding:0 20px;}

/* ---------- HERO ---------- */
.rooms-page .hero{position:relative;color:#fff;overflow:hidden;background:#0b2c20;}
.rooms-page .hero::before{
  content:"";position:absolute;inset:0;
  background:linear-gradient(90deg, rgba(8,28,20,.96) 0%, rgba(8,28,20,.86) 38%, rgba(8,28,20,.30) 100%),
    url('REPLACE_HERO') center/cover no-repeat;
}
.rooms-page .hero-inner{position:relative;max-width:1200px;margin:0 auto;padding:54px 20px 66px;}
.rooms-page .crumb{display:flex;align-items:center;gap:8px;font-size:12.5px;letter-spacing:1.5px;
  text-transform:uppercase;color:rgba(255,255,255,.72);font-weight:600;margin-bottom:22px;}
.rooms-page .crumb a{color:rgba(255,255,255,.72);text-decoration:none;}
.rooms-page .crumb a:hover{color:#fff;}
.rooms-page .crumb .here{color:var(--gold);}
.rooms-page .hero h1{font-family:var(--serif);font-weight:700;letter-spacing:.5px;
  font-size:clamp(2.4rem,6vw,4rem);line-height:1.05;margin:0;}
.rooms-page .leaf-rule{display:flex;align-items:center;gap:12px;margin:18px 0 16px;}
.rooms-page .leaf-rule .ln{height:1px;width:64px;background:rgba(196,169,98,.6);}
.rooms-page .leaf-rule .lf{color:var(--gold);font-size:18px;}
.rooms-page .hero .tag{font-family:var(--serif);font-style:italic;color:var(--gold);font-size:1.25rem;margin:0 0 14px;}
.rooms-page .hero p{max-width:520px;line-height:1.7;color:rgba(255,255,255,.85);font-size:1rem;margin:0;}

/* ---------- FILTER BAR ---------- */
.rooms-page .filterbar{position:relative;z-index:5;max-width:1160px;margin:-34px auto 0;padding:0 20px;}
.rooms-page .filter-card{background:var(--card);border:1px solid var(--line);border-radius:16px;
  box-shadow:0 18px 40px rgba(15,61,46,.12);display:grid;grid-template-columns:repeat(4,1fr);overflow:hidden;}
.rooms-page .fcell{display:flex;align-items:center;gap:12px;padding:18px 20px;border-right:1px solid var(--line);position:relative;}
.rooms-page .fcell:last-child{border-right:none;}
.rooms-page .fcell .ic{color:var(--gold);flex-shrink:0;}
.rooms-page .fcell .fl{font-size:11px;letter-spacing:1px;text-transform:uppercase;color:var(--muted);font-weight:700;display:block;margin-bottom:2px;}
.rooms-page .fcell.reset{cursor:pointer;}
.rooms-page .fcell.reset .fv{font-weight:700;color:var(--g);}
.rooms-page .fcell.reset .underline{height:2px;width:34px;background:var(--gold);margin-top:7px;border-radius:2px;}
.rooms-page .fcell select{appearance:none;-webkit-appearance:none;border:none;background:transparent;
  font-family:inherit;font-size:.95rem;font-weight:700;color:var(--g);cursor:pointer;padding:0 18px 0 0;width:100%;outline:none;}
.rooms-page .fcell .chev{position:absolute;right:18px;color:var(--g);pointer-events:none;}

/* ---------- ROOM GRID ---------- */
.rooms-page .grid-sec{position:relative;padding:46px 0 18px;overflow:hidden;}
.rooms-page .leaf-bl{position:absolute;left:-26px;bottom:30px;pointer-events:none;}
.rooms-page .leaf-br{position:absolute;right:-26px;bottom:30px;pointer-events:none;}
.rooms-page .grid{position:relative;display:grid;grid-template-columns:repeat(3,1fr);gap:26px;}
.rooms-page .rcard{background:var(--card);border:1px solid var(--line);border-radius:18px;overflow:hidden;
  display:flex;flex-direction:column;transition:transform .28s ease, box-shadow .28s ease;}
.rooms-page .rcard:hover{transform:translateY(-5px);box-shadow:0 22px 46px rgba(15,61,46,.16);}
.rooms-page .rmedia{position:relative;aspect-ratio:4/3;overflow:hidden;}
.rooms-page .rmedia img{width:100%;height:100%;object-fit:cover;transition:transform .6s ease;}
.rooms-page .rcard:hover .rmedia img{transform:scale(1.06);}
.rooms-page .badge{position:absolute;top:14px;left:14px;background:var(--g);color:#fff;font-size:11px;font-weight:700;
  letter-spacing:.8px;text-transform:uppercase;padding:6px 12px;border-radius:8px;box-shadow:0 6px 16px rgba(0,0,0,.25);}
.rooms-page .fav{position:absolute;top:14px;right:14px;width:34px;height:34px;border-radius:50%;border:none;
  background:rgba(255,255,255,.92);display:flex;align-items:center;justify-content:center;cursor:pointer;transition:transform .2s, background .2s;}
.rooms-page .fav:hover{transform:scale(1.1);}
.rooms-page .fav svg{color:#0f3d2e;}
.rooms-page .fav.on svg{color:#d4533e;fill:#d4533e;}
.rooms-page .rbody{padding:20px 22px 22px;display:flex;flex-direction:column;flex:1;}
.rooms-page .rname{font-family:var(--serif);font-size:1.45rem;font-weight:700;color:var(--g);margin:0 0 12px;}
.rooms-page .rspecs{display:flex;flex-wrap:wrap;gap:14px;margin-bottom:12px;}
.rooms-page .rspec{display:flex;align-items:center;gap:6px;font-size:13px;color:var(--muted);font-weight:600;}
.rooms-page .rspec svg{color:var(--g);opacity:.7;}
.rooms-page .rdesc{color:var(--muted);font-size:.92rem;line-height:1.6;margin:0 0 18px;}
.rooms-page .rfoot{display:flex;align-items:flex-end;justify-content:space-between;gap:12px;margin-top:auto;padding-top:16px;border-top:1px solid var(--line);}
.rooms-page .price small{display:block;font-size:11px;letter-spacing:.8px;text-transform:uppercase;color:var(--muted);font-weight:700;margin-bottom:1px;}
.rooms-page .price .amt{font-family:var(--serif);font-size:1.45rem;font-weight:700;color:var(--g);}
.rooms-page .price .per{font-size:12px;color:var(--muted);font-weight:600;}
.rooms-page .details-btn{display:inline-flex;align-items:center;gap:7px;background:var(--g);color:#fff;text-decoration:none;
  font-size:13px;font-weight:700;letter-spacing:.4px;text-transform:uppercase;padding:11px 16px;border-radius:10px;transition:background .2s;white-space:nowrap;}
.rooms-page .details-btn:hover{background:var(--g2);}
.rooms-page .empty{grid-column:1/-1;text-align:center;padding:50px 0;color:var(--muted);}
.rooms-page .empty button{margin-top:14px;background:var(--g);color:#fff;border:none;padding:10px 18px;border-radius:10px;font-weight:700;cursor:pointer;}

/* ---------- PERKS STRIP ---------- */
.rooms-page .perks{border-top:1px solid var(--line);background:#fbfaf6;}
.rooms-page .perks-inner{max-width:1200px;margin:0 auto;padding:26px 20px;display:grid;grid-template-columns:repeat(5,1fr);gap:18px;}
.rooms-page .perk{display:flex;align-items:center;gap:12px;justify-content:center;}
.rooms-page .perk svg{color:var(--gold);flex-shrink:0;}
.rooms-page .perk b{display:block;color:var(--g);font-size:.9rem;font-weight:700;}
.rooms-page .perk span{font-size:.82rem;color:var(--muted);}

/* ---------- TAGLINE ---------- */
.rooms-page .tagline{background:#fbfaf6;text-align:center;padding:8px 20px 30px;display:flex;
  align-items:center;justify-content:center;gap:12px;color:var(--gold);font-weight:700;
  letter-spacing:2px;text-transform:uppercase;font-size:.82rem;}
.rooms-page .tagline .lf{font-size:15px;}

/* ---------- RESPONSIVE ---------- */
@media (max-width:960px){
  .rooms-page .grid{grid-template-columns:repeat(2,1fr);}
  .rooms-page .filter-card{grid-template-columns:repeat(2,1fr);}
  .rooms-page .fcell:nth-child(2){border-right:none;}
  .rooms-page .fcell:nth-child(1),.rooms-page .fcell:nth-child(2){border-bottom:1px solid var(--line);}
  .rooms-page .perks-inner{grid-template-columns:repeat(2,1fr);gap:22px;}
  .rooms-page .leaf-bl,.rooms-page .leaf-br{display:none;}
}
@media (max-width:600px){
  .rooms-page .grid{grid-template-columns:1fr;}
  .rooms-page .filterbar{margin-top:-26px;}
  .rooms-page .filter-card{grid-template-columns:1fr;}
  .rooms-page .fcell{border-right:none;border-bottom:1px solid var(--line);}
  .rooms-page .fcell:last-child{border-bottom:none;}
  .rooms-page .perks-inner{grid-template-columns:1fr;}
  .rooms-page .perk{justify-content:flex-start;}
  .rooms-page .tagline{font-size:.72rem;letter-spacing:1.4px;}
}
`.replace("REPLACE_HERO", HERO_IMAGE);

/* ----------------------------------------------------------------
   PAGE
----------------------------------------------------------------- */
const Rooms = () => {
  const [capacity, setCapacity] = useState("any");
  const [priceBand, setPriceBand] = useState("any");
  const [sortBy, setSortBy] = useState("recommended");
  const [favs, setFavs] = useState(() => new Set());

  const toggleFav = (id) =>
    setFavs((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });

  const resetFilters = () => {
    setCapacity("any");
    setPriceBand("any");
    setSortBy("recommended");
  };

  const rooms = useMemo(() => {
    let list = allRooms.filter((r) => {
      if (capacity !== "any" && r.guests < Number(capacity)) return false;
      const p = fromPrice(r);
      if (priceBand === "low" && p >= 1500) return false;
      if (priceBand === "mid" && (p < 1500 || p > 3000)) return false;
      if (priceBand === "high" && p <= 3000) return false;
      return true;
    });
    if (sortBy === "low") list = [...list].sort((a, b) => fromPrice(a) - fromPrice(b));
    if (sortBy === "high") list = [...list].sort((a, b) => fromPrice(b) - fromPrice(a));
    return list;
  }, [capacity, priceBand, sortBy]);

  return (
    <main className="rooms-page">
      <style>{CSS}</style>

      {/* HERO */}
      <header className="hero">
        <div className="hero-inner">
          <nav className="crumb" aria-label="Breadcrumb">
            <Link to="/">Home</Link>
            <ChevronRight size={14} />
            <span className="here">Rooms &amp; Suites</span>
          </nav>
          <h1>Rooms &amp; Suites</h1>
          <div className="leaf-rule"><span className="ln" /><span className="lf">&#10087;</span><span className="ln" /></div>
          <p className="tag">Comfort inspired by nature.</p>
          <p>
            Thoughtfully designed spaces with modern comforts and serene forest views &mdash;
            the perfect base for your stay near Jim Corbett.
          </p>
        </div>
      </header>

      {/* FILTER BAR */}
      <div className="filterbar">
        <div className="filter-card">
          <div className="fcell reset" onClick={resetFilters} role="button" tabIndex={0}
            onKeyDown={(e) => e.key === "Enter" && resetFilters()}>
            <BedDouble className="ic" size={22} />
            <div>
              <span className="fl">All Rooms</span>
              <span className="fv">View all rooms</span>
              <div className="underline" />
            </div>
          </div>

          <div className="fcell">
            <Users className="ic" size={22} />
            <div style={{ width: "100%" }}>
              <span className="fl">Capacity</span>
              <select value={capacity} onChange={(e) => setCapacity(e.target.value)}>
                <option value="any">Any</option>
                <option value="2">2+ Guests</option>
                <option value="4">4+ Guests</option>
              </select>
            </div>
            <ChevronRight className="chev" size={16} style={{ transform: "rotate(90deg)" }} />
          </div>

          <div className="fcell">
            <Tag className="ic" size={22} />
            <div style={{ width: "100%" }}>
              <span className="fl">Price Range</span>
              <select value={priceBand} onChange={(e) => setPriceBand(e.target.value)}>
                <option value="any">Any</option>
                <option value="low">Under &#8377;1,500</option>
                <option value="mid">&#8377;1,500 &ndash; &#8377;3,000</option>
                <option value="high">Above &#8377;3,000</option>
              </select>
            </div>
            <ChevronRight className="chev" size={16} style={{ transform: "rotate(90deg)" }} />
          </div>

          <div className="fcell">
            <SlidersHorizontal className="ic" size={22} />
            <div style={{ width: "100%" }}>
              <span className="fl">Sort By</span>
              <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
                <option value="recommended">Recommended</option>
                <option value="low">Price: Low to High</option>
                <option value="high">Price: High to Low</option>
              </select>
            </div>
            <ChevronRight className="chev" size={16} style={{ transform: "rotate(90deg)" }} />
          </div>
        </div>
      </div>

      {/* ROOM GRID */}
      <section className="grid-sec">
        <span className="leaf-bl"><Leaf /></span>
        <span className="leaf-br"><Leaf flip /></span>
        <div className="wrap">
          <div className="grid">
            {rooms.length === 0 ? (
              <div className="empty">
                <p>No rooms match your filters.</p>
                <button onClick={resetFilters}>Reset filters</button>
              </div>
            ) : (
              rooms.map((room) => (
                <article className="rcard" key={room.id}>
                  <div className="rmedia">
                    <img src={room.image} alt={room.name} loading="lazy" />
                    {room.badge && <span className="badge">{room.badge}</span>}
                    <button
                      className={`fav ${favs.has(room.id) ? "on" : ""}`}
                      onClick={() => toggleFav(room.id)}
                      aria-label={favs.has(room.id) ? "Remove from favourites" : "Add to favourites"}
                    >
                      <Heart size={17} />
                    </button>
                  </div>

                  <div className="rbody">
                    <h3 className="rname">{room.name}</h3>
                    <div className="rspecs">
                      <span className="rspec"><Users size={14} /> {room.guests} Guests</span>
                      <span className="rspec"><BedDouble size={14} /> {room.bed}</span>
                      <span className="rspec"><Maximize size={14} /> {room.size}</span>
                    </div>
                    <p className="rdesc">{room.description}</p>

                    <div className="rfoot">
                      <div className="price">
                        <small>From</small>
                        <span className="amt">&#8377;{fromPrice(room).toLocaleString()}</span>
                        <span className="per"> / night</span>
                      </div>
                      <Link to={`/rooms/${room.id}`} className="details-btn">
                        View Details <ArrowRight size={15} />
                      </Link>
                    </div>
                  </div>
                </article>
              ))
            )}
          </div>
        </div>
      </section>

      {/* PERKS STRIP */}
      <section className="perks">
        <div className="perks-inner">
          {PERKS.map(([Icon, a, b]) => (
            <div className="perk" key={a}>
              <Icon size={26} strokeWidth={1.6} />
              <div><b>{a}</b><span>{b}</span></div>
            </div>
          ))}
        </div>
      </section>

      {/* TAGLINE */}
      <div className="tagline">
        <span className="lf">&#10087;</span>
        Stay close to nature, without compromising on comfort.
      </div>

      <CTASection />
    </main>
  );
};

export default Rooms;

import { useState, useEffect } from "react";
import AddressAutocomplete from "./AddressAutocomplete";

/*
  MAGIC CITY JUNK REMOVAL — v3
  Layout: Hero → Booking (section 2) → Pricing → What We Haul → Areas → Footer
  Deposit: $25 / $50 / $75
  Phone: (786) 822-8281
*/

const PACKAGES = [
  { name: "Half Truck Load", price: "$299", deposit: 25, note: "Furniture, appliances, small cleanouts", tag: null },
  { name: "Full Truck Load", price: "$549", deposit: 50, note: "Garage, storage unit, large hauls", tag: "Most Popular" },
  { name: "Complete Cleanout", price: "$849+", deposit: 75, note: "Entire property / estate cleanout", tag: "Full Service" },
];

const HAUL_ITEMS = [
  { icon: "🛋️", name: "Furniture", desc: "Couches, mattresses, tables, chairs" },
  { icon: "🏗️", name: "Construction Debris", desc: "Drywall, lumber, tile, concrete" },
  { icon: "🏠", name: "Garage & Storage", desc: "Full cleanouts, hoarding, clutter" },
  { icon: "🪦", name: "Estate Cleanouts", desc: "Compassionate full-property clearing" },
  { icon: "🖥️", name: "Appliances & E-Waste", desc: "Fridges, washers, TVs, computers" },
  { icon: "🌳", name: "Yard Debris", desc: "Branches, stumps, landscaping waste" },
];

const PACKAGE_SPECS = {
  "Half Truck Load": {
    time: "30-60 minutes on-site",
    capacity: "Approximately 1-5 large items or equivalent volume",
    items: [
      "Professional crew arrival with commercial truck and equipment",
      "Loading and hauling of all items (you point, we carry)",
      "Furniture (couches, tables, chairs, desks, dressers, bed frames)",
      "Mattresses and box springs",
      "Small appliances (microwaves, vacuums, fans, printers)",
      "Boxes, bags, and loose household items",
      "Yard waste and debris (branches, clippings, soil bags)",
      "Sweep of area after removal",
      "Responsible disposal: recycling, donation, and landfill as appropriate",
      "All labor, loading, transport, and dump fees included in price",
    ],
    idealFor: "Small garage cleanups, single-room clearouts, moving day leftovers, a few bulky items.",
  },
  "Full Truck Load": {
    time: "1-2 hours on-site",
    capacity: "Approximately 6-15 large items (full truck bed, ~8 cubic yards)",
    tierUp: "Everything in Half Truck Load, PLUS:",
    items: [
      "Full truck bed capacity",
      "Multiple rooms or areas in one trip",
      "Large appliances (refrigerators, washers, dryers, dishwashers, stoves)",
      "Exercise equipment (treadmills, ellipticals, weight benches)",
      "Outdoor items (patio furniture, grills, swing sets, old fencing)",
      "Electronics (TVs, monitors, computers — proper e-waste disposal)",
      "Construction-light debris (drywall scraps, wood, tile, flooring)",
      "Full sweep and cleanup of all removal areas",
      "All labor, loading, transport, and dump fees included",
    ],
    idealFor: "Full garage cleanouts, apartment move-outs, estate cleanups, office furniture removal, single-room renovation debris.",
  },
  "Complete Cleanout": {
    time: "2-5 hours on-site (may require multiple truck loads)",
    capacity: "Entire property or large-scale removal",
    tierUp: "Everything in Full Truck Load, PLUS:",
    items: [
      "Multiple truck loads as needed (no per-load upcharge within quoted scope)",
      "Whole-home or whole-property cleanouts",
      "Hoarder and heavy-volume situations",
      "Full attic, basement, or storage unit clearouts",
      "Shed and outbuilding cleanouts",
      "Foreclosure and eviction cleanups",
      "Estate and probate property cleanouts",
      "Commercial space clearing (offices, warehouses, retail)",
      "Post-renovation full debris removal",
      "Sorting: salvageable items separated for donation when possible",
      "Broom-clean finish of all cleared areas",
      "All labor, loading, transport, and dump fees included",
    ],
    idealFor: "Full property cleanouts, estate liquidation, foreclosure turnovers, hoarder situations, commercial lease-end clearings.",
    note: "Final price depends on total volume and number of truck loads required. Starting price of $849 covers up to 2 full truck loads. Phone or on-site estimate provided before work begins.",
  },
};

const SPECIALTY_ITEMS = [
  "Piano (upright or grand)",
  "Hot tub / jacuzzi",
  "Pool table",
  "Safe (commercial or gun safe)",
  "Concrete slabs or heavy masonry",
  "Items requiring disassembly before removal",
];

const HAUL_CATEGORIES = [
  { icon: "\u{1F6CB}\uFE0F", name: "Furniture", items: "Couches, loveseats, recliners, dining sets, desks, dressers, bookshelves, entertainment centers, bed frames, headboards, mattresses, box springs, futons, patio furniture" },
  { icon: "\u{1F50C}", name: "Appliances", items: "Refrigerators, freezers, washers, dryers, dishwashers, stoves, ovens, microwaves, window AC units, water heaters, dehumidifiers" },
  { icon: "\u{1F5A5}\uFE0F", name: "Electronics", items: "TVs, monitors, computers, printers, stereos, speakers, gaming consoles (proper e-waste disposal)" },
  { icon: "\u{1F333}", name: "Yard & Outdoor", items: "Tree branches, shrubs, sod, soil, mulch, fencing, deck boards, swing sets, trampolines, grills, planters, landscaping debris" },
  { icon: "\u{1F3D7}\uFE0F", name: "Construction Debris", items: "Drywall, lumber, tile, flooring, carpet, cabinetry, fixtures, doors, windows, roofing material" },
  { icon: "\u{1F4E6}", name: "Miscellaneous", items: "Boxes, bags, totes, clothing, toys, sporting equipment, tools, garage clutter, storage unit contents, office supplies" },
];

const CANNOT_HAUL = [
  "Chemicals, solvents, or liquid paint",
  "Asbestos-containing materials",
  "Medical or biohazard waste",
  "Full propane tanks",
  "Ammunition or firearms",
  "Tires (refer to tire recycling)",
];

const AREAS = [
  "Miami Beach", "Brickell", "Coral Gables", "Kendall", "Doral", "Hialeah",
  "Coconut Grove", "Aventura", "Hollywood", "Fort Lauderdale", "Pembroke Pines",
  "Weston", "Boca Raton", "West Palm Beach", "Homestead", "Miami Gardens",
];

const TIMES = [];
for (let h = 7; h <= 21; h++) {
  for (let m = 0; m < 60; m += 15) {
    if (h === 21 && m > 0) break;
    const hour12 = h > 12 ? h - 12 : h === 0 ? 12 : h;
    const ampm = h >= 12 ? "PM" : "AM";
    const label = `${hour12}:${m.toString().padStart(2, "0")} ${ampm}`;
    let tag = "";
    if (h < 8) tag = " (Early Bird +$25)";
    else if (h >= 18) tag = " (After Hours +$25)";
    TIMES.push({ value: label, label: label + tag });
  }
}

export default function JunkRemovalSite() {
  const [bookingTab, setBookingTab] = useState("book");
  const [selectedPkg, setSelectedPkg] = useState(null);
  const [bookingDate, setBookingDate] = useState("");
  const [bookingTime, setBookingTime] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [hoveredArea, setHoveredArea] = useState(null);
  const [expandedPkg, setExpandedPkg] = useState({});

  const selectedPackage = selectedPkg !== null ? PACKAGES[selectedPkg] : null;
  const depositAmount = selectedPackage ? selectedPackage.deposit : 0;

  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  // Handle Stripe redirect back
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get("booking") === "success") {
      // Submit to Formspree with saved data
      const saved = localStorage.getItem("pendingBooking");
      if (saved) {
        const data = JSON.parse(saved);
        fetch("https://formspree.io/f/xqeyrgno", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ ...data, deposit: "$" + data.deposit, payment: "Stripe deposit paid" }),
        }).catch(() => {});
        localStorage.removeItem("pendingBooking");
      }
      setSubmitted(true);
      // Fire Google Ads conversion
      if (typeof gtag === "function") gtag("event", "conversion", {"send_to": "AW-18078412608/S_40CIGMrZkcEMDeuqxD"});
      // Clean URL
      window.history.replaceState({}, "", window.location.pathname);
    }
  }, []);

  const handleBookingSubmit = async () => {
    if (!selectedPackage || !name || !phone || !email || !address || !bookingDate || !bookingTime) {
      alert("Please fill in all fields before submitting.");
      return;
    }
    setSubmitting(true);
    try {
      // Save form data to localStorage before Stripe redirect
      const bookingData = {
        name, phone, email, address,
        date: bookingDate, time: bookingTime,
        service: "Junk Removal",
        package: selectedPackage.name,
        price: selectedPackage.price,
        deposit: depositAmount,
      };
      localStorage.setItem("pendingBooking", JSON.stringify(bookingData));

      // Create Stripe Checkout session
      const res = await fetch("/api/create-checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          packageName: selectedPackage.name,
          price: depositAmount,
          customerName: name,
          customerEmail: email,
          customerPhone: phone,
          date: bookingDate,
          time: bookingTime,
          address,
        }),
      });
      const data = await res.json();
      if (data.url) {
        window.location.href = data.url;
      } else {
        throw new Error(data.error || "Failed to create checkout session");
      }
    } catch (e) {
      console.error("Checkout error:", e);
      alert("Something went wrong creating your checkout. Please try again or call us.");
      setSubmitting(false);
    }
  };

  const handleQuoteSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const data = new FormData(form);
    try {
      const res = await fetch("https://formspree.io/f/xyknrbor", {
        method: "POST",
        body: data,
        headers: { Accept: "application/json" },
      });
      if (res.ok) {
        alert("Quote request sent! We'll get back to you within 1 hour during business hours.");
        form.reset();
      } else {
        alert("Something went wrong. Please call us at (305) 570-3041.");
      }
    } catch (err) {
      alert("Something went wrong. Please call us at (305) 570-3041.");
    }
  };

  return (
    <div style={{ minHeight: "100vh", background: "#0B1120", color: "#F8FAFC", fontFamily: "'Outfit', sans-serif", overflowX: "hidden" }}>
            <style>{`
        *, *::before, *::after { box-sizing: border-box; }
        html { scroll-behavior: smooth; }
        html, body, #root { margin: 0; padding: 0; background: #0B1120; min-height: 100vh; }
        input, textarea, select, button { max-width: 100%; box-sizing: border-box; }
        section[id], footer[id] { scroll-margin-top: 60px; }
        /* Mobile nav fix */
        .nav-links { display: flex; gap: 20px; }
        @media (max-width: 640px) {
          .nav-links { display: none !important; }
          nav { grid-template-columns: 1fr auto !important; padding: 12px 16px !important; }
          .nav-logo-text { font-size: 14px !important; }
          .nav-sub-text { font-size: 9px !important; letter-spacing: 2px !important; }
          .phone-btn { padding: 8px 12px !important; font-size: 11px !important; }
        }


        .pkg-card { transition: all 0.25s ease !important; }
        .pkg-card:hover { 
          border-color: rgba(125,211,252,0.5) !important;
          box-shadow: 0 0 20px rgba(125,211,252,0.12), 0 4px 12px rgba(0,0,0,0.3);
          transform: translateY(-2px);
        }

        .price-row { transition: all 0.25s ease !important; }
        .price-row:hover {
          border-color: rgba(244,114,182,0.3) !important;
          box-shadow: 0 0 16px rgba(244,114,182,0.1);
          transform: translateX(4px);
          background: rgba(30,41,59,0.6) !important;
        }

        .info-card { transition: all 0.3s ease !important; }
        .info-card:hover {
          border-color: rgba(244,114,182,0.4) !important;
          box-shadow: 0 0 24px rgba(244,114,182,0.12), 0 8px 20px rgba(0,0,0,0.3);
          transform: translateY(-4px);
        }
        .info-card:hover .info-icon { transform: scale(1.2); }
        .info-icon { transition: transform 0.3s ease; display: inline-block; }

        .cross-link { transition: all 0.25s ease !important; }
        .cross-link:hover {
          border-color: rgba(125,211,252,0.4) !important;
          box-shadow: 0 0 16px rgba(125,211,252,0.1);
          transform: translateY(-2px);
        }

        .tab-btn { transition: all 0.2s ease !important; }
        .tab-btn:hover { opacity: 0.9; transform: scale(1.02); }

        .cta-btn { transition: all 0.3s ease !important; }
        .cta-btn:hover { transform: scale(1.02); box-shadow: 0 0 24px rgba(244,114,182,0.3); }
        .cta-btn:active { transform: scale(0.98); }

        .phone-btn { transition: all 0.25s ease !important; }
        .phone-btn:hover { box-shadow: 0 0 20px rgba(244,114,182,0.4); transform: scale(1.05); }

        .stat-item { transition: all 0.3s ease; }
        .stat-item:hover { transform: scale(1.08); }

        .area-badge { transition: all 0.3s ease; }
        .area-badge:hover { background: rgba(244,114,182,0.15) !important; border-color: rgba(244,114,182,0.5) !important; transform: scale(1.03); }

        .deposit-box { transition: all 0.3s ease; }
        .deposit-box:hover { box-shadow: 0 0 20px rgba(34,197,94,0.15); }

        input:focus, textarea:focus, select:focus {
          border-color: rgba(244,114,182,0.4) !important;
          box-shadow: 0 0 12px rgba(244,114,182,0.1);
        }

        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(16px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .fade-up { animation: fadeUp 0.6s ease forwards; }
      `}</style>
      <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700&family=Playfair+Display:wght@600;700&display=swap" rel="stylesheet" />

      {/* NAV */}
      <nav style={{
        display: "grid", gridTemplateColumns: "1fr auto 1fr", alignItems: "center",
        padding: "14px 20px", borderBottom: "1px solid rgba(244,114,182,0.1)",
        background: "rgba(11,17,32,0.95)", position: "sticky", top: 0, zIndex: 100, backdropFilter: "blur(12px)",
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <div style={{ width: "32px", height: "32px", borderRadius: "8px", background: "#0B1120", display: "flex", alignItems: "center", justifyContent: "center", border: "1px solid rgba(244,114,182,0.2)" }}>
            <div style={{ display: "flex", gap: "2px", alignItems: "flex-end" }}>
              {[10, 16, 12, 18].map((h, i) => (
                <div key={i} style={{ width: "4px", height: `${h}px`, borderRadius: "1px", background: i % 2 === 0 ? "#F472B6" : "linear-gradient(180deg, #7DD3FC, #F472B6)" }} />
              ))}
            </div>
          </div>
          <div>
            <div style={{ fontSize: "13px", fontWeight: 700, letterSpacing: "0.5px" }} className="nav-logo-text">MAGIC CITY</div>
            <div style={{ fontSize: "8px", color: "#94A3B8", letterSpacing: "2px" }} className="nav-sub-text">JUNK REMOVAL</div>
          </div>
        </div>
        <div className="nav-links" style={{ display: "flex", gap: "20px", fontSize: "12px", fontWeight: 500 }}>
          {[
            { label: "PRICING", target: "pricing" },
            { label: "BOOK NOW", target: "booking" },
            { label: "AREAS", target: "areas" },
          ].map(l => (
            <span key={l.label} onClick={() => document.getElementById(l.target)?.scrollIntoView({ behavior: "smooth" })} style={{ color: "#94A3B8", cursor: "pointer", letterSpacing: "0.5px", transition: "color 0.2s" }}
              onMouseEnter={e => e.target.style.color = "#F472B6"}
              onMouseLeave={e => e.target.style.color = "#94A3B8"}
            >{l.label}</span>
          ))}
        </div>
        <div style={{ display: "flex", justifyContent: "flex-end" }}>
          <a href="tel:7868228281" className="phone-btn" style={{
            padding: "8px 14px", borderRadius: "20px",
            background: "linear-gradient(135deg, #F472B6, #E04DA0)",
            color: "#fff", fontSize: "12px", fontWeight: 600, textDecoration: "none",
          }}>📞 (786) 822-8281</a>
        </div>
      </nav>

      {/* HERO */}
      <section style={{ padding: "55px 20px 45px", textAlign: "center", background: "linear-gradient(180deg, #0B1120 0%, #131B2E 100%)" }}>
        <div style={{
          display: "inline-block", padding: "6px 20px", borderRadius: "20px",
          border: "1px solid rgba(244,114,182,0.3)", background: "rgba(244,114,182,0.08)",
          fontSize: "11px", color: "#F472B6", letterSpacing: "2px", textTransform: "uppercase", marginBottom: "20px",
        }} className="area-badge">
          Serving Miami-Dade, Broward & Palm Beach
        </div>

        <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(30px, 6vw, 48px)", fontWeight: 700, lineHeight: 1.15, margin: "0 0 16px" }}>
          Miami's #1{"\n"}
          <span style={{ background: "linear-gradient(135deg, #F472B6, #7DD3FC)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
            Junk Removal Service
          </span>
        </h1>

        <p style={{ fontSize: "16px", color: "#94A3B8", maxWidth: "480px", margin: "0 auto 24px", lineHeight: 1.6 }}>
          Fast, affordable junk hauling for homes and businesses. Furniture, debris, full cleanouts — we handle it all. Same-day service available.
        </p>

        <div style={{ display: "flex", justifyContent: "center", gap: "36px" }}>
          {[{ big: "Insured", sub: "PROFESSIONALS" }, { big: "Guaranteed", sub: "SATISFACTION" }, { big: "Same Day", sub: "SERVICE AVAILABLE" }].map((s, i) => (
            <div key={i} className="stat-item" style={{ textAlign: "center" }}>
              <div style={{ fontSize: "18px", fontWeight: 700 }}>{s.big}</div>
              <div style={{ fontSize: "9px", color: "#94A3B8", letterSpacing: "1px", marginTop: "2px" }}>{s.sub}</div>
            </div>
          ))}
        </div>
      </section>

      {/* BOOKING */}
      <section style={{ padding: "40px 16px 50px", background: "linear-gradient(180deg, #131B2E 0%, #0B1120 100%)" }}>
        <div style={{ maxWidth: "560px", margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: "24px" }}>
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "26px", fontWeight: 700, margin: "0 0 6px" }}>Book Your Removal</h2>
            <p style={{ fontSize: "13px", color: "#94A3B8" }}>Schedule online, get a free quote, or call us directly</p>
          </div>

          {/* Tabs */}
          <div style={{ display: "flex", gap: "4px", marginBottom: "20px", background: "rgba(30,41,59,0.5)", borderRadius: "12px", padding: "4px" }}>
            {[{ id: "book", label: "Book Online" }, { id: "quote", label: "Get a Quote" }, { id: "call", label: "Call Now" }].map(tab => (
              <button key={tab.id} className="tab-btn" onClick={() => setBookingTab(tab.id)}
                style={{
                  flex: 1, padding: "10px", borderRadius: "10px", border: "none",
                  background: bookingTab === tab.id ? "linear-gradient(135deg, #F472B6, #7DD3FC)" : "transparent",
                  color: bookingTab === tab.id ? "#0B1120" : "#94A3B8",
                  fontSize: "13px", fontWeight: bookingTab === tab.id ? 700 : 500,
                  cursor: "pointer", fontFamily: "inherit",
                }}
              >{tab.label}</button>
            ))}
          </div>

          {/* BOOK ONLINE */}
          {bookingTab === "book" && (
            <div style={{ padding: "24px 20px", borderRadius: "16px", background: "rgba(30,41,59,0.3)", border: "1px solid rgba(148,163,184,0.1)" }}>
              <label style={labelStyle}>Select Package</label>
              {PACKAGES.map((pkg, i) => (
                <button key={i} className="pkg-card" onClick={() => setSelectedPkg(i)}
                  style={{
                    width: "100%", display: "flex", justifyContent: "space-between", alignItems: "center",
                    padding: "14px", marginBottom: "8px", borderRadius: "12px",
                    border: selectedPkg === i ? "1px solid rgba(125,211,252,0.4)" : "1px solid rgba(148,163,184,0.1)",
                    background: selectedPkg === i ? "rgba(125,211,252,0.08)" : "rgba(30,41,59,0.3)",
                    color: "#F8FAFC", cursor: "pointer", fontFamily: "inherit", textAlign: "left",
                    position: "relative", overflow: "hidden",
                  }}>
                  {pkg.tag && (
                    <div style={{
                      position: "absolute", top: 0, right: 0,
                      padding: "2px 10px", borderRadius: "0 10px 0 8px",
                      background: pkg.tag === "Full Service" ? "rgba(34,197,94,0.2)" : "rgba(244,114,182,0.2)",
                      fontSize: "9px", fontWeight: 700, letterSpacing: "0.5px",
                      color: pkg.tag === "Full Service" ? "#22C55E" : "#F472B6",
                    }}>{pkg.tag}</div>
                  )}
                  <div>
                    <div style={{ fontSize: "14px", fontWeight: 600, color: selectedPkg === i ? "#7DD3FC" : "#F8FAFC" }}>{pkg.name}</div>
                    <div style={{ fontSize: "11px", color: "#94A3B8", marginTop: "3px" }}>{pkg.note}</div>
                  </div>
                  <div style={{ textAlign: "right", flexShrink: 0 }}>
                    <div style={{ fontSize: "16px", fontWeight: 700, color: "#7DD3FC" }}>{pkg.price}</div>
                    <div style={{ fontSize: "10px", fontWeight: 600, marginTop: "2px", color: "#22C55E", background: "rgba(34,197,94,0.1)", padding: "2px 8px", borderRadius: "4px", display: "inline-block" }}>${pkg.deposit} deposit</div>
                  </div>
                </button>
              ))}

              {/* Date & Time */}
              <div style={{ display: "flex", gap: "10px", marginTop: "8px", marginBottom: "14px" }}>
                <div style={{ flex: "1 1 0", minWidth: 0 }}>
                  <label style={labelStyle}>Date</label>
                  <input type="date" value={bookingDate} onChange={e => setBookingDate(e.target.value)} min={new Date().toISOString().split("T")[0]} style={{ ...inputStyle, height: "46px", WebkitAppearance: "none" }} />
                </div>
                <div style={{ flex: "1 1 0", minWidth: 0 }}>
                  <label style={labelStyle}>Time</label>
                  <select value={bookingTime} onChange={e => setBookingTime(e.target.value)} style={{ ...inputStyle, height: "46px", WebkitAppearance: "none", backgroundImage: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' fill='%2394A3B8' viewBox='0 0 16 16'%3E%3Cpath d='M8 11L3 6h10z'/%3E%3C/svg%3E\")", backgroundRepeat: "no-repeat", backgroundPosition: "right 12px center" }}>
                    <option value="">Select time</option>
                    {TIMES.filter(t => {
                      if (!bookingDate) return true;
                      const today = new Date().toISOString().split("T")[0];
                      if (bookingDate !== today) return true;
                      const now = new Date();
                      const [timePart, ampm] = t.value.split(" ");
                      const [hr, min] = timePart.split(":").map(Number);
                      let h24 = hr;
                      if (ampm === "PM" && hr !== 12) h24 = hr + 12;
                      if (ampm === "AM" && hr === 12) h24 = 0;
                      return h24 > now.getHours() || (h24 === now.getHours() && min > now.getMinutes());
                    }).map(t => <option key={t.value} value={t.value}>{t.label}</option>)}
                  </select>
                </div>
              </div>

              <label style={labelStyle}>Full Name</label>
              <input type="text" value={name} onChange={e => setName(e.target.value)} placeholder="Your full name" style={{ ...inputStyle, marginBottom: "10px" }} />
              <label style={labelStyle}>Phone</label>
              <input type="tel" value={phone} onChange={e => setPhone(e.target.value)} placeholder="(305) 000-0000" style={{ ...inputStyle, marginBottom: "10px" }} />
              <label style={labelStyle}>Email</label>
              <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="your@email.com" style={{ ...inputStyle, marginBottom: "10px" }} />
              <label style={labelStyle}>Service Address</label>
              <AddressAutocomplete value={address} onChange={setAddress} placeholder="Street, City, State, Zip Code" inputStyle={{ ...inputStyle, marginBottom: "20px" }} />

              {selectedPackage && (
                <div style={{
                  padding: "14px", borderRadius: "12px", marginBottom: "14px",
                  background: "linear-gradient(135deg, rgba(34,197,94,0.08), rgba(125,211,252,0.08))",
                  border: "1px solid rgba(34,197,94,0.2)",
                  display: "flex", justifyContent: "space-between", alignItems: "center",
                }} className="deposit-box">
                  <div>
                    <div style={{ fontSize: "12px", color: "#94A3B8" }}>Deposit to confirm booking</div>
                    <div style={{ fontSize: "11px", color: "#94A3B8", marginTop: "2px" }}>Remaining balance due after service</div>
                  </div>
                  <div style={{ fontSize: "24px", fontWeight: 700, color: "#22C55E" }}>${depositAmount}</div>
                </div>
              )}

              <button style={{
                width: "100%", padding: "15px", borderRadius: "12px", border: "none",
                background: selectedPackage ? "linear-gradient(135deg, #F472B6, #7DD3FC)" : "rgba(148,163,184,0.2)",
                color: selectedPackage ? "#0B1120" : "#94A3B8",
                fontSize: "15px", fontWeight: 700, cursor: selectedPackage ? "pointer" : "default",
                fontFamily: "inherit", opacity: selectedPackage && !submitted ? 1 : 0.5,
              }} className="cta-btn" onClick={handleBookingSubmit} disabled={submitting || submitted || !selectedPackage}>
                {submitting ? "Submitting..." : submitted ? "Booking Submitted! ✅" : selectedPackage ? `Confirm Booking — $${depositAmount} Deposit` : "Select a package to continue"}
              </button>
              {submitted && (
                <div style={{ textAlign: "center", padding: "14px", marginTop: "12px", borderRadius: "12px", background: "rgba(34,197,94,0.1)", border: "1px solid rgba(34,197,94,0.3)" }}>
                  <div style={{ fontSize: "14px", fontWeight: 600, color: "#22C55E", marginBottom: "4px" }}>Booking received! 🎉</div>
                  <div style={{ fontSize: "12px", color: "#94A3B8" }}>Check your email for confirmation. A team member will reach out within 30 minutes.</div>
                </div>
              )}
              {!submitted && (
              <p style={{ textAlign: "center", fontSize: "11px", color: "#94A3B8", marginTop: "10px", lineHeight: 1.4 }}>
                Deposit secures your time slot. Remaining balance due after service is completed to your satisfaction.<br />Final price confirmed after on-site estimate.
              </p>
              )}
            </div>
          )}

          {/* GET A QUOTE */}
          {bookingTab === "quote" && (
            <div style={{ padding: "24px 20px", borderRadius: "16px", background: "rgba(30,41,59,0.3)", border: "1px solid rgba(148,163,184,0.1)" }}>
              <div style={{ padding: "10px 14px", borderRadius: "10px", marginBottom: "16px", background: "rgba(34,197,94,0.08)", border: "1px solid rgba(34,197,94,0.15)", fontSize: "12px", color: "#22C55E", textAlign: "center", fontWeight: 500 }}>Free quote — no deposit required</div>
              <form onSubmit={handleQuoteSubmit}>
              <label style={labelStyle}>Full Name</label>
              <input type="text" placeholder="Your full name" name="name" style={{ ...inputStyle, marginBottom: "10px" }} />
              <label style={labelStyle}>Phone</label>
              <input type="tel" placeholder="(305) 000-0000" name="phone" style={{ ...inputStyle, marginBottom: "10px" }} />
              <label style={labelStyle}>Email</label>
              <input type="email" placeholder="your@email.com" name="email" style={{ ...inputStyle, marginBottom: "10px" }} />
              <label style={labelStyle}>What needs to be removed?</label>
              <textarea placeholder="Tell us what you need hauled — furniture, debris, full cleanout, etc." rows={3} style={{ ...inputStyle, resize: "vertical", lineHeight: 1.5, marginBottom: "16px" }} />
              <button style={{ width: "100%", padding: "15px", borderRadius: "12px", border: "none", background: "linear-gradient(135deg, #F472B6, #7DD3FC)", color: "#0B1120", fontSize: "15px", fontWeight: 700, cursor: "pointer", fontFamily: "inherit" }}>Get My Free Quote</button>
              </form>
            </div>
          )}

          {/* CALL NOW */}
          {bookingTab === "call" && (
            <div style={{ padding: "30px 20px", borderRadius: "16px", textAlign: "center", background: "rgba(30,41,59,0.3)", border: "1px solid rgba(148,163,184,0.1)" }}>
              <div style={{ fontSize: "48px", marginBottom: "16px" }}>📞</div>
              <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: "22px", margin: "0 0 8px" }}>Call Us Directly</h3>
              <p style={{ fontSize: "13px", color: "#94A3B8", marginBottom: "6px" }}>Speak with a team member right now</p>
              <div style={{ display: "inline-block", padding: "6px 14px", borderRadius: "8px", marginBottom: "20px", background: "rgba(34,197,94,0.08)", border: "1px solid rgba(34,197,94,0.15)", fontSize: "12px", color: "#22C55E", fontWeight: 500 }}>No deposit required — book over the phone for free</div>
              <br />
              <a href="tel:7868228281" style={{ display: "inline-block", padding: "14px 32px", borderRadius: "12px", background: "linear-gradient(135deg, #F472B6, #E04DA0)", color: "#fff", fontSize: "18px", fontWeight: 700, textDecoration: "none", fontFamily: "inherit" }}>(786) 822-8281</a>
              <p style={{ fontSize: "12px", color: "#94A3B8", marginTop: "16px" }}>Available 7 AM – 9 PM, 7 days a week</p>
            </div>
          )}
        </div>
      </section>

      {/* PRICING */}
      <section id="pricing" style={{ padding: "50px 16px", background: "linear-gradient(180deg, #0B1120 0%, #131B2E 100%)" }}>
        <div style={{ maxWidth: "600px", margin: "0 auto" }}>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "26px", textAlign: "center", marginBottom: "6px" }}>
            Transparent <span style={{ color: "#7DD3FC" }}>Pricing</span>
          </h2>
          <p style={{ textAlign: "center", fontSize: "13px", color: "#94A3B8", marginBottom: "24px" }}>No hidden fees. No surprises. Just honest pricing.</p>
          {PACKAGES.map((pkg, i) => {
            const specs = PACKAGE_SPECS[pkg.name];
            const isExpanded = expandedPkg[pkg.name];
            return (
              <div key={i} style={{ marginBottom: "10px" }}>
                <div className="price-row" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "16px", borderRadius: isExpanded ? "12px 12px 0 0" : "12px", background: "rgba(30,41,59,0.4)", border: "1px solid rgba(148,163,184,0.08)" }}>
                  <div>
                    <div style={{ fontSize: "15px", fontWeight: 600 }}>{pkg.name}</div>
                    <div style={{ fontSize: "11px", color: "#94A3B8", marginTop: "2px" }}>{pkg.note}</div>
                  </div>
                  <div style={{ textAlign: "right" }}>
                    <div style={{ fontSize: "18px", fontWeight: 700, color: "#7DD3FC" }}>{pkg.price}</div>
                    <div style={{ fontSize: "10px", color: "#22C55E", marginTop: "2px" }}>${pkg.deposit} deposit to book</div>
                  </div>
                </div>
                {specs && (
                  <>
                    <button
                      onClick={() => setExpandedPkg(prev => ({ ...prev, [pkg.name]: !prev[pkg.name] }))}
                      style={{ width: "100%", padding: "10px 16px", border: "none", borderTop: "1px solid rgba(148,163,184,0.06)", background: "rgba(30,41,59,0.25)", color: "#F472B6", fontSize: "13px", fontWeight: 500, cursor: "pointer", fontFamily: "'Outfit', sans-serif", borderRadius: isExpanded ? "0" : "0 0 12px 12px", transition: "all 0.2s" }}
                    >
                      {isExpanded ? "Hide Details \u25B4" : "See What's Included \u25BE"}
                    </button>
                    <div style={{ maxHeight: isExpanded ? "1400px" : "0", overflow: "hidden", transition: "max-height 0.4s ease" }}>
                      <div style={{ background: "rgba(244,114,182,0.04)", border: "1px solid rgba(244,114,182,0.12)", borderTop: "none", borderRadius: "0 0 10px 10px", padding: "16px" }}>
                        <div style={{ display: "flex", flexWrap: "wrap", gap: "8px", marginBottom: "12px" }}>
                          <div style={{ display: "inline-block", padding: "4px 12px", borderRadius: "12px", background: "rgba(125,211,252,0.1)", border: "1px solid rgba(125,211,252,0.2)", fontSize: "11px", color: "#7DD3FC" }}>
                            Estimated Time: {specs.time}
                          </div>
                          <div style={{ display: "inline-block", padding: "4px 12px", borderRadius: "12px", background: "rgba(125,211,252,0.1)", border: "1px solid rgba(125,211,252,0.2)", fontSize: "11px", color: "#7DD3FC" }}>
                            Capacity: {specs.capacity}
                          </div>
                        </div>
                        {specs.tierUp && (
                          <p style={{ fontSize: "13px", color: "#F472B6", fontStyle: "italic", margin: "0 0 8px" }}>{specs.tierUp}</p>
                        )}
                        {specs.items.map((item, j) => (
                          <div key={j} style={{ display: "flex", alignItems: "flex-start", gap: "8px", marginBottom: "4px" }}>
                            <span style={{ color: "#22C55E", fontSize: "12px", lineHeight: "1.8", flexShrink: 0 }}>{"\u2713"}</span>
                            <span style={{ fontSize: "13px", color: "#CBD5E1", lineHeight: 1.8 }}>{item}</span>
                          </div>
                        ))}
                        {specs.idealFor && (
                          <p style={{ fontSize: "12px", color: "#94A3B8", fontStyle: "italic", marginTop: "12px", marginBottom: 0 }}>Ideal for: {specs.idealFor}</p>
                        )}
                        {specs.note && (
                          <p style={{ fontSize: "11px", color: "#94A3B8", fontStyle: "italic", marginTop: "8px", marginBottom: 0, lineHeight: 1.5 }}>{specs.note}</p>
                        )}
                      </div>
                    </div>
                  </>
                )}
              </div>
            );
          })}

          <div style={{ marginTop: "20px", padding: "16px", borderRadius: "12px", background: "rgba(30,41,59,0.35)", border: "1px solid rgba(148,163,184,0.08)" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "10px" }}>
              <div>
                <div style={{ fontSize: "14px", fontWeight: 600 }}>Specialty Items</div>
                <div style={{ fontSize: "10px", color: "#94A3B8", marginTop: "2px" }}>Heavy item surcharge</div>
              </div>
              <div style={{ fontSize: "16px", fontWeight: 700, color: "#F472B6" }}>$50-$150/item</div>
            </div>
            <div style={{ fontSize: "12px", color: "#94A3B8", lineHeight: 1.8 }}>
              {SPECIALTY_ITEMS.map((item, i) => (
                <div key={i}>{"\u2022"} {item}</div>
              ))}
            </div>
          </div>

          <p style={{ textAlign: "center", fontSize: "11px", color: "#94A3B8", marginTop: "16px" }}>Deposit secures your appointment. Remaining balance due after completed service. Call to book with no deposit.</p>
        </div>
      </section>

      {/* WHAT WE HAUL */}
      <section style={{ padding: "50px 16px", background: "linear-gradient(180deg, #131B2E 0%, #0B1120 100%)" }}>
        <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "26px", textAlign: "center", marginBottom: "24px" }}>
          What We <span style={{ color: "#F472B6" }}>Haul</span>
        </h2>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px", maxWidth: "500px", margin: "0 auto" }}>
          {HAUL_CATEGORIES.map((cat, i) => (
            <div key={i} style={{ padding: "16px", borderRadius: "12px", background: "rgba(30,41,59,0.4)", border: "1px solid rgba(148,163,184,0.08)" }}>
              <div className="info-icon" style={{ fontSize: "28px", marginBottom: "8px", textAlign: "center" }}>{cat.icon}</div>
              <div style={{ fontSize: "13px", fontWeight: 600, marginBottom: "6px", textAlign: "center" }}>{cat.name}</div>
              <div style={{ fontSize: "10px", color: "#94A3B8", lineHeight: 1.5 }}>{cat.items}</div>
            </div>
          ))}
        </div>

        <div style={{ maxWidth: "500px", margin: "24px auto 0", padding: "16px", borderRadius: "12px", background: "rgba(239,68,68,0.06)", border: "1px solid rgba(239,68,68,0.15)" }}>
          <h4 style={{ fontSize: "13px", fontWeight: 600, color: "#EF4444", marginTop: 0, marginBottom: "8px" }}>Items We Cannot Haul</h4>
          {CANNOT_HAUL.map((item, i) => (
            <div key={i} style={{ fontSize: "12px", color: "#94A3B8", lineHeight: 1.8 }}>{"\u2022"} {item}</div>
          ))}
          <p style={{ fontSize: "11px", color: "#94A3B8", fontStyle: "italic", marginTop: "8px", marginBottom: 0 }}>If unsure whether an item qualifies, call us — we'll let you know before the crew arrives.</p>
        </div>
      </section>

      {/* AREAS */}
      <section style={{ padding: "50px 16px", background: "linear-gradient(180deg, #0B1120 0%, #131B2E 100%)" }}>
        <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "26px", textAlign: "center", marginBottom: "24px" }}>
          Areas We <span style={{ color: "#7DD3FC" }}>Serve</span>
        </h2>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "8px", justifyContent: "center", maxWidth: "600px", margin: "0 auto" }}>
          {AREAS.map((area, i) => (
            <span key={i} onMouseEnter={() => setHoveredArea(i)} onMouseLeave={() => setHoveredArea(null)}
              style={{
                padding: "8px 16px", borderRadius: "20px",
                border: hoveredArea === i ? "1px solid #F472B6" : "1px solid rgba(148,163,184,0.15)",
                background: hoveredArea === i ? "rgba(244,114,182,0.1)" : "rgba(30,41,59,0.3)",
                color: hoveredArea === i ? "#F472B6" : "#94A3B8",
                fontSize: "12px", fontWeight: 500, cursor: "pointer", transition: "all 0.2s",
              }}
            >{area}</span>
          ))}
        </div>
      </section>

      {/* CROSS-LINK */}
      <section style={{ padding: "30px 16px", background: "linear-gradient(180deg, #131B2E 0%, #0B1120 100%)", textAlign: "center" }}>
        <p style={{ fontSize: "13px", color: "#94A3B8", marginBottom: "12px" }}>We also offer:</p>
        <div style={{ display: "flex", gap: "10px", justifyContent: "center", flexWrap: "wrap" }}>
          {[{ name: "Pressure Washing", link: "magiccitypressurewashingmiami.com" }, { name: "Mobile Detailing", link: "magiccitydetailingmiami.com" }].map((s, i) => (
            <a key={i} href={`https://${s.link}`} target="_blank" rel="noopener noreferrer" style={{
              padding: "10px 20px", borderRadius: "10px", background: "rgba(30,41,59,0.4)", border: "1px solid rgba(148,163,184,0.1)",
              textDecoration: "none", color: "#7DD3FC", fontSize: "13px", fontWeight: 500,
            }} className="cross-link">{s.name} →</a>
          ))}
        </div>
      </section>

      {/* FOOTER */}
      <footer id="footer" style={{ padding: "30px 16px", textAlign: "center", borderTop: "1px solid rgba(148,163,184,0.1)", background: "#0B1120" }}>
        <div style={{ fontFamily: "'Playfair Display', serif", fontSize: "18px", fontWeight: 700, background: "linear-gradient(135deg, #F472B6, #7DD3FC)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", marginBottom: "8px" }}>Magic City Junk Removal</div>
        <p style={{ fontSize: "12px", color: "#94A3B8", marginBottom: "12px" }}>Miami-Dade • Broward • Palm Beach</p>
        <p style={{ fontSize: "12px", color: "#F472B6", fontWeight: 600, letterSpacing: "1px", marginBottom: "8px" }}>Contact Us:</p>
        <a href="tel:7868228281" style={{ fontSize: "14px", color: "#7DD3FC", textDecoration: "none", fontWeight: 600 }}>(786) 822-8281</a>
        <br />
        <a href="mailto:info@magiccityservicesmiami.com" style={{ fontSize: "13px", color: "#F472B6", textDecoration: "none", fontWeight: 500, marginTop: "6px", display: "inline-block" }}>info@magiccityservicesmiami.com</a>
        <p style={{ fontSize: "10px", color: "rgba(148,163,184,0.4)", marginTop: "16px" }}>© 2026 Magic City Services LLC. All rights reserved.</p>
      </footer>
    </div>
  );
}

const labelStyle = { fontSize: "11px", color: "#94A3B8", display: "block", marginBottom: "6px", letterSpacing: "0.5px", textTransform: "uppercase" };
const inputStyle = { width: "100%", padding: "11px 12px", borderRadius: "8px", border: "1px solid rgba(148,163,184,0.2)", background: "rgba(11,17,32,0.8)", color: "#F8FAFC", fontSize: "14px", fontFamily: "'Outfit', sans-serif", outline: "none", boxSizing: "border-box" };

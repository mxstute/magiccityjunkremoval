import { useState } from "react";

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

  const selectedPackage = selectedPkg !== null ? PACKAGES[selectedPkg] : null;
  const depositAmount = selectedPackage ? selectedPackage.deposit : 0;

  return (
    <div style={{ minHeight: "100vh", background: "#0B1120", color: "#F8FAFC", fontFamily: "'Outfit', sans-serif", overflowX: "hidden" }}>
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
            <div style={{ fontSize: "13px", fontWeight: 700, letterSpacing: "0.5px" }}>MAGIC CITY</div>
            <div style={{ fontSize: "8px", color: "#94A3B8", letterSpacing: "2px" }}>JUNK REMOVAL</div>
          </div>
        </div>
        <div style={{ display: "flex", gap: "20px", fontSize: "12px", fontWeight: 500 }}>
          {["PRICING", "BOOK NOW", "AREAS"].map(l => (
            <span key={l} style={{ color: "#94A3B8", cursor: "pointer", letterSpacing: "0.5px" }}>{l}</span>
          ))}
        </div>
        <div style={{ display: "flex", justifyContent: "flex-end" }}>
          <a href="tel:7868228281" style={{
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
        }}>
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
            <div key={i} style={{ textAlign: "center" }}>
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
              <button key={tab.id} onClick={() => setBookingTab(tab.id)}
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
                <button key={i} onClick={() => setSelectedPkg(i)}
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
                    {TIMES.map(t => <option key={t.value} value={t.value}>{t.label}</option>)}
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
              <input type="text" value={address} onChange={e => setAddress(e.target.value)} placeholder="Enter service address" style={{ ...inputStyle, marginBottom: "20px" }} />

              {selectedPackage && (
                <div style={{
                  padding: "14px", borderRadius: "12px", marginBottom: "14px",
                  background: "linear-gradient(135deg, rgba(34,197,94,0.08), rgba(125,211,252,0.08))",
                  border: "1px solid rgba(34,197,94,0.2)",
                  display: "flex", justifyContent: "space-between", alignItems: "center",
                }}>
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
                fontFamily: "inherit", opacity: selectedPackage ? 1 : 0.5,
              }}>
                {selectedPackage ? `Confirm Booking — $${depositAmount} Deposit` : "Select a package to continue"}
              </button>
              <p style={{ textAlign: "center", fontSize: "11px", color: "#94A3B8", marginTop: "10px", lineHeight: 1.4 }}>
                Deposit secures your time slot. Remaining balance due after service is completed to your satisfaction.<br />Final price confirmed after on-site estimate.
              </p>
            </div>
          )}

          {/* GET A QUOTE */}
          {bookingTab === "quote" && (
            <div style={{ padding: "24px 20px", borderRadius: "16px", background: "rgba(30,41,59,0.3)", border: "1px solid rgba(148,163,184,0.1)" }}>
              <div style={{ padding: "10px 14px", borderRadius: "10px", marginBottom: "16px", background: "rgba(34,197,94,0.08)", border: "1px solid rgba(34,197,94,0.15)", fontSize: "12px", color: "#22C55E", textAlign: "center", fontWeight: 500 }}>Free quote — no deposit required</div>
              <label style={labelStyle}>Full Name</label>
              <input type="text" placeholder="Your full name" style={{ ...inputStyle, marginBottom: "10px" }} />
              <label style={labelStyle}>Phone</label>
              <input type="tel" placeholder="(305) 000-0000" style={{ ...inputStyle, marginBottom: "10px" }} />
              <label style={labelStyle}>Email</label>
              <input type="email" placeholder="your@email.com" style={{ ...inputStyle, marginBottom: "10px" }} />
              <label style={labelStyle}>What needs to be removed?</label>
              <textarea placeholder="Tell us what you need hauled — furniture, debris, full cleanout, etc." rows={3} style={{ ...inputStyle, resize: "vertical", lineHeight: 1.5, marginBottom: "16px" }} />
              <button style={{ width: "100%", padding: "15px", borderRadius: "12px", border: "none", background: "linear-gradient(135deg, #F472B6, #7DD3FC)", color: "#0B1120", fontSize: "15px", fontWeight: 700, cursor: "pointer", fontFamily: "inherit" }}>Get My Free Quote</button>
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
      <section style={{ padding: "50px 16px", background: "linear-gradient(180deg, #0B1120 0%, #131B2E 100%)" }}>
        <div style={{ maxWidth: "600px", margin: "0 auto" }}>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "26px", textAlign: "center", marginBottom: "6px" }}>
            Transparent <span style={{ color: "#7DD3FC" }}>Pricing</span>
          </h2>
          <p style={{ textAlign: "center", fontSize: "13px", color: "#94A3B8", marginBottom: "24px" }}>No hidden fees. No surprises. Just honest pricing.</p>
          {PACKAGES.map((pkg, i) => (
            <div key={i} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "16px", marginBottom: "8px", borderRadius: "12px", background: "rgba(30,41,59,0.4)", border: "1px solid rgba(148,163,184,0.08)" }}>
              <div>
                <div style={{ fontSize: "15px", fontWeight: 600 }}>{pkg.name}</div>
                <div style={{ fontSize: "11px", color: "#94A3B8", marginTop: "2px" }}>{pkg.note}</div>
              </div>
              <div style={{ textAlign: "right" }}>
                <div style={{ fontSize: "18px", fontWeight: 700, color: "#7DD3FC" }}>{pkg.price}</div>
                <div style={{ fontSize: "10px", color: "#22C55E", marginTop: "2px" }}>${pkg.deposit} deposit to book</div>
              </div>
            </div>
          ))}
          <p style={{ textAlign: "center", fontSize: "11px", color: "#94A3B8", marginTop: "12px" }}>Deposit secures your appointment. Remaining balance due after completed service. Call to book with no deposit.</p>
        </div>
      </section>

      {/* WHAT WE HAUL */}
      <section style={{ padding: "50px 16px", background: "linear-gradient(180deg, #131B2E 0%, #0B1120 100%)" }}>
        <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "26px", textAlign: "center", marginBottom: "24px" }}>
          What We <span style={{ color: "#F472B6" }}>Haul</span>
        </h2>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px", maxWidth: "500px", margin: "0 auto" }}>
          {HAUL_ITEMS.map((item, i) => (
            <div key={i} style={{ padding: "16px", borderRadius: "12px", background: "rgba(30,41,59,0.4)", border: "1px solid rgba(148,163,184,0.08)", textAlign: "center" }}>
              <div style={{ fontSize: "28px", marginBottom: "8px" }}>{item.icon}</div>
              <div style={{ fontSize: "13px", fontWeight: 600, marginBottom: "4px" }}>{item.name}</div>
              <div style={{ fontSize: "10px", color: "#94A3B8", lineHeight: 1.3 }}>{item.desc}</div>
            </div>
          ))}
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
            }}>{s.name} →</a>
          ))}
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ padding: "30px 16px", textAlign: "center", borderTop: "1px solid rgba(148,163,184,0.1)", background: "#0B1120" }}>
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

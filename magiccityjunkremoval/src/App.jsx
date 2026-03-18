import { useState } from "react";

const PINK = "#F472B6";
const BLUE = "#7DD3FC";
const DARK = "#0B1120";
const DARK2 = "#111827";
const DARK3 = "#1E293B";
const LIGHT = "#F8FAFC";
const GRAY = "#94A3B8";
const PHONE = "(305) 555-0199";
const SERVICE = "Junk Removal";
const ACCENT = PINK;

function PhoneBtn({ full = false }) {
  return (
    <a href={`tel:${PHONE.replace(/\D/g, "")}`} style={{
      display: "inline-flex", alignItems: "center", gap: 10, padding: "16px 36px",
      background: ACCENT, color: "#fff", border: "none", borderRadius: 50,
      fontFamily: "'Outfit',sans-serif", fontSize: 17, fontWeight: 700,
      textDecoration: "none", letterSpacing: 0.5, width: full ? "100%" : "auto", justifyContent: "center",
    }}>📞 {PHONE}</a>
  );
}

function Nav() {
  return (
    <nav style={{
      position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
      background: "rgba(11,17,32,0.95)", backdropFilter: "blur(20px)",
      borderBottom: "1px solid rgba(244,114,182,0.08)",
    }}>
      <div style={{
        maxWidth: 1100, margin: "0 auto", display: "flex", alignItems: "center",
        justifyContent: "space-between", height: 64, padding: "0 max(20px,4vw)",
      }}>
        <a href="#top" style={{ textDecoration: "none", display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{ width: 34, height: 34, borderRadius: 8, background: PINK, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <div style={{ display: "flex", gap: 2, alignItems: "flex-end", height: 16 }}>
              {[10, 14, 12, 16, 13].map((h, i) => (
                <div key={i} style={{ width: 3, height: h, borderRadius: 1, background: i % 2 === 0 ? "#fff" : BLUE }} />
              ))}
            </div>
          </div>
          <div>
            <div style={{ fontFamily: "'Outfit',sans-serif", fontSize: 13, fontWeight: 700, color: PINK, letterSpacing: 1, lineHeight: 1.1 }}>MAGIC CITY</div>
            <div style={{ fontFamily: "'Outfit',sans-serif", fontSize: 8, fontWeight: 400, color: BLUE, letterSpacing: 3, lineHeight: 1.1 }}>JUNK REMOVAL</div>
          </div>
        </a>
        <PhoneBtn />
      </div>
    </nav>
  );
}

function Hero() {
  return (
    <section id="top" style={{
      minHeight: "100vh", display: "flex", alignItems: "center",
      background: `linear-gradient(165deg, ${DARK} 0%, #0F1B2E 40%, #1A1035 100%)`,
      position: "relative", overflow: "hidden", padding: "100px max(20px,4vw) 60px",
    }}>
      <div style={{ position: "absolute", top: "8%", right: "-8%", width: "55vw", height: "55vw", background: `radial-gradient(circle, rgba(244,114,182,0.07) 0%, transparent 70%)`, borderRadius: "50%" }} />
      <div style={{ maxWidth: 720, position: "relative", zIndex: 1 }}>
        <div style={{
          display: "inline-block", padding: "5px 16px", borderRadius: 50,
          border: "1px solid rgba(244,114,182,0.25)", marginBottom: 24,
          fontFamily: "'Outfit',sans-serif", fontSize: 11, fontWeight: 600, color: PINK, letterSpacing: 2, textTransform: "uppercase",
        }}>Miami-Dade County's #1 Junk Removal</div>

        <h1 style={{ fontFamily: "'Playfair Display',serif", fontSize: "clamp(34px,5.5vw,60px)", fontWeight: 700, color: LIGHT, lineHeight: 1.1, margin: "0 0 8px" }}>
          Fast, Affordable
        </h1>
        <h1 style={{
          fontFamily: "'Playfair Display',serif", fontSize: "clamp(34px,5.5vw,60px)", fontWeight: 700, lineHeight: 1.1, margin: "0 0 20px",
          background: `linear-gradient(135deg, ${PINK}, ${BLUE})`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
        }}>Junk Removal in Miami</h1>

        <p style={{ fontFamily: "'Outfit',sans-serif", fontSize: "clamp(15px,1.8vw,19px)", color: GRAY, lineHeight: 1.7, maxWidth: 540, marginBottom: 32 }}>
          From garage cleanouts to construction debris — we haul it all away, same day. No hidden fees, no hassle. Just a clean space and a fair price.
        </p>

        <div style={{ display: "flex", gap: 14, flexWrap: "wrap", marginBottom: 48 }}>
          <PhoneBtn />
          <a href="#pricing" style={{
            display: "inline-flex", alignItems: "center", gap: 8, padding: "16px 32px",
            background: "transparent", color: BLUE, border: `1.5px solid rgba(125,211,252,0.25)`,
            borderRadius: 50, fontFamily: "'Outfit',sans-serif", fontSize: 16, fontWeight: 600, textDecoration: "none",
          }}>See Pricing ↓</a>
        </div>

        <div style={{ display: "flex", gap: 36, flexWrap: "wrap" }}>
          {[{ v: "Same Day", l: "Service Available" }, { v: "No", l: "Hidden Fees" }, { v: "All", l: "Junk Types" }].map(s => (
            <div key={s.l}>
              <div style={{ fontFamily: "'Outfit',sans-serif", fontSize: 24, fontWeight: 700, color: LIGHT }}>{s.v}</div>
              <div style={{ fontFamily: "'Outfit',sans-serif", fontSize: 11, color: GRAY, letterSpacing: 1, textTransform: "uppercase" }}>{s.l}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function WhatWeHaul() {
  const items = [
    { icon: "🛋️", title: "Furniture", desc: "Couches, mattresses, tables, dressers — any size, any condition" },
    { icon: "🏗️", title: "Construction Debris", desc: "Drywall, lumber, tile, concrete, renovation waste" },
    { icon: "📦", title: "Garage & Storage", desc: "Full cleanouts for garages, sheds, storage units, and attics" },
    { icon: "🏠", title: "Estate Cleanouts", desc: "Complete property cleanouts for estates, foreclosures, and move-outs" },
    { icon: "🖥️", title: "Appliances & E-Waste", desc: "Refrigerators, washers, dryers, TVs, computers — responsibly disposed" },
    { icon: "🌿", title: "Yard Debris", desc: "Branches, stumps, dirt, landscaping waste, and storm cleanup" },
  ];

  return (
    <section style={{ background: DARK2, padding: "80px max(20px,4vw)" }}>
      <div style={{ maxWidth: 1000, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 48 }}>
          <div style={{ fontFamily: "'Outfit',sans-serif", fontSize: 11, fontWeight: 600, color: PINK, letterSpacing: 3, textTransform: "uppercase", marginBottom: 10 }}>What We Haul</div>
          <h2 style={{ fontFamily: "'Playfair Display',serif", fontSize: "clamp(26px,4vw,40px)", fontWeight: 700, color: LIGHT, margin: 0 }}>If You Don't Want It, We'll Take It</h2>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 16 }}>
          {items.map(it => (
            <div key={it.title} style={{
              background: DARK3, borderRadius: 16, padding: "24px 28px",
              border: "1px solid rgba(255,255,255,0.03)", display: "flex", gap: 16, alignItems: "flex-start",
            }}>
              <span style={{ fontSize: 28, flexShrink: 0 }}>{it.icon}</span>
              <div>
                <h4 style={{ fontFamily: "'Outfit',sans-serif", fontSize: 15, fontWeight: 600, color: LIGHT, margin: "0 0 4px" }}>{it.title}</h4>
                <p style={{ fontFamily: "'Outfit',sans-serif", fontSize: 13, color: GRAY, lineHeight: 1.6, margin: 0 }}>{it.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Pricing() {
  const tiers = [
    { name: "Single Item", price: "$79+", desc: "One large item pickup", items: ["1 large item (couch, mattress, appliance)", "Loading & hauling included", "Same-day available"], highlight: false },
    { name: "Partial Load", price: "$249+", desc: "Up to half a truck", items: ["Fills roughly half a standard truck", "Great for small cleanouts", "Multiple item types accepted", "Eco-friendly disposal"], highlight: true },
    { name: "Full Load", price: "$449+", desc: "Full truckload", items: ["Entire truck bed loaded", "Garage & estate cleanouts", "Construction debris welcome", "Priority scheduling"], highlight: false },
  ];

  return (
    <section id="pricing" style={{ background: `linear-gradient(180deg, ${DARK} 0%, ${DARK2} 100%)`, padding: "80px max(20px,4vw)" }}>
      <div style={{ maxWidth: 1000, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 48 }}>
          <div style={{ fontFamily: "'Outfit',sans-serif", fontSize: 11, fontWeight: 600, color: BLUE, letterSpacing: 3, textTransform: "uppercase", marginBottom: 10 }}>Transparent Pricing</div>
          <h2 style={{ fontFamily: "'Playfair Display',serif", fontSize: "clamp(26px,4vw,40px)", fontWeight: 700, color: LIGHT, margin: "0 0 12px" }}>Simple, Honest Pricing</h2>
          <p style={{ fontFamily: "'Outfit',sans-serif", fontSize: 15, color: GRAY }}>No surprise charges. The price we quote is the price you pay.</p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 20 }}>
          {tiers.map(t => (
            <div key={t.name} style={{
              background: DARK3, borderRadius: 20, padding: 32,
              border: t.highlight ? `1.5px solid ${PINK}44` : "1px solid rgba(255,255,255,0.04)",
              position: "relative", overflow: "hidden",
            }}>
              {t.highlight && <div style={{
                position: "absolute", top: 14, right: -28, background: PINK, color: "#fff",
                fontFamily: "'Outfit',sans-serif", fontSize: 10, fontWeight: 700, letterSpacing: 1,
                padding: "4px 36px", transform: "rotate(45deg)", textTransform: "uppercase",
              }}>Popular</div>}
              <h3 style={{ fontFamily: "'Outfit',sans-serif", fontSize: 18, fontWeight: 700, color: LIGHT, margin: "0 0 4px" }}>{t.name}</h3>
              <p style={{ fontFamily: "'Outfit',sans-serif", fontSize: 13, color: GRAY, margin: "0 0 16px" }}>{t.desc}</p>
              <div style={{ fontFamily: "'Playfair Display',serif", fontSize: 36, fontWeight: 700, color: PINK, marginBottom: 20 }}>{t.price}</div>
              <ul style={{ listStyle: "none", padding: 0, margin: "0 0 24px" }}>
                {t.items.map(i => (
                  <li key={i} style={{ fontFamily: "'Outfit',sans-serif", fontSize: 13, color: "#CBD5E1", padding: "7px 0", borderBottom: "1px solid rgba(255,255,255,0.03)", display: "flex", gap: 8, alignItems: "center" }}>
                    <span style={{ color: PINK, fontSize: 9 }}>●</span>{i}
                  </li>
                ))}
              </ul>
              <a href={`tel:${PHONE.replace(/\D/g, "")}`} style={{
                display: "block", textAlign: "center", padding: "12px 0", borderRadius: 50,
                background: t.highlight ? PINK : "transparent",
                border: t.highlight ? "none" : `1px solid ${PINK}44`,
                color: t.highlight ? "#fff" : PINK,
                fontFamily: "'Outfit',sans-serif", fontSize: 14, fontWeight: 700, textDecoration: "none",
              }}>Book Now →</a>
            </div>
          ))}
        </div>

        <p style={{ fontFamily: "'Outfit',sans-serif", fontSize: 13, color: GRAY, textAlign: "center", marginTop: 24, fontStyle: "italic" }}>
          Exact pricing depends on volume and material type. Call for a free on-site estimate.
        </p>
      </div>
    </section>
  );
}

function Process() {
  const s = [
    { n: "01", t: "Call or Text", d: "Tell us what needs to go. Photos help us give you a faster quote." },
    { n: "02", t: "Instant Quote", d: "We'll give you a price within minutes — no obligation." },
    { n: "03", t: "We Show Up", d: "Our crew arrives on schedule, loads everything, and sweeps up." },
    { n: "04", t: "Done & Gone", d: "Your junk disappears. We donate and recycle what we can." },
  ];
  return (
    <section style={{ background: DARK2, padding: "80px max(20px,4vw)" }}>
      <div style={{ maxWidth: 900, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 48 }}>
          <div style={{ fontFamily: "'Outfit',sans-serif", fontSize: 11, fontWeight: 600, color: PINK, letterSpacing: 3, textTransform: "uppercase", marginBottom: 10 }}>How It Works</div>
          <h2 style={{ fontFamily: "'Playfair Display',serif", fontSize: "clamp(26px,4vw,40px)", fontWeight: 700, color: LIGHT, margin: 0 }}>Junk Gone in 4 Steps</h2>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(190px,1fr))", gap: 24 }}>
          {s.map((step, i) => (
            <div key={step.n} style={{ textAlign: "center" }}>
              <div style={{
                width: 48, height: 48, borderRadius: 14, margin: "0 auto 16px",
                display: "flex", alignItems: "center", justifyContent: "center",
                background: i === 0 ? PINK : "rgba(244,114,182,0.08)", border: i === 0 ? "none" : `1px solid rgba(244,114,182,0.12)`,
              }}>
                <span style={{ fontFamily: "'Outfit',sans-serif", fontSize: 16, fontWeight: 700, color: i === 0 ? "#fff" : PINK }}>{step.n}</span>
              </div>
              <h4 style={{ fontFamily: "'Outfit',sans-serif", fontSize: 15, fontWeight: 600, color: LIGHT, margin: "0 0 6px" }}>{step.t}</h4>
              <p style={{ fontFamily: "'Outfit',sans-serif", fontSize: 13, color: GRAY, lineHeight: 1.6 }}>{step.d}</p>
            </div>
          ))}
        </div>
        <div style={{ textAlign: "center", marginTop: 40 }}><PhoneBtn /></div>
      </div>
    </section>
  );
}

function Areas() {
  const a = ["Miami", "Miami Beach", "Coral Gables", "Hialeah", "Doral", "Kendall", "Homestead", "Aventura", "North Miami", "Brickell", "Wynwood", "Coconut Grove", "Key Biscayne", "Pinecrest", "Palmetto Bay", "Little Havana"];
  return (
    <section style={{ background: DARK, padding: "80px max(20px,4vw)" }}>
      <div style={{ maxWidth: 800, margin: "0 auto", textAlign: "center" }}>
        <div style={{ fontFamily: "'Outfit',sans-serif", fontSize: 11, fontWeight: 600, color: BLUE, letterSpacing: 3, textTransform: "uppercase", marginBottom: 10 }}>Service Area</div>
        <h2 style={{ fontFamily: "'Playfair Display',serif", fontSize: "clamp(26px,4vw,38px)", fontWeight: 700, color: LIGHT, margin: "0 0 24px" }}>Junk Removal Across Miami-Dade</h2>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 8, justifyContent: "center", marginBottom: 24 }}>
          {a.map(x => (
            <span key={x} style={{ padding: "7px 16px", borderRadius: 50, background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.05)", fontFamily: "'Outfit',sans-serif", fontSize: 12, fontWeight: 500, color: "#CBD5E1" }}>{x}</span>
          ))}
        </div>
        <p style={{ fontFamily: "'Outfit',sans-serif", fontSize: 14, color: GRAY }}>
          Don't see your neighborhood? <a href={`tel:${PHONE.replace(/\D/g,"")}`} style={{ color: PINK, textDecoration: "none", fontWeight: 600 }}>Call us</a> — we probably cover it.
        </p>
      </div>
    </section>
  );
}

function CTA() {
  return (
    <section style={{ background: `linear-gradient(135deg, ${PINK}22, ${BLUE}11)`, padding: "80px max(20px,4vw)" }}>
      <div style={{ maxWidth: 600, margin: "0 auto", textAlign: "center" }}>
        <div style={{ fontSize: 48, marginBottom: 16 }}>🚛</div>
        <h2 style={{ fontFamily: "'Playfair Display',serif", fontSize: "clamp(26px,4vw,40px)", fontWeight: 700, color: LIGHT, margin: "0 0 12px" }}>Ready to Clear the Clutter?</h2>
        <p style={{ fontFamily: "'Outfit',sans-serif", fontSize: 16, color: GRAY, lineHeight: 1.7, marginBottom: 32 }}>
          Call now for a free, no-obligation quote. Same-day junk removal available throughout Miami-Dade County.
        </p>
        <PhoneBtn />
        <p style={{ fontFamily: "'Outfit',sans-serif", fontSize: 13, color: GRAY, marginTop: 20 }}>
          or visit <a href="https://magiccityservices.com" style={{ color: BLUE, textDecoration: "none", fontWeight: 600 }}>magiccityservices.com</a> for all our services
        </p>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer style={{ background: DARK, padding: "40px max(20px,4vw) 20px", borderTop: "1px solid rgba(255,255,255,0.04)" }}>
      <div style={{ maxWidth: 1000, margin: "0 auto", display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 16, alignItems: "center" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <div style={{ fontFamily: "'Outfit',sans-serif", fontSize: 12, fontWeight: 700, color: PINK }}>MAGIC CITY</div>
          <div style={{ fontFamily: "'Outfit',sans-serif", fontSize: 8, color: BLUE, letterSpacing: 2 }}>JUNK REMOVAL</div>
        </div>
        <span style={{ fontFamily: "'Outfit',sans-serif", fontSize: 11, color: "#475569" }}>© 2026 Magic City Services LLC — Licensed & Insured — Miami-Dade, FL</span>
      </div>
    </footer>
  );
}

export default function JunkRemovalPage() {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700&family=Playfair+Display:wght@700&display=swap');
        *,*::before,*::after{box-sizing:border-box;margin:0}
        html{scroll-behavior:smooth}body{background:${DARK}}
        ::selection{background:${PINK}44;color:#fff}
      `}</style>
      <Nav /><Hero /><WhatWeHaul /><Pricing /><Process /><Areas /><CTA /><Footer />
    </>
  );
}

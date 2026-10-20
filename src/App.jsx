import { useState } from "react";
import { Page, Promo, Nav, Hero, Tiles, How, Booking, Pricing, PriceList, Areas, Band, Footer, goTo, ArrowIcon } from "./SiteKit";

/*
  MAGIC CITY JUNK REMOVAL — v4 (Oct 2026 redesign)
  Layout and booking live in SiteKit.jsx (shared with the other Magic City sites).
  Deposit amounts are enforced server-side in api/create-checkout.js.
*/

const PACKAGES = [
  { name: "Minimum Pickup", price: "$149", deposit: 40, note: "1-2 bulky items: couch, mattress, appliance", tag: null },
  { name: "Quarter Truck Load", price: "$249", deposit: 65, note: "A few large items or a small pile", tag: null },
  { name: "Half Truck Load", price: "$400", deposit: 75, note: "Furniture, appliances, small cleanouts", tag: null },
  { name: "Three-Quarter Truck Load", price: "$575", deposit: 150, note: "Multiple rooms or a packed garage", tag: null },
  { name: "Full Truck Load", price: "$750", deposit: 275, note: "Garage, storage unit, large hauls", tag: "Most Popular" },
  { name: "Complete Cleanout", price: "$1,350+", deposit: 425, note: "Entire property / estate cleanout (2 loads)", tag: "Full Service" },
];


const PACKAGE_SPECS = {
  "Minimum Pickup": {
    time: "15-30 minutes on-site",
    capacity: "1-2 bulky items",
    items: [
      "Professional crew arrival with truck and equipment",
      "Couch, mattress and box spring, recliner, dresser, or one appliance",
      "Loading and hauling (you point, we carry)",
      "Responsible disposal: recycling, donation, and landfill as appropriate",
      "All labor, loading, transport, and dump fees included in price",
    ],
    idealFor: "A single couch or mattress, one old appliance, a couple of bulky items you can't fit in your car.",
  },
  "Quarter Truck Load": {
    time: "20-45 minutes on-site",
    capacity: "Approximately 1/4 of a truck (about 2-4 large items)",
    items: [
      "Professional crew arrival with truck and equipment",
      "Furniture, mattresses, small appliances, boxes and bags",
      "Yard waste and loose debris",
      "Sweep of area after removal",
      "All labor, loading, transport, and dump fees included in price",
    ],
    idealFor: "A few pieces of furniture, a small pile of boxes, a quick move-out leftover haul.",
  },
  "Three-Quarter Truck Load": {
    time: "1-1.5 hours on-site",
    capacity: "Approximately 3/4 of a truck (about 5-10 large items)",
    tierUp: "Everything in Half Truck Load, PLUS:",
    items: [
      "Multiple rooms or areas in one trip",
      "Large appliances (refrigerators, washers, dryers)",
      "Patio furniture, grills, exercise equipment",
      "Full sweep and cleanup of all removal areas",
      "All labor, loading, transport, and dump fees included",
    ],
    idealFor: "A packed garage, a small apartment move-out, or a bedroom plus living room clearout.",
  },
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
      "Up to 2 full truck loads included; additional loads $650 each",
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
    note: "Final price depends on total volume and number of truck loads required. Starting price of $1,350 covers up to 2 full truck loads; each additional load is $650. Phone or on-site estimate provided before work begins.",
  },
};

const SPECIALTY_ITEMS = [
  "Piano (upright or grand)",
  "Hot tub / jacuzzi (full removal quoted separately, from $400)",
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

const PHONE = "7868228281";
const PHONE_DISPLAY = "(786) 822-8281";

const TILES = [
  { name: "Furniture & mattresses", from: "From $149", pkg: 0, img: "/images/v4/junk-removal-crew", cta: "Book a pickup", blurb: "Couches, mattresses, dressers and patio sets. One bulky item or a whole room." },
  { name: "Garage & storage cleanouts", from: "From $400", pkg: 2, img: "/images/v4/garage-cleanout", cta: "Book a cleanout", blurb: "Boxes, bikes, old gym equipment and years of clutter, gone in one visit." },
  { name: "Appliances & electronics", from: "From $149", pkg: 0, img: "/images/v4/appliance-removal", cta: "Book a pickup", blurb: "Fridges, washers, dryers, water heaters and TVs, recycled where possible." },
  { name: "Construction & yard debris", from: "From $249", pkg: 1, img: "/images/v4/construction-debris", cta: "Book a haul", blurb: "Drywall, wood, old cabinets, palm fronds and landscaping waste." },
];

export default function JunkRemovalSite() {
  const [selectedPkg, setSelectedPkg] = useState(null);
  const [tab, setTab] = useState("book");
  const [openKey, setOpenKey] = useState(null);

  const pick = (t) => { setSelectedPkg(t.pkg); setTab("book"); goTo("booking"); };

  return (
    <Page>
      <Promo />
      <Nav sub="Junk Removal" phone={PHONE} phoneDisplay={PHONE_DISPLAY}
        links={[{ id: "services", label: "What we take" }, { id: "pricing", label: "Pricing" }, { id: "how", label: "How it works" }, { id: "areas", label: "Areas" }]} />

      <Hero
        img="/images/v4/hero-garage-loadout.webp"
        mobileImg="/images/v4/hero-garage-loadout-mobile.webp"
        alt="Junk removal crew loading furniture from a garage into a truck outside a Miami home"
        where="Miami-Dade, Broward and Palm Beach"
        title="Junk removal and cleanouts, done in one visit"
        copy="Pick a truck size, pay a small deposit to hold your time, and we'll do all the lifting. Loading, hauling and dump fees are included in every price."
        bookLabel="Book a pickup"
        phone={PHONE} phoneDisplay={PHONE_DISPLAY}
        facts={[["From $149", "Minimum pickup for 1 or 2 bulky items"], ["You point, we carry", "No need to move anything to the curb"], ["Hablamos español", "Call or book in Spanish"]]}
      />

      <Tiles id="services" heading="What we haul away" lede="Tap a job to start a booking with the right package already picked. Not sure what size you need? Ask for a free quote and send us a photo."
        tiles={TILES} onPick={pick} />

      <How img="/images/v4/crew-and-homeowner" alt="Crew lead showing a homeowner the cleared-out garage" />

      <Booking service="Junk Removal" siteName="magiccityjunkremovalmiami.com" heading="Book your pickup"
        intro="Choose a truck size and a time, then pay a small deposit to hold it. Not sure how much you have? Get a free quote first, or call us."
        packages={PACKAGES} selectedPkg={selectedPkg} setSelectedPkg={setSelectedPkg} tab={tab} setTab={setTab}
        phone={PHONE} phoneDisplay={PHONE_DISPLAY}
        quoteOptions={["Junk removal", "Garage or storage cleanout", "Full property or estate cleanout", "Construction or yard debris", "Something else"]}
        quotePrompt="What needs to go?" quotePlaceholder="List the items or describe the space. Photos help: you can text them to us after." />

      <Pricing heading="Truck load pricing" lede="Every price includes the crew, loading, hauling and dump fees. Your exact price is confirmed on site before we load anything."
        img="/images/v4/garage-cleanout" imgAlt="Garage cleanout in progress">
        <PriceList packages={PACKAGES} specs={PACKAGE_SPECS} openKey={openKey} setOpenKey={setOpenKey} />
        <div className="extra-box">
          <div className="price-row">
            <div><h3>Heavy and specialty items</h3><p>Added to any package</p></div>
            <span className="price-amt">$75–$150</span>
          </div>
          <ul>{SPECIALTY_ITEMS.map(i => <li key={i}>{i}</li>)}</ul>
        </div>
        <p className="fine">Book any package online with a deposit, or call for a free quote first.</p>
      </Pricing>

      <section className="section info">
        <div className="wrap">
          <div className="section-head">
            <h2 className="h2">What we take</h2>
            <p className="lede">If it's not on the list, ask. We'll tell you before the crew shows up.</p>
          </div>
          <ul className="info-grid">
            {HAUL_CATEGORIES.map(c => <li key={c.name}><h3>{c.name}</h3><p>{c.items}</p></li>)}
          </ul>
          <div className="callout">
            <h3>Items we can't take</h3>
            <ul>{CANNOT_HAUL.map(i => <li key={i}>{i}</li>)}</ul>
            <p>Not sure about something? Call {PHONE_DISPLAY} and we'll let you know.</p>
          </div>
        </div>
      </section>

      <Areas alt prefix="junk-removal" />
      <Band phone={PHONE} phoneDisplay={PHONE_DISPLAY} onQuote={() => { setTab("quote"); goTo("booking"); }} />
      <Footer services={[["furniture-removal", "Furniture removal"], ["appliance-removal", "Appliance removal"], ["garage-cleanout", "Garage cleanouts"], ["estate-cleanout", "Estate cleanouts"], ["construction-debris-removal", "Construction debris"]]} sub="Junk Removal" current="Junk Removal" phone={PHONE} phoneDisplay={PHONE_DISPLAY}
        about="Magic City Junk Removal hauls furniture, appliances, debris and full cleanouts across South Florida with vetted, insured local crews. Part of Magic City Services." />
    </Page>
  );
}

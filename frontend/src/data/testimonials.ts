/**
 * ⚠️ DEMO CONTENT — placeholder testimonials for review only.
 * These are NOT real client quotes. They are generic and unattributed on
 * purpose. Replace with real, approved client testimonials before launch,
 * or remove the section until real ones are available.
 */
export type Testimonial = {
  name: string;
  role: string;
  org: string;
  quote: string;
};

export const testimonials: Testimonial[] = [
  {
    name: "Home Owner",
    role: "Residential Client",
    org: "Bahria Town",
    quote:
      "They handled everything from the map approval to the finished house. Costing was clear from day one and the site work actually moved on schedule — we got the keys without any nasty surprises.",
  },
  {
    name: "Plot Owner",
    role: "Design & Map Client",
    org: "Rehbar Society",
    quote:
      "Getting the map approved from the society used to feel impossible. Bricks N Builders prepared the drawings, handled the submission and followed up until it was approved. Very easy to deal with.",
  },
  {
    name: "Investor",
    role: "Commercial Client",
    org: "Chakri Road",
    quote:
      "The plaza was delivered close to the timeline we agreed and the finish quality was better than I expected for the budget. Honest people — I have already recommended them to family.",
  },
];

import type { Metadata } from "next";
import ContactForm from "@/components/ContactForm";
import { company } from "@/data/company";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Contact GEO Group of Companies at I-14/3, Islamabad for architecture, soil testing, construction, real estate marketing and material supply.",
};

export default function ContactPage() {
  const wa = `https://wa.me/${company.whatsapp}?text=${encodeURIComponent(
    company.whatsappMessage
  )}`;

  return (
    <section className="relative overflow-hidden pb-28 pt-32 sm:pt-40">
      <div className="glow pointer-events-none absolute inset-x-0 top-0 h-[70vh]" />

      <div className="relative mx-auto max-w-[1400px] px-5 sm:px-8">
        <p className="eyebrow">Contact</p>
        <h1 className="display mt-5 text-[13vw] leading-[0.9] sm:text-[8vw] lg:text-[5.2vw]">
          <span className="lead">Let&rsquo;s talk</span>
          <span>
            about your <span className="hot">project</span>
          </span>
        </h1>

        <div className="mt-16 grid gap-14 lg:grid-cols-[1.1fr_1fr] lg:gap-20">
          {/* form */}
          <div>
            <h2 className="text-xl font-semibold sm:text-2xl">Send us an enquiry</h2>
            <p className="mt-2 text-sm text-[#8a8a8a]">
              Tell us the scope and location &mdash; the right GEO specialist will respond.
            </p>
            <div className="mt-8">
              <ContactForm />
            </div>
          </div>

          {/* details */}
          <div className="space-y-10">
            <div>
              <h2 className="text-xl font-semibold sm:text-2xl">Reach us directly</h2>
              <div className="mt-6 space-y-3">
                <a
                  href={wa}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between rounded-sm border border-[#242424] p-4 transition-colors hover:border-[#25D366]"
                >
                  <span className="text-sm text-white">WhatsApp</span>
                  <span className="text-sm text-[#8a8a8a]">{company.offices[0].phones[0]}</span>
                </a>
                <a
                  href={`mailto:${company.email}`}
                  className="flex items-center justify-between rounded-sm border border-[#242424] p-4 transition-colors hover:border-[#d2a24c]"
                >
                  <span className="text-sm text-white">Email</span>
                  <span className="text-sm text-[#8a8a8a]">{company.email}</span>
                </a>
              </div>
            </div>

            {company.offices.map((o) => (
              <div key={o.label}>
                <p className="eyebrow">{o.label}</p>
                <address className="mt-3 space-y-1 text-sm not-italic text-[#b4b4b4]">
                  {o.lines.map((l) => (
                    <p key={l}>{l}</p>
                  ))}
                </address>
                <div className="mt-3 flex flex-wrap gap-x-5 gap-y-1">
                  {o.phones.map((p) => (
                    <a
                      key={p}
                      href={`tel:${p}`}
                      className="text-sm text-[#8a8a8a] transition-colors hover:text-[#d2a24c]"
                    >
                      {p}
                    </a>
                  ))}
                </div>
              </div>
            ))}

            <div>
              <p className="eyebrow">Registrations</p>
              <ul className="mt-3 space-y-1 text-sm text-[#b4b4b4]">
                {company.certifications.map((c) => (
                  <li key={c.code}>
                    {c.title} — <span className="text-[#8a8a8a]">{c.code}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="relative aspect-[16/10] overflow-hidden rounded-sm border border-[#242424]">
              <iframe
                title="GEO Group of Companies — I-14/3, Islamabad"
                src="https://www.openstreetmap.org/export/embed.html?bbox=72.93%2C33.63%2C72.99%2C33.69&layer=mapnik"
                className="h-full w-full grayscale"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

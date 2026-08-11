import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { services } from "@/data/services";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Soil testing, architectural designing, construction, real estate marketing and material supply by GEO Group of Companies.",
};

const covers = [
  "/img/planning-gantt.jpg",
  "/img/survey-setout.jpg",
  "/img/concrete-pour.jpg",
  "/img/interior-floor.jpg",
  "/img/townhouse-karen.jpg",
  "/img/hall-interior.jpg",
];

export default function ServicesPage() {
  return (
    <>
      <section className="relative overflow-hidden pb-16 pt-32 sm:pt-40">
        <div className="glow pointer-events-none absolute inset-0" />
        <div className="relative mx-auto max-w-[1400px] px-5 sm:px-8">
          <p className="eyebrow">Capabilities</p>
          <h1 className="display mt-5 text-[13vw] leading-[0.9] sm:text-[8vw] lg:text-[5.2vw]">
            <span className="lead">What we</span>
            <span>
              deliver on <span className="hot">site</span>
            </span>
          </h1>
          <p className="mt-8 max-w-2xl text-base leading-relaxed text-[#9a9a9a] sm:text-lg">
            Five connected capabilities under one group &mdash; from evidence beneath the
            foundation and design on paper to delivery on site and market.
          </p>
        </div>
      </section>

      <section className="pb-24">
        <div className="mx-auto max-w-[1400px] px-5 sm:px-8">
          {services.map((s, i) => (
            <div
              key={s.slug}
              id={s.slug}
              className="grid scroll-mt-28 gap-8 border-t border-[#1f1f1f] py-14 lg:grid-cols-[1fr_1.1fr] lg:gap-16"
            >
              <div className={i % 2 === 1 ? "lg:order-2" : ""}>
                <div className="relative aspect-[16/10] overflow-hidden rounded-sm">
                  <Image
                    src={covers[i % covers.length]}
                    alt={s.title}
                    fill
                    sizes="(max-width: 1024px) 100vw, 45vw"
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a]/70 to-transparent" />
                </div>
              </div>

              <div className={i % 2 === 1 ? "lg:order-1" : ""}>
                <span className="text-xs text-[#4a4a4a]">
                  {String(i + 1).padStart(2, "0")} &mdash; Service
                </span>
                <h2 className="mt-3 text-2xl font-semibold leading-tight sm:text-3xl lg:text-4xl">
                  {s.title}
                </h2>
                <p className="mt-5 text-base leading-relaxed text-[#9a9a9a]">{s.blurb}</p>

                <ul className="mt-7 grid gap-2.5 sm:grid-cols-2">
                  {s.points.map((pt) => (
                    <li key={pt} className="flex gap-3 text-sm text-[#b4b4b4]">
                      <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-[#d2a24c]" />
                      {pt}
                    </li>
                  ))}
                </ul>

                <Link
                  href="/contact"
                  className="mt-8 inline-flex items-center gap-2 text-sm text-[#d2a24c] transition-opacity hover:opacity-75"
                >
                  Enquire about this service <span aria-hidden>&rarr;</span>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}

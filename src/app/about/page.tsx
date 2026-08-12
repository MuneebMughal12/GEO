import type { Metadata } from "next";
import RevealText from "@/components/RevealText";
import Counter from "@/components/Counter";
import HexGrid from "@/components/HexGrid";
import { company } from "@/data/company";
import { getTeamMembers } from "@/lib/team-repo";
import DivisionTeams from "@/components/DivisionTeams";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "About",
  description:
    "Meet GEO Group of Companies, an integrated team for architecture, soil testing, construction, real estate marketing and material supply.",
};

export default async function AboutPage() {
  const team = await getTeamMembers();
  return (
    <>
      {/* hero */}
      <section className="relative overflow-hidden pb-20 pt-32 sm:pt-40">
        <div className="glow pointer-events-none absolute inset-0" />
        <div className="relative mx-auto max-w-[1400px] px-5 sm:px-8">
          <p className="eyebrow">About us</p>
          <h1 className="display mt-5 text-[13vw] leading-[0.9] sm:text-[8vw] lg:text-[5.2vw]">
            <span className="lead">We build</span>
            <span>
              a <span className="hot">smile</span>
            </span>
          </h1>
          <p className="mt-8 max-w-2xl text-base leading-relaxed text-[#9a9a9a] sm:text-lg">
            {company.tagline} &middot; Soil Testing, Designing &amp; Construction &middot; Islamabad
          </p>
        </div>
      </section>

      {/* intro */}
      <section className="py-16 sm:py-24">
        <div className="mx-auto max-w-[1400px] px-5 sm:px-8">
          <div>
            <RevealText className="text-xl font-medium leading-snug sm:text-2xl">
              {company.intro}
            </RevealText>
            <RevealText className="mt-7 text-base leading-relaxed text-[#9a9a9a] sm:text-lg">
              {company.ethos}
            </RevealText>

            <div className="mt-12 grid grid-cols-2 gap-8 sm:grid-cols-4">
              {company.stats.map((s) => (
                <div key={s.label}>
                  <p className="text-4xl font-bold tracking-tight sm:text-5xl">
                    <Counter to={s.value} suffix={s.suffix} />
                  </p>
                  <p className="mt-1 text-xs text-[#8a8a8a]">{s.label}</p>
                </div>
              ))}
            </div>
          </div>

        </div>
      </section>

      <DivisionTeams team={team} />

      {/* mission / vision / values */}
      <section className="border-y border-[#1f1f1f] py-20 sm:py-28">
        <div className="mx-auto max-w-[1400px] px-5 sm:px-8">
          <h2 className="display text-[10vw] leading-[0.9] sm:text-[6vw] lg:text-[4vw]">
            <span className="lead">What we</span>
            <span>
              stand <span className="hot">for</span>
            </span>
          </h2>

          <div className="mt-14 grid gap-px overflow-hidden rounded-sm bg-[#1f1f1f] md:grid-cols-3">
            <div className="bg-[#0a0a0a] p-7">
              <p className="eyebrow">Mission</p>
              <ul className="mt-4 space-y-3">
                {company.mission.map((m) => (
                  <li key={m} className="flex gap-3 text-sm leading-relaxed text-[#b4b4b4]">
                    <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-[#d2a24c]" />
                    {m}
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-[#0a0a0a] p-7">
              <p className="eyebrow">Vision</p>
              <p className="mt-4 text-sm leading-relaxed text-[#b4b4b4]">{company.vision}</p>
            </div>
            <div className="bg-[#0a0a0a] p-7">
              <p className="eyebrow">Values</p>
              <p className="mt-4 text-sm leading-relaxed text-[#b4b4b4]">{company.values}</p>
            </div>
          </div>
        </div>
      </section>

      {/* certifications */}
      <section className="py-20 sm:py-28">
        <div className="mx-auto max-w-[1400px] px-5 sm:px-8">
          <h2 className="display text-[10vw] leading-[0.9] sm:text-[6vw] lg:text-[4vw]">
            <span className="lead">The paper</span>
            <span>behind the</span>
            <span className="hot">practice</span>
          </h2>

          <div className="mt-14 divide-y divide-[#1f1f1f] border-y border-[#1f1f1f]">
            {company.certifications.map((c) => (
              <div
                key={c.code}
                className="group flex flex-col gap-1 py-5 transition-colors hover:bg-[#0f0f0f] sm:flex-row sm:items-center sm:justify-between sm:gap-6 sm:px-2"
              >
                <div className="flex-1">
                  <p className="text-base font-medium text-white transition-colors group-hover:text-[#d2a24c] sm:text-lg">
                    {c.title}
                  </p>
                  <p className="mt-0.5 text-xs text-[#6a6a6a]">Issued by {c.body}</p>
                </div>
                <p className="text-sm text-[#8a8a8a] transition-colors group-hover:text-[#d2a24c]">
                  {c.code}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* clients */}
      <section className="border-t border-[#1f1f1f] py-20 sm:py-28">
        <div className="mx-auto grid max-w-[1400px] gap-14 px-5 sm:px-8 lg:grid-cols-2 lg:items-center">
          <div>
            <p className="eyebrow">Where we work</p>
            <h2 className="mt-5 text-3xl font-semibold leading-tight sm:text-4xl">
              Connected expertise across{" "}
              <span className="text-[#d2a24c]">Islamabad &amp; Pakistan</span>
            </h2>
            <p className="mt-6 max-w-lg text-sm leading-relaxed text-[#9a9a9a] sm:text-base">
              GEO ARC, GEO Soil Testing and GEO Construction work as one group, connecting
              design intelligence, verified ground data and accountable execution for
              residential, commercial and institutional projects.
            </p>
          </div>
          <HexGrid />
        </div>
      </section>
    </>
  );
}

import Image from "next/image";
import { divisions } from "@/data/divisions";
import type { TeamMember } from "@/lib/models";

function PersonCard({ member, lead = false }: { member: TeamMember; lead?: boolean }) {
  return (
    <article className={lead ? "grid gap-5 rounded-sm border border-[#303030] bg-[#111] p-5 sm:grid-cols-[180px_1fr] sm:items-center" : "group"}>
      <div className={`relative overflow-hidden rounded-sm bg-[#171717] ${lead ? "aspect-square" : "aspect-[4/5]"}`}>
        {member.photo ? (
          <Image src={member.photo} alt={member.name} fill sizes={lead ? "180px" : "(max-width: 640px) 50vw, 20vw"} className="object-cover transition-transform duration-500 group-hover:scale-105" unoptimized />
        ) : (
          <div className="grid h-full place-items-center text-6xl font-semibold text-[#333]">{member.name.charAt(0)}</div>
        )}
      </div>
      <div className={lead ? "" : "mt-4"}>
        {lead && <p className="text-[10px] uppercase tracking-[0.2em] text-[#8a8a8a]">Division leadership</p>}
        <h4 className={`${lead ? "mt-2 text-2xl" : "text-base"} font-semibold text-white`}>{member.name}</h4>
        <p className="mt-1 text-xs uppercase tracking-[0.16em] text-[#d2a24c]">{member.role}</p>
        {member.bio && <p className="mt-3 text-sm leading-relaxed text-[#888]">{member.bio}</p>}
      </div>
    </article>
  );
}

export default function DivisionTeams({ team, compact = false }: { team: TeamMember[]; compact?: boolean }) {
  if (!team.length) return null;

  return (
    <section className="border-t border-[#1f1f1f] bg-[#0a0a0a] py-20 sm:py-28">
      <div className="mx-auto max-w-[1400px] px-5 sm:px-8">
        <p className="eyebrow">Our people</p>
        <h2 className="display mt-5 text-[10vw] leading-[0.9] sm:text-[6vw] lg:text-[4vw]"><span className="lead">Teams by</span><span className="hot">division</span></h2>
        <p className="mt-5 max-w-2xl text-sm leading-relaxed text-[#8f8f8f] sm:text-base">Each GEO division has its own leadership and specialist team. Profiles are managed from the admin panel.</p>

        <div className="mt-14 space-y-16">
          {divisions.map((division) => {
            const members = team.filter((member) => member.division === division.slug);
            if (!members.length) return null;
            const leaders = members.filter((member) => member.isLead);
            const staff = members.filter((member) => !member.isLead);
            return (
              <div key={division.slug} className="border-t border-[#292929] pt-8">
                <div className="mb-8 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
                  <div><p className="text-xs uppercase tracking-[0.2em] text-[#d2a24c]">Division {division.number}</p><h3 className="mt-2 text-2xl font-semibold text-white sm:text-3xl">{division.name}</h3></div>
                  <p className="text-xs text-[#686868]">{members.length} team {members.length === 1 ? "member" : "members"}</p>
                </div>
                {leaders.length > 0 && <div className="mb-7 grid gap-5 lg:grid-cols-2">{leaders.map((member) => <PersonCard key={member.id} member={member} lead />)}</div>}
                {staff.length > 0 && <div className={`grid gap-5 ${compact ? "grid-cols-2 sm:grid-cols-3 lg:grid-cols-4" : "grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5"}`}>{staff.map((member) => <PersonCard key={member.id} member={member} />)}</div>}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

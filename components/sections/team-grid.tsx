import { Container } from "@/components/ui/container";
import { SafariImage, isImageKey } from "@/components/ui/safari-image";
import { SectionHeading } from "@/components/ui/section-heading";
import { team, teamIntro } from "@/lib/data/team";

export function TeamGrid() {
  return (
    <section aria-labelledby="team-title" className="py-20 sm:py-28">
      <Container>
        <SectionHeading id="team-title" eyebrow="Our team" title={teamIntro} align="center" />
        <ul className="mt-14 grid gap-8 md:grid-cols-3">
          {team.map((member) => (
            <li key={member.name} className="group flex flex-col overflow-hidden rounded-3xl bg-white shadow-card">
              <div className="relative aspect-[4/5] overflow-hidden bg-sand-200">
                {isImageKey(member.imageKey) ? (
                  <SafariImage
                    imageKey={member.imageKey}
                    fill
                    sizes="(min-width: 768px) 33vw, 100vw"
                    className="object-cover object-top transition-transform duration-700 group-hover:scale-[1.03]"
                  />
                ) : null}
              </div>
              <div className="flex flex-1 flex-col p-7">
                <h3 className="text-2xl font-semibold text-forest-900">{member.name}</h3>
                <p className="mt-1 text-sm font-bold tracking-wide text-ochre-700">{member.role}</p>
                <p className="mt-4 leading-relaxed text-ink-600">{member.bio}</p>
              </div>
            </li>
          ))}
        </ul>
        <figure className="mt-16 overflow-hidden rounded-[2rem] shadow-lift">
          <SafariImage imageKey="teamGroup" sizes="(min-width: 1280px) 1216px, 100vw" className="h-auto w-full" />
          <figcaption className="bg-forest-900 px-6 py-4 text-sm text-sand-100/80">On safari at Kanha National Park.</figcaption>
        </figure>
      </Container>
    </section>
  );
}

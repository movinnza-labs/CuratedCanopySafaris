import { ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Icon } from "@/components/ui/icon";

export default function NotFound() {
  return (
    <section className="flex min-h-[80svh] items-center bg-forest-950 pt-24 text-sand-100">
      <Container size="narrow" className="text-center">
        <Icon name="pawprint" className="mx-auto size-14 text-ochre-400" />
        <p className="mt-6 text-xs font-bold tracking-[0.2em] text-ochre-300 uppercase">Error 404</p>
        <h1 className="mt-3 text-4xl font-semibold text-sand-50 sm:text-5xl">These tracks lead nowhere</h1>
        <p className="mx-auto mt-5 max-w-xl text-lg text-sand-100/80">
          The page you’re looking for has moved or no longer exists. Let’s get you back on the trail.
        </p>
        <div className="mt-9 flex flex-wrap justify-center gap-3">
          <ButtonLink href="/safari-packages" icon="arrowRight">
            Browse safari packages
          </ButtonLink>
          <ButtonLink href="/" variant="light">
            Back to home
          </ButtonLink>
        </div>
      </Container>
    </section>
  );
}

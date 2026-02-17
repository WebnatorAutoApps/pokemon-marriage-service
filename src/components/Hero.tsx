import ScrollReveal from "./ScrollReveal";
import PokeballIcon from "./PokeballIcon";
import HeartIcon from "./HeartIcon";

export default function Hero() {
  return (
    <section className="pokemon-bg-pattern relative flex flex-col items-center justify-center overflow-hidden px-6 py-24 text-center sm:py-32">
      {/* Floating decorative pokeballs */}
      <div className="pointer-events-none absolute left-[10%] top-[15%] opacity-10">
        <PokeballIcon className="animate-float h-20 w-20" />
      </div>
      <div className="pointer-events-none absolute right-[10%] top-[20%] opacity-10">
        <PokeballIcon className="animate-float-delay h-16 w-16" />
      </div>
      <div className="pointer-events-none absolute bottom-[15%] left-[15%] opacity-10">
        <PokeballIcon className="animate-float-delay h-14 w-14" />
      </div>
      <div className="pointer-events-none absolute bottom-[20%] right-[15%] opacity-10">
        <PokeballIcon className="animate-float h-18 w-18" />
      </div>

      {/* Pokeball hero icon */}
      <ScrollReveal className="mb-6" direction="none" duration={800}>
        <div className="relative inline-block">
          <PokeballIcon className="h-20 w-20 sm:h-24 sm:w-24" />
          <HeartIcon className="animate-heartbeat absolute -right-2 -top-2 h-8 w-8 text-pokemon-red drop-shadow-md sm:h-10 sm:w-10" />
        </div>
      </ScrollReveal>

      {/* Title */}
      <ScrollReveal direction="up" delay={100}>
        <h1 className="pokemon-title max-w-2xl text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl">
          Unite Your Pokemon in Love
        </h1>
      </ScrollReveal>

      {/* Subtitle */}
      <ScrollReveal direction="up" delay={200}>
        <p className="mt-6 max-w-lg text-lg leading-8 text-pokemon-gray-dark dark:text-pokemon-gray-dark">
          The premier service for Pokemon companionship and matchmaking. Find the
          perfect partner for your beloved Pokemon today.
        </p>
      </ScrollReveal>

      {/* Feature badges */}
      <ScrollReveal direction="up" delay={300}>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <span className="inline-flex items-center gap-1.5 rounded-full border-2 border-pokemon-yellow bg-pokemon-yellow/10 px-4 py-1.5 text-xs font-bold uppercase tracking-wide text-pokemon-black dark:text-pokemon-yellow">
            <PokeballIcon className="h-3.5 w-3.5" />
            100% Match Rate
          </span>
          <span className="inline-flex items-center gap-1.5 rounded-full border-2 border-pokemon-red bg-pokemon-red/10 px-4 py-1.5 text-xs font-bold uppercase tracking-wide text-pokemon-black dark:text-pokemon-red-light">
            <HeartIcon className="h-3.5 w-3.5" />
            True Love
          </span>
          <span className="inline-flex items-center gap-1.5 rounded-full border-2 border-pokemon-blue bg-pokemon-blue/10 px-4 py-1.5 text-xs font-bold uppercase tracking-wide text-pokemon-black dark:text-pokemon-blue-light">
            <PokeballIcon className="h-3.5 w-3.5" />
            All Regions
          </span>
        </div>
      </ScrollReveal>

      {/* CTA buttons */}
      <ScrollReveal direction="up" delay={400}>
        <div className="mt-10 flex flex-col gap-4 sm:flex-row">
          <a href="#" className="pokemon-btn pokemon-btn-primary">
            <PokeballIcon className="h-4 w-4" />
            Get Started
          </a>
          <a href="#" className="pokemon-btn pokemon-btn-secondary">
            Learn More
          </a>
        </div>
      </ScrollReveal>
    </section>
  );
}

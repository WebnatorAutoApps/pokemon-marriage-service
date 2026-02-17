import ScrollReveal from "./ScrollReveal";
import PokeballIcon from "./PokeballIcon";
import HeartIcon from "./HeartIcon";

export default function CallToAction() {
  return (
    <section className="w-full bg-pokemon-red px-6 py-24 text-white dark:bg-pokemon-red-dark">
      <div className="mx-auto max-w-3xl text-center">
        <ScrollReveal direction="up">
          <div className="mb-6 flex items-center justify-center gap-2">
            <PokeballIcon className="h-8 w-8" />
            <HeartIcon className="h-6 w-6 text-pokemon-yellow" />
            <PokeballIcon className="h-8 w-8" />
          </div>
          <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
            Ready to Find True Love for Your Pokemon?
          </h2>
          <p className="mt-4 text-lg leading-8 text-white/80">
            Join thousands of happy trainers who have found the perfect match
            for their Pokemon. Your journey to happily ever after starts here.
          </p>
        </ScrollReveal>

        <ScrollReveal direction="up" delay={200}>
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <a
              href="#"
              className="pokemon-btn inline-flex items-center gap-2 border-2 border-pokemon-yellow bg-pokemon-yellow font-bold text-pokemon-black hover:bg-pokemon-yellow-light"
            >
              <PokeballIcon className="h-4 w-4" />
              Start Matchmaking
            </a>
            <a
              href="#"
              className="pokemon-btn border-2 border-white/40 bg-transparent font-bold text-white hover:bg-white/10"
            >
              View Success Stories
            </a>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}

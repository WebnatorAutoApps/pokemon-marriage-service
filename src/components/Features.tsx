import ScrollReveal from "./ScrollReveal";
import PokeballIcon from "./PokeballIcon";
import HeartIcon from "./HeartIcon";

const features = [
  {
    title: "Perfect Matchmaking",
    description:
      "Our advanced algorithm considers type compatibility, nature, and personality to find the ideal partner for your Pokemon.",
    icon: "pokeball" as const,
  },
  {
    title: "All Regions Welcome",
    description:
      "From Kanto to Paldea, we connect Pokemon across every region. Distance is no barrier to true love.",
    icon: "heart" as const,
  },
  {
    title: "Certified Ceremonies",
    description:
      "Our licensed Pokemon officiants ensure every union is recognized across all regions and leagues.",
    icon: "pokeball" as const,
  },
];

export default function Features() {
  return (
    <section className="w-full bg-pokemon-gray-light px-6 py-24 dark:bg-pokemon-black/50">
      <div className="mx-auto max-w-5xl">
        <ScrollReveal className="mb-16 text-center" direction="up">
          <h2 className="text-3xl font-extrabold tracking-tight text-pokemon-black sm:text-4xl dark:text-pokemon-white">
            Why Choose Us
          </h2>
          <p className="mt-4 text-lg text-pokemon-gray-dark dark:text-pokemon-gray">
            The most trusted Pokemon matchmaking service since 1996.
          </p>
        </ScrollReveal>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => (
            <ScrollReveal
              key={feature.title}
              className="pokemon-card p-8 text-center"
              direction="up"
              delay={index * 150}
            >
              <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-pokemon-red/10">
                {feature.icon === "pokeball" ? (
                  <PokeballIcon className="h-7 w-7" />
                ) : (
                  <HeartIcon className="h-7 w-7 text-pokemon-red" />
                )}
              </div>
              <h3 className="text-lg font-bold text-pokemon-black dark:text-pokemon-white">
                {feature.title}
              </h3>
              <p className="mt-2 text-sm leading-6 text-pokemon-gray-dark dark:text-pokemon-gray">
                {feature.description}
              </p>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}

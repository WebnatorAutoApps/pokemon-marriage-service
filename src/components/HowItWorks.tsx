import ScrollReveal from "./ScrollReveal";
import PokeballIcon from "./PokeballIcon";

const steps = [
  {
    number: "01",
    title: "Register Your Pokemon",
    description:
      "Create a profile for your Pokemon with their nature, interests, and what they look for in a partner.",
  },
  {
    number: "02",
    title: "Find a Match",
    description:
      "Our algorithm analyzes compatibility across types, egg groups, and personality traits to suggest the best matches.",
  },
  {
    number: "03",
    title: "Meet & Connect",
    description:
      "Arrange a supervised meeting at one of our beautiful Pokemon Centers or scenic routes across the regions.",
  },
  {
    number: "04",
    title: "Celebrate the Union",
    description:
      "Once your Pokemon have found true love, we host a beautiful ceremony with their trainers and friends.",
  },
];

export default function HowItWorks() {
  return (
    <section className="pokemon-bg-pattern w-full px-6 py-24">
      <div className="mx-auto max-w-5xl">
        <ScrollReveal className="mb-16 text-center" direction="up">
          <h2 className="text-3xl font-extrabold tracking-tight text-pokemon-black sm:text-4xl dark:text-pokemon-white">
            How It Works
          </h2>
          <p className="mt-4 text-lg text-pokemon-gray-dark dark:text-pokemon-gray">
            Four simple steps to Pokemon happiness.
          </p>
        </ScrollReveal>

        <div className="grid gap-10 sm:grid-cols-2">
          {steps.map((step, index) => (
            <ScrollReveal
              key={step.number}
              className="flex gap-5"
              direction={index % 2 === 0 ? "left" : "right"}
              delay={index * 100}
            >
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-pokemon-red text-lg font-extrabold text-white">
                {step.number}
              </div>
              <div>
                <h3 className="flex items-center gap-2 text-lg font-bold text-pokemon-black dark:text-pokemon-white">
                  <PokeballIcon className="h-4 w-4" />
                  {step.title}
                </h3>
                <p className="mt-1 text-sm leading-6 text-pokemon-gray-dark dark:text-pokemon-gray">
                  {step.description}
                </p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}

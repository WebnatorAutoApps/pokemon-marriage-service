export default function Hero() {
  return (
    <section className="flex flex-1 flex-col items-center justify-center px-6 py-24 text-center">
      <h1 className="max-w-2xl text-4xl font-bold tracking-tight text-zinc-900 sm:text-5xl dark:text-zinc-50">
        Unite Your Pokemon in Love
      </h1>
      <p className="mt-6 max-w-lg text-lg leading-8 text-zinc-600 dark:text-zinc-400">
        The premier service for Pokemon companionship and matchmaking. Find the
        perfect partner for your beloved Pokemon today.
      </p>
      <div className="mt-10 flex gap-4">
        <a
          href="#"
          className="rounded-full bg-zinc-900 px-6 py-3 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-zinc-700 dark:bg-zinc-50 dark:text-zinc-900 dark:hover:bg-zinc-300"
        >
          Get Started
        </a>
        <a
          href="#"
          className="rounded-full border border-zinc-300 px-6 py-3 text-sm font-semibold text-zinc-900 shadow-sm transition-colors hover:bg-zinc-50 dark:border-zinc-700 dark:text-zinc-50 dark:hover:bg-zinc-900"
        >
          Learn More
        </a>
      </div>
    </section>
  );
}

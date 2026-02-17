import Link from "next/link";
import PokeballIcon from "./PokeballIcon";

export default function Header() {
  return (
    <header className="w-full bg-pokemon-red dark:bg-pokemon-red-dark">
      <div className="mx-auto flex h-16 max-w-5xl items-center justify-between px-6">
        <Link
          href="/"
          className="flex items-center gap-2 text-xl font-bold tracking-tight text-white"
        >
          <PokeballIcon className="h-7 w-7" />
          <span>Pokemon Marriage Service</span>
        </Link>
        <nav className="flex items-center gap-6 text-sm font-semibold uppercase tracking-wider text-white/80">
          <Link
            href="/"
            className="transition-colors hover:text-pokemon-yellow"
          >
            Home
          </Link>
          <Link
            href="/license"
            className="transition-colors hover:text-pokemon-yellow"
          >
            Marriage License
          </Link>
        </nav>
      </div>
      <div className="pokeball-divider" />
    </header>
  );
}

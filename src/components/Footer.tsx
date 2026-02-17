import PokeballIcon from "./PokeballIcon";

export default function Footer() {
  return (
    <footer className="w-full bg-pokemon-black text-white">
      <div className="pokeball-divider" />
      <div className="mx-auto flex h-16 max-w-5xl items-center justify-center gap-2 px-6">
        <PokeballIcon className="h-4 w-4 opacity-60" />
        <p className="text-sm text-white/60">
          &copy; {new Date().getFullYear()} Pokemon Marriage Service. All rights
          reserved.
        </p>
        <PokeballIcon className="h-4 w-4 opacity-60" />
      </div>
    </footer>
  );
}

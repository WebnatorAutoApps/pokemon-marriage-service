export default function PokeballIcon({ className = "w-8 h-8" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 100 100"
      className={className}
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Top half - red */}
      <path
        d="M 5 50 A 45 45 0 0 1 95 50"
        fill="#e3350d"
        stroke="#1a1a2e"
        strokeWidth="4"
      />
      {/* Bottom half - white */}
      <path
        d="M 5 50 A 45 45 0 0 0 95 50"
        fill="#ffffff"
        stroke="#1a1a2e"
        strokeWidth="4"
      />
      {/* Center band */}
      <rect x="3" y="47" width="94" height="6" fill="#1a1a2e" />
      {/* Outer circle of button */}
      <circle cx="50" cy="50" r="14" fill="#1a1a2e" />
      {/* Inner circle of button */}
      <circle cx="50" cy="50" r="9" fill="#ffffff" stroke="#1a1a2e" strokeWidth="3" />
    </svg>
  );
}

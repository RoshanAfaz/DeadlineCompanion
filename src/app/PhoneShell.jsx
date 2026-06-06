import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";

export default function PhoneShell({ children }) {
  const [dark, setDark] = useState(true);

  useEffect(() => {
    const root = document.documentElement;
    if (dark) root.classList.add("dark");
    else root.classList.remove("dark");
  }, [dark]);

  return (
    <div className="min-h-screen w-full gradient-bg flex items-center justify-center p-0 md:p-8">
      {/* Desktop ambient glow */}
      <div className="pointer-events-none fixed inset-0 -z-0 hidden md:block">
        <div className="absolute top-1/4 left-1/4 h-96 w-96 rounded-full bg-primary/20 blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 h-96 w-96 rounded-full bg-primary-glow/20 blur-3xl" />
      </div>

      {/* Theme toggle */}
      <button
        onClick={() => setDark((v) => !v)}
        className="fixed top-4 right-4 z-50 hidden md:flex h-11 w-11 items-center justify-center rounded-full glass border shadow-soft hover:scale-105 transition"
        aria-label="Toggle theme"
      >
        {dark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
      </button>

      {/* Phone frame on desktop, full-bleed on mobile */}
      <div className="relative w-full max-w-[420px] md:h-[860px] h-screen md:rounded-[44px] md:border-[10px] border-zinc-900/90 md:shadow-[0_30px_80px_-20px_rgba(0,0,0,0.5)] bg-background overflow-hidden flex flex-col">
        {/* Notch */}
        <div className="hidden md:flex absolute top-0 left-1/2 -translate-x-1/2 h-7 w-36 bg-zinc-900 rounded-b-2xl z-30 items-end justify-center pb-1">
          <div className="h-1.5 w-1.5 rounded-full bg-zinc-700 mr-2" />
          <div className="h-2 w-12 rounded-full bg-zinc-800" />
        </div>
        {children}
      </div>
    </div>
  );
}

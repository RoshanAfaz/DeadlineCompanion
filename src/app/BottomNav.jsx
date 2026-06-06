import { Home, ListChecks, Plus, Sparkles, User } from "lucide-react";

const items = [
  { id: "home", label: "Home", icon: Home },
  { id: "tasks", label: "Tasks", icon: ListChecks },
  { id: "add", label: "", icon: Plus, primary: true },
  { id: "ai", label: "Assistant", icon: Sparkles },
  { id: "profile", label: "Profile", icon: User },
];

export default function BottomNav({ active, onChange, onAdd }) {
  return (
    <nav className="relative z-20 border-t border-border glass">
      <ul className="grid grid-cols-5 items-center px-2 pt-2 safe-bottom-padding">
        {items.map((it) => {
          const Icon = it.icon;
          const isActive = active === it.id;
          if (it.primary) {
            return (
              <li key={it.id} className="flex justify-center -mt-7">
                <button
                  onClick={onAdd}
                  className="h-14 w-14 rounded-2xl gradient-primary shadow-glow flex items-center justify-center text-primary-foreground hover:scale-105 active:scale-95 transition"
                  aria-label="Add task"
                >
                  <Icon className="h-6 w-6" />
                </button>
              </li>
            );
          }
          return (
            <li key={it.id} className="flex justify-center">
              <button
                onClick={() => onChange(it.id)}
                className={`flex flex-col items-center gap-1 px-3 py-1.5 rounded-xl transition ${
                  isActive ? "text-primary" : "text-muted-foreground hover:text-foreground"
                }`}
              >
                <Icon className={`h-5 w-5 ${isActive ? "scale-110" : ""} transition`} />
                <span className="text-[10px] font-medium">{it.label}</span>
              </button>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

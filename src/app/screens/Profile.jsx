import {
  Settings,
  Bell,
  Palette,
  Lock,
  HelpCircle,
  LogOut,
  ChevronRight,
  Flame,
  Trophy,
  Target,
  BarChart3,
  Calendar as CalIcon,
  Sparkles,
} from "lucide-react";
export default function Profile({
  user = { name: "User", email: "", avatar: "U", streak: 0, totalCompleted: 0, productivity: 0 },
  onNav,
}) {
  const sections = [
    {
      title: "App",
      items: [
        { icon: Bell, label: "Notifications", onClick: () => onNav?.("notifications") },
        { icon: Palette, label: "Appearance" },
        { icon: CalIcon, label: "Calendar sync" },
        { icon: Sparkles, label: "AI preferences" },
      ],
    },
    {
      title: "Account",
      items: [
        { icon: Lock, label: "Privacy & security" },
        { icon: HelpCircle, label: "Help & feedback" },
        { icon: Settings, label: "Advanced settings" },
      ],
    },
  ];

  return (
    <div className="flex-1 overflow-y-auto pb-6">
      <div className="px-5 safe-top-padding pb-3 flex items-center justify-between">
        <h1 className="text-2xl font-bold">Profile</h1>
        <button className="h-10 w-10 rounded-full bg-muted flex items-center justify-center">
          <Settings className="h-4 w-4" />
        </button>
      </div>

      {/* Profile card */}
      <div className="mx-5 rounded-3xl p-5 gradient-primary shadow-glow text-primary-foreground relative overflow-hidden">
        <div className="absolute -bottom-10 -right-10 h-40 w-40 rounded-full bg-white/10 blur-2xl" />
        <div className="relative flex items-center gap-4">
          <div className="h-16 w-16 rounded-2xl bg-white/20 backdrop-blur flex items-center justify-center text-2xl font-bold">
            {user.avatar}
          </div>
          <div className="flex-1">
            <h2 className="text-lg font-bold">{user.name}</h2>
            <p className="text-xs opacity-90">{user.email}</p>
            <button className="mt-2 text-[11px] font-semibold px-3 py-1 rounded-full bg-white/20 backdrop-blur">
              Edit profile
            </button>
          </div>
        </div>
        <div className="relative mt-5 grid grid-cols-3 gap-2 text-center">
          {[
            { icon: Flame, value: user.streak, label: "Streak" },
            { icon: Trophy, value: user.totalCompleted, label: "Completed" },
            { icon: Target, value: `${user.productivity}%`, label: "Focus" },
          ].map((s) => {
            const I = s.icon;
            return (
              <div key={s.label} className="rounded-xl bg-white/15 backdrop-blur p-2.5">
                <I className="h-4 w-4 mx-auto" />
                <p className="mt-1 text-base font-bold">{s.value}</p>
                <p className="text-[10px] opacity-80">{s.label}</p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Nav cards */}
      <div className="mt-5 mx-5 grid grid-cols-2 gap-3">
        <button
          onClick={() => onNav?.("calendar")}
          className="rounded-2xl bg-card border border-border p-4 shadow-soft text-left"
        >
          <CalIcon className="h-5 w-5 text-primary" />
          <p className="mt-2 text-sm font-bold">Calendar</p>
          <p className="text-[11px] text-muted-foreground">View deadlines</p>
        </button>
        <button
          onClick={() => onNav?.("analytics")}
          className="rounded-2xl bg-card border border-border p-4 shadow-soft text-left"
        >
          <BarChart3 className="h-5 w-5 text-primary" />
          <p className="mt-2 text-sm font-bold">Analytics</p>
          <p className="text-[11px] text-muted-foreground">Track progress</p>
        </button>
      </div>

      {/* Settings sections */}
      {sections.map((sec) => (
        <div key={sec.title} className="mt-5 px-5">
          <p className="text-[11px] font-bold uppercase tracking-wide text-muted-foreground mb-2">
            {sec.title}
          </p>
          <div className="rounded-2xl bg-card border border-border shadow-soft overflow-hidden">
            {sec.items.map((it, i) => {
              const I = it.icon;
              return (
                <button
                  key={it.label}
                  onClick={it.onClick}
                  className={`w-full flex items-center gap-3 px-4 py-3.5 text-left hover:bg-muted/50 transition ${
                    i !== sec.items.length - 1 ? "border-b border-border" : ""
                  }`}
                >
                  <I className="h-4 w-4 text-muted-foreground" />
                  <span className="flex-1 text-sm">{it.label}</span>
                  <ChevronRight className="h-4 w-4 text-muted-foreground" />
                </button>
              );
            })}
          </div>
        </div>
      ))}

      <div className="mt-5 px-5">
        <button className="w-full h-12 rounded-2xl bg-destructive/10 text-destructive font-semibold text-sm inline-flex items-center justify-center gap-2">
          <LogOut className="h-4 w-4" /> Log out
        </button>
      </div>
    </div>
  );
}

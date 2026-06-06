import { Bell, Search, Flame, Target, TrendingUp, ChevronRight } from "lucide-react";
import TaskCard from "../components/TaskCard";
import { categories } from "../mockData";

export default function Dashboard({
  user = { name: "User", streak: 0, productivity: 0, totalCompleted: 0 },
  tasks,
  onToggle,
  onOpenTask,
  onNav,
  onNotifications,
}) {
  const today = new Date();
  const greeting =
    today.getHours() < 12
      ? "Good morning"
      : today.getHours() < 18
        ? "Good afternoon"
        : "Good evening";
  const todayTasks = tasks.filter((t) => {
    const d = new Date(t.due);
    return d.toDateString() === today.toDateString();
  });
  const upcoming = tasks.filter((t) => !t.completed).slice(0, 4);
  const completedToday = todayTasks.filter((t) => t.completed).length;
  const progressPct = todayTasks.length
    ? Math.round((completedToday / todayTasks.length) * 100)
    : 0;

  return (
    <div className="flex-1 overflow-y-auto pb-6">
      {/* Header */}
      <div className="px-5 safe-top-padding pb-4 flex items-center justify-between">
        <div>
          <p className="text-xs text-muted-foreground">{greeting},</p>
          <h1 className="text-xl font-bold">{user.name.split(" ")[0]} 👋</h1>
        </div>
        <div className="flex items-center gap-2">
          <button className="h-10 w-10 rounded-full bg-muted flex items-center justify-center">
            <Search className="h-4 w-4" />
          </button>
          <button
            onClick={onNotifications}
            className="relative h-10 w-10 rounded-full bg-muted flex items-center justify-center"
          >
            <Bell className="h-4 w-4" />
            <span className="absolute top-2 right-2 h-2 w-2 rounded-full bg-destructive" />
          </button>
        </div>
      </div>

      {/* Hero progress card */}
      <div className="mx-5 rounded-3xl gradient-primary p-5 shadow-glow text-primary-foreground relative overflow-hidden animate-fade-in-up">
        <div className="absolute -top-10 -right-10 h-40 w-40 rounded-full bg-white/10 blur-2xl" />
        <div className="relative">
          <p className="text-xs opacity-80">Today's progress</p>
          <div className="mt-1 flex items-end gap-2">
            <span className="text-4xl font-bold">{progressPct}%</span>
            <span className="text-sm opacity-80 mb-1">
              {completedToday}/{todayTasks.length} done
            </span>
          </div>
          <div className="mt-3 h-2 rounded-full bg-white/20 overflow-hidden">
            <div
              className="h-full bg-white rounded-full transition-all"
              style={{ width: `${progressPct}%` }}
            />
          </div>
          <div className="mt-4 flex items-center gap-4 text-xs">
            <span className="inline-flex items-center gap-1">
              <Flame className="h-3.5 w-3.5" /> {user.streak} day streak
            </span>
            <span className="inline-flex items-center gap-1">
              <Target className="h-3.5 w-3.5" /> {user.productivity}% focus
            </span>
          </div>
        </div>
      </div>

      {/* Quick stats */}
      <div className="px-5 mt-5 grid grid-cols-3 gap-3">
        {[
          { label: "Today", value: todayTasks.length, icon: Target, color: "text-primary" },
          { label: "Streak", value: user.streak, icon: Flame, color: "text-warning" },
          { label: "Done", value: user.totalCompleted, icon: TrendingUp, color: "text-success" },
        ].map((s) => {
          const I = s.icon;
          return (
            <div key={s.label} className="rounded-2xl bg-card border border-border p-3 shadow-soft">
              <I className={`h-4 w-4 ${s.color}`} />
              <p className="mt-2 text-lg font-bold">{s.value}</p>
              <p className="text-[11px] text-muted-foreground">{s.label}</p>
            </div>
          );
        })}
      </div>

      {/* Categories */}
      <div className="mt-6 px-5 flex items-center justify-between">
        <h2 className="text-sm font-bold">Categories</h2>
        <button className="text-xs text-muted-foreground">See all</button>
      </div>
      <div className="mt-3 px-5 flex gap-3 overflow-x-auto pb-2 -mx-1">
        {categories.map((c) => {
          const count = tasks.filter((t) => t.category === c.id && !t.completed).length;
          return (
            <div
              key={c.id}
              className={`shrink-0 w-28 rounded-2xl bg-gradient-to-br ${c.color} p-3 text-white shadow-soft`}
            >
              <div className="h-8 w-8 rounded-xl bg-white/20 backdrop-blur" />
              <p className="mt-3 text-sm font-bold">{c.name}</p>
              <p className="text-[11px] opacity-90">{count} pending</p>
            </div>
          );
        })}
      </div>

      {/* Upcoming */}
      <div className="mt-6 px-5 flex items-center justify-between">
        <h2 className="text-sm font-bold">Upcoming deadlines</h2>
        <button
          onClick={() => onNav?.("tasks")}
          className="text-xs text-primary inline-flex items-center"
        >
          View all <ChevronRight className="h-3 w-3" />
        </button>
      </div>
      <div className="mt-3 px-5 space-y-3">
        {upcoming.map((t) => (
          <TaskCard key={t.id} task={t} onToggle={onToggle} onClick={() => onOpenTask?.(t)} />
        ))}
      </div>
    </div>
  );
}

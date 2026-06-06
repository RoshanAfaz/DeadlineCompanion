import { ArrowLeft, Bell, Sparkles, Trophy, CheckCircle2 } from "lucide-react";

const icons = {
  deadline: Bell,
  ai: Sparkles,
  achievement: Trophy,
  system: CheckCircle2,
};
const colors = {
  deadline: "from-rose-500 to-red-500",
  ai: "from-violet-500 to-purple-500",
  achievement: "from-amber-500 to-orange-500",
  system: "from-emerald-500 to-teal-500",
};

export default function Notifications({ notifications = [], onBack }) {
  return (
    <div className="flex-1 overflow-y-auto pb-6">
      <div className="px-5 safe-top-padding pb-3 flex items-center gap-3">
        <button
          onClick={onBack}
          className="h-9 w-9 rounded-full bg-muted flex items-center justify-center"
        >
          <ArrowLeft className="h-4 w-4" />
        </button>
        <div>
          <h1 className="text-xl font-bold">Notifications</h1>
          <p className="text-xs text-muted-foreground">
            {notifications.filter((n) => n.unread).length} new
          </p>
        </div>
      </div>

      <div className="px-5 space-y-3">
        {notifications.map((n) => {
          const I = icons[n.type];
          return (
            <div
              key={n.id}
              className={`relative rounded-2xl bg-card border border-border p-4 shadow-soft flex gap-3 ${n.unread ? "ring-1 ring-primary/30" : ""}`}
            >
              <div
                className={`h-10 w-10 rounded-xl bg-gradient-to-br ${colors[n.type]} flex items-center justify-center text-white shrink-0`}
              >
                <I className="h-4 w-4" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-semibold truncate">{n.title}</p>
                  <span className="text-[10px] text-muted-foreground shrink-0 ml-2">{n.time}</span>
                </div>
                <p className="text-xs text-muted-foreground mt-0.5">{n.body}</p>
              </div>
              {n.unread && (
                <span className="absolute top-3 right-3 h-2 w-2 rounded-full bg-primary" />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

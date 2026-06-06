import { TrendingUp, Award, Clock, Target } from "lucide-react";
import { categories } from "../mockData";

export default function Analytics({
  tasks,
  user = { streak: 0, totalCompleted: 0 },
  weeklyStats = [],
}) {
  const max = Math.max(...weeklyStats.map((d) => d.total), 1);
  const totalDone = weeklyStats.reduce((s, d) => s + d.completed, 0);
  const totalAll = weeklyStats.reduce((s, d) => s + d.total, 0);
  const rate = totalAll > 0 ? Math.round((totalDone / totalAll) * 100) : 0;

  const catCounts = categories.map((c) => ({
    ...c,
    count: tasks.filter((t) => t.category === c.id).length,
  }));
  const maxCat = Math.max(...catCounts.map((c) => c.count), 1);

  return (
    <div className="flex-1 overflow-y-auto pb-6">
      <div className="px-5 safe-top-padding pb-3">
        <h1 className="text-2xl font-bold">Analytics</h1>
        <p className="text-xs text-muted-foreground mt-1">Insights from your last 7 days</p>
      </div>

      <div className="px-5 grid grid-cols-2 gap-3">
        <div className="rounded-2xl gradient-primary p-4 text-primary-foreground shadow-glow">
          <TrendingUp className="h-5 w-5" />
          <p className="mt-3 text-2xl font-bold">{rate}%</p>
          <p className="text-[11px] opacity-90">Completion rate</p>
        </div>
        <div className="rounded-2xl bg-card border border-border p-4 shadow-soft">
          <Award className="h-5 w-5 text-warning" />
          <p className="mt-3 text-2xl font-bold">{user.streak}</p>
          <p className="text-[11px] text-muted-foreground">Day streak</p>
        </div>
        <div className="rounded-2xl bg-card border border-border p-4 shadow-soft">
          <Clock className="h-5 w-5 text-info" />
          <p className="mt-3 text-2xl font-bold">3.4h</p>
          <p className="text-[11px] text-muted-foreground">Avg focus / day</p>
        </div>
        <div className="rounded-2xl bg-card border border-border p-4 shadow-soft">
          <Target className="h-5 w-5 text-success" />
          <p className="mt-3 text-2xl font-bold">{user.totalCompleted}</p>
          <p className="text-[11px] text-muted-foreground">Total done</p>
        </div>
      </div>

      {/* Weekly bars */}
      <div className="mx-5 mt-5 rounded-3xl bg-card border border-border shadow-soft p-5">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-sm font-bold">Weekly activity</h2>
          <span className="text-xs text-muted-foreground">
            {totalDone}/{totalAll} done
          </span>
        </div>
        <div className="flex items-end justify-between gap-2 h-36">
          {weeklyStats.map((d) => {
            const h = (d.completed / max) * 100;
            const ht = (d.total / max) * 100;
            return (
              <div key={d.day} className="flex-1 flex flex-col items-center gap-1.5">
                <div className="relative w-full h-full flex items-end">
                  <div
                    className="absolute inset-x-0 bottom-0 rounded-t-lg bg-muted"
                    style={{ height: `${ht}%` }}
                  />
                  <div
                    className="relative w-full rounded-t-lg gradient-primary shadow-glow"
                    style={{ height: `${h}%` }}
                  />
                </div>
                <span className="text-[10px] font-medium text-muted-foreground">{d.day}</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* By category */}
      <div className="mx-5 mt-5 rounded-3xl bg-card border border-border shadow-soft p-5">
        <h2 className="text-sm font-bold mb-4">By category</h2>
        <div className="space-y-3">
          {catCounts.map((c) => (
            <div key={c.id}>
              <div className="flex items-center justify-between text-xs mb-1.5">
                <span className="font-medium">{c.name}</span>
                <span className="text-muted-foreground">{c.count}</span>
              </div>
              <div className="h-2 rounded-full bg-muted overflow-hidden">
                <div
                  className={`h-full bg-gradient-to-r ${c.color} rounded-full`}
                  style={{ width: `${(c.count / maxCat) * 100}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

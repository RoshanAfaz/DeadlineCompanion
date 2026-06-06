import { useMemo, useState } from "react";
import { Search, SlidersHorizontal } from "lucide-react";
import TaskCard from "../components/TaskCard";
import { categories } from "../mockData";

const filters = [
  { id: "all", label: "All" },
  { id: "today", label: "Today" },
  { id: "week", label: "This week" },
  { id: "overdue", label: "Overdue" },
  { id: "done", label: "Completed" },
];

export default function Tasks({ tasks, onToggle, onOpenTask }) {
  const [filter, setFilter] = useState("all");
  const [cat, setCat] = useState("all");
  const [q, setQ] = useState("");

  const filtered = useMemo(() => {
    const now = new Date();
    return tasks
      .filter((t) => (cat === "all" ? true : t.category === cat))
      .filter((t) => (q ? t.title.toLowerCase().includes(q.toLowerCase()) : true))
      .filter((t) => {
        const d = new Date(t.due);
        if (filter === "today") return d.toDateString() === now.toDateString();
        if (filter === "week") {
          const wk = new Date(now);
          wk.setDate(wk.getDate() + 7);
          return d >= now && d <= wk;
        }
        if (filter === "overdue") return d < now && !t.completed;
        if (filter === "done") return t.completed;
        return true;
      });
  }, [tasks, filter, cat, q]);

  return (
    <div className="flex-1 overflow-y-auto pb-6">
      <div className="px-5 safe-top-padding pb-3">
        <h1 className="text-2xl font-bold">Tasks</h1>
        <p className="text-xs text-muted-foreground mt-1">{filtered.length} items</p>
      </div>

      <div className="px-5 flex items-center gap-2">
        <div className="flex-1 h-11 rounded-2xl bg-muted flex items-center px-3 gap-2">
          <Search className="h-4 w-4 text-muted-foreground" />
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search deadlines..."
            className="flex-1 bg-transparent text-sm focus:outline-none"
          />
        </div>
        <button className="h-11 w-11 rounded-2xl bg-muted flex items-center justify-center">
          <SlidersHorizontal className="h-4 w-4" />
        </button>
      </div>

      <div className="mt-4 px-5 flex gap-2 overflow-x-auto pb-1">
        {filters.map((f) => (
          <button
            key={f.id}
            onClick={() => setFilter(f.id)}
            className={`shrink-0 px-3.5 py-1.5 rounded-full text-xs font-semibold transition ${
              filter === f.id
                ? "gradient-primary text-primary-foreground shadow-soft"
                : "bg-muted text-muted-foreground"
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>

      <div className="mt-3 px-5 flex gap-2 overflow-x-auto pb-2">
        <button
          onClick={() => setCat("all")}
          className={`shrink-0 px-3 py-1 rounded-full text-[11px] font-medium border ${
            cat === "all" ? "border-primary text-primary" : "border-border text-muted-foreground"
          }`}
        >
          All categories
        </button>
        {categories.map((c) => (
          <button
            key={c.id}
            onClick={() => setCat(c.id)}
            className={`shrink-0 px-3 py-1 rounded-full text-[11px] font-medium border ${
              cat === c.id ? "border-primary text-primary" : "border-border text-muted-foreground"
            }`}
          >
            {c.name}
          </button>
        ))}
      </div>

      <div className="mt-2 px-5 space-y-3">
        {filtered.length === 0 ? (
          <div className="text-center py-16 text-sm text-muted-foreground">
            No tasks match your filters.
          </div>
        ) : (
          filtered.map((t) => (
            <TaskCard key={t.id} task={t} onToggle={onToggle} onClick={() => onOpenTask?.(t)} />
          ))
        )}
      </div>
    </div>
  );
}

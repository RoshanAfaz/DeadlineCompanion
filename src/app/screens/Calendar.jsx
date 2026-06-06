import { useMemo, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import TaskCard from "../components/TaskCard";
import { isSameDay } from "../utils";

function buildMonth(date) {
  const y = date.getFullYear(),
    m = date.getMonth();
  const first = new Date(y, m, 1);
  const startDay = first.getDay();
  const daysInMonth = new Date(y, m + 1, 0).getDate();
  const cells = [];
  for (let i = 0; i < startDay; i++) cells.push(null);
  for (let d = 1; d <= daysInMonth; d++) cells.push(new Date(y, m, d));
  while (cells.length % 7 !== 0) cells.push(null);
  return cells;
}

export default function Calendar({ tasks, onToggle, onOpenTask }) {
  const [cursor, setCursor] = useState(new Date());
  const [selected, setSelected] = useState(new Date());
  const cells = useMemo(() => buildMonth(cursor), [cursor]);
  const dayTasks = tasks.filter((t) => isSameDay(t.due, selected));

  const monthLabel = cursor.toLocaleDateString(undefined, { month: "long", year: "numeric" });

  return (
    <div className="flex-1 overflow-y-auto pb-6">
      <div className="px-5 pt-12 pb-3 flex items-center justify-between">
        <h1 className="text-2xl font-bold">Calendar</h1>
        <div className="flex items-center gap-1">
          <button
            onClick={() => setCursor(new Date(cursor.getFullYear(), cursor.getMonth() - 1, 1))}
            className="h-9 w-9 rounded-full bg-muted flex items-center justify-center"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
          <span className="text-sm font-semibold w-32 text-center">{monthLabel}</span>
          <button
            onClick={() => setCursor(new Date(cursor.getFullYear(), cursor.getMonth() + 1, 1))}
            className="h-9 w-9 rounded-full bg-muted flex items-center justify-center"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>

      <div className="mx-5 rounded-3xl bg-card border border-border shadow-soft p-3">
        <div className="grid grid-cols-7 text-center text-[10px] font-semibold text-muted-foreground mb-1">
          {["S", "M", "T", "W", "T", "F", "S"].map((d, i) => (
            <div key={i}>{d}</div>
          ))}
        </div>
        <div className="grid grid-cols-7 gap-1">
          {cells.map((c, i) => {
            if (!c) return <div key={i} className="aspect-square" />;
            const isSel = isSameDay(c, selected);
            const isToday = isSameDay(c, new Date());
            const count = tasks.filter((t) => isSameDay(t.due, c)).length;
            return (
              <button
                key={i}
                onClick={() => setSelected(c)}
                className={`aspect-square rounded-xl flex flex-col items-center justify-center text-xs font-semibold transition relative ${
                  isSel
                    ? "gradient-primary text-primary-foreground shadow-soft"
                    : isToday
                      ? "bg-primary/10 text-primary"
                      : "hover:bg-muted"
                }`}
              >
                {c.getDate()}
                {count > 0 && !isSel && (
                  <span className="absolute bottom-1 h-1 w-1 rounded-full bg-primary" />
                )}
              </button>
            );
          })}
        </div>
      </div>

      <div className="mt-5 px-5">
        <h2 className="text-sm font-bold">
          {selected.toLocaleDateString(undefined, {
            weekday: "long",
            month: "short",
            day: "numeric",
          })}
        </h2>
        <p className="text-xs text-muted-foreground">{dayTasks.length} deadlines</p>
      </div>
      <div className="mt-3 px-5 space-y-3">
        {dayTasks.length === 0 ? (
          <div className="text-center py-10 text-sm text-muted-foreground">
            Nothing scheduled. Enjoy the calm. 🌿
          </div>
        ) : (
          dayTasks.map((t) => (
            <TaskCard key={t.id} task={t} onToggle={onToggle} onClick={() => onOpenTask?.(t)} />
          ))
        )}
      </div>
    </div>
  );
}

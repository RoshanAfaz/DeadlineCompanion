import { Check, Clock, Flag } from "lucide-react";
import { categories, priorities } from "../mockData";
import { formatDue, getCategory } from "../utils";

export default function TaskCard({ task, onToggle, onClick }) {
  const cat = getCategory(categories, task.category);
  const pri = priorities[task.priority];
  const overdue = !task.completed && new Date(task.due) < new Date();

  return (
    <div
      onClick={onClick}
      className="group relative overflow-hidden rounded-2xl bg-card border border-border shadow-soft hover:shadow-card transition-all p-4 cursor-pointer animate-fade-in-up"
    >
      <div className={`absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b ${cat.color}`} />
      <div className="flex items-start gap-3 pl-2">
        <button
          onClick={(e) => {
            e.stopPropagation();
            onToggle?.(task.id);
          }}
          className={`mt-0.5 h-6 w-6 rounded-full border-2 flex items-center justify-center transition ${
            task.completed
              ? "bg-success border-success text-white"
              : "border-border hover:border-primary"
          }`}
          aria-label="Toggle complete"
        >
          {task.completed && <Check className="h-3.5 w-3.5" strokeWidth={3} />}
        </button>

        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2">
            <h3
              className={`font-semibold text-sm leading-snug ${task.completed ? "line-through text-muted-foreground" : ""}`}
            >
              {task.title}
            </h3>
            <span
              className={`shrink-0 text-[10px] font-bold px-2 py-0.5 rounded-full ${pri.bg} ${pri.color} uppercase tracking-wide`}
            >
              {pri.label}
            </span>
          </div>

          {task.progress > 0 && task.progress < 100 && (
            <div className="mt-2 h-1.5 w-full rounded-full bg-muted overflow-hidden">
              <div
                className="h-full gradient-primary rounded-full transition-all"
                style={{ width: `${task.progress}%` }}
              />
            </div>
          )}

          <div className="mt-2 flex items-center gap-3 text-xs text-muted-foreground">
            <span
              className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-gradient-to-r ${cat.color} text-white text-[10px] font-medium`}
            >
              {cat.name}
            </span>
            <span
              className={`inline-flex items-center gap-1 ${overdue ? "text-destructive font-semibold" : ""}`}
            >
              <Clock className="h-3 w-3" /> {formatDue(task.due)}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

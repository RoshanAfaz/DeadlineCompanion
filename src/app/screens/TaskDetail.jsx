import { ArrowLeft, Calendar, Clock, Flag, Tag, Trash2, Check } from "lucide-react";
import { categories, priorities } from "../mockData";
import { formatDate, formatTime, getCategory } from "../utils";

export default function TaskDetail({ task, onBack, onToggle }) {
  if (!task) return null;
  const cat = getCategory(categories, task.category);
  const pri = priorities[task.priority];

  return (
    <div className="absolute inset-0 z-30 bg-background flex flex-col animate-fade-in-up">
      <div className={`safe-top-padding pb-6 px-5 bg-gradient-to-br ${cat.color} text-white`}>
        <div className="flex items-center justify-between">
          <button
            onClick={onBack}
            className="h-9 w-9 rounded-full bg-white/20 backdrop-blur flex items-center justify-center"
          >
            <ArrowLeft className="h-4 w-4" />
          </button>
          <button className="h-9 w-9 rounded-full bg-white/20 backdrop-blur flex items-center justify-center">
            <Trash2 className="h-4 w-4" />
          </button>
        </div>
        <span className="mt-4 inline-block text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-white/25">
          {cat.name}
        </span>
        <h1 className="mt-2 text-2xl font-bold leading-tight">{task.title}</h1>
        <p className="mt-2 text-sm opacity-90">{task.description}</p>
      </div>

      <div className="flex-1 overflow-y-auto px-5 py-5 space-y-4">
        <div className="rounded-2xl bg-card border border-border shadow-soft p-4 grid grid-cols-2 gap-4">
          <div>
            <div className="flex items-center gap-1.5 text-[11px] text-muted-foreground">
              <Calendar className="h-3 w-3" /> Due date
            </div>
            <p className="mt-1 text-sm font-semibold">{formatDate(task.due)}</p>
          </div>
          <div>
            <div className="flex items-center gap-1.5 text-[11px] text-muted-foreground">
              <Clock className="h-3 w-3" /> Time
            </div>
            <p className="mt-1 text-sm font-semibold">{formatTime(task.due)}</p>
          </div>
          <div>
            <div className="flex items-center gap-1.5 text-[11px] text-muted-foreground">
              <Flag className="h-3 w-3" /> Priority
            </div>
            <p className={`mt-1 text-sm font-semibold ${pri.color}`}>{pri.label}</p>
          </div>
          <div>
            <div className="flex items-center gap-1.5 text-[11px] text-muted-foreground">
              <Tag className="h-3 w-3" /> Category
            </div>
            <p className="mt-1 text-sm font-semibold">{cat.name}</p>
          </div>
        </div>

        <div className="rounded-2xl bg-card border border-border shadow-soft p-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold">Progress</h3>
            <span className="text-sm font-bold text-primary">{task.progress}%</span>
          </div>
          <div className="mt-2 h-2 rounded-full bg-muted overflow-hidden">
            <div
              className="h-full gradient-primary rounded-full"
              style={{ width: `${task.progress}%` }}
            />
          </div>
        </div>

        <div className="rounded-2xl bg-card border border-border shadow-soft p-4">
          <h3 className="text-sm font-bold mb-3">Subtasks</h3>
          <ul className="space-y-2">
            {["Draft outline", "Review with team", "Final polish"].map((s, i) => (
              <li key={s} className="flex items-center gap-3 text-sm">
                <div
                  className={`h-5 w-5 rounded-md border-2 flex items-center justify-center ${i === 0 ? "bg-success border-success text-white" : "border-border"}`}
                >
                  {i === 0 && <Check className="h-3 w-3" strokeWidth={3} />}
                </div>
                <span className={i === 0 ? "line-through text-muted-foreground" : ""}>{s}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="px-5 pt-5 safe-bottom-padding border-t border-border">
        <button
          onClick={() => {
            onToggle?.(task.id);
            onBack?.();
          }}
          className="w-full h-12 rounded-2xl gradient-primary text-primary-foreground font-semibold shadow-glow"
        >
          {task.completed ? "Mark as pending" : "Mark as complete"}
        </button>
      </div>
    </div>
  );
}

import { useState } from "react";
import { X, Calendar, Flag, Tag, Sparkles } from "lucide-react";
import { categories, priorities } from "../mockData";

export default function AddTaskSheet({ open, onClose, onCreate }) {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("work");
  const [priority, setPriority] = useState("medium");

  if (!open) return null;

  const submit = () => {
    if (!title.trim()) return;
    onCreate?.({ title: title.trim(), category, priority });
    setTitle("");
    onClose?.();
  };

  return (
    <div className="absolute inset-0 z-40 flex items-end animate-fade-in-up">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />
      <div className="relative w-full rounded-t-3xl bg-card border-t border-border p-5 pb-8 shadow-glow animate-scale-in">
        <div className="mx-auto mb-4 h-1.5 w-12 rounded-full bg-muted" />
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold">New Deadline</h2>
          <button
            onClick={onClose}
            className="h-8 w-8 rounded-full bg-muted flex items-center justify-center"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <input
          autoFocus
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="What needs to get done?"
          className="w-full bg-transparent text-lg font-medium placeholder:text-muted-foreground focus:outline-none border-b border-border pb-3 mb-4"
        />

        <button className="w-full mb-4 flex items-center gap-2 rounded-xl border border-dashed border-primary/40 bg-primary/5 px-3 py-2 text-sm text-primary">
          <Sparkles className="h-4 w-4" /> Ask AI to suggest a deadline
        </button>

        <div className="space-y-3">
          <div>
            <div className="flex items-center gap-1.5 text-xs text-muted-foreground mb-2">
              <Tag className="h-3.5 w-3.5" /> Category
            </div>
            <div className="flex gap-2 flex-wrap">
              {categories.map((c) => (
                <button
                  key={c.id}
                  onClick={() => setCategory(c.id)}
                  className={`px-3 py-1.5 rounded-full text-xs font-medium transition ${
                    category === c.id
                      ? `bg-gradient-to-r ${c.color} text-white shadow-soft`
                      : "bg-muted text-muted-foreground"
                  }`}
                >
                  {c.name}
                </button>
              ))}
            </div>
          </div>

          <div>
            <div className="flex items-center gap-1.5 text-xs text-muted-foreground mb-2">
              <Flag className="h-3.5 w-3.5" /> Priority
            </div>
            <div className="flex gap-2">
              {Object.entries(priorities).map(([key, p]) => (
                <button
                  key={key}
                  onClick={() => setPriority(key)}
                  className={`flex-1 px-3 py-2 rounded-xl text-xs font-semibold transition border ${
                    priority === key
                      ? `${p.bg} ${p.color} border-current`
                      : "bg-muted text-muted-foreground border-transparent"
                  }`}
                >
                  {p.label}
                </button>
              ))}
            </div>
          </div>

          <button className="w-full flex items-center justify-between px-4 py-3 rounded-xl bg-muted text-sm">
            <span className="flex items-center gap-2 text-muted-foreground">
              <Calendar className="h-4 w-4" /> Due date
            </span>
            <span className="font-medium">Today, 5:00 PM</span>
          </button>
        </div>

        <button
          onClick={submit}
          disabled={!title.trim()}
          className="mt-5 w-full h-12 rounded-2xl gradient-primary text-primary-foreground font-semibold shadow-glow disabled:opacity-50 disabled:shadow-none transition hover:scale-[1.01] active:scale-[0.99]"
        >
          Create deadline
        </button>
      </div>
    </div>
  );
}

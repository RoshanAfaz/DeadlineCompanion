import { Sparkles, Send, Wand2, Calendar, Brain } from "lucide-react";

const chips = [
  "What should I focus on today?",
  "Reschedule my week",
  "Summarize my pending tasks",
  "Find a 1-hour focus block",
];

export default function AIAssistant({ aiSuggestions = [] }) {
  return (
    <div className="flex-1 overflow-y-auto pb-6">
      <div className="px-5 safe-top-padding pb-3">
        <div className="flex items-center gap-2">
          <div className="h-10 w-10 rounded-2xl gradient-primary flex items-center justify-center shadow-glow">
            <Sparkles className="h-5 w-5 text-primary-foreground" />
          </div>
          <div>
            <h1 className="text-xl font-bold">AI Assistant</h1>
            <p className="text-xs text-muted-foreground">Your smart productivity coach</p>
          </div>
        </div>
      </div>

      {/* Hero */}
      <div className="mx-5 rounded-3xl p-5 bg-card border border-border shadow-soft relative overflow-hidden">
        <div className="absolute -top-10 -right-10 h-40 w-40 rounded-full bg-primary/20 blur-3xl" />
        <div className="relative">
          <p className="text-[11px] uppercase tracking-wide text-primary font-bold">
            Today's insight
          </p>
          <h2 className="mt-1 text-base font-bold leading-snug">
            You're most productive between <span className="text-primary">9–11 AM</span>. Schedule
            your high-priority work here.
          </h2>
          <div className="mt-4 flex gap-2">
            <button className="flex-1 h-10 rounded-xl gradient-primary text-primary-foreground text-sm font-semibold">
              Apply
            </button>
            <button className="px-4 h-10 rounded-xl bg-muted text-sm font-medium">Later</button>
          </div>
        </div>
      </div>

      {/* Suggestions */}
      <h3 className="mt-6 px-5 text-sm font-bold">Smart suggestions</h3>
      <div className="mt-3 px-5 space-y-3">
        {aiSuggestions.map((s) => (
          <div key={s.id} className="rounded-2xl bg-card border border-border shadow-soft p-4">
            <div className="flex items-start gap-3">
              <div className="h-9 w-9 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                <Wand2 className="h-4 w-4 text-primary" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-semibold">{s.title}</p>
                <p className="text-xs text-muted-foreground mt-1">{s.reason}</p>
                <button className="mt-2 text-xs font-bold text-primary">{s.action} →</button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Tools */}
      <h3 className="mt-6 px-5 text-sm font-bold">Quick tools</h3>
      <div className="mt-3 px-5 grid grid-cols-2 gap-3">
        {[
          { icon: Calendar, label: "Auto-schedule week", color: "from-violet-500 to-purple-500" },
          { icon: Brain, label: "Break down task", color: "from-blue-500 to-cyan-500" },
          { icon: Sparkles, label: "Suggest priorities", color: "from-pink-500 to-rose-500" },
          { icon: Wand2, label: "Optimize calendar", color: "from-amber-500 to-orange-500" },
        ].map((t) => {
          const I = t.icon;
          return (
            <button
              key={t.label}
              className={`rounded-2xl p-3 text-left bg-gradient-to-br ${t.color} text-white shadow-soft`}
            >
              <I className="h-5 w-5" />
              <p className="mt-3 text-xs font-bold leading-tight">{t.label}</p>
            </button>
          );
        })}
      </div>

      {/* Prompt input */}
      <div className="mt-6 px-5">
        <div className="flex gap-2 overflow-x-auto pb-2">
          {chips.map((c) => (
            <button
              key={c}
              className="shrink-0 text-xs px-3 py-1.5 rounded-full bg-muted text-muted-foreground"
            >
              {c}
            </button>
          ))}
        </div>
        <div className="mt-3 flex items-center gap-2 rounded-2xl bg-card border border-border p-2 shadow-soft">
          <input
            placeholder="Ask your assistant..."
            className="flex-1 bg-transparent px-2 py-2 text-sm focus:outline-none"
          />
          <button className="h-10 w-10 rounded-xl gradient-primary text-primary-foreground flex items-center justify-center shadow-glow">
            <Send className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}

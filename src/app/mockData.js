export const categories = [
  { id: "work", name: "Work", color: "from-violet-500 to-purple-500", icon: "Briefcase" },
  { id: "study", name: "Study", color: "from-blue-500 to-cyan-500", icon: "GraduationCap" },
  { id: "personal", name: "Personal", color: "from-pink-500 to-rose-500", icon: "Heart" },
  { id: "health", name: "Health", color: "from-emerald-500 to-teal-500", icon: "Activity" },
  { id: "finance", name: "Finance", color: "from-amber-500 to-orange-500", icon: "Wallet" },
];

export const priorities = {
  high: { label: "High", color: "text-destructive", bg: "bg-destructive/10" },
  medium: { label: "Medium", color: "text-warning", bg: "bg-warning/10" },
  low: { label: "Low", color: "text-info", bg: "bg-info/10" },
};

const today = new Date();
const d = (days, hours = 9) => {
  const x = new Date(today);
  x.setDate(x.getDate() + days);
  x.setHours(hours, 0, 0, 0);
  return x.toISOString();
};

export const tasks = [
  {
    id: "1",
    title: "Submit product roadmap Q3",
    category: "work",
    priority: "high",
    due: d(0, 17),
    progress: 80,
    completed: false,
    description: "Finalize and share the Q3 roadmap with stakeholders.",
  },
  {
    id: "2",
    title: "Design system audit",
    category: "work",
    priority: "medium",
    due: d(1, 14),
    progress: 45,
    completed: false,
    description: "Review tokens, components, and accessibility.",
  },
  {
    id: "3",
    title: "Calculus problem set",
    category: "study",
    priority: "high",
    due: d(2, 23),
    progress: 20,
    completed: false,
    description: "Chapters 7-9, focus on integration techniques.",
  },
  {
    id: "4",
    title: "Morning run — 5km",
    category: "health",
    priority: "low",
    due: d(0, 7),
    progress: 100,
    completed: true,
    description: "Easy pace recovery run.",
  },
  {
    id: "5",
    title: "Pay credit card bill",
    category: "finance",
    priority: "high",
    due: d(3, 20),
    progress: 0,
    completed: false,
    description: "Auto-pay disabled this month.",
  },
  {
    id: "6",
    title: "Mom's birthday gift",
    category: "personal",
    priority: "medium",
    due: d(5, 18),
    progress: 30,
    completed: false,
    description: "Order flowers and write a card.",
  },
  {
    id: "7",
    title: "Team 1:1 with Priya",
    category: "work",
    priority: "low",
    due: d(1, 10),
    progress: 0,
    completed: false,
    description: "Quarterly career check-in.",
  },
  {
    id: "8",
    title: "Read 'Atomic Habits' ch.4",
    category: "personal",
    priority: "low",
    due: d(2, 21),
    progress: 60,
    completed: false,
    description: "Take notes for journal.",
  },
  {
    id: "9",
    title: "Dentist appointment",
    category: "health",
    priority: "medium",
    due: d(7, 11),
    progress: 0,
    completed: false,
    description: "Annual cleaning.",
  },
  {
    id: "10",
    title: "Tax documents prep",
    category: "finance",
    priority: "high",
    due: d(10, 16),
    progress: 10,
    completed: false,
    description: "Gather W-2s and receipts.",
  },
];

export const weeklyStats = [
  { day: "Mon", completed: 6, total: 8 },
  { day: "Tue", completed: 5, total: 7 },
  { day: "Wed", completed: 8, total: 9 },
  { day: "Thu", completed: 4, total: 6 },
  { day: "Fri", completed: 7, total: 10 },
  { day: "Sat", completed: 3, total: 4 },
  { day: "Sun", completed: 2, total: 3 },
];

export const aiSuggestions = [
  {
    id: "s1",
    title: "Reschedule 'Calculus problem set'",
    reason: "You have 3 high-priority tasks tomorrow. Move this to Sunday evening?",
    action: "Reschedule",
  },
  {
    id: "s2",
    title: "Batch your finance tasks",
    reason: "Group 'Pay credit card' and 'Tax prep' on Saturday morning for deep focus.",
    action: "Group",
  },
  {
    id: "s3",
    title: "You're on a 4-day streak 🔥",
    reason: "Add a small wellness task today to keep momentum.",
    action: "Add task",
  },
];

export const notifications = [
  {
    id: "n1",
    title: "Submit product roadmap Q3",
    body: "Due in 4 hours",
    time: "12m ago",
    type: "deadline",
    unread: true,
  },
  {
    id: "n2",
    title: "Smart suggestion",
    body: "Best time to focus: 9–11 AM tomorrow",
    time: "1h ago",
    type: "ai",
    unread: true,
  },
  {
    id: "n3",
    title: "Streak unlocked",
    body: "4 days of completed tasks!",
    time: "Yesterday",
    type: "achievement",
    unread: false,
  },
  {
    id: "n4",
    title: "Morning run — 5km",
    body: "Marked complete. Nice work!",
    time: "2d ago",
    type: "system",
    unread: false,
  },
];

export const user = {
  name: "Alex Carter",
  email: "alex@deadline.app",
  avatar: "AC",
  streak: 12,
  totalCompleted: 184,
  productivity: 87,
};

import { useEffect, useState } from "react";
import PhoneShell from "./PhoneShell";
import BottomNav from "./BottomNav";
import Dashboard from "./screens/Dashboard";
import Tasks from "./screens/Tasks";
import Calendar from "./screens/Calendar";
import Analytics from "./screens/Analytics";
import AIAssistant from "./screens/AIAssistant";
import Notifications from "./screens/Notifications";
import Profile from "./screens/Profile";
import TaskDetail from "./screens/TaskDetail";
import AddTaskSheet from "./components/AddTaskSheet";
import { getTasksData, createTask, toggleTask, readAllNotifications } from "../lib/api/tasks";

export default function App() {
  const [tab, setTab] = useState("home");
  const [tasks, setTasks] = useState([]);
  const [user, setUser] = useState({ name: "User", streak: 0, productivity: 0, totalCompleted: 0 });
  const [weeklyStats, setWeeklyStats] = useState([]);
  const [aiSuggestions, setAiSuggestions] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [adding, setAdding] = useState(false);
  const [openTask, setOpenTask] = useState(null);
  const [overlay, setOverlay] = useState(null); // 'notifications'
  const [loading, setLoading] = useState(true);

  // Load initial data from backend database
  useEffect(() => {
    getTasksData()
      .then((data) => {
        setTasks(data.tasks);
        setUser(data.user);
        setWeeklyStats(data.weeklyStats);
        setAiSuggestions(data.aiSuggestions);
        setNotifications(data.notifications);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to load tasks data from backend:", err);
        setLoading(false);
      });
  }, []);

  const toggle = async (id) => {
    // Optimistic local state update
    setTasks((ts) =>
      ts.map((t) =>
        t.id === id
          ? { ...t, completed: !t.completed, progress: !t.completed ? 100 : t.progress }
          : t,
      ),
    );

    // Call server to persist
    try {
      await toggleTask({ data: { id } });
      // Reload stats and user profile data since streak/counts changed
      const fresh = await getTasksData();
      setUser(fresh.user);
      setWeeklyStats(fresh.weeklyStats);
    } catch (err) {
      console.error("Failed to toggle task in backend:", err);
      // Revert from backend if it fails
      const fresh = await getTasksData();
      setTasks(fresh.tasks);
    }
  };

  const create = async ({ title, category, priority }) => {
    const due = new Date();
    due.setHours(due.getHours() + 6);

    try {
      const newTask = await createTask({
        data: {
          title,
          category,
          priority,
          due: due.toISOString(),
          description: "Created from quick add.",
        },
      });
      setTasks((ts) => [newTask, ...ts]);
    } catch (err) {
      console.error("Failed to create task in backend:", err);
    }
  };

  const handleOpenNotifications = async () => {
    setOverlay("notifications");
    try {
      const freshNotifications = await readAllNotifications();
      setNotifications(freshNotifications);
    } catch (err) {
      console.error("Failed to mark notifications as read:", err);
    }
  };

  const screen = () => {
    if (loading) {
      return (
        <div className="flex-1 flex flex-col items-center justify-center p-6 text-muted-foreground">
          <div className="animate-spin h-6 w-6 border-2 border-primary border-t-transparent rounded-full mb-3" />
          <p className="text-xs">Connecting to backend...</p>
        </div>
      );
    }

    switch (tab) {
      case "home":
        return (
          <Dashboard
            user={user}
            tasks={tasks}
            onToggle={toggle}
            onOpenTask={setOpenTask}
            onNav={setTab}
            onNotifications={handleOpenNotifications}
          />
        );
      case "tasks":
        return <Tasks tasks={tasks} onToggle={toggle} onOpenTask={setOpenTask} />;
      case "calendar":
        return <Calendar tasks={tasks} onToggle={toggle} onOpenTask={setOpenTask} />;
      case "analytics":
        return <Analytics tasks={tasks} user={user} weeklyStats={weeklyStats} />;
      case "ai":
        return <AIAssistant aiSuggestions={aiSuggestions} />;
      case "profile":
        return (
          <Profile
            user={user}
            onNav={(t) => (t === "notifications" ? handleOpenNotifications() : setTab(t))}
          />
        );
      default:
        return null;
    }
  };

  // For bottom nav, map analytics/calendar/notifications under their tabs
  const navActive = ["home", "tasks", "ai", "profile"].includes(tab) ? tab : "home";

  return (
    <PhoneShell>
      <div className="relative flex-1 flex flex-col overflow-hidden">
        {screen()}
        {overlay === "notifications" && (
          <div className="absolute inset-0 z-30 bg-background animate-fade-in-up">
            <Notifications notifications={notifications} onBack={() => setOverlay(null)} />
          </div>
        )}
        {openTask && (
          <TaskDetail task={openTask} onBack={() => setOpenTask(null)} onToggle={toggle} />
        )}
        <AddTaskSheet open={adding} onClose={() => setAdding(false)} onCreate={create} />
      </div>
      <BottomNav active={navActive} onChange={setTab} onAdd={() => setAdding(true)} />
    </PhoneShell>
  );
}

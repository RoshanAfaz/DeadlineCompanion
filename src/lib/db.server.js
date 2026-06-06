import fs from "node:fs/promises";
import path from "node:path";
import { MongoClient } from "mongodb";

const dbPath = path.resolve(process.cwd(), "db.json");

// Helper to check if file exists
async function fileExists(filePath) {
  try {
    await fs.access(filePath);
    return true;
  } catch {
    return false;
  }
}

// Seed helper
async function getInitialData() {
  const today = new Date();
  const d = (days, hours = 9) => {
    const x = new Date(today);
    x.setDate(x.getDate() + days);
    x.setHours(hours, 0, 0, 0);
    return x.toISOString();
  };

  return {
    tasks: [
      {
        id: "1",
        title: "Submit product roadmap Q3",
        category: "work",
        priority: "high",
        due: d(0, 17),
        progress: 80,
        completed: false,
        description: "Finalize and share the Q3 roadmap with stakeholders.",
        subtasks: [
          { id: "s1", title: "Review draft with product leads", completed: true },
          { id: "s2", title: "Add timeline visualizer", completed: true },
          { id: "s3", title: "Send presentation link", completed: false },
        ],
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
        subtasks: [
          { id: "s1", title: "Draft outline", completed: true },
          { id: "s2", title: "Review with team", completed: false },
          { id: "s3", title: "Final polish", completed: false },
        ],
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
        subtasks: [],
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
        subtasks: [],
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
        subtasks: [],
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
        subtasks: [],
      },
    ],
    user: {
      name: "Alex Carter",
      email: "alex@deadline.app",
      avatar: "AC",
      streak: 12,
      totalCompleted: 184,
      productivity: 87,
    },
    weeklyStats: [
      { day: "Mon", completed: 6, total: 8 },
      { day: "Tue", completed: 5, total: 7 },
      { day: "Wed", completed: 8, total: 9 },
      { day: "Thu", completed: 4, total: 6 },
      { day: "Fri", completed: 7, total: 10 },
      { day: "Sat", completed: 3, total: 4 },
      { day: "Sun", completed: 2, total: 3 },
    ],
    aiSuggestions: [
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
    ],
    notifications: [
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
    ],
  };
}

let client;
let db;

async function getDb() {
  const uri = process.env.MONGODB_URI;
  if (!uri) {
    return null;
  }
  if (!db) {
    try {
      client = new MongoClient(uri, {
        serverSelectionTimeoutMS: 5000,
        connectTimeoutMS: 5000,
      });
      await client.connect();
      db = client.db("deadline_companion");
      // Seed if empty
      const count = await db.collection("tasks").countDocuments();
      if (count === 0) {
        const initialData = await getInitialData();
        await db.collection("tasks").insertMany(initialData.tasks);
        await db.collection("users").insertOne(initialData.user);
        await db.collection("weeklyStats").insertMany(initialData.weeklyStats);
        await db.collection("aiSuggestions").insertMany(initialData.aiSuggestions);
        await db.collection("notifications").insertMany(initialData.notifications);
      }
    } catch (err) {
      console.error("Failed to connect to MongoDB Atlas. Falling back to file DB:", err.message);
      db = null;
      return null;
    }
  }
  return db;
}

export async function readDb() {
  const mongoDb = await getDb();
  if (mongoDb) {
    const tasks = await mongoDb.collection("tasks").find({}).toArray();
    const users = await mongoDb.collection("users").find({}).toArray();
    const stats = await mongoDb.collection("weeklyStats").find({}).toArray();
    const suggestions = await mongoDb.collection("aiSuggestions").find({}).toArray();
    const notifications = await mongoDb.collection("notifications").find({}).toArray();

    // Map Mongo ObjectId references to normal string IDs for safety
    const cleanTasks = tasks.map((t) => ({ ...t, id: t.id ?? String(t._id), _id: undefined }));
    const cleanStats = stats.map((s) => ({ ...s, _id: undefined }));
    const cleanSuggestions = suggestions.map((s) => ({
      ...s,
      id: s.id ?? String(s._id),
      _id: undefined,
    }));
    const cleanNotifications = notifications.map((n) => ({
      ...n,
      id: n.id ?? String(n._id),
      _id: undefined,
    }));
    const cleanUser = users[0]
      ? { ...users[0], _id: undefined }
      : { name: "Alex Carter", streak: 0, productivity: 0, totalCompleted: 0 };

    return {
      tasks: cleanTasks,
      user: cleanUser,
      weeklyStats: cleanStats,
      aiSuggestions: cleanSuggestions,
      notifications: cleanNotifications,
    };
  }

  // File fallback
  const exists = await fileExists(dbPath);
  if (!exists) {
    const initialData = await getInitialData();
    await fs.writeFile(dbPath, JSON.stringify(initialData, null, 2), "utf-8");
    return initialData;
  }
  const content = await fs.readFile(dbPath, "utf-8");
  return JSON.parse(content);
}

export async function writeDb(data) {
  const mongoDb = await getDb();
  if (mongoDb) {
    // Update tasks
    await mongoDb.collection("tasks").deleteMany({});
    if (data.tasks && data.tasks.length > 0) {
      await mongoDb.collection("tasks").insertMany(data.tasks);
    }

    // Update user
    await mongoDb.collection("users").deleteMany({});
    if (data.user) {
      await mongoDb.collection("users").insertOne(data.user);
    }

    // Update stats
    await mongoDb.collection("weeklyStats").deleteMany({});
    if (data.weeklyStats && data.weeklyStats.length > 0) {
      await mongoDb.collection("weeklyStats").insertMany(data.weeklyStats);
    }

    // Update notifications
    await mongoDb.collection("notifications").deleteMany({});
    if (data.notifications && data.notifications.length > 0) {
      await mongoDb.collection("notifications").insertMany(data.notifications);
    }

    // Update suggestions
    await mongoDb.collection("aiSuggestions").deleteMany({});
    if (data.aiSuggestions && data.aiSuggestions.length > 0) {
      await mongoDb.collection("aiSuggestions").insertMany(data.aiSuggestions);
    }
    return;
  }

  // File fallback
  await fs.writeFile(dbPath, JSON.stringify(data, null, 2), "utf-8");
}

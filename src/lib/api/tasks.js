import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { readDb, writeDb } from "../db.server";

// Fetch all initial data
export const getTasksData = createServerFn({ method: "GET" }).handler(async () => {
  return await readDb();
});

// Create a new task
export const createTask = createServerFn({ method: "POST" })
  .inputValidator(
    z.object({
      title: z.string().min(1),
      category: z.string(),
      priority: z.string(),
      description: z.string().optional(),
      due: z.string(),
    }),
  )
  .handler(async ({ data }) => {
    const db = await readDb();
    const id = String(Date.now());
    const newTask = {
      id,
      title: data.title,
      category: data.category,
      priority: data.priority,
      due: data.due,
      progress: 0,
      completed: false,
      description: data.description || "Created from app.",
      subtasks: [],
    };
    db.tasks.unshift(newTask);
    await writeDb(db);
    return newTask;
  });

// Toggle task status
export const toggleTask = createServerFn({ method: "POST" })
  .inputValidator(z.object({ id: z.string() }))
  .handler(async ({ data }) => {
    const db = await readDb();
    const taskIndex = db.tasks.findIndex((t) => t.id === data.id);
    if (taskIndex !== -1) {
      const task = db.tasks[taskIndex];
      task.completed = !task.completed;
      task.progress = task.completed ? 100 : Math.min(task.progress, 99);

      // Update stats if task is completed
      if (task.completed) {
        db.user.totalCompleted += 1;
        // Find today's day of week
        const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
        const todayStr = days[new Date().getDay()];
        const stat = db.weeklyStats.find((s) => s.day === todayStr);
        if (stat) {
          stat.completed += 1;
          stat.total += 1;
        }
      }

      await writeDb(db);
      return task;
    }
    throw new Error("Task not found");
  });

// Delete a task
export const deleteTask = createServerFn({ method: "POST" })
  .inputValidator(z.object({ id: z.string() }))
  .handler(async ({ data }) => {
    const db = await readDb();
    const initialLength = db.tasks.length;
    db.tasks = db.tasks.filter((t) => t.id !== data.id);
    if (db.tasks.length !== initialLength) {
      await writeDb(db);
      return { success: true };
    }
    throw new Error("Task not found");
  });

// Update a task details
export const updateTask = createServerFn({ method: "POST" })
  .inputValidator(
    z.object({
      id: z.string(),
      title: z.string().optional(),
      category: z.string().optional(),
      priority: z.string().optional(),
      progress: z.number().optional(),
      completed: z.boolean().optional(),
      description: z.string().optional(),
      subtasks: z
        .array(
          z.object({
            id: z.string(),
            title: z.string(),
            completed: z.boolean(),
          }),
        )
        .optional(),
    }),
  )
  .handler(async ({ data }) => {
    const db = await readDb();
    const task = db.tasks.find((t) => t.id === data.id);
    if (task) {
      if (data.title !== undefined) task.title = data.title;
      if (data.category !== undefined) task.category = data.category;
      if (data.priority !== undefined) task.priority = data.priority;
      if (data.progress !== undefined) task.progress = data.progress;
      if (data.completed !== undefined) {
        task.completed = data.completed;
        if (task.completed) task.progress = 100;
      }
      if (data.description !== undefined) task.description = data.description;
      if (data.subtasks !== undefined) task.subtasks = data.subtasks;

      await writeDb(db);
      return task;
    }
    throw new Error("Task not found");
  });

// Mark all notifications as read
export const readAllNotifications = createServerFn({ method: "POST" }).handler(async () => {
  const db = await readDb();
  db.notifications.forEach((n) => {
    n.unread = false;
  });
  await writeDb(db);
  return db.notifications;
});

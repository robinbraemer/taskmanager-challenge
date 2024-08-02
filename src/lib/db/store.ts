import {projects, tasks, users, Project, User} from './schema';
import { eq } from 'drizzle-orm';
import db from "$lib/db/index";

export const store = {
  // User operations
  createUser: async (user: User) => {
    return db.insert(users).values(user).returning();
  },
  getUserById: async (id: number) => {
    return db.select().from(users).where(eq(users.id, id));
  },

  // Project operations
  getProjects: async () => {
    return db.select().from(projects);
  },
  createProject: async (project: Project) => {
    return db.insert(projects).values(project).returning();
  },
  updateProject: async (id: number, project: Project) => {
    return db.update(projects).set(project).where(eq(projects.id, id)).returning();
  },
  deleteProject: async (id: number) => {
    return db.delete(projects).where(eq(projects.id, id));
  },

  // Task operations
  getTasks: async (projectId: number) => {
    return db.select().from(tasks).where(eq(tasks.projectId, projectId));
  },
  createTask: async (task: NewTask) => {
    return db.insert(tasks).values(task).returning();
  },
  updateTask: async (id: number, task: Partial<NewTask>) => {
    return db.update(tasks).set(task).where(eq(tasks.id, id)).returning();
  },
  deleteTask: async (id: number) => {
    return db.delete(tasks).where(eq(tasks.id, id));
  }
};
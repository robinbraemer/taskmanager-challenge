import {pgTable, serial, varchar, text, timestamp, integer} from 'drizzle-orm/pg-core';
import {type InferSelectModel} from 'drizzle-orm';
import {createInsertSchema, createSelectSchema} from "drizzle-zod";
import {z} from "zod";

export const users = pgTable('users', {
    id: serial('id').primaryKey(),
    username: varchar('username', {length: 50}).notNull().unique(),
    email: varchar('email', {length: 100}).notNull().unique(),
    passwordHash: varchar('password_hash', {length: 100}).notNull(),
    createdAt: timestamp('created_at').defaultNow()
});

export const projects = pgTable('projects', {
    id: serial('id').primaryKey(),
    name: varchar('name', {length: 100}).notNull(),
    description: text('description'),
    createdAt: timestamp('created_at').defaultNow(),
    creatorId: integer('creator_id').references(() => users.id)
});

export const tasks = pgTable('tasks', {
    id: serial('id').primaryKey(),
    title: varchar('title', {length: 100}).notNull(),
    description: text('description'),
    status: varchar('status', {length: 20}).notNull().default('TODO'),
    projectId: integer('project_id').references(() => projects.id),
    assigneeId: integer('assignee_id').references(() => users.id),
    createdAt: timestamp('created_at').defaultNow(),
    updatedAt: timestamp('updated_at').defaultNow()
});

export type User = InferSelectModel<typeof users>;
export type Project = InferSelectModel<typeof projects>;
export type Task = InferSelectModel<typeof tasks>;

export const InsertProjectSchema = createInsertSchema(projects);
export type InsertProject = z.infer<typeof InsertProjectSchema>;

export const SelectProjectSchema = createSelectSchema(projects);
export type SelectProject = z.infer<typeof SelectProjectSchema>;

export const InsertTaskSchema = createInsertSchema(tasks);
export type InsertTask = z.infer<typeof InsertTaskSchema>;

export const InsertUserSchema = createInsertSchema(users);
export type InsertUser = z.infer<typeof InsertUserSchema>;


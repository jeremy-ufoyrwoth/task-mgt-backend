import { relations } from "drizzle-orm";
import { pgTable, uuid, timestamp, boolean, text } from "drizzle-orm/pg-core";

const createdAt = timestamp("createdAt").notNull().defaultNow();
const updatedAt = timestamp("updatedAt")
  .notNull()
  .defaultNow()
  .$onUpdate(() => new Date());

export const users = pgTable("user", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: text("name").notNull().unique(),
  email: text("email").notNull(),
  password: text("password").notNull(),
  createdAt,
  updatedAt,
});

export const tasks = pgTable("task", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: text("name").notNull(),
  isCompleted: boolean("isCompleted").notNull().default(false),
  description: text("description").default(""),
  createdBy: uuid("createdBy")
    .notNull()
    .references(() => users.id),
  createdAt,
  updatedAt,
});

export const taskAssignments = pgTable("task_assignment", {
  id: uuid("id").primaryKey().defaultRandom(),
  taskId: uuid("taskId")
    .notNull()
    .references(() => tasks.id),
  userId: uuid("userId")
    .notNull()
    .references(() => users.id),
  createdAt,
  updatedAt,
});

// RELATIONS
export const userTaskRelations = relations(users, ({ many }) => ({
  tasks: many(tasks),
}));

export const taskAssignmentsRelations = relations(
  taskAssignments,
  ({ one }) => ({
    task: one(tasks),
    user: one(users),
  })
);

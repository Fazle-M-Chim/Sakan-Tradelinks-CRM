import { pgTable, text, serial, integer, boolean, timestamp, date } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const clients = pgTable("clients", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  industry: text("industry"),
  lastContacted: date("last_contacted"),
  status: text("status").default("Active"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const contacts = pgTable("contacts", {
  id: serial("id").primaryKey(),
  clientId: integer("client_id").notNull(),
  name: text("name").notNull(),
  position: text("position"),
  email: text("email"),
  phone: text("phone"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const machines = pgTable("machines", {
  id: serial("id").primaryKey(),
  clientId: integer("client_id").notNull(),
  model: text("model").notNull(),
  serialNumber: text("serial_number").notNull(),
  purchaseDate: date("purchase_date"),
  warrantyStatus: text("warranty_status"),
  amcStatus: text("amc_status"),
  insuranceValidUntil: date("insurance_valid_until"),
  lastContacted: date("last_contacted"),
  notes: text("notes"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const reminders = pgTable("reminders", {
  id: serial("id").primaryKey(),
  clientId: integer("client_id").notNull(),
  type: text("type").notNull(),
  dueDate: date("due_date").notNull(),
  isOverdue: boolean("is_overdue").default(false),
  completed: boolean("completed").default(false),
  createdAt: timestamp("created_at").defaultNow(),
});

export const insertClientSchema = createInsertSchema(clients).omit({
  id: true,
  createdAt: true,
});

export const insertContactSchema = createInsertSchema(contacts).omit({
  id: true,
  createdAt: true,
});

export const insertMachineSchema = createInsertSchema(machines).omit({
  id: true,
  createdAt: true,
});

export const insertReminderSchema = createInsertSchema(reminders).omit({
  id: true,
  createdAt: true,
});

export type InsertClient = z.infer<typeof insertClientSchema>;
export type InsertContact = z.infer<typeof insertContactSchema>;
export type InsertMachine = z.infer<typeof insertMachineSchema>;
export type InsertReminder = z.infer<typeof insertReminderSchema>;

export type Client = typeof clients.$inferSelect;
export type Contact = typeof contacts.$inferSelect;
export type Machine = typeof machines.$inferSelect;
export type Reminder = typeof reminders.$inferSelect;

export type ClientWithDetails = Client & {
  contacts: Contact[];
  machines: Machine[];
};

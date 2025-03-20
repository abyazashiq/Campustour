import { pgTable, text, serial, real, json } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const locations = pgTable("locations", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  description: text("description").notNull(),
  panoramaUrl: text("panorama_url").notNull(),
  position: json("position").$type<{lat: number; lng: number}>().notNull(),
  type: text("type").notNull(), // 'building' | 'intersection' | 'landmark'
});

export const navigationPoints = pgTable("navigation_points", {
  id: serial("id").primaryKey(),
  locationId: serial("location_id").references(() => locations.id),
  nextLocationId: serial("next_location_id").references(() => locations.id),
  direction: real("direction").notNull(), // angle in degrees
  distance: real("distance").notNull(), // distance in meters
});

export const insertLocationSchema = createInsertSchema(locations);
export const insertNavigationPointSchema = createInsertSchema(navigationPoints);

export type Location = typeof locations.$inferSelect;
export type NavigationPoint = typeof navigationPoints.$inferSelect;
export type InsertLocation = z.infer<typeof insertLocationSchema>;
export type InsertNavigationPoint = z.infer<typeof insertNavigationPointSchema>;

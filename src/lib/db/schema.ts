import { sql } from "drizzle-orm";
import { char, integer, json, pgTable, text, uuid } from "drizzle-orm/pg-core";

/**
 * Recipes table schema
 */
export const recipes = pgTable("recipes", {
    id: char("id", { length: 24 }).primaryKey(),
    name: text("name").notNull(),
    country: char("country", { length: 2 }).notNull(),
    description: text("description").notNull(),
    headline: text("headline").notNull(),
    difficulty: integer("difficulty").notNull(),
    prepTime: text("prep_time").notNull(),
    totalTime: text("total_time"),
    imagePath: text("image_path").notNull(),
    yields_json: json("yields_json").notNull(),
    steps: text("steps").notNull(),
    slug: text("slug").notNull(),
    bridge_recipes_tags: json("tags").notNull(), // TODO: Extract tags to a separate table
    bridge_recipes_cuisines: json("cuisines").notNull(), // TODO: Extract cuisines to a separate table
});

/**
 * Ingredients table schema
 */
export const ingredients = pgTable("ingredients", {
    id: char("id", { length: 24 }).primaryKey(),
    name: text("name").notNull(),
    slug: text("slug").notNull(),
    type: text("type").notNull(),
    country: char("country", { length: 2 }).notNull(),
});

/**
 * Ingredients to recipes bridge table schema
 */
export const ingredients_to_recipes = pgTable("ingredients_to_recipes", {
    id: uuid("id").primaryKey().default(sql`uuid_generate_v4()`),
    ingredient_id: char("ingredient_id", { length: 24 }).notNull().references(() => ingredients.id),
    recipe_id: char("recipe_id", { length: 24 }).notNull().references(() => recipes.id),
});

import type { PostgresJsDatabase } from "drizzle-orm/postgres-js";

export type DB = PostgresJsDatabase<Record<string, never>>;

export type Recipe = {
    id: string;
    name: string;
    country: string;
    description: string;
    headline: string;
    difficulty: number;
    prepTime: string;
    totalTime?: string;
    imagePath: string;
    yields_json: string;
    steps: string;
    slug: string;
    bridge_recipes_ingredients: Ingredients[];
    bridge_recipes_tags: Tags[];
}

export type Ingredients = {
    id: string;
    name: string;
    slug: string;
    type: string;
    country: string;
}

export type Tags = {
    tags: {
        id: string;
        name: string;
    };
}

export type Step = {
    index: number;
    instructionsMarkdown: string;
    ingredients: string[];
    images: {
        path: string;
        caption: string;
    }[];
}
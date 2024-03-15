import type { DB, Ingredients } from "$lib";
import { ingredients, ingredients_to_recipes, recipes } from "$lib/db/schema";
import type { RequestHandler } from "@sveltejs/kit";
import { eq, sql } from "drizzle-orm";
import { z } from 'zod';

/**
 * GET Endpoint for /recipes?limit={LIMIT}&offset={OFFSET}
 * @returns an array of recipes
 */
export const GET: RequestHandler = async ({ locals, url }) => {
    const limit = z.string().transform(Number).parse(url.searchParams.get('limit') ?? "25");
    const offset = z.string().transform(Number).parse(url.searchParams.get('offset') ?? "0");

    const db = locals.db as DB;

    const result = await db.select({
        recipes,
        bridge_recipes_ingredients: sql<Ingredients[]>`json_agg(ingredients)`.as("bridge_recipes_ingredients")
    })
        .from(ingredients_to_recipes)
        .rightJoin(recipes, eq(ingredients_to_recipes.recipe_id, recipes.id))
        .leftJoin(ingredients, eq(ingredients_to_recipes.ingredient_id, ingredients.id))
        .groupBy(recipes.id)
        .limit(limit)
        .offset(offset);

    const mapped = result.map(({ recipes, bridge_recipes_ingredients }) => {
        return {
            ...recipes,
            bridge_recipes_ingredients
        }
    });

    const response = new Response(JSON.stringify(mapped), {
        headers: {
            'content-type': 'application/json'
        }
    });

    return response;
};
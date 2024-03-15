import type { DB, Ingredients } from "$lib";
import { ingredients, ingredients_to_recipes, recipes } from "$lib/db/schema";
import type { RequestHandler } from "@sveltejs/kit";
import { eq, sql } from "drizzle-orm";
import { z } from 'zod';

/**
 * GET Endpoint for /recipes/[id]
 * @returns an array of recipes
 */
export const GET: RequestHandler = async ({ locals, params }) => {
    const id = z.string().length(24).parse(params.id);

    const db = locals.db as DB;

    const [recipe] = await db.select({
        recipes,
        bridge_recipes_ingredients: sql<Ingredients[]>`json_agg(ingredients)`.as("bridge_recipes_ingredients")
    })
        .from(ingredients_to_recipes)
        .rightJoin(recipes, eq(ingredients_to_recipes.recipe_id, recipes.id))
        .leftJoin(ingredients, eq(ingredients_to_recipes.ingredient_id, ingredients.id))
        .where(eq(recipes.id, id))
        .groupBy(recipes.id)
        .limit(1);

    const response = new Response(JSON.stringify({
        ...recipe.recipes,
        bridge_recipes_ingredients: recipe.bridge_recipes_ingredients
    }), {
        headers: {
            'content-type': 'application/json'
        }
    });

    return response;
};
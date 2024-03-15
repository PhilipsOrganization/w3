import { recipes, ingredients, ingredients_to_recipes } from "./schema";
import { recipes as json } from "./recipes";
import type { DB } from "$lib";

async function seedIngredients(db: DB) {
    console.log("Seeding ingredients");
    const ingredientsToInsert: Array<typeof ingredients.$inferInsert> = [];
    const idSet = new Set<string>();

    for (const rec of json) {
        for (const i of rec.bridge_recipes_ingredients) {
            if (idSet.has(i.ingredients.id)) {
                continue;
            }
            idSet.add(i.ingredients.id);

            ingredientsToInsert.push(i.ingredients);
        }
    }

    await db.insert(ingredients).values(ingredientsToInsert).onConflictDoNothing();
    console.log(ingredientsToInsert.length, "Ingredients seeded");
};

async function seedRecipes(db: DB) {
    console.log("Seeding recipes");
    const recipesToInsert: Array<typeof recipes.$inferInsert> = [];

    for (const recipe of json) {
        const recipeWithoutIngredients = {
            id: recipe.id,
            name: recipe.name,
            country: recipe.country,
            description: recipe.description,
            headline: recipe.headline,
            difficulty: recipe.difficulty,
            prepTime: recipe.prepTime,
            totalTime: recipe.totalTime,
            imagePath: recipe.imagePath,
            yields_json: recipe.yields_json,
            steps: recipe.steps,
            slug: recipe.slug,
            bridge_recipes_tags: recipe.bridge_recipes_tags,
            bridge_recipes_cuisines: recipe.bridge_recipes_cuisines
        };
        recipesToInsert.push(recipeWithoutIngredients);
    }

    await db.insert(recipes).values(recipesToInsert).onConflictDoNothing();
    console.log(recipesToInsert.length, "Recipes seeded");
}

async function seedIngredientsToRecipes(db: DB) {
    console.log("Seeding ingredients to recipes");
    const ingredientsToRecipesToInsert: Array<typeof ingredients_to_recipes.$inferInsert> = [];

    for (const rec of json) {
        for (const i of rec.bridge_recipes_ingredients) {
            ingredientsToRecipesToInsert.push({
                id: i.id,
                ingredient_id: i.ingredients.id,
                recipe_id: rec.id
            });
        }
    }

    await db.insert(ingredients_to_recipes).values(ingredientsToRecipesToInsert).onConflictDoNothing();
    console.log(ingredientsToRecipesToInsert.length, "Ingredients to recipes seeded");
}

export async function seed(db: DB) {
    await seedIngredients(db);
    await seedRecipes(db);
    await seedIngredientsToRecipes(db);
}

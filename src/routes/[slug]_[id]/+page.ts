import type { Recipe } from "$lib";
import type { PageLoad } from "./$types";

export const load: PageLoad = async ({ fetch, params }) => {
    const response = await fetch(`/recipes/${params.id}`);
    const recipe = await response.json() as Recipe;

    return { recipe };
};
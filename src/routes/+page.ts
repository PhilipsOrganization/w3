import type { PageLoad } from "./$types";
import type { Recipe } from "$lib";

export const load: PageLoad = async ({ fetch, url }) => {
    const response = await fetch(`/recipes?${url.searchParams.toString()}`);
    const recipes: Recipe[] = await response.json();

    return { recipes };
};
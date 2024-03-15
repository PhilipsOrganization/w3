// See https://kit.svelte.dev/docs/types#app

import type { Recipe } from "$lib";
import type { DB } from "$lib/db";

// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
		interface Locals {
			db: DB;
		}
		// interface PageData {}
		interface PageState {
			recipe: Recipe;
		}
		// interface Platform {}
	}
}

export { };

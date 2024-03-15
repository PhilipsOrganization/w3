<script lang="ts">
	import { page } from '$app/stores';
	import Modal from '$lib/components/modal.svelte';
	import RecipeCard from '$lib/components/recipe-card.svelte';
	import RecipePage from './[slug]_[id]/+page.svelte';

	export let data;

	$: offset = parseInt($page.url.searchParams.get('offset') ?? '0') + data.recipes.length;
</script>

<header>
	<h1>Recipes</h1>
</header>

<main>
	{#each data.recipes as recipe (recipe.id)}
		<RecipeCard {recipe} />
	{/each}
	<a href="?offset={offset}">Weiter</a>
</main>

{#if $page.state.recipe}
	<Modal on:close={() => history.back()}>
		<RecipePage data={$page.state} />
	</Modal>
{/if}

<style>
	header {
		text-align: center;
		margin-bottom: 2rem;
	}

	main {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(360px, 1fr));
		gap: 2rem;
		max-width: min(90vw, 1200px);
		margin: 0 auto 40vh;
	}
</style>

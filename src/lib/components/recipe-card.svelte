<script lang="ts">
	import { goto, preloadData, pushState } from '$app/navigation';
	import type { Recipe } from '$lib';

	export let recipe: Recipe;

	const timeString = recipe.totalTime ?? recipe.prepTime;
	const time = parseInt(timeString) || 0;
	const tags = recipe.bridge_recipes_tags.map((tag) => tag.tags.name).join(', ');

	async function route(e: any, recipe: Recipe) {
		if (e.metaKey || innerWidth < 640) {
			return;
		}

		e.preventDefault();
		const { href } = e.currentTarget;
		const result = await preloadData(href);

		if (result.type === 'loaded' && result.status === 200) {
			pushState(href, { recipe });
		} else {
			// something bad happened! try navigating
			goto(href);
		}
	}
</script>

<a class="card" on:click={(e) => route(e, recipe)} href="/{recipe.slug}_{recipe.id}">
	<img
		src="https://img.hellofresh.com/w_400/hellofresh_s3/{recipe.imagePath}"
		alt={recipe.name}
		loading="lazy"
		width="400"
		height="267"
	/>

	<div class="body">
		<h2>{recipe.name}</h2>
		<p class="ellipse">{recipe.headline}</p>
	</div>

	<div class="detail">
		<b>{time} min</b>
		<span class="ellipse">{tags}</span>
	</div>
</a>

<style>
	.card {
		display: grid;
		grid-template-areas: 'image' 'body' 'detail';
		border-radius: 10px;
		overflow: hidden;
		border: 1px solid #e0e0e0;
	}

	.card:hover {
		box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.1);
	}

	img {
		grid-area: image;
		width: 100%;
		object-fit: cover;
	}

	.body {
		grid-area: body;
		padding: 1rem;
	}

	h2,
	p {
		margin: 10px 0;
	}

	.detail {
		grid-area: detail;
		display: flex;
		justify-content: space-between;
		padding: 1rem;
		gap: 30px;
	}

	b {
		white-space: nowrap;
	}

	.ellipse {
		text-overflow: ellipsis;
		white-space: nowrap;
		overflow: hidden;
	}
</style>

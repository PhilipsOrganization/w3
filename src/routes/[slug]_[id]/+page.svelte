<script lang="ts">
	import Step from '$lib/components/step.svelte';
	import { ingredients } from '$lib/db/schema';

	export let data;

	const recipe = data.recipe;
	const steps = JSON.parse(recipe.steps);

	let currentStep = 0;

	function nextStep() {
		currentStep = (currentStep + 1) % steps.length;
	}

	function previousStep() {
		currentStep = (currentStep - 1 + steps.length) % steps.length;
	}
</script>

<main>
	<section>
		<img
			src="https://img.hellofresh.com/w_400/hellofresh_s3/{recipe.imagePath}"
			alt={recipe.name}
			loading="lazy"
			width="400"
			height="267"
		/>
		<div class="overlay">
			<h1>{recipe.name}</h1>
			<h2>{recipe.headline}</h2>
		</div>
	</section>

	<p>{recipe.description}</p>
	<ul>
		<li>Zubereitungszeit: {recipe.prepTime}</li>
		<li>Gesamtzeit: {recipe.totalTime}</li>
	</ul>

	<!-- TODO: add ingredients -->
	
	<div id="instructions">
		<h3>Anleitung</h3>
		<Step instructions={steps[currentStep]}></Step>
		<nav>
			<button on:click={previousStep}>Zurück</button>
			<button class="primary" on:click={nextStep}>Weiter</button>
		</nav>
	</div>
</main>

<style>
	main {
		max-width: min(90vw, 1200px);
		margin: 0 auto;
	}

	section {
		position: relative;
	}

	img {
		width: 100%;
		object-fit: cover;
	}

	.overlay {
		position: absolute;
		inset: auto 0 0 0;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		background-color: rgba(0, 0, 0, 0.5);
		color: white;
	}

	h1,
	h2,
	h3 {
		margin: 12px 20px;
	}

	h2 {
		font-size: 16px;
	}

	p {
		text-align: center;
		text-wrap: pretty;
	}

	#instructions {
		display: flex;
		flex-direction: column;
		align-items: center;
		max-width: 80%;
		margin: 0 auto 40vh;
	}

	nav {
		display: flex;
		gap: 20px;
	}

	button {
		padding: 10px 20px;
		border-radius: 5px;
		border: none;
		cursor: pointer;
		background: 0;
	}

	button.primary {
		background-color: #f0f0f0;
	}
</style>

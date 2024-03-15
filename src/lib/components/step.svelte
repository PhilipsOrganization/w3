<script lang="ts">
	import type { Step } from '$lib';

	export let instructions: Step;

	$: image = instructions.images[0];
</script>

<div class="step">
	{#if image}
		<img src="https://img.hellofresh.com/w_400/hellofresh_s3/{image.path}" alt={image.caption} />
	{/if}
	<p>{instructions.instructionsMarkdown}</p>
</div>

<style>
	.step {
		display: flex;
		gap: 1rem;
		max-width: min(90vw, 1200px);
		margin: 2rem auto;
	}

	img {
		width: 200px;
		height: 200px;
		object-fit: cover;
		border-radius: 10px;
	}

	p {
		max-width: min(90vw, 600px);
	}
</style>

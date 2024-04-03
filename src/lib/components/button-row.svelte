<script lang="ts">
	import { setMultiplier } from '$lib/multiplier-action';
	import { submitThrow } from '$lib/stores';

	export let multiplier: number;

	const buttons = new Array(20).fill(0).map((_, i) => 20 - i);
</script>

{#each buttons as score}
	<button class="center" on:click={() => submitThrow(score, multiplier)} use:setMultiplier={multiplier}
		>{score}</button
	>
{/each}

<style>
	button {
		font-size: 25px;
		font-weight: 400;
		line-height: 20px;
		aspect-ratio: 64/55;
		background: var(--bg, #282828);
	}

	button:hover {
		background: #161616;
	}
</style>

<script lang="ts">
	import { setMultiplier } from '$lib/multiplier-action';
	import { submitThrow } from '$lib/stores';
	import ButtonRow from './button-row.svelte';
</script>

<div>
	<button id="miss" class="regular-45" on:click={() => submitThrow(0, 0)}>Miss</button>
	<button class="regular-45" on:click={() => submitThrow(25, 1)}>Bull</button>
	<button use:setMultiplier={2} id="bull-2" class="regular-45" on:click={() => submitThrow(25, 2)}>Bull</button>
</div>

<section>
	<ButtonRow multiplier={1}></ButtonRow>
	<ButtonRow multiplier={2} --bg="#363636"></ButtonRow>
	<ButtonRow multiplier={3} --bg="#434343"></ButtonRow>
</section>

<style>
	div {
		display: flex;
	}

	button {
		flex: 1;
		padding: 23px 0;
	}

	section {
		display: grid;
		grid-template-columns: repeat(10, 1fr);
	}

	#miss {
		background: black;
	}

	#bull-2 {
		background: #434343;
	}
</style>

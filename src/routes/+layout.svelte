<script lang="ts">
	import Header from '$lib/components/header.svelte';
	import Modal from '$lib/components/modal.svelte';
	import { gameEvent } from '$lib/stores';
	import { GameEvent } from '$lib/types';
</script>

<Header></Header>

<slot />

{#if $gameEvent === GameEvent.Bust}
	<Modal on:close={() => ($gameEvent = undefined)}>
		<p class="bold-125">Bust!</p>
	</Modal>
{:else if $gameEvent === GameEvent.WinGame}
	<Modal on:close={() => ($gameEvent = undefined)}>
		<p class="bold-125">Gewonnen!</p>
	</Modal>
{:else if $gameEvent === GameEvent.WinRound}
	<Modal on:close={() => ($gameEvent = undefined)}>
		<p class="bold-125">Runde gewonnen!</p>
	</Modal>
{/if}

<style>
	:global(body) {
		font-family: 'Alumni Sans', sans-serif;
		font-optical-sizing: auto;
		font-weight: 400;
		color: white;

		margin: 0;
		padding: 0;
		background-image: url('/background.svg');
		background-size: cover;
	}

	:global(*) {
		font-family: inherit;
		box-sizing: border-box;
		min-width: 0;
	}

	:global(a) {
		text-decoration: none;
		color: inherit;
	}

	:global(button) {
		cursor: pointer;
		background: #282828;
		border: 1px solid #434343;
		color: white;
		text-transform: uppercase;
	}

	:global(.center) {
		display: flex;
		align-items: center;
		justify-content: center;
	}

	:global(.big-15) {
		font-style: italic;
		font-weight: 700;
		font-size: 15px;
	}

	:global(.big-25) {
		font-style: italic;
		font-weight: 700;
		font-size: 25px;
	}

	:global(.big-60) {
		font-style: italic;
		font-weight: 700;
		font-size: 60px;
	}

	:global(.bold-125) {
		font-weight: 700;
		font-size: 125px;
	}

	:global(.bold-120) {
		font-weight: 700;
		font-size: 120px;
	}

	:global(.bold-25) {
		font-weight: 700;
		font-size: 25px;
	}

	:global(.regular-25) {
		font-weight: 400;
		font-size: 25px;
	}

	:global(.regular-45) {
		font-weight: 400;
		font-size: 45px;
	}

	:global(.light-25) {
		font-size: 25px;
		font-style: italic;
		font-weight: 400;
		line-height: 20px;
	}

	:global(.multiplier) {
		position: relative;
	}

	:global(.multiplier::after) {
		position: absolute;
		content: '';
		background-size: contain;
		background-repeat: no-repeat;
		background-position: center;

		inset: auto 0 calc(14% - 1px) 0;
		height: 10px;
		margin: auto;
	}

	:global(.multiplier-2::after) {
		background-image: url('/modifier-2.svg');
		width: max(10%, 10px);
	}

	:global(.multiplier-3::after) {
		background-image: url('/modifier-3.svg');
		width: 15px;
	}

	p {
		margin: 0;
	}
</style>

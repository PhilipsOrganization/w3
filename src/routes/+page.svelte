<script lang="ts">
	import ModeDisplay from '$lib/components/mode-display.svelte';
	import PlayerSwitch from '$lib/components/player-switch.svelte';
	import Score from '$lib/components/score.svelte';
	import ThrowResult from '$lib/components/throw-result.svelte';
	import { Back } from '$lib/icons';
	import { nextPlayer } from '$lib/stores';
</script>

<main>
	<section>
		<PlayerSwitch />
		<div class="desktop-only">
			<ModeDisplay />
		</div>
	</section>
	<Score />
	<ThrowResult />
	<button id="toggle-view" class="regular-25">Ansicht Wechseln</button>
	<nav>
		<a href="/" class="center"> <Back /> </a>
		<button class="big-60 big" on:click={() => nextPlayer()}>Runde beenden</button>
	</nav>
</main>

<style>
	main {
		padding: 59px;
		max-width: 800px;
		margin: 0 auto;
	}

	@media (max-width: 800px) {
		main {
			padding: 59px 5vw;
		}
	}

	section {
		display: flex;
		align-items: center;
		justify-content: space-between;
		margin-bottom: -15px;
	}

	nav {
		display: grid;
		grid-template-columns: auto 1fr;
		width: 100%;
	}

	a {
		background: #222222;
		min-width: 100px;
	}

	button {
		text-transform: uppercase;
		border: 0;
	}

	#toggle-view {
		margin-bottom: 40px;
	}

	button.big {
		background: #434343;
		padding: 50px 0;
		font-size: 35px;
	}
	
	.desktop-only {
		display: none;
	}

	@media (min-width: 800px) {
		.desktop-only {
			display: contents;
		}
	}
</style>

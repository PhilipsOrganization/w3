<script lang="ts">
	import { PlayerMode } from '$lib/icons';
	import { activePlayer, players } from '$lib/stores';
</script>

<div id="players">
	{#each $players as player}
		{@const myTurn = player === $activePlayer}
		<div class="player" class:myTurn>
			<PlayerMode size={myTurn ? 4 : 3} highlightFirst={player.gamesWon > 0} />
			<img src={player.img} alt="{player.name} icon" />
			{#if myTurn}
				<p class="big-15">{player.name}</p>
				{#if player.rank}
					<p class="light-25">{player.rank}</p>
				{/if}
			{:else}
				<p class="bold-25 move-up">{player.score}</p>
			{/if}
		</div>
	{/each}
</div>

<style>
	#players {
		display: flex;
		align-items: center;
		gap: 10px;
		margin-left: 35px;
		margin-bottom: 75px;
	}

	.player {
		display: flex;
		flex-flow: column nowrap;
		align-items: center;
		width: 75px;
		height: 75px;
		position: relative;
	}

	.player :global(svg) {
		margin-bottom: 5px;
		position: absolute;
		top: -12px;
		z-index: 10;
	}

	.player.myTurn {
		translate: 0 -25%;
		z-index: 10;
	}

	img {
		border-radius: 50%;
		width: 75px;
		height: 75px;
		transition: all 0.3s ease-in-out;
		margin-bottom: 5px;
		border: 0px solid #ff7700;
	}

	.player.myTurn img {
		border: 4px solid #ff7700;
		width: 125px;
		height: 125px;
		z-index: 10;
	}

	p {
		margin: 0;
	}

	.move-up {
		translate: 0 -14px;
	}
</style>

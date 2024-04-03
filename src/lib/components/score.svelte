<script lang="ts">
	import { Dart } from '$lib/icons';
	import { throws, getActiveScore } from '$lib/stores';

	$: throwsLeft = 3 - $throws.length;
	$: throwsArray = Array(throwsLeft).fill(0);
	$: score = getActiveScore($throws);
</script>

<section>
	<div id="throws" class="center">
		{#each throwsArray as _}
			<Dart></Dart>
		{/each}
		{#each $throws as item}
			<span class="center regular-25"> {item.value * item.multiplier} </span>
		{/each}
	</div>
	<h2 id="score" class="bold-120">{score}</h2>
</section>

<style>
	section {
		display: grid;
		grid-template-areas: 'throws score .';
		grid-template-columns: 1fr auto 1fr;
		gap: 30px;
		margin-bottom: 20px;
	}

	#throws {
		grid-area: throws;
		gap: 10px;
		display: flex;
		justify-content: flex-end;
		gap: 25px;
	}

	span {
		color: black;
		background: white;
		width: 35px;
		height: 30px;
	}

	#score {
		grid-area: score;
		position: relative;
		color: #ff7700;
		margin: 0;
		padding: 0;
	}

	#score::before {
		content: '301';
		position: absolute;
		inset: 0 0 0 0;
		font-style: normal;
		font-weight: 700;
		font-size: 25px;
		text-align: center;
		color: #5e5e5e;
	}

	#score::after {
		content: 'PPD: 14';
		position: absolute;
		inset: auto 0 10px 0;
		text-align: center;
		font-style: normal;
		font-weight: 400;
		font-size: 15px;
		color: #ffffff;
	}
</style>

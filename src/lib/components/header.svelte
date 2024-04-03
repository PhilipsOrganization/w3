<script lang="ts">
	import { Menu, ChevronDown } from '$lib/icons';
</script>

<header>
	<nav>
		<Menu />
		<img src="/darts-logo.svg" alt="game station darts" />
		<ChevronDown />
	</nav>
	<img src="/w3.svg" alt="w3" />
</header>

<style>
	header {
		display: flex;
		justify-content: space-between;
		padding: 40px 54px 0px;
		background: linear-gradient(0deg, rgba(17, 17, 17, 0) 0%, #111111 100%);
	}

	nav {
		display: flex;
		align-items: center;
		gap: 10px;
	}

	img {
		margin-left: 5px;
	}
</style>

<script lang="ts">
	import { Mode } from '$lib/icons';
	import Trash from '$lib/icons/trash.svelte';

	let mode = 301;
</script>

<div class="big-25">
	<span>{mode}</span>
	<Mode></Mode>
	<span class="mr">First to 2</span>
	<Trash></Trash>
</div>

<style>
	div {
		display: flex;
		align-items: center;
		justify-content: center;
        gap: 10px;
		translate: 0 -20px;
	}

    span {
		color: black;
        background: white;
        padding: 5px;
        text-transform: uppercase;
		line-height: 80%;
    }

    .mr {
        margin-right: 10px;
    }
</style>

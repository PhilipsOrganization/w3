<script lang="ts">
	import { createEventDispatcher, onMount } from 'svelte';

	let dialogElement: HTMLDialogElement;

	onMount(() => {
		dialogElement.showModal();
	});

	const dispatch = createEventDispatcher();

	export function close() {
		dispatch('close');
	}
</script>


<!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
<!-- svelte-ignore a11y-click-events-have-key-events -->
<dialog bind:this={dialogElement} on:click={close}>
	<slot />
</dialog>

<style>
	dialog {
		border: none;
	}

	dialog::backdrop {
		background: rgba(0, 0, 0, 0.5);
	}
</style>

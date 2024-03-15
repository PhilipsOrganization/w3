<script lang="ts">
	import { createEventDispatcher } from 'svelte';

	const dispatch = createEventDispatcher();

	let dialog: HTMLDialogElement;

	$: if (dialog) {
		dialog.showModal();
        dialog.scrollTo(0, 0);
	}

    function close() {
        dialog.close();
        dispatch('close');
    }
</script>

<svelte:window on:keydown={(event) => event.key === 'Escape' && close()}/>
<!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
<!-- svelte-ignore a11y-click-events-have-key-events -->
<dialog aria-modal="true" bind:this={dialog} on:click|self={close}>
    <slot />
</dialog>

<style>
	dialog {
		max-width: min(90vw, 800px);
		border-radius: 0.2em;
		border: none;
		padding: 0;
	}

	dialog::backdrop {
		background: rgba(0, 0, 0, 0.3);
	}

	dialog[open] {
		animation: zoom 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
	}

	dialog[open]::backdrop {
		animation: fade 0.2s ease-out;
	}

	@keyframes zoom {
		from {
			transform: scale(0.95);
		}
		to {
			transform: scale(1);
		}
	}

	@keyframes fade {
		from {
			opacity: 0;
		}
		to {
			opacity: 1;
		}
	}
</style>

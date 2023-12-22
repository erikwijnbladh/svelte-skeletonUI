<!-- Modal.svelte -->
<script>
	import { createEventDispatcher } from 'svelte';
	export let show = false;
	const dispatch = createEventDispatcher();
	export function close() {
		show = false;
		dispatch('closeModal');
	}
</script>

{#if show}
	<div class="modal-overlay" on:click={close}>
		<div class="relative" on:click|stopPropagation>
			<button
				type="button"
				class="btn-md rounded variant-filled-tertiary absolute right-0"
				on:click={close}>×</button
			>
			<slot />
		</div>
	</div>
{/if}

<style>
	.modal-overlay {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background-color: rgba(0, 0, 0, 0.6);
		display: flex;
		justify-content: center;
		align-items: center;
	}
	/* .modal-content {
		padding: 20px;
		border-radius: 5px;
		position: relative;
	} */
</style>

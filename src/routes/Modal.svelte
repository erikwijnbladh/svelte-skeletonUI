<!-- Modal.svelte -->
<script>
	import { createEventDispatcher } from 'svelte';
	import CloseIcon from '../components/icons/+close.svelte';
	export let show = false;
	const dispatch = createEventDispatcher();
	export function close() {
		show = false;
		dispatch('closeModal');
	}
</script>

{#if show}
	<div class="modal-overlay" on:click={close}>
		<div class="relative mr-2" on:click|stopPropagation>
			<button type="button" class="rounded bg-initial absolute right-2 top-2" on:click={close}
				><CloseIcon /></button
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
</style>

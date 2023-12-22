<script>
	import { Avatar } from '@skeletonlabs/skeleton';
	import { Accordion, AccordionItem } from '@skeletonlabs/skeleton';
	import { fade } from 'svelte/transition';
	import { onMount } from 'svelte';

	export let data;

	const pokemon = data.pokeman;
	const sprite = pokemon.sprites.other['official-artwork']['front_default'];

	function typeToBgClass(type) {
		switch (type.type.name) {
			case 'normal':
				return 'bg-normal';
			case 'fire':
				return 'bg-fire';
			case 'water':
				return 'bg-water';
			case 'electric':
				return 'bg-electric';
			case 'grass':
				return 'bg-grass';
			case 'ice':
				return 'bg-ice';
			case 'fighting':
				return 'bg-fighting';
			case 'poison':
				return 'bg-poison';
			case 'ground':
				return 'bg-ground';
			case 'flying':
				return 'bg-flying';
			case 'psychic':
				return 'bg-psychic';
			case 'bug':
				return 'bg-bug';
			case 'rock':
				return 'bg-rock';
			case 'ghost':
				return 'bg-ghost';
			case 'dragon':
				return 'bg-dragon';
			default:
				return 'bg-default'; // A default color if the type is not listed
		}
	}

	let isLoading = true;

	onMount(() => {
		setTimeout(() => {
			isLoading = false;
		}, 1500); // Set delay as 2000 milliseconds or 2 seconds
	});
</script>

<div
	class="card min-w-2xl mx-auto max-w-2xl variant-filled-tertiary select-none text-white"
	transition:fade={{ duration: 200 }}
>
	<header class="card-header flex flex-col items-center">
		{#if isLoading}
			<div class="placeholder-circle w-48 animate-pulse" />
		{:else}
			<Avatar
				src={sprite}
				width="w-48"
				rounded="rounded-none"
				background="transparent"
				class="mx-auto"
			/>
			<h6 class="capitalize">
				{pokemon.name}
			</h6>
			<div class="flex flex-row gap-3 pt-4">
				{#each pokemon.types as type}
					<h6 class="{typeToBgClass(type)} uppercase text-xs px-1 rounded-lg font-semibold">
						{type.type.name}
					</h6>
				{/each}
			</div>
		{/if}
	</header>
	<section class="p-4">
		{#if isLoading}
			<Accordion>
				<AccordionItem>
					<svelte:fragment slot="summary">
						<div class="placeholder animate-pulse" />
					</svelte:fragment>
					<svelte:fragment slot="content">
						<div class="placeholder animate-pulse" />
					</svelte:fragment>
				</AccordionItem>
				<AccordionItem>
					<svelte:fragment slot="summary"><div class="placeholder animate-pulse" /></svelte:fragment
					>
				</AccordionItem>
				<!-- ... -->
			</Accordion>
		{:else}
			<Accordion>
				<AccordionItem open>
					<svelte:fragment slot="summary">
						<h6 class="capitalize">Entry</h6>
					</svelte:fragment>
					<svelte:fragment slot="content">
						<h6>
							{pokemon.flavor_text}
						</h6>
					</svelte:fragment>
				</AccordionItem>
				<AccordionItem>
					<svelte:fragment slot="summary">Accordion 2</svelte:fragment>
					<svelte:fragment slot="content">(content)</svelte:fragment>
				</AccordionItem>
				<!-- ... -->
			</Accordion>
		{/if}
	</section>
	{#if isLoading}
		<footer class="card-footer">
			<div class="placeholder animate-pulse" />
		</footer>
	{:else}
		<footer class="card-footer">
			<div class="flex flex-row justify-between">
				<p>1</p>
				<p>2</p>
			</div>
		</footer>
	{/if}
</div>

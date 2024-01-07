<script>
	import { Avatar } from '@skeletonlabs/skeleton';
	import { Accordion, AccordionItem } from '@skeletonlabs/skeleton';
	import { fade } from 'svelte/transition';
	import { onMount } from 'svelte';
	import { page } from '$app/stores';
	import { preloadData, pushState, goto } from '$app/navigation';
	import FaAngleLeft from 'svelte-icons/fa/FaAngleLeft.svelte';
	import FaAngleRight from 'svelte-icons/fa/FaAngleRight.svelte';

	$: pageTitle = pokemon ? 'SkeletonUI Pokedex - ' + pokemon.name : 'SkeletonUI Pokedex';

	export let data;

	$: pokemon = data.pokemon;
	$: sprite = pokemon ? pokemon.sprites.other['official-artwork']['front_default'] : '';

	// Compute the types to display: use past_types if available, otherwise use current types
	$: pokemonTypes =
		pokemon.past_types && pokemon.past_types.length > 0
			? pokemon.past_types[0].types // Assuming you want to display the types from the first entry in past_types
			: pokemon.types;

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
		}, 1500);
	});
</script>

<svelte:head>
	<title>{pageTitle}</title>
</svelte:head>
<div
	class="card ml-1 md:mx-auto min-w-full max-w-full md:min-w-3xl md:max-w-3xl variant-outline-tertiary select-none"
	transition:fade={{ duration: 200 }}
>
	<header class="card-header flex flex-col items-center">
		{#if isLoading}
			<div class="placeholder-circle w-48 mx-16 md:mx-24 animate-pulse" />
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
				{#each pokemonTypes as type}
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
			<Accordion autocollapse>
				<AccordionItem open>
					<svelte:fragment slot="summary">
						<h6 class="capitalize">Entry</h6>
					</svelte:fragment>
					<svelte:fragment slot="content">
						<p class="text-sm">
							{pokemon.flavor_text}
						</p>
					</svelte:fragment>
				</AccordionItem>
				<AccordionItem>
					<svelte:fragment slot="summary">
						<h6 class="capitalize">Statistics</h6>
					</svelte:fragment>
					<svelte:fragment slot="content">
						<p class="text-sm">
							Height: {pokemon.height / 10}m / Weight: {pokemon.weight / 10}kg
						</p>
					</svelte:fragment>
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
			<div
				class={pokemon.nextEvolutions.length >= 1 && pokemon.prevEvolution
					? 'grid grid-cols-2 gap-2 sm:gap-12'
					: 'flex flex-row justify-center'}
			>
				{#if pokemon.prevEvolution}
					<button type="button" class="btn btn-sm variant-ringed-secondary">
						<span class="h-4">
							<FaAngleLeft />
						</span>
						<a class="hidden sm:flex" href="/pokemon/{pokemon.prevEvolution.id}">
							{#if pokemon.prevEvolution.method == 'level-up'}
								<p>
									Evolves from
									<span class="capitalize">{pokemon.prevEvolution.name} </span>
									at
									{pokemon.prevEvolution.details}
								</p>
							{:else if pokemon.prevEvolution.method == 'use-item'}
								<p>
									Evolves from
									<span class="capitalize">{pokemon.prevEvolution.name} </span>
									via
									{pokemon.prevEvolution.details}
								</p>
							{:else}
								<p>
									Evolves into
									<span class="capitalize">{pokemon.prevEvolution.name} </span>
									via
									{pokemon.prevEvolution.evolutionMethod.details}
								</p>
							{/if}
						</a>
						<a
							class="flex text-xs font-semibold sm:hidden"
							href="/pokemon/{pokemon.prevEvolution.id}"
						>
							<p>
								Evolves from
								<span class="capitalize"> {pokemon.prevEvolution.name}</span>
							</p>
						</a>
					</button>
				{/if}
				{#if pokemon.nextEvolutions}
					<div class="flex flex-col gap-2">
						{#each pokemon.nextEvolutions as evolution}
							<button type="button" class="btn btn-sm variant-ringed-secondary">
								<a class="hidden sm:flex" href="/pokemon/{evolution.id}">
									{#if evolution.evolutionMethod.method == 'level-up'}
										<p>
											Evolves into
											<span class="capitalize">{evolution.name} </span>
											at
											{evolution.evolutionMethod.details}
										</p>
									{:else if evolution.evolutionMethod.method == 'use-item'}
										<p>
											Evolves into
											<span class="capitalize">{evolution.name} </span>
											by
											{evolution.evolutionMethod.details}
										</p>
									{:else}
										<p>
											Evolves into
											<span class="capitalize">{evolution.name} </span>
											via
											{evolution.evolutionMethod.details}
										</p>
									{/if}
								</a>
								<a class="flex text-xs sm:hidden" href="/pokemon/{evolution.id}">
									<p>
										Evolves into
										<span class="capitalize">{evolution.name} </span>
									</p>
								</a>
								<span class="h-4">
									<FaAngleRight />
								</span>
							</button>
						{/each}
					</div>
				{/if}
			</div>
		</footer>
	{/if}
</div>

<script>
	import { pokemons } from '../stores/pokemonstore';
	import { fade } from 'svelte/transition';
	import { preloadData, pushState, goto } from '$app/navigation';
	import { page } from '$app/stores';
	import PokemonPage from './pokemon/[id]/+page.svelte';
	import Modal from './Modal.svelte';
	let showModal = false;

	let searchQuery = '';

	$: filteredPokemons = $pokemons.filter((pokemon) =>
		pokemon.name.toLowerCase().includes(searchQuery.toLowerCase())
	);

	function clearSearch() {
		searchQuery = '';
	}

	$: if ($page.state.pokemon) {
		showModal = true;
	} else {
		showModal = false;
	}
</script>

<svelte:head>
	<title>SkeletonUI Pokedex</title>
	<meta
		name="description"
		content="Generation 1 pokédex made with SvelteKit/SkeltonUI/Tailwindcss"
	/>
</svelte:head>
<div class="space-y-6">
	<div class="mx-7 md:mx-10">
		<label class="label">
			<span>Search Pokémon</span>
			<div class="relative">
				<input class="input" type="text" placeholder="Search..." bind:value={searchQuery} />
				{#if searchQuery}
					<button
						type="button"
						class="btn-icon btn-icon-lg bg-initial absolute right-0 pb-4"
						on:click={clearSearch}
					>
						×
					</button>
				{/if}
			</div>
		</label>
	</div>
	<section
		class="grid grid-cols-2 md:grid-cols-3 mx-4 md:mx-0 gap-4 md:gap-8 font-semibold"
		transition:fade={{ duration: 200 }}
	>
		{#if filteredPokemons.length == 0}
			<p class="min-w-2xl">No pokemon found, try to search for something else</p>
		{/if}
		{#each filteredPokemons as pokemon}
			{#if !filteredPokemons}
				<div class="placeholder-circle w-48 animate-pulse" />
			{:else}
				<a
					class="card card-hover w-36 sm:w-48 variant-ghost-surface mx-auto px-4 md:px-10 select-none"
					href="/pokemon/{pokemon.id}"
					data-sveltekit-preload-data="tap"
					on:click={async (e) => {
						if (e.metaKey || e.ctrlKey) return;

						e.preventDefault(); // prevent default navigation

						const href = `/pokemon/${pokemon.id}`;
						const result = await preloadData(href);

						if (result.type === 'loaded' && result.status === 200) {
							pushState(href, { pokemon: result.data });
						} else {
							goto(href); // fallback to normal navigation on error
						}
					}}
				>
					<header class="card-header">
						<img src={pokemon.sprite} alt="" class="mx-auto" />
					</header>
					<section class="p-4">
						<h6 class="capitalize text-center">{pokemon.name}</h6>
					</section>
				</a>
			{/if}
		{/each}
	</section>
	<div>
		<Modal bind:show={showModal} on:closeModal={() => history.back()}>
			<PokemonPage data={$page.state.pokemon} />
		</Modal>
	</div>
</div>

<style lang="postcss">
</style>

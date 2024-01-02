<script>
	import { pokemons } from '../stores/pokemonstore';
	import { fade } from 'svelte/transition';
	import { preloadData, pushState, goto } from '$app/navigation';
	import { page } from '$app/stores';
	import PokemonPage from './pokemon/[id]/+page.svelte';
	import Modal from './Modal.svelte';
	let showModal = false;

	let searchQuery = '';

	$: filteredPokemons = $pokemons.filter(pokemon => 
			pokemon.name.toLowerCase().includes(searchQuery.toLowerCase())
	);

	function clearSearch	() {
		searchQuery = '';
	}


	function getPageTitle() {
				if ($page.params) {
					return "SkeletonUI Pokedex";	
				}
        return "SkeletonUI Pokedex";
    }
	$: pageTitle = getPageTitle();

</script>
<svelte:head>
	<title>{pageTitle}</title>
	<meta name="description" content="Generation 1 pokédex made with SvelteKit/SkeltonUI/Tailwindcss" />
</svelte:head>
<pre>{$page.store}</pre>
<div class="space-y-6">
<div class="mx-4 md:mx-0">
	<label class="label">
		<span>Search</span>
		<input class="input" type="text" placeholder="Search Pokémon" bind:value={searchQuery} />
		{#if searchQuery}
				<button
				type="button" class="btn-icon btn-icon-md bg-initial absolute right-3  py-1"
				on:click={clearSearch}>
				×
				</button
			>
		{/if}
	</label>
</div>
<section
	class="grid grid-cols-2 md:grid-cols-3 mx-4 md:mx-0 gap-4 md:gap-8 font-semibold"
	transition:fade={{ duration: 200 }}
>
	{#each filteredPokemons as pokemon}
	{#if filteredPokemons.length === 0}
		<div class="placeholder-circle w-48 animate-pulse" />
	{:else}
		<a
			class="card card-hover variant-ghost-surface mx-auto px-4 md:px-10 select-none"
			href="/pokemon/{pokemon.id}"
			data-sveltekit-preload-data="tap"
			on:click={async (e) => {
				if (e.metaKey || e.ctrlKey) return;

				e.preventDefault(); // prevent default navigation

				const href = `/pokemon/${pokemon.id}`;
				const result = await preloadData(href);

				if (result.type === 'loaded' && result.status === 200) {
					pushState(href, { selected: result.data });
					showModal = true;
				} else {
					goto(href); // fallback to normal navigation on error
				}
			}}
		>
			<header class="card-header">
				<!-- <img src={pokemon.sprite} alt="" class="mx-auto" /> -->
			</header>
			<section class="p-4">
				<h6 class="capitalize text-center">{pokemon.name}</h6>
			</section>
		</a>
		{/if}
	{/each}
</section>
{#if $page.state.selected}
	<div transition:fade={{ duration: 200 }}>
		<Modal bind:show={showModal}>
			<PokemonPage data={$page.state.selected} />
		</Modal>
	</div>
{/if}
</div>
<style lang="postcss">
</style>

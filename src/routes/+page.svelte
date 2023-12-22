<script>
	import { pokemons } from '../stores/pokemonstore';
	import { fade } from 'svelte/transition';
	import { preloadData, pushState, goto } from '$app/navigation';
	import { page } from '$app/stores';
	import PokemonPage from './pokemon/[id]/+page.svelte';
	import Modal from './Modal.svelte';
	let showModal = false;
</script>

<section
	class="grid grid-cols-2 md:grid-cols-3 gap-8 font-semibold"
	transition:fade={{ duration: 200 }}
>
	{#each $pokemons as pokemon}
		<a
			class="card card-hover variant-ghost-surface mx-auto px-10 select-none"
			href="/pokemon/{pokemon.id}"
			data-sveltekit-preload-data="tap"
			on:click={async (e) => {
				if (e.metaKey || e.ctrlKey || innerWidth < 640) return;

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
				<img src={pokemon.sprite} alt="" class="mx-auto" />
			</header>
			<section class="p-4"><h6 class="capitalize text-center">{pokemon.name}</h6></section>
		</a>
	{/each}
</section>
{#if $page.state.selected}
	<div transition:fade={{ duration: 200 }}>
		<Modal bind:show={showModal} on:closeModal={() => history.back()}>
			<PokemonPage data={$page.state.selected} />
		</Modal>
	</div>
{/if}

<style lang="postcss">
</style>

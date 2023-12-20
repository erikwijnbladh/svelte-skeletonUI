<script>
	import { pokemons } from '../stores/pokemonstore';
	import { fade } from 'svelte/transition';
</script>

<section
	class="grid grid-cols-2 md:grid-cols-3 gap-8 font-semibold"
	transition:fade={{ duration: 200 }}
>
	{#each $pokemons as pokemon}
		<a
			class="card card-hover variant-ghost-surface mx-auto px-10"
			href="/pokemon/{pokemon.id}"
			data-sveltekit-preload-data="tap"
		>
			<header class="card-header">
				<img src={pokemon.sprite} alt="" class="mx-auto" />
			</header>
			<section class="p-4"><h6 class="capitalize text-center">{pokemon.name}</h6></section>
		</a>
	{/each}
</section>

<style lang="postcss">
</style>

import { writable } from 'svelte/store';

export const pokemons = writable([]);
const fetchPokemon = async () => {
	const url = 'https://pokeapi.co/api/v2/pokemon/?limit=151';
	const response = await fetch(url);
	const data = await response.json();

	const loadedPokemon = data.results.map((data, index) => {
		return {
			name: data.name,
			id: index + 1,
			sprite: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-iii/firered-leafgreen/${
				index + 1
			}.png`
		};
	});
	pokemons.set(loadedPokemon);
};
fetchPokemon();

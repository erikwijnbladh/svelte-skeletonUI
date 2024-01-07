// +page.js
import { mapEvolutions } from '../../../stores/helpers/evolutionHelper';
import { getFlavorText } from '../../../stores/helpers/flavorTextHelper';
import { getSpeciesData } from '../../../stores/helpers/speciesHelper';

export async function load({ fetch, params }) {
	const pokemonId = params.id;
	const pokemonUrl = `https://pokeapi.co/api/v2/pokemon/${pokemonId}`;
	const pokemonRes = await fetch(pokemonUrl);
	let pokemon = await pokemonRes.json();
	console.log(pokemon);

	// Fetching species data
	const speciesData = await getSpeciesData(fetch, pokemon);
	if (!speciesData) {
		return { pokemon: null }; // Handle this case appropriately in your application
	}

	// Extracting flavor text
	const flavorText = await getFlavorText(fetch, pokemon.species.url);
	// Add flavor text to the pokemon object
	pokemon.flavor_text = flavorText;

	// Fetching evolution chain data
	if (speciesData.evolution_chain && speciesData.evolution_chain.url) {
		const evolutionChainUrl = speciesData.evolution_chain.url;
		const evolutionChainRes = await fetch(evolutionChainUrl);
		const evolutionChainData = await evolutionChainRes.json();

		// Using the imported function to map evolutions
		const { prevEvolution, nextEvolutions } = mapEvolutions(evolutionChainData, pokemonId);

		// Add evolution data to the pokemon object
		pokemon.prevEvolution = prevEvolution;
		pokemon.nextEvolutions = nextEvolutions;
	}
	return { pokemon };
}

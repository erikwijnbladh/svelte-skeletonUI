// speciesHelper.js
export async function getSpeciesData(fetch, pokemon) {
	if (!pokemon.species || !pokemon.species.url) {
		console.error('Pokemon species information is missing.');
		return null;
	}

	try {
		const speciesRes = await fetch(pokemon.species.url);
		return await speciesRes.json();
	} catch (error) {
		console.error('Error fetching species data:', error);
		return null;
	}
}

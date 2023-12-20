export async function load({ fetch, params }) {
	const id = params.id;
	const pokemonUrl = `https://pokeapi.co/api/v2/pokemon/${id}`;
	const pokemonRes = await fetch(pokemonUrl);
	let pokeman = await pokemonRes.json();

	// Fetching species data
	const speciesUrl = pokeman.species.url;
	const speciesRes = await fetch(speciesUrl);
	const speciesData = await speciesRes.json();

	// Extracting the flavor text
	// This example gets the English flavor text from the latest version
	const flavorTextEntries = speciesData.flavor_text_entries;
	const englishFlavorText = flavorTextEntries.find(
		(entry) => entry.language.name === 'en' && entry.version.name === 'red'
	); // Change 'shield' as needed

	// Mapping flavor text to pokeman object
	pokeman.flavor_text = englishFlavorText
		? englishFlavorText.flavor_text.replace(/[\n\f]/g, ' ')
		: '';
	return { pokeman };
}

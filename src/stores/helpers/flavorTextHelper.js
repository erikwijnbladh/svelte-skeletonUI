// flavorTextHelper.js
export async function getFlavorText(fetch, speciesUrl, versionName = 'firered') {
	try {
		const speciesRes = await fetch(speciesUrl);
		const speciesData = await speciesRes.json();

		const flavorTextEntries = speciesData.flavor_text_entries;
		const englishFlavorText = flavorTextEntries.find(
			(entry) => entry.language.name === 'en' && entry.version.name === versionName
		);

		return englishFlavorText ? englishFlavorText.flavor_text.replace(/[\n\f]/g, ' ') : '';
	} catch (error) {
		console.error('Error fetching flavor text:', error);
		return '';
	}
}

// evolutionHelper.js
export function mapEvolutions(evolutionChainData, currentPokemonId) {
	let prevEvolution = null;
	let nextEvolutions = [];

	// Extracts ID from the URL
	function extractIdFromUrl(url) {
		const idMatch = url.match(/\/(\d+)\/$/);
		return idMatch ? idMatch[1] : null;
	}

	// Extracts evolution method from evolution details
	function getEvolutionMethod(evolutionDetails) {
		if (!evolutionDetails || evolutionDetails.length === 0) {
			return null;
		}

		let method = evolutionDetails[0].trigger.name;
		let details = [];

		if (method === 'level-up') {
			if (evolutionDetails[0].min_level) {
				details.push(`Level ${evolutionDetails[0].min_level}`);
			}
		} else if (method === 'use-item') {
			if (evolutionDetails[0].item) {
				details.push(` ${evolutionDetails[0].item.name}`);
			}
		} else if (method === 'trade') {
			// Add additional trade conditions if any
			if (evolutionDetails[0].held_item) {
				details.push(`Trade holding ${evolutionDetails[0].held_item.name}`);
			} else {
				details.push('Trade');
			}
		}

		return { method, details };
	}

	// Find the current Pokémon and its evolutions
	function findEvolutions(chain, cameFrom) {
		const currentId = extractIdFromUrl(chain.species.url);

		if (currentId === currentPokemonId) {
			// Handling next evolutions
			chain.evolves_to.forEach((evo) => {
				const nextId = extractIdFromUrl(evo.species.url);
				if (nextId <= 151) {
					// Assuming you're filtering by generation
					nextEvolutions.push({
						name: evo.species.name,
						id: nextId,
						evolutionMethod: getEvolutionMethod(evo.evolution_details)
					});
				}
			});

			// Handling previous evolution
			if (cameFrom) {
				const evolutionDetail = cameFrom.evolves_to.find(
					(evo) => extractIdFromUrl(evo.species.url) === currentPokemonId
				);

				if (evolutionDetail) {
					const prevEvolutionMethod = getEvolutionMethod(evolutionDetail.evolution_details);
					prevEvolution = {
						name: cameFrom.species.name,
						id: extractIdFromUrl(cameFrom.species.url),
						method: prevEvolutionMethod ? prevEvolutionMethod.method : null,
						details: prevEvolutionMethod ? prevEvolutionMethod.details : null
					};
				}
			}
			return true;
		}

		for (let evo of chain.evolves_to) {
			const found = findEvolutions(evo, chain);
			if (found) {
				return true;
			}
		}

		return false;
	}

	findEvolutions(evolutionChainData.chain);

	return { prevEvolution, nextEvolutions };
}

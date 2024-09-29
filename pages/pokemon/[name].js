import React, { useState, useEffect } from 'react';
import {
  fetchPokemonDetails,
  fetchPokemonSpecies,
  fetchEvolutionChain,
  fetchMoveDetails,
} from '../../services/pokeapi';
import Head from 'next/head';

const PokemonDetail = ({ pokemon, species, evolutionChain }) => {
  const [movesDetails, setMovesDetails] = useState([]);

  useEffect(() => {
    const getMovesDetails = async () => {
      try {
        const movesToShow = pokemon.moves.slice(0, 12);
        const movesPromises = movesToShow.map((moveInfo) =>
          fetchMoveDetails(moveInfo.move.url)
        );
        const movesData = await Promise.all(movesPromises);
        setMovesDetails(movesData);
      } catch (error) {
        console.error('Error fetching move details:', error);
      }
    };

    getMovesDetails();
  }, [pokemon.moves]);

  return (
    <>
      <Head>
        <title>{pokemon.name} - Pokémon Details</title>
      </Head>
      <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
        <header className="bg-red-500 dark:bg-red-700 text-white p-4 text-center">
          <h1 className="text-3xl font-bold">Pokémon Details</h1>
        </header>
        <main className="container mx-auto p-6">
          <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-6 mb-8">
            <h1 className="text-4xl font-bold mb-6 text-center capitalize text-gray-800 dark:text-white">
              {pokemon.name}
            </h1>
            <div className="flex flex-col md:flex-row items-center">
              <img
                src={pokemon.sprites.other['official-artwork'].front_default || pokemon.sprites.front_default}
                alt={pokemon.name}
                className="w-64 h-64 mb-6 md:mb-0 md:mr-8"
              />
              <div className="flex-1">
                <h2 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-white">Types</h2>
                <div className="flex flex-wrap mb-6">
                  {pokemon.types.map((typeInfo) => (
                    <span
                      key={typeInfo.type.name}
                      className={`mr-2 mb-2 px-4 py-2 rounded-full text-white capitalize ${getTypeColor(
                        typeInfo.type.name
                      )}`}
                    >
                      {typeInfo.type.name}
                    </span>
                  ))}
                </div>

                <h2 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-white">Abilities</h2>
                <ul className="list-disc list-inside mb-6 text-gray-700 dark:text-gray-300">
                  {pokemon.abilities.map((abilityInfo) => (
                    <li key={abilityInfo.ability.name} className="capitalize">
                      {abilityInfo.ability.name}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-6 mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-white">Moves</h2>
            {movesDetails.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {movesDetails.map((move) => (
                  <div
                    key={move.name}
                    className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg hover:shadow-xl transition-shadow duration-300"
                  >
                    <h3 className="text-xl font-semibold capitalize mb-2 text-gray-800 dark:text-white">
                      {move.name}
                    </h3>
                    <p className="text-gray-700 dark:text-gray-300">
                      <strong>Type:</strong>{' '}
                      <span className={`capitalize ${getTypeColor(move.type.name)}`}>
                        {move.type.name}
                      </span>
                    </p>
                    <p className="text-gray-700 dark:text-gray-300">
                      <strong>Power:</strong> {move.power || 'N/A'}
                    </p>
                    <p className="text-gray-700 dark:text-gray-300">
                      <strong>PP:</strong> {move.pp}
                    </p>
                    <p className="text-gray-700 dark:text-gray-300">
                      <strong>Accuracy:</strong> {move.accuracy || 'N/A'}
                    </p>
                    <p className="text-gray-700 dark:text-gray-300">
                      <strong>Damage Class:</strong> {move.damage_class.name}
                    </p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-700 dark:text-gray-300">Loading moves...</p>
            )}
          </div>

          <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-6 mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-white">Species Info</h2>
            <p className="text-gray-700 dark:text-gray-300">
              <strong>Habitat:</strong> {species.habitat ? species.habitat.name : 'Unknown'}
            </p>
            <p className="text-gray-700 dark:text-gray-300">
              <strong>Color:</strong> {species.color.name}
            </p>
            <p className="text-gray-700 dark:text-gray-300">
              <strong>Shape:</strong> {species.shape.name}
            </p>
          </div>

          <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-6">
            <h2 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-white">Evolution Chain</h2>
            {evolutionChain ? (
              <EvolutionChain chain={evolutionChain.chain} />
            ) : (
              <p className="text-gray-700 dark:text-gray-300">No evolution data available.</p>
            )}
          </div>
        </main>
      </div>
    </>
  );
};

// Function to get color classes based on Pokémon type
const getTypeColor = (type) => {
  switch (type) {
    case 'normal':
      return 'bg-gray-400';
    case 'fire':
      return 'bg-red-500';
    case 'water':
      return 'bg-blue-500';
    case 'grass':
      return 'bg-green-500';
    case 'electric':
      return 'bg-yellow-400';
    case 'ice':
      return 'bg-blue-200';
    case 'fighting':
      return 'bg-orange-700';
    case 'poison':
      return 'bg-purple-500';
    case 'ground':
      return 'bg-yellow-700';
    case 'flying':
      return 'bg-indigo-300';
    case 'psychic':
      return 'bg-pink-500';
    case 'bug':
      return 'bg-green-700';
    case 'rock':
      return 'bg-yellow-800';
    case 'ghost':
      return 'bg-indigo-800';
    case 'dark':
      return 'bg-gray-800';
    case 'dragon':
      return 'bg-indigo-700';
    case 'steel':
      return 'bg-gray-500';
    case 'fairy':
      return 'bg-pink-300';
    default:
      return 'bg-gray-300';
  }
};

// EvolutionChain component remains the same
const EvolutionChain = ({ chain }) => {
  const evolutionSteps = [];

  const traverseChain = (node) => {
    evolutionSteps.push(node.species);
    if (node.evolves_to.length > 0) {
      traverseChain(node.evolves_to[0]);
    }
  };

  traverseChain(chain);

  return (
    <div className="flex items-center justify-center flex-wrap">
      {evolutionSteps.map((species, index) => (
        <div key={species.name} className="text-center m-4">
          <img
            src={`https://img.pokemondb.net/sprites/home/normal/${species.name}.png`}
            alt={species.name}
            className="w-24 h-24 mx-auto"
          />
          <p className="capitalize mt-2 text-gray-800 dark:text-white">{species.name}</p>
          {index < evolutionSteps.length - 1 && (
            <span className="text-2xl mx-4 text-gray-800 dark:text-white">&rarr;</span>
          )}
        </div>
      ))}
    </div>
  );
};

export async function getServerSideProps(context) {
  const { name } = context.params;
  try {
    // Fetch Pokémon details
    const pokemon = await fetchPokemonDetails(name);

    // Fetch species data
    const species = await fetchPokemonSpecies(name);

    // Fetch evolution chain data
    let evolutionChain = null;
    if (species.evolution_chain && species.evolution_chain.url) {
      evolutionChain = await fetchEvolutionChain(species.evolution_chain.url);
    }

    return {
      props: {
        pokemon,
        species,
        evolutionChain,
      },
    };
  } catch (error) {
    console.error('Error fetching Pokémon data:', error);
    return { notFound: true };
  }
}

export default PokemonDetail;

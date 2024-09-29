import React, { useState, useEffect } from 'react';
import {
  fetchPokemonDetails,
  fetchPokemonSpecies,
  fetchEvolutionChain,
  fetchMoveDetails
} from '../../services/pokeapi';

const PokemonDetail = ({ pokemon, species, evolutionChain }) => {
    const [movesDetails, setMovesDetails] = useState([]);
    useEffect(() => {
        const getMovesDetails = async () => {
          try {
            const movesToShow = pokemon.moves.slice(0,10); // Limit to first 5 moves
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
    <div>
      <h1>{pokemon.name}</h1>
      <img
        src={pokemon.sprites.front_default}
        alt={pokemon.name}
        style={{ width: '200px' }}
      />

      <h2>Types</h2>
      <ul>
        {pokemon.types.map((typeInfo) => (
          <li key={typeInfo.type.name}>{typeInfo.type.name}</li>
        ))}
      </ul>

      <h2>Abilities</h2>
      <ul>
        {pokemon.abilities.map((abilityInfo) => (
          <li key={abilityInfo.ability.name}>{abilityInfo.ability.name}</li>
        ))}
      </ul>

      <h2>Moves</h2>
      {movesDetails.length > 0 ? (
        <ul>
          {movesDetails.map((move) => (
            <li key={move.name}>
              <h3>{move.name}</h3>
              <p>
                <strong>Type:</strong> {move.type.name}
              </p>
              <p>
                <strong>Power:</strong> {move.power || 'N/A'}
              </p>
              <p>
                <strong>PP:</strong> {move.pp}
              </p>
              <p>
                <strong>Accuracy:</strong> {move.accuracy || 'N/A'}
              </p>
              <p>
                <strong>Damage Class:</strong> {move.damage_class.name}
              </p>
              <p>
                <strong>Effect:</strong>{' '}
                {move.effect_entries.length > 0
                  ? move.effect_entries[0].effect.replace(
                      '$effect_chance',
                      move.effect_chance
                    )
                  : 'No effect information available.'}
              </p>
            </li>
          ))}
        </ul>
      ) : (
        <p>Loading moves...</p>
      )}

      <h2>Species Info</h2>
      <p>
        <strong>Habitat:</strong>{' '}
        {species.habitat ? species.habitat.name : 'Unknown'}
      </p>
      <p>
        <strong>Color:</strong> {species.color.name}
      </p>
      <p>
        <strong>Shape:</strong> {species.shape.name}
      </p>

      <h2>Evolution Chain</h2>
      {evolutionChain ? (
        <EvolutionChain chain={evolutionChain.chain} />
      ) : (
        <p>No evolution data available.</p>
      )}
    </div>
  );
};

// Recursive component to display the evolution chain
const EvolutionChain = ({ chain }) => {
  return (
    <ul>
      <li>
        {chain.species.name}
        {chain.evolves_to.length > 0 && (
          <EvolutionChain chain={chain.evolves_to[0]} />
        )}
      </li>
    </ul>
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

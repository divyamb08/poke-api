// pages/index.js
import React, { useState, useEffect } from 'react';
import { fetchPokemonList, fetchPokemonsByType } from '../services/pokeapi';
import PokemonList from '../components/PokemonList';
import Filters from '../components/Filters';
import ThemeToggleButton from '../components/ThemeToggleButton';

const HomePage = ({ initialPokemons }) => {
  const [allPokemons, setAllPokemons] = useState(initialPokemons);
  const [filteredPokemons, setFilteredPokemons] = useState(initialPokemons);
  const [nameFilter, setNameFilter] = useState('');
  const [typeFilter, setTypeFilter] = useState('');

  useEffect(() => {
    const filterPokemons = async () => {
      let pokemonsToFilter = allPokemons;

      if (typeFilter) {
        try {
          // Fetch Pokémon by the selected type
          const pokemonsByType = await fetchPokemonsByType(typeFilter);
          const pokemonsByTypeNames = pokemonsByType.map((p) => p.name);

          // Filter the initial list to include only Pokémon of the selected type
          pokemonsToFilter = allPokemons.filter((pokemon) =>
            pokemonsByTypeNames.includes(pokemon.name)
          );
        } catch (error) {
          console.error('Error fetching Pokémon by type:', error);
          pokemonsToFilter = [];
        }
      }

      if (nameFilter) {
        pokemonsToFilter = pokemonsToFilter.filter((pokemon) =>
          pokemon.name.includes(nameFilter)
        );
      }

      setFilteredPokemons(pokemonsToFilter);
    };

    filterPokemons();
  }, [nameFilter, typeFilter, allPokemons]);

  const handleFilter = ({ name, type }) => {
    setNameFilter(name);
    setTypeFilter(type);
  };

  return (
    <div>
      <ThemeToggleButton />
      <h1>Pokémon List</h1>
      <Filters onFilter={handleFilter} />
      <PokemonList pokemons={filteredPokemons} />
    </div>
  );
};

export async function getStaticProps() {
  try {
    const pokemons = await fetchPokemonList();
    return { props: { initialPokemons: pokemons } };
  } catch (error) {
    return { props: { initialPokemons: [] } };
  }
}

export default HomePage;

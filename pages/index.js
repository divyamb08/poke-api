import React, { useState, useEffect } from 'react';
import { fetchPokemonList, fetchPokemonsByType } from '../services/pokeapi';
import PokemonList from '../components/PokemonList';
import Pagination from '../components/Pagination';
import Layout from '../components/Layout';
import Filters from '../components/Filters';
import UserPreferences from '../components/UserPreferences';

const HomePage = () => {
  const [pokemons, setPokemons] = useState([]);
  const [totalPokemons, setTotalPokemons] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [pokemonsPerPage] = useState(100);

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState('');
  const [selectedPreference, setSelectedPreference] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        let allPokemons = [];

        // Determine if filtering by user preference or type
        if (selectedPreference) {
          // Fetch Pokémon by user preference (type)
          const data = await fetchPokemonsByType(selectedPreference);
          allPokemons = data.pokemon.map((p) => p.pokemon);
        } else if (selectedType) {
          // Fetch Pokémon by selected type
          const data = await fetchPokemonsByType(selectedType);
          allPokemons = data.pokemon.map((p) => p.pokemon);
        } else {
          // Fetch all Pokémon with pagination
          const offset = (currentPage - 1) * pokemonsPerPage;
          const data = await fetchPokemonList(pokemonsPerPage, offset);
          allPokemons = data.results;
        }

        // Filter by search term if provided
        if (searchTerm) {
          allPokemons = allPokemons.filter((pokemon) =>
            pokemon.name.toLowerCase().includes(searchTerm.toLowerCase())
          );
        }

        setPokemons(allPokemons);
        setTotalPokemons(allPokemons.length);
      } catch (error) {
        console.error('Error fetching Pokémon list:', error);
      }
    };

    fetchData();
  }, [currentPage, pokemonsPerPage, selectedType, searchTerm, selectedPreference]);

  // Calculate total pages (only relevant when not filtering by type or preference)
  const totalPages = Math.ceil(totalPokemons / pokemonsPerPage);

  // Handlers for Filters component
  const handleSearchChange = (searchValue) => {
    setSearchTerm(searchValue);
    setCurrentPage(1); // Reset to first page when search changes
  };

  const handleTypeChange = (typeValue) => {
    setSelectedType(typeValue);
    setSelectedPreference(''); // Clear user preference when type is selected
    setCurrentPage(1);
  };

  // Handler for UserPreferences component
  const handlePreferenceSelect = (preference) => {
    setSelectedPreference(preference);
    setSelectedType(''); // Clear selected type when user preference is selected
    setCurrentPage(1);
  };

  return (
    <Layout>
      <div className="container mx-auto p-6">
        <h1 className="text-4xl font-bold mb-6 text-center">Pokémon List</h1>

        {/* Filters Component */}
        <Filters onSearchChange={handleSearchChange} onTypeChange={handleTypeChange} />

        {/* User Preferences Component */}
        <UserPreferences onPreferenceSelect={handlePreferenceSelect} />

        <PokemonList pokemons={pokemons} />

        {/* Show Pagination only if not filtering by type or preference */}
        {!selectedType && !selectedPreference && (
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            setCurrentPage={setCurrentPage}
          />
        )}
      </div>
    </Layout>
  );
};

export default HomePage;

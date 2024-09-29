import React, { useState, useEffect } from 'react';
import { fetchPokemonList, fetchPokemonsByType } from '../services/pokeapi';
import PokemonList from '../components/PokemonList';
import Pagination from '../components/Pagination';
import Layout from '../components/Layout';
import Filters from '../components/Filters';

const HomePage = () => {
  const [pokemons, setPokemons] = useState([]);
  const [totalPokemons, setTotalPokemons] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [pokemonsPerPage] = useState(100);

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch Pokémon based on selected type and search term
        if (selectedType) {
          // Fetch Pokémon by type
          const data = await fetchPokemonsByType(selectedType);
          let filteredPokemons = data.pokemon.map((p) => p.pokemon);

          // Filter by search term if provided
          if (searchTerm) {
            filteredPokemons = filteredPokemons.filter((pokemon) =>
              pokemon.name.toLowerCase().includes(searchTerm.toLowerCase())
            );
          }

          setPokemons(filteredPokemons);
          setTotalPokemons(filteredPokemons.length);
        } else {
          // Fetch all Pokémon with pagination
          const offset = (currentPage - 1) * pokemonsPerPage;
          const data = await fetchPokemonList(pokemonsPerPage, offset);
          let allPokemons = data.results;

          // Filter by search term if provided
          if (searchTerm) {
            allPokemons = allPokemons.filter((pokemon) =>
              pokemon.name.toLowerCase().includes(searchTerm.toLowerCase())
            );
          }

          setPokemons(allPokemons);
          setTotalPokemons(searchTerm ? allPokemons.length : data.count);
        }
      } catch (error) {
        console.error('Error fetching Pokémon list:', error);
      }
    };

    fetchData();
  }, [currentPage, pokemonsPerPage, selectedType, searchTerm]);

  // Calculate total pages
  const totalPages = Math.ceil(totalPokemons / pokemonsPerPage);

  // Handlers for Filters component
  const handleSearchChange = (searchValue) => {
    setSearchTerm(searchValue);
    setCurrentPage(1); // Reset to first page when search changes
  };

  const handleTypeChange = (typeValue) => {
    setSelectedType(typeValue);
    setCurrentPage(1); // Reset to first page when type changes
  };

  return (
    <Layout>
      <div className="container mx-auto p-6">
        <h1 className="text-4xl font-bold mb-6 text-center">Pokémon List</h1>

        {/* Filters Component */}
        <Filters onSearchChange={handleSearchChange} onTypeChange={handleTypeChange} />

        <PokemonList pokemons={pokemons} />

        {/* Show Pagination only if no type is selected */}
        {!selectedType && (
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
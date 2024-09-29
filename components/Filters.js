import React, { useState, useEffect } from 'react';
import { fetchTypesList } from '../services/pokeapi';

const Filters = ({ onSearchChange, onTypeChange }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [types, setTypes] = useState([]);
  const [selectedType, setSelectedType] = useState('');

  useEffect(() => {
    // Fetch the list of Pokémon types
    const fetchTypes = async () => {
      try {
        const data = await fetchTypesList();
        setTypes(data.results.map((type) => type.name));
      } catch (error) {
        console.error('Error fetching types:', error);
      }
    };

    fetchTypes();
  }, []);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    onSearchChange(e.target.value);
  };

  const handleTypeChange = (e) => {
    setSelectedType(e.target.value);
    onTypeChange(e.target.value);
  };

  return (
    <div className="flex flex-col md:flex-row items-center mb-6">
      {/* Search Input */}
      <div className="w-full md:w-1/2 mb-4 md:mb-0 md:mr-4">
        <label htmlFor="search" className="block text-gray-700 dark:text-gray-200 mb-2">
          Search Pokémon
        </label>
        <input
          type="text"
          id="search"
          value={searchTerm}
          onChange={handleSearchChange}
          placeholder="Enter Pokémon name"
          className="w-full p-2 border rounded-md bg-white dark:bg-gray-800 dark:text-white"
        />
      </div>

      {/* Type Dropdown */}
      <div className="w-full md:w-1/2">
        <label htmlFor="type" className="block text-gray-700 dark:text-gray-200 mb-2">
          Select Type
        </label>
        <select
          id="type"
          value={selectedType}
          onChange={handleTypeChange}
          className="w-full p-2 border rounded-md bg-white dark:bg-gray-800 dark:text-white"
        >
          <option value="">All Types</option>
          {types.map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default Filters;
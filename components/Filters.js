// components/Filters.js
import React, { useState, useEffect } from 'react';
import { fetchTypesList } from '../services/pokeapi';

const Filters = ({ onFilter }) => {
  const [name, setName] = useState('');
  const [type, setType] = useState('');
  const [typesList, setTypesList] = useState([]);

  useEffect(() => {
    const getTypes = async () => {
      try {
        const types = await fetchTypesList();
        setTypesList(types);
      } catch (error) {
        console.error('Error fetching types:', error);
      }
    };
    getTypes();
  }, []);

  useEffect(() => {
    onFilter({ name, type });
  }, [name, type]);

  return (
    <div className="filters p-4 gap-2 flex-row">
      <input
        type="text"
        placeholder="Search by Name"
        value={name}
        onChange={(e) => setName(e.target.value.toLowerCase())}
        className="mb-4 p-2 border border-gray-300 rounded dark:bg-gray-800 dark:text-white"
      />
      <select
        value={type}
        onChange={(e) => setType(e.target.value)}
        className="p-2 border border-gray-300 rounded dark:bg-gray-800 dark:text-white ml-4"
      >
        <option value="">All Types</option>
        {typesList.map((typeItem) => (
          <option key={typeItem.name} value={typeItem.name}>
            {typeItem.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Filters;

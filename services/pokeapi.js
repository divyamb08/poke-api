// services/pokeapi.js
import axios from 'axios';

export const fetchPokemonList = async () => {
  try {
    const response = await axios.get('https://pokeapi.co/api/v2/pokemon?limit=800');
    return response.data.results;
  } catch (error) {
    throw error;
  }
};

export const fetchPokemonDetails = async (name) => {
  try {
    const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${name}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const fetchTypesList = async () => {
  try {
    const response = await axios.get('https://pokeapi.co/api/v2/type');
    return response.data.results;
  } catch (error) {
    throw error;
  }
};

export const fetchPokemonsByType = async (typeName) => {
  try {
    const response = await axios.get(`https://pokeapi.co/api/v2/type/${typeName}`);
    return response.data.pokemon.map((entry) => entry.pokemon);
  } catch (error) {
    throw error;
  }
};
export const fetchPokemonSpecies = async (name) => {
  try {
    const response = await axios.get(`https://pokeapi.co/api/v2/pokemon-species/${name}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const fetchEvolutionChain = async (url) => {
  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    throw error;
  }
};
export const fetchMoveDetails = async (url) => {
  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    throw error;
  }
};
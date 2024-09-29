import axios from 'axios';

export const fetchPokemonList = async (limit = 100, offset = 0) => {
  try {
    const response = await axios.get(
      `https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`
    );
    return response.data;
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
    return response.data;
  } catch (error) {
    throw error;
  }
};


export const fetchPokemonsByType = async (type) => {
  try {
    const response = await axios.get(`https://pokeapi.co/api/v2/type/${type}`);
    return response.data;
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
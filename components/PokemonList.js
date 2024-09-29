import React from 'react';
import PokemonCard from './PokemonCard';
import styles from '../styles/PokemonList.module.css';

const PokemonList = ({ pokemons }) => {
  return (
    <div className={styles.grid}>
      {pokemons.map((pokemon) => (
        <PokemonCard key={pokemon.name} pokemon={pokemon} />
      ))}
    </div>
  );
};

export default PokemonList;

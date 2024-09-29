import React, { useState } from 'react';
import Link from 'next/link';
import styles from '../styles/PokemonCard.module.css';

const PokemonCard = ({ pokemon }) => {
  const [imageLoaded, setImageLoaded] = useState(true);
  const pokemonId = pokemon.url.split('/')[6];
  const imageUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemonId}.png`;

  const handleImageError = () => {
    setImageLoaded(false);
  };

  if (!imageLoaded) {
    return null;
  }

  return (
    <div className={styles.card}>
      <img src={imageUrl} alt={pokemon.name} onError={handleImageError} />
      <h3>{pokemon.name}</h3>
      <Link href={`/pokemon/${pokemon.name}`} className={styles.detailsLink}>
        View Details
      </Link>
    </div>
  );
};

export default PokemonCard;

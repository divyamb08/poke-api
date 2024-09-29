import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import styles from '../styles/PokemonCard.module.css';

const PokemonCard = ({ pokemon }) => {
  const [imageError, setImageError] = useState(false);
  const pokemonId = pokemon.url.split('/')[6];

  const officialArtworkUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemonId}.png`;
  const defaultSpriteUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemonId}.png`;

  const imageUrl = imageError ? defaultSpriteUrl : officialArtworkUrl;

  return (
    <div className={styles.card}>
      <Link href={`/pokemon/${pokemon.name}`}>
        <div className="relative w-full h-56">
          <Image
            src={imageUrl}
            alt={pokemon.name}
            layout="fill"
            objectFit="contain"
            className="mx-auto"
            onError={() => setImageError(true)}
          />
        </div>
        <h3 className="capitalize text-center mt-2 text-lg font-semibold">
          {pokemon.name}
        </h3>
      </Link>
    </div>
  );
};

export default PokemonCard;

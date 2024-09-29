// pages/index.js
import React, { useState, useEffect } from 'react';
import { fetchPokemonList } from '../services/pokeapi';
import PokemonList from '../components/PokemonList';
import Pagination from '../components/Pagination.js';
import Layout from '../components/Layout';

const HomePage = () => {
    const [pokemons, setPokemons] = useState([]);
    const [totalPokemons, setTotalPokemons] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [pokemonsPerPage] = useState(100); // Fixed number of Pokémon per page

    useEffect(() => {
        const fetchData = async() => {
            try {
                const offset = (currentPage - 1) * pokemonsPerPage;
                const data = await fetchPokemonList(pokemonsPerPage, offset);
                setPokemons(data.results);
                setTotalPokemons(data.count);
            } catch (error) {
                console.error('Error fetching Pokémon list:', error);
            }
        };

        fetchData();
    }, [currentPage, pokemonsPerPage]);

    // Calculate total pages
    const totalPages = Math.ceil(totalPokemons / pokemonsPerPage);

    return ( <
        Layout >
        <
        div className = "container mx-auto p-6" >
        <
        h1 className = "text-4xl font-bold mb-6 text-center" > Pokémon List < /h1> <
        PokemonList pokemons = { pokemons }
        /> <
        Pagination currentPage = { currentPage }
        totalPages = { totalPages }
        setCurrentPage = { setCurrentPage }
        /> <
        /div> <
        /Layout>
    );
};

export default HomePage;
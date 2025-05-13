import React, { useState, useEffect, useMemo } from "react";
import { Link } from "react-router-dom";
import Filter from "./Filter";
import "../App.css";
import Pagination from "./Pagination";
import "bootstrap/dist/css/bootstrap.min.css";
import banner from "../Asserts/pokemon-banner.webp";
import PokiLogo from '../Asserts/pokeball.png'

const URL = "https://pokeapi.co/api/v2/pokemon?limit=150";
const PokemonCard = () => {
  const [pokemonList, setPokemonList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedType, setSelectedType] = useState("All");
  const [types, setTypes] = useState([]);
  const [pokemonPerPage, setPokemonPerPage] = useState(20);

  // const pokemonPerPage =20;

  const fetchPokemons = async () => {
    try {
      const response = await fetch(URL);
      const data = await response.json();

      const details = await Promise.all(
        data.results.map(async (pokemon) => {
          const res = await fetch(pokemon.url);
          return await res.json();
        })
      );

      const typesSet = new Set();
      details.forEach((pokemon) => {
        pokemon.types.forEach((t) => typesSet.add(t.type.name));
      });

      const typesArray = [...typesSet];
      console.log("fetched types for filter:", typesArray);

      setTypes(typesArray);
      setPokemonList(details);
      setLoading(false);
    } catch (error) {
      console.log("Error occure while Fetching pokemon data: ", error);
    }
  };

  useEffect(() => {
    fetchPokemons();
  }, []);

  const filteredPokemon = useMemo(() => {
    return pokemonList.filter((pokemon) => {
      const matchesSearch =
        pokemon.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        pokemon.id.toString().includes(searchTerm);

      const matchesType =
        selectedType === "" ||
        selectedType === "All" ||
        pokemon.types.some((t) => t.type.name === selectedType);

      return matchesSearch && matchesType;
    });
  }, [pokemonList, searchTerm, selectedType]);

  const currentPokemon = useMemo(() => {
    const indexOfLast = currentPage * pokemonPerPage;
    const indexofFirstpage = indexOfLast - pokemonPerPage;
    return filteredPokemon.slice(indexofFirstpage, indexOfLast);
  }, [filteredPokemon, currentPage, pokemonPerPage]);

  console.log("Filtered Pokemon for current page", currentPokemon);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm]);

  if (loading) {
    return (
      <div style={{ textAlign: "center", alignItems: "center" }}>
        <h2>Loading...</h2>
      </div>
    );
  }

  return (
    <>
    <div
        className="hero"
        style={{
          backgroundImage: `url(${banner})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          height: "80vh",
          
        }}
      >
        {/* Overlay */}
        <div
          className="position-absolute top-0 start-0 w-100 h-100"
          style={{ backgroundColor: "rgba(0, 0, 0, 0.12)", zIndex: 1, pointerEvents: "none", }}
        />

        {/* Content */}
        <div className="position-relative text-center mt-6" style={{ zIndex: 2 }}>
          <h1 className="display-4 fw-bold"><span style={{ color: 'white' }}>Explore the World of the </span>
          <span style={{ color: 'white' }}>Pokémon</span></h1>
          <p className="lead" style={{color:'white'}}>Search, filter, and discover your favorites</p>
          <button className="btn btn-warning fw-semibold px-4 py-2">
            Start Exploring
          </button>
        </div>
      </div>

    <div className="App, container">
      

      {/* search section */}
      <span 
        style={{
          display: "flex",
          flexDirection: "row",
          gap: "0px 20px",
        }}
      >
        <div className="search-bar-wrap">
        <input
          type="text"
          placeholder="Search name Pokémon..."
          className="input-field"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{
            padding: "20px",
            marginBottom: "20px",
            width: "100%",
            fontSize: "16px",
            borderRadius: "10px",
            border: '2px solid #e7e0e0',
            zIndex: '1'
          }}
        />
        <img src={PokiLogo} style={{zIndex: '2'}} alt="PokeballLogo" />
        </div>
        
      </span>

      <Filter
        types={types}
        selectedType={selectedType}
        setSelectedType={setSelectedType}
      />

      <div className="grid">
        {currentPokemon.map((pokemon) => (
          <Link
            to={`/pokemon/${pokemon.id}`}
            key={pokemon.id}
            className="card-link"
          >
            <div className="card">
              <div className="container-below">
                <div className="bg-animation">
                  <img src={pokemon.sprites.front_default} alt={pokemon.name} />
                </div>
                <h3>
                  {pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}
                </h3>
                <div className="line">
                  <p>
                    <strong>ID: {pokemon.id}</strong>
                  </p>
                  <button className="button">
                    {pokemon.types.map((t) => t.type.name).join(", ")}
                  </button>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>

      <Pagination
        currentPage={currentPage}
        totalPage={Math.ceil(filteredPokemon.length / pokemonPerPage)}
        onPageChange={(page) => setCurrentPage(page)}
        pokemonPerPage={pokemonPerPage}
        setPokemonPerPage={setPokemonPerPage}
      ></Pagination>
    </div>
    </>
  );
};

export default PokemonCard;

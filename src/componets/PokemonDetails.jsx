import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const PokemonDetails = () => {
  const { id } = useParams();
  const [pokemon, setPokemon] = useState(null);
  const [loading, setLoadinng] = useState(true);

  useEffect(() => {
    const fetchPokemon = async () => {
      try {
        const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
        const data = await res.json();
        setPokemon(data);
        setLoadinng(false);
      } catch (err) {
        console.log("fail to fetch pokemon: ", err);
      }
    };
    fetchPokemon();
  }, [id]);

  if (loading) return <h2 style={{ textAlign: "center" }}>Loading...</h2>;

  return (
    <>
      <div className="wrapper">
        <div className="poki-container">
          <div className="poki-image">
            <img
              src={pokemon.sprites.other["official-artwork"].front_default}
              alt={pokemon.name}
              className="pokemon-image"
            />{" "}
            <div className="shadow-footer"></div>
          </div>
          <div className="poki-card">
           
            <p>
              <strong>ID:</strong> {pokemon.id}
            </p>
            <h1>{pokemon.name.toUpperCase()}</h1>
            <p>
              <strong>Height:</strong> {pokemon.height}
            </p>
            <p>
              <strong>Weight:</strong> {pokemon.weight}
            </p>
            <p>
              <strong>Abilities:</strong>
              {pokemon.abilities.map((a) => a.ability.name).join(", ")}
            </p>
            <p>
              <strong>Base Experience:</strong> {pokemon.base_experience}
            </p>
            <p>
              <strong>Types:</strong>{" "}
              {pokemon.types.map((t) => t.type.name).join(", ")}
            </p>
            <p>
              <strong>Abilities:</strong>{" "}
              {pokemon.abilities.map((a) => a.ability.name).join(", ")}
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default PokemonDetails;

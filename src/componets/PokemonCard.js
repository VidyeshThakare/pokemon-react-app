import React, {useState, useEffect} from 'react'
import Filter from './Filter';
import '../App.css'

const URL = 'https://pokeapi.co/api/v2/pokemon?limit=150';
const PokemonCard = () => {
	const [pokemonList, setPokemonList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState('All');
  const [types, setTypes] = useState([]);

  const pokemonPerPage =20;
  
  const fetchPokemons = async()=>{
    try{
      const response = await fetch(URL);
      const data = await response.json();

      const details = await Promise.all(
        data.results.map(async (pokemon)=>{
          const res = await fetch(pokemon.url)
          return await res.json();
        })
      );
 
      
      const typesSet = new Set();
      details.forEach((pokemon)=>{
        pokemon.types.forEach((t)=> typesSet.add(t.type.name));

      })

      const typesArray = ([...typesSet])
      console.log("fetched types for filter:", typesArray);
      
      setTypes(typesArray)
      setPokemonList(details);
      setLoading(false);
      
      
    }catch(error){
      console.log("Error occure while Fetching pokemon data: ", error)
    }
    
  }

  useEffect(()=>{
    fetchPokemons();
  }, [])
  
  const filteredPokemon = pokemonList.filter((pokemon) => {
    const matchesSearch =
      pokemon.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      pokemon.id.toString().includes(searchTerm);
  
    const matchesType =
      selectedType === '' || selectedType === 'All' ||
      pokemon.types.some((t) => t.type.name === selectedType);
  
    return matchesSearch && matchesType;
  });

  const indexOfLast = currentPage * pokemonPerPage;
  const indexofFirstpage = indexOfLast - pokemonPerPage;
  const currentPokemon = filteredPokemon.slice(indexofFirstpage, indexOfLast);
  console.log("Filtered Pokemon for current page", currentPokemon)

  useEffect(()=>{
    setCurrentPage(1);
  }, [searchTerm])

  if (loading){ 
    return (
    <div style={{textAlign: 'center', alignItems:'center'}}>
      <h2>Loading...</h2>
    </div>
    
  )}

  return (
	<div className="App, container">
      
      
      {/* search section */}
      <input
          type="text"
          placeholder="Search Pokémon..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{
            padding: '10px',
            marginBottom: '20px',
            width: '60%',
            fontSize: '16px'
          }}
        />

          <Filter types={types} selectedType={selectedType} setSelectedType={setSelectedType}/>

      <div className="grid">
      {currentPokemon.map((pokemon)=>(
        <div key={pokemon.id} className="card">
          <img src={pokemon.sprites.front_default} alt={pokemon.name} />
          <h3>{pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}</h3>
          <p><strong>ID: {pokemon.id}</strong></p>
          <p>
            <strong>Type: </strong>{" "}
            {pokemon.types.map((t)=> t.type.name).join(", ")}
          </p>
        </div>
      ))
      }
      </div>

      <div className="pagination">
        {Array.from({length: Math.ceil(pokemonList.length / pokemonPerPage)}, (_, index)=>(
          <button
            key={index}
            onClick={()=> setCurrentPage(index+1)}
            className={currentPage === index +1 ? "active": ""}
          >{index +1}</button>
        ))}
      </div>
    </div>
  )
}

export default PokemonCard
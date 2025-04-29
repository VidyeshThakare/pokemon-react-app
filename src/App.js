import React from "react";

import './App.css';
import Navbar from "./componets/Navbar";
import Footer from "./componets/Footer";
import PokemonCard from "./componets/PokemonCard";



function App() {
  
  
  return (
    <>
    <Navbar></Navbar>
    <PokemonCard></PokemonCard>
    <Footer></Footer>
    </>
  );
}

export default App;

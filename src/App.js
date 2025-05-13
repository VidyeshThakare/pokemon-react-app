import React from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Navbar from "./componets/Navbar";
import Footer from "./componets/Footer";
import PokemonCard from "./componets/PokemonCard";
import PokemonDetails from "./componets/PokemonDetails";


function App() {
  
  
  return (
    <>
    <Router>
      <main className="main-container">
      <Navbar />

      <Routes>
        <Route path="/" element={<PokemonCard />} />
        <Route path="/pokemon/:id" element={<PokemonDetails />} />
      </Routes>

      <Footer className='footer'/>
      </main>
    </Router>
    </>
  );
}

export default App;

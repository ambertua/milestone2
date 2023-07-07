import React, { useState } from "react";
import supabase from '../Services/supabaseClient';
import '../App.css';
import Navbar from './Navbar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from "@fortawesome/free-solid-svg-icons";


function Pokedex() {
  const [pokemon, setPokemon] = useState([]);
  const [search, setSearch] = useState('');

  const fetchPokemon = async (searchTerm) => {
    console.log("Fetching Pokemon with term: ", searchTerm);
    let { data: pokemon_stats, error } = await supabase
      .from('pokemon_stats')
      .select('*')
      .ilike('Name', `%${searchTerm}%`);
    if (error) {
      console.log("Data fetch error: ", error);
    } else {
      console.log("Fetched data: ", pokemon_stats);
      setPokemon(pokemon_stats);
    }
  };

  const handleSearch = (event) => {
    setSearch(event.target.value);
  };

  const handleSearchClick = () => {
    fetchPokemon(search);
  };

  return (
    <div>
      <Navbar />
      <div className="image-container">
        <img
          className="gamer-image"
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRA2kMTOjqqKJCahCRP-9q9RK_yrm5fPXFwSA&usqp=CAU"
          alt="Pokedex"
        />
        <div className="search-results">
          <h1 style={{ fontSize: '32px', color: '#fff', textAlign: 'center', padding: '20px' }}>
            Hello this is Pokedex
          </h1>

          <div className="search-bar" style={{ marginBottom: '10px', textAlign: 'center' }}>
            <input
              className="form-control me-2 search-input"
              type="text"
              placeholder="Search Pokemon..."
              value={search}
              onChange={handleSearch}
            />
            <button className="btn btn-outline-success search-button" onClick={handleSearchClick}>
              <FontAwesomeIcon icon={faSearch} />
            </button>
          </div>

          {pokemon.map((item, index) =>
            <div key={index} className="pokemon-card" style={{ width: '18rem' }}>
              <img src={item.Picture} alt={item.Name} />
              <div>
                <h2>{item.Name}</h2>
                <p>
                  Number: {item.Number} <br />
                  Fact: {item.Fact} <br />
                  Type: {item.Type} <br />
                  Height: {item.Height} <br />
                  Weight: {item.Weight} <br />
                  Gender: {item.Gender} <br />
                  Category: {item.Category} <br />
                  Abilities: {item.Abilities} <br />
                  Weaknesses: {item.Weaknesses} <br />
                  Hit_points: {item.Hit_points} <br />
                  Attack: {item.Attack} <br />
                  Defense: {item.Defense} <br />
                  Special_attack: {item.Special_attack} <br />
                  Special_defense: {item.Special_defense} <br />
                  Speed: {item.Speed} <br />
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Pokedex;

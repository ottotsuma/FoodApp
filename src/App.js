import React, {useEffect, useState} from 'react';
import Recipe from './Recipe'
import './App.css';
require("dotenv").config()

const App = () => {

  const [recipes, setRecipes] = useState([]);
  const [search, setSearch] =useState('');
  const [query, setQuery] =useState('chicken');
 
  // const APP_ID = process.env.APP_ID
  // const APP_KEY = process.env.APP_KEY

  useEffect ( () => {
    getRecipes();
  }, [query]);

  const getRecipes = async () => {
    const response = await fetch (`https://api.edamam.com/search?q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}`);
    const data = await response.json();
    setRecipes(data.hits);
    if (data.hits.length < 1) {
      console.log("Error");
      alert("Nothing found");
    }
  }

  const updateSearch = e => {
    setSearch(e.target.value);
  }

  const getSearch = e => {
    e.preventDefault();
    setQuery(search);
    setSearch('');
  }

  return (
    <div className="App">
      <form onSubmit={getSearch} className="search-form">
        <input className="search-bar" type="text" value={search} onChange={updateSearch} />
        <button className="search-button" type="submit">
          Search
        </button>
      </form>
      <div className="recpies">
      {recipes.map(recipe => (
        <Recipe 
        key = {recipe.recipe.label}
        title={recipe.recipe.label} calories={recipe.recipe.calories} image={recipe.recipe.image} ingredients={recipe.recipe.ingredients}/>
      ))}
      </div>
    </div>
  );
}

export default App;

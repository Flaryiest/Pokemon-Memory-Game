import { useState, useEffect } from 'react'
import PokemonCard from './PokemonCard'
import Scoreboard from './Scoreboard'
function App() {
  const [pokemonImageList, setPokemonImageList] = useState([])
  const [clickedPokemon, setClickedPokemon] = useState([])
  useEffect(() => {
    let pokemonIds = getIds(12)

    getPokemonImages(pokemonIds)
  }, [])

  function getIds(number) {
    let currentIds = []
    while (currentIds.length < number) {
      let potentialId = Math.floor(Math.random() * 151)
      if (!(currentIds.includes(potentialId))) {
        currentIds.push(potentialId)
      }
    }
    return currentIds
  }

  async function getPokemonImages(pokemonIds) {
    let currentImageList = structuredClone(pokemonImageList)
    for (let id = 0; id < pokemonIds.length; id++) {
      const pokemon = await fetch("https://pokeapi.co/api/v2/pokemon/" + pokemonIds[id], {mode: "cors"})
      const pokemonFile = await pokemon.json()
      const pokemonImage = pokemonFile.sprites.front_default
      currentImageList.push(pokemonImage)    
    }
    setPokemonImageList(currentImageList)
  }

  function handleClick(event) {
    event.preventDefault()
    console.log(event.target.id)
    if(!(clickedPokemon.includes(event.target.id))) {
    let currentClickedPokemon = structuredClone(clickedPokemon)
    currentClickedPokemon.push(event.target.id)
    shuffleCards(pokemonCards)
    setClickedPokemon(currentClickedPokemon)
    }
    else {
      console.log("You Lost")
    }
  }

  function shuffleCards(pokemonCards) {
    console.log(pokemonCards)
    let currentIndex = pokemonCards.length
    while (currentIndex != 0) {
      let randomIndex = Math.floor(Math.random() * currentIndex)
      currentIndex--
      [pokemonCards[currentIndex], pokemonCards[randomIndex]] = [pokemonCards[randomIndex], pokemonCards[currentIndex]] 
    }
  }

  let pokemonCards = []
  for (let pokemon = 0; pokemon < pokemonImageList.length; pokemon++) {
    pokemonCards.push(<PokemonCard image={pokemonImageList[pokemon]} id={pokemon} key={pokemon} handleClick={handleClick}></PokemonCard>)
  }
  console.log(clickedPokemon)
  return (
    <>
      <Scoreboard></Scoreboard>
      {pokemonCards}   
      
    </>
  )
}

export default App

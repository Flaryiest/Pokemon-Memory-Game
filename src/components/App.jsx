import { useState, useEffect } from 'react'
import PokemonCard from './PokemonCard'
function App() {
  const [pokemonImageList, setPokemonImageList] = useState([])
  useEffect(() => {
    let pokemonIds = getIds(12)
    console.log(pokemonIds)
    getPokemonImages(pokemonIds)

  }, [])

  function getIds(number) {
    let currentIds = []
    while (currentIds.length < number) {
      let potentialId = Math.floor(Math.random() * 151)
      if (!(potentialId in currentIds)) {
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
  console.log(pokemonImageList)
  let pokemonCards = []
  for (let pokemon = 0; pokemon < pokemonImageList.length; pokemon++) {
    pokemonCards.push(<PokemonCard image={pokemonImageList[pokemon]} id={pokemon}></PokemonCard>)
  }
  console.log(pokemonCards)
  return (
    <>
      {pokemonCards}   
    </>
  )
}

export default App

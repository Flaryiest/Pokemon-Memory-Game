import { useState, useEffect } from 'react'

function App() {
  const [pokemonImageList, setPokemonImageList] = useState([])
  useEffect(() => {
    getPokemonImage("ditto")
  }, [])
  async function getPokemonImage(pokemonName) {
    const pokemon = await fetch("https://pokeapi.co/api/v2/pokemon/" + pokemonName, {mode: "cors"})
    const pokemonFile = await pokemon.json()
    const pokemonImage = pokemonFile.sprites.front_default
    console.log(pokemonImage)
    let currentImageList = structuredClone(pokemonImageList)
    currentImageList.push(pokemonImage)
    console.log(currentImageList, "test")
    setPokemonImageList(currentImageList)
  }
  console.log(pokemonImageList)

  return (
    <>
      <img src={pokemonImageList[0]}  height="500" width="500"></img>
      <div>Hello</div>
      
    </>
  )
}

export default App

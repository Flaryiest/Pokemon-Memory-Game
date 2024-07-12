import { useState, useEffect, useRef } from 'react'
import PokemonCard from './PokemonCard'
import Scoreboard from './Scoreboard'
function App() {
  const [pokemonImageList, setPokemonImageList] = useState([])
  const clickedPokemon = useRef([])
  const [pokemonCards, setPokemonCards] = useState([])
  const [playing, setPlaying] = useState(false)
  
  useEffect(() => {
    let pokemonIds = getIds(12)
    getPokemonImages(pokemonIds)
    
  }, [playing])

  useEffect(() => {
    let pokemonCardsTemp = []
    for (let pokemon = 0; pokemon < pokemonImageList.length; pokemon++) {
      pokemonCardsTemp.push(<PokemonCard image={pokemonImageList[pokemon]} id={pokemon} key={pokemon} handleClick={handleClick}></PokemonCard>)
    }
    setPokemonCards(pokemonCardsTemp)
  }, [pokemonImageList])

  function getIds(number) {
    let currentIds = []
    while (currentIds.length < number) {
      let potentialId = Math.floor(Math.random() * 1000)
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
    if (!(clickedPokemon.current.includes(event.target.id))) {
      clickedPokemon.current = clickedPokemon.current.concat([event.target.id])
      shuffleCards(pokemonCards)

    }
    else {
      console.log("You lost")
    }

  }

  function shuffleCards(pokemonCards) {
    let currentPokemonCards = pokemonCards
    let currentIndex = currentPokemonCards.length
    while (currentIndex != 0) {
      let randomIndex = Math.floor(Math.random() * currentIndex)
      currentIndex--
      [currentPokemonCards[currentIndex], currentPokemonCards[randomIndex]] = [currentPokemonCards[randomIndex], currentPokemonCards[currentIndex]] 
    }
    console.log(currentPokemonCards, "after shuffling")
    let tempPokemonCards = []
    for (let card = 0; card < currentPokemonCards.length; card++) {
      tempPokemonCards.push(<PokemonCard image={currentPokemonCards[card].props.image} id={currentPokemonCards[card].props.id} key={currentPokemonCards[card].props.id} handleClick={handleClick}></PokemonCard>)
    }
    setPokemonCards(tempPokemonCards)
  }

  function startGame() {
    setPokemonImageList([])
    setPokemonCards([])
    setPlaying(true)
    console.log(pokemonCards)
    
    clickedPokemon.current = []
  }


  
  return (
    <>
      <Scoreboard currentClicked={clickedPokemon}></Scoreboard>
      <button onClick={startGame}></button>
      {pokemonCards}   
    </>
  )
}

export default App

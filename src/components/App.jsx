import { useState, useEffect, useRef } from 'react'
import PokemonCard from './PokemonCard'
import Scoreboard from './Scoreboard'
function App() {
  const clickedPokemon = useRef([])
  const [currentScore, setCurrentScore] = useState(0)
  const [pokemonCards, setPokemonCards] = useState([])

  
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
    let currentImageList = []
    for (let id = 0; id < pokemonIds.length; id++) {
      const pokemon = await fetch("https://pokeapi.co/api/v2/pokemon/" + pokemonIds[id], {mode: "cors"})
      const pokemonFile = await pokemon.json()
      const pokemonImage = pokemonFile.sprites.front_default
      currentImageList.push(pokemonImage)    
    }
    return currentImageList
  }

  function handleClick(event) {
    if (!(clickedPokemon.current.includes(event.target.id))) {
      clickedPokemon.current = clickedPokemon.current.concat([event.target.id])
      let newScore = currentScore + 1
      setCurrentScore(newScore)
      shuffleCards(pokemonCards)
    }
    else {
      clickedPokemon.current = []
      setCurrentScore(0)
    }

  }
  function generatePokemonCards(pokemonImages) {
    if (pokemonImages.length > 1) {
      let pokemonCardsTemp = []
      for (let pokemon = 0; pokemon < pokemonImages.length; pokemon++) {
        pokemonCardsTemp.push({image:pokemonImages[pokemon], id:pokemon, key:pokemon })
      }
      setPokemonCards(pokemonCardsTemp)}
  }

  function shuffleCards(pokemonCards) {
    let currentPokemonCards = structuredClone(pokemonCards)
    let currentIndex = currentPokemonCards.length
    while (currentIndex != 0) {
      let randomIndex = Math.floor(Math.random() * currentIndex)
      currentIndex--
      let temp = structuredClone(currentPokemonCards[currentIndex])
      currentPokemonCards[currentIndex] = currentPokemonCards[randomIndex]
      currentPokemonCards[randomIndex] = temp

      
    }

    setPokemonCards(currentPokemonCards)
  }

  function createPokemonCards() {
    let pokemonIds = getIds(12)
    let pokemonImages = getPokemonImages(pokemonIds)
    
    pokemonImages.then((response) => {
      generatePokemonCards(response)
    })
  }
  function startGame() {
    createPokemonCards()
  }
  
  return (
    <div className="content">

      <h1 className="title">Pokemon Memory Game</h1>
      <Scoreboard currentScore={currentScore}></Scoreboard>
      <button onClick={(startGame)}>New Game</button>
 
      <div className="cards">
      {pokemonCards.map((item) => {
        return (<PokemonCard image={item.image} id={item.id} key={item.key} handleClick={handleClick}></PokemonCard>)
      })} 
      </div>
    </div>
  )
}


export default App
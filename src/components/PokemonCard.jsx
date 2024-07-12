import { useState, useEffect } from 'react'

function PokemonCard({image, id, handleClick}) {



    return <img src={image} id={id} onClick={handleClick}></img>
}
export default PokemonCard
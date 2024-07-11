import { useState, useEffect } from 'react'

function PokemonCard({image, id}) {
    return <img src={image} id={id}></img>
}
export default PokemonCard
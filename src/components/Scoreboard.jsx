import { useState, useEffect } from 'react'

function Scoreboard({currentClicked}) {
    const [highScore, setHighScore] = useState(0)
    const [currentScore, setCurrentScore] = useState(0)
    if (currentClicked.current.length >= currentScore + 1) {
        setCurrentScore(currentClicked.current.length)
    }

    if (currentScore > highScore) {
        setHighScore(currentScore)
    }
    return <div>
        <div>Current Score: {currentScore}</div>
        <div>High Score: {highScore}</div>
    </div>
}

export default Scoreboard
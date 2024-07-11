import { useState, useEffect } from 'react'

function Scoreboard() {
    const [currentScore, setCurrentScore] = useState(0)
    const [highScore, setHighScore] = useState(0)
    if (currentScore > highScore) {
        setHighScore(currentScore)
    }
    return <div>
        <div>Current Score: {currentScore}</div>
        <div>High Score: {highScore}</div>
    </div>
}

export default Scoreboard
import { useState, useEffect } from 'react'

function Scoreboard({currentScore}) {
    const [highScore, setHighScore] = useState(0)
    if (currentScore > highScore) {
        setHighScore(currentScore)
    }
    return <div className="scoreboard">
        <div>Current Score: {currentScore}</div>
        <div>High Score: {highScore}</div>
    </div>
}

export default Scoreboard
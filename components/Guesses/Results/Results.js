import { useState } from 'react'
import { useGuessContext } from '@lib/use-guess-context'
import GuessList from '../GuessList'

export default function Results() {
    const [showGuesses, setShowGuesses] = useState(false)
    const { correct } = useGuessContext()

    const handleClick = () => setShowGuesses(!showGuesses)

    if (correct) {
        return (
            <div>
                <h2>Good work!</h2>
                <button onClick={handleClick} type='button'>
                    Show Guesses
                </button>
                {showGuesses && <GuessList />}
            </div>
        )
    }

    return (
        <div>
            <h2>The correct answer was:</h2>
            <div>Double Indemnity</div>
            <button onClick={handleClick} type='button'>
                Show Guesses
            </button>
            {showGuesses && <GuessList />}
        </div>
    )
}

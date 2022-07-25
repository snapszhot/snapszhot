import { useGuessContext } from '@lib/use-guess-context'

import GuessForm from './GuessForm'
import GuessList from './GuessList'
import Results from './Results'
import StepList from './StepList'

export default function Guesses() {
    const { gameState } = useGuessContext()

    return (
        <div>
            <StepList />
            {gameState === 'in-progress' ? <GuessForm /> : <Results />}
            <GuessList />
        </div>
    )
}

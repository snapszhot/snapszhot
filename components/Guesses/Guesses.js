import { useGuessContext } from '@lib/use-guess-context'

import GuessForm from './GuessForm'
import GuessList from './GuessList'
import Results from './Results'
import StepList from './StepList'

export default function Guesses() {
    const { guessNum } = useGuessContext()

    return (
        <div>
            <StepList />
            {guessNum < 6 ? (
                <>
                    <GuessForm />
                    <GuessList />
                </>
            ) : (
                <Results />
            )}
        </div>
    )
}

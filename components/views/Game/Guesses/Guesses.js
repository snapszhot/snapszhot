import PropTypes from 'prop-types'
import { useGuessContext } from '@lib/use-guess-context'

import { CenteredWrapper } from '@components/common'
import GuessForm from './GuessForm'
import GuessList from './GuessList'
import Results from './Results'
import StepList from './StepList'

export default function Guesses({ day }) {
    const { gameState } = useGuessContext()

    return (
        <CenteredWrapper padding='var(--spacing-half) var(--spacing-single) var(--spacing-triple)'>
            <StepList />
            {gameState === 'in-progress' ? (
                <GuessForm />
            ) : (
                <Results day={day} />
            )}
            <GuessList />
        </CenteredWrapper>
    )
}

Guesses.propTypes = {
    day: PropTypes.number,
}

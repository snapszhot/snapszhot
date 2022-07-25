import PropTypes from 'prop-types'
import { useGuessContext } from '@lib/use-guess-context'

import GuessForm from './GuessForm'
import GuessList from './GuessList'
import Results from './Results'
import StepList from './StepList'
import styles from './Guesses.module.scss'

export default function Guesses({ prefills }) {
    const { gameState } = useGuessContext()

    return (
        <div className={styles.body}>
            <StepList />
            {gameState === 'in-progress' ? (
                <GuessForm options={prefills} />
            ) : (
                <Results />
            )}
            <GuessList />
        </div>
    )
}

Guesses.propTypes = {
    prefills: PropTypes.array,
}

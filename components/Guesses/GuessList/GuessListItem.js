import PropTypes from 'prop-types'
import { useGuessContext } from '@lib/use-guess-context'
import styles from './GuessListItem.module.scss'

export default function GuessListItem({ guess }) {
    const { answer } = useGuessContext()
    const isCorrect = guess === answer

    return (
        <li className={styles.container}>
            <span className={styles.icon}>{isCorrect ? '✅' : '❌'}</span>
            {guess}
        </li>
    )
}

GuessListItem.propTypes = {
    guess: PropTypes.string,
}

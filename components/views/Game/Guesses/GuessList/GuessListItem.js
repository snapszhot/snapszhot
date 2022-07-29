import PropTypes from 'prop-types'
import Movie from '../Movie'
import styles from './GuessListItem.module.scss'

export default function GuessListItem({ guess }) {
    return (
        <li className={styles.container}>
            <span className={styles.icon}>{guess.isCorrect ? '✅' : '❌'}</span>
            <div>
                <Movie {...guess} />
            </div>
        </li>
    )
}

GuessListItem.propTypes = {
    guess: PropTypes.object,
}

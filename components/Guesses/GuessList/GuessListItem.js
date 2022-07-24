import PropTypes from 'prop-types'
import styles from './GuessListItem.module.scss'

export default function GuessListItem({ guess }) {
    return <li className={styles.container}>{guess}</li>
}

GuessListItem.propTypes = {
    guess: PropTypes.string,
}

import PropTypes from 'prop-types'
import styles from './GuessGrid.module.scss'

function GuessGridItem({ amount, gamesPlayed, guess }) {
    const ratio = amount / gamesPlayed
    const percentage = ratio * 100
    const offset = 24 * ratio

    return (
        <li className={styles.gridItem}>
            <span className={styles.guess}>{guess}</span>
            <span
                className={styles.gridItemSpan}
                style={{
                    width: `calc(${percentage}% - ${offset}px)`,
                }}
            >
                {amount}
            </span>
        </li>
    )
}

GuessGridItem.propTypes = {
    amount: PropTypes.number,
    gamesPlayed: PropTypes.number,
    guess: PropTypes.number,
}

export default function GuessGrid({ gamesPlayed, guesses }) {
    return (
        <div className={styles.grid}>
            <h2 className={styles.title}>Guess Distribution</h2>
            <ul>
                {guesses.map((amount, index) => (
                    <GuessGridItem
                        amount={amount}
                        gamesPlayed={gamesPlayed}
                        guess={index + 1}
                        key={index}
                    />
                ))}
            </ul>
        </div>
    )
}

GuessGrid.propTypes = {
    gamesPlayed: PropTypes.number,
    guesses: PropTypes.array,
}

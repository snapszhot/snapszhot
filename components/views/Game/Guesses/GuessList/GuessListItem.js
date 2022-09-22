import PropTypes from 'prop-types'
import cn from 'classnames'
import { useGuessContext } from '@lib/use-guess-context'

import Movie from '../Movie'
import Hints from './Hints'
import styles from './GuessListItem.module.scss'

function isWithinYearRange(guessYear, answerYear, yearRange) {
    const guessNum = parseInt(guessYear)
    const answerYears = answerYear.split(/[\/-]/)

    // We look at all the available years and create a big array
    // with the proper range. Then we'll see if the guessed year
    // is in that array.
    const range = answerYears.flatMap(year => {
        const yearInt = parseInt(year)
        return Array.from(
            new Array(yearRange * 2 + 1),
            (x, i) => yearInt - yearRange + i
        )
    })

    return range.includes(guessNum)
}

export default function GuessListItem({ guess }) {
    const { answer, enabledHints } = useGuessContext()
    const yearRange = 5
    const skipped = guess.director === ''

    const showDirectorHints =
        enabledHints.director && answer.director === guess.director
    const showYearHints =
        enabledHints.year &&
        isWithinYearRange(guess.releaseYear, answer.releaseYear, yearRange)
    const showHints = (showDirectorHints || showYearHints) && !guess.isCorrect

    const containerStyles = cn(styles.container, {
        [styles.isYellow]: showHints,
        [styles.isGreen]: guess.isCorrect,
    })

    return (
        <li className={containerStyles}>
            <div className={styles.topWrapper}>
                <span className={styles.icon}>
                    {guess.isCorrect && '✅'}
                    {!guess.isCorrect && !showHints && '❌'}
                    {showHints && '⚠️'}
                </span>
                <div>
                    {skipped ? (
                        <span className={styles.skipped}>Skipped</span>
                    ) : (
                        <Movie {...guess} />
                    )}
                </div>
            </div>
            {showHints && (
                <Hints
                    showDirectorHints={showDirectorHints}
                    showYearHints={showYearHints}
                    yearRange={yearRange}
                />
            )}
        </li>
    )
}

GuessListItem.propTypes = {
    guess: PropTypes.object,
}

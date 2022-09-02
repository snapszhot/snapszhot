import PropTypes from 'prop-types'

import styles from './Hints.module.scss'

export default function Hints({ showDirectorHints, showYearHints, yearRange }) {
    return (
        <div className={styles.hints}>
            {showDirectorHints &&
                'You’re close! That’s the correct director but the wrong film.'}
            {showDirectorHints && showYearHints && ' '}
            {showYearHints && (
                <>
                    You’re {showDirectorHints && 'also '} within {yearRange}{' '}
                    years of the release date.
                </>
            )}
        </div>
    )
}

Hints.propTypes = {
    showDirectorHints: PropTypes.bool,
    showYearHints: PropTypes.bool,
    yearRange: PropTypes.number,
}

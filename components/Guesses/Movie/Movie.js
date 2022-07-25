import PropTypes from 'prop-types'
import styles from './Movie.module.scss'

export default function Movie({ director, movie, originalTitle, releaseYear }) {
    return (
        <>
            <span className={styles.title}>
                {movie}
                {originalTitle && (
                    <span className={styles.origTitle}>({originalTitle})</span>
                )}
            </span>
            <span className={styles.year}>{releaseYear}</span>
            <span className={styles.director}>{director}</span>
        </>
    )
}

Movie.propTypes = {
    director: PropTypes.string,
    movie: PropTypes.string,
    originalTitle: PropTypes.string,
    releaseYear: PropTypes.string,
}

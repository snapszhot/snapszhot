import PropTypes from 'prop-types'
import styles from './Movie.module.scss'

export default function Movie({ director, movie, releaseYear }) {
    return (
        <>
            <span className={styles.title}>{movie}</span>
            <span className={styles.year}>{releaseYear}</span>
            <span className={styles.director}>{director}</span>
        </>
    )
}

Movie.propTypes = {
    director: PropTypes.string,
    movie: PropTypes.string,
    releaseYear: PropTypes.string,
}

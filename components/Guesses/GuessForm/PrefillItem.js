import PropTypes from 'prop-types'
import styles from './PrefillItem.module.scss'

export default function PrefillItem({ handleClick, item }) {
    const onClick = () => handleClick(item.movie)

    return (
        <li>
            <button className={styles.prefillItem} onClick={onClick}>
                <span className={styles.title}>{item.movie}</span>
                <span className={styles.year}>{item.releaseYear}</span>
                <span className={styles.director}>{item.director}</span>
            </button>
        </li>
    )
}

PrefillItem.propTypes = {
    handleClick: PropTypes.fun,
    item: PropTypes.object,
}

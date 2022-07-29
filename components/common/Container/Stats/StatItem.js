import PropTypes from 'prop-types'
import styles from './StatItem.module.scss'

export default function StatItem({ number, title }) {
    return (
        <div className={styles.container}>
            <dt className={styles.title}>{title}</dt>
            <dd className={styles.number}>{number}</dd>
        </div>
    )
}

StatItem.propTypes = {
    number: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    title: PropTypes.string,
}

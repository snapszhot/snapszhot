import PropTypes from 'prop-types'
import styles from './Container.module.scss'

export default function Container({ children, day, subtitle }) {
    return (
        <div className={styles.container}>
            <header>
                <div className={styles.pageTitleWrapper}>
                    <div className={styles.pageTitle}>SNAPSЖOT</div>
                </div>
                <div>
                    <h1>
                        <span className={styles.day}>Day {day}</span>
                        <span className={styles.hintTitle}>“{subtitle}”</span>
                    </h1>
                </div>
            </header>
            <main>{children}</main>
        </div>
    )
}

Container.propTypes = {
    children: PropTypes.node,
    day: PropTypes.string,
    subtitle: PropTypes.string,
}

import PropTypes from 'prop-types'
import styles from './Container.module.scss'

export default function Container({ children, day, subtitle }) {
    return (
        <div className={styles.wrapper}>
            <div className={styles.container}>
                <header>
                    <div>
                        SNAPSЖOT
                        <button>info</button>
                    </div>
                    <div>
                        <h1>
                            Day {day}: {subtitle}
                        </h1>
                    </div>
                </header>
                <main>{children}</main>
            </div>
        </div>
    )
}

Container.propTypes = {
    children: PropTypes.node,
    day: PropTypes.string,
    subtitle: PropTypes.string,
}

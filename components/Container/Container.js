import PropTypes from 'prop-types'
import { useGuessContext } from '@lib/use-guess-context'

import Stats from './Stats'
import styles from './Container.module.scss'

export default function Container({ children, day, subtitle }) {
    const { loading } = useGuessContext()

    if (loading) {
        return null
    }

    return (
        <div className={styles.container}>
            <header>
                <div className={styles.pageTitleWrapper}>
                    <div className={styles.pageTitle}>SNAPSЖOT</div>
                    <Stats />
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
    day: PropTypes.number,
    subtitle: PropTypes.string,
}

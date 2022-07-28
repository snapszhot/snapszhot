import PropTypes from 'prop-types'
import { useGuessContext } from '@lib/use-guess-context'

import Nav from './Nav'
import styles from './Container.module.scss'

export default function Container({ children, day, mostRecentDay, subtitle }) {
    const { loading } = useGuessContext()

    if (loading) {
        return null
    }

    return (
        <div className={styles.container}>
            <header className={styles.header}>
                <div className={styles.pageTitleWrapper}>
                    <div className={styles.pageTitle}>SNAPSЖOT</div>
                    <Nav day={day} mostRecentDay={mostRecentDay} />
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
    mostRecentDay: PropTypes.number,
    subtitle: PropTypes.string,
}

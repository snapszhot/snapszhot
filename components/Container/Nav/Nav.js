import PropTypes from 'prop-types'
import Link from 'next/link'
import getRandomInt from '@lib/get-random-int'

import styles from './Nav.module.scss'

export default function Nav({ day, mostRecentDay }) {
    const prevLink = `/day/${day - 1}`
    const nextLink = `/day/${day + 1}`
    const randomLink = `/day/${getRandomInt(1, mostRecentDay, day)}`

    return (
        <ul className={styles.nav}>
            {day > 1 && (
                <li>
                    <Link href={prevLink}>
                        <a>← Previous</a>
                    </Link>
                </li>
            )}
            <li>
                <Link href={randomLink}>
                    <a>Random</a>
                </Link>
            </li>
            {mostRecentDay > day && (
                <li>
                    <Link href={nextLink}>
                        <a>Next →</a>
                    </Link>
                </li>
            )}
        </ul>
    )
}

Nav.propTypes = {
    day: PropTypes.number,
    mostRecentDay: PropTypes.number,
}

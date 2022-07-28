import PropTypes from 'prop-types'
import Link from 'next/link'
import getRandomInt from '@lib/get-random-int'
import { getPlayedGames } from '@lib/storage'

import styles from './Nav.module.scss'

function getRandomLink(day, mostRecentDay) {
    const playedGames = getPlayedGames()
    const exclude = [...playedGames, day]

    return getRandomInt(49, mostRecentDay, exclude)
}

export default function Nav({ day, mostRecentDay }) {
    const prevLink = `/day/${day - 1}`
    const nextLink = `/day/${day + 1}`
    const randomLink = `/day/${getRandomLink(day, mostRecentDay)}`

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

import { useState } from 'react'
import PropTypes from 'prop-types'
import { useRouter } from 'next/router'
import getRandomLink from '@lib/get-random-link'
import useHasMounted from '@lib/use-has-mounted'

import {
    Archive,
    Next,
    Previous,
    Random,
    Settings as SettingsIcon,
    Stats as StatsIcon,
} from '@components/icons'
import Settings from '../Settings'
import Stats from '../Stats'
import NavIcon from './NavIcon'
import styles from './Nav.module.scss'

export default function Nav({ day, mostRecentDay }) {
    const { pathname } = useRouter()
    const [settingsIsOpen, setSettingsIsOpen] = useState(false)
    const [statsIsOpen, setStatsIsOpen] = useState(false)
    const toggleSettings = () => setSettingsIsOpen(!settingsIsOpen)
    const toggleStats = () => setStatsIsOpen(!statsIsOpen)

    const hasMounted = useHasMounted()
    const randomLink = getRandomLink({ day, hasMounted, mostRecentDay })

    const showGameNav = pathname !== '/archive'
    const prevLink = `/day/${day - 1}`
    const nextLink = `/day/${day + 1}`

    return (
        <div className={styles.container}>
            <ul className={styles.nav}>
                {day > 1 && showGameNav && (
                    <NavIcon link={prevLink} title='Previous'>
                        <Previous styles={styles.nextPrevIcon} />
                    </NavIcon>
                )}
                <NavIcon link={randomLink} title='Random'>
                    <Random styles={styles.icon} />
                </NavIcon>
                {mostRecentDay > day && showGameNav && (
                    <NavIcon link={nextLink} title='Next'>
                        <Next styles={styles.nextPrevIcon} />
                    </NavIcon>
                )}
                <NavIcon link='/archive' title='Archive'>
                    <Archive styles={styles.nextPrevIcon} />
                </NavIcon>
            </ul>
            <ul className={styles.nav}>
                <li>
                    <button
                        className={styles.statsButton}
                        onClick={toggleStats}
                    >
                        <span className='visuallyHidden'>Stats</span>
                        <StatsIcon styles={styles.statsIcon} />
                    </button>
                </li>
                <li>
                    <button
                        className={styles.statsButton}
                        onClick={toggleSettings}
                    >
                        <span className='visuallyHidden'>Settings</span>
                        <SettingsIcon styles={styles.settingsIcon} />
                    </button>
                </li>
            </ul>
            <Stats isOpen={statsIsOpen} toggleModal={toggleStats} />
            <Settings isOpen={settingsIsOpen} toggleModal={toggleSettings} />
        </div>
    )
}

Nav.propTypes = {
    day: PropTypes.number,
    mostRecentDay: PropTypes.number,
}

import { useState } from 'react'
import PropTypes from 'prop-types'
import { useRouter } from 'next/router'
import getRandomLink from '@lib/get-random-link'

import Stats from '../Stats'
import NavIcon from './NavIcon'
import styles from './Nav.module.scss'

export default function Nav({ day, mostRecentDay }) {
    const { pathname } = useRouter()
    const [isOpen, setIsOpen] = useState(false)
    const toggleModal = () => setIsOpen(!isOpen)

    const showGameNav = pathname !== '/archive'
    const prevLink = `/day/${day - 1}`
    const nextLink = `/day/${day + 1}`
    const randomLink = getRandomLink({ day, mostRecentDay })

    return (
        <>
            <ul className={styles.nav}>
                {day > 1 && showGameNav && (
                    <NavIcon link={prevLink} title='Previous'>
                        <svg
                            className={styles.nextPrevIcon}
                            viewBox='0 0 319 511.61'
                        >
                            <path d='m270.08 5.89 43.04 43.04c7.85 7.86 7.83 20.72 0 28.54L134.77 255.82l178.35 178.35c7.85 7.86 7.8 20.73 0 28.54l-43.04 43.04c-7.83 7.82-20.71 7.82-28.54 0L49.29 313.49l-.37-.36-43.04-43.04c-7.82-7.83-7.86-20.68 0-28.54l43.04-43.04.37-.36L241.54 5.89c7.85-7.85 20.68-7.85 28.54 0z' />
                        </svg>
                    </NavIcon>
                )}
                <NavIcon link={randomLink} title='Random'>
                    <svg className={styles.icon} viewBox='0 0 122.88 105.71'>
                        <path d='M0,79.45c-0.02-1.95,0.76-3.06,2.51-3.18h14.08c5.98,0,8.89,0.16,13.98-3.91c1.08-0.86,2.1-1.86,3.06-3 c4.55-5.41,6.17-11.96,7.87-18.9C44.79,37,50.03,22.78,63.98,17.15c7.94-3.2,18.82-2.59,27.41-2.59h5.27l0.01-10.05 c0-5.01,1.18-5.88,4.79-2.45l19.55,18.58c2.36,2.24,2.03,3.7-0.22,5.86L101.49,45c-3.37,3.41-4.89,2.45-4.82-2.26v-11.8 c-34-0.52-32.57,1.67-42.05,34.09c-3.5,10.04-8.81,17.08-15.59,21.69c-7.09,4.82-13.68,6.39-22.02,6.39H6.65 C0.71,93.11,0,92.83,0,86.75V79.45L0,79.45z M0.23,26.26c-0.02,1.95,0.76,3.06,2.51,3.18h14.7c5.98,0,8.89-0.16,13.98,3.91 c1.08,0.86,2.1,1.86,3.06,3c1.16,1.38,2.13,2.84,2.96,4.35c1.5-4.69,3.36-9.29,5.82-13.5c0.7-1.19,1.44-2.35,2.23-3.48 c-1.74-1.8-3.61-3.37-5.61-4.73c-7.09-4.82-13.68-6.39-22.02-6.39H6.88c-5.94,0-6.65,0.28-6.65,6.36V26.26L0.23,26.26z M53.57,80.45c2.96,3.42,6.63,6.24,11.27,8.11c7.94,3.2,18.21,2.59,26.8,2.59h5.27l0.01,10.05c0,5.01,1.18,5.88,4.79,2.45 l19.55-18.58c2.36-2.24,2.03-3.7-0.22-5.86l-19.3-18.5c-3.37-3.41-4.89-2.45-4.82,2.26v11.8c-24.78,0.38-30.42-0.69-35.32-13.84 c-0.27,0.94-0.64,2.23-1.93,6.65c-0.03,0.1-0.06,0.19-0.09,0.28l0,0C57.91,72.62,55.9,76.79,53.57,80.45L53.57,80.45z' />
                    </svg>
                </NavIcon>
                {mostRecentDay > day && showGameNav && (
                    <NavIcon link={nextLink} title='Next'>
                        <svg
                            className={styles.nextPrevIcon}
                            viewBox='0 0 319 511.61'
                        >
                            <path d='M48.92 505.72 5.88 462.68c-7.85-7.85-7.83-20.72 0-28.54l178.35-178.35L5.88 77.44c-7.85-7.85-7.8-20.73 0-28.54L48.92 5.87c7.83-7.82 20.71-7.82 28.54 0l192.25 192.26.37.36 43.04 43.03c7.82 7.84 7.86 20.69 0 28.54l-43.04 43.04-.37.36L77.46 505.72c-7.85 7.86-20.68 7.86-28.54 0z' />
                        </svg>
                    </NavIcon>
                )}
                <NavIcon link='/archive' title='Archive'>
                    <svg
                        className={styles.nextPrevIcon}
                        viewBox='0 0 122.88 102.4'
                    >
                        <path d='m35.37 0h86a1.56 1.56 0 0 1 1.55 1.55v18.66a1.58 1.58 0 0 1 -1.55 1.54h-86a1.56 1.56 0 0 1 -1.54-1.54v-18.66a1.54 1.54 0 0 1 1.54-1.55zm0 80.65h86a1.56 1.56 0 0 1 1.55 1.54v18.67a1.58 1.58 0 0 1 -1.55 1.54h-86a1.56 1.56 0 0 1 -1.54-1.54v-18.67a1.54 1.54 0 0 1 1.54-1.54zm-33.82 0h16a1.56 1.56 0 0 1 1.55 1.54v18.67a1.58 1.58 0 0 1 -1.55 1.54h-16a1.56 1.56 0 0 1 -1.55-1.54v-18.67a1.54 1.54 0 0 1 1.55-1.54zm33.82-18.57h86a1.56 1.56 0 0 0 1.55-1.55v-18.66a1.58 1.58 0 0 0 -1.55-1.55h-86a1.57 1.57 0 0 0 -1.54 1.55v18.66a1.55 1.55 0 0 0 1.54 1.55zm-33.82 0h16a1.56 1.56 0 0 0 1.55-1.55v-18.66a1.58 1.58 0 0 0 -1.55-1.55h-16a1.57 1.57 0 0 0 -1.55 1.55v18.66a1.55 1.55 0 0 0 1.55 1.55zm0-62.08h16a1.56 1.56 0 0 1 1.55 1.55v18.66a1.58 1.58 0 0 1 -1.55 1.54h-16a1.56 1.56 0 0 1 -1.55-1.54v-18.66a1.54 1.54 0 0 1 1.55-1.55z' />
                    </svg>
                </NavIcon>
                <li>
                    <button
                        className={styles.statsButton}
                        onClick={toggleModal}
                    >
                        <span className='visuallyHidden'>Stats</span>
                        <svg className={styles.statsIcon} viewBox='0 0 43 30'>
                            <path d='M32.000,27.000 L32.000,3.1000 L41.000,3.1000 L41.000,27.000 L32.000,27.000 ZM18.000,8.1000 L26.1000,8.1000 L26.1000,27.000 L18.000,27.000 L18.000,8.1000 ZM3.1000,13.1000 L12.1000,13.1000 L12.1000,27.000 L3.1000,27.000 L3.1000,13.1000 Z' />
                        </svg>
                    </button>
                </li>
            </ul>
            <Stats isOpen={isOpen} toggleModal={toggleModal} />
        </>
    )
}

Nav.propTypes = {
    day: PropTypes.number,
    mostRecentDay: PropTypes.number,
}

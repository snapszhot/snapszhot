import { useState } from 'react'
import Modal from 'react-modal'
import { useGuessContext } from '@lib/use-guess-context'

import GuessGrid from './GuessGrid'
import StatItem from './StatItem'
import styles from './Stats.module.scss'

Modal.setAppElement('#__next')

export default function Stats() {
    const { stats } = useGuessContext()
    const [isOpen, setIsOpen] = useState(false)
    const toggleModal = () => setIsOpen(!isOpen)

    const modalStyles = {
        overlay: {
            backgroundColor: 'rgba(0, 0, 0, 0.25)',
        },
    }

    const winPercentage =
        parseFloat((stats.gamesWon / stats.gamesPlayed) * 100).toFixed(2) + '%'

    return (
        <>
            <button className={styles.statsButton} onClick={toggleModal}>
                <svg title='Stats' viewBox='0 0 43 30'>
                    <path d='M32.000,27.000 L32.000,3.1000 L41.000,3.1000 L41.000,27.000 L32.000,27.000 ZM18.000,8.1000 L26.1000,8.1000 L26.1000,27.000 L18.000,27.000 L18.000,8.1000 ZM3.1000,13.1000 L12.1000,13.1000 L12.1000,27.000 L3.1000,27.000 L3.1000,13.1000 Z' />
                </svg>
            </button>
            <Modal
                className={styles.modal}
                contentLabel='Your Stats'
                isOpen={isOpen}
                onRequestClose={toggleModal}
                style={modalStyles}
            >
                <div className={styles.header}>
                    <h2 className={styles.headerTitle}>Your Stats</h2>
                    <button className={styles.close} onClick={toggleModal}>
                        &times;
                    </button>
                </div>
                <dl className={styles.stats}>
                    <StatItem number={stats.gamesPlayed} title='Games Played' />
                    <StatItem number={stats.gamesWon} title='Games Won' />
                    <StatItem number={winPercentage} title='Win %' />
                    <StatItem
                        number={stats.currentStreak}
                        title='Current Streak'
                    />
                    <StatItem number={stats.maxStreak} title='Longest Streak' />
                </dl>
                <GuessGrid {...stats} />
            </Modal>
        </>
    )
}

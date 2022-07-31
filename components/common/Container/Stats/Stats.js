import PropTypes from 'prop-types'
import Modal from 'react-modal'
import { useGuessContext } from '@lib/use-guess-context'

import GuessGrid from './GuessGrid'
import StatItem from './StatItem'
import styles from './Stats.module.scss'

Modal.setAppElement('#__next')

export default function Stats({ isOpen, toggleModal }) {
    const { stats } = useGuessContext()

    const modalStyles = {
        overlay: {
            backgroundColor: 'rgba(0, 0, 0, 0.25)',
        },
    }

    const winPercentage =
        stats?.gamesPlayed !== 0
            ? parseFloat((stats?.gamesWon / stats?.gamesPlayed) * 100).toFixed(
                  2
              ) + '%'
            : '0%'

    return (
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
                <StatItem number={stats?.gamesPlayed} title='Games Played' />
                <StatItem number={stats?.gamesWon} title='Games Won' />
                <StatItem number={winPercentage} title='Win %' />
                <StatItem
                    number={stats?.currentStreak}
                    title='Current Streak'
                />
                <StatItem number={stats?.maxStreak} title='Longest Streak' />
            </dl>
            <GuessGrid {...stats} />
        </Modal>
    )
}

Stats.propTypes = {
    isOpen: PropTypes.bool,
    toggleModal: PropTypes.func,
}

import PropTypes from 'prop-types'
import { useGuessContext } from '@lib/use-guess-context'

import { Modal } from '@components/common'
import GuessGrid from './GuessGrid'
import StatItem from './StatItem'
import styles from './Stats.module.scss'

export default function Stats({ isOpen, toggleModal }) {
    const { stats } = useGuessContext()

    const winPercentage =
        stats?.gamesPlayed !== 0
            ? parseFloat((stats?.gamesWon / stats?.gamesPlayed) * 100).toFixed(
                  2
              ) + '%'
            : '0%'

    return (
        <Modal isOpen={isOpen} title='Your Stats' toggleModal={toggleModal}>
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
            <div className={styles.statsLinkContainer}>
                <a
                    className={styles.statsLink}
                    href='https://snapszhot-stats.vercel.app/archive'
                >
                    See how everyone else has done
                </a>
            </div>
        </Modal>
    )
}

Stats.propTypes = {
    isOpen: PropTypes.bool,
    toggleModal: PropTypes.func,
}

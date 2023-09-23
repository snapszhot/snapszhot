import PropTypes from 'prop-types'
import { useGuessContext } from '@lib/use-guess-context'

import { CenteredWrapper } from '@components/common'
import styles from './Title.module.scss'

export default function Game({ day, subtitle }) {
    const { enabledHints } = useGuessContext()

    return (
        <CenteredWrapper padding='0 var(--spacing-single) var(--spacing-half)'>
            <h1>
                <span className={styles.day}>Day {day}</span>
                {enabledHints.subtitles && (
                    <span className={styles.hintTitle}>“{subtitle}”</span>
                )}
            </h1>
        </CenteredWrapper>
    )
}

Game.propTypes = {
    day: PropTypes.number,
    subtitle: PropTypes.string,
}

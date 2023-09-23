import PropTypes from 'prop-types'
import Link from 'next/link'
import cn from 'classnames'
import { useGuessContext } from '@lib/use-guess-context'
import styles from './ArchivePost.module.scss'

export default function ArchivePost({ day, isLast, result, subtitle }) {
    const { enabledHints } = useGuessContext()
    const link = `/day/${day}`
    const won = result === 'won'
    const lost = result === 'lost'

    const className = cn(styles.post, {
        [styles.lastPost]: isLast,
    })

    return (
        <li className={className}>
            <span className={styles.result}>
                {lost && <>❌</>}
                {won && <>✅</>}
            </span>
            {enabledHints.subtitles ? (
                <>
                    <span className={styles.day}>DAY {day}: </span>
                    <Link href={link}>
                        <a>{subtitle}</a>
                    </Link>
                </>
            ) : (
                <Link href={link}>
                    <a className={styles.day}>DAY {day}</a>
                </Link>
            )}
        </li>
    )
}

ArchivePost.propTypes = {
    day: PropTypes.number,
    isLast: PropTypes.bool,
    result: PropTypes.string,
    subtitle: PropTypes.string,
}

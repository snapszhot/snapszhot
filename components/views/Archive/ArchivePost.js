import PropTypes from 'prop-types'
import Link from 'next/link'
import cn from 'classnames'
import styles from './ArchivePost.module.scss'

export default function ArchivePost({ day, isLast, result, subtitle }) {
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
            <span className={styles.day}>DAY {day}: </span>
            <Link href={link}>
                <a>{subtitle}</a>
            </Link>
        </li>
    )
}

ArchivePost.propTypes = {
    day: PropTypes.number,
    isLast: PropTypes.bool,
    result: PropTypes.string,
    subtitle: PropTypes.string,
}

import PropTypes from 'prop-types'
import Link from 'next/link'
import cn from 'classnames'
import styles from './ArchivePost.module.scss'

export default function ArchivePost({ day, isLast, subtitle }) {
    const link = `/day/${day}`
    const className = cn({
        [styles.lastPost]: isLast,
    })

    return (
        <li className={className}>
            <span className={styles.day}>DAY {day}: </span>
            <Link href={link}>
                <a>{subtitle}</a>
            </Link>
        </li>
    )
}

ArchivePost.propTypes = {
    day: PropTypes.number,
    isLast: PropTypes.string,
    subtitle: PropTypes.string,
}

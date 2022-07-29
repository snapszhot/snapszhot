import PropTypes from 'prop-types'
import Link from 'next/link'

export default function ArchivePost({ day, subtitle }) {
    const link = `/day/${day}`

    return (
        <li>
            <Link href={link}>
                <a>
                    DAY {day}: {subtitle}
                </a>
            </Link>
        </li>
    )
}

ArchivePost.propTypes = {
    day: PropTypes.number,
    subtitle: PropTypes.string,
}

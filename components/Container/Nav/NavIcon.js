import PropTypes from 'prop-types'
import Link from 'next/link'

export default function NavIcon({ children, link, title }) {
    return (
        <li>
            <Link href={link}>
                <a>
                    <span className='visuallyHidden'>{title}</span>
                    {children}
                </a>
            </Link>
        </li>
    )
}

NavIcon.propTypes = {
    children: PropTypes.node,
    link: PropTypes.string,
    title: PropTypes.string,
}

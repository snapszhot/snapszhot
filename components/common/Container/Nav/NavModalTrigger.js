import PropTypes from 'prop-types'
import styles from './NavModalTrigger.module.scss'

export default function NavModalTrigger({ children, onClick, title }) {
    return (
        <li>
            <button className={styles.button} onClick={onClick}>
                <span className='visuallyHidden'>{title}</span>
                {children}
            </button>
        </li>
    )
}

NavModalTrigger.propTypes = {
    children: PropTypes.node,
    onClick: PropTypes.func,
    title: PropTypes.string,
}

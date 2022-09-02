import PropTypes from 'prop-types'

export default function Stats({ styles }) {
    return (
        <svg className={styles} viewBox='0 0 43 30'>
            <path d='M32.000,27.000 L32.000,3.1000 L41.000,3.1000 L41.000,27.000 L32.000,27.000 ZM18.000,8.1000 L26.1000,8.1000 L26.1000,27.000 L18.000,27.000 L18.000,8.1000 ZM3.1000,13.1000 L12.1000,13.1000 L12.1000,27.000 L3.1000,27.000 L3.1000,13.1000 Z' />
        </svg>
    )
}

Stats.propTypes = {
    styles: PropTypes.string,
}

import PropTypes from 'prop-types'
import styles from './CenteredWrapper.module.scss'

export default function CenteredWrapper({ children, padding }) {
    return (
        <div className={styles.container} style={{ padding }}>
            {children}
        </div>
    )
}

CenteredWrapper.propTypes = {
    children: PropTypes.node,
    padding: PropTypes.string,
}

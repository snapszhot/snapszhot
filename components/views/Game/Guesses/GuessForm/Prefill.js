import PropTypes from 'prop-types'

import PrefillItem from './PrefillItem'
import styles from './Prefill.module.scss'

export default function Prefill({ handlePrefillSelect, options, showPrefill }) {
    // If we have no value or if the value entered doesn't match any
    // of the prefill options, don't show the prefill box. Also if we've just
    // selected an item, we want to hide the list.
    if (!showPrefill || !options) {
        return null
    }

    return (
        <ul className={styles.prefill}>
            {options.map((option, index) => {
                return (
                    <PrefillItem
                        item={option}
                        handleClick={handlePrefillSelect}
                        key={index}
                    />
                )
            })}
            {options.length === 0 && (
                <div className={styles.noResults}>
                    No items match your search
                </div>
            )}
        </ul>
    )
}

Prefill.propTypes = {
    handlePrefillSelect: PropTypes.func,
    options: PropTypes.array,
    showPrefill: PropTypes.bool,
}

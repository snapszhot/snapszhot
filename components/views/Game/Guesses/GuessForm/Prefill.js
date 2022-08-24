import PropTypes from 'prop-types'
import normalizeString from '@lib/normalize-string'
import PrefillItem from './PrefillItem'
import styles from './Prefill.module.scss'

export default function Prefill({
    handlePrefillSelect,
    options,
    showPrefill,
    value,
}) {
    // If we have no value or if the value entered doesn't match any
    // of the prefill options, don't show the prefill box.
    if (!showPrefill) {
        return null
    }

    const valueNormalized = normalizeString(value)
    const toShow = []

    for (let i = 0; i < options.length; i++) {
        const option = options[i]

        if (
            option.movieNorm.includes(valueNormalized) ||
            option.directorNorm.includes(valueNormalized) ||
            option.originalTitleNorm.includes(valueNormalized)
        ) {
            toShow.push(option)
        }

        if (toShow.length > 500) {
            break
        }
    }

    return (
        <ul className={styles.prefill}>
            {toShow.map((option, index) => {
                return (
                    <PrefillItem
                        item={option}
                        handleClick={handlePrefillSelect}
                        key={index}
                    />
                )
            })}
            {toShow.length === 0 && (
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
    value: PropTypes.string,
}

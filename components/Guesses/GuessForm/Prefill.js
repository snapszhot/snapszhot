import PropTypes from 'prop-types'
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

    const regEx = new RegExp(value, 'i')
    const toShow = []

    for (let i = 0; i < options.length; i++) {
        const option = options[i]

        if (
            regEx.test(option.movie) ||
            regEx.test(option.director) ||
            regEx.test(option.originalTitle)
        ) {
            toShow.push(option)
        }

        if (toShow.length > 9) {
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

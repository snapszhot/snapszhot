import PropTypes from 'prop-types'
import PrefillItem from './PrefillItem'
import styles from './Prefill.module.scss'

const optionMatchesValue = (option, value) =>
    option.movie.toLowerCase().includes(value.toLowerCase())

export default function Prefill({
    handlePrefillSelect,
    options,
    showPrefill,
    value,
}) {
    // If we have no value or if the value entered doesn't match any
    // of the prefill options, don't show the prefill box.
    if (
        !showPrefill ||
        !options.some(option => optionMatchesValue(option, value))
    ) {
        return null
    }

    return (
        <ul className={styles.prefill}>
            {options.map((option, index) => {
                if (optionMatchesValue(option, value)) {
                    return (
                        <PrefillItem
                            item={option}
                            handleClick={handlePrefillSelect}
                            key={index}
                        />
                    )
                }

                return null
            })}
        </ul>
    )
}

Prefill.propTypes = {
    handlePrefillSelect: PropTypes.func,
    options: PropTypes.array,
    showPrefill: PropTypes.bool,
    value: PropTypes.string,
}

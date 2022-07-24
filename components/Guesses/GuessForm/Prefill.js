import PropTypes from 'prop-types'
import PrefillItem from './PrefillItem'
import styles from './Prefill.module.scss'

export default function Prefill({
    handlePrefillSelect,
    options,
    showPrefill,
    value,
}) {
    if (!showPrefill) {
        return null
    }

    return (
        <ul className={styles.prefill}>
            {options.map((option, index) => {
                if (option.movie.toLowerCase().includes(value.toLowerCase())) {
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

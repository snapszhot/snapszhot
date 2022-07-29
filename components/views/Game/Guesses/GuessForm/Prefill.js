import PropTypes from 'prop-types'
import PrefillItem from './PrefillItem'
import styles from './Prefill.module.scss'

const normalizeString = string =>
    string
        .toLowerCase()
        .normalize('NFKD')
        .replace(/[\u0300-\u036f]/g, '')

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
    const regEx = new RegExp(valueNormalized, 'i')
    const toShow = []

    for (let i = 0; i < options.length; i++) {
        const option = options[i]
        const movie = normalizeString(option.movie)
        const director = normalizeString(option.director)
        const originalTitle = normalizeString(option.originalTitle)

        if (
            regEx.test(movie) ||
            regEx.test(director) ||
            regEx.test(originalTitle)
        ) {
            toShow.push(option)
        }

        if (toShow.length > 350) {
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

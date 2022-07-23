import PropTypes from 'prop-types'
import { useGuessContext } from '@lib/use-guess-context'
import cn from 'classnames'
import styles from './StepListItem.module.scss'

export default function StepListItem({ guess }) {
    const { selectedStep, setSelectedStep } = useGuessContext()
    const handleClick = () => setSelectedStep(guess)

    const className = cn(styles.item, {
        [styles.selected]: selectedStep === guess,
    })

    return (
        <li className={className}>
            <button onClick={handleClick}>{guess}</button>
        </li>
    )
}

StepListItem.propTypes = {
    guess: PropTypes.number,
}

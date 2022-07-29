import PropTypes from 'prop-types'
import { useGuessContext } from '@lib/use-guess-context'
import cn from 'classnames'
import styles from './StepListItem.module.scss'

export default function StepListItem({ imageNumber }) {
    const { currentImage, setCurrentImage } = useGuessContext()
    const handleClick = () => setCurrentImage(imageNumber)

    const className = cn(styles.item, {
        [styles.selected]: currentImage === imageNumber,
    })

    return (
        <li className={className}>
            <button onClick={handleClick}>{imageNumber}</button>
        </li>
    )
}

StepListItem.propTypes = {
    imageNumber: PropTypes.number,
}

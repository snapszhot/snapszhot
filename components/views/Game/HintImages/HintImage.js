import PropTypes from 'prop-types'
import Image from 'next/image'
import { useGuessContext } from '@lib/use-guess-context'
import styles from './HintImage.module.scss'

export default function HintImage({ dimensions, index, url }) {
    const { currentImage } = useGuessContext()
    const isDisplayed = index + 1 === currentImage

    const MAX_HEIGHT = 320
    const MAX_WIDTH = (dimensions?.width / dimensions?.height) * MAX_HEIGHT

    if (isDisplayed) {
        return (
            <div className={styles.container}>
                <img alt='' height={MAX_HEIGHT} src={url} width={MAX_WIDTH} />
            </div>
        )
    }

    return null
}

HintImage.propTypes = {
    dimensions: PropTypes.object,
    index: PropTypes.number,
    url: PropTypes.string,
}

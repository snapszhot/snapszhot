import PropTypes from 'prop-types'
import { useGuessContext } from '@lib/use-guess-context'
import styles from './HintImage.module.scss'

export default function HintImage({ dimensions, index, url }) {
    const { currentImage } = useGuessContext()
    const isDisplayed = index + 1 === currentImage

    const MAX_HEIGHT = 320
    const MAX_WIDTH = (dimensions?.width / dimensions?.height) * MAX_HEIGHT

    const placeholder = `data:image/svg+xml,%3csvg%20xmlns=%27http://www.w3.org/2000/svg%27%20version=%271.1%27%20width=%27${MAX_WIDTH}%27%20height=%27${MAX_HEIGHT}%27/%3e`

    if (isDisplayed) {
        return (
            <div className={styles.container}>
                <span className={styles.outerSpan}>
                    <span className={styles.innerSpan}>
                        <img
                            style={{
                                display: 'block',
                                maxWidth: '100%',
                                width: 'initial',
                                height: 'initial',
                                background: 'none',
                                opacity: 1,
                                border: 0,
                                margin: 0,
                                padding: 0,
                            }}
                            alt=''
                            aria-hidden={true}
                            src={placeholder}
                        />
                    </span>
                    <img
                        className={styles.image}
                        alt=''
                        height={MAX_HEIGHT}
                        src={url}
                        width={MAX_WIDTH}
                    />
                </span>
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

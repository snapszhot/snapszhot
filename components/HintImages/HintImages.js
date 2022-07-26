import PropTypes from 'prop-types'
import HintImage from './HintImage'
import styles from './HintImages.module.scss'

export default function HintImages({ images }) {
    return (
        <div className={styles.images}>
            {images.map((image, index) => (
                <HintImage {...image.image} index={index} key={index} />
            ))}
        </div>
    )
}

HintImages.propTypes = {
    images: PropTypes.array,
}

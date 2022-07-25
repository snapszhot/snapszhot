import PropTypes from 'prop-types'
import HintImage from './HintImage'

export default function HintImages({ images }) {
    return (
        <div>
            {images.map((image, index) => (
                <HintImage {...image.image} index={index} key={index} />
            ))}
        </div>
    )
}

HintImages.propTypes = {
    images: PropTypes.array,
}

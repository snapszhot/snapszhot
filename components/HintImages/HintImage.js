import PropTypes from 'prop-types'
import Image from 'next/image'
import { useGuessContext } from '@lib/use-guess-context'

export default function HintImage({ alt, dimensions, index, url }) {
    const { currentImage } = useGuessContext()
    const isDisplayed = index + 1 === currentImage

    if (isDisplayed) {
        return (
            <Image
                alt={alt}
                height={dimensions.height}
                src={url}
                width={dimensions.width}
            />
        )
    }

    return null
}

HintImage.propTypes = {
    alt: PropTypes.string,
    dimensions: PropTypes.object,
    index: PropTypes.number,
    url: PropTypes.string,
}

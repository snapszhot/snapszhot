import PropTypes from 'prop-types'
import { useGuessContext } from '@lib/use-guess-context'

export default function HintImage({ alt, index, url }) {
    const { guessNum, selectedStep } = useGuessContext()

    const isSelectedStep = index + 1 === selectedStep
    const hasBeenGuessed = guessNum + 1 >= selectedStep
    const isLast = guessNum === 6 && selectedStep === 6 && index + 1 === 6
    const isDisplayed =
        (isSelectedStep && hasBeenGuessed) || (!isSelectedStep && isLast)

    if (isDisplayed) {
        return <img alt={alt} src={url} />
    }

    return null
}

HintImage.propTypes = {
    alt: PropTypes.string,
    index: PropTypes.number,
    url: PropTypes.string,
}

import { useGuessContext } from '@lib/use-guess-context'

import StepListItem from '../StepListItem'

export default function StepList() {
    const { guessNum } = useGuessContext()
    const stepsToShow = []

    for (let i = 0; i <= guessNum && i < 6; i++) {
        stepsToShow.push(<StepListItem guess={i + 1} key={i} />)
    }

    return <ul>{stepsToShow}</ul>
}

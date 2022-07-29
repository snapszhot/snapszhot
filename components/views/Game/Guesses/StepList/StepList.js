import { useGuessContext } from '@lib/use-guess-context'
import StepListItem from './StepListItem'
import styles from './StepList.module.scss'

export default function StepList() {
    const { currentGuess, gameState } = useGuessContext()
    const stepsToShow = []

    for (let i = 0; i < 6; i++) {
        if (i <= currentGuess || gameState === 'won') {
            stepsToShow.push(<StepListItem imageNumber={i + 1} key={i} />)
        }
    }

    return <ul className={styles.container}>{stepsToShow}</ul>
}

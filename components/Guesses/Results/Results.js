import { useGuessContext } from '@lib/use-guess-context'
import Countdown from './Countdown'
import styles from './Results.module.scss'

export default function Results() {
    const { answer, gameState } = useGuessContext()

    return (
        <div className={styles.container}>
            {gameState === 'won' ? (
                <h2 className={styles.correctTitle}>Good work!</h2>
            ) : (
                <>
                    <h2 className={styles.shoulda}>The correct answer was</h2>
                    <div>
                        <span className={styles.correctTitle}>
                            {answer.movie} ({answer.originalTitle}) (
                            {answer.releaseYear})
                        </span>
                        <span className={styles.director}>
                            Directed by {answer.director}
                        </span>
                    </div>
                </>
            )}
            <Countdown />
        </div>
    )
}

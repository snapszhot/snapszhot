import { useGuessContext } from '@lib/use-guess-context'
import Countdown from './Countdown'
import styles from './Results.module.scss'

export default function Results() {
    const { answer, currentGuess, gameState } = useGuessContext()
    // const wrong = currentGuess - 1
    // const unused = 6 - wrong - 1

    const wrong = []
    const unused = []
    for (let i = 0; i < currentGuess - 1; i++) {
        wrong.push('🟥 ')
    }
    for (let i = 0; i < 6 - currentGuess; i++) {
        unused.push('⬛ ')
    }

    return (
        <div className={styles.container}>
            {gameState === 'won' ? (
                <>
                    <h2 className={styles.correctTitle}>Good work!</h2>
                    <div>
                        {wrong}🟩 {unused}
                    </div>
                </>
            ) : (
                <>
                    <h2 className={styles.shoulda}>The correct answer was</h2>
                    <div>
                        <span className={styles.correctTitle}>
                            {answer.movie}{' '}
                            {answer?.originalTitle && (
                                <>({answer.originalTitle})</>
                            )}{' '}
                            ({answer.releaseYear})
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

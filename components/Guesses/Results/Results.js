import { useGuessContext } from '@lib/use-guess-context'

import styles from './Results.module.scss'

export default function Results() {
    const { correct } = useGuessContext()

    return (
        <div className={styles.container}>
            {correct ? (
                <h2 className={styles.correctTitle}>Good work!</h2>
            ) : (
                <>
                    <h2 className={styles.shoulda}>The correct answer was:</h2>
                    <div className={styles.correctTitle}>Double Indemnity</div>
                </>
            )}
        </div>
    )
}

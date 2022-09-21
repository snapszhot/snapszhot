import { useGuessContext } from '@lib/use-guess-context'
import styles from './CorrectAnswer.module.scss'

export default function CorrectAnswer() {
    const { answer } = useGuessContext()
    const hasAlternateTitle =
        answer?.altLangTitle || answer?.engTransTitle || answer?.altEngTitle
    const hasFirstOr = answer?.altLangTitle && answer?.engTransTitle
    const hasSecondOr = answer?.engTransTitle && answer?.altEngTitle

    return (
        <div>
            <h2 className={styles.shoulda}>The correct answer was</h2>
            <div className={styles.titles}>
                <div className={styles.originalTitle}>
                    {answer.originalTitle}
                </div>
                {answer?.originalTitlePhonetic && (
                    <div className={styles.phoneticTitle}>
                        [{answer.originalTitlePhonetic}]
                    </div>
                )}
                {hasAlternateTitle && (
                    <div className={styles.alternates}>
                        <div className={styles.aka}>aka</div>
                        {answer?.altLangTitle && (
                            <>
                                <div className={styles.alternateTitle}>
                                    {answer.altLangTitle}
                                </div>
                                {answer?.altLangTitlePhonetic && (
                                    <div className={styles.phoneticTitle}>
                                        [{answer.altLangTitlePhonetic}]
                                    </div>
                                )}
                            </>
                        )}
                        {hasFirstOr && <div className={styles.aka}>or</div>}
                        {answer?.engTransTitle && (
                            <div className={styles.alternateTitle}>
                                {answer.engTransTitle}
                            </div>
                        )}
                        {hasSecondOr && <div className={styles.aka}>or</div>}
                        {answer?.altEngTitle && (
                            <div className={styles.alternateTitle}>
                                {answer.altEngTitle}
                            </div>
                        )}
                    </div>
                )}
            </div>
            <div className={styles.director}>
                Directed by {answer.director} ({answer.releaseYear})
            </div>
        </div>
    )
}

import { useState } from 'react'
import PropTypes from 'prop-types'
import { useGuessContext } from '@lib/use-guess-context'
import Countdown from './Countdown'
import styles from './Results.module.scss'

function TitleGroup({ children }) {
    return <span className={styles.titleGroup}>{children}</span>
}

TitleGroup.propTypes = {
    children: PropTypes.node,
}

function AlternateTitle({ title }) {
    return <span className={styles.altTitle}>[{title}]</span>
}

AlternateTitle.propTypes = {
    title: PropTypes.string,
}

export default function Results({ day }) {
    const [copied, setCopied] = useState(false)
    const [cantCopy, setCantCopy] = useState(false)
    const { answer, currentGuess, gameState } = useGuessContext()

    let emoji = ''
    for (let i = 0; i < currentGuess - 1; i++) {
        emoji += '🟥 '
    }
    emoji += '🟩 '
    for (let i = 0; i < 6 - currentGuess; i++) {
        emoji += '⬛ '
    }

    const clipboard = `SNAPSЖOT: DAY ${day}\n【Ж】${emoji}\n\nhttps://snapszhot.vercel.app`
    const copyToClipboard = () => {
        navigator.clipboard.writeText(clipboard).then(
            () => {
                setCopied(true)
                setTimeout(() => setCopied(null), 1500)
            },
            () => {
                setCantCopy(true)
            }
        )
    }

    return (
        <div className={styles.container}>
            {gameState === 'won' ? (
                <>
                    <h2 className={styles.correctTitle}>Good work!</h2>
                    <div>{emoji}</div>
                    <button
                        className={styles.share}
                        onClick={copyToClipboard}
                        type='button'
                    >
                        {copied ? <>Copied!</> : <>Share</>}
                    </button>
                    {cantCopy && (
                        <div>
                            <div className={styles.toShare}>{clipboard}</div>
                        </div>
                    )}
                </>
            ) : (
                <>
                    <h2 className={styles.shoulda}>The correct answer was</h2>
                    <div>
                        <span className={styles.correctTitle}>
                            {answer?.originalTitle ? (
                                <>
                                    <TitleGroup>
                                        <TitleGroup>
                                            {answer.originalTitle}
                                        </TitleGroup>
                                        {answer?.originalTitlePhonetic && (
                                            <AlternateTitle
                                                title={
                                                    answer.originalTitlePhonetic
                                                }
                                            />
                                        )}
                                    </TitleGroup>
                                    <TitleGroup>
                                        {answer?.altLangTitle && (
                                            <AlternateTitle
                                                title={answer.altLangTitle}
                                            />
                                        )}
                                        {answer?.altLangTitlePhonetic && (
                                            <AlternateTitle
                                                title={
                                                    answer.altLangTitlePhonetic
                                                }
                                            />
                                        )}
                                    </TitleGroup>
                                    <TitleGroup>
                                        {answer?.engTransTitle && (
                                            <AlternateTitle
                                                title={answer.engTransTitle}
                                            />
                                        )}
                                        {answer?.altEngTitle && (
                                            <AlternateTitle
                                                title={answer.altEngTitle}
                                            />
                                        )}
                                    </TitleGroup>
                                </>
                            ) : (
                                answer.movie
                            )}
                            <span className={styles.year}>
                                {' '}
                                {answer.releaseYear}
                            </span>
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

Results.propTypes = {
    day: PropTypes.number,
}

import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { DateTime } from 'luxon'
import { calcTimeDelta, formatTimeDelta } from 'react-countdown'

import styles from './Countdown.module.scss'

export default function Countdown() {
    const [timeLeft, setTimeLeft] = useState(null)
    const router = useRouter()
    const nextMovie = DateTime.now()
        .setZone('America/New_York')
        .plus({ days: 1 })
        .startOf('day')
        .toString()

    useEffect(() => {
        const timerInterval = setInterval(() => {
            const delta = calcTimeDelta(nextMovie)
            const time = formatTimeDelta(delta)
            setTimeLeft(`${time.hours}:${time.minutes}:${time.seconds}`)
        }, 1000)

        return () => {
            clearInterval(timerInterval)

            const delta = calcTimeDelta(nextMovie)
            if (delta.completed) {
                router.reload(window.location.pathname)
            }
        }
    }, [nextMovie, router])

    return (
        <div className={styles.container}>
            <h2 className={styles.title}>Time until next movie</h2>
            <div>
                {timeLeft ? (
                    <span className={styles.time}>{timeLeft}</span>
                ) : (
                    'Calculating...'
                )}
            </div>
        </div>
    )
}

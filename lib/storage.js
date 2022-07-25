function getGuesses({ oldGuesses, playerWon, todaysGuesses }) {
    if (!playerWon) {
        return oldGuesses
    }

    const newGuesses = [...oldGuesses]
    newGuesses[todaysGuesses - 1] += 1

    return newGuesses
}

function getMaxStreak({ currentStreak, maxStreak, playerWon }) {
    if (playerWon && currentStreak + 1 > maxStreak) {
        return currentStreak + 1
    }

    return maxStreak
}

function initializeStats() {
    const initStats = {
        lastGame: 0,
        currentStreak: 0,
        gamesPlayed: 0,
        gamesWon: 0,
        guesses: [0, 0, 0, 0, 0, 0],
        maxStreak: 0,
    }
    const jsonStats = JSON.stringify(initStats)
    localStorage.setItem('stats', jsonStats)

    return initStats
}

function getStats() {
    return JSON.parse(localStorage.getItem('stats')) || initializeStats()
}

export function updateStats({ playerWon, todaysGuesses }) {
    if (typeof window !== 'undefined') {
        const { currentStreak, gamesPlayed, gamesWon, guesses, maxStreak } =
            getStats()

        const newStats = JSON.stringify({
            currentStreak: playerWon ? currentStreak + 1 : 0,
            gamesPlayed: gamesPlayed + 1,
            gamesWon: playerWon ? gamesWon + 1 : gamesWon,
            guesses: getGuesses({
                oldGuesses: guesses,
                playerWon,
                todaysGuesses,
            }),
            maxStreak: getMaxStreak({ currentStreak, maxStreak, playerWon }),
        })

        localStorage.setItem('stats', newStats)

        return newStats
    }

    return null
}

export function initializeStorage(day) {
    if (typeof window !== 'undefined') {
        const lastDay = localStorage.getItem('day')

        if (lastDay < day) {
            const initStorage = {
                currentGuess: 0,
                currentImage: 1,
                day,
                gameState: 'in-progress',
                guesses: '',
            }

            for (const [key, value] of Object.entries(initStorage)) {
                localStorage.setItem(key, value)
            }

            initStorage.stats = getStats()

            return initStorage
        } else {
            const currentGuess = parseInt(localStorage.getItem('currentGuess'))
            const currentImage = parseInt(localStorage.getItem('currentImage'))
            const day = parseInt(localStorage.getItem('day'))
            const gameState = localStorage.getItem('gameState')
            const initGuesses = localStorage.getItem('guesses')
            const guesses =
                initGuesses === '' ? initGuesses : JSON.parse(initGuesses)
            const stats = getStats

            return {
                currentGuess,
                currentImage,
                day,
                gameState,
                guesses,
                stats,
            }
        }
    }

    return null
}

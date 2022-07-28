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

export function getGames() {
    if (typeof window !== 'undefined') {
        const rawGames = localStorage.getItem('games')
        return JSON.parse(rawGames)
    }

    return null
}

export function getPlayedGames() {
    if (typeof window !== 'undefined') {
        const games = getGames()
        const playedGames = []

        Object.keys(games).forEach(key => {
            if (games[key].gameState !== 'in-progress') {
                playedGames.push(parseInt(key))
            }
        })

        return playedGames
    }

    return null
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
        const games = getGames()
        const selectedGame = games?.[day]
        const stats = getStats()

        if (games && selectedGame) {
            const currentGuess = parseInt(games[day].currentGuess)
            const currentImage = parseInt(games[day].currentImage)
            const gameState = games[day].gameState
            const initGuesses = games[day].guesses
            const guesses =
                initGuesses === '' ? initGuesses : JSON.parse(initGuesses)

            return {
                currentGuess,
                currentImage,
                gameState,
                guesses,
                stats,
            }
        } else {
            const todaysStorage = {
                currentGuess: 0,
                currentImage: 1,
                gameState: 'in-progress',
                guesses: '',
            }
            const initStorage = {
                ...games,
                [day]: { ...todaysStorage },
            }

            localStorage.setItem('games', JSON.stringify(initStorage))
            todaysStorage.stats = stats

            return todaysStorage
        }
    }

    return null
}

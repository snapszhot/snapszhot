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

function initializeSettings() {
    const initSettings = {
        enabledHints: {
            director: true,
            subtitles: true,
            year: true,
        },
    }
    const jsonSettings = JSON.stringify(initSettings)
    localStorage.setItem('settings', jsonSettings)

    return initSettings
}

function getSettings() {
    return JSON.parse(localStorage.getItem('settings')) || initializeSettings()
}

export function getGames() {
    if (typeof window !== 'undefined') {
        const rawGames = localStorage.getItem('games')

        return rawGames ? JSON.parse(rawGames) : {}
    }

    return {}
}

export function getPlayedGames(includeResult = false) {
    if (typeof window !== 'undefined') {
        const games = getGames()
        const playedGames = includeResult ? {} : []

        Object.keys(games).forEach(key => {
            if (games[key].gameState !== 'in-progress') {
                if (includeResult) {
                    playedGames[key] = games[key].gameState
                } else {
                    playedGames.push(parseInt(key))
                }
            }
        })

        return playedGames
    }

    return []
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

export function updateSettings({ enabledHints }) {
    if (typeof window !== 'undefined') {
        const newSettings = JSON.stringify({ enabledHints })
        localStorage.setItem('settings', newSettings)
    }
}

export function initializeStorage(day, preview) {
    if (typeof window !== 'undefined') {
        const games = getGames()
        const selectedGame = games?.[day]
        const stats = getStats()
        const settings = getSettings()

        // If we already have stuff in local storage, use that
        if (games && selectedGame && !preview) {
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
                settings,
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
            todaysStorage.settings = settings

            return todaysStorage
        }
    }

    return null
}

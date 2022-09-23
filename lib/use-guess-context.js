import { createContext, useContext, useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import {
    getGames,
    initializeStorage,
    updateSettings,
    updateStats,
} from '@lib/storage'
import useHasMounted from '@lib/use-has-mounted'

const GuessContext = createContext()

export const useGuessContext = () => useContext(GuessContext)

export const GuessContextProvider = ({ answer, children, day, preview }) => {
    const hasMounted = useHasMounted()
    const [currentGuess, setCurrentGuessState] = useState(0)
    const [currentImage, setCurrentImageState] = useState(1)
    const [enabledHints, setEnabledHintsState] = useState({
        director: true,
        subtitles: true,
        year: true,
    })
    const [gameState, setGameStateState] = useState('in-progress')
    const [guesses, setGuessesState] = useState([])
    const [stats, setStatsState] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const initData = initializeStorage(day, preview, hasMounted)
        if (initData) {
            setCurrentGuessState(initData.currentGuess)
            setCurrentImageState(initData.currentImage)
            setEnabledHintsState(initData.settings.enabledHints)
            setGameStateState(initData.gameState)
            setGuessesState(initData.guesses || [])
            setStatsState(initData.stats)
            setLoading(false)
        }
    }, [day, preview, hasMounted])

    const updateGame = (key, value) => {
        if (!preview) {
            const games = getGames(hasMounted)
            const newGames = JSON.stringify({
                ...games,
                [day]: {
                    ...games[day],
                    [key]: value,
                },
            })

            localStorage.setItem('games', newGames)
        }
    }

    const setCurrentGuess = value => {
        updateGame('currentGuess', value)
        setCurrentGuessState(value)
    }
    const setCurrentImage = value => {
        updateGame('currentImage', value)
        setCurrentImageState(value)
    }
    const setGameState = value => {
        updateGame('gameState', value)
        setGameStateState(value)
    }
    const setGuesses = value => {
        updateGame('guesses', JSON.stringify(value))
        setGuessesState(value)
    }
    const setStats = ({ playerWon, todaysGuesses }) => {
        if (!preview) {
            const newStats = updateStats({
                hasMounted,
                playerWon,
                todaysGuesses,
            })
            if (newStats) {
                setStatsState(JSON.parse(newStats))
            }
        }
    }
    const setEnabledHints = value => {
        updateSettings({ enabledHints: value, hasMounted })
        setEnabledHintsState(value)
    }

    const values = {
        answer,
        currentGuess,
        currentImage,
        day,
        enabledHints,
        gameState,
        guesses,
        loading,
        setCurrentGuess,
        setCurrentImage,
        setEnabledHints,
        setGameState,
        setGuesses,
        setStats,
        stats,
    }

    return (
        <GuessContext.Provider value={values}>{children}</GuessContext.Provider>
    )
}

GuessContextProvider.propTypes = {
    answer: PropTypes.object,
    children: PropTypes.node,
    day: PropTypes.number,
    preview: PropTypes.bool,
}

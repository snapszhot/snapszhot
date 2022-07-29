import { createContext, useContext, useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { getGames, initializeStorage, updateStats } from '@lib/storage'

const GuessContext = createContext()

export const useGuessContext = () => useContext(GuessContext)

export const GuessContextProvider = ({ answer, children, day }) => {
    const [currentGuess, setCurrentGuessState] = useState(null)
    const [currentImage, setCurrentImageState] = useState(null)
    const [gameState, setGameStateState] = useState(null)
    const [guesses, setGuessesState] = useState(null)
    const [stats, setStatsState] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const initData = initializeStorage(day)
        if (initData) {
            setCurrentGuessState(initData.currentGuess)
            setCurrentImageState(initData.currentImage)
            setGameStateState(initData.gameState)
            setGuessesState(initData.guesses || [])
            setStatsState(initData.stats)
            setLoading(false)
        }
    }, [day])

    const updateGame = (key, value) => {
        const games = getGames()
        const newGames = JSON.stringify({
            ...games,
            [day]: {
                ...games[day],
                [key]: value,
            },
        })

        localStorage.setItem('games', newGames)
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
        const newStats = updateStats({ playerWon, todaysGuesses })
        if (newStats) {
            setStatsState(JSON.parse(newStats))
        }
    }

    const values = {
        answer,
        currentGuess,
        currentImage,
        day,
        gameState,
        guesses,
        loading,
        setCurrentGuess,
        setCurrentImage,
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
}

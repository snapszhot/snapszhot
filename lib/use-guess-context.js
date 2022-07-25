import { createContext, useContext, useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { initializeStorage, updateStats } from '@lib/storage'

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

    const setCurrentGuess = value => {
        localStorage.setItem('currentGuess', value)
        setCurrentGuessState(value)
    }
    const setCurrentImage = value => {
        localStorage.setItem('currentImage', value)
        setCurrentImageState(value)
    }
    const setGameState = value => {
        localStorage.setItem('gameState', value)
        setGameStateState(value)
    }
    const setGuesses = value => {
        localStorage.setItem('guesses', JSON.stringify(value))
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

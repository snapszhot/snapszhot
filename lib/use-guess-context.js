import { createContext, useContext, useState } from 'react'
import PropTypes from 'prop-types'

const GuessContext = createContext()

export const useGuessContext = () => useContext(GuessContext)

export const GuessContextProvider = ({ answer, children }) => {
    const [correct, setCorrect] = useState(null)
    const [guesses, setGuesses] = useState([])
    const [guessNum, setGuessNum] = useState(0)
    const [selectedStep, setSelectedStep] = useState(1)

    const values = {
        answer,
        correct,
        guessNum,
        guesses,
        selectedStep,
        setCorrect,
        setGuessNum,
        setGuesses,
        setSelectedStep,
    }

    return (
        <GuessContext.Provider value={values}>{children}</GuessContext.Provider>
    )
}

GuessContextProvider.propTypes = {
    answer: PropTypes.object,
    children: PropTypes.node,
}

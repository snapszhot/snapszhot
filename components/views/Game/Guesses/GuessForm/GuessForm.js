import { useState } from 'react'
import { Form, Formik } from 'formik'
import axios from 'axios'
import { captureException } from '@sentry/nextjs'
import { useGuessContext } from '@lib/use-guess-context'

import InputField from './InputField'
import styles from './GuessForm.module.scss'

export default function GuessForm() {
    const {
        answer,
        currentGuess,
        day,
        guesses,
        setCurrentGuess,
        setCurrentImage,
        setGameState,
        setGuesses,
        setStats,
    } = useGuessContext()
    const [error, setError] = useState(false)

    const initialValues = {
        altEngTitle: '',
        altLangTitle: '',
        altLangTitlePhonetic: '',
        director: '',
        engTransTitle: '',
        guess: '',
        originalTitlePhonetic: '',
        releaseYear: '',
    }

    const handleSubmit = (values, { resetForm }) => {
        const numberOfGuesses = currentGuess + 1
        const playerWon =
            values.guess === answer.originalTitle &&
            values.director === answer.director &&
            values.releaseYear === answer.releaseYear
        const playerLost = numberOfGuesses === 6 && !playerWon

        if (playerWon) {
            setGameState('won')
        } else if (playerLost) {
            setGameState('lost')
        }

        if (playerWon || playerLost) {
            setStats({
                playerWon,
                todaysGuesses: numberOfGuesses,
            })
            axios
                .post('/api/game-stats', {
                    puzzle_id: day,
                    won: playerWon,
                    frame_won: numberOfGuesses,
                })
                .catch(err => {
                    captureException(err)
                })
        }

        if (currentGuess < 5) {
            // currentGuess starts at zero and currentImage starts at 1, which is why we
            // incremented them differently. And we have to base currentImage's
            // increment on currentGuess in case the user has selected a different image
            // to preview between guesses. E.g., imagine the user has guessed three times.
            // currentGuess will be equal to three. SelectedStep will be equal to four. Four
            // images will be displayed. They click back to the second image. SelectedStep
            // is now two. They make another guess. currentGuess flips to four. SelectedStep
            // has to flip to five. But if we base its increment on itself, it only flips
            // to four.
            setCurrentImage(currentGuess + 2)
        }

        setGuesses([
            ...guesses,
            {
                ...values,
                isCorrect: playerWon,
                originalTitle: values.guess,
            },
        ])
        setCurrentGuess(numberOfGuesses)
        resetForm()
    }

    return (
        <Formik initialValues={initialValues} onSubmit={handleSubmit}>
            {() => (
                <Form>
                    <div className={styles.container}>
                        <div className={styles.inputField}>
                            <InputField name='guess' setError={setError} />
                        </div>
                        <button className={styles.submit} type='submit'>
                            Submit
                        </button>
                    </div>
                    {error && (
                        <div className={styles.error}>
                            We’re having some trouble searching. Please try
                            again later.
                        </div>
                    )}
                </Form>
            )}
        </Formik>
    )
}

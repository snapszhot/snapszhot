import PropTypes from 'prop-types'
import { Form, Formik } from 'formik'
import { useGuessContext } from '@lib/use-guess-context'

import InputField from './InputField'
import styles from './GuessForm.module.scss'

export default function GuessForm({ options }) {
    const {
        answer,
        currentGuess,
        guesses,
        setCurrentGuess,
        setCurrentImage,
        setGameState,
        setGuesses,
        setStats,
    } = useGuessContext()

    const initialValues = {
        director: '',
        guess: '',
        movie: '',
        releaseYear: '',
    }

    const handleSubmit = (values, { resetForm }) => {
        const numberOfGuesses = currentGuess + 1
        const playerWon =
            values.guess === answer.movie &&
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
                movie: values.guess,
                originalTitle: values.originalTitle,
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
                            <InputField name='guess' options={options} />
                        </div>
                        <button className={styles.submit} type='submit'>
                            Submit
                        </button>
                    </div>
                </Form>
            )}
        </Formik>
    )
}

GuessForm.propTypes = {
    options: PropTypes.array,
}
import { Form, Formik } from 'formik'
import { useGuessContext } from '@lib/use-guess-context'

import InputField from './InputField'
import styles from './GuessForm.module.scss'

export default function GuessForm() {
    const {
        answer,
        guesses,
        guessNum,
        selectedStep,
        setCorrect,
        setGuesses,
        setGuessNum,
        setSelectedStep,
    } = useGuessContext()

    const initialValues = {
        guess: '',
    }

    const handleSubmit = (values, { resetForm }) => {
        setGuesses([...guesses, values.guess])

        if (values.guess === answer) {
            setCorrect(true)
            setGuessNum(6)
            setSelectedStep(guessNum + 2)
        } else {
            // guessNum starts at zero and selectedStep starts at 1, which is why we
            // incremented them differently. And we have to base selectedStep's
            // increment on guessNum in case the user has selected a different image
            // to preview between guesses. E.g., imagine the user has guessed three times.
            // guessNum will be equal to three. SelectedStep will be equal to four. Four
            // images will be displayed. They click back to the second image. SelectedStep
            // is now two. They make another guess. guessNum flips to four. SelectedStep
            // has to flip to five. But if we base its increment on itself, it only flips
            // to four.
            setCorrect(false)
            setGuessNum(guessNum + 1)
            if (selectedStep < 6) {
                setSelectedStep(guessNum + 2)
            }
        }

        resetForm()
    }

    const options = [
        {
            movie: '1984',
            director: 'Michael Radford',
            releaseYear: '1984',
        },
        { movie: 'Le Bonheur', director: 'Agnès Varda', releaseYear: '1965' },
        {
            movie: 'Double Indemnity',
            director: 'Billy Wilder',
            releaseYear: '1944',
        },
        {
            movie: 'Le doulos',
            director: 'Jean-Pierre Melville',
            releaseYear: '1962',
        },
        { movie: 'Rango', director: 'Gore Verbinski', releaseYear: '2011' },
        { movie: 'Rashomon', director: 'Akira Kurosawa', releaseYear: '1950' },
        {
            movie: 'Le Samouraï',
            director: 'Jean-Pierre Melville',
            releaseYear: '1967',
        },
        {
            movie: 'Seven Samurai',
            director: 'Akira Kurosawa',
            releaseYear: '1954',
        },
        {
            movie: 'The Social Network',
            director: 'David Fincher',
            releaseYear: '2010',
        },
        {
            movie: 'The Sound of Music',
            director: 'Robert Wise',
            releaseYear: '1965',
        },
        { movie: 'Summertime', director: 'David Lean', releaseYear: '1955' },
    ]

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

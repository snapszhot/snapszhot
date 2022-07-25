import { Form, Formik } from 'formik'
import { useGuessContext } from '@lib/use-guess-context'

import InputField from './InputField'
import styles from './GuessForm.module.scss'

const options = [
    {
        movie: '1984',
        director: 'Michael Radford',
        releaseYear: '1984',
    },
    {
        movie: 'Army of Shadows',
        director: 'Jean-Pierre Melville',
        originalTitle: 'L’Armée des ombres',
        releaseYear: '1969',
    },
    {
        movie: 'An Autumn Afternoon',
        director: 'Yasujirō Ozu',
        originalTitle: '秋刀魚の味',
        releaseYear: '1962',
    },
    { movie: 'Le Bonheur', director: 'Agnès Varda', releaseYear: '1965' },
    {
        movie: 'Double Indemnity',
        director: 'Billy Wilder',
        releaseYear: '1944',
    },
    {
        movie: 'Jaws',
        director: 'Steven Spielberg',
        releaseYear: '1975',
    },
    {
        movie: 'Le doulos',
        director: 'Jean-Pierre Melville',
        releaseYear: '1962',
    },
    { movie: 'Psycho', director: 'Alfred Hitchcock', releaseYear: '1960' },
    { movie: 'Psycho', director: 'Gus Van Sant', releaseYear: '1998' },
    { movie: 'Rango', director: 'Gore Verbinski', releaseYear: '2011' },
    {
        movie: 'Rashomon',
        director: 'Akira Kurosawa',
        originalTitle: '羅生門',
        releaseYear: '1950',
    },
    {
        movie: 'Le Samouraï',
        director: 'Jean-Pierre Melville',
        releaseYear: '1967',
    },
    {
        movie: 'Seven Samurai',
        director: 'Akira Kurosawa',
        originalTitle: '七人の侍',
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

export default function GuessForm() {
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

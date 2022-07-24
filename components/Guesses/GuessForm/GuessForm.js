import { Form, Formik } from 'formik'
import { useGuessContext } from '@lib/use-guess-context'

import Select from './Select'
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
        { value: 'The Sound of Music', label: 'The Sound of Music' },
        { value: 'Le Bonheur', label: 'Le Bonheur' },
        { value: 'Seven Samurai', label: 'Seven Samurai' },
        { value: 'Le Samouraï', label: 'Le Samouraï' },
        { value: 'Double Indemnity', label: 'Double Indemnity' },
        { value: '1984', label: '1984' },
        { value: 'Le doulos', label: 'Le doulos' },
    ]

    return (
        <Formik initialValues={initialValues} onSubmit={handleSubmit}>
            {() => (
                <Form>
                    <div className={styles.container}>
                        <div className={styles.select}>
                            <Select options={options} />
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

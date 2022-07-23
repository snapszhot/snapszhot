import { useGuessContext } from '@lib/use-guess-context'
import GuessListItem from './GuessListItem'

export default function GuessList() {
    const { guesses } = useGuessContext()

    if (guesses.length > 0) {
        return (
            <ul>
                {guesses.map((guess, index) => (
                    <GuessListItem guess={guess} key={index} />
                ))}
            </ul>
        )
    }

    return null
}

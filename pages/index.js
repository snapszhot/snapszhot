import { GuessContextProvider } from '@lib/use-guess-context'
import { Container, Guesses, HintImages } from '@components'

export default function Home() {
    return (
        <GuessContextProvider answer='Double Indemnity'>
            <Container day='82' subtitle='Bars of Canada'>
                <HintImages />
                <Guesses />
            </Container>
        </GuessContextProvider>
    )
}

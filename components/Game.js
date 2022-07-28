import PropTypes from 'prop-types'
import { GuessContextProvider } from '@lib/use-guess-context'
import Container from './Container'
import Guesses from './Guesses'
import HintImages from './HintImages'

export default function Game({
    answer,
    day,
    images,
    mostRecentDay,
    prefills,
    subtitle,
}) {
    return (
        <GuessContextProvider answer={answer} day={day}>
            <Container
                day={day}
                mostRecentDay={mostRecentDay}
                subtitle={subtitle}
            >
                <HintImages images={images} />
                <Guesses day={day} prefills={prefills} />
            </Container>
        </GuessContextProvider>
    )
}

Game.propTypes = {
    answer: PropTypes.object,
    day: PropTypes.number,
    images: PropTypes.array,
    mostRecentDay: PropTypes.number,
    prefills: PropTypes.array,
    subtitle: PropTypes.string,
}

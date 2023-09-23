import PropTypes from 'prop-types'
import { GuessContextProvider } from '@lib/use-guess-context'

import { Container } from '@components/common'
import Guesses from './Guesses'
import HintImages from './HintImages'
import Title from './Title'

export default function Game({
    answer,
    day,
    images,
    preview,
    subtitle,
    ...props
}) {
    return (
        <GuessContextProvider answer={answer} day={day} preview={preview}>
            <Container day={day} preview={preview} {...props}>
                <Title day={day} subtitle={subtitle} />
                <HintImages images={images} />
                <Guesses day={day} />
            </Container>
        </GuessContextProvider>
    )
}

Game.propTypes = {
    answer: PropTypes.object,
    day: PropTypes.number,
    images: PropTypes.array,
    preview: PropTypes.bool,
    subtitle: PropTypes.string,
}

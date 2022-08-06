import PropTypes from 'prop-types'
import { GuessContextProvider } from '@lib/use-guess-context'

import { CenteredWrapper, Container } from '@components/common'
import Guesses from './Guesses'
import HintImages from './HintImages'
import styles from './Game.module.scss'

export default function Game({
    answer,
    day,
    images,
    prefills,
    preview,
    subtitle,
    ...props
}) {
    return (
        <GuessContextProvider answer={answer} day={day} preview={preview}>
            <Container day={day} preview={preview} {...props}>
                <CenteredWrapper>
                    <h1>
                        <span className={styles.day}>Day {day}</span>
                        <span className={styles.hintTitle}>“{subtitle}”</span>
                    </h1>
                </CenteredWrapper>
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
    prefills: PropTypes.array,
    preview: PropTypes.bool,
    subtitle: PropTypes.string,
}

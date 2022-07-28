import PropTypes from 'prop-types'
import axios from 'axios'
import useSWR from 'swr'

import { GuessContextProvider } from '@lib/use-guess-context'
import Container from './Container'
import Guesses from './Guesses'
import HintImages from './HintImages'

const fetcher = async () => {
    try {
        const { data } = await axios.get('/api/prismic')

        return data
    } catch (error) {
        return error
    }
}

export default function Game({ prefills }) {
    const { data } = useSWR('/', fetcher, {
        refreshInterval: 30000, // Check for new data every 30 seconds
    })
    const { answer, day, images, subtitle } = data

    return (
        <GuessContextProvider answer={answer} day={day}>
            <Container day={day} subtitle={subtitle}>
                <HintImages images={images} />
                <Guesses day={day} prefills={prefills} />
            </Container>
        </GuessContextProvider>
    )
}

Game.propTypes = {
    prefills: PropTypes.array,
}

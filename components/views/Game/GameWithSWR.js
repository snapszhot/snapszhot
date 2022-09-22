import axios from 'axios'
import useSWR from 'swr'
import { captureException } from '@sentry/nextjs'
import Game from './Game'

const fetcher = async () => {
    try {
        const { data } = await axios.get('/api/prismic')

        return data
    } catch (error) {
        captureException(error)

        return error
    }
}

export default function GameWithSWR(props) {
    const { data } = useSWR('/', fetcher, {
        refreshInterval: 30000, // Check for new data every 30 seconds
    })

    return <Game {...data} {...props} />
}

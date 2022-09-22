import { withSentry } from '@sentry/nextjs'
import { getSingleMovie } from '@lib/prismic'

async function handler(req, res) {
    const movie = await getSingleMovie()

    res.status(200).json(movie)
}

export default withSentry(handler)

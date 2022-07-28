import queryMovies from '@lib/prismic'

export default async function handler(req, res) {
    try {
        const movie = await queryMovies()

        res.status(200).json(movie)
    } catch {
        res.status(500).json({
            error: 'Error fetching newest post. Please try refreshing the page.',
        })
    }
}

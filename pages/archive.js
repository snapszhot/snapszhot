import { captureException } from '@sentry/nextjs'

import groupByTens from '@lib/group-by-tens'
import { getAllMovies, getSingleMovie } from '@lib/prismic'

import { Archive } from '@components/views'

export default function ArchivePage(props) {
    return <Archive {...props} />
}

export async function getStaticProps({ preview = false, previewData }) {
    try {
        const [rawPosts, mostRecentDay] = await Promise.all([
            getAllMovies(previewData),
            getSingleMovie(previewData),
        ])
        const posts = groupByTens(rawPosts)

        return {
            props: {
                canonical: 'https://snapgame.cc/archive',
                posts,
                mostRecentDay: mostRecentDay.day,
                pageTitle: 'Archive',
                preview,
            },
            revalidate: 60,
        }
    } catch (error) {
        captureException(error)
        throw error
    }
}

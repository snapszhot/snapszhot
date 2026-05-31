import { captureException } from '@sentry/nextjs'
import { getAllMovies, getMostRecentMovie, getSingleMovie } from '@lib/prismic'

import { Game } from '@components/views'

const RECENT_DAYS_TO_PRERENDER = 60

export default function DayPage(props) {
    return <Game {...props} />
}

export async function getStaticProps({ params, preview = false, previewData }) {
    try {
        const [post, mostRecentDay] = await Promise.all([
            getSingleMovie(previewData, parseInt(params.day)),
            getMostRecentMovie(previewData)
        ])

        if (!post) {
            return { notFound: true, revalidate: 60 }
        }

        const { day, images } = post

        return {
            props: {
                ...post,
                canonical: `https://snapgame.cc/day/${day}`,
                mostRecentDay: mostRecentDay.day,
                ogImage: images[0].image.url,
                ogTitle: `DAY ${day} - SNAPSЖOT`,
                pageTitle: `DAY ${day}`,
                preview
            },
            revalidate: 60
        }
    } catch (error) {
        captureException(error)
        throw error
    }
}

export async function getStaticPaths() {
    const posts = await getAllMovies()

    const recent = posts.slice(-RECENT_DAYS_TO_PRERENDER)
    const paths = recent.map(post => {
        return {
            params: {
                day: post.data.day.toString()
            }
        }
    })

    return {
        paths,
        fallback: 'blocking'
    }
}

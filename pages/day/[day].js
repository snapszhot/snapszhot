import { captureException } from '@sentry/nextjs'
import { getAllMovies, getSingleMovie } from '@lib/prismic'

import { Game } from '@components/views'

export default function DayPage(props) {
    return <Game {...props} />
}

export async function getStaticProps({ params, preview = false, previewData }) {
    try {
        const [post, mostRecentDay] = await Promise.all([
            getSingleMovie(previewData, parseInt(params.day)),
            getSingleMovie(),
        ])

        const { day, images, subtitle } = post

        return {
            props: {
                ...post,
                mostRecentDay: mostRecentDay.day,
                ogImage: images[0].image.url,
                ogTitle: `DAY ${day} - SNAPSЖOT`,
                pageDescription: subtitle,
                pageTitle: `DAY ${day}: ${subtitle}`,
                preview,
            },
            revalidate: 120,
        }
    } catch (error) {
        captureException(error)
        throw error
    }
}

export async function getStaticPaths() {
    const posts = await getAllMovies()
    const paths = posts.map(post => {
        return {
            params: {
                day: post.data.day.toString(),
            },
        }
    })

    return {
        paths,
        fallback: false,
    }
}

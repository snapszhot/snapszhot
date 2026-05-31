import { captureException } from '@sentry/nextjs'
import { getMostRecentMovie } from '@lib/prismic'

import { Game } from '@components/views'

export default function HomePage({ ...props }) {
    return <Game {...props} />
}

export async function getStaticProps({ preview = false }) {
    try {
        const post = await getMostRecentMovie()

        return {
            props: {
                ...post,
                canonical: 'https://snapgame.cc',
                mostRecentDay: post.day,
                ogImage: post.images[0].image.url,
                preview
            }
        }
    } catch (error) {
        captureException(error)
        throw error
    }
}

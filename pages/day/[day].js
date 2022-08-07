import path from 'path'
import getPrefills from '@lib/get-prefills'
import { getAllMovies, getSingleMovie } from '@lib/prismic'

import { Game } from '@components/views'

export default function DayPage(props) {
    return <Game {...props} />
}

export async function getStaticProps({ params, preview = false, previewData }) {
    // We have to load this file within getStaticProps itself because of some weird
    // Next.js requirement. See https://github.com/vercel/next.js/discussions/32236#discussioncomment-3202094
    const dataPath = path.join(
        process.cwd(),
        'public/prefills/2022-08-07-another-update.csv'
    )
    const [post, mostRecentDay, prefills] = await Promise.all([
        getSingleMovie(previewData, parseInt(params.day)),
        getSingleMovie(),
        getPrefills(dataPath),
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
            prefills,
            preview,
        },
        revalidate: 120,
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

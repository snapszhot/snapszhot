import path from 'path'
import getPrefills from '@lib/get-prefills'
import queryMovies from '@lib/prismic'

import { Game } from '@components/views'

export default function DayPage(props) {
    return <Game {...props} />
}

export async function getStaticProps({ params }) {
    // We have to load this file within getStaticProps itself because of some weird
    // Next.js requirement. See https://github.com/vercel/next.js/discussions/32236#discussioncomment-3202094
    const dataPath = path.join(process.cwd(), 'public/swos-prefills-grem.csv')
    const [post, mostRecentDay, prefills] = await Promise.all([
        queryMovies(1, parseInt(params.day)),
        queryMovies(),
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
        },
        revalidate: 120,
    }
}

export async function getStaticPaths() {
    const posts = await queryMovies(100)
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

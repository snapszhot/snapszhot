import getPrefills from '@lib/get-prefills'
import queryMovies from '@lib/prismic'

import { Game } from '@components/views'

export default function DayPage(props) {
    return <Game {...props} />
}

export async function getStaticProps({ params }) {
    const [post, mostRecentDay, prefills] = await Promise.all([
        queryMovies(1, parseInt(params.day)),
        queryMovies(),
        getPrefills(),
    ])

    return {
        props: {
            ...post,
            mostRecentDay: mostRecentDay.day,
            pageTitle: `DAY ${post.day}`,
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

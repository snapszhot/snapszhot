import queryMovies, { getAllMovies } from '@lib/prismic'
import { Archive } from '@components/views'

export default function ArchivePage(props) {
    return <Archive {...props} />
}

export async function getStaticProps() {
    const [posts, mostRecentDay] = await Promise.all([
        getAllMovies(),
        queryMovies(),
    ])

    return {
        props: {
            posts,
            mostRecentDay: mostRecentDay.day,
            pageTitle: 'Archive',
        },
        revalidate: 120,
    }
}

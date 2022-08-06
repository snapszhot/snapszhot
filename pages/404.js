import queryMovies from '@lib/prismic'
import { FourOhFour } from '@components/views'

export default function FourOhFourPage(props) {
    return <FourOhFour {...props} />
}

export async function getStaticProps() {
    const [mostRecentDay] = await Promise.all([queryMovies()])

    return {
        props: {
            mostRecentDay: mostRecentDay.day,
            pageTitle: '404! Page Not Found!',
        },
        revalidate: 120,
    }
}

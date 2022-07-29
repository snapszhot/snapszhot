import PropTypes from 'prop-types'
import { SWRConfig } from 'swr'

import getPrefills from '@lib/get-prefills'
import queryMovies from '@lib/prismic'

import { GameWithSWR } from '@components/views'

export default function HomePage({ fallback, mostRecentDay, prefills }) {
    return (
        <SWRConfig value={{ fallback }}>
            <GameWithSWR mostRecentDay={mostRecentDay} prefills={prefills} />
        </SWRConfig>
    )
}

HomePage.propTypes = {
    fallback: PropTypes.object,
    mostRecentDay: PropTypes.number,
    prefills: PropTypes.array,
}

export async function getStaticProps() {
    const [fallback, prefills] = await Promise.all([
        queryMovies(),
        getPrefills(),
    ])

    return {
        props: {
            fallback: {
                '/': fallback,
            },
            mostRecentDay: fallback.day,
            prefills,
        },
        revalidate: 60,
    }
}

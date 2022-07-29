import PropTypes from 'prop-types'
import { SWRConfig } from 'swr'

import getPrefills from '@lib/get-prefills'
import queryMovies from '@lib/prismic'

import { GameWithSWR } from '@components/views'

export default function HomePage({ fallback, ...props }) {
    return (
        <SWRConfig value={{ fallback }}>
            <GameWithSWR {...props} />
        </SWRConfig>
    )
}

HomePage.propTypes = {
    fallback: PropTypes.object,
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
            ogImage: fallback.images[0].image.url,
            prefills,
        },
        revalidate: 60,
    }
}

import PropTypes from 'prop-types'
import { SWRConfig } from 'swr'
import { getPrismicPrefills, getSingleMovie } from '@lib/prismic'

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

export async function getStaticProps({ preview = false }) {
    const [fallback, prefills] = await Promise.all([
        getSingleMovie(),
        getPrismicPrefills(),
    ])

    return {
        props: {
            fallback: {
                '/': fallback,
            },
            mostRecentDay: fallback.day,
            ogImage: fallback.images[0].image.url,
            prefills,
            preview,
        },
        revalidate: 60,
    }
}

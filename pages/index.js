import PropTypes from 'prop-types'
import { SWRConfig } from 'swr'

import { getSingleMovie } from '@lib/prismic'

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
    const fallback = await getSingleMovie()

    return {
        props: {
            fallback: {
                '/': fallback,
            },
            mostRecentDay: fallback.day,
            ogImage: fallback.images[0].image.url,
            preview,
        },
        revalidate: 60,
    }
}

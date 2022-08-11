import path from 'path'
import PropTypes from 'prop-types'
import { SWRConfig } from 'swr'

import getPrefills from '@lib/get-prefills'
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
    // We have to load this file within getStaticProps itself because of some weird
    // Next.js requirement. See https://github.com/vercel/next.js/discussions/32236#discussioncomment-3202094
    const dataPath = path.join(
        process.cwd(),
        'public/prefills/2022-08-10-update-2.csv'
    )
    const [fallback, prefills] = await Promise.all([
        getSingleMovie(),
        getPrefills(dataPath),
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

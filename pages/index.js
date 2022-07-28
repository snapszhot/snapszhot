import PropTypes from 'prop-types'
import Head from 'next/head'
import { SWRConfig } from 'swr'

import getPrefills from '@lib/get-prefills'
import queryMovies from '@lib/prismic'

import { GameWithSWR } from '@components'

export default function HomePage({ fallback, mostRecentDay, prefills }) {
    return (
        <SWRConfig value={{ fallback }}>
            <Head>
                <title>
                    SNAPSЖOT: swo17’s attempt at a more eclectic version of
                    Framed
                </title>
            </Head>
            <GameWithSWR mostRecentDay={mostRecentDay} prefills={prefills} />
        </SWRConfig>
    )
}

HomePage.propTypes = {
    fallback: PropTypes.object,
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

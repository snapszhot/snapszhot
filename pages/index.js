import PropTypes from 'prop-types'
import Head from 'next/head'
import { SWRConfig } from 'swr'

import getPrefills from '@lib/get-prefills'
import queryMovies from '@lib/prismic'

import { GameWithSWR } from '@components'

export default function HomePage({ fallback, prefills }) {
    return (
        <SWRConfig value={{ fallback }}>
            <Head>
                <title>
                    SNAPSЖOT: swo17’s attempt at a more eclectic version of
                    Framed
                </title>
            </Head>
            <GameWithSWR prefills={prefills} />
        </SWRConfig>
    )
}

HomePage.propTypes = {
    fallback: PropTypes.object,
    prefills: PropTypes.array,
}

export async function getStaticProps() {
    const fallback = await queryMovies()
    const prefills = await getPrefills()

    return {
        props: {
            fallback: {
                '/': fallback,
            },
            prefills,
        },
        revalidate: 60,
    }
}

import PropTypes from 'prop-types'
import Head from 'next/head'
import { SWRConfig } from 'swr'

import formatPrismicPost from '@lib/format-prismic-post'
import getPrefills from '@lib/get-prefills'
import { queryLatestMovie } from '@lib/prismic'

import { Game } from '@components'

export default function Home({ fallback, prefills }) {
    return (
        <SWRConfig value={{ fallback }}>
            <Head>
                <title>
                    SNAPSЖOT: swo17’s attempt at a more eclectic version of
                    Framed
                </title>
            </Head>
            <Game prefills={prefills} />
        </SWRConfig>
    )
}

Home.propTypes = {
    fallback: PropTypes.object,
    prefills: PropTypes.array,
}

export async function getStaticProps() {
    const post = await queryLatestMovie()
    const prefills = await getPrefills()
    const fallback = formatPrismicPost(post)

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

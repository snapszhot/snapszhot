import PropTypes from 'prop-types'

import { PrismicProvider } from '@prismicio/react'
import Client from '@lib/prismic'

import '../styles/globals.scss'

export default function MyApp({ Component, pageProps }) {
    return (
        <PrismicProvider client={Client}>
            <Component {...pageProps} />
        </PrismicProvider>
    )
}

MyApp.propTypes = {
    Component: PropTypes.func,
    pageProps: PropTypes.object,
}

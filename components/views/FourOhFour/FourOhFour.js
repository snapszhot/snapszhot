import PropTypes from 'prop-types'
import Link from 'next/link'
import getRandomLink from '@lib/get-random-link'
import { GuessContextProvider } from '@lib/use-guess-context'

import { CenteredWrapper, Container } from '@components/common'

export default function FourOhFour({ mostRecentDay, ...props }) {
    const randomLink = getRandomLink({ mostRecentDay })

    return (
        <GuessContextProvider>
            <Container mostRecentDay={mostRecentDay} {...props}>
                <CenteredWrapper padding='0 var(--spacing-single) var(--spacing-triple)'>
                    This page cannot be found. Why not{' '}
                    <Link href={randomLink}>
                        <a>play a random day’s puzzle</a>
                    </Link>
                    ?
                </CenteredWrapper>
            </Container>
        </GuessContextProvider>
    )
}

FourOhFour.propTypes = {
    mostRecentDay: PropTypes.number,
}

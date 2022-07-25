import PropTypes from 'prop-types'
import { queryLatestMovie } from '@lib/prismic'
import { GuessContextProvider } from '@lib/use-guess-context'

import { Container, Guesses, HintImages } from '@components'

export default function Home({ answer, day, images, subtitle }) {
    return (
        <GuessContextProvider answer={answer} day={day}>
            <Container day={day} subtitle={subtitle}>
                <HintImages images={images} />
                <Guesses />
            </Container>
        </GuessContextProvider>
    )
}

Home.propTypes = {
    answer: PropTypes.object,
    day: PropTypes.number,
    images: PropTypes.array,
    subtitle: PropTypes.string,
}

export async function getStaticProps() {
    const post = await queryLatestMovie()

    return {
        props: {
            answer: {
                movie: post.title,
                director: post.director,
                releaseYear: post.release_year,
            },
            day: post.day,
            images: post.images,
            subtitle: post.subtitle,
        },
    }
}

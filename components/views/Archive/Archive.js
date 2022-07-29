import PropTypes from 'prop-types'
import { GuessContextProvider } from '@lib/use-guess-context'

import { CenteredWrapper, Container } from '@components/common'
import ArchivePost from './ArchivePost'

export default function Archive({ posts, ...props }) {
    return (
        <GuessContextProvider>
            <Container {...props}>
                <CenteredWrapper padding='0 var(--spacing-single) var(--spacing-triple)'>
                    <ul>
                        {posts.map((post, index) => (
                            <ArchivePost {...post.data} key={index} />
                        ))}
                    </ul>
                </CenteredWrapper>
            </Container>
        </GuessContextProvider>
    )
}

Archive.propTypes = {
    posts: PropTypes.array,
}

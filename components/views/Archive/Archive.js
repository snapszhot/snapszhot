import PropTypes from 'prop-types'
import { getPlayedGames } from '@lib/storage'
import { GuessContextProvider } from '@lib/use-guess-context'
import useHasMounted from '@lib/use-has-mounted'

import { CenteredWrapper, Container } from '@components/common'
import ArchivePost from './ArchivePost'

export default function Archive({ posts, ...props }) {
    const hasMounted = useHasMounted()
    const playedGames = getPlayedGames(true, hasMounted)

    return (
        <GuessContextProvider>
            <Container {...props}>
                <CenteredWrapper padding='0 var(--spacing-single) var(--spacing-triple)'>
                    <ul>
                        {posts.map(postGroup =>
                            postGroup.map((post, index) => (
                                <ArchivePost
                                    {...post}
                                    isLast={index + 1 === postGroup.length}
                                    result={playedGames?.[post.day]}
                                    key={index}
                                />
                            ))
                        )}
                    </ul>
                </CenteredWrapper>
            </Container>
        </GuessContextProvider>
    )
}

Archive.propTypes = {
    posts: PropTypes.array,
}

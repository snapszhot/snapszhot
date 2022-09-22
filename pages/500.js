import Link from 'next/link'

import { CenteredWrapper, Container } from '@components/common'

export default function Custom500() {
    return (
        <Container pageTitle='500! Error Loading Page!'>
            <CenteredWrapper padding='0 var(--spacing-single) var(--spacing-triple)'>
                There was an error loading this page. Why not{' '}
                <Link href='/archive'>
                    <a>view the archive instead</a>
                </Link>
                ?
            </CenteredWrapper>
        </Container>
    )
}

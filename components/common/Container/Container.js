import PropTypes from 'prop-types'
import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useGuessContext } from '@lib/use-guess-context'

import CenteredWrapper from '../CenteredWrapper'
import Nav from './Nav'
import styles from './Container.module.scss'

export default function Container({ children, day, mostRecentDay, pageTitle }) {
    const { pathname } = useRouter()
    const { loading } = useGuessContext()

    if (loading) {
        return null
    }

    const title = pageTitle
        ? `${pageTitle} - SNAPSЖOT`
        : 'SNAPSЖOT: swo17’s attempt at a more eclectic version of Framed'
    const showLink = pathname !== '/'
    const inlineTitle = 'SNAPSЖOT'

    return (
        <div className={styles.container}>
            <Head>
                <title>{title}</title>
            </Head>
            <header>
                <CenteredWrapper padding='var(--spacing-single)'>
                    <div className={styles.pageTitleWrapper}>
                        <div className={styles.pageTitle}>
                            {showLink ? (
                                <Link href='/'>
                                    <a className={styles.titleLink}>
                                        {inlineTitle}
                                    </a>
                                </Link>
                            ) : (
                                <>{inlineTitle}</>
                            )}
                        </div>
                        <Nav day={day} mostRecentDay={mostRecentDay} />
                    </div>
                </CenteredWrapper>
            </header>
            <main>{children}</main>
        </div>
    )
}

Container.propTypes = {
    children: PropTypes.node,
    day: PropTypes.number,
    mostRecentDay: PropTypes.number,
    pageTitle: PropTypes.string,
}

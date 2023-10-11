import PropTypes from 'prop-types'
import Link from 'next/link'
import { NextSeo } from 'next-seo'

import CenteredWrapper from '../CenteredWrapper'
import Nav from './Nav'
import styles from './Container.module.scss'

export default function Container({
    canonical,
    children,
    day,
    mostRecentDay,
    ogImage,
    ogTitle,
    pageTitle,
    preview,
}) {
    const siteName = 'SNAPSЖOT'
    const shortSiteName = 'Ж'
    const title = pageTitle ? `${pageTitle} - SNAPSЖOT` : `SNAPSЖOT`
    const images = ogImage ? [{ url: ogImage }] : null

    return (
        <div className={styles.container}>
            {preview && (
                <div className={styles.previewBanner}>
                    You are in preview mode.{' '}
                    <Link href='/api/exit-preview'>
                        <a>Exit preview mode.</a>
                    </Link>
                </div>
            )}
            <NextSeo
                title={title}
                canonical={canonical}
                openGraph={{
                    url: canonical,
                    title: ogTitle || pageTitle || siteName,
                    images,
                    site_name: siteName,
                }}
                twitter={{
                    cardType: 'summary_large_image',
                }}
            />
            <header>
                <CenteredWrapper padding='var(--spacing-single)'>
                    <div className={styles.pageTitleWrapper}>
                        <div className={styles.pageTitle}>
                            <Link href='/'>
                                <a className={styles.titleLink}>
                                    <span className={styles.titleFull}>
                                        {siteName}
                                    </span>
                                    <span className={styles.titleShort}>
                                        {shortSiteName}
                                    </span>
                                </a>
                            </Link>
                        </div>
                        {mostRecentDay && (
                            <Nav day={day} mostRecentDay={mostRecentDay} />
                        )}
                    </div>
                </CenteredWrapper>
            </header>
            <main>{children}</main>
        </div>
    )
}

Container.propTypes = {
    canonical: PropTypes.string,
    children: PropTypes.node,
    day: PropTypes.number,
    mostRecentDay: PropTypes.number,
    ogImage: PropTypes.string,
    ogTitle: PropTypes.string,
    pageTitle: PropTypes.string,
    preview: PropTypes.bool,
}

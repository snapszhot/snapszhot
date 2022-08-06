import PropTypes from 'prop-types'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { NextSeo } from 'next-seo'

import CenteredWrapper from '../CenteredWrapper'
import Nav from './Nav'
import styles from './Container.module.scss'

export default function Container({
    children,
    day,
    mostRecentDay,
    ogImage,
    ogTitle,
    pageDescription,
    pageTitle,
    preview,
}) {
    const { asPath } = useRouter()

    const siteName = 'SNAPSЖOT'
    const description =
        pageDescription ||
        'swo17’s attempt at a more eclectic version of Framed'
    const title = pageTitle
        ? `${pageTitle} - SNAPSЖOT`
        : `SNAPSЖOT: ${description}`
    const canonical = `https://snapszhot.vercel.app${asPath}`
    const images = ogImage ? [{ url: ogImage }] : null
    const showLink = asPath !== '/'

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
                description={description}
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
                            {showLink ? (
                                <Link href='/'>
                                    <a className={styles.titleLink}>
                                        {siteName}
                                    </a>
                                </Link>
                            ) : (
                                <>{siteName}</>
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
    ogImage: PropTypes.string,
    ogTitle: PropTypes.string,
    pageDescription: PropTypes.string,
    pageTitle: PropTypes.string,
    preview: PropTypes.bool,
}

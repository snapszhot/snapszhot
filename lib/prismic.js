import * as prismic from '@prismicio/client'
import formatPrismicPost from '@lib/format-prismic-post'

const endpoint = prismic.getRepositoryEndpoint(
    process.env.PRISMIC_REPOSITORY_NAME
)

const delay = ms => new Promise(resolve => setTimeout(resolve, ms))

async function fetchWithRetry(input, init, retries = 3, backoff = 500) {
    for (let attempt = 0; ; attempt++) {
        try {
            const response = await fetch(input, init)
            if (response.status >= 500 && attempt < retries) {
                await delay(backoff * 2 ** attempt)
                continue
            }
            return response
        } catch (error) {
            if (attempt < retries) {
                await delay(backoff * 2 ** attempt)
                continue
            }
            throw error
        }
    }
}

export const Client = ref =>
    prismic.createClient(endpoint, {
        accessToken: process.env.PRISMIC_API_TOKEN,
        ref: ref || '',
        fetch: fetchWithRetry
    })

export async function getAllMovies(previewData) {
    const results = await Client(previewData?.ref).getAllByType('movie', {
        orderings: {
            field: 'my.movie.day',
            direction: 'asc'
        },
        graphQuery: `{
            movie {
                day
                subtitle
            }
        }`
    })

    return results
}

export async function getSingleMovie(previewData, day) {
    const filters = day ? [prismic.filter.at('my.movie.day', day)] : null

    const { results } = await Client(previewData?.ref).getByType('movie', {
        orderings: {
            field: 'my.movie.day',
            direction: 'desc'
        },
        pageSize: 1,
        page: 1,
        filters
    })

    const doc = results?.[0]?.data
    if (!doc) return null

    return await formatPrismicPost(doc)
}

// The "most recent movie" query (no `day`) is identical for every day page,
// every homepage/404 render, etc. Memoize it per process so all the build's
// page renders share a single request. TTL keeps it correct at runtime under
// ISR; failures are not cached; preview bypasses the cache.
const MOST_RECENT_TTL = 60 * 1000 // matches `revalidate: 60`
let mostRecentCache // { promise, expires }

export function getMostRecentMovie(previewData) {
    if (previewData?.ref) return getSingleMovie(previewData)

    const now = Date.now()
    if (!mostRecentCache || now > mostRecentCache.expires) {
        const promise = getSingleMovie().catch(error => {
            mostRecentCache = undefined
            throw error
        })
        mostRecentCache = { promise, expires: now + MOST_RECENT_TTL }
    }
    return mostRecentCache.promise
}

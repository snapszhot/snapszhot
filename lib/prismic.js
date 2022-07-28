import * as prismic from '@prismicio/client'
import formatPrismicPost from '@lib/format-prismic-post'

const endpoint = prismic.getEndpoint(
    process.env.NEXT_PUBLIC_PRISMIC_REPOSITORY_NAME
)

const createClientOptions = (req = null, prismicAccessToken = null) => {
    const reqOption = req ? { req } : {}
    const accessTokenOption = prismicAccessToken
        ? { accessToken: prismicAccessToken }
        : {}

    return {
        ...reqOption,
        ...accessTokenOption,
    }
}

const Client = (req = null) =>
    prismic.createClient(
        endpoint,
        createClientOptions(req, process.env.NEXT_PUBLIC_PRISMIC_API_TOKEN)
    )

export default async function queryLatestMovie() {
    const { results } = await Client().getByType('movie', {
        orderings: {
            field: 'my.movie.day',
            direction: 'desc',
        },
        pageSize: 1,
        page: 1,
    })

    return await formatPrismicPost(results?.[0]?.data)
}

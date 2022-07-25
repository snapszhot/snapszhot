import * as prismic from '@prismicio/client'

const endpoint = prismic.getEndpoint(process.env.PRISMIC_REPOSITORY_NAME)

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
        createClientOptions(req, process.env.PRISMIC_API_TOKEN)
    )

export default Client

export const queryLatestMovie = async () => {
    const { results } = await Client().getByType('movie', {
        orderings: {
            field: 'document.day',
            direction: 'desc',
        },
        pageSize: 1,
        page: 1,
    })

    return results?.[0]?.data
}

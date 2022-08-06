import url from 'url'
import https from 'https'
import sizeOf from 'image-size'

async function getImageSizes(image) {
    const imgUrl = image.link_to_gif.url
    const options = url.parse(imgUrl)

    const dimensions = await new Promise((resolve, reject) => {
        https.get(options, response => {
            const chunks = []

            response
                .on('data', chunk => {
                    chunks.push(chunk)
                })
                .on('end', () => {
                    const buffer = Buffer.concat(chunks)
                    const dims = sizeOf(buffer)

                    resolve(dims)
                })
                .on('error', err => reject.end(err))
        })
    })

    return {
        image: {
            alt: '',
            dimensions,
            url: imgUrl,
        },
    }
}

async function getImages(post) {
    let images = []

    if (post?.images?.[0]?.image?.url || post?.images?.[0]?.link_to_gif?.url) {
        images = post.images
    } else {
        for (let i = 1; i <= 6; i++) {
            const imageKey = `image_${i}`
            const gifKey = `image_${i}_gif_url`

            images.push({
                image: { ...post[imageKey] },
                link_to_gif: { ...post[gifKey] },
            })
        }
    }

    return await Promise.all(
        images.map(async image =>
            image?.link_to_gif?.url ? getImageSizes(image) : image
        )
    )
}

export default async function formatPrismicPost(post) {
    const images = await getImages(post)

    return {
        answer: {
            movie: post.title,
            originalTitle: post.orig_lang_title,
            director: post.director,
            releaseYear: post.release_year,
        },
        day: post.day,
        images,
        subtitle: post.subtitle,
    }
}

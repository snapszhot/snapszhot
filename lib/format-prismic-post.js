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

    if (post?.image_1?.url || post?.image_1_gif_url?.url) {
        for (let i = 1; i <= 6; i++) {
            const imageKey = `image_${i}`
            const gifKey = `image_${i}_gif_url`

            images.push({
                image: { ...post[imageKey] },
                link_to_gif: { ...post[gifKey] },
            })
        }
    } else {
        images = post.images
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
            originalTitle: post?.orig_lang_title,
            originalTitlePhonetic: post?.phonetic_orig,
            altLangTitle: post?.alt_lang_title,
            altLangTitlePhonetic: post?.phonetic_alt,
            engTransTitle: post?.eng_trans_title,
            altEngTitle: post?.alt_eng_title,
            director: post.director,
            releaseYear: post.release_year,
        },
        day: post.day,
        images,
        subtitle: post.subtitle,
    }
}

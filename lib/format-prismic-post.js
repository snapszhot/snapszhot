export default function formatPrismicPost(post) {
    return {
        answer: {
            movie: post.title,
            originalTitle: post.original_language_title,
            director: post.director,
            releaseYear: post.release_year,
        },
        day: post.day,
        images: post.images,
        subtitle: post.subtitle,
    }
}

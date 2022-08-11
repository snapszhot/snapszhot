import slugify from 'slugify'

export default function normalizeString(string) {
    return slugify(string, {
        lower: true,
        remove: /[*+~.()'"!:@]/g,
    }).replace('mister', 'mr')
}

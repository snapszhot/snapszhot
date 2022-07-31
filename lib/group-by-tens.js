export default function groupByTens(arr) {
    let r = {}

    arr.forEach(post => {
        const y = Math.floor((post.data.day - 1) / 10)

        r[y] = (r[y] || []).concat(post.data)
    })

    return Object.keys(r).map(y => r[y])
}

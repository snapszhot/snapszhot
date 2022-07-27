import fs from 'fs'
import path from 'path'
import csv from 'csv-parser'

export default async function getPrefills() {
    return new Promise(res => {
        const results = []
        const dataPath = path.join(
            process.cwd(),
            'public/prefill-old-movies.csv'
        )

        fs.createReadStream(dataPath)
            .pipe(csv())
            .on('data', data =>
                results.push({
                    director: data.director,
                    movie: data.title,
                    releaseYear: data.year,
                    originalTitle: data?.originalTitle || '',
                })
            )
            .on('end', () => {
                results.sort((a, b) => {
                    const movieA = a.movie.toLowerCase()
                    const movieB = b.movie.toLowerCase()

                    if (movieA < movieB) {
                        return -1
                    }

                    if (movieA > movieB) {
                        return 1
                    }

                    return 0
                })

                res(results)
            })
            .on('error', err => res.end(err))
    })
}

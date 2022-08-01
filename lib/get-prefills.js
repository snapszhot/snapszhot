import fs from 'fs'
import csv from 'csv-parser'

export default async function getPrefills(dataPath) {
    return new Promise(res => {
        const results = []

        fs.createReadStream(dataPath, { encoding: 'utf-8' })
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

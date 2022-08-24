import fs from 'fs'
import { parse } from 'csv-parse'
import normalizeString from '@lib/normalize-string'

export default async function getPrefills(dataPath) {
    return new Promise(res => {
        const results = []

        fs.createReadStream(dataPath, { encoding: 'utf-8' })
            .pipe(
                parse({
                    bom: true,
                    columns: true,
                })
            )
            .on('data', data =>
                results.push({
                    originalTitle: data.orig_lang_title,
                    originalTitleNorm: normalizeString(data.orig_lang_title),
                    originalTitlePhonetic: data?.phonetic_orig || '',
                    altLangTitle: data?.alt_lang_title || '',
                    altLangTitleNorm: data?.alt_lang_title
                        ? normalizeString(data.alt_lang_title)
                        : '',
                    altLangTitlePhonetic: data?.phonetic_alt || '',
                    engTransTitle: data?.eng_trans_title || '',
                    engTransTitleNorm: data?.eng_trans_title
                        ? normalizeString(data.eng_trans_title)
                        : '',
                    altEngTitle: data?.alt_eng_title || '',
                    altEngTitleNorm: data?.alt_eng_title
                        ? normalizeString(data.alt_eng_title)
                        : '',
                    director: data.director,
                    directorNorm: normalizeString(data.director),
                    releaseYear: data.year,
                })
            )
            .on('end', () => {
                results.sort((a, b) => {
                    const movieA = a.originalTitle.toLowerCase()
                    const movieB = b.originalTitle.toLowerCase()

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

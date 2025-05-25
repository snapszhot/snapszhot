import supabase from '@lib/supabase-client'

const moveToFront = (array, condition) =>
    array.sort((a, b) => condition(b) - condition(a))

export default async function handler(req, res) {
    const { query } = req.query
    const cleanQuery =
        query.trim() !== '' ? `${query.trim().replace(/ /g, '+')}:*` : ''

    const { data, error } = await supabase.rpc('snapszhot_search', {
        query: cleanQuery,
    })

    if (error) {
        throw error
    }

    const formattedData = data.map(item => {
        return {
            originalTitle: item.orig_lang_title,
            originalTitlePhonetic: item.phonetic_orig,
            altLangTitle: item.alt_lang_title,
            altLangTitlePhonetic: item.phonetic_alt,
            engTransTitle: item.eng_trans_title,
            altEngTitle: item.alt_eng_title,
            director: item.director,
            releaseYear: item.year,
            id: item.id,
        }
    })

    if (cleanQuery.toLowerCase().includes('yi+yi:*')) {
        moveToFront(formattedData, item => {
            if (
                item.director === 'Edward Yang' &&
                item.originalTitlePhonetic === 'Yi yi'
            ) {
                return 1
            }

            return 0
        })
    }

    res.status(200).json(formattedData)
}

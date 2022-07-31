import supabase from '@lib/supabase-client'

export default async function handler(req, res) {
    try {
        const { puzzle_id, won, frame_won } = req.body

        const { error } = await supabase.from('analytics').insert([
            {
                puzzle_id,
                won,
                frame_won,
            },
        ])

        if (error) {
            throw error
        }

        res.status(200).json({ message: 'Success!' })
    } catch (error) {
        console.log(error) // eslint-disable-line no-console

        res.status(500).json({ error: 'Error updating return' })
    }
}
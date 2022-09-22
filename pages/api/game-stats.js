import { withSentry } from '@sentry/nextjs'
import supabase from '@lib/supabase-client'

async function handler(req, res) {
    const isPreview =
        req?.cookies?.__next_preview_data != null &&
        req?.cookies?.__prerender_bypass != null

    if (process.env.ENVIRONMENT !== 'development' && !isPreview) {
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
    }

    res.status(200).json({ message: 'Success!' })
}

export default withSentry(handler)

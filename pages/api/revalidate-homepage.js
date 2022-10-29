export default async function handler(req, res) {
    if (req.body.secret !== process.env.REVALIDATE_TOKEN) {
        return res.status(401).json({ message: 'Invalid token' })
    }

    await res.revalidate('/index')
    return res.json({ revalidated: true })
}

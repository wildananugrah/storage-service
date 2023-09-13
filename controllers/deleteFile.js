import fs from 'fs'

export default (req, res) => {
    const { userId, filepath, type } = req.params
    try {
        return res.json({ message: fs.unlinkSync(`uploads/${userId}/${type}/${filepath}`) })
    } catch (e) {
        return res.status(500).json({ message : e.message })
    }
}
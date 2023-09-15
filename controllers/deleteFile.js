import fs from 'fs'

export default (req, res) => {
    const { userId } = req.params
    const { p } = req.query
    
    try {
        return res.json({ message: fs.unlinkSync(`uploads/${userId}/${p}`) })
    } catch (e) {
        return res.status(500).json({ message : e.message })
    }
}
import fs from 'fs'

export default (req, res) => {
    const { userId } = req.params
    const { p } = req.query
    
    try {
        fs.unlinkSync(`uploads/${userId}/${p}`)
        return res.json({ message: "File has been deleted." })
    } catch (e) {
        return res.status(500).json({ message : e.message })
    }
}
import fs from 'fs'
import getUserData from '../helpers/getUserData.js'
import getUserToken from '../helpers/getUserToken.js'

export default async (req, res) => {
    const { p } = req.query
    
    try {

        const token = await getUserToken(req.headers.authorization)
        const userData = await getUserData(token)
        const { id } = userData.data

        fs.unlinkSync(`uploads/${id}/${p}`)
        return res.json({ message: "File has been deleted." })
    } catch (e) {
        return res.status(500).json({ message : e.message })
    }
}
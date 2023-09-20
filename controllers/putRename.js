import fs from 'fs'
import getUserToken from '../helpers/getUserToken.js'
import getUserData from '../helpers/getUserData.js'

export default async (req, res) => {
    try {
        
        const { current, destination } = req.body

        const token = await getUserToken(req.headers.authorization)
        const userData = await getUserData(token)
        const { id } = userData.data

        fs.renameSync(`uploads/${id}/${current}`, `uploads/${id}/${destination}`)

        res.json({ message: "Folder / File has been renamed." })

    } catch (e) {
        return res.status(500).json({ message: e.message })
    }

}
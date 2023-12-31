import fs from 'fs'
import path from 'path'
import createFolder from "../helpers/createFolder.js"
import getUserToken from '../helpers/getUserToken.js'
import getUserData from '../helpers/getUserData.js'

export default async (req, res) => {
    try {
        
        const { folder } = req.body

        const token = await getUserToken(req.headers.authorization)
        const userData = await getUserData(token)
        const { id } = userData.data

        const destinationPath = req.query.root === undefined ? `uploads/${id}/${folder}/tmp` : `uploads/${id}/${req.query.root}/${folder}/tmp` // i don't know why i have to add /tmp but it works.........
        if (fs.existsSync(path.dirname(destinationPath))) return res.status(400).json({ message: `folder exists` })
        createFolder(destinationPath)

        res.json({ message: `folder has been created` })

    } catch (e) {
        return res.status(500).json({ message: e.message })
    }

}
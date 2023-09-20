import fs from 'fs'
import createFolder from '../helpers/createFolder.js'
import getUserData from '../helpers/getUserData.js'
import getUserToken from '../helpers/getUserToken.js'

export default async (req, res) => {
    const { path, originalname } = req.file
    const { root } = req.body

    try {

        const token = await getUserToken(req.headers.authorization)
        const userData = await getUserData(token)
        const { id } = userData.data

        const destination = root === undefined ? `uploads/${id}/${originalname}` : `uploads/${id}/${root}/${originalname}`

        createFolder(destination)

        if (fs.existsSync(destination)) {
            fs.unlinkSync(path)
            const responseMsg = { message: 'File already exists' }
            return res.status(400).json(responseMsg)
        }

        fs.copyFileSync(path, destination)
        fs.unlinkSync(path)

        const responseMsg = {
            data: {
                filename: req.file.originalname,
                path: destination.replace(`uploads/${id}`, '')
            }
        }
        return res.json(responseMsg)

    } catch (e) {
        res.status(500).json({ message: e.message })
    }
}
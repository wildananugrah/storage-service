import fs from 'fs'
import createFolder from '../helpers/createFolder.js'

export default async (req, res) => {
    const { path, originalname } = req.file
    const { user_id, root } = req.body

    const destination = `uploads/${user_id}/${root}/${originalname}`

    try {

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
                path: destination.replace(`uploads/${user_id}`, '')
            }
        }
        return res.json(responseMsg)

    } catch (e) {
        res.status(500).json({ message: e.message })
    }
}
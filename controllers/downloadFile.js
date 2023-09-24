import fs from 'fs'
import path from 'path'
import getUserData from '../helpers/getUserData.js'
import { v4 as uuidv4 } from 'uuid';

const imageMap = {
    ".jpg": "image/jpeg",
}

const videoMap = {
    ".mp4": "video/mp4",
}

export default async (req, res) => {
    try {

        const { p, token } = req.query

        const userData = await getUserData(token)
        const { id } = userData.data

        const fileName = `${uuidv4()}${path.extname(p)}`
        res.setHeader('Content-Disposition', 'attachment; filename=' + fileName)

        const fileStream = fs.createReadStream(`uploads/${id}/${p}`)
        fileStream.pipe(res)

    } catch (e) {
        return res.status(500).json({ message: e.message })
    }
}
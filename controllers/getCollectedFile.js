import fs from 'fs'
import path from 'path'
import getUserToken from '../helpers/getUserToken.js'
import getUserData from '../helpers/getUserData.js'

const imageMap = {
    ".jpg": "image/jpeg",
}

const videoMap = {
    ".mp4": "video/mp4",
}

const videoResponse = async (req, res) => {

    try {
        const { p, productId } = req.query

        const response = await fetch(`${process.env.DIUDARA_BE_HOST}/products/${productId}`)
        const responseJson = await response.json()

        const range = req.headers.range
        const videoPath = `uploads/${responseJson.data.userId}/${p}`
        const videoSize = fs.statSync(videoPath).size
        const chunkSize = 1 * 1e6;
        const start = Number(range.replace(/\D/g, ""))
        const end = Math.min(start + chunkSize, videoSize - 1)
        const contentLength = end - start + 1;
        const headers = {
            "Content-Range": `bytes ${start}-${end}/${videoSize}`,
            "Accept-Ranges": "bytes",
            "Content-Length": contentLength,
            "Content-Type": videoMap[path.extname(p)]
        }
        res.writeHead(206, headers)
        const stream = fs.createReadStream(videoPath, {
            start,
            end
        })
        stream.pipe(res)
    } catch (err) {
        console.log(err)
        res.status(500).json({ error: err.message })
    }

}

const imageResponse = async (req, res) => {

    try {
        const { p, productId } = req.query

        const response = await fetch(`${process.env.DIUDARA_BE_HOST}/products/${productId}`)
        const responseJson = await response.json()

        const data = fs.readFileSync(`uploads/${responseJson.data.userId}/${p}`)
        res.writeHead(200, { 'Content-Type': imageMap[path.extname(p)] })
        res.end(data)
    } catch (err) {
        console.log(err)
        res.status(500).json({ error: err.message })
    }

}

export default (req, res) => {
    try {

        const { p } = req.query

        if (Object.keys(imageMap).includes(path.extname(p))) imageResponse(req, res)
        if (Object.keys(videoMap).includes(path.extname(p))) videoResponse(req, res)

    } catch (e) {
        return res.status(500).json({ message: e.message })
    }
}
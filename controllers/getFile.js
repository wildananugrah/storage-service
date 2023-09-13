import fs from 'fs'

const videoResponse = (req, res) => {
    const { userId, filepath, type } = req.params
    const range = req.headers.range
    const videoPath = `uploads/${userId}/${type}/${filepath}`
    const videoSize = fs.statSync(videoPath).size
    const chunkSize = 1 * 1e6;
    const start = Number(range.replace(/\D/g, ""))
    const end = Math.min(start + chunkSize, videoSize - 1)
    const contentLength = end - start + 1;
    const headers = {
        "Content-Range": `bytes ${start}-${end}/${videoSize}`,
        "Accept-Ranges": "bytes",
        "Content-Length": contentLength,
        "Content-Type": "video/mp4"
    }
    res.writeHead(206, headers)
    const stream = fs.createReadStream(videoPath, {
        start,
        end
    })
    stream.pipe(res)
}

const imageResponse = (req, res) => {
    const { userId, filepath, type } = req.params
    const data = fs.readFileSync(`uploads/${userId}/${type}/${filepath}`)
    res.writeHead(200, { 'Content-Type': 'image/jpeg' })
    res.end(data)
}

const functionMap = {
    "video": videoResponse,
    "image": imageResponse
}

export default (req, res) => {
    try {

        const { type } = req.params
        functionMap[type](req, res)

    } catch (e) {
        return res.status(500).json({ message: e.message })
    }
}
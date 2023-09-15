
import express from 'express'
import multer from 'multer'
import morgan from 'morgan'
import dotenv from 'dotenv'

import createFolder from './helpers/createFolder.js'
import postUpload from './controllers/postUpload.js'
import getFiles from './controllers/getFiles.js'
import deleteFile from './controllers/deleteFile.js'
import getFile from './controllers/getFile.js'

// setup config environment
dotenv.config()
const { LOG_FORMAT, TMP_UPLOAD_FOLDER } = process.env

// setup app
const app = express()

// setup response body for morgan
const originalSend = app.response.send
app.response.send = function sendOverWrite(body) {
    originalSend.call(this, body)
    this.__custombody__ = body
}

// setup morgan token
morgan.token('req-body', (req, res) => JSON.stringify(req.body))
morgan.token('res-body', (req, res) => res.__custombody__)

// setup app use
app.use(morgan(LOG_FORMAT))
app.use(express.json())

// setup multer storage
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        const source = TMP_UPLOAD_FOLDER
        createFolder(source)
        cb(null, source)
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        cb(null, file.originalname + '-' + uniqueSuffix)
    }
})

const upload = multer({ storage: storage })

// routes
app.post("/upload", upload.single('myFile'), postUpload)
app.get("/files/:userId", getFiles)
app.delete("/files/:userId/:type/:filepath", deleteFile)
app.get("/file/:userId", getFile)

// healthcheck
app.get("/healthcheck", (req, res) => {
    res.status(200).json({ message: 'OK' })
})

const PORT = process.env.PORT || 8000;
const HOST = process.env.HOST || "0.0.0.0"

app.listen(PORT, HOST, () => {
    console.log(`Server is running on ${HOST}:${PORT}.`)
})
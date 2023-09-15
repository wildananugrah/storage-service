import fs from 'fs'
import path from 'path'

const moveFile = (sourceFilePath, destinationFilePath) => {
    if (!fs.existsSync(sourceFilePath)) {
        console.log("error : "+ sourceFilePath)
        throw new Error(`Source file does not exist.`)
    }

    const destinationDir = path.dirname(destinationFilePath);
    if (!fs.existsSync(destinationDir)) {
        fs.mkdirSync(destinationDir, { recursive: true });
    }

    fs.renameSync(sourceFilePath, destinationFilePath);
}

export default moveFile
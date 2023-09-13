import fs from 'fs'
import path from 'path'

export default (destinationPath) => {
    try {
        if (!fs.existsSync(path.dirname(destinationPath))) {
            fs.mkdirSync(path.dirname(destinationPath), { recursive: true })
        }
    } catch (e) {
        throw new Error(e.stack || e)
    }
}
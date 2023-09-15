import fs from 'fs'
import path from 'path'

const deleteFolderRecursive = (dirPath) => {
    if (fs.existsSync(dirPath)) {
        fs.readdirSync(dirPath).forEach((file, index) => {
            const curPath = path.join(dirPath, file)

            if (fs.lstatSync(curPath).isDirectory()) { 
                // If it's a directory, recurse into it
                deleteFolderRecursive(curPath)
            } else { 
                // If it's a file, delete it
                fs.unlinkSync(curPath)
            }
        })

        // After all files and subdirectories are deleted, delete the main directory
        fs.rmdirSync(dirPath)
    }
}

export default deleteFolderRecursive
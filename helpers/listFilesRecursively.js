import fs from 'fs'
import path from 'path'

const listFilesRecursively = (dir, userId) => {
    let results = []

    const items = fs.readdirSync(dir)

    for (let i = 0; i < items.length; i++) {
        const itemPath = path.join(dir, items[i])
        const stat = fs.statSync(itemPath)

        if (stat && stat.isDirectory()) {
            results = results.concat(listFilesRecursively(itemPath, userId))
        } else {
            results.push(itemPath.replace(`uploads/${userId}`, ''))
        }
    }

    return results
}

export default listFilesRecursively
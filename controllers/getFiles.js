import fs from 'fs'
import path from 'path'

const categorizeFiles = (data) => {
    const output = {
        images: [],
        videos: []
    };

    data.forEach(file => {
        if (file.startsWith('/image')) {
            output.images.push(file.replace('/image', ''))
        } else if (file.startsWith('/video')) {
            output.videos.push(file.replace('/video',''))
        }
    });

    return output;
}

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

export default (req, res) => {
    try {
        const files = listFilesRecursively(`uploads/${req.params.userId}`, req.params.userId)
        return res.json(files)
    } catch (e) {
        return res.status(500).json({ message: e.message })
    }

}
import fs from 'fs'
import path from 'path'

const bytesToSize = (bytes) => {
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];

    if (bytes === 0) return '0 Byte';
    const i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)));
    return Math.round(bytes / Math.pow(1024, i), 2) + ' ' + sizes[i];
}

const formatDate = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-11, not 1-12
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');

    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}

const countFilesInDirectory = (dirPath) => {
    try {
        const items = fs.readdirSync(dirPath);
        const files = items.filter(item => {
            const fullPath = path.join(dirPath, item);
            return fs.statSync(fullPath).isFile();
        });
        return files.length;
    } catch (error) {
        console.error('Error reading the directory:', error);
    }
}

const listFilesRecursively = (dir, userId) => {
    let results = []

    const items = fs.readdirSync(dir)

    for (let i = 0; i < items.length; i++) {
        let itemPath = path.join(dir, items[i])
        const stat = fs.statSync(itemPath)
        
        results.push({
            item: itemPath.replace(`uploads/${userId}`, ''),
            isDirectory: stat.isDirectory(),
            size: stat.isDirectory() ? countFilesInDirectory(itemPath) + " Files" : bytesToSize(stat.size),
            createdAt: formatDate(stat.birthtime)
        })

    }

    return results

}

export default listFilesRecursively
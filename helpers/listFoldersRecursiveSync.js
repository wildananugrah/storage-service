import fs from 'fs'
import path from 'path'

function listFoldersRecursiveSync(dir, userId) {
    const folders = [dir]

    for (let i = 0; i < folders.length; i++) {
        const subdirs = fs.readdirSync(folders[i], { withFileTypes: true })

        for (let j = 0; j < subdirs.length; j++) {
            if (subdirs[j].isDirectory()) {
                folders.push(path.join(folders[i], subdirs[j].name))
            }
        }
    }

    const updateFolders = folders
        .map(folder => folder.replace(`uploads/${userId}`, ''))
        .filter(folder => folder !== '');


    return updateFolders
}

export default listFoldersRecursiveSync
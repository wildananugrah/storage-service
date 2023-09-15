import fs from 'fs'
import path from 'path'

const moveFolderRecursive = (source, destination) => {
    if (!fs.existsSync(source)) {
        console.error("Source folder does not exist:", source);
        return;
    }

    if (!fs.existsSync(destination)) {
        fs.mkdirSync(destination, { recursive: true });
    }

    const items = fs.readdirSync(source);

    for (let item of items) {
        const sourcePath = path.join(source, item);
        const destPath = path.join(destination, item);

        if (fs.lstatSync(sourcePath).isDirectory()) {
            moveFolderRecursive(sourcePath, destPath);
            fs.rmdirSync(sourcePath);
        } else {
            fs.renameSync(sourcePath, destPath);
        }
    }
}

export default moveFolderRecursive
import fs from 'fs'
import path from 'path'
import createFolder from "../helpers/createFolder.js"

export default (req, res) => {
    try {
        const root = req.query.root === undefined ? "" : req.query.root
        const { userId } = req.params
        const { folder } = req.body

    

        const destinationPath = `uploads/${userId}/${root}/${folder}/tmp`
        if(fs.existsSync(path.dirname(destinationPath))) return res.status(400).json({ message : `folder exists` })
        createFolder(destinationPath) // i don't know why i have to add /tmp but it works.........

        res.json({ message : `folder has been created` })

    } catch (e) {
        return res.status(500).json({ message: e.message })
    }

}
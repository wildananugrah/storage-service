import deleteFolderRecursive from "../helpers/deleteFolderRecursive.js"

export default (req, res) => {
    try {
        
        const { p } = req.query
        const { userId } = req.params

        const destinationPath = `uploads/${userId}/${p}`

        deleteFolderRecursive(destinationPath)

        res.json({ message: "Folder has been deleted" })

    } catch (e) {
        return res.status(500).json({ message: e.message })
    }
}
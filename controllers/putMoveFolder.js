import moveFolderRecursive from '../helpers/moveFolderRecursive.js'

export default (req, res) => {
    try {
        
        const { userId } = req.params
        const { current, destination } = req.body

        moveFolderRecursive(`uploads/${userId}/${current}`, `uploads/${userId}/${destination}`)

        res.json({ message: "Folder has been moved." })

    } catch (e) {
        return res.status(500).json({ message: e.message })
    }

}
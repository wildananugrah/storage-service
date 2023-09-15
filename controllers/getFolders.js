import listFoldersRecursiveSync from "../helpers/listFoldersRecursiveSync.js";

export default (req, res) => {
    try {
        const { root } = req.query

        const p = root === undefined ? `uploads/${req.params.userId}` : `uploads/${req.params.userId}/${root}`
        const dirs = listFoldersRecursiveSync(p, req.params.userId)

        return res.json(dirs)

    } catch (e) {
        return res.status(500).json({ message: e.message })
    }

}
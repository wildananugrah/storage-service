import listFilesRecursively from "../helpers/listFilesRecursively.js"

export default (req, res) => {
    try {
        const { root } = req.query

        const p = root === undefined ? `uploads/${req.params.userId}` : `uploads/${req.params.userId}/${root}`

        const files = listFilesRecursively(p, req.params.userId)
        return res.json(files)
    } catch (e) {
        return res.status(500).json({ message: e.message })
    }

}
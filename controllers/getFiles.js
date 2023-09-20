import getUserData from "../helpers/getUserData.js"
import getUserToken from "../helpers/getUserToken.js"
import listFilesRecursively from "../helpers/listFilesRecursively.js"

export default async (req, res) => {
    try {
        const { root } = req.query

        const token = await getUserToken(req.headers.authorization)
        const userData = await getUserData(token)
        const { id } = userData.data

        const p = root === undefined ? `uploads/${id}` : `uploads/${id}/${root}`

        const files = listFilesRecursively(p, id)
        
        return res.json(files)
    } catch (e) {
        return res.status(500).json({ message: e.message })
    }

}
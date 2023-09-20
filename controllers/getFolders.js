import getUserData from "../helpers/getUserData.js";
import getUserToken from "../helpers/getUserToken.js";
import listFoldersRecursiveSync from "../helpers/listFoldersRecursiveSync.js";

export default async (req, res) => {
    try {
        const { root } = req.query

        const token = await getUserToken(req.headers.authorization)
        const userData = await getUserData(token)
        const { id } = userData.data

        const p = root === undefined ? `uploads/${id}` : `uploads/${id}/${root}`
        const dirs = listFoldersRecursiveSync(p, id)

        return res.json(dirs)

    } catch (e) {
        return res.status(500).json({ message: e.message })
    }

}
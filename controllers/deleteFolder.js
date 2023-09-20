import deleteFolderRecursive from "../helpers/deleteFolderRecursive.js"
import getUserData from "../helpers/getUserData.js"
import getUserToken from "../helpers/getUserToken.js"

export default async (req, res) => {
    try {
        
        const { p } = req.query
        
        const token = await getUserToken(req.headers.authorization)
        const userData = await getUserData(token)
        const { id } = userData.data

        const destinationPath = `uploads/${id}/${p}`

        deleteFolderRecursive(destinationPath)

        res.json({ message: "Folder has been deleted" })

    } catch (e) {
        return res.status(500).json({ message: e.message })
    }
}
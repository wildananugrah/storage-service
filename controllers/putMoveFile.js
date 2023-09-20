import getUserData from "../helpers/getUserData.js"
import getUserToken from "../helpers/getUserToken.js"
import moveFile from "../helpers/moveFile.js"

export default async (req, res) => {
    try {
        
        const { current, destination } = req.body

        const token = await getUserToken(req.headers.authorization)
        const userData = await getUserData(token)
        const { id } = userData.data
        
        moveFile(`uploads/${id}/${current}`, `uploads/${id}/${destination}`)

        res.json({ message: "Folder has been moved." })

    } catch (e) {
        return res.status(500).json({ message: e.message })
    }

}
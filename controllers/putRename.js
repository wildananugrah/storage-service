import fs from 'fs'

export default (req, res) => {
    try {
        
        const { userId } = req.params
        const { current, destination } = req.body

        fs.renameSync(`uploads/${userId}/${current}`, `uploads/${userId}/${destination}`)

        res.json({ message: "Folder / File has been renamed." })

    } catch (e) {
        return res.status(500).json({ message: e.message })
    }

}
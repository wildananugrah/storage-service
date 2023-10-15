import fs from 'fs'
import getUserData from '../helpers/getUserData.js'
import getUserToken from '../helpers/getUserToken.js'

export default async (req, res) => {
    const { p } = req.query
    
    try {

        const token = await getUserToken(req.headers.authorization)
        const userData = await getUserData(token)
        const { id } = userData.data

        const response = await fetch(`${process.env.DIUDARA_BE_HOST}/product-items`, {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        })

        const responseJson = await response.json()
        const index = responseJson.data.findIndex(item => item.path === p);
        console.log(`index: ${index}`)
        if(index ===  -1) {
            fs.unlinkSync(`uploads/${id}/${p}`)
            return res.json({ message: "File has been deleted." })
        } else {
            const data = responseJson.data[index]
            console.log(`data: ${data}`)
            return res.status(400).json({ message: `File can not be deleted due to this item has a constraint with this product ${data.productId}` })
        }
        
    } catch (e) {
        return res.status(500).json({ message : e.message })
    }
}
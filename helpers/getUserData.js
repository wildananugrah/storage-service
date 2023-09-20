const getUserData = async (token) => {
    try {
        
        const response = await fetch(`${process.env.JWT_HOST}/validate`, {
            headers: {
                "Content-Type": "application/json"
            },
            method: 'POST',
            body: JSON.stringify({ token })
        })

        if (!response.ok) {
            throw new Error("Invalid jwt")
        }

        return await response.json()
        
    } catch (err) {
        console.log(err)
        return false
    }

}

export default getUserData
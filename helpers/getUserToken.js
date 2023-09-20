const getUserToken = (userToken) => {
    return userToken.split(' ')[1]
}

export default getUserToken
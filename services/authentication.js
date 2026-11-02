const JWT = require('jsonwebtoken')
const secret = "ascnasncascas";

function createTokenforUser(user){
    const payload = {
        _id : user._id,
        email:user.email,
        profileImgUrl : user.profileImgUrl,
        role:user.role

    }

    const token = JWT.sign(payload , secret);
    return token;
}

function validateToken(user){
    const payload = JWT.verify(token , secret);
    return payload
}

module.exports = {
    createTokenforUser,
    validateToken
}
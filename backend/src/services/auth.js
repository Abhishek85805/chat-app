import jwt from 'jsonwebtoken';

const secret = process.env.SECRET || "abhishekchauhanQAZwsx@85805";

function setUser(user){
    return jwt.sign({
        _id: user._id,
        email: user.email
    }, secret)
}

function getUser(token){
    if(!token) return null;
    return jwt.verify(token, secret);
}

export {
    setUser, 
    getUser
}
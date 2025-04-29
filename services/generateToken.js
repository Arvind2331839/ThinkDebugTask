const  jwt  = require("jsonwebtoken");
const User = require("../models/userModel");



const generateRefreshToken= async (user)=>{
    const token = jwt.sign({ userId:user._id, role:user.role}, process.env.REFRESH_TOKEN_SECRET, {expiresIn: '1h'});
    const getuser= await User.findByIdAndUpdate(user._id,{RefreshToken:token})
    // console.log('Reftoken',token)
    return token
}

const generateAccessToken=(user)=>{
    const token = jwt.sign({ userId:user._id, role:user.role }, process.env.ACCESS_TOKEN_SECRET, {expiresIn: '7d'});
    // console.log('AccessToken', token);
    return token
}


module.exports= {generateRefreshToken, generateAccessToken}
const jwt = require("jsonwebtoken")
const {ServerConfig} = require('../../config')
const bcrypt = require('bcrypt')
const { StatusCodes } = require('http-status-codes')
const AppError = require('../errors/app-error')


async function checkpassword(password,hashedPassword){
    try {
       return bcrypt.compareSync(password,hashedPassword)
    } catch (error) {
       throw new AppError(`Internal Error Counld'nt SignIn`,StatusCodes.INTERNAL_SERVER_ERROR)
    }
 }

 
async function createToken(data){
    try {
        const jwttoken =  jwt.sign(data,ServerConfig.JwtSecret,{expiresIn:ServerConfig.JwtExpiry})
        return jwttoken
    } catch (error) {
       throw error 
    }  
} 

async function verifyToken(data){
    try{
        return jwt.verify(data,ServerConfig.JwtSecret)
    } catch (error) {
        throw error
    }
}
 

module.exports = {
    createToken,
    checkpassword,
    verifyToken
}
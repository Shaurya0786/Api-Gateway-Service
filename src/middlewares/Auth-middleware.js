const {userServices} = require('../services')
const {StatusCodes} = require("http-status-codes")
const { ErrorResponse } = require("../utils/common")
const { AppError } = require("../utils")

async function validateAuthRequest(req,res,next){
    if(!req.body.email){
        ErrorResponse.message = 'omething Went Wrong While authenticating Use'
        ErrorResponse.error = new AppError(["email of the user Not Present"],StatusCodes.BAD_REQUEST)
        return res
        .status(ErrorResponse.error.StatusCode)
        .json(ErrorResponse)
    }
    if(!req.body.password){
        ErrorResponse.message = 'Something Went Wrong While authenticating User'
        ErrorResponse.error = new AppError(["password of the user Not Present"],StatusCodes.BAD_REQUEST)
        return res
        .status(ErrorResponse.error.StatusCode)
        .json(ErrorResponse)
    }
    next()
}



async function checkAuth(req,res,next){
    try {
        const response = await userServices.isAuthenticate(req.headers['x-access-token'])
        if(response){
            req.user = response
            next()
        }
    } catch (error) {
        return res.status(error.StatusCode).json(error)   
    }
}



async function adminCheck(req,res,next){
    const response = await userServices.isAdmin(req.user)
    if(!response) return res.status(StatusCodes.UNAUTHORIZED).json({message:'Unauthorized User Access Denied'})
    next()  
}

module.exports = {
    validateAuthRequest,
    checkAuth,
    adminCheck
}
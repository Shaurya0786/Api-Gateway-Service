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
        console.log(response)
        if(response){
            req.user = response
            next()
        }
    } catch (error) {
        console.log(error)
        return res.status(error.StatusCode).json(error)   
    }
}

module.exports = {
    validateAuthRequest,
    checkAuth
}
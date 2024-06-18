const {userServices} = require('../services')
const {SuccessResponse,ErrorResponse} = require('../utils/common')
const { StatusCodes } = require('http-status-codes')


async function signUpController(req,res){
    try {
        const user = await userServices.signUp({
            email:req.body.email,
            password:req.body.password
        })
        SuccessResponse.data = user
        return res.status(StatusCodes.CREATED).json(SuccessResponse)
    } catch (error) {
        ErrorResponse.error = error
        return res.status(error.StatusCode).json(ErrorResponse)
    }
}


async function signInController(req,res){
    try {
        const user = await userServices.signIn({
            email:req.body.email,
            password:req.body.password
        })
        SuccessResponse.data = user
        return res.status(StatusCodes.CREATED).json(SuccessResponse)
    } catch (error) {
        ErrorResponse.error = error
        return res.status(error.StatusCode).json(ErrorResponse)
    }
}

async function roleChangeController(req,res){
    try {
        const user = await userServices.changeRole({
            id:req.body.id,
            newRole:req.body.newRole
        })
        SuccessResponse.data = user
        return res.status(StatusCodes.CREATED).json(SuccessResponse)
    } catch (error) {
        ErrorResponse.error = error
        return res.status(error.StatusCode).json(ErrorResponse)
    }
}

module.exports = {
    signUpController,
    signInController,
    roleChangeController
}
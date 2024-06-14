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


module.exports = {
    signUpController
}
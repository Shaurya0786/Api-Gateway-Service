const {UserRepository} = require('../repositories')
const { StatusCodes } = require('http-status-codes')
const AppError = require('../utils/errors/app-error')

const userInstance  = new UserRepository()

async function signUp(data){
    try {
        const user = await userInstance.create(data)
        return user
       } catch (error) {
          if(error.name == "SequelizeUniqueConstraintError" || error.name== "SequelizeValidationError"){
             let explanation = []
             error.errors.forEach((err) => {
                explanation.push(err.message)
             });
             throw new AppError(explanation,StatusCodes.BAD_REQUEST)
          }
          throw new AppError("Cannot Create User Object",StatusCodes.INTERNAL_SERVER_ERROR)
       } 
}



module.exports = {
    signUp
}
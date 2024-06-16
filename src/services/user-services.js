const {UserRepository} = require('../repositories')
const { StatusCodes } = require('http-status-codes')
const AppError = require('../utils/errors/app-error')
const {ServerConfig} = require('../config')
const bcrypt = require('bcrypt')
const {Auth} = require('../utils/common')

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

 async  function signIn(data){
   try {
      const user = await userInstance.getUserbyEmail(data.email)
      if(!user) throw new AppError('Cant find the User', StatusCodes.NOT_FOUND)
      const passwordMatch = await Auth.checkpassword(data.password,user.password)
      if(!passwordMatch) throw new AppError('Either Email or Password is Incorrect',StatusCodes.BAD_REQUEST)   
      const jwttoken = await Auth.createToken({id:user.id,email:user.email})
      return jwttoken
   } catch (error) {
      if(error instanceof AppError) throw error
      console.log(error)
      throw new AppError('Something Went Wrong',StatusCodes.INTERNAL_SERVER_ERROR)
   }
}


async function isAuthenticate(token){
   try {
      if(!token) throw new AppError('Token for Authentication Not Found',StatusCodes.BAD_REQUEST)
      const response = await Auth.verifyToken(token)
      const user = await userInstance.get(response.id)
      if(!user) throw new AppError('Invalid Access Token',StatusCodes.BAD_REQUEST)
      if(user.email!=response.email) throw new AppError('Invalid Access Token',StatusCodes.BAD_REQUEST)
      return response.id
   } catch (error) {
      if(error instanceof AppError) throw error
      if(error.name=='JsonWebTokenError') throw new AppError('Invalid Access Token',StatusCodes.BAD_REQUEST)
      throw new AppError('Something Went Wrong',StatusCodes.INTERNAL_SERVER_ERROR)
   }
}





module.exports = {
    signUp,
    signIn,
    isAuthenticate
}
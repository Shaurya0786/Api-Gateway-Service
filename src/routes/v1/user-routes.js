const express = require('express')
const router = express.Router()
const {userController} = require('../../controllers')
const {Authmiddlewares} = require('../../middlewares')


router.post('/signUp',Authmiddlewares.validateAuthRequest,userController.signUpController)
router.post('/signIn',Authmiddlewares.validateAuthRequest,userController.signInController)
router.post('/changeRole',Authmiddlewares.checkAuth,Authmiddlewares.adminCheck,userController.roleChangeController)



module.exports = router
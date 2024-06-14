const express = require('express')
const router = express.Router()
const {userController} = require('../../controllers')


router.post('/signUp',userController.signUpController)


module.exports = router
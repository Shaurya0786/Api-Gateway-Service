const express = require('express')

const router = express.Router();
const {infocontroller} = require('../../controllers')
const {Authmiddlewares} = require('../../middlewares')
const userRoutes = require('./user-routes')

router.get('/info',Authmiddlewares.checkAuth,infocontroller.info)

router.use('/user',userRoutes)

module.exports = router;
const express = require('express')

const router = express.Router();
const {infocontroller} = require('../../controllers')

const userRoutes = require('./user-routes')

router.get('/info',infocontroller.info)

router.use('/user',userRoutes)

module.exports = router;
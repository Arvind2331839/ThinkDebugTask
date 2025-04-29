const express = require('express')
const {signUP, Login} = require('../controllers/userController')
const router = express.Router()



// define the user route
router.post('/signUP', signUP)
router.post('/Login', Login)



module.exports = router


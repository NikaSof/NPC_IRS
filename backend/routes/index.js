const Router = require('express')

const router = new Router()
const userRouter = require('./userRouter')
const familyRouter = require('./familyRouter')
const educationRouter = require('./educationRouter')


router.use('/user', userRouter)
router.use('/family', familyRouter)
router.use('/education', educationRouter)

module.exports = router
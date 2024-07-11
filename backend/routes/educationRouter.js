const Router = require('express')
const router = new Router()
const educationController = require('../controllers/educationController')
const authMiddleware = require('../middlleware/authMiddleware')

router.post('/', authMiddleware, educationController.add)
router.get('/:id', authMiddleware, educationController.getByUser)
router.get('/',  educationController.getAll)


module.exports = router
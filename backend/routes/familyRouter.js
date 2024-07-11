const Router = require('express')
const router = new Router()
const familyController = require('../controllers/familyController')
const authMiddleware = require('../middlleware/authMiddleware');

router.post('/', authMiddleware, familyController.add)
router.get('/:id', authMiddleware, familyController.getByUser)
router.get('/', familyController.getAll)

module.exports = router
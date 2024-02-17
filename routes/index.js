const express = require('express');
const router = express.Router();
const homeController = require('../controllers/homeController')

router.get('/', homeController.home);
router.use('/api/users', require('./userRoutes'))

module.exports = router;
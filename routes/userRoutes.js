const express = require("express");

const router = express.Router();
const userController = require('../controllers/userController')

router.post("/register", userController.register);
router.post("/login", userController.loginUser);
router.get('/find/:userId', userController.findUser);
router.get('/find/user', userController.findUser)

module.exports = router;
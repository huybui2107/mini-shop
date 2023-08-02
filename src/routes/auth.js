const express = require('express');
const authController = require('../app/controllers/auth');
const router = express.Router();

router.post('/login',authController.login)
router.post('/refreshToken',authController.requestRefreshToken);
module.exports = router;
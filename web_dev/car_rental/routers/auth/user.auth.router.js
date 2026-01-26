const userAuthController = require('../../controllers/user.auth.controller');

const authMiddleware = require('../../middleware/auth.middleware');
const express = require('express');
const router = express.Router();
router.post('/auth/signup',userAuthController.signUpController);
router.post('/auth/login',userAuthController.loginController, authMiddleware.createJsonWebTokenMiddleware);
module.exports = router;
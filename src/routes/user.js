const express = require('express');
const userController = require('../app/controllers/user');
const router = express.Router();
const isAuth = require('../app/middlewares/is-auth')


router.get('/',isAuth.verifyTokenAndAdmin,userController.getListUser);
router.get('/:id',isAuth.verifyToken,userController.getUserById);
router.delete('/delete/:id',isAuth.verifyTokenAndAdmin,userController.deleteUser);
router.post('/register',userController.register)
module.exports = router;
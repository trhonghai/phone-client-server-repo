const express = require('express');
const { createUser, loginUser, logout, getUser, getLoginStatus, updateUser, updatePhoto} = require('../app/controller/UserController');
const { protect } = require('../app/middlewares/authMiddleware');


const router = express.Router();


router.post('/register', createUser);
router.post('/login',loginUser);
router.get('/logout', logout);
router.get('/getLoginStatus', getLoginStatus);
router.get('/getUser',protect, getUser);
router.patch('/updateUser',protect, updateUser);
router.patch('/updatePhoto',protect, updatePhoto);



module.exports = router;
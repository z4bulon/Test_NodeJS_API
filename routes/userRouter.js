const express = require("express");
const path = require('path');
const userController = require("../controller/userController.js");
const auth = require('../middleware/auth');
const upload = require('../middleware/upload');

const router = express.Router();

router.post('/register', userController.regUser);
router.post('/login', userController.logUser);
router.get('/profile/:id', auth, userController.getUser);
router.put('/profile/:id', auth, upload.single('photo'), userController.editUser);
router.get('/profiles', auth, userController.listUser);

module.exports = router;
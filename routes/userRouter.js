const express = require("express");
const userController = require("../controller/userController.js");
const authController = require("../controller/authController.js");
const auth = require('../middleware/auth');
const upload = require('../middleware/upload');

const router = express.Router();

router.post('/register', authController.regUser);
router.post('/login', authController.logUser);
router.get('/profile/:id', auth, userController.getUser);
router.put('/profile/:id', auth, upload.single('photo'), userController.editUser);
router.get('/profiles', auth, userController.listUser);

module.exports = router;
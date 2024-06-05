const express = require("express");
const userController = require("../controller/userController.js");
const authController = require("../controller/authController.js");
const auth = require('../middleware/auth');
const { upload, handleMulterErrors } = require('../middleware/upload');
const multer = require("multer");

const router = express.Router();

router.post('/register', authController.regUser);
router.post('/login', authController.logUser);
router.get('/profile/:id', auth, userController.getUser);
router.put('/profile/:id', auth, (req, res, next) => {
    upload.single('photo')(req, res, function (err) {
        if (err instanceof multer.MulterError) {
            res.status(400).json({ message: err.message });
        } else if (err) {
            res.status(err.status || 500).json({ message: err.message });
        } else {
            next();
        }
    });
}, userController.editUser);
router.get('/profiles', auth, userController.listUser);
router.use(handleMulterErrors);

module.exports = router;
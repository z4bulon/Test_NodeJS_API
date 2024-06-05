const multer = require('multer');
const path = require('path');

const fileFilter = (req, file, cb) => {
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png'];
    if (allowedTypes.includes(file.mimetype)) {
        cb(null, true);
    } else {
        const error = new Error('Недопустимый формат файла');
        error.status = 400;
        cb(error, false);
    }
};

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}_${path.basename(file.originalname)}`);
    }
});

const upload = multer({
    storage,
    fileFilter,
    limits: { fileSize: 10 * 1024 * 1024 }
});

const handleMulterErrors = (err, req, res) => {
    if (err instanceof multer.MulterError) {
        res.status(400).json({ message: err.message });
    } else {
        res.status(err.status || 500).json({ message: err.message });
    }
};

module.exports = {upload, handleMulterErrors};
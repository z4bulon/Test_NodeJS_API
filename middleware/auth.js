const jwt = require('jsonwebtoken');

module.exports = async (req, res, next) => {
    const token = req.cookies.token;
    if (!token) {
        return res.status(403).json({ message: 'Нужна авторизация' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = JSON.stringify(decoded)
        next()
    } catch (error) {
        return res.status(403).json({ message: 'Токен не действителен' });
    }
};
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { getConnection } = require('../db');

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

//В идеале использовать библиотеки для валидации, например express-validator

const validateUser = (data) => {
    const { name, email, password } = data;
    if (!name || !email || !password) return 'Имя, Email и Пароль обязательны';
    if (password.length < 6) return 'Пароль должен быть не менее 6 символов';
    if (!emailRegex.test(email)) return 'Неправильный формат почты';
    return null;
};

exports.regUser = async (req, res) => {
    const { name, email, password } = req.body;

    try{
        const error = validateUser({ name, email, password });
        if (error) return res.status(400).send(error);

        const connection = await getConnection();

        const [existingUser] = await connection.execute('SELECT * FROM users WHERE email = ?' , [email]);
        if (existingUser.length) {
            return res.status(400).json({ message: 'Email уже зарегестрирован, попробуйте войти через него' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        await connection.execute('INSERT INTO users (name, email, password) VALUES (?,?,?)', [name, email, hashedPassword]);

        res.status(201).json({ message: 'Пользователь зарегестрирован' });
    } catch (error) {
        res.status(500).json({ message: 'Внутренняя ошибка сервера' });
    }
};

exports.logUser = async (req, res)=> {
    const { email, password } = req.body;
    try {
        const connection = await getConnection();
        const [user] = await connection.execute('SELECT * FROM users WHERE email = ?', [email]);
        if (user.length === 0) {
            return res.status(400).json({ message: 'Неверный email или пароль' });
        }

        const isPasswordValid = await bcrypt.compare(password, user[0].password);
        if (!isPasswordValid) {
            return res.status(400).json({ message: 'Неверный email или пароль' });
        }
        const token = jwt.sign({ id: user[0].id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.cookie('token', token, { httpOnly: true, maxAge: 3600000 });
        res.status(200).json({ message: 'Пользователь авторизован' });
    } catch (error) {
        res.status(500).json({ message: 'Внутренняя ошибка сервера' });
    }
};
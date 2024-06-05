const db = require('../db');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const validateUser = (data) => {
    const { name, email, password } = data;
    if (!name || !email || !password) return 'Имя, Email и Пароль обязательны';
    if (password.length < 6) return 'Пароль должен быть не менее 6 символов';
    return null;
};

exports.regUser = async (req, res) => {
    const { name, email, password } = req.body;

    try{
        const error = validateUser({ name, email, password });
        if (error) return res.status(400).send(error);

        const [existingUser] = await db.query('SELECT * FROM users WHERE email = ?' , [email]);
        if (existingUser.length > 0) {
            return res.status(400).json({ message: 'Email уже зарегестрирован, попробуйте войти через него' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const user = [ name, email, hashedPassword ];
        await db.query('INSERT INTO users (name, email, password) VALUES (?,?,?)', user);
        res.status(201).json({ message: 'Пользователь зарегестрирован' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.logUser = async (req, res)=> {
    const { email, password } = req.body;
    try {
        const [user] = await db.query('SELECT * FROM users WHERE email = ?', [email]);
        if (user.length === 0) {
            return res.status(400).json({ message: 'Неверный email или пароль' });
        }

        const isPasswordValid = await bcrypt.compare(password, user[0].password);
        if (!isPasswordValid) {
            return res.status(400).json({ message: 'Неверный email или пароль' });
        }

        const token = jwt.sign({ id: user[0].id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.header('Authorization', `Bearer ${token}`);
        res.json({ token });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getUser = async (req, res) => {
    const { id } = req.params;
    try {
        const [user] = await db.query('SELECT * FROM users WHERE id = ?', [id]);
        if (!user) {
            return res.status(404).json({ message: 'Пользователь не найден' });
        }
        res.json({user});
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.editUser =  async (req, res) => {
    const { id } = req.params;
    const updatedFields= req.body;
    const photo = req.file ? req.file.filename : null;

    try {
        const [user] = await db.query('SELECT * FROM users WHERE id = ?', [id]);
        if (user.length === 0) {
            return res.status(404).json({ message: 'Пользователь не найден' });
        }

        let updates = [];
        let values = [];

        for (const field in updatedFields) {
            // Проверяем, не пытается ли пользователь изменить запрещенные данные
            if (field === 'id' || field === 'password' || field === 'regdate') {
                return res.status(400).json({ message: `Нельзя изменить ${field}` });
            }
            updates.push(`${field} = ?`);
            values.push(updatedFields[field]);
        }

        if (photo) {
            updates.push('photo = ?');
            values.push(photo);
        }

        if (updates.length === 0) {
                return res.status(400).json({ message: 'Нет изменений' });
        }

        values.push(id);

        const sql = `UPDATE users SET ${updates.join(', ')} WHERE id = ?`;

        await db.query(sql, values);

        res.json({ message: 'Пользователь успешно обновлен' });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.listUser = async (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const limit = 10;
    const offset = (page - 1) * limit;

    try {
        const [users] = await db.query('SELECT * FROM users ORDER BY regdate DESC LIMIT ? OFFSET ?', [limit, offset]);
        const [total] = await db.query('SELECT COUNT(*) as count FROM users');

        res.json({
            total: total[0].count,
            page: parseInt(page),
            limit,
            users
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
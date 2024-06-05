const { getConnection } = require('../db');

exports.getUser = async (req, res) => {
    const { id } = req.params;

    if (!/^\d+$/.test(id)) {
        return res.status(400).json({ message: 'Некорректный формат ID пользователя' });
    }

    try {
        const connection = await getConnection();
        const [user] = await connection.execute('SELECT id, name, surname, email, gender, photo, regdate FROM users WHERE id = ?', [id]);
        if (!user[0]) {
            return res.status(404).json({ message: 'Пользователь не найден' });
        }
        res.json(user[0]);
    } catch (error) {
        res.status(500).json({ message: 'Внутренняя ошибка сервера' });
    }
};

exports.editUser =  async (req, res) => {
    const userId = JSON.parse(req.user).id;
    const { id } = req.params;

    if (!/^\d+$/.test(id)) {
        return res.status(400).json({ message: 'Некорректный формат ID пользователя' });
    }

    if (userId !== parseInt(id))
        return res.status(402).json({ message: 'Недостаточно полномочий' })

    const updatedFields= req.body;
    const photo = req.file ? req.file.filename : null;

    try {
        const connection = await getConnection();
        const [user] = await connection.execute('SELECT * FROM users WHERE id = ?', [id]);
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

        await connection.execute(sql, values);

        res.json({ message: 'Пользователь успешно обновлен' });

    } catch (error) {
        res.status(500).json({ message: 'Внутренняя ошибка сервера' });
    }
};

exports.listUser = async (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const limit = 10;
    const offset = (page - 1) * limit;
    try {
        const connection = await getConnection();
        const [users] = await connection.execute('SELECT id, name, surname, email, gender, photo, regdate FROM users ORDER BY regdate DESC LIMIT ' + limit + ' OFFSET ' + offset);
        res.json(users);
    } catch (error) {
        res.status(500).json({ message: 'Внутренняя ошибка сервера' });
    }
};
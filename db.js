const mysql= require('mysql2');

const db = mysql.createConnection({
    host: process.env.HOST,
    database : process.env.DATABASE_NAME,
    user: process.env.USER,
    password: process.env.PASSWORD,
});

db.connect((err) => {
    if (err) {
        console.error('Error connecting to MySQL:', err);
        return;
    }
    console.log('Connected to MySQL database');
});

module.exports = db.promise();
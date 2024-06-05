const mysql= require('mysql2/promise');
let connection;

async function initializeDatabase() {
    try {
        connection = await mysql.createConnection({
            host: process.env.HOST,
            database: process.env.DATABASE_NAME,
            user: process.env.USER,
            password: process.env.PASSWORD,
        });
        console.log('Connected to MySQL database');
    } catch (err) {
        console.error('Error connecting to MySQL:', err);
        process.exit(1);
    }
}
async function getConnection() {
    if (!connection) {
        await initializeDatabase();
    }
    return connection;
}

module.exports = {
    initializeDatabase,
    getConnection
};
const express = require("express");
const bodyParser = require('body-parser');
const path = require('path');
const cookieParser = require('cookie-parser');
const { initializeDatabase } = require('./db');
require('dotenv').config()
const userRouter = require('./routes/userRouter');

const app = express();
app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use('/user', userRouter);

initializeDatabase();

const PORT = process.env.PORT;

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
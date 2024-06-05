const express = require("express");
const bodyParser = require('body-parser');
const path = require('path');
require('dotenv').config()
const userRouter = require('./routes/userRouter');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use('/user', userRouter);

const PORT = process.env.PORT || 3000;
``
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
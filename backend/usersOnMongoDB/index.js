const express = require('express');
// const { Logger } = require('./src/utils/customLogger');
const AppLogger = require('../../others/advanceLog');

const app = express();
// index.js or app.js

// Your application startup code here
// For example, starting the server, connecting to the database, etc.

// No CORS allowed hence below line is commented out
// app.use(cors());

app.use(express.json());

app.use('/', (req, res, next) => {
    return res.status(200).json({ "msg": "Hello from Products" })
});

app.listen(8002, () => {
    AppLogger.log('Products is Listening to Port 8002')
});
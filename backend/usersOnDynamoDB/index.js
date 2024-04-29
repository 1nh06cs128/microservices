// import express from 'express'
// import bodyParser from 'body-parser'
// import dotenv from 'dotenv'

// // import user from './routes.js'

// dotenv.config()

// const app = express()

app.use(bodyParser.json())

// app.get("/", (req, res) => {
//     res.json({ "Hi": "Hello World" })
// })

// app.use('/api', user)

// const PORT = 8000

// app.listen(PORT, () => {
//     console.log(`Port listening on ${PORT}`)
// })

import express from 'express';

// const express = require('express');
// const { customeLogger } = require('./src/utils/customLogger');
const app = express();

// No CORS allowed hence below line is commented out
// app.use(cors());

app.use(express.json());

app.use('/', (req, res, next) => {
    return res.status(200).json({ "msg": "Hello from users" })
})

app.listen(8003, () => {
    // customeLogger('Products is Listening to Port 8002')
})

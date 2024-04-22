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
import npm from 'npm';

// Initialize npm to get its configuration
npm.load((err, npmConfig) => {
    if (err) {
        console.error('Error loading npm config:', err);
        return;
    }

    // Get the prefix where global modules are installed
    const globalModulesPath = npmConfig.get('prefix') + '/lib/node_modules';
    console.log('Global NPM modules path:', globalModulesPath);
});

import express from 'express';
import { AppLogger, CallPointInfo } from '../../others/advanceLog';

const app = express();

app.use(express.json());

app.use('/', (req, res, next) => {
    return res.status(200).json({ "msg": "Hello from users" })
})

app.listen(7001, () => {
    AppLogger.emit('info', 'Products is Listening to Port 7001', CallPointInfo());
})

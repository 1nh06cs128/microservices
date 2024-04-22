import express from 'express'
import { USER_CONFIG } from './config/index.js'
import { DatabaseConnection } from './database/index.js'
import { expressApp } from './express-app.js'
import { customLogger } from './utils/custom-logger.js'

// const express = require('express');
// const { PORT } = require('./config');
// const { databaseConnection } = require('./database');
// const expressApp = require('./express-app');
// const { customeLogger } = require('./utils/customLogger');

const StartServer = async () => {
    customLogger('StartServer');
    const app = express();

    await DatabaseConnection();
    await expressApp(app);

    app.listen(USER_CONFIG.PORT, () => {
        customLogger(`listening to port ${USER_CONFIG.PORT}`);
    })
        .on('error', (err) => {
            customLogger(err);
            process.exit();
        })
}
StartServer();
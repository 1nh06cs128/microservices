const express = require('express');
const { PORT } = require('./config');
const { databaseConnection } = require('./database');
const expressApp = require('./express-app');
// const { Logger } = require('./utils/customLogger');
const { AppLogger, CallPointInfo, forFunctions } = require('../../../others/advanceLog.js');

// const { forFunctions } = require('./utils/performance-tracker.js');

// const { forFunctions } = require('../../../others/performance-tracker.js');

// Apply performance tracking to all functions in the repository
for (const key in global) {
    if (typeof global[key] === 'function') {
        global[key] = forFunctions(global[key]);
    }
}

const StartServer = async () => {

    const app = express();

    await databaseConnection();
    await expressApp(app);

    app.listen(PORT, () => {
        AppLogger.emit('debug', `listening to port ${PORT}`, CallPointInfo());
    })
        .on('error', (error) => {
            AppLogger.emit('error', error, CallPointInfo());
            process.exit();
        })
}

StartServer();
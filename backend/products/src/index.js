import express from 'express'
import { USER_CONFIG } from './config/index.js'
import { DatabaseConnection } from './database/index.js'
import { expressApp } from './express-app.js'
import { AppLogger, CallPointInfo, forFunctions } from '../../../others/advanceLog.js'

for (const key in global) {
    if (typeof global[key] === 'function') {
        global[key] = forFunctions(global[key]);
    }
}

const StartServer = async () => {
    AppLogger.emit('info', 'START SERVER', CallPointInfo());
    // customLogger('StartServer');
    const app = express();
    AppLogger.emit('info', 'Awaiting Database Connection', CallPointInfo());
    await DatabaseConnection();
    AppLogger.emit('info', 'Awaiting Express App Connection', CallPointInfo());
    await expressApp(app);
    app.listen(USER_CONFIG.PORT, () => {
        // customLogger(`listening to port ${USER_CONFIG.PORT}`);
        AppLogger.emit('info', `listening to port ${USER_CONFIG.PORT}`, CallPointInfo());
    })
        .on('error', (error) => {
            // customLogger(err);
            AppLogger.emit('error', `'Error Occurred:- ' ${error}`, CallPointInfo());
            process.exit();
        })
}
StartServer();
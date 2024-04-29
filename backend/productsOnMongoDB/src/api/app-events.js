// const ShoppingService = require("../services/shopping-service");

import { AppLogger, CallPointInfo } from '../../../../others/advanceLog.js';

const appEvents = (app) => {

    // const service = new ShoppingService();
    app.use('/app-events', async (req, res, next) => {
        const { payload } = req.body;
        AppLogger.emit('debug', `'/app-events' Called\n============= Shopping ================\n ${payload}`, CallPointInfo());
        return res.status(200).json({ message: 'notified!' });
    });
}

export { appEvents }
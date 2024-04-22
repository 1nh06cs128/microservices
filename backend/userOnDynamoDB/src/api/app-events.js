// const ShoppingService = require("../services/shopping-service");

import { customLogger } from '../utils/custom-logger.js'

const appEvents = (app) => {

    // const service = new ShoppingService();
    app.use('/app-events', async (req, res, next) => {
        const { payload } = req.body;
        customLogger("============= Shopping ================");
        customLogger(payload);
        return res.status(200).json({ message: 'notified!' });
    });
}

export { appEvents }
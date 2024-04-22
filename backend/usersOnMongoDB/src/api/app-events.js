// const ShoppingService = require("../services/shopping-service");

// const { Logger } = require("../utils/customLogger");
const { AppLogger, CallPointInfo } = require('../../../../others/advanceLog');

module.exports = (app) => {

    // const service = new ShoppingService();
    app.use('/app-events', async (req, res, next) => {
        const { payload } = req.body;
        AppLogger.emit('debug', "============= Shopping ================", CallPointInfo());
        AppLogger.emit('debug', payload, CallPointInfo());
        return res.status(200).json({ message: 'notified!' });
    });
}
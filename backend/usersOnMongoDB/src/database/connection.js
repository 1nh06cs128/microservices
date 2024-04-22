const MongoClient = require("mongoose");
const { DB_URL } = require("../config");
// const { Logger } = require("../utils/customLogger");
const { AppLogger, CallPointInfo } = require('../../../../others/advanceLog');

module.exports = async () => {
    try {
        AppLogger.emit('debug', DB_URL, CallPointInfo());
        await MongoClient.connect(DB_URL);
        AppLogger.emit('warn', 'Connected to MongoDB', CallPointInfo());
    } catch (error) {
        AppLogger.emit('error', error, CallPointInfo());
    }
};

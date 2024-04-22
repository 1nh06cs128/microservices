// const { ValidateSignature } = require('../..');
// const { Logger } = require('../../utils/customLogger');

const { AppLogger, CallPointInfo } = require('../../../../../others/advanceLog');

module.exports = async (req, res, next) => {

    // const isAuthorized = await ValidateSignature(req);

    if (isAuthorized) {
        AppLogger.emit('debug', 'isAuthorized', CallPointInfo());
        return next();
    }

    return res.status(403).json({ message: 'Not Authorized' });
}
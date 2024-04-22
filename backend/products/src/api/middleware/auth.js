// const { ValidateSignature } = require('../..');

import { AppLogger, CallPointInfo } from "../../../../../others/advanceLog";

const ProductsAuth = async (req, res, next) => {

    // const isAuthorized = await ValidateSignature(req);

    if (isAuthorized) {
        customLogger('isAuthorized');
        AppLogger.emit('debug', `isAuthorized`, CallPointInfo());
        return next();
    }

    return res.status(403).json({ message: 'Not Authorized' })
}

export default { ProductsAuth }
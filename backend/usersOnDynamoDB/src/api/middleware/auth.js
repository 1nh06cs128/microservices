// const { ValidateSignature } = require('../..');
// const { customLogger } = require('../../utils/custom-logger');

import { customLogger } from '../../utils/custom-logger.js'

const UserAuth = async (req, res, next) => {

    // const isAuthorized = await ValidateSignature(req);

    if (isAuthorized) {
        customLogger('isAuthorized');
        return next();
    }

    return res.status(403).json({ message: 'Not Authorized' })
}

export default { UserAuth }
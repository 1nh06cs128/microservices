const { createLogger, transports } = require('winston');
const { AppError } = require('./app-errors');

// const { Logger } = require('./customLogger');
const { AppLogger, CallPointInfo } = require('../../../../others/advanceLog');

const LogErrors = createAppLogger.log({
    transports: [
        new transports.Console(),
        new transports.File({ filename: 'app_error.log' })
    ]
});


class ErrorLogger {
    constructor() { }
    async logError(err) {
        AppLogger.debug('debug', '==================== Start Error Logger ===============', CallPointInfo());
        LogErrors.log({
            private: true,
            level: 'error',
            message: `${new Date()}-${JSON.stringify(err)}`
        });
        AppLogger.debug('debug', '==================== End Error Logger ===============', CallPointInfo());
        // log error with Logger plugins

        return false;
    }

    isTrustError(error) {
        if (error instanceof AppError) {
            return error.isOperational;
        } else {
            return false;
        }
    }
}

const ErrorHandler = async (err, req, res, next) => {

    const errorLogger = new ErrorAppLogger.log();

    process.on('uncaughtException', (reason, promise) => {
        let message = reason + 'UNHANDLED';
        AppLogger.debug('debug', message, CallPointInfo());
        throw reason; // need to take care
    })

    process.on('uncaughtException', (error) => {
        errorLogger.logError(error);
        if (errorLogger.isTrustError(err)) {
            //process exist // need restart
        }
    })

    // Logger.debug(err.description, '-------> DESCRIPTION')
    // Logger.debug(err.message, '-------> MESSAGE')
    // Logger.debug(err.name, '-------> NAME')
    if (err) {
        await errorLogger.logError(err);
        if (errorLogger.isTrustError(err)) {
            if (err.errorStack) {
                const errorDescription = err.errorStack;
                return res.status(err.statusCode).json({ 'message': errorDescription })
            }
            return res.status(err.statusCode).json({ 'message': err.message })
        } else {
            //process exit // terriablly wrong with flow need restart
        }
        return res.status(err.statusCode).json({ 'message': err.message })
    }
    next();
}

module.exports = ErrorHandler;
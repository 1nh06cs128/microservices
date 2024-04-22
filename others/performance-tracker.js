const { AppLogger, CallPointInfo } = require('./advanceLog');

function LogPerformance(target, propertyName, func, errorStack) {
    AppLogger.emit('error', 'LogPerformance', CallPointInfo(errorStack));
    const className = target ? target.name : 'Function';
    const linesOfCode = func.toString().split('\n').length;
    return async function (...args) {
        const start = performance.now();
        const result = await func.apply(this, args);
        const end = performance.now();
        const memoryUsage = process.memoryUsage().heapUsed / 1024 / 1024;
        let message = `${className != 'Function' ? className + '\'s Method' : className} :- ${propertyName || func.name} with ${linesOfCode} Code Lines took ${((end - start) / 1000).toFixed(4)} seconds to execute and consumed ${memoryUsage.toFixed(2)}MB of memory.`;
        AppLogger.emit('info', message, CallPointInfo(errorStack));
        return result;
    };
}

// for tracking performance of a Method defined in a Class
function forMethods(target, errorStack) {
    const propertyNames = Object.getOwnPropertyNames(target.prototype);
    for (const propertyName of propertyNames) {
        const propertyDescriptor = Object.getOwnPropertyDescriptor(target.prototype, propertyName);
        if (typeof propertyDescriptor.value === 'function' && propertyName !== 'constructor') {
            target.prototype[propertyName] = LogPerformance(target, propertyName, propertyDescriptor.value, errorStack);
        }
    }
}

// for tracking performance of a Function
function forFunctions(func, errorStack) {
    return LogPerformance(null, null, func, errorStack);
}

module.exports = { forMethods, forFunctions };

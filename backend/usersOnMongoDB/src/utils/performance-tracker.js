// const { Logger } = require("./customLogger");

const { AppLogger, CallPointInfo } = require('../../../../others/advanceLog');


/**
 * 
 * 


// for tracking performance of a Method defined in a Class
function forMethods(target) {
    const className = target.name;
    const propertyNames = Object.getOwnPropertyNames(target.prototype);
    for (const propertyName of propertyNames) {
        const propertyDescriptor = Object.getOwnPropertyDescriptor(target.prototype, propertyName);
        if (typeof propertyDescriptor.value === 'function' && propertyName !== 'constructor') {
            const originalMethod = propertyDescriptor.value;
            target.prototype[propertyName] = async function (...args) {
                const start = performance.now();
                const result = await originalMethod.apply(this, args);
                const end = performance.now();
                const memoryUsage = process.memoryUsage().heapUsed / 1024 / 1024;
                const functionString = originalMethod.toString();
                const linesOfCode = functionString.split('\n').length;
                Logger(`${className}'s ${propertyName} with ${linesOfCode} Code Lines took ${((end - start) / 1000).toFixed(4)} seconds to execute and consumed ${memoryUsage.toFixed(2)}MB of memory.`);
                return result;
            };
        }
    }
}

// for tracking performance of a Function
function forFunctions(func) {
    return async function (...args) {
        const start = performance.now();
        const result = func.apply(this, args);
        const end = performance.now();
        const memoryUsage = process.memoryUsage().heapUsed / 1024 / 1024;
        // Counting lines of code
        const functionString = func.toString();
        const linesOfCode = functionString.split('\n').length;
        Logger(`${func.name} with ${linesOfCode} Code Lines took ${((end - start) / 1000).toFixed(4)} seconds to execute and consumed ${memoryUsage.toFixed(2)}MB of memory`);
        return result;
    };
}

module.exports = { forMethods, forFunctions };

*/


function LogPerformance(target, propertyName, func) {
    const className = target ? target.name : 'Function';
    const linesOfCode = func.toString().split('\n').length;
    return async function (...args) {
        const start = performance.now();
        const result = await func.apply(this, args);
        const end = performance.now();
        const memoryUsage = process.memoryUsage().heapUsed / 1024 / 1024;
        let message = `${className != 'Function' ? className + '\'s Method' : className} :- ${propertyName || func.name} with ${linesOfCode} Code Lines took ${((end - start) / 1000).toFixed(4)} seconds to execute and consumed ${memoryUsage.toFixed(2)}MB of memory.`;
        AppLogger.emit('info', message, CallPointInfo());
        return result;
    };
}

// for tracking performance of a Method defined in a Class
function forMethods(target) {
    const propertyNames = Object.getOwnPropertyNames(target.prototype);
    for (const propertyName of propertyNames) {
        const propertyDescriptor = Object.getOwnPropertyDescriptor(target.prototype, propertyName);
        if (typeof propertyDescriptor.value === 'function' && propertyName !== 'constructor') {
            target.prototype[propertyName] = LogPerformance(target, propertyName, propertyDescriptor.value);
        }
    }
}

// for tracking performance of a Function
function forFunctions(func) {
    return LogPerformance(null, null, func);
}

module.exports = { forMethods, forFunctions };

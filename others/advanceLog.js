const fs = require('fs');
const os = require('os');
const path = require('path');
const colors = require('colors');
const EventEmitter = require('events');

class Logger extends EventEmitter {

    constructor(logFilePath) {
        super();
        this.logFilePath = logFilePath;
        this.initialize();
    }

    initialize() {
        // Define the characters for each row of the letters
        const letters = {
            A: ['###########', '####   ####', '###  #  ###', '##       ##', '##  ###  ##', '##  ###  ##', '###########'],
            B: ['###########', '##      ###', '##  ###  ##', '##      ###', '##  ###  ##', '##      ###', '###########'],
            C: ['##########', '##      ##', '##  ######', '##  ######', '##  ######', '##      ##', '##########'],
            D: ['###########', '##      ###', '##  ##   ##', '##  ###  ##', '##  ##   ##', '##      ###', '###########'],
            E: ['############', '##        ##', '##  ########', '##      ####', '##  ########', '##        ##', '############'],
            F: ['############', '##        ##', '##  ########', '##      ####', '##  ########', '##  ########', '############'],
            G: ['############', '##        ##', '##  ########', '##  ##    ##', '##  ####  ##', '##        ##', '############'],
            H: ['###########', '##  ###  ##', '##  ###  ##', '##       ##', '##  ###  ##', '##  ###  ##', '###########'],
            I: ['##########', '##      ##', '####  ####', '####  ####', '####  ####', '##      ##', '##########'],
            J: ['##########', '##      ##', '######  ##', '######  ##', '##  ##  ##', '##      ##', '##########'],
            K: ['###########', '##  ###  ##', '##  ##  ###', '##     ####', '##  ##  ###', '##  ###  ##', '###########'],
            L: ['##########', '##  ######', '##  ######', '##  ######', '##  ######', '##      ##', '##########'],
            M: ['###############', '##   #####   ##', '##    ###    ##', '##  #  #  #  ##', '##  ##   ##  ##', '##  ### ###  ##', '###############'],
            N: ['############', '##   ###  ##', '##    ##  ##', '##  #  #  ##', '##  ##    ##', '##  ###   ##', '############'],
            O: ['###########', '##       ##', '##  ###  ##', '##  ###  ##', '##  ###  ##', '##       ##', '###########'],
            P: ['###########', '##      ###', '##  ###  ##', '##      ###', '##  #######', '##  #######', '###########'],
            Q: ['###########', '##       ##', '##  ###  ##', '##  ###  ##', '##  ##   ##', '##       ##', '###########'],
            R: ['###########', '##       ##', '##  ###  ##', '##       ##', '##  ##  ###', '##  ###  ##', '###########'],
            S: ['##########', '##      ##', '##  ######', '##      ##', '######  ##', '##      ##', '##########'],
            T: ['##########', '##      ##', '####  ####', '####  ####', '####  ####', '####  ####', '##########'],
            U: ['###########', '##  ###  ##', '##  ###  ##', '##  ###  ##', '##  ###  ##', '##       ##', '###########'],
            V: ['#############', '##  #####  ##', '###  ###  ###', '####  #  ####', '#####   #####', '###### ######', '#############'],
            W: ['#################', '##  ##########  ##', '###  ########  ###', '####  ##  ##  ####', '#####   ##   #####', '###### #### ######', '##################'],
            X: ['###########', '##  ###  ##', '##  ###  ##', '####   ####', '##  ###  ##', '##  ###  ##', '###########'],
            Y: ['##########', '##  ##  ##', '##  ##  ##', '##  ##  ##', '####  ####', '####  ####', '##########'],
            Z: ['##########', '##      ##', '#####  ###', '####  ####', '###  #####', '##      ##', '##########']
        };

        // Check if the log file exists, if not, create it
        if (!fs.existsSync(this.logFilePath)) {
            fs.writeFileSync(this.logFilePath, ''); // Create an empty log file
        }
        const formatLog = (type, message, callingPointInfo) => {
            const formattedType = `[${type.toUpperCase()}]`;
            const formattedTime = `[${new Date().toLocaleString()}]`;
            const prefix = `${formattedTime.padEnd(25)} ${formattedType.padEnd(9)}`;
            const baseFolder = `[${path.basename(process.cwd())}]`.padEnd(24);

            /**
             * SAMPLE O/P with simple Formatting
             * [3/27/2024, 4:16:45 PM]   [INFO]   [productsOnDynamoDB]   [/src/index.js:18]
             * listening to port 7001
             */
            // return `\n${prefix}${baseFolder}${callingPointInfo}\n${message}`;

            /**
             * SAMPLE O/P
             * [3/27/2024, 4:27:45 PM]   [DEBUG]  [_gateway]                                                                                                                                     [/index.js:53]
             * Gateway is Listening to Port 8000
             * USE BELOW CODE FOR ABOVE FORMATTING
            */
            const columns = Math.min(process.stdout.columns || 160, 192);
            const byCount = Math.max((columns - prefix.length - baseFolder.length - callingPointInfo.length), 4);
            return `\n${prefix}${baseFolder}${' '.repeat(byCount)}${callingPointInfo}\n${message}`;
        };

        this.on('start', (message, callingPointInfo, color) => {
            const logMessage = formatLog('info', message, callingPointInfo);
            // Print each row of the letters
            let startLetters = '';
            // STARTING APP
            for (let i = 0; i < 7; i++) {
                startLetters += `${letters.S[i]}${letters.T[i]}${letters.A[i]}${letters.R[i]}${letters.T[i]}${letters.I[i]}${letters.N[i]}${letters.G[i]}######${letters.A[i]}${letters.P[i]}${letters.P[i]}\n`;
            }

            console.info(colors[color ? color : 'white']('\n\n' + startLetters)); // STARTING APP
            fs.appendFileSync(this.logFilePath, '\n\n' + startLetters + logMessage);
        });

/*
        this.on('start', (message, callingPointInfo, color) => {
            const logMessage = formatLog('info', message, callingPointInfo);
            const preFix = '\n\n\n' + '== Start of Action ==\n'; // Define a nice prefix
            console.info(colors[color ? color : 'white'](preFix + logMessage)); // Log with prefix
            fs.appendFileSync(this.logFilePath, preFix + '\n' + logMessage + '\n');
        });
*/
        // Event listeners for 'debug', 'error', and 'warn' events
        this.on('info', (message, callingPointInfo, color) => {
            const logMessage = formatLog('info', message, callingPointInfo);
            console.info(colors[color ? color : 'white'](logMessage));
            fs.appendFileSync(this.logFilePath, logMessage + '\n');
        });

        this.on('error', (message, callingPointInfo) => {
            const logMessage = formatLog('error', message, callingPointInfo);
            console.error(colors.red(logMessage));
            fs.appendFileSync(this.logFilePath, logMessage + '\n');
        });

        this.on('warn', (message, callingPointInfo) => {
            // this.emit(level, `[${new Date().toLocaleString()}] [${level.toUpperCase()}] - ${message}`);
            const logMessage = formatLog('warn', message, callingPointInfo);
            console.warn(colors.yellow(logMessage));
            fs.appendFileSync(this.logFilePath, logMessage + '\n');
        });

        this.on('debug', (message, callingPointInfo, color) => {
            const logMessage = formatLog('debug', message, callingPointInfo);
            console.info(colors[color ? color : 'white'](logMessage));
            fs.appendFileSync(this.logFilePath, logMessage + '\n');
        });
    }

    log(message, level = 'info') {
        this.emit(level, `[${new Date().toLocaleString()}] [${level.toUpperCase()}] - ${message}`);
    }

    debug(message) {
        this.log(message, 'debug');
    }

    error(message) {
        this.log(message, 'error');
    }

    warn(message) {
        this.log(message, 'warn');
    }
}

// Finding Call Point Info inside the Class is tricky as information was not emitted and used by calling methods for ease of use.
// Emitting methods give more control, this is one example where and how we can use it.
function CallPointInfo() {
    const stack = new Error().stack.split('\n')[2];
    const cwd = process.cwd();
    let _, fileName, lineNumber, relativeFileName;
    if (stack.match(/\((.*):(\d+):\d+\)/)) {
        [fileName, lineNumber] = stack.match(/\((.*):(\d+):\d+\)/).slice(1, 3);
    } else {
        [_, fileName, lineNumber] = stack.match(/^(?:file:\/\/\/)?(.*):(\d+):(\d+)$/);
    }

    relativeFileName = fileName
        .replace(new RegExp('^.*?' + cwd), '') // Remove everything up to cwd
        .replace(new RegExp('^.*?' + __dirname), '') // Remove everything up to __dirname
        .replace(new RegExp('^.*?' + os.homedir()), ''); // Remove everything up to os.homedir()

    // if (fileName.indexOf(cwd) !== -1) { // remove till CWD
    //     relativeFileName = fileName.substring(fileName.indexOf(cwd) + cwd.length); // Remove cwd prefix from fullPath
    // } else if (fileName.indexOf(__dirname) !== -1) { // else - self folder / file
    //     relativeFileName = fileName.substring(fileName.indexOf(__dirname) + (__dirname).length);
    // } else if (fileName.indexOf(os.homedir()) !== -1) { // else Remove till os.homedir()
    //     relativeFileName = fileName.substring(fileName.indexOf(os.homedir()) + (os.homedir()).length);
    // } else { //this should not be called, still a Fall Back.
    //     relativeFileName = fileName; // Remove cwd prefix from fullPath
    // }

    return (`[${relativeFileName}:${lineNumber}]`);
}

function LogPerformance(target, propertyName, func) {
    const className = target ? target.name : 'Function';
    const linesOfCode = func.toString().split('\n').length;
    return async function (...args) {
        const start = performance.now();
        const result = await func.apply(this, args);
        const end = performance.now();
        const memoryUsage = process.memoryUsage().heapUsed / 1024 / 1024;
        let message = `${className != 'Function' ? className + '\'s Method' : className} :- ${propertyName || func.name} with ${linesOfCode} Code Lines took ${((end - start) / 1000).toFixed(4)} seconds to execute and consumed ${memoryUsage.toFixed(2)}MB of memory.`;
        // AppLogger.emit('info', message, CallPointInfo());
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

// Function to get current date in ddmmyy format
const getCurrentDate = () => {
    const now = new Date();
    const dd = String(now.getDate()).padStart(2, '0');
    const mm = String(now.getMonth() + 1).padStart(2, '0'); // January is 0!
    const yy = String(now.getFullYear()).slice(-2);
    return dd + mm + yy;
};

// const logFile = path.join(os.homedir(), '/Desktop/playground/microservices/backend/app.log');
const logFileName = `../../Applogs/${getCurrentDate()}.log`;

// const logFileName = '../../logs/app.log';
// const logFilePathUp = path.join('../../', logFileName);
// console.log(logFilePathUp, process.cwd(), path.basename(process.cwd()));

const logFilePath = path.join(process.cwd(), logFileName);
console.log(process.cwd(), path.basename(process.cwd()));
console.log(logFilePath);

const createLogsDirectory = () => {
    const logsDirectory = path.dirname(logFilePath);
    if (!fs.existsSync(logsDirectory)) {
        fs.mkdirSync(logsDirectory, { recursive: true });
    }
};

// Call the function to create 'logs' directory if it doesn't exist
createLogsDirectory();

const AppLogger = new Logger(logFilePath);

// module.exports = AppLogger;
module.exports = { AppLogger, CallPointInfo, forMethods, forFunctions };
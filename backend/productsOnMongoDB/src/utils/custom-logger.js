// logger.js
import fs from 'fs'
import path from 'path'

function getRelativePath(fullPath) {
    const cwd = process.cwd();
    const separator = path.sep; // Get the system-specific path separator

    // Check if the full path starts with the current working directory
    if (fullPath.includes('file://' + cwd)) {
        // Remove the cwd part from the path
        return fullPath.slice(cwd.length + separator.length + 1);
    } else {
        // The path doesn't start with cwd, return the full path
        return fullPath;
    }
}

function customLogger(...args) {
    const message = args.map(arg => {
        if (typeof arg === 'object') {
            // Stringify the object with proper indentation
            return JSON.stringify(arg, null, 4);
        } else {
            return arg;
        }
    }).join(' ');
    const stack = new Error().stack;
    const caller = stack.split('\n')[2];
    let _, fileName, lineNumber
    if (caller.match(/\((.*):(\d+):\d+\)/)) {
        [fileName, lineNumber] = caller.match(/\((.*):(\d+):\d+\)/).slice(1, 3);
    } else {
        [_, fileName, lineNumber] = caller.match(/^(?:file:\/\/\/)?(.*):(\d+)$/);
    }
    // console.log(fileName);
    // const relativeFileName = path.relative(process.cwd(), fileName);
    const relativeFileName = getRelativePath(fileName);

    const totalWidth = process.stdout.columns || 160; // Use 160 as a fallback if unable to determine console width
    const lineNumberWidth = relativeFileName.length + lineNumber.length + 4; // 4 accounts for brackets and colon

    // Check if message is multiline
    const lines = message.split('\n');
    const isMultiline = lines.length > 1;

    // Calculate the padding for the last line
    let messageWidth = totalWidth - lineNumberWidth;

    // Construct the log message with left-aligned message and right-aligned filename with line number
    let logMessage;

    // Add newline characters if the message is multiline
    if (isMultiline) {
        logMessage = `${message}${' '.repeat(totalWidth - lineNumberWidth - 1)} [${relativeFileName}:${lineNumber}]`;
    } else {
        logMessage = `${message.slice(0, messageWidth).padEnd(messageWidth)} [${relativeFileName}:${lineNumber}]`;
    }

    console.log(logMessage);

    // Optionally, you can write this to a log file as well
    // fs.appendFileSync('logfile.txt', logMessage + '\n');
}

export {
    customLogger
};

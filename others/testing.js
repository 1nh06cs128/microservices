
const addCommasIndianSystem = (numberString) => {
    const part = numberString.toString().split('.');
    let integerPart = part[0],
        decimalPart = part[1] || '00';
    const intArr = integerPart.split('');
    let expectedCommas = Math.round((intArr.length - 3) / 2);
    let formattedNumber = [];
    for (let x = 0; x <= expectedCommas; x++) {
        if (x == 0) {
            // retrieve and push the last 3 digits.
            formattedNumber.push(intArr.splice(-3).join(''));
        } else {
            // retrieve next 2 digits prior from last fetched values digits and so on.
            // push values into start of the array.
            formattedNumber.unshift(intArr.splice((-2)).join(''));
        }
    }
    return formattedNumber.join(',') + '.' + decimalPart;
}

console.log(`'333.333' - ${addCommasIndianSystem('333.333')}`);
console.log(`'4444.4444' - ${addCommasIndianSystem('4444.4444')}`);
console.log(`'55555.555' - ${addCommasIndianSystem('55555.555')}`);
console.log(`'666666.66667' - ${addCommasIndianSystem('666666.66667')}`);
console.log(`'7777777.77777' - ${addCommasIndianSystem('7777777.77777')}`);
console.log(`'88888888.88' - ${addCommasIndianSystem('88888888.88')}`);
// console.log(`'123456789.99' - ${addCommasIndianSystem('123456789.99')}`);
// console.log(`'123456789.99' - ${addCommasIndianSystem('123456789.99')}`);
// console.log(`'123456789.99' - ${addCommasIndianSystem('123456789.99')}`);
// console.log(`'123456789.99' - ${addCommasIndianSystem('123456789.99')}`);
// console.log(`'123456789.99' - ${addCommasIndianSystem('123456789.99')}`);
// console.log(`'123456789.99' - ${addCommasIndianSystem('123456789.99')}`);

console.log(`'123456789.99' - ${addCommasIndianSystem('123456789.99')}`);
console.log(`'1234567890.00' - ${addCommasIndianSystem('1234567890.00')}`);
console.log(`'112233445566778899' - ${addCommasIndianSystem('112233445566778899')}`);

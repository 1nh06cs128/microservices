import React from 'react';

// Price component to format and display price
const FormatPrice = ({ amount, symbol, width = 'w-24' }) => {
    // // Function to format price
    // const addSymbol = (price) => {
    //     // Assuming price is in cents, you can adjust this based on your actual data format
    //     const formattedPrice = (price / 100).toFixed(2); // Assuming price is in cents
    //     return `$ ${formattedPrice}`; // Added space after the dollar sign
    // }
    // console.log(amount, symbol);

    const addCommasIndianSystem = (numberString) => {
        if (!numberString) return;
        const part = numberString.toString().split('.');
        let x,
            intArr,
            expectedCommas,
            formattedNumber = [],
            integerPart = part[0],
            decimalPart = part[1] ? (part[1].length == 1 ? (part[1] + '0') : part[1]) : '00';

        intArr = integerPart.split('');
        expectedCommas = Math.max(Math.round((intArr.length - 3) / 2), 0);

        for (x = 0; x <= expectedCommas; x++) {
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

    return (
        <>
            {/* <div className={`flex items-center justify-between ${width}`}> */}
            <div className={`flex items-center justify-between`}>
                <span className="ml-2 mr-2"> {symbol} </span>
                <span> {addCommasIndianSystem(amount)}</span>
            </div>
        </>
    );
};

export default FormatPrice;

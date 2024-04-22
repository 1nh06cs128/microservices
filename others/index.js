// const fs = require('fs');
// setTimeout(() => {
//     console.log("I'm timer");
// }, 0);

// setImmediate(() => {
//     console.log("I'm setImmedeate");
// });

// fs.readFile('sample.txt', 'utf-8', () => {
//     console.log('reading sample file');
//     setTimeout(() => {
//         console.log('Timer 2')
//     }, 0);
//     setTimeout(() => {
//         console.log('Timer 3')
//     }, 5000);
// });

// console.log("I'm top level");

let data = " Hello World, I'm sexy";


let findFirstCharacterSortedNonRepeating = function (checkString) {
    let formatedString = checkString.trim().split(' ').join('').split('').sort().join('');
    console.log(formatedString);
    for (let x = 0; x < formatedString.length; x++) {
        let curr = x, next = x + 1;
        if (formatedString[curr] != formatedString[next]) {
            return formatedString[curr];
        }
    }
};

console.log(findFirstCharacterSortedNonRepeating(data));




let str = 'Hello world, I am a developer. you are welcome'

function findFirstCharacterSorted(data) {
    let formated = data.split('').sort().join('').trim();

    let dict = {}, isPresent, found;
    for (let x = 0; x < formated.length; x++) {
        if (!dict[formated[x]]) {
            dict[formated[x]] = 1;
        } else {
            dict[formated[x]] += 1;
        }
    }

    isPresent = Object.entries(dict).some(([key, value]) => {
        if (value === 1) {
            found = key;
            return true;
        }
    });

    console.log(found);
    return found;
}
let z = findFirstCharacterSorted(str);
console.log(z);
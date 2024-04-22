var calpoints = function (ops) {
    var result = [];
    ops.map(x => {
        switch (x) {
            case 'C': {
                result.pop();
                break;
            }
            case 'D': {
                let prev = result.pop();
                result.push(prev);
                result.push(prev * 2);
                break;
            }
            case '+': {
                let prev = result.pop();
                let prev2 = result.pop();
                result.push(prev2);
                result.push(prev);
                result.push(Number(prev) + Number(prev2));
                break;
            }
            default: {
                result.push(x);
            }
        }
    });
    result = result.reduce((a, b) => Number(a) + Number(b), 0);
    return result;
}

// var ops = readline().split(" ");
var ops = process.argv.slice(2);

console.log(calpoints(ops));

//『"5"，"2，"C"，"D"，"+"

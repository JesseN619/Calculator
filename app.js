function add(a, b) {
    return a + b;
}

function subtract(a, b) {
    return a - b;
}

function multiply(a, b) {
    return a * b;
}

function divide(a, b) {
    return a / b;
}

function roundNumber(a) {
    return Math.round( ( a + Number.EPSILON ) * 10000 ) / 10000;
}

function operate(operator, a, b) {
    if (operator == "+") {
        let answer = add(a, b);
        return roundNumber(answer);
    } else if (operator == "-") {
        let answer = subtract(a, b);
        return roundNumber(answer);
    } else if (operator == "*") {
        let answer = multiply(a, b);
        return roundNumber(answer);
    } else if (operator == "/") {
        let answer = divide(a, b);
        return roundNumber(answer);

    }
}

let display = document.getElementById('display');
let displayValue = display.textContent;
let numHasBeenClicked = false;
let firstValue = 0;
let secondValue = 0;
let operator;
let opHasBeenClicked = false;

const numberBtns = Array.from(document.getElementsByClassName('num'));
numberBtns.forEach((button) => {
    button.addEventListener('click', () => {
        let thisButtonValue = button.value;
        if (numHasBeenClicked === false) {
            display.textContent = thisButtonValue;
            if (opHasBeenClicked === false) {
                firstValue = parseInt(display.textContent);
            } else if (opHasBeenClicked === true) {
                secondValue = parseInt(display.textContent);
            }
        } else if (numHasBeenClicked === true) {
            //concatenate numbers as strings
            display.textContent = display.textContent + thisButtonValue;
            if (opHasBeenClicked === false) {
                firstValue = parseInt(display.textContent);
            } else if (opHasBeenClicked === true) {
                secondValue = parseInt(display.textContent);
            }
        }

        numHasBeenClicked = true;

        //console.log("NUM firstValue is " + firstValue);
        //console.log("NUM secondValue is " + secondValue);
    });
});

const operatorBtns = Array.from(document.getElementsByClassName('operator'));
operatorBtns.forEach((button) => {
    button.addEventListener('click', () => {
        if (opHasBeenClicked == true) {
            firstValue = operate(operator, firstValue, secondValue);
            secondValue = 0;
            display.textContent = firstValue;
        }
        opHasBeenClicked = true;
        operator = button.value;
        //console.log("OP firstValue is " + firstValue);
        //console.log("OP secondValue is " + secondValue);
        numHasBeenClicked = false;
    });
});

const equalsBtn = document.querySelector('#equals');
equalsBtn.addEventListener('click', () => {
    //console.log("EQUALS firstValue is " + firstValue);
    //console.log("EQUALS secondValue is " + secondValue);
    if (opHasBeenClicked === false || numHasBeenClicked === false) {
        return; // if operator or 2nd number has not been clicked, ignore equals sign click
    }
    opHasBeenClicked = false;
    numHasBeenClicked = false;
    if (operator === "/" && secondValue === 0) {
        display.textContent = "Can't do that!"
        return; // doesn't let user divide by 0
    }
    display.textContent = operate(operator, firstValue, secondValue);
    if (display.textContent.length > 14) { // can only handle <= 14 digits
        display.textContent = "Number too big!"
        return;
    };
    firstValue = parseInt(display.textContent);
});

const clearBtn = document.querySelector('#clear');
clearBtn.addEventListener('click', () => {
    display.textContent = '';
    numHasBeenClicked = false;
    operator = '';
    opHasBeenClicked = false;
    firstValue = 0;
    secondValue = 0;
});

// const decimalBtn = document.querySelector('#decimal');
// decimalBtn.addEventListener('click', () => {
//     display.textContent = toString(display.textContent) + '.';
// });

//TODO: Add animation for click events
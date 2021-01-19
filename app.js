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

function operate(operator, a, b) {
    if (operator == "+") {
        return add(a, b);
    } else if (operator == "-") {
        return subtract(a, b);
    } else if (operator == "*") {
        return multiply(a, b);
    } else if (operator == "/") {
        return divide(a, b);
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

        console.log("NUM firstValue is " + firstValue);
        console.log("NUM secondValue is " + secondValue);
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
        console.log("OP firstValue is " + firstValue);
        console.log("OP secondValue is " + secondValue);
        numHasBeenClicked = false;
    });
});

//TODO: check if opHasBeenClicked is true
const equalsBtn = document.querySelector('#equals');
equalsBtn.addEventListener('click', () => {
    console.log("EQUALS firstValue is " + firstValue);
    console.log("EQUALS secondValue is " + secondValue);
    display.textContent = operate(operator, firstValue, secondValue);
    firstValue = parseInt(display.textContent);
    opHasBeenClicked = false;
    numHasBeenClicked = false;
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


//TODO: Add animation for click events
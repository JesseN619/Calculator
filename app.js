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
let opHasBeenClicked;

const numberBtns = Array.from(document.getElementsByClassName('num'));
numberBtns.forEach((button) => {
    button.addEventListener('click', () => {
        let thisButtonValue = button.value;
        if (numHasBeenClicked === false) {
            display.textContent = thisButtonValue;
        } else if (numHasBeenClicked === true) {
            display.textContent = display.textContent + thisButtonValue;
        }
        numHasBeenClicked = true;
    });
});

const operatorBtns = Array.from(document.getElementsByClassName('operator'));
operatorBtns.forEach((button) => {
    button.addEventListener('click', () => {
        opHasBeenClicked = true;
        operator = button.value;
        firstValue = parseInt(display.textContent);
        console.log("OP firstValue is " + firstValue);
        numHasBeenClicked = false;
    });

    //event listener for equal button to run operate function and return answer to display
});

//check if opHasBeenClicked is true
const equalsBtn = document.querySelector('#equals');
equalsBtn.addEventListener('click', () => {
    secondValue = parseInt(display.textContent);
    console.log("EQUALS firstValue is " + firstValue);
    console.log("secondValue is " + secondValue);
    display.textContent = operate(operator, firstValue, secondValue);
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


//TODO: Add animation for click events

//TODO: string operations together
//TODO: 
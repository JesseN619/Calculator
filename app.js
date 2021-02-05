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
let lastButtonClicked;

const numberBtns = Array.from(document.getElementsByClassName('num'));
numberBtns.forEach((button) => {
    button.addEventListener('click', () => {
        let thisButtonValue = button.value;

        // display.textContent.indexOf('.') != -1   // true if display contains '.'
        if (thisButtonValue === '.') {
            if (display.textContent.indexOf('.') != -1 && lastButtonClicked != 'op') {
                return;
                // ignores decimal button if display contains '.' unless an operator was last clicked
            }
        }

        if (numHasBeenClicked === false) {
            display.textContent = thisButtonValue;
            if (opHasBeenClicked === false) {
                firstValue = parseFloat(display.textContent);
            } else if (opHasBeenClicked === true) {
                secondValue = parseFloat(display.textContent);
            }
        } else if (numHasBeenClicked === true) {
            //concatenate numbers as strings
            display.textContent = display.textContent + thisButtonValue;
            if (opHasBeenClicked === false) {
                firstValue = parseFloat(display.textContent);
            } else if (opHasBeenClicked === true) {
                secondValue = parseFloat(display.textContent);
            }
        }

        numHasBeenClicked = true;
        lastButtonClicked = 'num';

        if (display.textContent.length > 14) {
            display.textContent = 'Number too big!';
            //The following variables act as if clear was pressed
            numHasBeenClicked = false;
            operator = '';
            opHasBeenClicked = false;
            firstValue = 0;
            secondValue = 0;
            lastButtonClicked = 'clear';
        }
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
        numHasBeenClicked = false;
        lastButtonClicked = 'op';
    });
});

const equalsBtn = document.querySelector('#equals');
equalsBtn.addEventListener('click', () => {
    if (opHasBeenClicked === false || numHasBeenClicked === false) {
        return; // if operator or 2nd number has not been clicked, ignore equals sign click
    }
    opHasBeenClicked = false;
    numHasBeenClicked = false;
    lastButtonClicked = 'equals';
    if (operator === "/" && secondValue === 0) {
        display.textContent = "Can't do that!"
        return; // doesn't let user divide by 0
    }
    display.textContent = operate(operator, firstValue, secondValue);
    if (display.textContent.length > 14) { // can only handle <= 14 digits
        display.textContent = "Number too big!"
        return;
    };
    firstValue = parseFloat(display.textContent);
});

const clearBtn = document.querySelector('#clear');
clearBtn.addEventListener('click', () => {
    display.textContent = '';
    numHasBeenClicked = false;
    operator = '';
    opHasBeenClicked = false;
    firstValue = 0;
    secondValue = 0;
    lastButtonClicked = 'clear';
});

const backBtn = document.querySelector('#backspace');
backBtn.addEventListener('click', () => {
    if (lastButtonClicked === 'num') {
        display.textContent = display.textContent.slice(0, -1);
    } else if (lastButtonClicked === 'op') {
        operator = '';
        opHasBeenClicked = false;
        numHasBeenClicked = true;
        lastButtonClicked = 'num';
    }
});

const allBtns = document.querySelectorAll('button');
allBtns.forEach((button) => {
    button.addEventListener('click', () => {
        button.style.color
    });
});

//TODO: Add keyboard support
//TODO: Change color on operator after being clicked and take color away if number or backspace is clicked